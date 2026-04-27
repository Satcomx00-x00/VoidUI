"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/** Selection mode. `"single"` collapses peers when one opens. */
export type AccordionType = "single" | "multiple";

type RootSingleProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  type: "single";
};
type RootMultipleProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  type: "multiple";
};

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir"> {
  /** Selection mode. Defaults to `"single"`. */
  type?: AccordionType;
  /** Open item value(s) — controlled. Always pass an array. */
  value?: readonly string[];
  /** Initially open item value(s) — uncontrolled. */
  defaultValue?: readonly string[];
  /** Called whenever the open set changes. */
  onValueChange?: (value: readonly string[]) => void;
  /** Allow collapsing the only-open item when `type="single"`. Default `true`. */
  collapsible?: boolean;
  /** Reading direction. */
  dir?: "ltr" | "rtl";
}

/**
 * Vertically-stacked collapsible sections. Built on Radix
 * `@radix-ui/react-accordion` — keyboard navigation, ARIA, controlled and
 * uncontrolled modes are handled for free.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    className,
    type = "single",
    value: controlled,
    defaultValue,
    onValueChange,
    collapsible = true,
    ...rest
  },
  ref,
) {
  if (type === "single") {
    const single: RootSingleProps = {
      type: "single",
      collapsible,
      value: controlled?.[0] ?? "",
      defaultValue: defaultValue?.[0] ?? "",
      onValueChange: (v: string) => onValueChange?.(v === "" ? [] : [v]),
    };
    if (controlled === undefined) delete single.value;
    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-type={type}
        className={cn("flex flex-col", className)}
        {...single}
        {...rest}
      />
    );
  }
  const multi: RootMultipleProps = {
    type: "multiple",
    value: controlled !== undefined ? Array.from(controlled) : undefined,
    defaultValue: defaultValue !== undefined ? Array.from(defaultValue) : undefined,
    onValueChange: (v: string[]) => onValueChange?.(v),
  };
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-type={type}
      className={cn("flex flex-col", className)}
      {...multi}
      {...rest}
    />
  );
});
Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** Identifier shared by the trigger and content. */
  value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, ...rest },
  ref,
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-border mb-1.5 overflow-hidden rounded-lg border", className)}
      {...rest}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...rest }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left",
          "text-fg text-xs tracking-[0.06em]",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "hover:bg-bg-subtle data-[state=open]:bg-bg-subtle",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
          className,
        )}
        {...rest}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "text-fg-muted text-[11px]",
            "transition-transform duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
            "group-data-[state=open]:text-accent group-data-[state=open]:rotate-180",
          )}
        >
          ▾
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...rest }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "text-fg-muted overflow-hidden text-xs leading-relaxed",
        "data-[state=open]:px-4 data-[state=open]:pb-3.5",
        "data-[state=closed]:px-4",
        "data-[state=open]:animate-[void-popover-in_220ms_var(--ease-snap)]",
        className,
      )}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";
