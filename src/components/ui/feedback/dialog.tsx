"use client";

import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

// ── Context ───────────────────────────────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog sub-component must be used inside <Dialog>.");
  return ctx;
}

// ── Dialog (root) ─────────────────────────────────────────────────────────────

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when the dialog requests to close. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/** Root Dialog — manages open state and renders trigger + content via portal. */
export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open, setOpen, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
}

// ── DialogTrigger ─────────────────────────────────────────────────────────────

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Wraps any element to open the dialog on click. */
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setOpen(true);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";

// ── DialogContent ─────────────────────────────────────────────────────────────

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Prevent closing when clicking the overlay backdrop. @default false */
  disableOverlayClose?: boolean;
}

/**
 * The modal panel rendered in a portal on `document.body`.
 *
 * Traps focus while open, closes on Escape or overlay click.
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, disableOverlayClose = false, children, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDialogContext();
    const panelRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!open) return;

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };

      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }, [open, setOpen]);

    if (!mounted || !open) return null;

    return createPortal(
      <div
        className={cn(
          "void-animate-overlay-in",
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          "bg-void-black/70 backdrop-blur-sm",
        )}
        onClick={() => !disableOverlayClose && setOpen(false)}
        aria-hidden
      >
        <div
          ref={(node) => {
            panelRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "void-animate-slide-up",
            "relative w-full max-w-md",
            "rounded-[var(--radius-xl)] border border-border bg-surface-elevated p-6",
            "shadow-[0_24px_64px_rgba(0,0,0,0.6)]",
            className,
          )}
          {...props}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className={cn(
              "absolute right-4 top-4 flex size-7 items-center justify-center rounded-full",
              "text-text-muted transition-colors duration-[var(--duration-fast)]",
              "hover:bg-void-800 hover:text-text-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
            )}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="size-3.5">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </button>
          {children}
        </div>
      </div>,
      document.body,
    );
  },
);

DialogContent.displayName = "DialogContent";

// ── DialogHeader ──────────────────────────────────────────────────────────────

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

/** Top section of DialogContent — wraps title and description. */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-5 space-y-1.5 pr-6", className)} {...props} />
  ),
);

DialogHeader.displayName = "DialogHeader";

// ── DialogTitle ───────────────────────────────────────────────────────────────

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Primary title inside DialogHeader. */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialogContext();
    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn("text-lg font-semibold leading-tight text-text-primary", className)}
        {...props}
      />
    );
  },
);

DialogTitle.displayName = "DialogTitle";

// ── DialogDescription ─────────────────────────────────────────────────────────

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Supporting description inside DialogHeader. */
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialogContext();
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("text-sm text-text-secondary", className)}
        {...props}
      />
    );
  },
);

DialogDescription.displayName = "DialogDescription";

// ── DialogFooter ──────────────────────────────────────────────────────────────

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

/** Footer action row — typically holds cancel + confirm buttons. */
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6 flex justify-end gap-2.5", className)} {...props} />
  ),
);

DialogFooter.displayName = "DialogFooter";
