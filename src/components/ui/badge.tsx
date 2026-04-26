import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Visual variants for the {@link Badge} component.
 *
 * - `default` — Outlined neutral pill.
 * - `solid`   — Inverted fill (foreground bg, background text).
 * - `accent`  — Soft accent fill, accent foreground.
 * - `success` — Mint outline / text.
 * - `warning` — Amber outline / text.
 * - `error`   — Red outline / text.
 */
export type BadgeVariant = "default" | "solid" | "accent" | "success" | "warning" | "error";

const variantClasses = {
  default: "bg-bg text-fg-muted border-border",
  solid: "bg-fg text-bg border-fg",
  accent: "bg-accent-soft text-accent border-[color-mix(in_oklch,var(--accent)_40%,transparent)]",
  success:
    "bg-transparent text-[oklch(68%_0.14_150)] border-[color-mix(in_oklch,oklch(68%_0.14_150)_40%,transparent)]",
  warning:
    "bg-transparent text-[oklch(72%_0.16_70)] border-[color-mix(in_oklch,oklch(72%_0.16_70)_40%,transparent)]",
  error:
    "bg-transparent text-[oklch(62%_0.18_25)] border-[color-mix(in_oklch,oklch(62%_0.18_25)_40%,transparent)]",
} as const satisfies Record<BadgeVariant, string>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style. Defaults to `"default"`. */
  variant?: BadgeVariant;
  /** Render a leading status dot in the current text color. */
  dot?: boolean;
}

/**
 * Compact pill for status / metadata. Uppercased, wide-tracked, monospace.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant = "default", dot = false, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-variant={variant}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-[3px]",
        "border rounded-[5px] text-[10px] uppercase tracking-[0.18em]",
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block h-[5px] w-[5px] rounded-full bg-current"
        />
      ) : null}
      {children}
    </span>
  );
});
Badge.displayName = "Badge";
