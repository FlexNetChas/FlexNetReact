import React from "react";

import { cn } from "@/lib/utils";

import { VariantProps, cva } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "relative group border text-foreground text-center rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

  {
    variants: {
      variant: {
        default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",

        solid:
          "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",

        ghost:
          "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",

        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "px-7 py-1.5 ",

        sm: "px-4 py-0.5 ",

        lg: "px-10 py-2.5 ",

        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",

      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean;

  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      neon,
      size,
      variant = "default",
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Default neon to true only for 'default' variant, false for others
    const shouldShowNeon = neon !== undefined ? neon : variant === "default";

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
            shouldShowNeon && "block"
          )}
        />

        {children}

        <span
          className={cn(
            "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
            shouldShowNeon && "block"
          )}
        />
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
