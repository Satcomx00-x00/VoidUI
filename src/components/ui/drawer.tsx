"use client";

import { forwardRef, useCallback, useEffect, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/** Edge the drawer slides in from. */
export type DrawerSide = "right" | "left" | "bottom";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls visibility. */
  open: boolean;
  /** Called when the user dismisses (Esc / overlay click). */
  onOpenChange?: (open: boolean) => void;
  /** Edge the drawer enters from. Defaults to `"right"`. */
  side?: DrawerSide;
  /** Disable backdrop click to close. */
  modal?: boolean;
}

const sideClasses = {
  right:
    "right-0 top-0 bottom-0 w-[320px] border-l border-border-strong shadow-[-8px_0_32px_color-mix(in_oklch,black_20%,transparent)]",
  left: "left-0 top-0 bottom-0 w-[320px] border-r border-border-strong shadow-[8px_0_32px_color-mix(in_oklch,black_20%,transparent)]",
  bottom:
    "left-0 right-0 bottom-0 max-h-[80vh] rounded-t-[12px] border-t border-border-strong shadow-[0_-8px_32px_color-mix(in_oklch,black_20%,transparent)]",
} as const satisfies Record<DrawerSide, string>;

const sideAnimation = {
  right: "void-drawer-in-right",
  left: "void-drawer-in-left",
  bottom: "void-drawer-in-bottom",
} as const satisfies Record<DrawerSide, string>;

/**
 * Edge-anchored sheet. Use `<DrawerHeader>`, `<DrawerBody>`, `<DrawerFooter>`
 * to compose. The `bottom` side renders the canonical pull-handle.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { className, open, onOpenChange, side = "right", modal = true, children, ...rest },
  ref,
) {
  const close = useCallback((): void => onOpenChange?.(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ animation: "void-overlay-in 180ms var(--ease-snap)" }}
      className="fixed inset-0 z-50 bg-[color-mix(in_oklch,var(--void-950)_60%,transparent)]"
      onClick={(event) => {
        if (modal && event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        data-side={side}
        style={{ animation: `${sideAnimation[side]} 220ms var(--ease-snap)` }}
        className={cn(
          "bg-surface-raised absolute flex flex-col overflow-hidden",
          sideClasses[side],
          className,
        )}
        {...rest}
      >
        {side === "bottom" ? (
          <div
            aria-hidden="true"
            className="bg-border-strong mx-auto mt-2.5 h-1 w-9 rounded-[2px]"
          />
        ) : null}
        {children}
      </div>
    </div>
  );
});
Drawer.displayName = "Drawer";

export interface DrawerHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional close affordance. */
  onClose?: () => void;
  /** Display title rendered with the dot-matrix font. */
  title?: ReactNode;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
  { className, onClose, title, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("border-border flex items-center gap-3 border-b px-[18px] py-3.5", className)}
      {...rest}
    >
      {title !== undefined ? (
        <h4 className="font-display text-fg m-0 text-[22px] font-normal tracking-[0.02em]">
          {title}
        </h4>
      ) : null}
      {children}
      {onClose !== undefined ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="border-border text-fg-muted hover:text-fg ml-auto inline-flex h-[18px] w-[18px] cursor-pointer items-center justify-center border"
        >
          ×
        </button>
      ) : null}
    </div>
  );
});
DrawerHeader.displayName = "DrawerHeader";

export const DrawerBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerBody({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col gap-3.5 overflow-y-auto px-[18px] py-[18px]",
          className,
        )}
        {...rest}
      />
    );
  },
);
DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DrawerFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("border-border flex justify-end gap-2 border-t px-[18px] py-3.5", className)}
        {...rest}
      />
    );
  },
);
DrawerFooter.displayName = "DrawerFooter";
