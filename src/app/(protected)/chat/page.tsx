"use client";
import { AnimationProvider } from "@/components/3d-components/Animation/AnimationContext";
import { SceneContextProvider } from "@/components/3d-components/SceneContext";
import ChatContentComponent from "@/components/chat/ChatContentComponent";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const ts = searchParams.get("ts");
  return (
    <SceneContextProvider>
      <AnimationProvider>
        <ChatContentComponent key={ts ?? "initial"} savedSession={null} />
      </AnimationProvider>
    </SceneContextProvider>
  );
}
