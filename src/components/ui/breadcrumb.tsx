import {
  Children,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

/**
 * Outer breadcrumb navigation. Renders an `<ol>` of `<BreadcrumbItem>`s
 * automatically separated by `<BreadcrumbSeparator>`.
 *
 * The component injects separators between *children* — pass plain items
 * and let the breadcrumb handle the visual rhythm.
 */
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Custom separator node. Defaults to `/`. */
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, separator = "/", children, ...rest },
  ref,
) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em]",
        className,
      )}
      {...rest}
    >
      <ol className="contents">
        {items.map((child, i) => (
          <li key={i} className="contents">
            {child}
            {i < items.length - 1 ? <BreadcrumbSeparator>{separator}</BreadcrumbSeparator> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
});
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Mark as the current page (not a link). Renders a `<span>` instead. */
  current?: boolean;
}

/**
 * Single segment. Renders an `<a>` by default; with `current` renders a
 * `<span>` and exposes `aria-current="page"`.
 */
export const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, current = false, children, href, ...rest }, ref) {
    if (current) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-current="page"
          className={cn("text-fg", className)}
        >
          {children}
        </span>
      );
    }
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(
          "cursor-pointer text-fg-muted transition-colors hover:text-fg",
          className,
        )}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

/** Visual separator (rendered automatically between items). */
export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function BreadcrumbSeparator({ className, children = "/", ...rest }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn("text-border-strong", className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/** Truncated middle segment (`···`). Click to expand at the call site. */
export const BreadcrumbEllipsis = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  function BreadcrumbEllipsis({ className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Show more"
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-[5px] border border-border bg-bg px-2 py-[3px]",
          "text-[10px] uppercase tracking-[0.18em] text-fg-muted",
          "hover:text-fg",
          className,
        )}
        {...rest}
      >
        ···
      </button>
    );
  },
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
