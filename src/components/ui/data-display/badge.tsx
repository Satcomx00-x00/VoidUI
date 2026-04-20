import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Badge color variants × tone combinations.
 *
 * - `soft` (default): translucent background — subtle and minimal.
 * - `hard`: solid opaque background — bold and high-contrast.
 */
const badgeStyles = {
  default: {
    soft: "bg-void-800 text-void-200",
    hard: "bg-void-600 text-void-100",
  },
  accent: {
    soft: "bg-accent-muted text-nothing-red",
    hard: "bg-nothing-red text-void-white",
  },
  success: {
    soft: "bg-void-700/40 text-void-200",
    hard: "bg-void-600 text-void-100",
  },
  muted: {
    soft: "bg-void-900 text-void-500",
    hard: "bg-void-700 text-void-300",
  },
} as const satisfies Record<string, Record<"soft" | "hard", string>>;

type BadgeVariant = keyof typeof badgeStyles;
type BadgeTone = "soft" | "hard";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color scheme of the badge. @default "default" */
  variant?: BadgeVariant;
  /**
   * Style tone — matches DaisyUI's soft/hard model.
   * - `soft`: translucent, muted background (default).
   * - `hard`: solid, opaque background for emphasis.
   * @default "soft"
   */
  tone?: BadgeTone;
}

/**
 * A small pill badge — Nothing-style minimal labeling.
 *
 * Supports four color variants and two tone styles (soft / hard).
 * Scale-in animation on mount for a polished feel.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", tone = "soft", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5",
        "text-xs font-medium",
        "void-animate-scale-in",
        badgeStyles[variant][tone],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
