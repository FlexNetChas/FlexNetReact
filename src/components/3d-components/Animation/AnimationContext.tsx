"use client";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

export type AnimationState =
  | "Dance"
  | "Death"
  | "Idle"
  | "Jump"
  | "No"
  | "Punch"
  | "Running"
  | "Sitting"
  | "Standing"
  | "ThumbsUp"
  | "WalkJump"
  | "Walking"
  | "Wave"
  | "Yes";

interface AnimationContextType {
  activeAnimations: Record<string, boolean>;
  setAnimationState: (
    animation: AnimationState,
    state: boolean,
    options?: AnimationOptions,
  ) => void;
  defaultAnimation: AnimationState;
}

interface AnimationOptions {
  loop?: boolean;
  timeout?: number;
  onComplete?: () => void;
}
const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [activeAnimations, setActiveAnimations] = useState<
    Record<AnimationState, boolean>
  >({
    Dance: false,
    Death: false,
    Idle: false,
    Jump: false,
    No: false,
    Punch: false,
    Running: false,
    Sitting: false,
    Standing: false,
    ThumbsUp: false,
    WalkJump: false,
    Walking: false,
    Wave: false,
    Yes: false,
  });

  const defaultAnimation: AnimationState = "Idle";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setAnimationState = (
    animation: AnimationState,
    state: boolean,
    options?: AnimationOptions,
  ) => {
    // clear previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // set animation state, using reduce to avoid mutating state directly.
    setActiveAnimations((prev) =>
      (Object.keys(prev) as AnimationState[]).reduce(
        (acc, key) => {
          return {
            ...acc,
            [key]: key === animation ? state : false,
          };
        },
        {} as typeof prev,
      ),
    );

    // Handle timeout
    // if no callback, revert to default unless its death
    if (options?.timeout && state) {
      timeoutRef.current = setTimeout(() => {
        options?.onComplete?.();

        if (!options?.onComplete) {
          if (animation !== "Death") {
            setAnimationState(defaultAnimation, true, { loop: true });
          }
        }
      }, options.timeout);
    }
  };

  return (
    <AnimationContext.Provider
      value={{ activeAnimations, defaultAnimation, setAnimationState }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx)
    throw new Error("useAnimation must be used within AnimationProvider");
  return ctx;
}
