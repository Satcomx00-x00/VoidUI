import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply elevated surface color instead of the default. */
  elevated?: boolean;
}

/**
 * A Nothing-style card surface with subtle border and optional elevation.
 * Renders as a `<div>` with smooth fade-up entrance animation.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] border border-border p-6",
        "transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
        "void-animate-fade-up",
        elevated ? "bg-surface-elevated" : "bg-surface",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/** Heading section inside a Card. */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 space-y-1", className)} {...props} />
  ),
);

CardHeader.displayName = "CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Title inside a CardHeader. */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-tight text-text-primary", className)}
      {...props}
    />
  ),
);

CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Description text inside a CardHeader. */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
  ),
);

CardDescription.displayName = "CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

/** Main content area of a Card. */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />,
);

CardContent.displayName = "CardContent";
