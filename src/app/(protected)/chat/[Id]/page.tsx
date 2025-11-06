"use client";
import React, { useEffect, useState } from "react";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import { useParams } from "next/navigation";

import { AnimationProvider } from "@/components/3d-components/Animation/AnimationContext";
import { SceneContextProvider } from "@/components/3d-components/SceneContext";
import ChatContentComponent from "@/components/chat/ChatContentComponent";

export default function Page() {
  const params = useParams();
  const id = params?.Id as string;
  const [session, setSession] = useState<CompleteChatSessionResponseDto | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/chat-sessions/${id}`, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch session");
        return res.json();
      })
      .then((data) => {
        setSession(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SceneContextProvider>
      <AnimationProvider>
        <ChatContentComponent savedSession={session ?? null} />
      </AnimationProvider>
    </SceneContextProvider>
  );
}
