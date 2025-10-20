import React, { useRef } from "react";
import { Group } from "three";
import GLBloader from "./GLBloader";
import FBXloader from "./FBXloader";
import { useThree } from "@react-three/fiber";

// 3D-space X Y Z.
interface ModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}
//Generic model wrapper that chooses loader based on file extension
export default function Model({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ModelProps) {
  const parentRef = useRef<Group | null>(null);
  const isGLB = path.endsWith(".glb");

  const scaleAdjustment = 20;
  const { viewport } = useThree();

  //scaling logic to keep model size consistent across different screen sizes, scaleAdjustment is a tuning parameter
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
      {isGLB ? <GLBloader path={path} /> : <FBXloader path={path} />}
    </group>
  );
}
