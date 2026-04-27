"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* SelectOption                                                                */
/* -------------------------------------------------------------------------- */

export interface SelectOptionProps
  extends Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, "asChild"> {
  /** Optional icon glyph shown in the leading slot. */
  icon?: ReactNode;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(function SelectOption(
  { className, children, icon, ...rest },
  ref,
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-[7px] px-2.5 py-[7px] select-none",
        "font-mono text-[12px] leading-none",
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "text-fg-muted outline-none",
        "data-[highlighted]:bg-bg-subtle data-[highlighted]:text-fg",
        "data-[state=checked]:text-fg",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        className,
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator className="bg-accent absolute inset-y-[3px] left-0 w-[2.5px] rounded-full" />
      <span
        aria-hidden="true"
        className={cn(
          "text-accent flex h-4 w-4 shrink-0 items-center justify-center text-[10px]",
          "opacity-0 group-data-[state=checked]:opacity-100",
        )}
      >
        ✓
      </span>
      {icon !== undefined ? (
        <span
          aria-hidden="true"
          className="bg-bg-muted flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] text-[11px] opacity-70 group-data-[highlighted]:opacity-100"
        >
          {icon}
        </span>
      ) : null}
      <SelectPrimitive.ItemText asChild>
        <span className="flex-1 truncate">{children}</span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectOption.displayName = "SelectOption";

/* -------------------------------------------------------------------------- */
/* Select                                                                      */
/* -------------------------------------------------------------------------- */

export interface SelectProps {
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called when user picks an option. */
  onValueChange?: (value: string) => void;
  /** Placeholder shown when no option is selected. */
  placeholder?: string;
  /** Disable the entire control. */
  disabled?: boolean;
  /** Mark as invalid (red border). */
  invalid?: boolean;
  /** Extra classes on the trigger. */
  className?: string;
  /** `<SelectOption>` children. */
  children?: ReactNode;
  /** HTML name for form submission. */
  name?: string;
  /** Open state \u2014 controlled. */
  open?: boolean;
  /** Default open state \u2014 uncontrolled. */
  defaultOpen?: boolean;
  /** Open change callback. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Accessible select / listbox built on Radix `@radix-ui/react-select`.
 * Keyboard navigation, typeahead, ARIA, portal, and form integration are
 * provided by Radix.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select\u2026",
    disabled,
    invalid,
    className,
    children,
    name,
    open,
    defaultOpen,
    onOpenChange,
  },
  ref,
) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        data-invalid={invalid === true ? true : undefined}
        className={cn(
          "border-border flex h-9 w-full items-center justify-between gap-2 rounded-[6px] border px-3",
          "bg-bg text-fg font-mono text-[13px]",
          "transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "hover:border-border-strong",
          "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)] focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[invalid=true]:border-[oklch(60%_0.18_25)]",
          "data-[state=open]:border-accent data-[state=open]:shadow-[0_0_0_3px_var(--accent-soft)]",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
            className="shrink-0 opacity-60 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-snap)] data-[state=open]:rotate-180"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          style={{ animation: "void-popover-in 160ms var(--ease-snap)" }}
          className={cn(
            "z-50 overflow-hidden",
            "border-border bg-surface-raised w-[var(--radix-select-trigger-width)] rounded-xl border p-1.5",
            "shadow-[0_12px_32px_color-mix(in_oklch,black_28%,transparent),0_2px_8px_color-mix(in_oklch,black_12%,transparent)]",
            "backdrop-blur-sm",
          )}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
Select.displayName = "Select";
