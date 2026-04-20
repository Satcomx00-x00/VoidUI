import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0–`max`). @default 0 */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Render an animated indeterminate bar instead of a fixed-width fill. */
  indeterminate?: boolean;
}

/**
 * A Nothing-style progress bar.
 *
 * Supports determinate (`value` / `max`) and `indeterminate` modes.
 * Uses ARIA progressbar role with appropriate attributes.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indeterminate = false, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-void-800", className)}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full bg-accent",
            indeterminate
              ? "void-animate-progress-indeterminate absolute w-1/3"
              : "transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out-expo)]",
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";
