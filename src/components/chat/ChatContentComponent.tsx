"use client";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
// Commented out old ChatBoxComponent, now using Stream instead
// import ChatBoxComponent from "./ChatBoxComponent";
import { useSceneContext } from "@/components/3d-components/SceneContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import ChatBoxComponent from "./ChatStreamBoxComponent";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ChatContentComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const { shouldRender, setShouldRender } = useSceneContext();
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsFocused(false);
        setShouldRender(false);
      } else {
        setIsFocused(true);
        setShouldRender(true);

      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div
        className="relative flex h-[30vh] items-center justify-center overflow-hidden"
        style={{ width: 200, height: 200 }}
      >
        {isFocused ? (
          shouldRender === false ? (
          <Image
            src="/3d-assets/2d-fallback-image.png"
            alt="fallback 2D image if 3D fails"
            layout="fill"  //instead of passing in width/height
            objectFit="cover"
            className="h-full w-full vg-transparent" 
          />
          ) : (
            <ClientSideSceneLoader key={"inFocus: " + isFocused} />
          )) : (<><div>Not in focus</div></>)}
            
      </div>
      <div className="mt-auto mb-6 w-full flex-1">
        <ChatBoxComponent savedSession={savedSession} />
      </div>
    </div>
  );
}
