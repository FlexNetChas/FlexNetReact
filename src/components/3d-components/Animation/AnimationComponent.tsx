import { AnimationMixer, Group, AnimationClip, AnimationAction } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useAnimation } from "./AnimationContext";

interface AnimationComponentProps {
  model: Group;
  animations: AnimationClip[];
  activeClipIndex?: number;
}

//Gets a model (Group) and animations (AnimationClip[]) as props, sets up an AnimationMixer and plays the specified animation clip based on the activeClipIndex prop.
//Also listens to changes in the animation state from the AnimationContext to start/stop the animation accordingly.
export default function useAnimationComponent({
  model,
  animations,
  activeClipIndex = 0,
}: AnimationComponentProps) {
  const mixerRef = useRef<AnimationMixer | null>(null);
  const actionRef = useRef<AnimationAction | null>(null);
  const { animation } = useAnimation();

  useEffect(() => {
    if (!model || !animations?.length) return;

    mixerRef.current = new AnimationMixer(model);

    actionRef.current = mixerRef.current.clipAction(
      animations[activeClipIndex]
    );

    if (actionRef.current) actionRef.current.play();

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [model, animations, activeClipIndex]);

  //Temporary idle is just stopping the animation, not swapping to another animation.
  //TODO: update activeClipIndex when Idle animation actually exists, this useEffect should then be removed/merged with the above useEffect.
  useEffect(() => {
    if (animation === "talking") {
      actionRef.current?.play();
    } else if (animation === "idle") {
      actionRef.current?.stop();
    }
  }, [animation]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return mixerRef;
}
