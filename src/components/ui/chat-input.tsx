"use client";

import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSend"> {
  variant?: "default" | "minimal" | "glass" | "outlined";
  onSend?: (value: string) => void;
  containerClassName?: string;
}

export function ChatInput({
  className,
  variant = "default",
  onSend,
  onKeyPress,
  containerClassName,
  ...props
}: ChatInputProps) {
  const [message, setMessage] = useState(props.value?.toString() || "");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    onKeyPress?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    props.onChange?.(e);
  };

  const baseContainerClasses =
    "relative flex items-center gap-2 p-1.5 transition-all";
  const baseInputClasses =
    "flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100";

  const variantClasses = {
    default: cn(
      "bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700",
      "hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-500/20",
      baseContainerClasses,
    ),
    minimal: cn(
      "bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700",
      "hover:shadow-lg transition-shadow",
      baseContainerClasses,
    ),
    glass: cn(
      "bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg",
      "border border-white/20 dark:border-slate-700/50",
      "hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all",
      baseContainerClasses,
    ),
    outlined: cn(
      "bg-transparent rounded-xl border-2 border-slate-300 dark:border-slate-600",
      "hover:border-blue-500 dark:hover:border-blue-500",
      "focus-within:border-blue-500 transition-colors",
      baseContainerClasses,
    ),
  };

  const buttonClasses = {
    default: cn(
      "group relative flex items-center justify-center size-11 rounded-xl transition-all duration-300",
      "disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 overflow-hidden",
    ),
    minimal: cn(
      "flex items-center justify-center size-10",
      "bg-blue-600 hover:bg-blue-700",
      "text-white rounded-full transition-colors shadow-sm",
    ),
    glass: cn(
      "flex items-center justify-center h-11 px-5",
      "bg-gradient-to-r from-purple-600 to-pink-600",
      "hover:from-purple-700 hover:to-pink-700",
      "text-white rounded-xl transition-all shadow-md active:scale-95",
    ),
    outlined: cn(
      "flex items-center justify-center h-10 px-4",
      "bg-blue-600 hover:bg-blue-700",
      "text-white rounded-lg transition-colors",
    ),
  };

  return (
    <div className={cn(variantClasses[variant], containerClassName)}>
      <input
        {...props}
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={cn(
          baseInputClasses,
          variant === "minimal" ? "px-5 py-2.5" : "px-4 py-3",
          className,
        )}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!message.trim()}
        className={buttonClasses[variant]}
      >
        {variant === "default" ? (
          <>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700" />

            {/* Animated shine effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 translate-x-[-100%] skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            </div>

            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-shadow duration-300 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />

            {/* Icon */}
            <Send className="relative z-10 size-4 text-white transition-transform duration-200 group-hover:scale-110" />
          </>
        ) : (
          <Send className="size-4" />
        )}
      </button>
    </div>
  );
}
