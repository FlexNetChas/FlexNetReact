"use client";

import * as React from "react";
import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModernInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "minimal" | "glass" | "outlined";
  showSendButton?: boolean;
  onSend?: (value: string) => void;
}

const ModernInput = React.forwardRef<HTMLInputElement, ModernInputProps>(
  (
    {
      className,
      variant = "default",
      showSendButton = false,
      onSend,
      onKeyPress,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(props.value?.toString() || "");

    const handleSend = () => {
      if (value.trim() && onSend) {
        onSend(value);
        setValue("");
      }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey && showSendButton) {
        e.preventDefault();
        handleSend();
      }
      onKeyPress?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const baseContainerClasses = "relative flex items-center gap-2 p-1.5 transition-all";
    const baseInputClasses =
      "flex-1 bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100";

    const variantClasses = {
      default: cn(
        "bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700",
        "hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-500/20",
        baseContainerClasses
      ),
      minimal: cn(
        "bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700",
        "hover:shadow-lg transition-shadow",
        baseContainerClasses
      ),
      glass: cn(
        "bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg",
        "border border-white/20 dark:border-slate-700/50",
        "hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all",
        baseContainerClasses
      ),
      outlined: cn(
        "bg-transparent rounded-xl border-2 border-slate-300 dark:border-slate-600",
        "hover:border-blue-500 dark:hover:border-blue-500",
        "focus-within:border-blue-500 transition-colors",
        baseContainerClasses
      ),
    };

    const buttonClasses = {
      default: cn(
        "flex items-center justify-center h-11 px-5",
        "bg-gradient-to-r from-blue-600 to-blue-500",
        "hover:from-blue-700 hover:to-blue-600",
        "text-white rounded-xl transition-all duration-200",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "disabled:hover:from-blue-600 disabled:hover:to-blue-500",
        "shadow-md hover:shadow-lg active:scale-95"
      ),
      minimal: cn(
        "flex items-center justify-center size-10",
        "bg-blue-600 hover:bg-blue-700",
        "text-white rounded-full transition-colors shadow-sm"
      ),
      glass: cn(
        "flex items-center justify-center h-11 px-5",
        "bg-gradient-to-r from-purple-600 to-pink-600",
        "hover:from-purple-700 hover:to-pink-700",
        "text-white rounded-xl transition-all shadow-md active:scale-95"
      ),
      outlined: cn(
        "flex items-center justify-center h-10 px-4",
        "bg-blue-600 hover:bg-blue-700",
        "text-white rounded-lg transition-colors"
      ),
    };

    return (
      <div className={variantClasses[variant]}>
        <input
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={cn(
            baseInputClasses,
            variant === "minimal" ? "px-5 py-2.5" : "px-4 py-3",
            className
          )}
        />
        {showSendButton && (
          <button
            type="button"
            onClick={handleSend}
            disabled={!value.trim()}
            className={buttonClasses[variant]}
          >
            <Send className="size-4" />
            {variant === "default" && <span className="ml-2">Send</span>}
          </button>
        )}
      </div>
    );
  }
);

ModernInput.displayName = "ModernInput";

export { ModernInput };

