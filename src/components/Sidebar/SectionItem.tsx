"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompactChatSessionResponseDto } from "@/types/chatSession";

const SectionItem = () => {
  const [sessions, setSessions] = useState<
    CompactChatSessionResponseDto[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/chat-sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = (sessionId: number) => {
    if (sessionId) {
      console.log("Navigating to chat session with id:", sessionId);
      router.push(`/chat/${sessionId}`);
    } else {
      console.error("Invalid session ID:", sessionId);
    }
  };
  console.log(sessions);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleClick(session.id)}
                className="p-3 rounded hover:bg-gray-700 transition-colors cursor-pointer text-sm"
              >
                <div className="flex justify-between">
                  <span>{session.summary || "No Summary"}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(session.startedTime).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No chat sessions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
