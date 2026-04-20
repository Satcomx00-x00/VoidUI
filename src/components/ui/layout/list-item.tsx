import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

// ── ListGroup ─────────────────────────────────────────────────────────────────

export type ListGroupProps = HTMLAttributes<HTMLDivElement>;

/**
 * A grouped container for `ListItem` rows — Nothing phone settings-panel style.
 * Applies a surface background and clips child borders to the group's radius.
 */
export const ListGroup = forwardRef<HTMLDivElement, ListGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
        className,
      )}
      {...props}
    />
  ),
);

ListGroup.displayName = "ListGroup";

// ── ListItem ──────────────────────────────────────────────────────────────────

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Leading icon or avatar element placed on the left. */
  leading?: ReactNode;
  /** Primary label text. */
  title: string;
  /** Secondary description text. */
  description?: string;
  /** Trailing element (arrow, badge, toggle, etc.) placed on the right. */
  trailing?: ReactNode;
  /** If true, renders a bottom divider (suppress on last item). @default true */
  divider?: boolean;
  /** Makes the row look interactive (hover highlight). */
  interactive?: boolean;
}

/**
 * A single settings-style row — the core Nothing Phone UI pattern.
 *
 * Composed of an optional leading icon, title + description text block,
 * and an optional trailing action element.
 */
export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      leading,
      title,
      description,
      trailing,
      divider = true,
      interactive = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-[56px] items-center gap-4 px-4 py-3",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
        interactive && "cursor-pointer hover:bg-surface-elevated active:bg-surface-overlay",
        divider &&
          "after:absolute after:inset-x-4 after:bottom-0 after:h-px after:bg-border last:after:hidden",
        className,
      )}
      {...props}
    >
      {/* Leading slot */}
      {leading && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-void-900 text-text-secondary">
          {leading}
        </span>
      )}

      {/* Text block */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-text-primary">{title}</span>
        {description && (
          <span className="truncate text-xs text-text-muted">{description}</span>
        )}
      </span>

      {/* Trailing slot */}
      {trailing && (
        <span className="ml-auto flex shrink-0 items-center text-text-muted">{trailing}</span>
      )}
    </div>
  ),
);

ListItem.displayName = "ListItem";
