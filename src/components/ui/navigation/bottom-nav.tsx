import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "@/lib/cn";

// ── BottomNav ─────────────────────────────────────────────────────────────────

export type BottomNavProps = HTMLAttributes<HTMLElement>;

/**
 * A Nothing Phone-style bottom navigation bar.
 *
 * Fixed to the viewport bottom, houses up to 5 `BottomNavItem` buttons.
 * Uses a blurred glass surface to float over content.
 */
export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Bottom navigation"
      className={cn(
        "fixed bottom-0 inset-x-0 z-40",
        "flex items-center justify-around",
        "h-16 px-2",
        "border-t border-[var(--color-glass-border)] bg-[var(--color-glass)]",
        "backdrop-blur-md",
        "void-animate-slide-up",
        className,
      )}
      {...props}
    />
  ),
);

BottomNav.displayName = "BottomNav";

// ── BottomNavItem ─────────────────────────────────────────────────────────────

export interface BottomNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element (typically a 24px SVG). */
  icon: ReactNode;
  /** Label text shown below the icon. */
  label: string;
  /** Whether this item is the active route. */
  active?: boolean;
}

/**
 * A single tab in the `BottomNav` bar.
 *
 * Active item gets an accent dot indicator above the icon.
 */
export const BottomNavItem = forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ className, icon, label, active = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex flex-1 flex-col items-center justify-center gap-1 py-1",
        "text-xs font-medium",
        "cursor-pointer rounded-[var(--radius-md)]",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "active:scale-[0.95]",
        active ? "text-text-primary" : "text-text-muted hover:text-text-secondary",
        className,
      )}
      {...props}
    >
      {/* Active indicator dot */}
      {active && (
        <span
          aria-hidden
          className="absolute top-0 size-1 rounded-full bg-accent void-animate-scale-in"
        />
      )}
      <span className={cn("transition-transform duration-[var(--duration-fast)]", active && "scale-110")}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  ),
);

BottomNavItem.displayName = "BottomNavItem";
