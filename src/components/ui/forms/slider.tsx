import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * A Nothing-style range slider.
 *
 * Thin track, accent-colored fill via CSS custom property,
 * minimal rounded thumb with spring-like hover scale.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, disabled, ...props }, ref) => (
    <div className={cn("group relative flex w-full items-center", disabled && "opacity-40")}>
      <input
        ref={ref}
        type="range"
        disabled={disabled}
        className={cn(
          "void-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-void-800",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    </div>
  ),
);

Slider.displayName = "Slider";
