import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const alertStyles = {
  info: {
    bar: "bg-void-500",
    icon: "text-void-400",
  },
  success: {
    bar: "bg-void-400",
    icon: "text-void-300",
  },
  warning: {
    bar: "bg-nothing-red",
    icon: "text-nothing-red",
  },
  danger: {
    bar: "bg-nothing-red",
    icon: "text-nothing-red",
  },
} as const satisfies Record<string, Record<"bar" | "icon", string>>;

type AlertVariant = keyof typeof alertStyles;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** @default "info" */
  variant?: AlertVariant;
  /** Short bold title. */
  title?: string;
  /** Descriptive content. */
  description?: string;
}

/**
 * A notification-style alert card.
 *
 * Features a left color bar indicating severity, a dot indicator, title and
 * description. Follows Nothing's minimal notification aesthetic.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "void-animate-slide-down relative flex gap-3 overflow-hidden",
        "rounded-[var(--radius-md)] border border-border bg-surface-elevated p-4",
        className,
      )}
      {...props}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-[3px]", alertStyles[variant].bar)}
      />

      {/* Dot indicator */}
      <span
        aria-hidden
        className={cn(
          "mt-0.5 size-2 shrink-0 rounded-full",
          alertStyles[variant].bar,
          variant === "danger" || variant === "warning" ? "void-animate-pulse-dot" : "",
        )}
      />

      {/* Content */}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {title && <span className="text-sm font-semibold text-text-primary">{title}</span>}
        {description && <span className="text-sm text-text-secondary">{description}</span>}
        {children}
      </span>
    </div>
  ),
);

Alert.displayName = "Alert";
