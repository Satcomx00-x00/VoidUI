"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* Compound — Radix-backed                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Dropdown menu root. Compound: pair with {@link DropdownMenuTrigger} +
 * {@link DropdownMenuContent}. Items use {@link DropdownItem}.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild><Button>Menu</Button></DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownLabel>Account</DropdownLabel>
 *     <DropdownItem>Profile</DropdownItem>
 *     <DropdownSeparator />
 *     <DropdownItem destructive>Sign out</DropdownItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface DropdownMenuContentProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> {
  /** Disable the default Portal mount. */
  disablePortal?: boolean;
}

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  { className, sideOffset = 6, align = "start", disablePortal = false, style, ...rest },
  ref,
) {
  const node = (
    <DropdownMenuPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      style={{ animation: "void-popover-in 160ms var(--ease-snap)", ...style }}
      className={cn(
        "border-border bg-surface-raised z-50 min-w-[240px] overflow-hidden rounded-xl border p-1.5 text-xs",
        "shadow-[0_12px_32px_color-mix(in_oklch,black_28%,transparent),0_2px_8px_color-mix(in_oklch,black_12%,transparent)]",
        "backdrop-blur-sm focus:outline-none",
        className,
      )}
      {...rest}
    />
  );
  return disablePortal ? node : <DropdownMenuPrimitive.Portal>{node}</DropdownMenuPrimitive.Portal>;
});
DropdownMenuContent.displayName = "DropdownMenuContent";

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export interface DropdownItemProps extends Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  "asChild" | "checked"
> {
  /** Show the leading check mark and reserve space. */
  checked?: boolean;
  /** Render as a destructive item (red accent on hover). */
  destructive?: boolean;
  /** Optional icon glyph rendered in the leading slot. */
  icon?: ReactNode;
  /** Optional shortcut badge rendered trailing. */
  shortcut?: ReactNode;
}

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownItemProps
>(function DropdownItem(
  { className, checked = false, destructive = false, icon, shortcut, children, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-destructive={destructive || undefined}
      data-checked={checked || undefined}
      className={cn(
        // Layout
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-[7px] px-2.5 py-[7px] text-left select-none",
        // Typography
        "text-fg-muted font-mono text-[12px] leading-none",
        // Transition
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        // Highlight (Radix sets data-highlighted on keyboard/hover focus)
        "data-[highlighted]:bg-bg-subtle data-[highlighted]:text-fg",
        "focus:outline-none",
        // Destructive highlight
        "data-[destructive=true]:data-[highlighted]:bg-[color-mix(in_oklch,oklch(62%_0.22_25)_10%,transparent)]",
        "data-[destructive=true]:data-[highlighted]:text-[oklch(62%_0.22_25)]",
        // Disabled
        "data-[disabled]:hover:text-fg-muted data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[disabled]:hover:bg-transparent",
        className,
      )}
      {...rest}
    >
      {/* Checked accent bar */}
      {checked ? (
        <span
          aria-hidden="true"
          className="bg-accent absolute inset-y-[3px] left-0 w-[2.5px] rounded-full"
        />
      ) : null}

      {/* Leading check slot — always reserves 16px when checked prop can appear */}
      <span
        aria-hidden="true"
        className={cn(
          "text-accent flex h-4 w-4 shrink-0 items-center justify-center text-[10px]",
          !checked && "opacity-0",
        )}
      >
        {checked ? "✓" : null}
      </span>

      {/* Icon slot */}
      {icon !== undefined ? (
        <span
          aria-hidden="true"
          className="bg-bg-muted flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] text-[11px] opacity-70 group-hover:opacity-100"
        >
          {icon}
        </span>
      ) : null}

      {/* Label */}
      <span className="flex-1 truncate">{children}</span>

      {/* Shortcut */}
      {shortcut !== undefined ? (
        <span className="ml-auto flex shrink-0 items-center gap-[3px]">
          {String(shortcut)
            .split("")
            .map((ch, i) => (
              <kbd
                key={i}
                className="border-border bg-bg-muted text-fg-subtle inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] border px-[3px] font-mono text-[10px]"
              >
                {ch}
              </kbd>
            ))}
        </span>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
});
DropdownItem.displayName = "DropdownItem";

/* -------------------------------------------------------------------------- */
/* Separator / Label                                                          */
/* -------------------------------------------------------------------------- */

export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownSeparator({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("bg-border mx-2 my-1.5 h-px", className)}
      {...rest}
    />
  );
});
DropdownSeparator.displayName = "DropdownSeparator";

export const DropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownLabel({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "text-fg-subtle flex items-center gap-2 px-2.5 pt-2 pb-1 text-[9px] tracking-[0.18em] uppercase",
        "before:bg-border after:bg-border before:h-px before:flex-1 after:h-px after:flex-1",
        className,
      )}
      {...rest}
    />
  );
});
DropdownLabel.displayName = "DropdownLabel";
