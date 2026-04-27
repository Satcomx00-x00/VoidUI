"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useEffect, type CSSProperties, type ReactNode } from "react";

import { ToastProvider, type ToastPosition } from "./toast";

/**
 * Top-level provider for VoidUI. Mount once near the root of the application:
 *
 * ```tsx
 * // app/layout.tsx
 * import "@nextjs-voidui/voidui/styles.css";
 * import { VoidUIProvider } from "@nextjs-voidui/voidui";
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <VoidUIProvider>{children}</VoidUIProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * Wires up, in one shot:
 *   - the global Tooltip provider (snappier 200 ms hover delay)
 *   - the toast queue + portal (so `useToast()` works anywhere)
 *   - the `data-theme` attribute on `<html>` (dark by default)
 *   - optional `--font-mono` / `--font-display` overrides (e.g. from `next/font`)
 *
 * Every prop is optional. Pass `toast={false}` or `tooltip={false}` to opt out
 * of the matching provider if you want to mount your own.
 */
export interface VoidUIProviderProps {
  children: ReactNode;

  /**
   * Theme written to `<html data-theme="...">` on mount.
   * Pass `null` to skip writing it (e.g. if you manage the attribute yourself).
   * @default "dark"
   */
  defaultTheme?: "dark" | "light" | null;

  /** Hover-open delay for tooltips, in ms. @default 200 */
  tooltipDelayDuration?: number;
  /** Skip-delay between adjacent tooltipped triggers, in ms. @default 300 */
  tooltipSkipDelayDuration?: number;
  /** Set to `false` to disable the wrapping `Tooltip.Provider`. @default true */
  tooltip?: boolean;

  /** Set to `false` to disable the wrapping `<ToastProvider>`. @default true */
  toast?: boolean;
  /** Default screen position for toasts. @default "bottom-right" */
  toastPosition?: ToastPosition;
  /** Default auto-dismiss delay for toasts, in ms. Pass `null` for persistent. @default 4000 */
  toastDuration?: number | null;

  /**
   * Override the `--font-mono` CSS variable (e.g. `nextFontMono.style.fontFamily`).
   * If omitted, the fallback ramp from `tokens.css` is used.
   */
  fontMono?: string;
  /** Override the `--font-display` CSS variable. */
  fontDisplay?: string;
}

export function VoidUIProvider({
  children,
  defaultTheme = "dark",
  tooltipDelayDuration = 200,
  tooltipSkipDelayDuration = 300,
  tooltip = true,
  toast = true,
  toastPosition = "bottom-right",
  toastDuration = 4000,
  fontMono,
  fontDisplay,
}: VoidUIProviderProps): ReactNode {
  // Write the theme attribute on `<html>` once on mount. Done in an effect
  // (not during render) so the provider stays SSR-safe and never mismatches.
  useEffect(() => {
    if (defaultTheme === null) return;
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", defaultTheme);
  }, [defaultTheme]);

  // Optional font-var overrides: applied as inline custom properties on a
  // wrapper div so they cascade to every descendant without touching <html>.
  const fontVarsStyle: CSSProperties | undefined =
    fontMono !== undefined || fontDisplay !== undefined
      ? ({
          ...(fontMono !== undefined ? { ["--font-mono" as string]: fontMono } : null),
          ...(fontDisplay !== undefined ? { ["--font-display" as string]: fontDisplay } : null),
        } as CSSProperties)
      : undefined;

  let tree: ReactNode = children;

  if (toast) {
    tree = (
      <ToastProvider defaultPosition={toastPosition} defaultDuration={toastDuration}>
        {tree}
      </ToastProvider>
    );
  }

  if (tooltip) {
    tree = (
      <TooltipPrimitive.Provider
        delayDuration={tooltipDelayDuration}
        skipDelayDuration={tooltipSkipDelayDuration}
      >
        {tree}
      </TooltipPrimitive.Provider>
    );
  }

  if (fontVarsStyle !== undefined) {
    return (
      <div style={fontVarsStyle} data-voidui-root="">
        {tree}
      </div>
    );
  }

  return tree;
}
