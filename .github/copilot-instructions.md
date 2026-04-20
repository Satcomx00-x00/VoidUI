# VoidUI — Agent Instructions

> This file defines the code quality standards, design principles, and architectural guidelines
> that any AI agent (or human contributor) must follow when working on VoidUI.

---

## 1. Project Identity

**VoidUI** is a Next.js UI component library inspired by **Nothing Brand** (Nothing Phone).
The visual language is minimalist, dark-first, monochromatic with a signature red accent,
and driven by precise micro-animations.

---

## 2. Design Principles

| #   | Principle                      | Detail                                                                                                                                                           |
| --- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Dark-first**                 | The default theme is a true dark theme (`#0a0a0a`). Light mode is not a priority and should never compromise the dark experience.                                |
| 2   | **Nothing-inspired palette**   | Neutral greys (`void-*` scale) with Nothing's signature red (`#d71921`) as the sole accent color. Avoid introducing additional hues unless explicitly requested. |
| 3   | **Minimalism over decoration** | No gradients, no shadows beyond functional elevation, no ornamental borders. Every pixel must earn its place.                                                    |
| 4   | **Micro-animations**           | Subtle, short-duration animations (120–500 ms). Use exponential and spring easing curves. Animations must never block interaction or feel sluggish.              |
| 5   | **Accessibility**              | All interactive components must include proper ARIA attributes, keyboard navigation, and focus-visible outlines.                                                 |

---

## 3. TypeScript Standards

- **Strict mode** is mandatory — `strict: true` in `tsconfig.json`.
- Enable `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- Prefer explicit return types on exported functions and components.
- Use `interface` for public API shapes; use `type` for unions, intersections, and utility types.
- Never use `any`. Prefer `unknown` when the type is truly unresolvable and narrow immediately.
- Use `as const` satisfies for variant maps instead of enums.

---

## 4. Component Authoring Guidelines

1. **`forwardRef` by default** — Every UI primitive must forward its `ref` so consumers can access the underlying DOM node.
2. **Composable & un-opinionated** — Provide the building blocks; do not force layout or business logic.
3. **`className` merging** — Always accept a `className` prop and merge it via the `cn()` utility (`clsx` + `tailwind-merge`).
4. **Barrel exports** — Every component directory must have an `index.ts` re-exporting all public components and types.
5. **File naming** — Use `kebab-case` for file names (e.g., `toggle.tsx`, `card.tsx`).
6. **One component per file** — Unless the components are tightly coupled (e.g., `Card` + `CardHeader`).
7. **`"use client"` only when needed** — Only add the directive for components that use hooks or browser APIs.

---

## 5. Styling Guidelines

- **Tailwind CSS v4** with `@theme inline` design tokens in `globals.css`.
- Use **CSS custom properties** (`var(--color-*)`) for all token references inside `@theme inline`.
- Use semantic color names in components (e.g., `bg-surface`, `text-text-primary`), not raw hex values.
- Transitions use the `--duration-*` and `--ease-*` tokens.
- Avoid `@apply` — compose classes directly in JSX.
- Keep animation keyframes in `globals.css`; utility classes prefixed with `void-animate-*`.

---

## 6. File & Folder Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, metadata)
├── components/
│   └── ui/           # Core UI primitives (Button, Card, Input, etc.)
├── lib/              # Shared utilities (cn, helpers)
└── hooks/            # Custom React hooks (when needed)
```

- **No deeply nested folders** without clear purpose.
- Group by feature only when the project scales beyond foundational primitives.

---

## 7. Code Quality Tooling

| Tool                       | Purpose                                                                |
| -------------------------- | ---------------------------------------------------------------------- |
| **TypeScript**             | Static type safety (`strict` + additional checks)                      |
| **ESLint**                 | Code correctness (Next.js core-web-vitals + TypeScript rules)          |
| **Prettier**               | Consistent formatting (double quotes, trailing commas, 100 char width) |
| **eslint-config-prettier** | Disables ESLint rules that conflict with Prettier                      |

Run `npm run lint` (ESLint + Prettier check) before every commit.
Run `npm run typecheck` to verify type safety independently.

---

## 8. Commit & PR Guidelines

- Write concise, imperative commit messages: `add Button component`, `fix toggle a11y`.
- One logical change per commit.
- PRs should include a description of _what_ changed and _why_.

---

## 9. Do NOT

- ❌ Introduce colors outside the `void-*` / `nothing-red` palette without explicit approval.
- ❌ Use `any` or suppress TypeScript errors with `@ts-ignore` / `@ts-expect-error`.
- ❌ Add heavy runtime dependencies (animation libraries, CSS-in-JS runtimes). Prefer CSS transitions and keyframes.
- ❌ Break dark-first — never assume a light background.
- ❌ Add `console.log` statements to committed code.
- ❌ Skip accessibility (`aria-*`, `role`, keyboard support) on interactive components.
