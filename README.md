# VoidUI

> A state-of-the-art Next.js UI library inspired by **Nothing Brand** — minimalist, dark-first, with fine micro-animations.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Apache_2.0-red)

---

## Design Philosophy

| Principle            | Description                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| **Dark-first**       | `#0a0a0a` void-black surfaces by default, with Nothing's signature red (`#d71921`) as accent |
| **Minimalist**       | Clean geometry, no decoration noise, functional whitespace                                   |
| **Micro-animations** | Subtle scale, fade, and slide transitions using exponential easing                           |
| **Type-safe**        | Strict TypeScript throughout — `noUncheckedIndexedAccess`, `noUnusedLocals`, and more        |

## Quick Start

```bash
# Install dependencies
bun install

# Start development server (Turbopack)
bun dev

# Type-check
bun typecheck

# Lint & format
bun lint
bun format
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── globals.css       # Design tokens, animations, resets
│   ├── layout.tsx        # Root layout (dark mode, fonts)
│   └── page.tsx          # Component showcase / demo page
├── components/
│   └── ui/               # Core UI primitives, organized by category
│       ├── typography/   # Text — polymorphic type system
│       ├── forms/        # Button, Input, Toggle
│       ├── data-display/ # Badge (soft / hard tone)
│       ├── layout/       # Card, Separator
│       ├── charts/       # HeatMap (contribution graph)
│       └── index.ts      # Barrel re-export
└── lib/
    ├── cn.ts             # Tailwind class merge utility (clsx + twMerge)
    └── index.ts          # Barrel export
```

## Design Tokens

All tokens live in `src/app/globals.css` under the `@theme inline` block. Key tokens:

- **Colors**: `void-black` through `void-white` neutral scale, `nothing-red` accent
- **Semantic colors**: `surface`, `surface-elevated`, `border`, `text-primary/secondary/muted`, `accent`
- **Animations**: `ease-out-expo`, `ease-spring`, and `duration-fast/normal/slow/slower`
- **Radii**: `radius-sm` through `radius-full`

## Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `bun dev`       | Start dev server with Turbopack |
| `bun run build` | Production build                |
| `bun typecheck` | TypeScript strict type check    |
| `bun lint`      | ESLint + Prettier check         |
| `bun lint:fix`  | Auto-fix lint + format          |
| `bun format`    | Format all files with Prettier  |

## License

[Apache License 2.0](./LICENSE)
