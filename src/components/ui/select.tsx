"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* SelectOption                                                                */
/* -------------------------------------------------------------------------- */

export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  /** Optional icon glyph shown in the leading slot (same badge as DropdownItem). */
  icon?: ReactNode;
  /** Injected by Select — do not set manually. */
  _selected?: boolean;
  /** Injected by Select — do not set manually. */
  _active?: boolean;
}

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  function SelectOption(
    {
      className,
      value: _value,
      disabled = false,
      children,
      icon,
      _selected = false,
      _active = false,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="option"
        aria-selected={_selected}
        data-selected={_selected || undefined}
        data-active={_active || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "group relative flex w-full cursor-pointer select-none items-center gap-2 rounded-[7px] px-2.5 py-[7px]",
          "font-mono text-[12px] leading-none",
          "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "text-fg-muted hover:bg-bg-subtle hover:text-fg",
          "data-[active=true]:bg-bg-subtle data-[active=true]:text-fg",
          "data-[selected=true]:text-fg",
          "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40",
          "data-[disabled=true]:hover:bg-transparent data-[disabled=true]:hover:text-fg-muted",
          className,
        )}
        {...rest}
      >
        {_selected ? (
          <span
            aria-hidden="true"
            className="absolute inset-y-[3px] left-0 w-[2.5px] rounded-full bg-accent"
          />
        ) : null}
        {/* Check slot — always reserves 16 px to keep labels aligned */}
        <span
          aria-hidden="true"
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center text-[10px] text-accent",
            !_selected && "opacity-0",
          )}
        >
          ✓
        </span>
        {/* Icon badge — matches DropdownItem */}
        {icon !== undefined ? (
          <span
            aria-hidden="true"
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-bg-muted text-[11px] opacity-70 group-hover:opacity-100 group-data-[active=true]:opacity-100"
          >
            {icon}
          </span>
        ) : null}
        <span className="flex-1 truncate">{children}</span>
      </div>
    );
  },
);
SelectOption.displayName = "SelectOption";

/* -------------------------------------------------------------------------- */
/* Select                                                                      */
/* -------------------------------------------------------------------------- */

export interface SelectProps {
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called when user picks an option. */
  onValueChange?: (value: string) => void;
  /** Placeholder shown when no option is selected. */
  placeholder?: string;
  /** Disable the entire control. */
  disabled?: boolean;
  /** Mark as invalid (red border). */
  invalid?: boolean;
  /** Extra classes on the root wrapper. */
  className?: string;
  /** `<SelectOption>` children. */
  children?: ReactNode;
  /** HTML name for hidden native select (form submission). */
  name?: string;
}

/**
 * Fully custom, accessible select / listbox.
 * Renders a styled trigger that opens a floating panel of `<SelectOption>` items.
 * Keyboard: ArrowUp/Down navigate, Enter/Space select, Escape/Tab close.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    placeholder = "Select…",
    disabled = false,
    invalid = false,
    className,
    children,
    name,
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  /* ---- Parse children --------------------------------------------------- */
  const optionElements = Children.toArray(children).filter(
    (c): c is ReactElement<SelectOptionProps> =>
      isValidElement(c) &&
      (c.type === SelectOption ||
        (typeof c.type === "function" && c.type.displayName === "SelectOption")),
  );

  interface OptionData {
    value: string;
    label: ReactNode;
    icon: ReactNode;
    disabled: boolean;
  }

  const options: OptionData[] = optionElements.map((el) => ({
    value: el.props.value,
    label: el.props.children,
    icon: el.props.icon,
    disabled: el.props.disabled ?? false,
  }));

  const selectedOption = options.find((o) => o.value === value);

  /* ---- Handlers --------------------------------------------------------- */
  function openMenu(): void {
    if (disabled) return;
    const sel = options.findIndex((o) => o.value === value);
    setActiveIndex(sel >= 0 ? sel : options.findIndex((o) => !o.disabled));
    setOpen(true);
  }

  function closeMenu(): void {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function pickOption(optValue: string): void {
    if (controlledValue === undefined) setInternalValue(optValue);
    onValueChange?.(optValue);
    closeMenu();
  }

  /* ---- Click outside ---------------------------------------------------- */
  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  /* ---- Keyboard --------------------------------------------------------- */
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>): void {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => {
        let next = i + 1;
        while (next < options.length && options[next]?.disabled) next++;
        return next < options.length ? next : i;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => {
        let prev = i - 1;
        while (prev >= 0 && options[prev]?.disabled) prev--;
        return prev >= 0 ? prev : i;
      });
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(options.findIndex((o) => !o.disabled));
    }
    if (e.key === "End") {
      e.preventDefault();
      const last = options.reduce((acc, o, i) => (!o.disabled ? i : acc), -1);
      if (last >= 0) setActiveIndex(last);
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt !== undefined && !opt.disabled) pickOption(opt.value);
    }
  }

  /* ---- Render ----------------------------------------------------------- */
  return (
    <div ref={ref ?? containerRef} className={cn("relative w-full", className)}>
      {/* Hidden native select for form submission */}
      {name !== undefined ? (
        <select
          name={name}
          value={value}
          onChange={() => {
            /* controlled by custom UI */
          }}
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} />
          ))}
        </select>
      ) : null}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
        }
        disabled={disabled}
        data-invalid={invalid || undefined}
        data-open={open || undefined}
        onKeyDown={handleKeyDown}
        onClick={() => (open ? closeMenu() : openMenu())}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-[6px] border border-border px-3",
          "bg-bg font-mono text-[13px] text-fg",
          "transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "hover:border-border-strong",
          "focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[invalid=true]:border-[oklch(60%_0.18_25)]",
          "data-[open=true]:border-accent data-[open=true]:shadow-[0_0_0_3px_var(--accent-soft)]",
        )}
      >
        {/* Show selected icon in trigger when present */}
        {selectedOption?.icon !== undefined && selectedOption.icon !== null ? (
          <span
            aria-hidden="true"
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-bg-muted text-[11px] opacity-70"
          >
            {selectedOption.icon}
          </span>
        ) : null}
        <span className={cn("flex-1 truncate text-left", !selectedOption && "text-fg-muted")}>
          {selectedOption !== undefined ? selectedOption.label : placeholder}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className="shrink-0 opacity-60 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-snap)]"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {/* Listbox panel */}
      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Options"
          style={{ animation: "void-popover-in 160ms var(--ease-snap)" }}
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden",
            "rounded-xl border border-border bg-surface-raised p-1.5",
            "shadow-[0_12px_32px_color-mix(in_oklch,black_28%,transparent),0_2px_8px_color-mix(in_oklch,black_12%,transparent)]",
            "backdrop-blur-sm",
          )}
        >
          {options.map((opt, i) => {
            // Find matching element to preserve any custom props / className
            const el = optionElements[i];
            const extra = el !== undefined ? el.props : {};
            return cloneElement(
              el ?? (
                <SelectOption key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectOption>
              ),
              {
                ...extra,
                key: opt.value,
                id: `${listboxId}-opt-${i}`,
                _selected: opt.value === value,
                _active: i === activeIndex,
                disabled: opt.disabled,
                onClick: (e: ReactMouseEvent<HTMLDivElement>) => {
                  extra.onClick?.(e);
                  if (!opt.disabled) pickOption(opt.value);
                },
                onMouseEnter: (e: ReactMouseEvent<HTMLDivElement>) => {
                  extra.onMouseEnter?.(e);
                  if (!opt.disabled) setActiveIndex(i);
                },
              },
            );
          })}
        </div>
      ) : null}
    </div>
  );
});
Select.displayName = "Select";
