import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Floating menu surface — pure presentation. Position with absolute /
 * fixed at the call site, or via your headless positioning library.
 */
export const DropdownMenu = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DropdownMenu({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="menu"
        style={{ animation: "void-popover-in 160ms var(--ease-snap)" }}
        className={cn(
          "border-border bg-surface-raised min-w-[240px] overflow-hidden rounded-xl border p-1.5 text-xs",
          "shadow-[0_12px_32px_color-mix(in_oklch,black_28%,transparent),0_2px_8px_color-mix(in_oklch,black_12%,transparent)]",
          "backdrop-blur-sm",
          className,
        )}
        {...rest}
      />
    );
  },
);
DropdownMenu.displayName = "DropdownMenu";

export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Show the leading check mark and reserve space. */
  checked?: boolean;
  /** Render as a destructive item (red accent on hover). */
  destructive?: boolean;
  /** Optional icon glyph rendered in the leading slot. */
  icon?: ReactNode;
  /** Optional shortcut badge rendered trailing. */
  shortcut?: ReactNode;
  /** Currently active row (focused via keyboard). */
  active?: boolean;
  /** Disable interaction. */
  disabled?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  {
    className,
    checked = false,
    destructive = false,
    active = false,
    icon,
    shortcut,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      aria-checked={checked || undefined}
      data-active={active || undefined}
      data-destructive={destructive || undefined}
      data-checked={checked || undefined}
      disabled={disabled}
      className={cn(
        // Layout
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-[7px] px-2.5 py-[7px] text-left select-none",
        // Typography
        "text-fg-muted font-mono text-[12px] leading-none",
        // Transition
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        // Default hover / active
        "hover:bg-bg-subtle hover:text-fg",
        "data-[active=true]:bg-bg-subtle data-[active=true]:text-fg",
        // Focus ring
        "focus-visible:ring-accent focus-visible:ring-1 focus-visible:outline-none",
        // Destructive hover
        "data-[destructive=true]:hover:bg-[color-mix(in_oklch,oklch(62%_0.22_25)_10%,transparent)]",
        "data-[destructive=true]:hover:text-[oklch(62%_0.22_25)]",
        // Checked: accent left bar via box-shadow inset
        "data-[checked=true]:text-fg",
        // Disabled
        disabled === true &&
          "hover:text-fg-muted cursor-not-allowed opacity-40 hover:bg-transparent",
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
    </button>
  );
});
DropdownItem.displayName = "DropdownItem";

export const DropdownSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DropdownSeparator({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("bg-border mx-2 my-1.5 h-px", className)}
        {...rest}
      />
    );
  },
);
DropdownSeparator.displayName = "DropdownSeparator";

export const DropdownLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function DropdownLabel({ className, ...rest }, ref) {
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
DropdownLabel.displayName = "DropdownLabel";
