---
"@nextjs-voidui/voidui": minor
---

## VoidUI v0.1.0

### New Features

- **Radix UI primitives** — Switch, Tabs, and Tooltip now use Radix UI for accessible, unstyled primitives
- **cmdk integration** — Command palette component migrated to `cmdk` for improved keyboard navigation and accessibility
- **New Tailwind preset** — Exportable `voidui/tailwind` preset with full design token configuration
- **Button redesign** — Offset-shadow hover effect, `fg-fill` primary variant, `accent` variant, and `ButtonKbd` sub-component
- **Distribution overhaul** — Multi-entry ESM-only tsup build with proper `exports` map and CSS bundle splitting
- **VoidUIProvider** — Theme context provider for dark-first token injection
- **CVA variants** — Badge, Alert, Card, and Toast fully migrated to `class-variance-authority`

### Bug Fixes

- Resolve TypeScript strict-mode errors in Select component
- Fix Prettier `--write` vs `--check` in lint script
- Migrate CI workflows from npm to Bun (`oven-sh/setup-bun@v2`)
- Raise commitlint `body-max-line-length` to 300 characters
- Fix unused variable in test suite
