"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import AuroraBackground from "./3d-components/AuroraBackground";

export default function AuroraEffect() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: [0, 0, 1], fov: 75 }}
      >
        <AuroraBackground />
      </Canvas>
    </div>
  );
}

