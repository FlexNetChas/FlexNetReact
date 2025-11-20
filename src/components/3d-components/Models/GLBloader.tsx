import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect } from "react";
import useAnimationComponent from "../Animation/AnimationComponent";
import { fixModelTextures } from "../Utility/FixTextureUtility";
import { useMemo } from "react";

interface ModelGLBProps {
  path: string;
}

// GLB model loader component, "scene" is called "model" here to avoid confusion with Three.js Scene
export default function GLBloader({ path }: ModelGLBProps) {
  // We load the model and animations using useGLTF, then pass them to the animation component
  const { scene: model, animations } = useGLTF(path);
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
      }
    });
    fixModelTextures(model);
  }, [model]);

  return <primitive object={model} />;
}

// Preload commonly used models for better performance
useGLTF.preload("/3d-assets/AnimatedRobot.glb");
