import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface DotBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Diameter of each dot in pixels.
   * @default 1
   */
  dotSize?: number;
  /**
   * Grid cell size (spacing between dots) in pixels.
   * @default 24
   */
  spacing?: number;
  /**
   * Overall opacity of the dot layer (0–1).
   * @default 0.5
   */
  opacity?: number;
  /**
   * CSS mask applied to the dot layer. Use `"none"` to show the grid
   * uniformly, or any valid `mask-image` value.
   *
   * Defaults to a vertical fade-in/fade-out so the grid dissolves at both
   * edges — matching the template hero design.
   */
  mask?: string;
  /**
   * When `true`, the dot layer fills its nearest positioned ancestor
   * (`position: absolute; inset: 0`). Set to `false` if you want the
   * component to participate in normal document flow instead.
   * @default true
   */
  inset?: boolean;
}

/**
 * Repeating radial-gradient dot grid used as a decorative background layer.
 *
 * Drop it as the first child of a `relative overflow-hidden` container and it
 * will fill the parent, matching the hero section in the VoidUI templates.
 *
 * ```tsx
 * <section className="relative overflow-hidden">
 *   <DotBackground />
 *   <div className="relative z-10">…</div>
 * </section>
 * ```
 *
 * Customise colour via the CSS custom property `--dot-color` on any ancestor,
 * or override the `background-image` directly through `className` / `style`.
 */
export const DotBackground = forwardRef<HTMLDivElement, DotBackgroundProps>(function DotBackground(
  {
    className,
    style,
    dotSize = 1,
    spacing = 24,
    opacity = 0.5,
    mask = "linear-gradient(180deg, transparent, black 20%, black 60%, transparent)",
    inset = true,
    "aria-hidden": ariaHidden = true,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden}
      className={cn(inset ? "absolute inset-0" : "relative h-full w-full", className)}
      style={{
        backgroundImage: `radial-gradient(var(--dot-color, var(--border)) ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity,
        maskImage: mask === "none" ? undefined : mask,
        WebkitMaskImage: mask === "none" ? undefined : mask,
        pointerEvents: "none",
        ...style,
      }}
      {...rest}
    />
  );
});
DotBackground.displayName = "DotBackground";
