import { useGLTF } from "@react-three/drei";
import { Group, Mesh } from "three";
import { useEffect, useRef } from "react";
import useAnimationComponent from "./AnimationComponent";

interface ModelGLBProps {
  path: string;
}

export default function ModelGLB({ path }: ModelGLBProps) {
  const { scene, animations } = useGLTF(path);
  const modelRef = useRef<Group>(null);

  useAnimationComponent({ scene, animations });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).castShadow = true;
        (child as Mesh).receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} ref={modelRef} />;
}

useGLTF.preload("/3d-assets/AnimatedRobot.glb");
useGLTF.preload("/3d-assets/CoolBannanaGuy.glb");
