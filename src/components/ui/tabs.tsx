"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "../../lib/cn";

/**
 * Visual style for the tab strip.
 *
 * - `underline` — Default; bottom rule, accent indicator.
 * - `pill`      — Pills inside a soft tray.
 * - `boxed`     — Boxed tabs that join a content panel.
 */
export type TabsVariant = "underline" | "pill" | "boxed";

const VariantContext = createContext<TabsVariant>("underline");

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "asChild"> {
  /** Visual variant. Defaults to `"underline"`. */
  variant?: TabsVariant;
}

/**
 * Stateful tab controller. Built on Radix `@radix-ui/react-tabs` — ARIA,
 * arrow-key navigation, and controlled / uncontrolled modes for free.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, variant = "underline", children, ...rest },
  ref,
) {
  return (
    <VariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        ref={ref}
        data-variant={variant}
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {children}
      </TabsPrimitive.Root>
    </VariantContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const listVariantClasses = {
  underline: "border-b border-border",
  pill: "w-fit gap-1 rounded-lg bg-bg-subtle p-1",
  boxed: "border-b border-border",
} as const satisfies Record<TabsVariant, string>;

export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...rest }, ref) {
  const variant = useContext(VariantContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex", listVariantClasses[variant], className)}
      {...rest}
    />
  );
});
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Identifier matching a `<TabsContent value>`. */
  value: string;
}

const triggerVariantClasses = {
  underline: [
    "px-4 py-2.5 -mb-px",
    "border-b-2 border-transparent",
    "data-[state=active]:border-accent data-[state=active]:text-fg",
  ].join(" "),
  pill: [
    "rounded-[6px] px-3.5 py-1.5",
    "data-[state=active]:bg-surface-raised data-[state=active]:text-fg",
    "data-[state=active]:shadow-[0_1px_4px_color-mix(in_oklch,black_10%,transparent)]",
  ].join(" "),
  boxed: [
    "px-4 py-2.5 -mb-px rounded-t-md border border-transparent border-b-0",
    "data-[state=active]:border-border data-[state=active]:bg-surface-raised data-[state=active]:text-fg",
  ].join(" "),
} as const satisfies Record<TabsVariant, string>;

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, ...rest },
  ref,
) {
  const variant = useContext(VariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "text-fg-muted cursor-pointer text-[11px] tracking-[0.14em] uppercase",
        "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "hover:text-fg disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        triggerVariantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /** Identifier matching a `<TabsTrigger value>`. */
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, ...rest },
  ref,
) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "text-fg-muted py-5 text-xs leading-relaxed focus-visible:outline-none",
        className,
      )}
      {...rest}
    />
  );
});
TabsContent.displayName = "TabsContent";
