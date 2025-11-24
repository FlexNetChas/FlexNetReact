"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useChatSessions } from "@/components/chat/ChatSessionContext";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/lib/validations/messageValidator";
import { Button } from "../ui/button";

export default function ChatBoxComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const { setAnimationState } = useAnimation();
  const { refreshSessions } = useChatSessions();
  const [input, setInput] = useState("");
  const streamingTextRef = useRef("");
  const [messages, setMessages] = useState<ChatMessageResponseDto[]>(
    savedSession?.chatMessages || [],
  );

  const [chatSessionId, setChatSessionId] = useState<number | null>(
    savedSession?.id ?? null,
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

  // Streaming function
  const fetchAIResponseStreaming = (
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: string) => void,
  ): EventSource => {
    const url = `/api/chat/stream?message=${encodeURIComponent(message)}${
      chatSessionId ? `&chatSessionId=${chatSessionId}` : ""
    }`;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("data", (e) => {
      onChunk(e.data);
    });

    eventSource.addEventListener("error", (e: Event) => {
      let errorMessage = "Stream error occurred";

      const data = (e as unknown as MessageEvent).data;

      try {
        if (data) {
          const errorData = JSON.parse(data);
          errorMessage = errorData.error || errorMessage;
        }
      } catch {}

      onError(errorMessage);
      eventSource.close();
    });

    eventSource.addEventListener("done", (e: Event) => {
      const data = (e as MessageEvent).data;
      try {
        if (data && data !== "{}") {
          const result = JSON.parse(data);
          if (result.sessionId) {
            setChatSessionId(result.sessionId);
          }
        }
      } catch (err) {
        console.error("Error parsing done event:", err);
      }
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

    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setAnimationState("Dance", true, { loop: true });

    // 2. Add empty AI message that will be populated by streaming
    const aiMessageIndex = messages.length + 1;
    streamingTextRef.current = "";
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
        streamingTextRef.current += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (newMessages[lastIndex]?.role === "assistant") {
            newMessages[lastIndex].messageText = streamingTextRef.current;
          }
          return newMessages;
        });
      },
      // onComplete: Streaming finished successfully
      () => {
        setIsStreaming(false);
        firstChunkRef.current = false;
        setAnimationState("Idle", true, { loop: true });
        setTimeout(() => {
          refreshSessions();
        }, 500);
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
      },
    );
  };

  return (
    <div className="flex h-[60vh] w-full flex-col overflow-hidden rounded-xl">
      <div
        ref={logRef}
        className="scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2"
      >
        {messages.map((msg, idx) => (
          <div
            key={`${msg.timeStamp}-${msg.role}-${idx}`}
            className={`max-w-[90%] rounded-2xl p-2 whitespace-pre-wrap ${
              msg.role === "assistant"
                ? "self-end"
                : "border-border bg-primary/40 text-foreground self-start border"
            }`}
          >
            {msg.messageText}
          </div>
        ))}
      </div>

      <div className="my-1 flex gap-2 px-6">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`bg-input text-foreground w-full rounded border p-2 pr-12 ${
              input.length > 1000 ? "border-error" : "border-border"
            } resize-none focus:outline-none`}
            placeholder="Type a message..."
            disabled={isStreaming}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isStreaming && input.length <= 50) sendMessage();
              }
            }}
          />
          <span
            className={`absolute right-3 bottom-2 text-xs ${
              input.length > 1000
                ? "text-error font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {input.length}/1000
          </span>
          {input.length > 1000 && (
            <p className="text-error bottom absolute right-3 mt-1 text-xs">
              Max characters reached
            </p>
          )}
          <Button
            onClick={sendMessage}
            variant="default"
            disabled={isStreaming || input.length > 1000}
          >
            {isStreaming ? (
              <Loader2 className="mr2 size-4 animate-spin" />
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
