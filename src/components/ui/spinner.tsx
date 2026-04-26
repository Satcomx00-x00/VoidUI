import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

const DOT_DELAYS = [
  "0s",
  "0.1s",
  "0.2s",
  "0.7s",
  "0.3s",
  "0.6s",
  "0.4s",
  "0.5s",
  "0.0s",
] as const;

/**
 * 3×3 dot-matrix loading indicator — a Nothing-style breathing grid.
 * The center dot uses the accent colour to keep the brand mark visible.
 */
export const Spinner = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function Spinner({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-grid h-6 w-6 grid-cols-3 grid-rows-3 gap-[2px]",
          className,
        )}
        {...rest}
      >
        {DOT_DELAYS.map((delay, i) => (
          <i
            key={i}
            className={cn(
              "block h-1 w-1",
              i === 4 ? "bg-accent" : "bg-fg-muted",
            )}
            style={{
              animation: "void-spin-dots 1.2s var(--ease-snap) infinite",
              animationDelay: delay,
            }}
          />
        ))}
      </span>
    );
  },
);
Spinner.displayName = "Spinner";
