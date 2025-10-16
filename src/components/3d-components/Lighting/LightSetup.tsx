import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LightSetupProps {
  degraded: boolean;
}

// Lighting setup component with ambient, point, and directional lights, including a moving light effect.
export default function LightSetup({ degraded }: LightSetupProps) {
  const movingLight = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (movingLight.current) movingLight.current.rotation.y += delta * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      <group ref={movingLight}>
        <directionalLight
          castShadow
          intensity={degraded ? 1.2 : 2.5}
          color="#f1e3b1"
          position={[10, 10, 0]}
          shadow-mapSize-width={degraded ? 1024 : 2048}
          shadow-mapSize-height={degraded ? 1024 : 2048}
          shadow-bias={-0.0001}
        />
      </group>
    </>
  );
}
