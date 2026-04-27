"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  forwardRef,
  useId,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

type CheckboxPrimitiveProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export interface CheckboxProps
  extends Omit<CheckboxPrimitiveProps, "asChild" | "onChange" | "children"> {
  /** Optional label rendered next to the checkbox. */
  label?: ReactNode;
  /** Extra classes on the wrapping `<label>`. */
  className?: string;
  /** Backwards-compatible synthetic change handler. */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Square checkbox built on Radix `@radix-ui/react-checkbox` — supports
 * `indeterminate` via `checked="indeterminate"` and proper form association.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, label, disabled, onChange, onCheckedChange, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group text-fg inline-flex items-center gap-2.5 text-xs select-none",
        disabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={inputId}
        disabled={disabled}
        onCheckedChange={(next) => {
          onCheckedChange?.(next);
          if (onChange !== undefined) {
            const isChecked = next === true;
            const synthetic = {
              target: { checked: isChecked },
              currentTarget: { checked: isChecked },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange(synthetic);
          }
        }}
        className={cn(
          "relative inline-flex h-4 w-4 shrink-0 items-center justify-center",
          "border-border-strong bg-bg rounded-[4px] border",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
          "data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent",
          "focus-visible:ring-accent focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="var(--accent-fg)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Checkbox.displayName = "Checkbox";
