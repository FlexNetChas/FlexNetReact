import { useFBX } from "@react-three/drei";
import { AnimationMixer, Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

interface ModelFBXProps {
  path: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export default function ModelFBX({
  path,
  position = [0, 0, 0],
  scale = 1,
}: ModelFBXProps) {
  const fbx = useFBX(path);
  const scene: Group = fbx;
  const animations = fbx.animations;
  const modelRef = useRef<Group>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (!scene) return; // safety check
    if (!animations || animations.length === 0) return;

    mixerRef.current = new AnimationMixer(scene);
    const action = mixerRef.current.clipAction(animations[0]);
    if (action) action.play();

    return () => {
      mixerRef.current?.stopAllAction();
    };
  }, [animations, scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
        (child as Mesh).receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => mixerRef.current?.update(delta));

  return (
    <primitive
      object={scene}
      position={position}
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
      ref={modelRef}
    />
  );
}
