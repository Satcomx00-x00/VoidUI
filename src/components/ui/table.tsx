import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

import { cn } from "../../lib/cn";

/**
 * Bordered, monospace data table — wraps a native `<table>` with VoidUI styles.
 *
 * Compose with `<Thead>`, `<Tbody>`, `<Tr>`, `<Th>`, and `<Td>`.
 */
export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...rest }, ref) {
    return (
      <table ref={ref} className={cn("w-full border-collapse text-xs", className)} {...rest} />
    );
  },
);
Table.displayName = "Table";

export const Thead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function Thead({ className, ...rest }, ref) {
    return <thead ref={ref} className={className} {...rest} />;
  },
);
Thead.displayName = "Thead";

export const Tbody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function Tbody({ className, ...rest }, ref) {
    return <tbody ref={ref} className={className} {...rest} />;
  },
);
Tbody.displayName = "Tbody";

export const Tr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function Tr(
  { className, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      className={cn("hover:[&>td]:bg-bg-subtle transition-colors", className)}
      {...rest}
    />
  );
});
Tr.displayName = "Tr";

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Right-align with tabular numerals — typical for numeric columns. */
  numeric?: boolean;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th(
  { className, numeric = false, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      className={cn(
        "border-border-strong border-b px-3.5 py-2.5 align-middle select-none",
        "text-fg-muted text-[10px] font-medium tracking-[0.18em] uppercase",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    />
  );
});
Th.displayName = "Th";

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-align with tabular numerals — typical for numeric columns. */
  numeric?: boolean;
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { className, numeric = false, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn(
        "border-border border-b px-3.5 py-2.5 align-middle",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    />
  );
});
Td.displayName = "Td";

/* -------------------------------------------------------------------------- */
/*  TableContainer                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Horizontally-scrollable wrapper that enforces responsive overflow.
 * Always wrap `<Table>` in this when the column count may exceed the viewport.
 */
export const TableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TableContainer({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("border-border w-full overflow-x-auto rounded-lg border", className)}
        {...rest}
      />
    );
  },
);
TableContainer.displayName = "TableContainer";

/* -------------------------------------------------------------------------- */
/*  TableCaption                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Accessible `<caption>` element — placed as the first child of `<Table>`.
 * Visually rendered beneath the table (caption-side: bottom via Tailwind).
 */
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, ...rest }, ref) {
  return (
    <caption
      ref={ref}
      className={cn(
        "text-fg-subtle mt-3 caption-bottom text-[10px] tracking-[0.14em] uppercase",
        className,
      )}
      {...rest}
    />
  );
});
TableCaption.displayName = "TableCaption";

/* -------------------------------------------------------------------------- */
/*  Tfoot                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Table footer section — typically used for totals/summary rows.
 * Cells receive a slightly elevated background (`bg-surface-raised`)
 * and a top border that separates them from the body.
 */
export const Tfoot = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function Tfoot({ className, ...rest }, ref) {
    return (
      <tfoot
        ref={ref}
        className={cn(
          "[&>tr>td]:border-border-strong [&>tr>td]:border-t",
          "[&>tr>td]:bg-bg-subtle [&>tr>td]:font-medium",
          className,
        )}
        {...rest}
      />
    );
  },
);
Tfoot.displayName = "Tfoot";

/* -------------------------------------------------------------------------- */
/*  ThSortable                                                                 */
/* -------------------------------------------------------------------------- */

export type SortDir = "asc" | "desc" | "none";

export interface ThSortableProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Current sort direction for this column. */
  sortDir?: SortDir;
  /** Callback fired when the user clicks the column header. */
  onSort?: () => void;
  /** Right-align with tabular numerals — typical for numeric columns. */
  numeric?: boolean;
}

const SortIcon = ({ dir }: { dir: SortDir }): ReactNode => (
  <span
    aria-hidden="true"
    className={cn(
      "ml-1.5 inline-flex flex-col gap-[2px] transition-opacity duration-[var(--dur-fast)]",
      dir === "none" ? "opacity-30" : "opacity-100",
    )}
  >
    <svg width="7" height="5" viewBox="0 0 7 5" fill="currentColor">
      <path
        d="M3.5 0 L7 5 L0 5 Z"
        className={cn(
          "transition-colors duration-[var(--dur-fast)]",
          dir === "asc" ? "fill-accent" : "fill-current",
        )}
      />
    </svg>
    <svg width="7" height="5" viewBox="0 0 7 5" fill="currentColor">
      <path
        d="M3.5 5 L7 0 L0 0 Z"
        className={cn(
          "transition-colors duration-[var(--dur-fast)]",
          dir === "desc" ? "fill-accent" : "fill-current",
        )}
      />
    </svg>
  </span>
);

