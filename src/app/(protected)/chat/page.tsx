"use client";
import { AnimationProvider } from "@/components/3d-components/Animation/AnimationContext";
import { SceneContextProvider } from "@/components/3d-components/SceneContext";
import ChatContentComponent from "@/components/chat/ChatContentComponent";
import { useSearchParams } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat messages",
  description: "Engage in dynamic conversations with your AI study companion",
};

export default function page() {
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
