import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

const inputBase = [
  "h-9 w-full px-3 outline-none",
  "bg-bg text-fg",
  "border border-border rounded-[6px]",
  "font-mono text-[13px] tracking-[0.02em]",
  "transition-[border-color,box-shadow]",
  "duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
  "placeholder:text-fg-subtle",
  "hover:border-border-strong",
  "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "data-[invalid=true]:border-[oklch(60%_0.18_25)]",
].join(" ");

/**
 * Public props for the {@link Input} component.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  /** Mark the field as invalid (red border, exposes `data-invalid`). */
  invalid?: boolean;
  /**
   * Optional element rendered before the input — typically a short uppercase
   * label like `"HTTPS://"`. When provided, the input radii are squared on
   * the left to butt against the prefix box.
   */
  prefix?: ReactNode;
}

/**
 * Single-line text input — sharp, monospace, with a focus ring driven by
 * `--accent-soft`. Supports an optional `prefix` slot.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid = false, prefix, type = "text", ...rest },
  ref,
) {
  if (prefix !== undefined) {
    return (
      <div className="flex items-stretch">
        <span
          className={cn(
            "inline-flex items-center px-2.5",
            "border border-r-0 border-border rounded-l-[6px]",
            "bg-bg-subtle text-fg-muted text-[11px] tracking-[0.1em] uppercase",
          )}
        >
          {prefix}
        </span>
        <input
          ref={ref}
          type={type}
          data-invalid={invalid || undefined}
          className={cn(inputBase, "rounded-l-none rounded-r-[6px]", className)}
          {...rest}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      data-invalid={invalid || undefined}
      className={cn(inputBase, className)}
      {...rest}
    />
  );
});
Input.displayName = "Input";
