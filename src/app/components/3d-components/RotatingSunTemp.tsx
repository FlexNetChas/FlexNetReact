import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

interface RotatingSunTempProps {
  radius?: number;
  speed?: number;
  height?: number;
}

export default function RotatingSunTemp({
  radius = 10,
  speed = 0.05,
  height = 5,
}: RotatingSunTempProps) {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  let angle = 0;

  useFrame((_, delta) => {
    if (!sunRef.current) return;

    angle += delta * speed;
    const x = radius * Math.cos(angle);
    const y = height + 2 * Math.sin(angle); // small arc
    const z = radius * Math.sin(angle);

    sunRef.current.position.set(x, y, z);
    sunRef.current.lookAt(0, 0, 0);
  });

  return (
    <directionalLight
      ref={sunRef}
      intensity={1}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  );
}
