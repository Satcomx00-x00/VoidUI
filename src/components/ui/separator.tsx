import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

/**
 * A thin separator line for visual grouping — horizontal or vertical.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
);

Separator.displayName = "Separator";
