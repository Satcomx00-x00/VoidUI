import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show a subtle error border. */
  error?: boolean;
}

/**
 * A Nothing-style multiline text input.
 *
 * Matches `Input` styling — dark surface, red accent focus ring.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        "flex min-h-[100px] w-full rounded-[var(--radius-md)] border bg-void-950 px-3 py-2.5 text-sm",
        "text-text-primary placeholder:text-text-muted",
        "resize-y",
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

Textarea.displayName = "Textarea";
