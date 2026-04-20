import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const statusStyles = {
  online: "bg-void-300",
  offline: "bg-void-600",
  busy: "bg-nothing-red",
  away: "bg-void-500",
} as const satisfies Record<string, string>;

type StatusVariant = keyof typeof statusStyles;

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default "offline" */
  status?: StatusVariant;
  /** Animate with a soft pulse. @default false */
  pulse?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

const dotSizes = {
  sm: "size-1.5",
  md: "size-2.5",
  lg: "size-3.5",
} as const;

/**
 * A Nothing-style LED-like status dot.
 *
 * Supports `online`, `offline`, `busy`, and `away` variants with optional
 * pulse animation for live-status indication.
 */
export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status = "offline", pulse = false, size = "md", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={status}
      className={cn(
        "inline-block shrink-0 rounded-full",
        dotSizes[size],
        statusStyles[status],
        pulse && "void-animate-pulse-dot",
        className,
      )}
      {...props}
    />
  ),
);

StatusDot.displayName = "StatusDot";
