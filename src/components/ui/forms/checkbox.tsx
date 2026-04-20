"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional label rendered beside the checkbox. */
  label?: string;
  /** Show a subtle error border. */
  error?: boolean;
}

/**
 * A Nothing-style checkbox with a custom tick mark.
 *
 * Accepts an optional `label` prop for inline labeling.
 * Uses `aria-invalid` when `error` is set.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id: idProp, disabled, error = false, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <span className="inline-flex items-center gap-2.5">
        <span className="relative flex size-4 shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error || undefined}
            className={cn(
              "peer size-4 cursor-pointer appearance-none rounded-[var(--radius-sm)]",
              "border bg-void-950",
              "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
              "checked:border-accent checked:bg-accent",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              "disabled:cursor-not-allowed disabled:opacity-40",
              error
                ? "border-nothing-red/60"
                : "border-border hover:border-void-500",
              className,
            )}
            {...props}
          />
          {/* Tick mark — visible only when checked */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 m-auto hidden size-2.5 text-void-white peer-checked:block"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        </span>

        {label && (
          <label
            htmlFor={id}
            className={cn(
              "select-none text-sm text-text-secondary",
              disabled && "opacity-40",
            )}
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";
