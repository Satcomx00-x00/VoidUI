---
"@nextjs-voidui/voidui": minor
---

Distribution & ergonomics overhaul

- **`Command` palette** now powered by [`cmdk`](https://cmdk.paco.me): fuzzy
  filtering, keyboard navigation, ARIA combobox semantics, empty-state, and
  separators ship out of the box. New exports: `CommandGroup`, `CommandEmpty`,
  `CommandSeparator`. The legacy `<CommandGroupLabel>` and `active` prop on
  `CommandItem` remain for back-compat, but new code should prefer the
  `<CommandGroup heading="…">` pattern.
- **Tailwind preset** — `import voidui from "@nextjs-voidui/voidui/tailwind"`
  exposes the design tokens (colors, radii, font families, durations,
  easings) for consumers who don't want to load `tokens.css`.
- **`tailwindcss` is now an optional peer** (`peerDependenciesMeta`).
  Required only when using the Tailwind preset.
- **Publish hardening** — `publint`, `@arethetypeswrong/cli`, and
  `size-limit` are wired as scripts (`check:publish`, `check:exports`,
  `size`) and run in CI. `prepublishOnly` runs `build:lib` + `publint`.
- **Accessibility lint** — `eslint-plugin-jsx-a11y` is enabled with the
  recommended ruleset.
