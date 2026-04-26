import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

/**
 * Sidebar shell — a vertical column with a border on the right. Pair with
 * `<SidebarSection>`, `<SidebarLabel>`, and `<SidebarLink>`.
 */
export const Sidebar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Sidebar(
  { className, ...rest },
  ref,
) {
  return (
    <aside
      ref={ref}
      className={cn(
        "border-border bg-surface flex h-full flex-col gap-3 border-r p-3.5",
        className,
      )}
      {...rest}
    />
  );
});
Sidebar.displayName = "Sidebar";

export const SidebarSection = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SidebarSection({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...rest} />;
  },
);
SidebarSection.displayName = "SidebarSection";

/** Caption above a navigation group. */
export const SidebarLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SidebarLabel({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("text-fg-subtle mb-2 px-2 text-[10px] tracking-[0.2em] uppercase", className)}
        {...rest}
      />
    );
  },
);
SidebarLabel.displayName = "SidebarLabel";

export interface SidebarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Mark as the active route. */
  active?: boolean;
  /** Optional leading icon (defaults to a status dot). */
  icon?: ReactNode;
}

export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(function SidebarLink(
  { className, active = false, icon, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex cursor-pointer items-center gap-2.5 rounded-[6px] px-2 py-1.5 text-xs",
        "text-fg-muted transition-colors duration-[var(--dur-fast)] ease-[var(--ease-snap)]",
        "hover:text-fg hover:bg-bg-subtle",
        "data-[active=true]:bg-bg-subtle data-[active=true]:text-fg",
        className,
      )}
      {...rest}
    >
      {icon !== undefined ? (
        icon
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "bg-border-strong h-[5px] w-[5px] rounded-full",
            "group-data-[active=true]:bg-accent group-data-[active=true]:shadow-[0_0_0_2px_var(--accent-soft)]",
          )}
        />
      )}
      <span className="flex-1 truncate">{children}</span>
    </a>
  );
});
SidebarLink.displayName = "SidebarLink";
