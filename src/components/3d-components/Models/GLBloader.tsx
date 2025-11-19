import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import useAnimationComponent from "../Animation/AnimationComponent";
import { fixModelTextures } from "../Utility/FixTextureUtility";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";

interface ModelGLBProps {
  path: string;
}

export default function GLBloader({ path }: ModelGLBProps) {
  const { scene: model, animations } = useGLTF(path);
  const headRef = useRef<Mesh | null>(null);
  const headReftwo = useRef<Mesh | null>(null);
  const headRefthree = useRef<Mesh | null>(null);

  let [mousePos, setMousePos] = useState({ x: 1, y: 1, z: 1 });
  const { setAnimationState } = useAnimation();
  // Animation name normalization function
  const normalizeAnimationName = (name: string) => {
    return name.split("_").pop() || name;
  };

  const animationIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    animations.forEach((clip, index) => {
      const normalizedAnimationName = normalizeAnimationName(clip.name);
      map[normalizedAnimationName] = index;
    });
    return map;
  }, [animations]);

  useAnimationComponent({
    model,
    animations,
    animationIndexMap,
  });
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);

      const x = relX / (rect.width / 2);
      const y = -relY / (rect.height / 2);

      setMousePos({ x, y, z: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  //Enable shadows, find head mesh and fix texture colors
  useEffect(() => {
    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
        (child as Mesh).receiveShadow = true;
        if ((child as Mesh).name === "Head_4") {
          headRef.current = child as Mesh;
        }
        if ((child as Mesh).name === "Head_2") {
          headReftwo.current = child as Mesh;
        }
        if ((child as Mesh).name === "Head_3") {
          headRefthree.current = child as Mesh;
        }
      }
    });
    fixModelTextures(model);
  }, [model]);

  useFrame(() => {
    // Adjust facial expression based on mouse distance from center
    const eyebrows = 1;
    const distance = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2);
    let anger: number = Math.max(0, 1.5 - distance);

    if (anger > 0.7) anger = 0.7;

    if (headRef.current?.morphTargetInfluences)
      headRef.current.morphTargetInfluences[eyebrows] = -anger;

    // Adjust eyes rotation based on mouse position
    if (headRef.current) {
      const head = headRef.current as Mesh;
      const headtwo = headReftwo.current as Mesh;
      const headthree = headRefthree.current as Mesh;

      const rotationSpeed = 0.03;

      // min max values
      const Xclmap = 0.2;
      const Zclmap = 0.2;

      let newXRotation = -mousePos.y * Math.PI * rotationSpeed;
      let newZRotation = mousePos.x * Math.PI * rotationSpeed;

      // Clamp the rotations to the defined range
      head.rotation.x = Math.max(
        -Xclmap,
        Math.min(Xclmap + 0.01, newXRotation)
      );
      head.rotation.z = Math.max(
        -Zclmap,
        Math.min(Zclmap + 0.01, newZRotation)
      );
      headtwo.rotation.x = Math.max(-Xclmap, Math.min(Xclmap, newXRotation));
      headtwo.rotation.z = Math.max(-Zclmap, Math.min(Zclmap, newZRotation));
      headthree.rotation.x = Math.max(-Xclmap, Math.min(Xclmap, newXRotation));
      headthree.rotation.z = Math.max(-Zclmap, Math.min(Zclmap, newZRotation));
    } else console.warn("Head mesh not found for morph target manipulation.");
  });

  return <primitive object={model} />;
}
// Preload commonly used models for better performance
useGLTF.preload("/3d-assets/AnimatedRobot.glb");
