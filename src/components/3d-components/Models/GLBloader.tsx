import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import useAnimationComponent from "../Animation/AnimationComponent";
import { fixModelTextures } from "../Utility/FixTextureUtility";
import { useMemo } from "react";
import { useAnimation } from "@/components/3d-components/Animation/AnimationContext";
import { useFrame } from "@react-three/fiber";
interface ModelGLBProps {
  path: string;
}

export default function GLBloader({ path }: ModelGLBProps) {
  const { scene: model, animations } = useGLTF(path);
  const { setAnimationState } = useAnimation();
  const headRef = useRef<Mesh | null>(null);
  const [angry, setAngry] = useState(0); // Angry parameter
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, z: 0 });
  const [originalHeadRotation, setOriginalHeadRotation] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

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

  // Track mouse movement to adjust facial expressions and head rotation
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

  useEffect(() => {
    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
        (child as Mesh).receiveShadow = true;
        if ((child as Mesh).name === "Head_4") {
          headRef.current = child as Mesh;
          setOriginalHeadRotation(
            headRef.current.rotation.clone() as {
              x: number;
              y: number;
              z: number;
            }
          );
        }
      }
    });
    fixModelTextures(model);
  }, [model]);

  useFrame(() => {
    // Adjust facial expression based on mouse distance from center
    const eyebrows = 1;
    const eyes = 2;
    const distance = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2);
    let anger = Math.max(0, 1.5 - distance);

    if (anger > 0.7) anger = 0.7;
    if (headRef.current?.morphTargetInfluences) {
      headRef.current.morphTargetInfluences[eyebrows] = -anger;
    }

    console.log("Anger level set to:", anger);
    // Adjust head rotation based on mouse position
    if (headRef.current) {
      const head = headRef.current as Mesh;

      const rotationSpeed = 0.02;
      const Xclamp = 0.2; // Limit rotation to avoid unnatural movement
      const Yclamp = 0.1; // Limit rotation to avoid unnatural movement

      if (originalHeadRotation) {
        if (
          originalHeadRotation.y + head.rotation.y > Yclamp &&
          originalHeadRotation.y - head.rotation.y < -Yclamp
        ) {
          head.rotation.y =
            originalHeadRotation.y + mousePos.x * Math.PI * rotationSpeed;
        }
        if (
          originalHeadRotation.x + head.rotation.x > Xclamp &&
          originalHeadRotation.x - head.rotation.x < -Xclamp
        ) {
          head.rotation.x =
            originalHeadRotation.x - mousePos.y * Math.PI * rotationSpeed;
        }
      }

      head.rotation.z = mousePos.x * Math.PI * rotationSpeed;
      head.rotation.x = -mousePos.y * Math.PI * rotationSpeed;
    } else console.warn("Head mesh not found for morph target manipulation.");
  });

  return <primitive object={model} />;
}

// Preload commonly used models for better performance
useGLTF.preload("/3d-assets/AnimatedRobot.glb");
