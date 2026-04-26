import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/*  Card variant types                                                         */
/* -------------------------------------------------------------------------- */

export type CardVariant = "default" | "interactive" | "featured";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual / behavioural variant.
   * - `default`     — static surface (border hover only)
   * - `interactive` — clickable lift + shadow on hover, press feedback on active
   * - `featured`    — accent border treatment to draw attention
   */
  variant?: CardVariant;
}

/**
 * Outer Card container — bordered surface with subtle hover.
 * Add `overflow-hidden` so that `CardImage` bleeds edge-to-edge.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "default", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-variant={variant}
      className={cn(
        "border-border bg-surface-raised relative overflow-hidden rounded-lg border p-5",
        "transition-all duration-[var(--dur-med)] ease-[var(--ease-snap)]",
        "hover:border-border-strong",
        variant === "interactive" && [
          "cursor-pointer select-none",
          "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]",
          "active:translate-y-0 active:scale-[0.99]",
        ],
        variant === "featured" && [
          "border-accent/30",
          "shadow-[inset_0_0_0_1px_var(--accent-soft),0_0_48px_-12px_var(--accent-soft)]",
        ],
        className,
      )}
      {...rest}
    />
  );
});
Card.displayName = "Card";

/**
 * Display title using the dot-matrix display font.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={cn(
          "font-display text-fg m-0 mb-2.5 text-[24px] leading-none tracking-[0.02em]",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

/**
 * Meta row above the body — small uppercase caption, dashed bottom rule.
 */
export const CardMeta = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardMeta({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-border mb-3.5 flex justify-between border-b border-dashed pb-3.5",
          "text-fg-muted text-[10px] tracking-[0.18em] uppercase",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardMeta.displayName = "CardMeta";

/**
 * Body text — secondary color, comfortable line-height.
 */
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn("text-fg-muted text-xs leading-[1.6]", className)} {...rest} />
    );
  },
);
CardBody.displayName = "CardBody";

/**
 * Footer row — dashed top rule, small uppercase tag-line.
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-border mt-4 flex items-center gap-1.5 border-t border-dashed pt-3.5",
          "text-fg-muted text-[10px] tracking-[0.18em] uppercase",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

/**
 * Decorative accent dot anchored to the top-right corner of a Card.
 * Use to flag "live", "new", or "selected" state.
 */
export const CardCorner = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function CardCorner({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "bg-accent absolute top-2 right-2 h-1.5 w-1.5 rounded-full",
          "shadow-[0_0_0_3px_var(--accent-soft)]",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardCorner.displayName = "CardCorner";

/* -------------------------------------------------------------------------- */
/*  CardImage                                                                  */
/* -------------------------------------------------------------------------- */

export type CardImageAspect = "video" | "square" | "wide";

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Native img src — omit to render children as custom placeholder art. */
  src?: string;
  /** Alt text for the img element (ignored when no src is provided). */
  alt?: string;
  /** Aspect ratio preset. Defaults to `"video"` (16/9). */
  aspectRatio?: CardImageAspect;
}

/**
 * Full-bleed image (or placeholder) at the top of a Card.
 * Bleeds through the Card's padding via negative margins.
 * Place it as the first child of `<Card>` before any other content.
 */
export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(function CardImage(
  { className, src, alt = "", aspectRatio = "video", children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "-mx-5 -mt-5 mb-4",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "wide" && "aspect-[3/1]",
        className,
      )}
      {...rest}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        (children ?? <div className="bg-bg-muted h-full w-full" />)
      )}
    </div>
  );
});
CardImage.displayName = "CardImage";

/* -------------------------------------------------------------------------- */
/*  CardHeader                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal icon + text header row.
 * Accepts any children — typically an icon/avatar on the left and
 * a `<div>` column (name, role) on the right.
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("mb-3.5 flex items-center gap-3", className)} {...rest} />;
  },
);
CardHeader.displayName = "CardHeader";

/* -------------------------------------------------------------------------- */
/*  CardStat                                                                   */
/* -------------------------------------------------------------------------- */

export type CardStatDeltaDir = "up" | "down" | "neutral";

export interface CardStatProps extends HTMLAttributes<HTMLDivElement> {
  /** The primary metric value — can be a string, number, or JSX. */
  value: ReactNode;
  /** Descriptive label rendered below the value in small caps. */
  label: string;
  /** Optional delta string, e.g. "+12%" or "−4 ms". */
  delta?: string;
  /** Controls the delta color treatment. */
  deltaDir?: CardStatDeltaDir;
}

/**
 * Large dot-matrix metric display with optional trend delta.
 * Place standalone or combine multiple inside a Card.
 */
export const CardStat = forwardRef<HTMLDivElement, CardStatProps>(function CardStat(
  { className, value, label, delta, deltaDir = "neutral", ...rest },
  ref,
) {
  const deltaColor =
    deltaDir === "up"
      ? "text-[oklch(72%_0.18_145)]" /* muted green */
      : deltaDir === "down"
        ? "text-[oklch(60%_0.22_25)]" /* muted red   */
        : "text-fg-muted";

  return (
    <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...rest}>
      <div className="flex items-end gap-2">
        <span className="font-dot text-fg text-[40px] leading-none tracking-[0.02em]">{value}</span>
        {delta !== undefined && (
          <span className={cn("mb-1 text-[11px] tracking-wide", deltaColor)}>{delta}</span>
        )}
      </div>
      <span className="text-fg-muted text-[10px] tracking-[0.18em] uppercase">{label}</span>
    </div>
  );
});
CardStat.displayName = "CardStat";
