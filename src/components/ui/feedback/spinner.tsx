import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Size presets for the Spinner component. */
const spinnerSizes = {
  sm: "size-4 border-[1.5px]",
  md: "size-6 border-2",
  lg: "size-8 border-[2.5px]",
} as const;

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default "md" */
  size?: keyof typeof spinnerSizes;
}

/**
 * A minimal circular loading spinner.
 *
 * Uses a CSS `animate-spin` border trick — no JS animation,
 * no additional dependencies.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full",
        "border-void-700 border-t-accent",
        spinnerSizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Spinner.displayName = "Spinner";
