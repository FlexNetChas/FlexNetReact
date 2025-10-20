"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AnimationState = "idle" | "talking";

interface AnimationContextType {
  animation: AnimationState;
  setAnimation: (state: AnimationState) => void;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animation, setAnimation] = useState<AnimationState>("talking"); //start value

  const toggleAnimation = () => {
    setAnimation((prev) => (prev === "idle" ? "talking" : "idle"));
  };

  return (
    <AnimationContext.Provider
      value={{ animation, setAnimation, toggleAnimation }}
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
