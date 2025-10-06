import React, { useRef } from "react";
import { Group } from "three";
import ModelGLB from "./ModelGLB";
import ModelFBX from "./ModelFBX";
import { useThree } from "@react-three/fiber";

interface ModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export default function Model({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ModelProps) {
  const parentRef = useRef<Group | null>(null);
  const isGLB = path.endsWith(".glb");

  const scaleAdjustment = 15;
  const { viewport } = useThree();

  const numericScale = Array.isArray(scale) ? scale[0] : scale;
  const finalScale: [number, number, number] = [
    (numericScale * viewport.width) / scaleAdjustment,
    (numericScale * viewport.width) / scaleAdjustment,
    (numericScale * viewport.width) / scaleAdjustment,
  ];
  return (
    <group
      ref={parentRef}
      position={position}
      rotation={rotation}
      scale={finalScale}
    >
      {isGLB ? <ModelGLB path={path} /> : <ModelFBX path={path} />}
    </group>
  );
}
