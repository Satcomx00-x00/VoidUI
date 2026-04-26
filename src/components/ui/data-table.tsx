"use client";

import { Fragment, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/*  Micro SVG icons                                                            */
/* -------------------------------------------------------------------------- */

function IcoSearch({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={cn("h-3.5 w-3.5", className)}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="5.8" cy="5.8" r="3.8" />
      <path d="M9 9L12.5 12.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoDownload({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={cn("h-3.5 w-3.5", className)}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M7 2v7M4 6.5L7 9.5l3-3M2 12h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoChevronDown({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={cn("h-2.5 w-2.5", className)}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M2 3.5L5 6.5L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoChevronRight({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={cn("h-3 w-3", className)}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4.5 2.5L7.5 6L4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoDotsH({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={cn("h-3.5 w-3.5", className)}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="2.5" cy="7" r="1.2" />
      <circle cx="7" cy="7" r="1.2" />
      <circle cx="11.5" cy="7" r="1.2" />
    </svg>
  );
}

function IcoSort({ dir }: { dir: "asc" | "desc" | "none" }): ReactNode {
  return (
    <span className="ml-1.5 inline-flex flex-col gap-[2px]" aria-hidden="true">
      <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor">
        <path
          d="M3.5 0L7 4H0Z"
          className={cn(
            "transition-colors duration-[var(--dur-fast)]",
            dir === "asc" ? "fill-accent" : "fill-current opacity-30",
          )}
        />
      </svg>
      <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor">
        <path
          d="M3.5 4L0 0H7Z"
          className={cn(
            "transition-colors duration-[var(--dur-fast)]",
            dir === "desc" ? "fill-accent" : "fill-current opacity-30",
          )}
        />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type DataTableSortDir = "asc" | "desc" | "none";

export interface DataTableColumn<T extends object> {
  /** Key of T to read value from (also used as sort key unless overridden). */
  key: keyof T & string;
  /** Column header label. */
  label: string;
  /** Enable click-to-sort on this column. */
  sortable?: boolean;
  /** Right-align content and apply tabular-nums. */
  numeric?: boolean;
  /** Override column width (any CSS length). */
  width?: string;
  /**
   * Custom cell renderer. Falls back to `String(row[key] ?? "—")`.
   */
  render?: (row: T) => ReactNode;
}

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterConfig {
  /** Key of T whose value to filter by. */
  key: string;
  /** Button / pill label. */
  label: string;
  options: DataTableFilterOption[];
}

export interface DataTableSelectionActionsProps<T extends object> {
  selectedRows: T[];
  clearSelection: () => void;
}

export interface DataTableProps<T extends object> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Source rows. The component handles filtering, sorting and paginating them. */
  rows: T[];
  /**
   * Property of T that uniquely identifies each row.
   * Used as React key and for selection / expansion tracking.
   */
  rowKey: keyof T & string;

  /* ---- Selection ---- */
  /** Render checkbox column + selection bar. */
  selectable?: boolean;
  /**
   * Render function for the bulk-action bar shown when ≥1 row is selected.
   * Receive selected rows + a `clearSelection` helper.
   */
  selectionActions?: (selectedRows: T[], clearSelection: () => void) => ReactNode;

  /* ---- Expansion ---- */
  /** Show expand-toggle per row. */
  expandable?: boolean;
  /** Render function for the detail panel shown below an expanded row. */
  renderExpanded?: (row: T) => ReactNode;

  /* ---- Toolbar ---- */
  /** Show search input. */
  searchable?: boolean;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /**
   * Keys of T to run the search query against.
   * Searches all string-castable fields when omitted.
   */
  searchKeys?: (keyof T & string)[];
  /** Filter pill definitions. */
  filters?: DataTableFilterConfig[];
  /** Show Export button. */
  exportable?: boolean;
  /** Fired when Export is clicked with the current visible rows. */
  onExport?: (visibleRows: T[]) => void;

  /* ---- Pagination ---- */
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  /**
   * Provide an external total row count (e.g. server-side pagination).
   * Falls back to the filtered row count.
   */
  totalRows?: number;
  /** Noun appended to the row count, e.g. `"DEPLOYMENTS"`. */
  rowNoun?: string;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  IndeterminateCheckbox                                                      */
/* -------------------------------------------------------------------------- */

interface IndeterminateCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

function IndeterminateCheckbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: IndeterminateCheckboxProps): ReactNode {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      aria-label={label}
      onChange={(e) => onChange(e.target.checked)}
      className={cn(
        "h-3.5 w-3.5 cursor-pointer rounded-[3px]",
        "transition-colors duration-[var(--dur-fast)]",
        "focus-visible:outline-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
      )}
      style={{ accentColor: "var(--accent)" }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  FilterPill                                                                 */
/* -------------------------------------------------------------------------- */

interface FilterPillProps {
  config: DataTableFilterConfig;
  activeValue: string | null;
  onChange: (value: string | null) => void;
}

function FilterPill({ config, activeValue, onChange }: FilterPillProps): ReactNode {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-1.5 rounded border px-2.5 py-1.5",
          "text-[10px] tracking-[0.14em] uppercase",
          "transition-colors duration-[var(--dur-fast)]",
          activeValue !== null
            ? "border-accent bg-accent-soft text-accent"
            : "border-border bg-surface-raised text-fg-muted hover:border-border-strong hover:text-fg",
        )}
      >
        {activeValue ?? config.label}
        <IcoChevronDown
          className={cn("transition-transform duration-[var(--dur-fast)]", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={config.label}
          className={cn(
            "absolute top-full left-0 z-50 mt-1 min-w-[150px]",
            "border-border bg-surface-raised rounded border",
            "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]",
          )}
        >
          {[{ label: "All", value: null as string | null }, ...config.options].map((opt) => (
            <button
              key={opt.value ?? "__all__"}
              type="button"
              role="option"
              aria-selected={activeValue === opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-left text-[11px] tracking-wide",
                "hover:bg-bg-subtle transition-colors",
                activeValue === opt.value ? "text-accent" : "text-fg-muted",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PageButton                                                                 */
/* -------------------------------------------------------------------------- */

function PageButton({
  onClick,
  disabled = false,
  active = false,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
  children: ReactNode;
}): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={cn(
        "flex h-6 min-w-[24px] items-center justify-center rounded px-1.5",
        "text-[11px] tracking-wide",
        "transition-colors duration-[var(--dur-fast)]",
        active && "bg-accent text-accent-fg",
        !active && "text-fg-muted hover:bg-bg-subtle hover:text-fg",
        disabled && "pointer-events-none opacity-25",
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  getPageRange                                                               */
/* -------------------------------------------------------------------------- */

function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "ellipsis", total];
  if (current >= total - 2) return [1, "ellipsis", total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

/* -------------------------------------------------------------------------- */
/*  DataTable                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Full-featured data table with toolbar, row selection, row expansion,
 * multi-column sorting, filter pills, and client-side pagination.
 *
 * All state is managed internally — wire up callbacks for side effects.
 *
 * ```tsx
 * <DataTable
 *   columns={COLUMNS}
 *   rows={rows}
 *   rowKey="id"
 *   selectable
 *   expandable
 *   renderExpanded={(row) => <DetailPanel row={row} />}
 *   searchable
 *   searchPlaceholder="Search deployments…"
 *   filters={FILTERS}
 *   exportable
 *   rowNoun="DEPLOYMENTS"
 *   selectionActions={(selected, clear) => (
 *     <Button onClick={clear}>Cancel</Button>
 *   )}
 * />
 * ```
 */
export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  selectable = false,
  selectionActions,
  expandable = false,
  renderExpanded,
  searchable = false,
  searchPlaceholder = "Search…",
  searchKeys,
  filters,
  exportable = false,
  onExport,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 25,
  totalRows,
  rowNoun = "ROWS",
  className,
}: DataTableProps<T>): ReactNode {
  /* ---- Core state ---- */
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<DataTableSortDir>("none");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  /* ---- Filter ---- */
  const filteredRows = useMemo(() => {
    let result = rows;

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      const keys = searchKeys ?? (Object.keys(rows[0] ?? {}) as (keyof T & string)[]);
      result = result.filter((row) =>
        keys.some((k) =>
          String((row as Record<string, unknown>)[k as string] ?? "")
            .toLowerCase()
            .includes(q),
        ),
      );
    }

    for (const [fKey, fVal] of Object.entries(activeFilters)) {
      result = result.filter(
        (row) => String((row as Record<string, unknown>)[fKey] ?? "") === fVal,
      );
    }

    return result;
  }, [rows, search, searchKeys, activeFilters]);

  /* ---- Sort ---- */
  const sortedRows = useMemo(() => {
    if (sortCol === null || sortDir === "none") return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortCol] ?? "";
      const bv = (b as Record<string, unknown>)[sortCol] ?? "";
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredRows, sortCol, sortDir]);

  /* ---- Paginate ---- */
  const totalFiltered = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safeCurrentPage = Math.min(page, totalPages);

  const pageRows = useMemo(
    () => sortedRows.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize),
    [sortedRows, safeCurrentPage, pageSize],
  );

  /* ---- Selection helpers ---- */
  const pageKeys = pageRows.map((r) => String((r as Record<string, unknown>)[rowKey as string]));
  const allPageSelected = pageKeys.length > 0 && pageKeys.every((k) => selectedKeys.has(k));
  const somePageSelected = !allPageSelected && pageKeys.some((k) => selectedKeys.has(k));

  const clearSelection = useCallback(() => setSelectedKeys(new Set()), []);

  const selectedRows = useMemo(
    () =>
      rows.filter((r) =>
        selectedKeys.has(String((r as Record<string, unknown>)[rowKey as string])),
      ),
    [rows, selectedKeys, rowKey],
  );

  /* ---- Sort handler ---- */
  function handleSort(col: string): void {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortDir("none");
      setSortCol(null);
    } else {
      setSortDir("asc");
    }
  }

  function colSortDir(col: string): DataTableSortDir {
    return sortCol === col ? sortDir : "none";
  }

  /* ---- Column count (for colSpan) ---- */
  const totalColCount =
    (selectable ? 1 : 0) + (expandable ? 1 : 0) + columns.length + 1; /* +1 for actions */

  /* ---- Toolbar flag ---- */
  const hasToolbar = searchable || (filters !== undefined && filters.length > 0) || exportable;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* --------------------------------------------------------------- */}
      {/* Toolbar                                                          */}
      {/* --------------------------------------------------------------- */}
      {hasToolbar && (
        <div
          className={cn(
            "border-border bg-surface-raised flex flex-wrap items-center gap-2 rounded-t-lg border px-3 py-2.5",
          )}
        >
          {searchable && (
            <div className="relative min-w-[180px] flex-1">
              <span className="text-fg-subtle pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2">
                <IcoSearch />
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className={cn(
                  "border-border bg-bg w-full rounded border py-1.5 pr-3 pl-7",
                  "text-fg placeholder:text-fg-subtle text-[11px] tracking-[0.1em] uppercase",
                  "focus:border-border-strong transition-colors focus:outline-none",
                )}
              />
            </div>
          )}

          {filters?.map((f) => (
            <FilterPill
              key={f.key}
              config={f}
              activeValue={activeFilters[f.key] ?? null}
              onChange={(v) => {
                setActiveFilters((prev) => {
                  const next = { ...prev };
                  if (v === null) delete next[f.key];
                  else next[f.key] = v;
                  return next;
                });
                setPage(1);
              }}
            />
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-fg-muted text-[10px] tracking-[0.14em] uppercase">
              {totalFiltered} {rowNoun}
            </span>

            {exportable && (
              <button
                type="button"
                onClick={() => onExport?.(pageRows)}
                className={cn(
                  "border-border bg-surface-raised flex items-center gap-1.5 rounded border px-2.5 py-1.5",
                  "text-fg text-[10px] tracking-[0.14em] uppercase",
                  "hover:border-border-strong transition-colors",
                )}
              >
                <IcoDownload />
                Export
              </button>
            )}
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------- */}
      {/* Selection bar                                                    */}
      {/* --------------------------------------------------------------- */}
      {selectable && selectedKeys.size > 0 && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "border-border flex items-center justify-between border-x",
            "bg-accent-soft px-4 py-2",
          )}
        >
          <span className="text-accent text-[11px] font-medium tracking-[0.14em] uppercase">
            {selectedKeys.size} {selectedKeys.size === 1 ? "ROW" : "ROWS"} SELECTED
          </span>
          {selectionActions !== undefined && (
            <div className="flex items-center gap-2">
              {selectionActions(selectedRows, clearSelection)}
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------- */}
      {/* Table                                                            */}
      {/* --------------------------------------------------------------- */}
      <div
        className={cn(
          "border-border bg-surface-raised overflow-x-auto border",
          !hasToolbar && "rounded-t-lg",
          totalPages <= 1 && "rounded-b-lg",
        )}
      >
        <table className="w-full border-collapse text-xs">
          {/* Header */}
          <thead>
            <tr>
              {selectable && (
                <th className="border-border-strong w-10 border-b px-3 py-2.5 align-middle">
                  <IndeterminateCheckbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onChange={(checked) => {
                      setSelectedKeys((prev) => {
                        const next = new Set(prev);
                        if (checked) pageKeys.forEach((k) => next.add(k));
                        else pageKeys.forEach((k) => next.delete(k));
                        return next;
                      });
                    }}
                    label="Select all rows on this page"
                  />
                </th>
              )}

              {expandable && (
                <th className="border-border-strong w-8 border-b" aria-label="Expand" />
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width !== undefined ? { width: col.width } : undefined}
                  onClick={col.sortable === true ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sortCol === col.key
                      ? sortDir === "asc"
                        ? "ascending"
                        : sortDir === "desc"
                          ? "descending"
                          : "none"
                      : undefined
                  }
                  className={cn(
                    "border-border-strong border-b px-3.5 py-2.5 align-middle select-none",
                    "text-fg-muted text-[10px] font-medium tracking-[0.18em] uppercase",
                    col.numeric === true ? "text-right tabular-nums" : "text-left",
                    col.sortable === true && "hover:text-fg cursor-pointer transition-colors",
                    sortCol === col.key && "text-fg",
                  )}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.sortable === true && <IcoSort dir={colSortDir(col.key)} />}
                  </span>
                </th>
              ))}

              {/* Actions column */}
              <th className="border-border-strong w-10 border-b" aria-hidden="true" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={totalColCount} className="px-4 py-16 text-center">
                  <div className="mx-auto flex flex-col items-center gap-2">
                    <span className="text-fg text-[13px]">No results</span>
                    <span className="text-fg-subtle text-[11px]">
                      Try adjusting your search or filters.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const key = String((row as Record<string, unknown>)[rowKey as string]);
                const isSelected = selectedKeys.has(key);
                const isExpanded = expandedKeys.has(key);

                return (
                  <Fragment key={key}>
                    {/* Data row */}
                    <tr
                      data-expanded={isExpanded ? "true" : undefined}
                      className={cn(
                        "transition-colors",
                        isSelected ? "bg-accent-soft" : "hover:[&>td]:bg-bg-subtle",
                        /* remove bottom border when expanded so inline-row and detail-row merge */
                        isExpanded && "[&>td]:border-b-transparent",
                      )}
                    >
                      {/* Checkbox */}
                      {selectable && (
                        <td
                          className={cn(
                            "border-border border-b px-3 py-2.5",
                            isSelected && "border-accent/20",
                          )}
                        >
                          <IndeterminateCheckbox
                            checked={isSelected}
                            onChange={(checked) => {
                              setSelectedKeys((prev) => {
                                const next = new Set(prev);
                                if (checked) next.add(key);
                                else next.delete(key);
                                return next;
                              });
                            }}
                            label={`Select row ${key}`}
                          />
                        </td>
                      )}

                      {/* Expand toggle */}
                      {expandable && (
                        <td
                          className={cn(
                            "border-border text-fg-subtle border-b px-2 py-2.5",
                            isSelected && "border-accent/20",
                          )}
                        >
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? "Collapse row" : "Expand row"}
                            onClick={() => {
                              setExpandedKeys((prev) => {
                                const next = new Set(prev);
                                if (next.has(key)) next.delete(key);
                                else next.add(key);
                                return next;
                              });
                            }}
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded",
                              "hover:bg-bg-muted hover:text-fg transition-colors",
                            )}
                          >
                            <IcoChevronRight
                              className={cn(
                                "transition-transform duration-[var(--dur-fast)]",
                                isExpanded && "rotate-90",
                              )}
                            />
                          </button>
                        </td>
                      )}

                      {/* Data cells */}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={cn(
                            "border-border border-b px-3.5 py-2.5 align-middle",
                            col.numeric === true && "text-right tabular-nums",
                            isSelected && "border-accent/20",
                          )}
                        >
                          {col.render !== undefined
                            ? col.render(row)
                            : (String(
                                (row as Record<string, unknown>)[col.key] ?? "—",
                              ) as ReactNode)}
                        </td>
                      ))}

                      {/* Row actions */}
                      <td
                        className={cn(
                          "border-border border-b px-2 py-2.5 text-right",
                          isSelected && "border-accent/20",
                        )}
                      >
                        <button
                          type="button"
                          aria-label="Row actions"
                          className={cn(
                            "text-fg-subtle flex h-5 w-5 items-center justify-center rounded",
                            "hover:bg-bg-muted hover:text-fg ml-auto transition-colors",
                          )}
                        >
                          <IcoDotsH />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded detail panel — always in DOM for smooth height animation */}
                    {expandable && (
                      <tr aria-hidden={!isExpanded}>
                        <td
                          colSpan={totalColCount}
                          className={cn(
                            "border-border border-b p-0",
                            isSelected && "border-accent/20",
                          )}
                        >
                          {/* Wrapper animates max-height + opacity */}
                          <div
                            className={cn(
                              "overflow-hidden",
                              "transition-[max-height,opacity] duration-[var(--dur-med)] ease-[var(--ease-snap)]",
                              isExpanded ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0",
                            )}
                          >
                            <div
                              className={cn(
                                "bg-bg-subtle py-3.5 pr-4",
                                /* left padding: 12px(checkbox) + 32px(expander) + 8px = ~52px */
                                selectable ? "pl-[52px]" : "pl-[44px]",
                              )}
                            >
                              {renderExpanded !== undefined ? renderExpanded(row) : null}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Pagination footer                                                */}
      {/* --------------------------------------------------------------- */}
      {(totalPages > 1 || pageSizeOptions.length > 1) && (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3",
            "border-border bg-surface-raised rounded-b-lg border border-t-0 px-4 py-2.5",
          )}
        >
          {/* Rows per page */}
          <div className="text-fg-muted flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase">
            Rows per page
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className={cn(
                "border-border bg-bg rounded border px-1.5 py-0.5",
                "text-fg text-[10px] uppercase",
                "focus:outline-none",
                "hover:border-border-strong transition-colors",
              )}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Page buttons */}
          <div className="flex items-center gap-0.5">
            <PageButton
              onClick={() => setPage(1)}
              disabled={safeCurrentPage === 1}
              aria-label="First page"
            >
              «
            </PageButton>
            <PageButton
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </PageButton>

            {getPageRange(safeCurrentPage, totalPages).map((p, i) =>
              p === "ellipsis" ? (
                <span
                  key={`ellipsis-${i}`}
                  className="text-fg-subtle px-1.5 text-[11px]"
                  aria-hidden="true"
                >
                  ···
                </span>
              ) : (
                <PageButton
                  key={p}
                  onClick={() => setPage(p as number)}
                  active={p === safeCurrentPage}
                  aria-label={`Page ${p}`}
                  aria-current={p === safeCurrentPage ? "page" : undefined}
                >
                  {p}
                </PageButton>
              ),
            )}

            <PageButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </PageButton>
            <PageButton
              onClick={() => setPage(totalPages)}
              disabled={safeCurrentPage === totalPages}
              aria-label="Last page"
            >
              »
            </PageButton>
          </div>

          {/* Row count */}
          <span className="text-fg-muted text-[10px] tracking-[0.14em] uppercase">
            {(safeCurrentPage - 1) * pageSize + 1}–
            {Math.min(safeCurrentPage * pageSize, totalFiltered)} of {totalRows ?? totalFiltered}{" "}
            {rowNoun}
          </span>
        </div>
      )}
    </div>
  );
}
