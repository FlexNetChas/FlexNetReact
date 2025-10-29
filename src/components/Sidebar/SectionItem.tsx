"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CompactChatSessionResponseDto } from "@/types/chatSession";
import { chatSessionSerice } from "@/lib/api/services/chatSessionService"; // Import the service
import axiosInstance from "@/lib/api/config/axios";

const SectionItem = () => {
  const [sessions, setSessions] = useState<
    CompactChatSessionResponseDto[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/ChatSession")
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = (sessionId: number) => {
    router.push(`/chat/${sessionId}`);
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
              <div
                key={session.Id}
                onClick={() => handleClick(session.Id)}
                className="p-3 rounded hover:bg-gray-700 transition-colors cursor-pointer text-sm"
              >
                <div className="flex justify-between">
                  <span>{session.Summary || "No Summary"}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(session.StartedTime).toLocaleString()}
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
