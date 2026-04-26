"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/* ========================================================================= */
/*  Types                                                                      */
/* ========================================================================= */

/** Visual style of a toast card. */
export type ToastVariant = "default" | "accent" | "success" | "error";

/**
 * Screen position for a toast stack.
 *
 * - `top-left` | `top-center` | `top-right`
 * - `bottom-left` | `bottom-center` | `bottom-right`
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/** A single managed toast entry inside `<ToastProvider>`. */
export interface ToastEntry {
  id: string;
  variant?: ToastVariant;
  title?: ReactNode;
  message?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  /**
   * Auto-dismiss delay in milliseconds.
   * Pass `null` for a persistent toast that must be manually dismissed.
   * @default 4000
   */
  duration?: number | null;
  /**
   * Screen position for this specific toast.
   * Falls back to the `defaultPosition` set on `<ToastProvider>`.
   * @default "bottom-right"
   */
  position?: ToastPosition;
}

/* ========================================================================= */
/*  Variant maps                                                               */
/* ========================================================================= */

const variantBorder = {
  default: "border-border",
  accent:  "border-[color-mix(in_oklch,var(--accent)_40%,var(--border))]",
  success: "border-border",
  error:   "border-border",
} as const satisfies Record<ToastVariant, string>;

const variantIconColor = {
  default: "text-fg",
  accent:  "text-accent",
  success: "text-[oklch(68%_0.14_150)]",
  error:   "text-[oklch(62%_0.18_25)]",
} as const satisfies Record<ToastVariant, string>;

/* ========================================================================= */
/*  Toast (presentational)                                                     */
/* ========================================================================= */

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Visual variant. Defaults to `"default"`. */
  variant?: ToastVariant;
  /** Bold first line of the toast. */
  title?: ReactNode;
  /** Body / description line. */
  message?: ReactNode;
  /** Leading icon glyph. */
  icon?: ReactNode;
  /** Action slot — rendered on the right before the dismiss button. */
  action?: ReactNode;
  /** When provided, renders an ✕ dismiss button on the far right. */
  onDismiss?: () => void;
}

/**
 * Toast — a single self-contained notification card.
 *
 * The component is purely presentational; consumers manage the queue,
 * positioning, and dismissal logic. Use `<ToastProvider>` + `useToast()`
 * for the full managed system, or `<ToastStack>` for manual queues.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { className, variant = "default", title, message, icon, action, onDismiss, children, ...rest },
  ref,
) {
  const cols = onDismiss !== undefined ? "grid-cols-[auto_1fr_auto_auto]" : "grid-cols-[auto_1fr_auto]";

  return (
    <div
      ref={ref}
      role="status"
      data-variant={variant}
      className={cn(
        "grid items-start gap-3 rounded-lg border p-3.5",
        "bg-surface-raised shadow-[4px_4px_0_var(--bg-muted)]",
        cols,
        variantBorder[variant],
        className,
      )}
      {...rest}
    >
      {/* Icon slot */}
      {icon !== undefined ? (
        <span
          aria-hidden="true"
          className={cn(
            "grid h-5 w-5 place-items-center rounded-[5px] border border-current text-[11px] font-semibold",
            variantIconColor[variant],
          )}
        >
          {icon}
        </span>
      ) : (
        <span aria-hidden="true" className="h-0 w-0" />
      )}

      {/* Content */}
      <div className="min-w-0">
        {title !== undefined && (
          <p className="m-0 mb-0.5 text-xs tracking-[0.04em] text-fg">{title}</p>
        )}
        {message !== undefined && (
          <p className="m-0 text-[11px] leading-snug text-fg-muted">{message}</p>
        )}
        {children}
      </div>

      {/* Action */}
      {action !== undefined && (
        <span className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle">{action}</span>
      )}

      {/* Dismiss button */}
      {onDismiss !== undefined && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded",
            "text-[13px] leading-none text-fg-subtle",
            "transition-colors duration-[var(--dur-fast)] hover:bg-bg-muted hover:text-fg",
          )}
        >
          ✕
        </button>
      )}
    </div>
  );
});
Toast.displayName = "Toast";

/* ========================================================================= */
/*  ToastStack (manual / legacy)                                              */
/* ========================================================================= */

/**
 * Vertical stack container for `<Toast>` cards.
 *
 * ```tsx
 * <ToastStack className="fixed right-6 top-6 z-50">
 *   <Toast title="Saved" />
 * </ToastStack>
 * ```
 */
export const ToastStack = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ToastStack({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex w-full max-w-[380px] flex-col gap-2", className)}
        {...rest}
      />
    );
  },
);
ToastStack.displayName = "ToastStack";

/* ========================================================================= */
/*  ToastProvider context + useToast hook                                     */
/* ========================================================================= */

