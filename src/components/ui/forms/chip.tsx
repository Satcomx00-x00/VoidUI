"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the chip is currently selected. */
  selected?: boolean;
  /** Render a dismiss ✕ button inside the chip. */
  onDismiss?: () => void;
}

/**
 * A selectable / dismissible pill chip.
 *
 * Used for filter tags, multi-select inputs, and category pickers.
 * Follows Nothing's minimal pill aesthetic.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, onDismiss, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-full)]",
        "px-3 py-1 text-sm font-medium",
        "border",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:pointer-events-none disabled:opacity-40",
        "active:scale-[0.97]",
        selected
          ? "border-accent bg-accent/10 text-nothing-red"
          : "border-border bg-void-900 text-text-secondary hover:border-void-600 hover:text-text-primary",
        className,
      )}
      {...props}
    >
      {children}
      {onDismiss && (
        <span
          role="button"
          aria-label="Dismiss"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="ml-0.5 flex size-3.5 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100"
        >
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="size-2.5">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
          </svg>
        </span>
      )}
    </button>
  ),
);

Chip.displayName = "Chip";
