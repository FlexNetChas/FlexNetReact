"use client";

import { useChatSessions } from "@/components/chat/ChatSessionContext";
import Link from "next/link";
import { useEffect } from "react";

export default function ContinueLearningButton() {
  const { sessions, refreshSessions } = useChatSessions();

  useEffect(() => {
    if (!sessions) {
      refreshSessions();
    }
  }, [sessions, refreshSessions]);

  const latestSession = sessions?.[0];

  return (
    <Link
      href={latestSession ? `/chat/${latestSession.id}` : "/chat"}
      className="glass p-6 rounded-xl cursor-pointer no-underline hover:no-underline hover:scale-101 transition-transform"
    >
      <div className="text-2xl font-bold mb-2 text-white">
        Continue Learning
      </div>
      <p>Pick up from your last session</p>
    </Link>
  );
}
