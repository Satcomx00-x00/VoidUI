import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Size presets for the Avatar component. */
const avatarSizes = {
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source URL. When omitted, `fallback` initials are shown. */
  src?: string;
  /** Alt text for the image. @default "" */
  alt?: string;
  /**
   * Up to two characters shown when `src` is absent.
   * Automatically uppercased and trimmed to two chars.
   */
  fallback?: string;
  /** @default "md" */
  size?: keyof typeof avatarSizes;
}

/**
 * A circular avatar with optional image and initials fallback.
 *
 * When neither `src` nor `fallback` is provided, a generic person icon renders.
 * The `ref` is forwarded to the outer `<span>` wrapper.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt = "", fallback, size = "md", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full",
        "bg-void-800 font-medium text-text-secondary",
        "ring-1 ring-border",
        avatarSizes[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : fallback ? (
        <span aria-hidden>{fallback.slice(0, 2).toUpperCase()}</span>
      ) : (
        /* Generic person silhouette */
        <svg
          aria-hidden
          className="size-[55%] text-text-muted"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      )}
    </span>
  ),
);

Avatar.displayName = "Avatar";