export interface ToastContextValue {
  /**
   * Push a new toast.  Returns the generated `id`.
   *
   * ```ts
   * const { toast } = useToast();
   * toast({ title: "Saved", variant: "success", duration: 3000, position: "top-center" });
   * ```
   */
  toast: (entry: Omit<ToastEntry, "id">) => string;
  /** Programmatically dismiss a toast by id. */
  dismiss: (id: string) => void;
  /** Dismiss every active toast immediately. */
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Returns the `toast`, `dismiss`, and `dismissAll` helpers.
 * Must be called inside a `<ToastProvider>`.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (ctx === null) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

/* ========================================================================= */
/*  ToastItem — animated wrapper                                              */
/* ========================================================================= */

const ANIM_OUT_MS = 220;

function ToastItem({
  entry,
  onRemove,
}: {
  entry: ToastEntry;
  onRemove: (id: string) => void;
}): ReactNode {
  const [removing, setRemoving] = useState(false);

  const dismiss = useCallback(() => {
    if (removing) return;
    setRemoving(true);
    setTimeout(() => onRemove(entry.id), ANIM_OUT_MS);
  }, [removing, onRemove, entry.id]);

  // Auto-dismiss timer
  useEffect(() => {
    const dur = entry.duration ?? 4000;
    if (dur === null) return;
    const t = setTimeout(dismiss, dur);
    return () => clearTimeout(t);
  }, [entry.duration, dismiss]);

  return (
    <div
      style={{
        animation: removing
          ? `void-toast-out ${ANIM_OUT_MS}ms var(--ease-snap) forwards`
          : "void-toast-in 180ms var(--ease-snap)",
      }}
    >
      <Toast
        variant={entry.variant}
        title={entry.title}
        message={entry.message}
        icon={entry.icon}
        action={entry.action}
        onDismiss={dismiss}
      />
    </div>
  );
}

/* ========================================================================= */
/*  Position helpers                                                           */
/* ========================================================================= */

const BOTTOM_POSITIONS = new Set<ToastPosition>([
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left":      "fixed left-4 top-4 z-[200] flex w-full max-w-[380px] flex-col gap-2",
  "top-center":    "fixed left-1/2 top-4 z-[200] flex w-full max-w-[380px] -translate-x-1/2 flex-col gap-2",
  "top-right":     "fixed right-4 top-4 z-[200] flex w-full max-w-[380px] flex-col gap-2",
  "bottom-left":   "fixed bottom-4 left-4 z-[200] flex w-full max-w-[380px] flex-col-reverse gap-2",
  "bottom-center": "fixed bottom-4 left-1/2 z-[200] flex w-full max-w-[380px] -translate-x-1/2 flex-col-reverse gap-2",
  "bottom-right":  "fixed bottom-4 right-4 z-[200] flex w-full max-w-[380px] flex-col-reverse gap-2",
};

/* ========================================================================= */
/*  ToastProvider                                                              */
/* ========================================================================= */

export interface ToastProviderProps {
  children: ReactNode;
  /**
   * Default position for all toasts. Can be overridden per-call via
   * `toast({ position: "top-center" })`.
   * @default "bottom-right"
   */
  defaultPosition?: ToastPosition;
  /**
   * Default auto-dismiss delay in ms. Pass `null` to make toasts persistent
   * by default. Can be overridden per-call.
   * @default 4000
   */
  defaultDuration?: number | null;
}

let _nextId = 1;

/**
 * Provides the toast queue. Renders one fixed container per active position.
 *
 * ```tsx
 * // In your root layout or app shell:
 * <ToastProvider defaultPosition="bottom-right" defaultDuration={4000}>
 *   {children}
 * </ToastProvider>
 *
 * // Anywhere inside:
 * const { toast } = useToast();
 * toast({ title: "Saved!", variant: "success", position: "top-center", duration: 2500 });
 * ```
 */
export function ToastProvider({
  children,
  defaultPosition = "bottom-right",
  defaultDuration = 4000,
}: ToastProviderProps): ReactNode {
  const [entries, setEntries] = useState<ToastEntry[]>([]);

  const toast = useCallback(
    (entry: Omit<ToastEntry, "id">): string => {
      const id = String(_nextId++);
      setEntries((prev) => [
        ...prev,
        {
          position: defaultPosition,
          duration: defaultDuration,
          ...entry,
          id,
        },
      ]);
      return id;
    },
    [defaultPosition, defaultDuration],
  );

  const dismiss = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const dismissAll = useCallback(() => setEntries([]), []);

  const ctx = useMemo<ToastContextValue>(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll],
  );

  // Group entries by position
  const byPosition = useMemo(() => {
    const map = new Map<ToastPosition, ToastEntry[]>();
    for (const entry of entries) {
      const pos = (entry.position ?? defaultPosition) as ToastPosition;
      const group = map.get(pos) ?? [];
      group.push(entry);
      map.set(pos, group);
    }
    return map;
  }, [entries, defaultPosition]);

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {/* One fixed container per active position */}
      {Array.from(byPosition.entries()).map(([pos, group]) => (
        <div key={pos} aria-live="polite" aria-label={`${pos} notifications`} className={POSITION_CLASSES[pos]}>
          {(BOTTOM_POSITIONS.has(pos) ? [...group].reverse() : group).map((entry) => (
            <ToastItem key={entry.id} entry={entry} onRemove={dismiss} />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
}
