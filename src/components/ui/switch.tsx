import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Optional label rendered after the switch. */
  label?: ReactNode;
}

/**
 * Pill-shaped on/off toggle. Renders a visually-hidden checkbox + a styled
 * track / thumb. Forwards its ref to the underlying input.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, label, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        "group text-fg inline-flex items-center gap-2.5 text-xs select-none",
        disabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer pointer-events-none absolute h-0 w-0 opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-block h-[18px] w-[34px] shrink-0",
          "border-border-strong bg-bg rounded-full border",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "peer-checked:border-accent peer-checked:bg-accent",
          "peer-focus-visible:ring-accent peer-focus-visible:ring-offset-bg peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
          // thumb
          "after:absolute after:top-0.5 after:left-0.5 after:block after:h-3 after:w-3",
          "after:bg-fg-muted after:rounded-full",
          "after:transition-[left,background-color] after:duration-[var(--dur-fast)] after:ease-[var(--ease-snap)]",
          "peer-checked:after:bg-accent-fg peer-checked:after:left-[18px]",
        )}
      />
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Switch.displayName = "Switch";
