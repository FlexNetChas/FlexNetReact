"use client";
import {
  AnimationProvider,
  useAnimation,
} from "@/components/3d-components/Animation/AnimationContext";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
import {
  SceneContextProvider,
  useSceneContext,
} from "@/components/3d-components/SceneContext";
import Chatbox from "@/components/3d-components/tempChatbox ";

function page() {
  return (
    <SceneContextProvider>
      <AnimationProvider>
        <PageContent />
      </AnimationProvider>
    </SceneContextProvider>
  );
}

export default page;

function PageContent() {
  const { shouldRender, setShouldRender } = useSceneContext();
  const { toggleAnimation } = useAnimation();

  return (
    <div className="w-full  flex flex-col items-center justify-between py-6">
      {/* 3D Scene & 2D fallback card */}
      <button
        onClick={toggleAnimation}
        className="absolute right-4 top-1/2 -translate-y-1/2 px-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 shadow-lg z-10"
      >
        Toggle Animation outside of 3D scene
      </button>
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
      {/* temp chatbox for testing */}
      <div className="w-2/5 mt-auto mb-6">
        <Chatbox />
      </div>
    </div>
  );
}
