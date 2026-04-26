import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Outer command palette surface — bordered, raised, with the signature
 * heavy drop shadow.
 */
export const Command = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Command(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="combobox"
      aria-expanded="true"
      aria-haspopup="listbox"
      className={cn(
        "border-border-strong bg-surface-raised mx-auto max-w-[540px] overflow-hidden rounded-[10px] border",
        "shadow-[0_16px_48px_color-mix(in_oklch,black_28%,transparent)]",
        className,
      )}
      {...rest}
    />
  );
});
Command.displayName = "Command";

export interface CommandInputProps extends InputHTMLAttributes<HTMLInputElement> {
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

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { className, icon = SearchIcon, tag, ...rest },
  ref,
) {
  return (
    <div className="border-border flex items-center gap-2.5 border-b px-4 py-3">
      <span className="text-fg-muted flex-none">{icon}</span>
      <input
        ref={ref}
        type="search"
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

export const CommandList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CommandList({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="listbox"
        className={cn("max-h-[320px] overflow-y-auto p-1.5", className)}
        {...rest}
      />
    );
  },
);
CommandList.displayName = "CommandList";

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

export interface CommandItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Currently focused / hovered. */
  active?: boolean;
  /** Optional icon glyph (boxed). */
  icon?: ReactNode;
  /** Right-aligned meta label. */
  meta?: ReactNode;
  /** Disable interaction. */
  disabled?: boolean;
}

export const CommandItem = forwardRef<HTMLButtonElement, CommandItemProps>(function CommandItem(
  { className, active = false, icon, meta, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      disabled={disabled}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-[7px] px-2.5 py-[7px] text-left select-none",
        "text-fg-muted font-mono text-[12px] leading-none transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "hover:bg-bg-subtle hover:text-fg",
        "data-[state=active]:bg-bg-subtle data-[state=active]:text-fg",
        disabled === true &&
          "hover:text-fg-muted cursor-not-allowed opacity-40 hover:bg-transparent",
        className,
      )}
      {...rest}
    >
      {icon !== undefined ? (
        <span
          aria-hidden="true"
          className="bg-bg-muted flex h-[18px] w-[18px] flex-none items-center justify-center rounded-[4px] text-[11px] opacity-70 group-hover:opacity-100 group-data-[state=active]:opacity-100"
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
    </button>
  );
});
CommandItem.displayName = "CommandItem";

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
