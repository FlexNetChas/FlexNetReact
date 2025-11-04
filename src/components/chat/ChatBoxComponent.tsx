"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import {
  CompleteChatSessionResponseDto,
  CreateChatSessionRequestDto,
} from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [currentSessions, setCurrentSession] =
    useState<CompleteChatSessionResponseDto | null>(savedSession || null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: ChatMessageResponseDto = {
      id: 0,
      messageText: input,
      sender: "user",
      timeStamp: new Date(),
      lastUpdated: null,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setAnimation("talking");

    // Simulate AI response after short delay
    // setTimeout(async () => {
    //   const aiMessage = await Gemini();
    //   setMessages((prev) => [...prev, aiMessage]);
    //   setTimeout(() => setAnimation("idle"), 3000);
    // }, 500);

    //if there's input but no saved session, create new session and got to the new route.
    if (currentSessions === null || currentSessions === undefined) {
      await CreateNewSession(updatedMessages);
    } else {
      console.log("Using existing session with ID:", currentSessions?.id);
    }
  };

  const CreateNewSession = async (chatMessages: ChatMessageResponseDto[]) => {
    const newChatSession: CreateChatSessionRequestDto = {
      summary: null,
      startedTime: new Date().toISOString(),
      endedTime: null,
      chatMessages: chatMessages ? chatMessages : [],
    };

    const response = await fetch("/api/chat-sessions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the content-type is set
      },
      body: JSON.stringify(newChatSession), // Add the body to the fetch
    });

    if (!response.ok) {
      console.log("Error creating new chat session");
      return;
    }

    const newSession = await response.json();
    setMessages(newSession.chatMessages);
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
