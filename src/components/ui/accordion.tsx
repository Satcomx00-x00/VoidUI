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
} from "react";

import { cn } from "../../lib/cn";

/** Selection mode. `"single"` collapses peers when one opens. */
export type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  open: ReadonlySet<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (ctx === null) {
    throw new Error(`<${component}> must be used inside <Accordion>`);
  }
  return ctx;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Selection mode. Defaults to `"single"`. */
  type?: AccordionType;
  /** Open item value(s) — controlled. Always pass an array. */
  value?: readonly string[];
  /** Initially open item value(s) — uncontrolled. */
  defaultValue?: readonly string[];
  /** Called whenever the open set changes. */
  onValueChange?: (value: readonly string[]) => void;
}

/**
 * Vertically-stacked collapsible sections. Compose with `<AccordionItem>`,
 * `<AccordionTrigger>`, and `<AccordionContent>`.
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { className, type = "single", value: controlled, defaultValue = [], onValueChange, ...rest },
  ref,
) {
  const [uncontrolled, setUncontrolled] = useState<readonly string[]>(defaultValue);
  const isControlled = controlled !== undefined;
  const current = isControlled ? controlled : uncontrolled;

  const toggle = useCallback(
    (val: string): void => {
      const has = current.includes(val);
      let next: readonly string[];
      if (type === "single") {
        next = has ? [] : [val];
      } else {
        next = has ? current.filter((v) => v !== val) : [...current, val];
      }
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [current, type, isControlled, onValueChange],
  );

  const ctx = useMemo<AccordionContextValue>(
    () => ({ type, open: new Set(current), toggle }),
    [type, current, toggle],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div ref={ref} data-type={type} className={cn("flex flex-col", className)} {...rest} />
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

interface ItemContextValue {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext(component: string): ItemContextValue {
  const ctx = useContext(ItemContext);
  if (ctx === null) {
    throw new Error(`<${component}> must be used inside <AccordionItem>`);
  }
  return ctx;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Identifier shared by the trigger and content. */
  value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, value, ...rest },
  ref,
) {
  const { open } = useAccordionContext("AccordionItem");
  const isOpen = open.has(value);
  const baseId = useId();
  const itemCtx = useMemo<ItemContextValue>(
    () => ({
      value,
      open: isOpen,
      triggerId: `${baseId}-trigger`,
      contentId: `${baseId}-content`,
    }),
    [value, isOpen, baseId],
  );

  return (
    <ItemContext.Provider value={itemCtx}>
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-border mb-1.5 overflow-hidden rounded-lg border", className)}
        {...rest}
      />
    </ItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  function AccordionTrigger({ className, children, onClick, ...rest }, ref) {
    const { toggle } = useAccordionContext("AccordionTrigger");
    const { value, open, triggerId, contentId } = useItemContext("AccordionTrigger");

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={contentId}
        data-state={open ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle(value);
        }}
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left",
          "text-fg text-xs tracking-[0.06em]",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "hover:bg-bg-subtle data-[state=open]:bg-bg-subtle",
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
      </button>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AccordionContent({ className, children, ...rest }, ref) {
    const { open, triggerId, contentId } = useItemContext("AccordionContent");

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        data-state={open ? "open" : "closed"}
        className={cn(
          "text-fg-muted overflow-hidden text-xs leading-relaxed",
          "transition-[max-height,padding] duration-[var(--dur-med)] ease-[var(--ease-snap)]",
          open ? "max-h-[400px] px-4 pb-3.5" : "max-h-0 px-4 pb-0",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";
