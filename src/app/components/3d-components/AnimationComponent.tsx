import { AnimationMixer, Group, AnimationClip } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

interface AnimationComponentProps {
  scene: Group;
  animations: AnimationClip[];
  activeClipIndex?: number;
}

export default function useAnimationComponent({
  scene,
  animations,
  activeClipIndex = 0,
}: AnimationComponentProps) {
  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (!scene || !animations?.length) return;

    mixerRef.current = new AnimationMixer(scene);
    const action = mixerRef.current.clipAction(animations[activeClipIndex]);
    if (action) action.play();

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene, animations, activeClipIndex]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return mixerRef;
}
