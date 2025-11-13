import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSceneContext } from "../SceneContext";

interface FPSWatcherProps {
  threshold?: number;
  duration?: number;
}

// Monitors FPS and disables rendering if it stays below threshold for duration seconds
export default function FPSWatcher({
  threshold = 10,
  duration = 3,
}: FPSWatcherProps) {
  const { setShouldRender } = useSceneContext();

  // References to track previous time, low FPS count, and if the action has been triggered
  const lastTime = useRef(performance.now());
  const timeBelowThreshold = useRef(0);
  const millisecondsInSecond = 1000;

  // Runs every frame (using @react-three/fiber's useFrame)
  useFrame(() => {
    // Reset timers when out of focus to avoid false triggering
    if (!document.hasFocus()) {
      timeBelowThreshold.current = 0;
      lastTime.current = performance.now();
      return;
    }

    const currentTime = performance.now(); // grab current time, note we're working in milliseconds.
    const delta = currentTime - lastTime.current; // time passed between the previous nd current frame.
    lastTime.current = currentTime; // update lastTime for next loop

    // FPS = 1000 / timeDelta (in ms)
    const fps = millisecondsInSecond / delta;

    // If FPS is below threshold, add to *timeBelowThreshold* counter otherwise reset it. If counter exceeds duration, disable 3D rendering and go to 2D mode.
    if (fps < threshold) {
      timeBelowThreshold.current += delta;
      if (timeBelowThreshold.current >= duration * millisecondsInSecond) {
        setShouldRender(false);
      }
    } else {
      timeBelowThreshold.current = 0;
    }
  });

  // This component does not render anything itself, but needs to be tsx so it can use hooks
  return null;
}
