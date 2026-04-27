"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                    */
/* -------------------------------------------------------------------------- */

/** Side of the trigger the tooltip pops from. */
export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip content (text or node). */
  content: ReactNode;
  /** Trigger element — must be a single React element. */
  children: ReactElement;
  /** Side relative to the trigger. Defaults to `"top"`. */
  side?: TooltipSide;
  /** Force open state — escape hatch for stories / debugging. */
  open?: boolean;
  /** Optional default open. */
  defaultOpen?: boolean;
  /** Open-change callback. */
  onOpenChange?: (open: boolean) => void;
  /** Hover delay in ms. Defaults to 200. */
  delayDuration?: number;
}

/**
 * Hover/focus tooltip. Built on Radix `@radix-ui/react-tooltip`.
 *
 * Each tooltip mounts its own `Tooltip.Provider`. For better perf when
 * rendering many tooltips, wrap your app once in `<VoidUIProvider>` which
 * mounts a single global provider.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 200,
}: TooltipProps): ReactElement {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            style={{ animation: "void-popover-in 120ms var(--ease-snap)" }}
            className={cn(
              "bg-fg text-bg pointer-events-none z-50 rounded-[5px] px-2.5 py-1.5",
              "text-[10px] tracking-[0.1em] whitespace-nowrap",
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-fg" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Popover — Radix-backed compound                                              */
/* -------------------------------------------------------------------------- */

/**
 * Popover root. Wraps {@link PopoverTrigger} + {@link PopoverContent}.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader><PopoverTitle>Notifications</PopoverTitle></PopoverHeader>
 *     ...
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Popover = PopoverPrimitive.Root;

/** Popover trigger — use with `asChild` to project styling onto your own element. */
export const PopoverTrigger = PopoverPrimitive.Trigger;

/** Imperative close button rendered inside a {@link PopoverContent}. */
export const PopoverClose = PopoverPrimitive.Close;

/** Popover anchor — attach the popover to a different element than the trigger. */
export const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps extends ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {
  /** Disable the default Portal mount (for cases needing in-place rendering). */
  disablePortal?: boolean;
}

/**
 * Floating popover surface. Animated, focus-managed, and dismissable via
 * Escape / outside-click out of the box (Radix).
 */
export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  { className, disablePortal = false, sideOffset = 8, align = "start", style, ...rest },
  ref,
) {
  const node = (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      style={{ animation: "void-popover-in 140ms var(--ease-snap)", ...style }}
      className={cn(
        "border-border-strong bg-surface-raised z-50 min-w-[240px] rounded-[10px] border p-4",
        "shadow-[0_8px_32px_color-mix(in_oklch,black_20%,transparent)]",
        "focus:outline-none",
        className,
      )}
      {...rest}
    />
  );
  return disablePortal ? node : <PopoverPrimitive.Portal>{node}</PopoverPrimitive.Portal>;
});
PopoverContent.displayName = "PopoverContent";

/** Header row inside a {@link PopoverContent}. */
export const PopoverHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function PopoverHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mb-3 flex items-center justify-between", className)}
        {...rest}
      />
    );
  },
);
PopoverHeader.displayName = "PopoverHeader";

/** Title heading inside a {@link PopoverHeader}. */
export const PopoverTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function PopoverTitle({ className, ...rest }, ref) {
    return (
      <h5
        ref={ref}
        className={cn("font-display text-fg m-0 text-[20px] font-normal", className)}
        {...rest}
      />
    );
  },
);
PopoverTitle.displayName = "PopoverTitle";
