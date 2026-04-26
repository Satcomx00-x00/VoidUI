import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical";
  /** Render a dashed rule instead of solid. */
  dashed?: boolean;
}

/**
 * Thin divider line. Decorative by default (`role="presentation"`); pass
 * `role="separator"` and `aria-orientation` if it carries semantic weight.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, orientation = "horizontal", dashed = false, role = "presentation", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      data-orientation={orientation}
      className={cn(
        "shrink-0 border-border",
        orientation === "horizontal" ? "h-px w-full border-t" : "h-full w-px border-l",
        dashed ? "border-dashed" : "border-solid",
        className,
      )}
      {...rest}
    />
  );
});
Separator.displayName = "Separator";