/**
 * Sortable table header cell.
 * Shows a dual-chevron sort indicator; the active direction is highlighted
 * with the accent colour. Toggle direction externally — this component is
 * intentionally uncontrolled for maximum composability.
 */
export const ThSortable = forwardRef<HTMLTableCellElement, ThSortableProps>(function ThSortable(
  { className, numeric = false, sortDir = "none", onSort, children, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      aria-sort={sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : "none"}
      onClick={onSort}
      className={cn(
        "border-border-strong border-b px-3.5 py-2.5 align-middle select-none",
        "text-fg-muted text-[10px] font-medium tracking-[0.18em] uppercase",
        "cursor-pointer transition-colors duration-[var(--dur-fast)]",
        "hover:text-fg",
        sortDir !== "none" && "text-fg",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    >
      <span className="inline-flex items-center">
        {children}
        <SortIcon dir={sortDir} />
      </span>
    </th>
  );
});
ThSortable.displayName = "ThSortable";

/* -------------------------------------------------------------------------- */
/*  TdPin                                                                      */
/* -------------------------------------------------------------------------- */

export interface TdPinProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Sticky side — pin the column to the left or right edge. */
  pin?: "left" | "right";
  /** Right-align with tabular numerals. */
  numeric?: boolean;
}

/**
 * Sticky-pinned data cell for frozen first/last columns.
 * The parent `<TableContainer>` adds the scroll context.
 */
export const TdPin = forwardRef<HTMLTableCellElement, TdPinProps>(function TdPin(
  { className, pin = "left", numeric = false, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn(
        "border-border border-b px-3.5 py-2.5 align-middle",
        "bg-surface-raised sticky z-[1]",
        pin === "left" && "border-border left-0 border-r",
        pin === "right" && "border-border right-0 border-l",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    />
  );
});
TdPin.displayName = "TdPin";

export interface ThPinProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Sticky side — pin the column to the left or right edge. */
  pin?: "left" | "right";
  /** Right-align with tabular numerals. */
  numeric?: boolean;
}

/**
 * Sticky-pinned header cell — companion to `<TdPin>`.
 */
export const ThPin = forwardRef<HTMLTableCellElement, ThPinProps>(function ThPin(
  { className, pin = "left", numeric = false, ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      className={cn(
        "border-border-strong border-b px-3.5 py-2.5 align-middle select-none",
        "text-fg-muted text-[10px] font-medium tracking-[0.18em] uppercase",
        "bg-surface-raised sticky z-[2]",
        pin === "left" && "border-border left-0 border-r",
        pin === "right" && "border-border right-0 border-l",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    />
  );
});
ThPin.displayName = "ThPin";

/* -------------------------------------------------------------------------- */
/*  TableEmpty                                                                 */
/* -------------------------------------------------------------------------- */

export interface TableEmptyProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Number of columns the empty state cell should span. Required for correct display. */
  colSpan: number;
  /** Optional icon or illustration rendered above the message. */
  icon?: ReactNode;
  /** Main message text. Defaults to "No data". */
  message?: string;
  /** Optional subtext beneath the message. */
  hint?: string;
}

/**
 * Empty state `<tr>` for zero-row tables.
 * Drop inside `<Tbody>` when your data array is empty.
 *
 * ```tsx
 * <Tbody>
 *   {rows.length === 0 ? (
 *     <TableEmpty colSpan={4} message="No deployments found" hint="Push a commit to trigger one." />
 *   ) : rows.map(…)}
 * </Tbody>
 * ```
 */
export const TableEmpty = forwardRef<HTMLTableRowElement, TableEmptyProps>(function TableEmpty(
  { colSpan, icon, message = "No data", hint, className, ...rest },
  ref,
) {
  return (
    <tr ref={ref} className={cn("pointer-events-none", className)} {...rest}>
      <td colSpan={colSpan} className="px-4 py-16 text-center align-middle">
        <div className="mx-auto flex flex-col items-center gap-2">
          {icon !== undefined && <span className="text-fg-subtle mb-1 block">{icon}</span>}
          <span className="text-fg text-[13px]">{message}</span>
          {hint !== undefined && (
            <span className="text-fg-subtle text-[11px] tracking-wide">{hint}</span>
          )}
        </div>
      </td>
    </tr>
  );
});
TableEmpty.displayName = "TableEmpty";

/* -------------------------------------------------------------------------- */
/*  TableToolbar                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Optional flex bar rendered above `<TableContainer>`.
 * Accepts any content — title text, search input, action buttons, etc.
 */
export const TableToolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TableToolbar({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn("mb-3 flex flex-wrap items-center justify-between gap-3", className)}
        {...rest}
      />
    );
  },
);
TableToolbar.displayName = "TableToolbar";
