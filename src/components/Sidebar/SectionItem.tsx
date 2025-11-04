"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompactChatSessionResponseDto } from "@/types/chatSession";
import { Trash2 } from "lucide-react";

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
      router.push(`/chat/${sessionId}`);
    } else {
      console.error("Invalid session ID:", sessionId);
    }
  };

  const handleClickDelete = async (
    sessionId: number,
    event: React.MouseEvent
  ) => {
    event?.stopPropagation;
    try {
      const response = await fetch(`/api/chat-sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        sessions && setSessions(sessions.filter((s) => s.id !== sessionId));
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

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
              <div key={session.id} className="flex flex-col text-sm">
                <div
                  key={`session-${session.id}`}
                  onClick={() => handleClick(session.id)}
                  className="p-3 rounded hover:bg-gray-700  transition-colors cursor-pointer text-sm"
                >
                  <div className="flex justify-between items-center">
                    <span>{session.summary || "No Summary"}</span>
                    {/* <span className="text-xs text-gray-500">
                      {new Date(session.startedTime).toLocaleString()}
                    </span> */}
                    <Trash2
                      size={18}
                      className=" hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                      key={`delete-${session.id}`}
                      onClick={(event) => handleClickDelete(session.id, event)}
                    />
                  </div>
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
