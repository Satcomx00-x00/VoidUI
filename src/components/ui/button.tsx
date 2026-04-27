"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Visual variants for the {@link Button} component.
 *
 * - `primary`   — Foreground fill (high-contrast, inverted). Highest emphasis.
 * - `secondary` — Outlined with foreground border. Medium emphasis.
 * - `ghost`     — Transparent until hovered. Low emphasis.
 * - `accent`    — Nothing-red fill. Use for the single most important CTA.
 * - `danger`    — Outlined destructive action (transparent bg, fg border).
 */
export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

/** Size scale for the {@link Button} component. */
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

/**
 * CVA variant builder for the Button. Exposed for advanced consumers who
 * need to compose the same look on a non-button element without using
 * `asChild` (e.g. server-rendered anchor with the button look).
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-mono uppercase tracking-[0.08em]",
    "select-none whitespace-nowrap",
    "transition-[background-color,border-color,color,transform,box-shadow,opacity]",
    "duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:opacity-40 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-fg text-bg border border-fg",
          "hover:-translate-x-px hover:-translate-y-px hover:shadow-[2px_2px_0_var(--fg)]",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ].join(" "),
        secondary: [
          "bg-transparent text-fg border border-fg",
          "hover:bg-surface hover:-translate-x-px hover:-translate-y-px hover:shadow-[2px_2px_0_var(--fg)]",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ].join(" "),
        ghost: [
          "bg-transparent text-fg-muted border border-transparent",
          "hover:text-fg hover:bg-surface hover:border-border",
          "active:bg-surface-raised",
        ].join(" "),
        accent: [
          "bg-accent text-accent-fg border border-accent",
          "hover:-translate-x-px hover:-translate-y-px hover:shadow-[2px_2px_0_var(--accent)]",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ].join(" "),
        danger: [
          "bg-transparent text-fg border border-fg",
          "hover:bg-surface hover:-translate-x-px hover:-translate-y-px hover:shadow-[2px_2px_0_var(--fg)]",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ].join(" "),
      },
      size: {
        sm: "h-[26px] px-2.5 text-[10px] gap-1.5 rounded-[6px]",
        md: "h-8 px-3.5 text-xs gap-2 rounded-[6px]",
        lg: "h-[42px] px-5 text-[13px] gap-2 rounded-[6px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

/**
 * Public props for the {@link Button} component.
 *
 * Extends every native `<button>` attribute, plus VoidUI-specific styling
 * props and the standard `asChild` escape hatch.
 */
export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "fullWidth"> {
  /** Stretch the button to fill its container width. */
  fullWidth?: boolean;
  /** Render a loading spinner and disable interaction. */
  loading?: boolean;
  /**
   * When true, render the *child* element with the button styling/behaviour
   * instead of a `<button>`. Useful for `<Link>` from Next.js, custom anchor
   * elements, or any other interactive component.
   *
   * ```tsx
   * <Button asChild variant="accent">
   *   <Link href="/dashboard">Dashboard</Link>
   * </Button>
   * ```
   *
   * `loading` is ignored when `asChild` is set, since the spinner cannot be
   * safely injected into an arbitrary child.
   */
  asChild?: boolean;
}

/**
 * VoidUI primary action primitive.
 *
 * Sharp, uppercase, utilitarian. Offset-shadow hover signals the press before
 * it happens — a signature Nothing-style micro-interaction.
 *
 * Forwards its ref to the underlying `<button>` (or, when `asChild` is set,
 * to the child element).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    fullWidth,
    loading = false,
    asChild = false,
    disabled,
    type,
    children,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled === true || loading;

  // Native `<button>` needs an explicit type; arbitrary children may not.
  const buttonOnlyProps = asChild
    ? null
    : ({ type: type ?? "button", disabled: isDisabled } as const);

  const content: ReactNode = asChild ? (
    children
  ) : (
    <>
      {loading ? <ButtonSpinner /> : null}
      <span className={cn("contents", loading && "opacity-70")}>{children}</span>
    </>
  );

  return (
    <Comp
      ref={ref}
      data-variant={variant ?? "primary"}
      data-size={size ?? "md"}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...buttonOnlyProps}
      {...rest}
    >
      {content}
    </Comp>
  );
});

Button.displayName = "Button";

/**
 * Keyboard shortcut label rendered inside a {@link Button}.
 *
 * ```tsx
 * <Button variant="accent">
 *   Confirm <ButtonKbd>⌘↵</ButtonKbd>
 * </Button>
 * ```
 */
export const ButtonKbd = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function ButtonKbd(
  { className, children, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn("ml-1.5 text-[10px] tracking-normal normal-case opacity-55", className)}
      {...rest}
    >
      {children}
    </kbd>
  );
});

ButtonKbd.displayName = "ButtonKbd";

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
