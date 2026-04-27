"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

/**
 * Top-level provider for VoidUI. Mount once near the root of the application.
 *
 * Provides a single shared `Tooltip.Provider` so individual `<Tooltip>` calls
 * coordinate hover delays globally (the default 700 ms feels sluggish; the
 * provider lowers it to a snappier 200 ms). It is safe to omit \u2014 each
 * `<Tooltip>` falls back to its own provider if this one is absent.
 */
export interface VoidUIProviderProps {
  children: ReactNode;
  /** Hover-open delay for tooltips, in ms. Defaults to `200`. */
  tooltipDelayDuration?: number;
  /** Skip the hover delay when moving between tooltipped triggers. Defaults to `300`. */
  tooltipSkipDelayDuration?: number;
}

export function VoidUIProvider({
  children,
  tooltipDelayDuration = 200,
  tooltipSkipDelayDuration = 300,
}: VoidUIProviderProps): ReactNode {
  return (
    <TooltipPrimitive.Provider
      delayDuration={tooltipDelayDuration}
      skipDelayDuration={tooltipSkipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}
