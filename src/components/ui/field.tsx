import { forwardRef, type HTMLAttributes, type LabelHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

/**
 * Form field wrapper. Stacks `<FieldLabel>`, the control, and `<FieldHint>`
 * with consistent spacing and an optional `error` state that propagates to
 * descendants via `data-error="true"`.
 */
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Marks the field as invalid (also flips hint colour). */
  error?: boolean;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { className, error = false, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-error={error || undefined}
      className={cn("group/field flex min-w-0 flex-col gap-1.5", className)}
      {...rest}
    />
  );
});
Field.displayName = "Field";

/**
 * Field label. Renders the small uppercase, wide-tracked caption used above
 * inputs. Pass `required` to render the accent-coloured asterisk on the right.
 */
export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Render the required indicator. */
  required?: boolean;
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { className, required = false, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-fg-muted flex justify-between text-[10px] tracking-[0.18em] uppercase",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {required ? (
        <span aria-hidden="true" className="text-accent">
          *
        </span>
      ) : null}
    </label>
  );
});
FieldLabel.displayName = "FieldLabel";

/**
 * Helper / error text shown below a field.
 * The colour follows the parent `<Field error>` state via `data-error`.
 */
export const FieldHint = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function FieldHint({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          "text-fg-subtle m-0 text-[10px] tracking-[0.1em]",
          "group-data-[error=true]/field:text-[oklch(60%_0.18_25)]",
          className,
        )}
        {...rest}
      />
    );
  },
);
FieldHint.displayName = "FieldHint";
