"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  forwardRef,
  useId,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  "asChild" | "onChange" | "children"
> {
  /** Optional label rendered next to the radio. */
  label?: ReactNode;
  /** Extra classes on the wrapping `<label>`. */
  className?: string;
  /**
   * Backwards-compat shim. The library no longer requires `name`/`checked`
   * on individual radios — wrap them in `<RadioGroup value onValueChange>`.
   * If `checked` is passed (legacy showcase code), it is ignored at the item
   * level and is intended to be reflected by the parent group's `value`.
   */
  checked?: boolean;
  /** Legacy synthetic change handler. Prefer `<RadioGroup onValueChange>`. */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Legacy `name` — set on the parent `<RadioGroup>` instead. */
  name?: string;
}

/**
 * Single radio. Built on Radix `@radix-ui/react-radio-group` — must be used
 * inside `<RadioGroup>` for keyboard navigation, ARIA, and selection.
 */
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  {
    className,
    label,
    value,
    disabled,
    id,
    checked: _checked,
    onChange: _onChange,
    name: _name,
    ...rest
  },
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
      <RadioGroupPrimitive.Item
        ref={ref}
        id={inputId}
        value={value}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-4 w-4 shrink-0 items-center justify-center",
          "border-border-strong bg-bg rounded-full border",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
          "focus-visible:ring-accent focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="bg-accent-fg block h-1.5 w-1.5 rounded-full" />
      </RadioGroupPrimitive.Item>
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Radio.displayName = "Radio";

export interface RadioGroupProps extends Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "asChild" | "orientation"
> {
  /** Layout direction. Defaults to `"vertical"`. */
  orientation?: "vertical" | "horizontal";
}

/**
 * Manages a set of {@link Radio} inputs. Built on Radix `RadioGroup.Root` —
 * arrow-key navigation and ARIA grouping for free.
 *
 * Backwards-compat: when no `value`/`defaultValue`/`onValueChange` is
 * provided, the group still renders and individual `Radio`s with `checked`
 * + `onChange` from the legacy API will continue to work because each Item
 * is just a styled wrapper. New code should use `value` + `onValueChange`.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, orientation = "vertical", ...rest },
  ref,
) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      {...rest}
    />
  );
});
RadioGroup.displayName = "RadioGroup";
