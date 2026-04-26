"use client";

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/** Side of the trigger the tooltip pops from. */
export type TooltipSide = "top" | "bottom" | "left" | "right";

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const satisfies Record<TooltipSide, string>;

const arrowClasses = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-fg border-x-transparent border-b-0",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-fg border-x-transparent border-t-0",
  left: "left-full top-1/2 -translate-y-1/2 border-l-fg border-y-transparent border-r-0",
  right: "right-full top-1/2 -translate-y-1/2 border-r-fg border-y-transparent border-l-0",
} as const satisfies Record<TooltipSide, string>;

export interface TooltipProps {
  /** Tooltip content (text or node). */
  content: ReactNode;
  /** Trigger element — must be a single React element that can take refs/handlers. */
  children: ReactElement<{
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    "aria-describedby"?: string;
  }>;
  /** Side relative to the trigger. Defaults to `"top"`. */
  side?: TooltipSide;
  /** Force open state — escape hatch for stories / debugging. */
  open?: boolean;
}

/**
 * Lightweight hover/focus tooltip. Wraps a single trigger element,
 * positioning the bubble via CSS (no portal — keep the trigger non-clipped).
 */
export function Tooltip({ content, children, side = "top", open: forceOpen }: TooltipProps): ReactElement {
  const [hovered, setHovered] = useState(false);
  const id = useId();
  const visible = forceOpen ?? hovered;

  if (!isValidElement(children)) {
    throw new Error("<Tooltip> requires a single valid React element as a child");
  }

  const triggerProps = children.props;
  const trigger = cloneElement(children, {
    onMouseEnter: (event: React.MouseEvent) => {
      triggerProps.onMouseEnter?.(event);
      setHovered(true);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      triggerProps.onMouseLeave?.(event);
      setHovered(false);
    },
    onFocus: (event: React.FocusEvent) => {
      triggerProps.onFocus?.(event);
      setHovered(true);
    },
    onBlur: (event: React.FocusEvent) => {
      triggerProps.onBlur?.(event);
      setHovered(false);
    },
    "aria-describedby": id,
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        id={id}
        role="tooltip"
        hidden={!visible}
        className={cn(
          "pointer-events-none absolute z-40 whitespace-nowrap rounded-[5px] bg-fg px-2.5 py-1.5",
          "text-[10px] tracking-[0.1em] text-bg",
          sideClasses[side],
          !visible && "hidden",
        )}
        style={{ animation: visible ? "void-popover-in 120ms var(--ease-snap)" : undefined }}
      >
        {content}
        <span
          aria-hidden="true"
          className={cn("absolute h-0 w-0 border-[5px] border-solid", arrowClasses[side])}
        />
      </span>
    </span>
  );
}

/**
 * Static popover surface. The consumer is responsible for placement
 * (typically inside a relatively-positioned trigger) and visibility.
 */
export const Popover = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Popover({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="dialog"
        style={{ animation: "void-popover-in 140ms var(--ease-snap)" }}
        className={cn(
          "min-w-[240px] rounded-[10px] border border-border-strong bg-surface-raised p-4",
          "shadow-[0_8px_32px_color-mix(in_oklch,black_20%,transparent)]",
          className,
        )}
        {...rest}
      />
    );
  },
);
Popover.displayName = "Popover";

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

export const PopoverTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function PopoverTitle({ className, ...rest }, ref) {
    return (
      <h5
        ref={ref}
        className={cn("m-0 font-display text-[20px] font-normal text-fg", className)}
        {...rest}
      />
    );
  },
);
PopoverTitle.displayName = "PopoverTitle";
