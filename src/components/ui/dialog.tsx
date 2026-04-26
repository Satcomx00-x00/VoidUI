"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls visibility. */
  open: boolean;
  /** Called when the user dismisses (Esc / overlay click / `<DialogClose>`). */
  onOpenChange?: (open: boolean) => void;
  /** Disable backdrop click to close. */
  modal?: boolean;
  /** Optional ARIA label when no `<DialogTitle>` is rendered. */
  "aria-label"?: string;
}

/**
 * Modal dialog. Renders a fixed overlay + a centered panel. Locks body
 * scroll while open and dismisses on `Escape`.
 *
 * For non-modal popovers use `<Popover>` instead.
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { className, open, onOpenChange, modal = true, children, ...rest },
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
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-[color-mix(in_oklch,var(--void-950)_60%,transparent)]",
      )}
      onClick={(event) => {
        if (modal && event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        style={{ animation: "void-dialog-in 180ms var(--ease-snap)" }}
        className={cn(
          "relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[10px]",
          "border border-border-strong bg-surface-raised shadow-[8px_8px_0_var(--accent-soft)]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
});
Dialog.displayName = "Dialog";

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
        "flex items-center border-b border-border px-4 py-3",
        "text-[10px] uppercase tracking-[0.18em] text-fg-muted",
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
          className="ml-auto inline-flex h-[18px] w-[18px] cursor-pointer items-center justify-center border border-border text-fg-muted hover:text-fg"
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
      <h2
        ref={ref}
        className={cn(
          "m-0 mb-2 font-display text-[28px] font-normal leading-tight tracking-[0.02em] text-fg",
          className,
        )}
        {...rest}
      />
    );
  },
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function DialogDescription({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={cn("m-0 mb-4 text-xs leading-[1.6] text-fg-muted", className)}
        {...rest}
      />
    );
  },
);
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-end gap-2 border-t border-border bg-bg-subtle px-4 py-3",
          className,
        )}
        {...rest}
      />
    );
  },
);
DialogFooter.displayName = "DialogFooter";

/**
 * Initial-focus trap helper — call from a button to mount focus inside the
 * dialog. Tiny convenience hook surface; not exported as part of the API.
 *
 * @internal
 */
export function useDialogAutoFocus(open: boolean): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (open && ref.current !== null) ref.current.focus();
  }, [open]);
  return ref;
}
