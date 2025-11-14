import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  className?: string;
  id?: string;
}

const spacingClasses = {
  none: "",
  xs: "py-4 md:py-8",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-20",
  lg: "py-16 md:py-28",
  xl: "py-20 md:py-32",
};

export function Section({
  children,
  spacing = "md",
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      {children}
    </section>
  );
}
