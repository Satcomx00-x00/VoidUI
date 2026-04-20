import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Show a subtle error border. */
  error?: boolean;
}

/**
 * A Nothing-style text input with focus ring animation.
 * Dark surfaces, sharp borders, and a red accent focus state.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-[var(--radius-md)] border bg-void-950 px-3 text-sm",
        "text-text-primary placeholder:text-text-muted",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        "disabled:cursor-not-allowed disabled:opacity-40",
        error
          ? "border-nothing-red/60 focus-visible:ring-nothing-red/50"
          : "border-border hover:border-void-600",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
