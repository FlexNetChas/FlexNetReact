import { useMemo } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type ContainerPadding = "none" | "sm" | "md" | "lg";

interface UseContainerOptions {
  size?: ContainerSize;
  padding?: ContainerPadding;
  className?: string;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  full: "max-w-full",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "",
  sm: "px-4 md:px-6",
  md: "px-6 md:px-12 lg:px-20",
  lg: "px-6 md:px-20 lg:px-32",
};

export function useContainer(options: UseContainerOptions = {}) {
  const { size = "lg", padding = "md", className = "" } = options;

  return useMemo(
    () => ({
      className:
        `container mx-auto ${sizeClasses[size]} ${paddingClasses[padding]} ${className}`.trim(),
    }),
    [size, padding, className]
  );
}
