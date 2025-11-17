"use client";

import { useContainer } from "@/hooks/useContainer";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  as?: "div" | "section" | "article";
}

export function PageContainer({
  children,
  size = "lg",
  padding = "md",
  className = "",
  as: Component = "div",
}: PageContainerProps) {
  const { className: containerClass } = useContainer({
    size,
    padding,
    className,
  });

  return <Component className={containerClass}>{children}</Component>;
}
