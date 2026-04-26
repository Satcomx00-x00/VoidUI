import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Keyboard key visual — single chord like `⌘K` or `ESC`.
 *
 * ```tsx
 * Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to open
 * ```
 */
export const Kbd = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Kbd(
  { className, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-1.5 py-[1px]",
        "border-border rounded-[3px] border",
        "text-fg-muted font-mono text-[10px] tracking-[0.04em]",
        className,
      )}
      {...rest}
    />
  );
});
Kbd.displayName = "Kbd";
