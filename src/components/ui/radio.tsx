import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Optional label rendered next to the radio. */
  label?: ReactNode;
}

/**
 * Single radio input. Group multiple radios by giving them the same `name`.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
        type="radio"
        disabled={disabled}
        className="peer pointer-events-none absolute h-0 w-0 opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-4 w-4 items-center justify-center",
          "border border-border-strong rounded-full bg-bg",
          "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
          "peer-checked:border-accent peer-checked:bg-accent",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg",
          "after:hidden peer-checked:after:block",
          "after:h-1.5 after:w-1.5 after:rounded-full after:bg-accent-fg",
        )}
      />
      {label !== undefined ? <span>{label}</span> : null}
    </label>
  );
});
Radio.displayName = "Radio";

/**
 * Convenience wrapper that lays out a set of {@link Radio} inputs vertically
 * with consistent gaps. Pure presentational — does not manage state.
 */
export const RadioGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(function RadioGroup({ className, orientation = "vertical", ...rest }, ref) {
  return (
    <div
      ref={ref}
      role="radiogroup"
      data-orientation={orientation}
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      {...rest}
    />
  );
});
RadioGroup.displayName = "RadioGroup";
