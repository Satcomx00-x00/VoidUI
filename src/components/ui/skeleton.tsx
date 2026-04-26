import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Shimmering placeholder block. Compose multiples to mock content while
 * loading.
 *
 * ```tsx
 * <Skeleton className="h-3 w-32" />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Skeleton({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("void-skeleton rounded-[4px]", className)}
        {...rest}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
