import { useFBX } from "@react-three/drei";
import { AnimationMixer, Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { fixModelTextures } from "../Utility/FixTextureUtility";

interface ModelFBXProps {
  path: string;
}

// FBX model loader component, same as GLBloader but for FBX files, incase we end up with some FBX assets.
export default function FBXloader({ path }: ModelFBXProps) {
  const fbx = useFBX(path);
  const scene: Group = fbx;
  const animations = fbx.animations;
  const modelRef = useRef<Group>(null);

  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (!scene) return;
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

    fixModelTextures(scene);
  }, [scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={scene.position}
      scale={scene.scale}
    />
  );
}
