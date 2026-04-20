"use client";

import {
  type InputHTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";
import { cn } from "@/lib/cn";

// ── Context ───────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}

// ── RadioGroup ────────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  /** Current selected value. */
  value: string;
  /** Callback when selection changes. */
  onValueChange: (value: string) => void;
  /** Shared name attribute for all child Radio inputs. */
  name?: string;
  className?: string;
  children: React.ReactNode;
}

/** Provides shared name/value context for a group of Radio buttons. */
export function RadioGroup({ value, onValueChange, name, className, children }: RadioGroupProps) {
  const generatedName = useId();
  return (
    <RadioGroupContext.Provider value={{ name: name ?? generatedName, value, onValueChange }}>
      <div role="radiogroup" className={cn("flex flex-col gap-2.5", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ── Radio ─────────────────────────────────────────────────────────────────────

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  /** The value this radio represents. */
  value: string;
  /** Optional label rendered beside the radio. */
  label?: string;
}

/**
 * A Nothing-style radio button.
 *
 * Must be used inside a `RadioGroup` for managed state, or used
 * standalone with `checked` + `onChange` like a native input.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, value, label, id: idProp, disabled, checked, ...props }, ref) => {
    const ctx = useRadioGroupContext();
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const isChecked = ctx ? ctx.value === value : checked;

    return (
      <span className="inline-flex items-center gap-2.5">
        <span className="relative flex size-4 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            value={value}
            name={ctx?.name}
            checked={isChecked}
            disabled={disabled}
            onChange={() => ctx?.onValueChange(value)}
            className={cn(
              "peer size-4 cursor-pointer appearance-none rounded-full",
              "border bg-void-950",
              "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
              "checked:border-accent",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "border-border hover:border-void-500",
              className,
            )}
            {...props}
          />
          {/* Dot — visible only when checked */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute size-1.5 rounded-full bg-accent",
              "scale-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
              "peer-checked:scale-100",
            )}
          />
        </span>

        {label && (
          <label
            htmlFor={id}
            className={cn(
              "select-none text-sm text-text-secondary",
              disabled && "opacity-40",
            )}
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);

Radio.displayName = "Radio";
