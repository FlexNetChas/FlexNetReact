import React, { useEffect, useState } from "react";
import ClientSideSceneLoader from "@/components/3d-components/ClientSideSceneLoader";
import { useSceneContext } from "@/components/3d-components/SceneContext";
import { CompleteChatSessionResponseDto } from "@/types/chatSession";
import ChatBoxComponent from "./ChatStreamBoxComponent";

export default function ChatContentComponent({
  savedSession,
}: {
  savedSession: CompleteChatSessionResponseDto | null;
}) {
  const { shouldRender, setShouldRender } = useSceneContext();
  const [isFocused, setIsFocused] = useState(true);
  const [isWebGLContextLost, setIsWebGLContextLost] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    // Handle page focus changes
    setShouldRender(document.hasFocus());
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Listen for WebGL context loss
    const handleWebGLContextLost = (event: Event) => {
      console.log("WebGL context lost");
      setIsWebGLContextLost(true); // Set the flag for WebGL context loss
      setShouldRender(false); // Disable rendering of 3D scene
      setRetrying(true); // Start retrying to restore the context
    };

    // Listen for WebGL context restoration
    const handleWebGLContextRestored = (event: Event) => {
      console.log("WebGL context restored");
      setIsWebGLContextLost(false); // Reset the flag
      setShouldRender(true); // Enable rendering of 3D scene
      setRetrying(false); // Stop retrying
    };

    // Attach the event listeners to the window object
    window.addEventListener("webglcontextlost", handleWebGLContextLost);
    window.addEventListener("webglcontextrestored", handleWebGLContextRestored);

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("webglcontextlost", handleWebGLContextLost);
      window.removeEventListener(
        "webglcontextrestored",
        handleWebGLContextRestored
      );
    };
  }, [setShouldRender]);

  // Polling for context restoration when it's lost
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isWebGLContextLost && retrying) {
      console.log("Starting context restoration retry loop...");
      interval = setInterval(() => {
        console.log("Polling to check WebGL context status...");
        if (!isWebGLContextLost) {
          console.log("WebGL context restored, stopping retry loop.");
          clearInterval(interval as NodeJS.Timeout); // Stop polling when context is restored
          setShouldRender(true); // Trigger re-render if context is restored
        }
      }, 1000); // Check every 1 second
    } else if (!retrying) {
      console.log("Stopping retry loop since no longer retrying.");
      if (interval) clearInterval(interval); // Stop the interval when retrying is false
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clean up the interval on unmount
        console.log("Interval cleared on unmount.");
      }
    };
  }, [isWebGLContextLost, retrying, setShouldRender]);

  // Log values for debugging
  useEffect(() => {
    console.log("isFocused:", isFocused);
    console.log("shouldRender:", shouldRender);
    console.log("isWebGLContextLost:", isWebGLContextLost);
    console.log("retrying:", retrying);
  }, [isFocused, shouldRender, isWebGLContextLost, retrying]);

  return (
    <div className="w-full flex flex-col items-center justify-between py-6">
      <div
        className="overflow-hidden relative flex items-center justify-center"
        style={{ width: 400, height: 400 }}
      >
        {isFocused ? (
          shouldRender && !isWebGLContextLost ? (
            // If focused, shouldRender is true, and WebGL context is not lost, render 3D scene
            <ClientSideSceneLoader key={"Attempt-" + retrying} />
          ) : (
            // If focused but shouldRender is false or WebGL context is lost, show 2D fallback
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
          )
        ) : (
          // If not focused, show "Not in focus"
          <div>Not in focus</div>
        )}
      </div>

      <div className="w-2/5 mt-auto mb-6">
        <ChatBoxComponent savedSession={savedSession} />
      </div>
    </div>
  );
}
