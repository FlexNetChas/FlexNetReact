"use client";
import { AnimationProvider } from "@/components/3d-components/Animation/AnimationContext";
import { SceneContextProvider } from "@/components/3d-components/SceneContext";
import ChatContentComponent from "@/components/chat/ChatContentComponent";

export default function page() {
  return (
    <SceneContextProvider>
      <AnimationProvider>
        <ChatContentComponent />
      </AnimationProvider>
    </SceneContextProvider>
  );
}
