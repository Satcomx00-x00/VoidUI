"use client";

import { type HTMLAttributes, forwardRef, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export interface HeatMapEntry {
  /** ISO date string — "YYYY-MM-DD". */
  date: string;
  /** Activity count for this day (≥ 0). */
  value: number;
}

export interface HeatMapProps extends HTMLAttributes<HTMLDivElement> {
  /** Daily activity data. Dates outside the rendered range are ignored. */
  data: HeatMapEntry[];
  /**
   * Maximum value used to normalise intensity.
   * Defaults to the highest value found in `data`.
   */
  maxValue?: number;
  /** Number of weeks to render (columns). @default 52 */
  weekCount?: number;
}

// ─── Intensity ────────────────────────────────────────────────────────────────

type Intensity = 0 | 1 | 2 | 3 | 4;

function toIntensity(value: number, max: number): Intensity {
  if (value <= 0) return 0;
  const r = value / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}

const intensityClass: Record<Intensity, string> = {
  0: "bg-void-900",
  1: "bg-nothing-red/20",
  2: "bg-nothing-red/40",
  3: "bg-nothing-red/65",
  4: "bg-nothing-red",
};

// ─── Day / Month labels ────────────────────────────────────────────────────────

const DAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };
const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function monthAbbr(m: number): string {
  return MONTH_ABBR[m] ?? "";
}

// ─── Cell type ────────────────────────────────────────────────────────────────

interface Cell {
  dateStr: string;
  value: number;
  intensity: Intensity;
  inRange: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * A GitHub-style contribution heatmap rendered entirely with Tailwind CSS.
 *
 * Shows up to `weekCount` columns (weeks), with 7 rows (Sun → Sat).
 * Intensity is coded with Nothing-red at five opacity levels.
 */
export const HeatMap = forwardRef<HTMLDivElement, HeatMapProps>(
  ({ className, data, maxValue, weekCount = 52, ...props }, ref) => {
    const [hovered, setHovered] = useState<{ dateStr: string; value: number } | null>(null);

    const { grid, monthLabels } = useMemo(() => {
      // Build date → value lookup
      const lookup = new Map<string, number>();
      let maxFound = maxValue ?? 0;
      for (const entry of data) {
        lookup.set(entry.date, entry.value);
        if (maxValue === undefined && entry.value > maxFound) maxFound = entry.value;
      }
      const effectiveMax = maxFound > 0 ? maxFound : 1;

      // Determine the grid start: Sunday of (weekCount - 1) weeks ago
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - today.getDay()); // go to Sunday of this week
      startDate.setDate(startDate.getDate() - (weekCount - 1) * 7);

      const grid: Cell[][] = [];
      const monthLabels: Array<{ abbr: string; col: number }> = [];
      let lastMonth = -1;

      for (let w = 0; w < weekCount; w++) {
        const week: Cell[] = [];
        for (let d = 0; d < 7; d++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + w * 7 + d);
          const inRange = date <= today;
          const dateStr = date.toISOString().slice(0, 10);
          const value = lookup.get(dateStr) ?? 0;
          week.push({
            dateStr,
            value,
            intensity: inRange ? toIntensity(value, effectiveMax) : 0,
            inRange,
          });

          // Record month labels on the first day (Sunday) of each week
          if (d === 0 && inRange) {
            const m = date.getMonth();
            if (m !== lastMonth) {
              monthLabels.push({ abbr: monthAbbr(m), col: w });
              lastMonth = m;
            }
          }
        }
        grid.push(week);
      }

      return { grid, monthLabels };
    }, [data, maxValue, weekCount]);

    return (
      <div ref={ref} className={cn("inline-flex flex-col gap-2 select-none", className)} {...props}>
        {/* Month labels row */}
        <div className="flex gap-[3px] pl-9">
          {grid.map((_, w) => {
            const label = monthLabels.find((m) => m.col === w);
            return (
              <div key={w} className="w-[11px] shrink-0 text-[9px] leading-none text-text-muted">
                {label?.abbr ?? ""}
              </div>
            );
          })}
        </div>

        {/* Day labels + cell grid */}
        <div className="flex items-start gap-1.5">
          {/* Day labels */}
          <div className="flex w-7 flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className="flex h-[11px] items-center justify-end text-[9px] leading-none text-text-muted"
              >
                {DAY_LABELS[i] ?? ""}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="flex gap-[3px]">
            {grid.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((cell, d) => (
                  <div
                    key={d}
                    onMouseEnter={() =>
                      cell.inRange && setHovered({ dateStr: cell.dateStr, value: cell.value })
                    }
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "size-[11px] rounded-[2px]",
                      "transition-opacity duration-[var(--duration-fast)]",
                      cell.inRange ? intensityClass[cell.intensity] : "bg-void-900/30",
                      cell.inRange && "cursor-pointer hover:ring-1 hover:ring-void-500",
                    )}
                    aria-label={cell.inRange ? `${cell.dateStr}: ${cell.value}` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        <div className="h-4 pl-9">
          {hovered !== null ? (
            <span className="text-[10px] text-text-secondary">
              <span className="font-medium text-text-primary">{hovered.value}</span> contributions
              on {hovered.dateStr}
            </span>
          ) : null}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 pl-9">
          <span className="text-[9px] text-text-muted">Less</span>
          {([0, 1, 2, 3, 4] as const).map((i) => (
            <div key={i} className={cn("size-[11px] rounded-[2px]", intensityClass[i])} />
          ))}
          <span className="text-[9px] text-text-muted">More</span>
        </div>
      </div>
    );
  },
);

HeatMap.displayName = "HeatMap";
