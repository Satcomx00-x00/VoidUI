"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
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

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  variant: TabsVariant;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (ctx === null) {
    throw new Error(`<${component}> must be used inside <Tabs>`);
  }
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected tab value (controlled). */
  value?: string;
  /** Initial selected tab value (uncontrolled). */
  defaultValue?: string;
  /** Called whenever the selected tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual variant. Defaults to `"underline"`. */
  variant?: TabsVariant;
}

/**
 * Stateful tab controller. Use `<TabsList>`, `<TabsTrigger value>`, and
 * `<TabsContent value>` as children.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    className,
    value: controlled,
    defaultValue = "",
    onValueChange,
    variant = "underline",
    children,
    ...rest
  },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value, setValue, variant, baseId }),
    [value, setValue, variant, baseId],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div
        ref={ref}
        data-variant={variant}
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const listVariantClasses = {
  underline: "border-b border-border",
  pill: "w-fit gap-1 rounded-lg bg-bg-subtle p-1",
  boxed: "border-b border-border",
} as const satisfies Record<TabsVariant, string>;

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TabsList({ className, onKeyDown, ...rest }, ref) {
    const { variant } = useTabsContext("TabsList");

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const list = event.currentTarget;
      const triggers = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
      );
      const active = document.activeElement as HTMLButtonElement | null;
      const current = active === null ? -1 : triggers.indexOf(active);
      if (current === -1) return;
      const dir = event.key === "ArrowRight" ? 1 : -1;
      const next = triggers[(current + dir + triggers.length) % triggers.length];
      next?.focus();
      next?.click();
      event.preventDefault();
    };

    return (
      <div
        ref={ref}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn("flex", listVariantClasses[variant], className)}
        {...rest}
      />
    );
  },
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Identifier matching a `<TabsContent value>`. */
  value: string;
  /** Disable the trigger. */
  disabled?: boolean;
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
  { className, value, disabled = false, onClick, ...rest },
  ref,
) {
  const { value: active, setValue, variant, baseId } = useTabsContext("TabsTrigger");
  const selected = active === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-content-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-state={selected ? "active" : "inactive"}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      className={cn(
        "cursor-pointer text-[11px] uppercase tracking-[0.14em] text-fg-muted",
        "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "hover:text-fg disabled:cursor-not-allowed disabled:opacity-50",
        triggerVariantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Identifier matching a `<TabsTrigger value>`. */
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, value, hidden, ...rest },
  ref,
) {
  const { value: active, baseId } = useTabsContext("TabsContent");
  const selected = active === value;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={hidden ?? !selected}
      data-state={selected ? "active" : "inactive"}
      className={cn("py-5 text-xs leading-relaxed text-fg-muted", className)}
      {...rest}
    />
  );
});
TabsContent.displayName = "TabsContent";
