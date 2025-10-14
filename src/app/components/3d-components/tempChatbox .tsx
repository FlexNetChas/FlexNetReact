"use client";

import { useState, useRef, useEffect } from "react";
import { useAnimation } from "./Animation/AnimationContext";

type ChatMessage = {
  text: string;
  sender: "user" | "ai";
};

export default function TempChatbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const { setAnimation } = useAnimation();

  const fetchDadJoke = async (): Promise<string> => {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      return data.joke || "🤷‍♂️ Couldn't fetch a joke!";
    } catch (err) {
      return "🤷‍♂️ Couldn't fetch a joke!";
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setAnimation("talking");

    // Simulate AI response after short delay
    setTimeout(async () => {
      setTimeout(() => {
        setAnimation("idle");
      }, 3000);
      const joke = await fetchDadJoke();
      setMessages((prev) => [...prev, { text: joke, sender: "ai" }]);
    }, 500); // small delay to simulate thinking
  };

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[500px] flex flex-col text-white rounded-xl overflow-hidden">
      {/* Scrollable chat log */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1"
      >
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet...</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[70%] ${
              msg.sender === "ai"
                ? "border border-blue-600 self-end"
                : "border borderborder-gray-700 self-start"
            }`}
          >
            {msg.text}
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
