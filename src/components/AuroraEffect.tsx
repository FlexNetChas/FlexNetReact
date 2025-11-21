"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useState } from "react";
import AuroraBackground from "./3d-components/AuroraBackground";

export default function AuroraEffect() {
  const [isVisible, setIsVisible] = useState(true);
  const [dpr, setDpr] = useState(1);

  // Set DPR after mount
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 1.5));
  }, []);

  // Pause rendering when hero section is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
          stencil: false,
          depth: false,
        }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={dpr}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <AuroraBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
