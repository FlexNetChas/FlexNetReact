"use client";
import Image from "next/image";
import ClientSideSceneLoader from "./ClientSideSceneLoader";
import { SceneContextProvider, useSceneContext } from "./SceneContext";
import { AnimationProvider, useAnimation } from "./Animation/AnimationContext";
import Chatbox from "./tempChatbox ";

//test page to wrap everything together and provide useContexts
export default function TestPage() {
  return (
    <SceneContextProvider>
      <AnimationProvider>
        <PageContent />
      </AnimationProvider>
    </SceneContextProvider>
  );
}

function PageContent() {
  const { shouldRender, setShouldRender } = useSceneContext();
  const { toggleAnimation } = useAnimation();

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-between py-6">
      {/* Red Line to Check Transparency */}
      <div
        className="absolute w-full h-[2px] bg-red-500"
        style={{
          top: "25%",
          left: 0,
        }}
      ></div>

      {/* 3D Scene & 2D fallback card */}
      <button
        onClick={toggleAnimation}
        className="absolute left-4 top-1/2 -translate-y-1/2 px-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 shadow-lg z-10"
      >
        Toggle Animation outside of 3D scene
      </button>
      <div
        className="rounded-xl shadow-lg overflow-hidden relative flex items-center justify-center"
        style={{ width: 400, height: 400 }}
      >
        {shouldRender === false ? (
          <img
            src="/3d-assets/temp-2d-fallback-image.png" // Update with the path to your image
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
