import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Optional label rendered next to the checkbox. */
  label?: ReactNode;
}

/**
 * Square checkbox with an accent fill and a hand-drawn check.
 * Use `defaultChecked`/`checked` like a native input — this is just a styled
 * `<input type="checkbox">`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        "group inline-flex select-none items-center gap-2.5 text-xs text-fg",
        disabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className="peer pointer-events-none absolute h-0 w-0 opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-4 w-4 items-center justify-center",
          "border border-border-strong rounded-[4px] bg-bg",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "peer-checked:border-accent peer-checked:bg-accent",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg",
          "after:hidden peer-checked:after:block",
          "after:h-1 after:w-2 after:translate-x-px after:-translate-y-px after:-rotate-45",
          "after:border-b-[1.5px] after:border-l-[1.5px] after:border-accent-fg",
        )}
      />
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Checkbox.displayName = "Checkbox";
