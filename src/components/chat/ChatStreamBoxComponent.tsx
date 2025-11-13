"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useRouter } from "next/navigation";
import { useChatSessions } from "@/components/chat/ChatSessionContext";

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
    if (input.trim() === "" || isStreaming) return;

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
    <div className="w-full h-[250px] flex flex-col text-white rounded-xl overflow-hidden">
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1 scrollbar"
      >
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet...</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={`${msg.timeStamp}-${msg.role}-${idx}`}
            className={`p-2 rounded max-w-[70%] ${
              msg.role === "assistant"
                ? "border border-blue-600 self-end"
                : "border border-gray-700 self-start"
            }`}
          >
            {msg.messageText}
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-6 my-1 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
          placeholder="Type a message..."
          disabled={isStreaming}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isStreaming) sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isStreaming}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStreaming ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
