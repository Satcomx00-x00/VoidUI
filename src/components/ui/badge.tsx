import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const badgeVariants = {
  default: "bg-void-800 text-void-200",
  accent: "bg-accent-muted text-nothing-red",
  success: "bg-emerald-500/10 text-emerald-400",
  muted: "bg-void-900 text-void-500",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default "default" */
  variant?: keyof typeof badgeVariants;
}

/**
 * A small pill badge — Nothing-style minimal labeling.
 * Scale-in animation on mount for a polished feel.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5",
        "text-xs font-medium",
        "void-animate-scale-in",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
