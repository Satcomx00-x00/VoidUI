"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controls visibility. */
  open: boolean;
  /** Called when the user dismisses (Esc / overlay click / Close). */
  onOpenChange?: (open: boolean) => void;
  /** When false, backdrop click does NOT close. Defaults to true. */
  modal?: boolean;
  /** Optional ARIA label when no `<DialogTitle>` is rendered. */
  "aria-label"?: string;
}

/**
 * Modal dialog. Built on Radix `@radix-ui/react-dialog` — focus trap,
 * scroll-lock, ESC dismissal, ARIA, portal — handled for free.
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { className, open, onOpenChange, modal = true, children, ...rest },
  ref,
) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{ animation: "void-overlay-in 180ms var(--ease-snap)" }}
          className="fixed inset-0 z-50 bg-[color-mix(in_oklch,var(--void-950)_60%,transparent)]"
        />
        <DialogPrimitive.Content
          ref={ref}
          onPointerDownOutside={(event) => {
            if (!modal) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (!modal) event.preventDefault();
          }}
          style={{ animation: "void-dialog-in 180ms var(--ease-snap)" }}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%-2rem)] max-w-[440px] overflow-hidden rounded-[10px]",
            "border-border-strong bg-surface-raised border shadow-[8px_8px_0_var(--accent-soft)]",
            "focus:outline-none",
            className,
          )}
          {...rest}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});
Dialog.displayName = "Dialog";

/** Radix Close primitive — wrap any button to dismiss. Optional helper. */
export const DialogClose = DialogPrimitive.Close;

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional close affordance — receives a click handler. */
  onClose?: () => void;
  /** Caption text rendered on the left. */
  eyebrow?: ReactNode;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, onClose, eyebrow, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border flex items-center border-b px-4 py-3",
        "text-fg-muted text-[10px] tracking-[0.18em] uppercase",
        className,
      )}
      {...rest}
    >
      {eyebrow !== undefined ? <span>{eyebrow}</span> : null}
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
DialogHeader.displayName = "DialogHeader";

export const DialogBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogBody({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("px-5 py-6", className)} {...rest} />;
  },
);
DialogBody.displayName = "DialogBody";

export const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function DialogTitle({ className, ...rest }, ref) {
    return (
      <DialogPrimitive.Title asChild>
        <h2
          ref={ref}
          className={cn(
            "font-display text-fg m-0 mb-2 text-[28px] leading-tight font-normal tracking-[0.02em]",
            className,
          )}
          {...rest}
        />
      </DialogPrimitive.Title>
    );
  },
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description asChild>
      <p
        ref={ref}
        className={cn("text-fg-muted m-0 mb-4 text-xs leading-[1.6]", className)}
        {...rest}
      />
    </DialogPrimitive.Description>
  );
});
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-border bg-bg-subtle flex justify-end gap-2 border-t px-4 py-3",
          className,
        )}
        {...rest}
      />
    );
  },
);
DialogFooter.displayName = "DialogFooter";
