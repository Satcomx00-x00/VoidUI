"use client";

import { type ButtonHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Callback when the toggle value changes. */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * A Nothing-style toggle switch with a smooth sliding thumb animation.
 *
 * Uses `role="switch"` and `aria-checked` for accessibility.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => {
    const id = useId();

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border border-border",
          "transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:cursor-not-allowed disabled:opacity-40",
          checked ? "bg-accent" : "bg-void-900",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none block size-4 rounded-full bg-void-white shadow-sm",
            "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
            checked ? "translate-x-[22px]" : "translate-x-[3px]",
          )}
        />
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
