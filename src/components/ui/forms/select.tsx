import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Show a subtle error border. */
  error?: boolean;
}

/**
 * A Nothing-style `<select>` with a custom chevron icon.
 *
 * Matches `Input` height and border treatment. Accepts standard
 * `<option>` / `<optgroup>` children.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error = false, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "flex h-10 w-full cursor-pointer appearance-none rounded-[var(--radius-md)] border bg-void-950",
          "px-3 pr-9 text-sm text-text-primary",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          "disabled:cursor-not-allowed disabled:opacity-40",
          error
            ? "border-nothing-red/60 focus-visible:ring-nothing-red/50"
            : "border-border hover:border-void-600",
          className,
        )}
        {...props}
      >
        {children}
      </select>

      {/* Chevron icon */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4.5L6 8.5L10 4.5" />
      </svg>
    </div>
  ),
);

Select.displayName = "Select";
