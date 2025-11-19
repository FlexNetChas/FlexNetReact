"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useRouter } from "next/navigation";
import { useChatSessions } from "@/components/chat/ChatSessionContext";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/lib/validations/messageValidator";

export default function ChatBoxComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const chatSessionIdRef = useRef<number | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const { setAnimationState } = useAnimation();
  const { refreshSessions } = useChatSessions();
  const [firstChunk, setFirstChunk] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageResponseDto[]>(
    savedSession?.chatMessages || []
  );
  const [currentSession, setCurrentSession] =
    useState<CompleteChatSessionResponseDto | null>(savedSession || null);

  const [chatSessionId, setChatSessionId] = useState<number | null>(
    savedSession?.id || null
  );

  const [isStreaming, setIsStreaming] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Ref for textarea to adjust height dynamically
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_HEIGHT = 100;
  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.scrollHeight > MAX_HEIGHT) {
      textarea.style.height = `${MAX_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  }, [input]);

  // OLD: Non-streaming fallback (keep for error cases)
  const fetchAIResponse = async (message: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, chatSessionId }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      chatSessionIdRef.current = data.sessionId;
      setChatSessionId(chatSessionIdRef.current);

      return data.reply ?? "🤷‍♂️ No reply from backend.";
    } catch (err) {
      return "⚠️ Server died. We're blaming DevOps until proven otherwise.";
    }
  };

  // NEW: Streaming function
  const fetchAIResponseStreaming = (
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: string) => void
  ): EventSource => {
    const url = `/api/chat/stream?message=${encodeURIComponent(message)}${
      chatSessionId ? `&chatSessionId=${chatSessionId}` : ""
    }`;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("data", (e) => {
      onChunk(e.data);
    });

    eventSource.addEventListener("error", (e: any) => {
      let errorMessage = "Stream error occurred";

      try {
        if (e.data) {
          const errorData = JSON.parse(e.data);
          errorMessage = errorData.error || errorMessage;
        }
      } catch (parseError) {
        // If we can't parse, use default message
      }

      onError(errorMessage);
      eventSource.close();
    });

    eventSource.addEventListener("done", () => {
      onComplete();
      eventSource.close();
    });

    return eventSource;
  };
  const firstChunkRef = useRef(false);
  const sendMessage = async () => {
    if (isStreaming) return;
    const trimmed = input.trim();
    const result = messageSchema.safeParse({ message: trimmed });

    if (!result.success) {
      console.error("Validation failed:", result.error.flatten().fieldErrors);
      return;
    }
    if (trimmed === "") return;
    if (input.length > 1000) {
      return;
    }
    // 1. Add user message
    const userMessage: ChatMessageResponseDto = {
      messageText: input,
      role: "user",
      timeStamp: new Date(),
      lastUpdated: null,
    };

    const userInput = input; // Capture current input
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setAnimationState("Dance", true, { loop: true }); // thinking animation

    // 2. Add empty AI message that will be populated by streaming
    const aiMessageIndex = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      {
        messageText: "",
        role: "assistant",
        timeStamp: new Date(),
        lastUpdated: null,
      },
    ]);

    // 3. Start streaming
    fetchAIResponseStreaming(
      userInput,
      // onChunk: Append chunk to AI message
      (chunk) => {
        if (!firstChunkRef.current) {
          firstChunkRef.current = true;
          setAnimationState("Yes", true, { loop: true });
        }
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[aiMessageIndex].messageText += chunk;
          return newMessages;
        });
      },
      // onComplete: Streaming finished successfully
      () => {
        setIsStreaming(false);
        firstChunkRef.current = false;
        setAnimationState("Idle", true, { loop: true });
        refreshSessions();
      },
      // onError: Something went wrong
      (error) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[aiMessageIndex].messageText = `⚠️ Error: ${error}`;
          return newMessages;
        });
        setAnimationState("Death", true, { loop: false });
        setIsStreaming(false);
      }
    );
  };

  return (
    <div className="w-full h-[60vh] flex flex-col text-white rounded-xl overflow-hidden">
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1 scrollbar"
      >
        {/* {messages.length === 0 && (
          <p className="text-gray-400">No messages yet...</p>
        )} */}
        {messages.map((msg, idx) => (
          <div
            key={`${msg.timeStamp}-${msg.role}-${idx}`}
            className={`p-2 rounded max-w-[90%] ${
              msg.role === "assistant"
                ? "border border-blue-600 self-end"
                : "border border-gray-700 self-start bg-muted"
            }`}
          >
            {msg.messageText}
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-6 my-1 flex-shrink-0">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full p-2 pr-12 rounded bg-gray-800 border ${
              input.length > 1000 ? "border-red-500" : "border-gray-700"
            } text-white focus:outline-none resize-none`}
            placeholder="Type a message..."
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isStreaming && input.length <= 1000) sendMessage();
              }
            }}
          />
          <span
            className={`absolute bottom-2 right-3 text-xs ${
              input.length > 1000
                ? "text-red-500 font-semibold"
                : "text-gray-400"
            }`}
          >
            {input.length}/1000
          </span>
          {input.length > 1000 && (
            <p className="text-red-500 absolute bottom right-3 text-xs mt-1">
              Max characters reached
            </p>
          )}
          <button
            onClick={sendMessage}
            disabled={isStreaming || input.length > 1000}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isStreaming ? (
              <Loader2 className="mr2 size-4 animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>
        {/* 
        <div className="text-sm mt-1 text-right">

        </div> */}
      </div>
    </div>
  );
}
