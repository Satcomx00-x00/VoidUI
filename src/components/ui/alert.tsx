import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Visual / semantic level of an Alert.
 */
export type AlertVariant = "info" | "success" | "warning" | "error";

const variantClasses = {
  info: [
    "border-[color-mix(in_oklch,var(--accent)_40%,transparent)]",
    "bg-accent-soft text-accent",
  ].join(" "),
  success: [
    "border-[color-mix(in_oklch,oklch(64%_0.22_150)_40%,transparent)]",
    "bg-[color-mix(in_oklch,oklch(64%_0.22_150)_10%,transparent)]",
    "text-[oklch(64%_0.22_150)]",
  ].join(" "),
  warning: [
    "border-[color-mix(in_oklch,oklch(74%_0.2_70)_40%,transparent)]",
    "bg-[color-mix(in_oklch,oklch(74%_0.2_70)_10%,transparent)]",
    "text-[oklch(74%_0.2_70)]",
  ].join(" "),
  error: [
    "border-[color-mix(in_oklch,oklch(64%_0.24_25)_40%,transparent)]",
    "bg-[color-mix(in_oklch,oklch(64%_0.24_25)_10%,transparent)]",
    "text-[oklch(64%_0.24_25)]",
  ].join(" "),
} as const satisfies Record<AlertVariant, string>;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual / semantic level. Defaults to `"info"`. */
  variant?: AlertVariant;
}

/**
 * Inline message banner. Compose with `<AlertIcon>`, `<AlertTitle>`,
 * `<AlertBody>`, and `<AlertAction>`.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant = "info", role = "status", ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      data-variant={variant}
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-start gap-x-3.5 gap-y-3 rounded-lg border p-3.5 text-xs",
        variantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
});
Alert.displayName = "Alert";

/** Bordered icon square, color inherited from the parent {@link Alert}. */
export const AlertIcon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function AlertIcon({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "mt-px grid h-[18px] w-[18px] flex-none place-items-center",
          "rounded-[4px] border border-current text-[10px] font-bold",
          className,
        )}
        {...rest}
      />
    );
  },
);
AlertIcon.displayName = "AlertIcon";

export const AlertTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertTitle({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mb-[3px] text-[11px] font-semibold tracking-[0.1em] uppercase", className)}
        {...rest}
      />
    );
  },
);
AlertTitle.displayName = "AlertTitle";

export const AlertBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertBody({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("text-fg-muted leading-snug", className)} {...rest} />;
  },
);
AlertBody.displayName = "AlertBody";

export const AlertAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function AlertAction({ className, type = "button", ...rest }, ref) {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          "cursor-pointer pt-px text-[10px] tracking-[0.14em] whitespace-nowrap uppercase opacity-70",
          "hover:opacity-100 focus-visible:opacity-100",
          className,
        )}
        {...rest}
      />
    );
  },
);
AlertAction.displayName = "AlertAction";
