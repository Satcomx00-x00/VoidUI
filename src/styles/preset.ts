/**
 * VoidUI — Tailwind preset.
 *
 * Mirrors the design tokens in `src/styles/tokens.css` 1:1. Values are
 * `var(--*)` references so the preset *requires* the tokens stylesheet
 * to be loaded — import either `@nextjs-voidui/voidui/styles.css`
 * (tokens + components) or `@nextjs-voidui/voidui/tokens.css` alone.
 *
 * Usage:
 *
 * ```ts
 * // tailwind.config.ts
 * import voidui from "@nextjs-voidui/voidui/tailwind";
 * export default { presets: [voidui], content: ["./src/**\/*.{ts,tsx}"] };
 * ```
 *
 * In your global stylesheet, also load the tokens via the package's
 * styles.css entry (see README for the import statement).
 *
 * Compatible with Tailwind v3 (preset) and Tailwind v4 (the same tokens
 * are also exposed via `@theme inline` directly in `tokens.css`).
 */

const preset = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ─ Semantic surfaces ───────────────────────────
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-muted": "var(--bg-muted)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",

        // ─ Foreground ──────────────────────────────
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",

        // ─ Borders ────────────────────────────────
        border: "var(--border)",
        "border-strong": "var(--border-strong)",

        // ─ Brand accent (Amethyst) ─────────────────
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        "accent-soft": "var(--accent-soft)",

        // ─ Amethyst single-hue scale ────────────────
        amethyst: {
          200: "var(--amethyst-200)",
          300: "var(--amethyst-300)",
          400: "var(--amethyst-400)",
          500: "var(--amethyst-500)",
          600: "var(--amethyst-600)",
          700: "var(--amethyst-700)",
          800: "var(--amethyst-800)",
        },

        // ─ Void neutral ramp (oklch, chroma 0) ───────────
        void: {
          "000": "var(--void-000)",
          "050": "var(--void-050)",
          100: "var(--void-100)",
          200: "var(--void-200)",
          300: "var(--void-300)",
          400: "var(--void-400)",
          500: "var(--void-500)",
          600: "var(--void-600)",
          700: "var(--void-700)",
          800: "var(--void-800)",
          900: "var(--void-900)",
          950: "var(--void-950)",
        },
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono, var(--font-mono-fallback))",
        dot: "var(--font-dot)",
        display: "var(--font-display, var(--font-dot-fallback))",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        hero: "var(--text-hero)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        wide: "var(--tracking-wide)",
        mega: "var(--tracking-mega)",
      },
      borderRadius: {
        none: "var(--radius-0)",
        xs: "var(--radius-1)",
        sm: "var(--radius-2)",
        md: "var(--radius-3)",
        pill: "var(--radius-pill)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        med: "var(--dur-med)",
      },
      transitionTimingFunction: {
        snap: "var(--ease-snap)",
      },
    },
  },
} as const;

export default preset;
