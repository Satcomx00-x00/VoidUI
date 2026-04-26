import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value, 0–`max`. Clamped on render. */
  value?: number;
  /** Max value. Defaults to 100. */
  max?: number;
  /** Diagonal-stripe fill. */
  striped?: boolean;
  /** Indeterminate (continuous animation, ignores `value`). */
  indeterminate?: boolean;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Linear progress bar. Reflects `value` in `aria-valuenow`. Pass
 * `indeterminate` for unknown durations.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    className,
    value = 0,
    max = 100,
    striped = false,
    indeterminate = false,
    ...rest
  },
  ref,
) {
  const safeMax = max <= 0 ? 100 : max;
  const safeValue = clamp(value, 0, safeMax);
  const pct = indeterminate ? 40 : (safeValue / safeMax) * 100;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={indeterminate ? undefined : safeValue}
      data-indeterminate={indeterminate || undefined}
      className={cn(
        "void-progress-track relative h-2 overflow-hidden rounded-[3px] border border-border",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 transition-[width] duration-[var(--dur-med)] ease-[var(--ease-snap)]",
          striped ? "void-progress-striped" : "bg-accent shadow-[inset_0_0_0_1px_var(--accent)]",
          indeterminate && "animate-pulse",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";
