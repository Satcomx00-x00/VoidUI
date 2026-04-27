"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  forwardRef,
  useId,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

type SwitchPrimitiveProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export interface SwitchProps
  extends Omit<SwitchPrimitiveProps, "asChild" | "onChange" | "children"> {
  /** Optional label rendered next to the switch. */
  label?: ReactNode;
  /** Extra classes on the wrapping `<label>`. */
  className?: string;
  /**
   * Backwards-compatible change handler. Fires a synthetic event with
   * `currentTarget.checked` so existing `onChange={(e) => …}` keeps working.
   * Prefer `onCheckedChange` for new code.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Pill-shaped on/off toggle. Built on Radix `@radix-ui/react-switch` —
 * proper `role="switch"`, keyboard, focus, and form-association.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
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
      <SwitchPrimitive.Root
        ref={ref}
        id={inputId}
        disabled={disabled}
        onCheckedChange={(next) => {
          onCheckedChange?.(next);
          if (onChange !== undefined) {
            const synthetic = {
              target: { checked: next },
              currentTarget: { checked: next },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange(synthetic);
          }
        }}
        className={cn(
          "relative inline-block h-[18px] w-[34px] shrink-0",
          "border-border-strong bg-bg rounded-full border",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
          "focus-visible:ring-accent focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...rest}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block h-3 w-3 translate-x-0.5 rounded-full",
            "bg-fg-muted",
            "transition-transform duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
            "data-[state=checked]:bg-accent-fg data-[state=checked]:translate-x-[18px]",
          )}
        />
      </SwitchPrimitive.Root>
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Switch.displayName = "Switch";
