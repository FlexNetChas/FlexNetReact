"use client";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
// Commented out old ChatBoxComponent, now using Stream instead
// import ChatBoxComponent from "./ChatBoxComponent";
import { useSceneContext } from "@/components/3d-components/SceneContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import ChatBoxComponent from "./ChatStreamBoxComponent";

export default function ChatContentComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const { shouldRender } = useSceneContext();

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div
        className="overflow-hidden h-[30vh] relative flex items-center justify-center"
        style={{ width: 200, height: 200 }}
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
      <div className="w-full flex-1 mt-auto mb-6">
        <ChatBoxComponent savedSession={savedSession} />
      </div>
    </div>
  );
}
