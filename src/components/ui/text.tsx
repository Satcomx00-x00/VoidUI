import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Typographic hierarchy levels. */
const textVariants = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  body: "text-base leading-relaxed",
  caption: "text-sm text-text-secondary",
  overline: "text-xs font-semibold uppercase tracking-[0.15em] text-text-muted",
  mono: "font-mono text-sm text-text-secondary",
} as const;

type Variant = keyof typeof textVariants;

/** Map from variant to the default HTML element tag. */
const defaultTagMap: Record<Variant, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  caption: "p",
  overline: "span",
  mono: "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** @default "body" */
  variant?: Variant;
  /** Override the rendered HTML tag. */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Polymorphic text component following Nothing's minimalist type system.
 *
 * Automatically selects the correct HTML element for each variant,
 * or you can override with the `as` prop.
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = "body", as, ...props }, ref) => {
    const Tag = (as ?? defaultTagMap[variant]) as React.ElementType;

    return <Tag ref={ref} className={cn(textVariants[variant], className)} {...props} />;
  },
);

Text.displayName = "Text";
