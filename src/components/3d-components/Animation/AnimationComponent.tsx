import { AnimationMixer, Group, AnimationClip, AnimationAction } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useAnimation } from "./AnimationContext";
import { LoopOnce } from "three";

interface AnimationComponentProps {
  model: Group;
  animations: AnimationClip[];
  animationIndexMap: Record<string, number>;
}

// Component to manage and update the active animation based on the state from AnimationContext
export default function useAnimationComponent({
  model,
  animations,
  animationIndexMap,
}: AnimationComponentProps) {
  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionRef = useRef<AnimationAction | null>(null);
  const { activeAnimations, setAnimationState, defaultAnimation } =
    useAnimation();

  useEffect(() => {
    if (!model || !animations?.length) return;
    mixerRef.current = new AnimationMixer(model);

    const defaultIdx = animationIndexMap[defaultAnimation] ?? 0;
    const waveIdx = animationIndexMap["Wave"] ?? 12;

    // Start with default animation
    setTimeout(() => {
      if (!mixerRef.current) return;
      const defaultClip = animations[12];
      const defaultAction = mixerRef.current.clipAction(defaultClip) ?? null;
      defaultAction.clampWhenFinished = true;
      defaultAction.setLoop(LoopOnce, 1);
      defaultAction.reset().play();
      actionRef.current = defaultAction;
    }, 100);

    const onFinish = () => {
      setAnimationState("Idle", true, { loop: true });
    };

    mixerRef.current.addEventListener("finished", onFinish);

    return () => {
      mixerRef.current?.removeEventListener("finished", onFinish);
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [model, animations, animationIndexMap]);

  // Effect to update animation based on active state from the context
  useEffect(() => {
    if (!mixerRef.current || !activeAnimations) return;

    const activeName = Object.keys(activeAnimations).find(
      (key) => activeAnimations[key]
    );
    if (!activeName) return;

    const clipIdx = animationIndexMap[activeName];
    if (clipIdx === undefined) return;

    const clip = animations[clipIdx];
    const newAction = mixerRef.current.clipAction(clip);

    // Stop any old actions
    mixerRef.current.stopAllAction();

    // Use loop mode depending on name or future context options
    newAction.clampWhenFinished = true;

    newAction.reset().play();
    actionRef.current = newAction;
  }, [activeAnimations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta); // Apply the animation updates every frame
  });

  return mixerRef;
}
