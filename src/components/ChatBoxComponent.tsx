"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "./3d-components/Animation/AnimationContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";

interface ChatboxProps {
  savedSession?: CompleteChatSessionResponseDto | null;
}

export default function ChatBoxComponent({ savedSession }: ChatboxProps) {
  const [messages, setMessages] = useState<ChatMessageResponseDto[]>(
    savedSession?.chatMessages || []
  );
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const { setAnimation } = useAnimation();

  const fetchDadJoke = async (): Promise<ChatMessageResponseDto> => {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      return {
        id: Date.now(),
        messageText: data.joke || "🤷‍♂️ Couldn't fetch a joke!",
        timeStamp: new Date(),
        sender: "ai",
        lastUpdated: null,
      };
    } catch (err) {
      return {
        id: Date.now(),
        messageText: "🤷‍♂️ Couldn't fetch a joke!",
        sender: "ai",
        timeStamp: new Date(),
        lastUpdated: null,
      };
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: ChatMessageResponseDto = {
      id: Date.now(),
      messageText: input,
      sender: "user",
      timeStamp: new Date(),
      lastUpdated: null,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAnimation("talking");

    // Simulate AI response after short delay
    setTimeout(async () => {
      const aiMessage = await fetchDadJoke();
      setMessages((prev) => [...prev, aiMessage]);
      setTimeout(() => setAnimation("idle"), 3000);
    }, 500);
  };

  // Auto-scroll down when messages updates
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[250px] flex flex-col text-white rounded-xl overflow-hidden">
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1 scrollbar"
      >
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet...</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[70%] ${
              msg.sender === "ai"
                ? "border border-blue-600 self-end"
                : "border border-gray-700 self-start"
            }`}
          >
            {msg.messageText}
          </div>
        ))}
      </div>

      {/* Input area pinned at bottom */}
      <div className="flex gap-2 px-6 my-1 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
