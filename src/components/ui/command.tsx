"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* Root — cmdk-backed                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Outer command palette surface — bordered, raised, with the signature
 * heavy drop shadow.
 *
 * Powered by [cmdk](https://cmdk.paco.me): get fuzzy filtering, keyboard
 * navigation, ARIA combobox semantics, and an empty state out of the box.
 */
export const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(function Command({ className, ...rest }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "border-border-strong bg-surface-raised mx-auto flex max-w-[540px] flex-col overflow-hidden rounded-[10px] border",
        "shadow-[0_16px_48px_color-mix(in_oklch,black_28%,transparent)]",
        className,
      )}
      {...rest}
    />
  );
});
Command.displayName = "Command";

/* -------------------------------------------------------------------------- */
/* Input                                                                      */
/* -------------------------------------------------------------------------- */

export interface CommandInputProps extends ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /** Optional leading icon (defaults to a magnifier glyph). */
  icon?: ReactNode;
  /** Optional trailing tag (e.g. `ESC`). */
  tag?: ReactNode;
}

const SearchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="4.5" />
    <path d="M10 10l2.5 2.5" strokeLinecap="round" />
  </svg>
);

export const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput({ className, icon = SearchIcon, tag, ...rest }, ref) {
  return (
    <div className="border-border flex items-center gap-2.5 border-b px-4 py-3">
      <span className="text-fg-muted flex-none">{icon}</span>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "text-fg flex-1 border-none bg-transparent font-mono text-sm outline-none",
          "placeholder:text-fg-subtle",
          className,
        )}
        {...rest}
      />
      {tag !== undefined ? (
        <span className="border-border text-fg-muted rounded-[3px] border px-1.5 py-0.5 text-[10px] tracking-[0.1em]">
          {tag}
        </span>
      ) : null}
    </div>
  );
});
CommandInput.displayName = "CommandInput";

/* -------------------------------------------------------------------------- */
/* List                                                                       */
/* -------------------------------------------------------------------------- */

export const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(function CommandList({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[320px] overflow-y-auto p-1.5", className)}
      {...rest}
    />
  );
});
CommandList.displayName = "CommandList";

export const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(function CommandEmpty({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn(
        "text-fg-subtle px-4 py-6 text-center font-mono text-[11px] tracking-[0.08em]",
        className,
      )}
      {...rest}
    />
  );
});
CommandEmpty.displayName = "CommandEmpty";

/* -------------------------------------------------------------------------- */
/* Group                                                                      */
/* -------------------------------------------------------------------------- */

export const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(function CommandGroup({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "[&_[cmdk-group-heading]]:text-fg-subtle [&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:items-center [&_[cmdk-group-heading]]:gap-2 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:uppercase",
        "[&_[cmdk-group-heading]]:before:bg-border [&_[cmdk-group-heading]]:after:bg-border [&_[cmdk-group-heading]]:before:h-px [&_[cmdk-group-heading]]:before:flex-1 [&_[cmdk-group-heading]]:after:h-px [&_[cmdk-group-heading]]:after:flex-1",
        className,
      )}
      {...rest}
    />
  );
});
CommandGroup.displayName = "CommandGroup";

/**
 * Backwards-compatible standalone group label. Prefer the `heading` prop on
 * {@link CommandGroup} when grouping actual items — it carries proper
 * accessibility semantics.
 */
export const CommandGroupLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CommandGroupLabel({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "text-fg-subtle flex items-center gap-2 px-2.5 pt-2 pb-1 text-[9px] tracking-[0.18em] uppercase",
          "before:bg-border after:bg-border before:h-px before:flex-1 after:h-px after:flex-1",
          className,
        )}
        {...rest}
      />
    );
  },
);
CommandGroupLabel.displayName = "CommandGroupLabel";

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export interface CommandItemProps extends Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
  "asChild"
> {
  /** Currently active row — sets `data-state="active"` for legacy styling. */
  active?: boolean;
  /** Optional icon glyph (boxed). */
  icon?: ReactNode;
  /** Right-aligned meta label. */
  meta?: ReactNode;
}

export const CommandItem = forwardRef<ElementRef<typeof CommandPrimitive.Item>, CommandItemProps>(
  function CommandItem({ className, active = false, icon, meta, children, ...rest }, ref) {
    return (
      <CommandPrimitive.Item
        ref={ref}
        data-state={active ? "active" : undefined}
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-2 rounded-[7px] px-2.5 py-[7px] text-left select-none",
          "text-fg-muted font-mono text-[12px] leading-none transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          // cmdk sets data-selected on keyboard/pointer focus
          "data-[selected=true]:bg-bg-subtle data-[selected=true]:text-fg",
          "data-[state=active]:bg-bg-subtle data-[state=active]:text-fg",
          "data-[disabled=true]:hover:text-fg-muted data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40 data-[disabled=true]:hover:bg-transparent",
          className,
        )}
        {...rest}
      >
        {icon !== undefined ? (
          <span
            aria-hidden="true"
            className="bg-bg-muted flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[4px] text-[11px] opacity-70 group-hover:opacity-100 group-data-[selected=true]:opacity-100 group-data-[state=active]:opacity-100"
          >
            {icon}
          </span>
        ) : null}
        <span className="flex-1">{children}</span>
        {meta !== undefined ? (
          <span className="text-fg-subtle ml-auto shrink-0 text-[10px] tracking-[0.08em]">
            {meta}
          </span>
        ) : null}
      </CommandPrimitive.Item>
    );
  },
);
CommandItem.displayName = "CommandItem";

/* -------------------------------------------------------------------------- */
/* Separator + Footer                                                         */
/* -------------------------------------------------------------------------- */

export const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(function CommandSeparator({ className, ...rest }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("bg-border mx-2 my-1.5 h-px", className)}
      {...rest}
    />
  );
});
CommandSeparator.displayName = "CommandSeparator";

export const CommandFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CommandFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-border bg-bg-subtle text-fg-subtle flex gap-4 border-t px-3.5 py-2 text-[10px] tracking-[0.1em]",
          className,
        )}
        {...rest}
      />
    );
  },
);
CommandFooter.displayName = "CommandFooter";
