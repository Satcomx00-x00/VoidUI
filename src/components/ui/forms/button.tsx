import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Visual style variants for the Button component. */
const variants = {
  primary: [
    "bg-accent text-void-white",
    "hover:bg-accent-hover",
    "active:scale-[0.97]",
    "shadow-[0_0_0_1px_theme(--color-accent)]",
  ].join(" "),
  secondary: [
    "bg-void-900 text-void-100",
    "hover:bg-void-800",
    "active:scale-[0.97]",
    "shadow-[0_0_0_1px_theme(--color-border)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-void-300",
    "hover:bg-void-900 hover:text-void-100",
    "active:scale-[0.97]",
  ].join(" "),
  danger: [
    "bg-nothing-red/10 text-nothing-red",
    "hover:bg-nothing-red/20",
    "active:scale-[0.97]",
    "shadow-[0_0_0_1px_theme(--color-nothing-red)]",
  ].join(" "),
} as const;

/** Size presets for the Button component. */
const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]",
  lg: "h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md)]",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "primary" */
  variant?: keyof typeof variants;
  /** @default "md" */
  size?: keyof typeof sizes;
}

/**
 * A Nothing-inspired button with micro-interaction scale animation.
 *
 * Supports `primary`, `secondary`, `ghost`, and `danger` variants
 * in three sizes.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center font-medium",
        "select-none whitespace-nowrap",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
