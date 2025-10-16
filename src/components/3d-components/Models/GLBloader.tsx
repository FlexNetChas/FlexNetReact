import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect } from "react";
import useAnimationComponent from "../Animation/AnimationComponent";
import { fixModelTextures } from "../Utility/FixTextureUtility";

interface ModelGLBProps {
  path: string;
}

// GLB model loader component, "scene" is called "model" here to avoid confusion with Three.js Scene
export default function GLBloader({ path }: ModelGLBProps) {
  // We load the model and animations using useGLTF, then pass them to the animation component
  const { scene: model, animations } = useGLTF(path);
  useAnimationComponent({ model, animations });

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
