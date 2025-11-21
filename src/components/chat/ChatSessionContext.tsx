"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CompactChatSessionResponseDto } from "@/types/chatSession";

type ChatSessionsContextType = {
  sessions: CompactChatSessionResponseDto[] | null;
  addSession: React.Dispatch<
    React.SetStateAction<CompactChatSessionResponseDto[] | null>
  >;
  refreshSessions: () => void; // Add this to trigger re-fetching
};

const ChatSessionsContext = createContext<ChatSessionsContextType | undefined>(
  undefined,
);

export const useChatSessions = () => {
  const context = useContext(ChatSessionsContext);
  if (!context) {
    throw new Error(
      "useChatSessions must be used within a ChatSessionsProvider",
    );
  }
  return context;
};

export function ChatSessionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessions, addSession] = useState<
    CompactChatSessionResponseDto[] | null
  >(null);

  const refreshSessions = useCallback(() => {
    fetch("/api/chat-sessions")
      .then((res) => res.json())
      .then((data) => {
        addSession(data);
      })
      .catch((err) => console.error("Failed to fetch chat sessions", err));
  }, []);

  return (
    <ChatSessionsContext.Provider
      value={{ sessions, refreshSessions, addSession }}
    >
      {children}
    </ChatSessionsContext.Provider>
  );
}
