"use client";

import {
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  createContext,
  useContext,
  useState,
  forwardRef,
  useId,
} from "react";
import { cn } from "@/lib/cn";

// ── Context ───────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs sub-component must be used inside <Tabs>.");
  return ctx;
}

// ── Tabs (root) ───────────────────────────────────────────────────────────────

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled active tab value. */
  value?: string;
  /** Default active tab value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback fired when the active tab changes. */
  onValueChange?: (value: string) => void;
}

/**
 * Root Tabs container — manages active tab state and provides context
 * to `TabsList`, `TabsTrigger`, and `TabsContent`.
 *
 * Supports both controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) usage patterns.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue = "", onValueChange, children, ...props }, ref) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;

    const setActiveTab = (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";

// ── TabsList ──────────────────────────────────────────────────────────────────

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

/** The pill container that wraps all `TabsTrigger` buttons. */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex gap-0.5 rounded-[var(--radius-md)] bg-void-900 p-1",
        className,
      )}
      {...props}
    />
  ),
);

TabsList.displayName = "TabsList";

// ── TabsTrigger ───────────────────────────────────────────────────────────────

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Must match the corresponding `TabsContent` value. */
  value: string;
}

/** A single tab button inside `TabsList`. */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab, baseId } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`${baseId}-tab-${value}`}
        aria-controls={`${baseId}-panel-${value}`}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveTab(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveTab(value);
          }
        }}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm font-medium",
          "rounded-[var(--radius-sm)]",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
          "disabled:pointer-events-none disabled:opacity-40",
          isActive
            ? "bg-void-800 text-text-primary"
            : "text-text-muted hover:text-text-secondary",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

// ── TabsContent ───────────────────────────────────────────────────────────────

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Must match the corresponding `TabsTrigger` value. */
  value: string;
}

/** The panel that renders when its `value` matches the active tab. */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, baseId } = useTabsContext();

    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        className={cn("void-animate-fade-in mt-4 focus-visible:outline-none", className)}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";
