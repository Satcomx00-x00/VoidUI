import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Class-variance-authority recipe powering the {@link Badge} component.
 *
 * Variants:
 * - `default` — outlined neutral pill
 * - `solid`   — inverted fill (foreground bg, background text)
 * - `accent`  — soft accent fill, accent foreground
 * - `success` — mint outline / text
 * - `warning` — amber outline / text
 * - `error`   — red outline / text
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 px-2 py-[3px]",
    "rounded-[5px] border text-[10px] tracking-[0.18em] uppercase",
  ],
  {
    variants: {
      variant: {
        default: "bg-bg text-fg-muted border-border",
        solid: "bg-fg text-bg border-fg",
        accent:
          "bg-accent-soft text-accent border-[color-mix(in_oklch,var(--accent)_40%,transparent)]",
        success:
          "bg-transparent text-[oklch(68%_0.14_150)] border-[color-mix(in_oklch,oklch(68%_0.14_150)_40%,transparent)]",
        warning:
          "bg-transparent text-[oklch(72%_0.16_70)] border-[color-mix(in_oklch,oklch(72%_0.16_70)_40%,transparent)]",
        error:
          "bg-transparent text-[oklch(62%_0.18_25)] border-[color-mix(in_oklch,oklch(62%_0.18_25)_40%,transparent)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Render a leading status dot in the current text color. */
  dot?: boolean;
}

/**
 * Compact pill for status / metadata. Uppercased, wide-tracked, monospace.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, dot = false, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-variant={variant ?? "default"}
      className={cn(badgeVariants({ variant }), className)}
      {...rest}
    >
      {dot ? (
        <span aria-hidden="true" className="inline-block h-[5px] w-[5px] rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
});
Badge.displayName = "Badge";
