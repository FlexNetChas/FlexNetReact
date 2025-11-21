"use client";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
// Commented out old ChatBoxComponent, now using Stream instead
// import ChatBoxComponent from "./ChatBoxComponent";
import { useSceneContext } from "@/components/3d-components/SceneContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import ChatBoxComponent from "./ChatStreamBoxComponent";
import Image from "next/image";

export default function ChatContentComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const { shouldRender } = useSceneContext();

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div
        className="relative flex h-[30vh] items-center justify-center overflow-hidden"
        style={{ width: 200, height: 200 }}
      >
        {shouldRender === false ? (
          <Image
            src="/3d-assets/temp-2d-fallback-image.png"
            alt="fallback 2D image if 3D fails"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
            className="h-full w-full"
          />
        ) : (
          <ClientSideSceneLoader />
        )}
      </div>
      <div className="mt-auto mb-6 w-full flex-1">
        <ChatBoxComponent savedSession={savedSession} />
      </div>
    </div>
  );
}
