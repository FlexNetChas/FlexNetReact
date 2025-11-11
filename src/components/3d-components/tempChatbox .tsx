"use client";

import { useState, useRef, useEffect } from "react";
import { useAnimation } from "./Animation/AnimationContext";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/ui/prompt-input";
import { Send } from "lucide-react";

type ChatMessage = {
  text: string;
  sender: "user" | "ai";
};

export default function TempChatbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const { setAnimation } = useAnimation();
  const [chatSessionId, setChatSessionId] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("chatSessionId");
    if (storedId) setChatSessionId(Number(storedId));
  }, []);

  useEffect(() => {
    if (chatSessionId !== null) {
      localStorage.setItem("chatSessionId", String(chatSessionId));
    }
  }, [chatSessionId]);

  const fetchAIResponse = async (message: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, chatSessionId }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      if (data.chatSessionId) {
        setChatSessionId(data.chatSessionId);
      }

      return data.reply ?? "🤷‍♂️ No reply from backend.";
    } catch (err) {
      return "⚠️ Server died. We're blaming DevOps until proven otherwise.";
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setAnimation("talking");

    setTimeout(async () => {
      setTimeout(() => {
        setAnimation("idle");
      }, 3000);
      const reply = await fetchAIResponse(userMessage);
      setMessages((prev) => [...prev, { text: reply, sender: "ai" }]);
      setIsLoading(false);
    }, 500);
  };


  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-[250px] flex flex-col text-white rounded-xl overflow-hidden">
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
                : "border border-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area pinned at bottom */}
      <div className="px-6 my-1 flex-shrink-0">
        <PromptInput
          value={inputValue}
          onValueChange={setInputValue}
          onSubmit={handleSend}
          isLoading={isLoading}
          disabled={isLoading}
          maxHeight={240}
          className="bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border-white/20"
        >
          <PromptInputTextarea
            placeholder="Type a message..."
            className="text-white placeholder:text-white/50"
          />
          <PromptInputActions>
            <PromptInputAction tooltip="Send message">
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="group relative flex items-center justify-center size-11 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700" />
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </div>
                
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] transition-shadow duration-300" />
                
                {/* Icon */}
                <Send className="size-4 relative z-10 text-white transition-transform duration-200 group-hover:scale-110" />
              </button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
