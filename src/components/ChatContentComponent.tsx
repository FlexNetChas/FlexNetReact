"use client";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
import ChatBoxComponent from "./ChatBoxComponent";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { useSceneContext } from "@/components/3d-components/SceneContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";

interface ChatContentProps {
  savedSession?: CompleteChatSessionResponseDto | null;
}

export default function ChatContentComponent({
  savedSession,
}: ChatContentProps) {
  const { shouldRender, setShouldRender } = useSceneContext();

  return (
    <div className="w-full  flex flex-col items-center justify-between py-6">
      <div
        className="overflow-hidden relative flex items-center justify-center"
        style={{ width: 400, height: 400 }}
      >
        {shouldRender === false ? (
          <img
            src="/3d-assets/temp-2d-fallback-image.png"
            alt="fallback 2D image if 3D fails"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <ClientSideSceneLoader />
        )}
      </div>
      <div className="w-2/5 mt-auto mb-6">
        <ChatBoxComponent savedSession={savedSession} />
      </div>
    </div>
  );
}
