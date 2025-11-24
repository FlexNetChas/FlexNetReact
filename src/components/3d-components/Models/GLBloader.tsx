import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import useAnimationComponent from "../Animation/AnimationComponent";
import { fixModelTextures } from "../Utility/FixTextureUtility";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";

interface ModelGLBProps {
  path: string;
}
interface MousePosition {
  x: number;
  y: number;
  z: number;
}

// GLB model loader component, "scene" is called "model" here to avoid confusion with Three.js Scene
export default function GLBloader({ path }: ModelGLBProps) {
  // We load the model and animations using useGLTF, then pass them to the animation component
  const { scene: model, animations } = useGLTF(path);
  const eyebrowsAndEyes = useRef<Mesh | null>(null);
  const headRefFirstPart = useRef<Mesh | null>(null);
  const headRefSecondPart = useRef<Mesh | null>(null);
  let [mousePos, setMousePos] = useState<MousePosition>({x:1,y:1,z:1});
  //Clean up the animation names and pass it to animationContext.
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

  // Model is basically an array of objects (react-three-fiber: group), we need to traverse it to enable shadows and check if textures color space needs fixing.
  useEffect(() => {
    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
        (child as Mesh).receiveShadow = true;
        switch ((child as Mesh).name) {
          case "Head_2":
            headRefFirstPart.current = child as Mesh;
            break;
          case "Head_3":
            headRefSecondPart.current = child as Mesh;
            break;
          case "Head_4":
            eyebrowsAndEyes.current = child as Mesh;
            break;
          default:
            break;
      }
      }
    });
    fixModelTextures(model);
  }, [model]);

  // mouse tracker
  useEffect(() => {
    const handleMouseMovement = (event: MouseEvent) => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const relativeX = event.clientX - (rect.left + rect.width / 2);
      const relativeY = event.clientY - (rect.top + rect.height / 2);

      const x = relativeX / (rect.width / 2)
      const y = -relativeY / (rect.height / 2)

      setMousePos({ x, y, z: 1 });
    }
    window.addEventListener("mousemove", handleMouseMovement);
    return () => {
    window.removeEventListener("mousemove", handleMouseMovement);
      
    }
  }, []);

  useFrame(() => {
    const eyebrowsIndex = 1;
    const distance = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2)
    let anger: number = Math.max(0, 1.5 - distance);
    
    if (anger > 0.7) anger = 0.7;

    if (eyebrowsAndEyes.current?.morphTargetInfluences) {
      eyebrowsAndEyes.current.morphTargetInfluences[eyebrowsIndex] = -anger; // this is what make it angry
    }

    // head movement to follow mouse
    if (eyebrowsAndEyes.current) {
      
      const rotationSpeed = 0.03;
      const Xclamp = 0.2;
      const Zclamp = 0.2;

      let newX: number = -mousePos.y * Math.PI * rotationSpeed;
      let newZ: number = mousePos.x * Math.PI * rotationSpeed;

      eyebrowsAndEyes.current.rotation.x = Math.max(-Xclamp + 0.01, Math.min(Xclamp + 0.01, newX));
      eyebrowsAndEyes.current.rotation.z = Math.max(-Zclamp, Math.min(Zclamp + 0.01, newZ)); 

      if (headRefFirstPart.current) {
        headRefFirstPart.current.rotation.x = Math.max(-Xclamp + 0.01, Math.min(Xclamp + 0.01, newX));
        headRefFirstPart.current.rotation.z = Math.max(-Zclamp, Math.min(Zclamp + 0.01, newZ)); 
      }
      if (headRefSecondPart.current) {
        headRefSecondPart.current.rotation.x = Math.max(-Xclamp + 0.01, Math.min(Xclamp + 0.01, newX));
        headRefSecondPart.current.rotation.z = Math.max(-Zclamp, Math.min(Zclamp + 0.01, newZ)); 
      }
      
    }
  })
  return <primitive object={model} />;
}

// Preload commonly used models for better performance
useGLTF.preload("/3d-assets/AnimatedRobot.glb");
