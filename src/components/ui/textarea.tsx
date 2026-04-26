import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Mark the field as invalid (red border). */
  invalid?: boolean;
}

/**
 * Multi-line text input. Inherits the same focus ring / hover treatment as
 * {@link Input} but allows vertical resize.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      data-invalid={invalid || undefined}
      className={cn(
        "w-full resize-y px-3 py-2 outline-none",
        "bg-bg text-fg",
        "border border-border rounded-[6px]",
        "font-mono text-[13px] leading-relaxed tracking-[0.02em]",
        "transition-[border-color,box-shadow]",
        "duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "placeholder:text-fg-subtle",
        "hover:border-border-strong",
        "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[invalid=true]:border-[oklch(60%_0.18_25)]",
        className,
      )}
      {...rest}
    />
  );
});
Textarea.displayName = "Textarea";
