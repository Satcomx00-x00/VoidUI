# VoidUI

> A minimalist, dark-first Next.js UI component library inspired by **Nothing Brand**.

[![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## Philosophy

VoidUI is monochromatic, dark-first, and driven by precise micro-animations.
Neutral greys with a single signature accent (`#d71921`). No gradients, no
ornamental shadows — every pixel earns its place.

See [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) for the
full design and engineering charter.

## Stack

| Layer         | Choice                              |
| ------------- | ----------------------------------- |
| Framework     | Next.js 15 (App Router, Turbopack)  |
| Language      | TypeScript 5.7 (strict)             |
| Styling       | Tailwind CSS v4 (`@theme inline`)   |
| Lint / Format | ESLint 9 (flat config) + Prettier 3 |
| Class merging | `clsx` + `tailwind-merge`           |

## Project structure

```
src/
├── app/              # Next.js App Router (pages, layouts, metadata, globals.css)
├── components/
│   └── ui/           # Core UI primitives (Button, Card, Input, …)
├── lib/              # Shared utilities (cn, helpers)
└── hooks/            # Custom React hooks
```

## Scripts

| Command             | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the dev server (Turbopack)           |
| `npm run build`     | Production build                           |
| `npm run start`     | Run the production build                   |
| `npm run lint`      | ESLint + Prettier check                    |
| `npm run lint:fix`  | Auto-fix lint & formatting issues          |
| `npm run typecheck` | `tsc --noEmit` strict type-check           |
| `npm run check`     | typecheck + lint (run before every commit) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Consuming VoidUI in your app

VoidUI ships as a **bundled npm package** (`@nextjs-voidui/voidui`) — semver
upgrades, no copy-paste, no CLI required. (A future `voidui add` scaffolder is
on the roadmap, but the npm package is the canonical distribution today.)

### 1. Install

```bash
npm install @nextjs-voidui/voidui
```

### 2. Import the stylesheet (once)

In your root layout or `globals.css`:

```ts
// app/layout.tsx
import "@nextjs-voidui/voidui/styles.css";
```

Or pull tokens / components separately if you want to override layers:

```ts
import "@nextjs-voidui/voidui/tokens.css"; // design tokens only
import "@nextjs-voidui/voidui/components.css"; // base resets + keyframes
```

### 3. Mount the provider (once)

```tsx
// app/layout.tsx
import { VoidUIProvider } from "@nextjs-voidui/voidui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <VoidUIProvider>{children}</VoidUIProvider>
      </body>
    </html>
  );
}
```

### 4. Use components

```tsx
// Barrel import — convenient, marked "use client"
import { Button, Card } from "@nextjs-voidui/voidui";

// Deep import — best tree-shaking, only the primitive ships to the client
import { Button } from "@nextjs-voidui/voidui/button";
import { Card } from "@nextjs-voidui/voidui/card";
```

> RSC note: each client-only primitive carries its own `"use client"` directive.
> Deep imports keep server bundles minimal; the barrel is itself a client
> boundary for ergonomic single-line imports.

## Release & CI/CD

VoidUI ships through **Changesets** + **GitHub Actions** with **npm provenance**.
See [docs/RELEASING.md](./docs/RELEASING.md) for the full pipeline and where to
configure the `NPM_TOKEN` secret.

| Workflow                                           | Trigger              | Purpose                                              |
| -------------------------------------------------- | -------------------- | ---------------------------------------------------- |
| [ci.yml](./.github/workflows/ci.yml)               | PR + push to `main`  | Commitlint → lint → typecheck → build (Node 20 & 22) |
| [release.yml](./.github/workflows/release.yml)     | push to `main`       | Version PR & publish to npm with provenance          |
| [changelog.yml](./.github/workflows/changelog.yml) | push to `main` / tag | Generate CHANGELOG.md & release notes (git-cliff)    |
| [pages.yml](./.github/workflows/pages.yml)         | push to `main`       | Static export → deploy to GitHub Pages               |
| [codeql.yml](./.github/workflows/codeql.yml)       | PR + weekly schedule | Static security analysis                             |

```bash
npm run changeset    # describe a change before opening your PR
```

## License

MIT
