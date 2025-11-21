"use client";
import { useState, useRef } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useChatSessions } from "@/components/chat/ChatSessionContext";
import { useEffect } from "react";

export default function ChatBoxComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  const chatSessionIdRef = useRef<number | null>(null);
  const { setAnimationState } = useAnimation();
  const { refreshSessions } = useChatSessions();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageResponseDto[]>(
    savedSession?.chatMessages || [],
  );

  const [chatSessionId, setChatSessionId] = useState<number | null>(
    savedSession?.id || null,
  );

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

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
    } catch {
      return "⚠️ Server died. We're blaming DevOps until proven otherwise.";
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: ChatMessageResponseDto = {
      messageText: input,
      role: "user",
      timeStamp: new Date(),
      lastUpdated: null,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Simulate AI response after short delay
    setAnimationState("Dance", true, {
      loop: true,
      timeout: 2000,
      onComplete: () =>
        setAnimationState("Yes", true, {
          loop: true,
          timeout: 4000,
          onComplete: () => setAnimationState("Idle", true),
        }),
    }); // thinking animation

    setTimeout(async () => {
      const reply = await fetchAIResponse(userMessage.messageText);
      const newMsg: ChatMessageResponseDto = {
        messageText: reply,
        role: "assistant",
        timeStamp: new Date(),
        lastUpdated: null,
      };
      setMessages((prev) => [...prev, newMsg]);
      refreshSessions();
    }, 1000); // small delay to simulate thinking
  };

  return (
    <div className="flex h-[250px] w-full flex-col overflow-hidden rounded-xl text-white">
      <div
        ref={logRef}
        className="scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2"
      >
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet...</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.timeStamp + msg.role}
            className={`max-w-[70%] rounded p-2 ${
              msg.role === "assistant"
                ? "self-end border border-blue-600"
                : "self-start border border-gray-700"
            }`}
          >
            {msg.messageText}
          </div>
        ))}
      </div>

      <div className="my-1 flex flex-shrink-0 gap-2 px-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border border-gray-700 bg-gray-800 p-2 text-white focus:outline-none"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
