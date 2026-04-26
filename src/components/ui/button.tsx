import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Visual variants for the {@link Button} component.
 *
 * - `primary`   — Nothing-red accent fill. High emphasis.
 * - `secondary` — Raised void surface with subtle border. Medium emphasis.
 * - `ghost`     — Transparent until hovered. Low emphasis.
 * - `danger`    — Same shape as `primary` but reserved for destructive intent.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Size scale for the {@link Button} component.
 */
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 disabled:bg-void-700 disabled:text-text-muted",
  secondary:
    "bg-surface-raised text-text-primary border border-border hover:border-border-strong hover:bg-void-700 active:bg-void-600 disabled:bg-surface disabled:text-text-muted disabled:border-border",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary active:bg-surface-raised disabled:bg-transparent disabled:text-text-muted",
  danger:
    "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 disabled:bg-void-700 disabled:text-text-muted",
} as const satisfies Record<ButtonVariant, string>;

const sizeClasses = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-sm",
  md: "h-10 px-4 text-sm gap-2 rounded-md",
  lg: "h-12 px-6 text-base gap-2.5 rounded-md",
} as const satisfies Record<ButtonSize, string>;

const baseClasses =
  "inline-flex items-center justify-center font-mono uppercase tracking-[0.08em] " +
  "select-none whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform,opacity] " +
  "duration-[var(--duration-fast)] ease-[var(--ease-snap)] " +
  "active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:cursor-not-allowed";

/**
 * Public props for the {@link Button} component.
 *
 * Extends every native `<button>` attribute, plus VoidUI-specific styling props.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis level. Defaults to `"primary"`. */
  variant?: ButtonVariant;
  /** Size scale. Defaults to `"md"`. */
  size?: ButtonSize;
  /** Stretch the button to fill its container width. */
  fullWidth?: boolean;
  /** Render a loading spinner and disable interaction. */
  loading?: boolean;
}

/**
 * VoidUI primary action primitive.
 *
 * A monochromatic, dark-first button with Nothing-style micro-animations.
 * Forwards its ref to the underlying `<button>` element.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    type = "button",
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled === true || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? <ButtonSpinner /> : null}
      <span className={cn("contents", loading && "opacity-70")}>{children}</span>
    </button>
  );
});

Button.displayName = "Button";

function ButtonSpinner(): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-3.5 animate-spin"
    >
      <circle cx="8" cy="8" r="6" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" strokeLinecap="round" />
    </svg>
  );
}
