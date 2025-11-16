"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  className?: string;
}

// Config delays, durations and number of meteors
export const Meteors = ({
  number = 100,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 5,
  maxDuration = 25,

  className,
}: MeteorsProps) => {
  const [meteors, setMeteors] = useState<
    Array<{
      style: React.CSSProperties;
      colorClass: string;
      gradientFrom: string;
    }>
  >([]);

  const northenLightColors = [
    { bg: "bg-green-400", from: "from-green-400" },
    { bg: "bg-green-300", from: "from-green-300" },
    { bg: "bg-lime-300", from: "from-lime-300" },
    { bg: "bg-emerald-400", from: "from-emerald-400" },
    { bg: "bg-teal-300", from: "from-teal-300" },
    { bg: "bg-cyan-300", from: "from-cyan-300" },
    { bg: "bg-sky-300", from: "from-sky-300" },
    { bg: "bg-blue-400", from: "from-blue-400" },
    { bg: "bg-indigo-400", from: "from-indigo-400" },
    { bg: "bg-purple-400", from: "from-purple-400" },
    { bg: "bg-fuchsia-400", from: "from-fuchsia-400" },
    { bg: "bg-pink-400", from: "from-pink-400" },
  ];

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newMeteors = [...new Array(number)].map(() => {
      // Adjust starting positions based on screen size
      const startLeft =
        screenWidth < 640 // sm breakpoint (640px)
          ? -50 + Math.random() * 60
          : -79 + Math.random() * 80;

      const startTop =
        screenHeight < 640
          ? -50 + Math.random() * 60
          : -79 + Math.random() * 80;

      const randomColor =
        northenLightColors[
          Math.floor(Math.random() * northenLightColors.length)
        ];

      return {
        style: {
          top: `${startTop}vh`,
          left: `${startLeft}vw`,
          animationDelay:
            Math.random() * (maxDelay - minDelay) + minDelay + "s",
          animationDuration:
            Math.random() * (maxDuration - minDuration) + minDuration + "s",
        },
        colorClass: randomColor.bg,
        gradientFrom: randomColor.from,
      };
    });

    setMeteors(newMeteors);
  }, [number, minDelay, maxDelay, minDuration, maxDuration]);

  return (
    <>
      {/* Adjust blure and opacity for tail effects */}
      {meteors.map((meteor, idx) => (
        <span
          key={idx}
          style={meteor.style}
          className={cn(
            "pointer-events-none absolute size-0.5 animate-meteor rounded-full shadow-[0_0_10px_currentColor]",
            "aurora-pulse",
            meteor.colorClass,
            className
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 -z-10 h-px w-[100px] -translate-y-1/2 bg-gradient-to-r to-transparent",
              "blur-md opacity-90 aurora-tail-pulse",
              meteor.gradientFrom
            )}
          />
        </span>
      ))}
    </>
  );
};
