"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CompactChatSessionResponseDto } from "@/types/chatSession";
import { Trash2 } from "lucide-react";
import { useChatSessions } from "@/components/chat/ChatSessionContext";
import LoadingSpinner from "../LoadingSpinner";

const SectionItem = () => {
  const { sessions, refreshSessions, addSession } = useChatSessions();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    refreshSessions();
    setIsLoading(false);
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
    event.stopPropagation();
    try {
      const response = await fetch(`/api/chat-sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        refreshSessions();

        const id = params?.Id as string;

        if (id === sessionId.toString()) {
          await router.push(`/chat?ts=${Date.now()}`);
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session.id} className="flex flex-col">
                {session.hasBeenDeleted ? (
                  <LoadingSpinner />
                ) : (
                  <div
                    key={`session-${session.id}`}
                    onClick={() => handleClick(session.id)}
                    className="p-3 rounded hover:bg-gray-700  transition-colors cursor-pointer text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span>{session.summary || "No Summary"}</span>
                      <Trash2
                        size={18}
                        className=" hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                        key={`delete-${session.id}`}
                        onClick={(event) => {
                          if (!session.hasBeenDeleted) {
                            session.hasBeenDeleted = true;
                            handleClickDelete(session.id, event);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
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
