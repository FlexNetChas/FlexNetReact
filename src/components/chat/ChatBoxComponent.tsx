"use client";
import { useState, useRef, useEffect } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import {
  CompleteChatSessionResponseDto,
  CreateChatSessionRequestDto,
  UpdateChatSessionsRequestDto,
} from "@/types/chatSession";
import { ChatMessageResponseDto } from "@/types/chatMessage";
import { useRouter } from "next/navigation";
import { useChatSessions } from "@/components/chat/ChatSessionContext";

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
  const [currentSession, setCurrentSession] =
    useState<CompleteChatSessionResponseDto | null>(savedSession || null);
  const [chatSessionId, setChatSessionId] = useState<number | null>(null);
  const { sessions, refreshSessions, addSession } = useChatSessions();

  useEffect(() => {
    if (savedSession) {
      setCurrentSession(savedSession);
      setMessages(savedSession.chatMessages);
      setChatSessionId(savedSession.id);
    }
  }, [savedSession]);

  const fetchAIResponse = async (message: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, chatSessionId }),
      });

      if (!res.ok) throw new Error("Server error");

      console.log("BEFORE chatSessionId", chatSessionId);
      const data = await res.json();

      if (data.chatSessionId) {
        setChatSessionId(data.chatSessionId);
      }
      console.log("AFTER chatSessionId", chatSessionId);

      return data.reply ?? "🤷‍♂️ No reply from backend.";
    } catch (err) {
      return "⚠️ Server died. We're blaming DevOps until proven otherwise.";
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: ChatMessageResponseDto = {
      id: 0,
      messageText: input,
      role: "user",
      timeStamp: new Date(),
      lastUpdated: null,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setAnimation("talking");

    // Simulate AI response after short delay
    setTimeout(async () => {
      setTimeout(() => {
        setAnimation("idle");
      }, 3000);

      const reply = await fetchAIResponse(userMessage.messageText);
      //quick temp fix
      const newMsg: ChatMessageResponseDto = {
        id: Math.random(),
        messageText: reply,
        role: "assistant",
        timeStamp: new Date(),
        lastUpdated: null,
      };

      setMessages((prev) => [...prev, newMsg]);
      refreshSessions();
    }, 500); // small delay to simulate thinking

    //FIRST VERSION: create new session every time user sends a message if null otherwise always update the sessions
    //if there's input but no saved session, create new session and got to the new route.
    // if (currentSession === null || currentSession === undefined) {
    //   console.log("creating new session");
    //   await CreateNewSession(updatedMessages);
    // } else {
    //   console.log("updating existing session");
    //   await UpdateExistingSession();
    // }
  };

  // const CreateNewSession = async (chatMessages: ChatMessageResponseDto[]) => {
  //   const newChatSession: CreateChatSessionRequestDto = {
  //     summary: null,
  //     startedTime: new Date().toISOString(),
  //     endedTime: null,
  //     chatMessages: chatMessages ? chatMessages : [],
  //   };

  //   const response = await fetch("/api/chat-sessions/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newChatSession),
  //   });

  //   if (!response.ok) {
  //     console.log("Error creating new chat session");
  //     return;
  //   }

  //   const newSession = await response.json();
  //   setCurrentSession(newSession);
  //   setMessages(newSession.chatMessages);
  // };

  // const UpdateExistingSession = async () => {
  //   console.log("Updating existing session");
  //   const updatedSessions: UpdateChatSessionsRequestDto = {
  //     sessionId: currentSession!.id,
  //     startedTime: currentSession!.startedTime,
  //     summary: currentSession!.summary,
  //     endedTime: new Date().toISOString(),
  //     chatMessages: messages,
  //   };
  //   console.log("Updated session data:", updatedSessions);
  //   const response = await fetch("/api/chat-sessions/", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json", // Ensure the content-type is set
  //     },
  //     body: JSON.stringify(updatedSessions), // Add the body to the fetch
  //   });

  //   if (!response.ok) {
  //     console.log("Error updating chat session");
  //     return;
  //   }
  //   setCurrentSession(currentSession);
  // };

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
