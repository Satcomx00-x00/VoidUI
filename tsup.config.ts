import { defineConfig } from "tsup";

/**
 * VoidUI — library bundler config.
 *
 * - ESM-only (Next.js / modern bundlers).
 * - Multi-entry: each component file gets its own
 *   `dist/components/ui/<name>.js` so consumers can deep-import:
 *   `import { Button } from "@nextjs-voidui/voidui/button"`.
 * - `splitting: false` keeps each entry self-contained, which makes the
 *   `"use client"` directive injection in `onSuccess` reliable
 *   (no shared chunks).
 */
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/ui/*.tsx",
    "src/lib/index.ts",
    "src/hooks/index.ts",
    "src/styles/preset.ts",
  ],
  format: ["esm"],
  dts: {
    compilerOptions: {
      incremental: false,
      composite: false,
    },
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  splitting: false,
  target: "es2022",
  outDir: "dist",
  external: ["react", "react-dom"],
  async onSuccess() {
    const { copyFile, writeFile, readFile, readdir } = await import("node:fs/promises");
    const path = await import("node:path");

    /* ---- 1. Ship decoupled stylesheets ------------------------------- */
    await copyFile("src/styles/tokens.css", "dist/tokens.css");
    await copyFile("src/styles/components.css", "dist/components.css");
    await writeFile("dist/styles.css", '@import "./tokens.css";\n@import "./components.css";\n');

    /* ---- 2. Re-inject `"use client"` directives ---------------------- */
    // tsup/esbuild strip module-level directives during bundling. We
    // scan each source component, and if it starts with "use client",
    // we prepend it to the matching dist file. This keeps the package
    // RSC-compatible when consumers deep-import individual primitives.
    const srcDir = "src/components/ui";
    const outDir = "dist/components/ui";
    const files = await readdir(srcDir);
    const clientComponents = [];
    for (const file of files) {
      if (!file.endsWith(".tsx")) continue;
      const src = await readFile(path.join(srcDir, file), "utf8");
      const head = src.split("\n").slice(0, 3).join("\n");
      const needsClient = /^\s*["\u0027]use client["\u0027];?\s*$/m.test(head);
      if (!needsClient) continue;
      const outPath = path.join(outDir, file.replace(/\.tsx$/, ".js"));
      try {
        const out = await readFile(outPath, "utf8");
        if (!out.startsWith('"use client"')) {
          await writeFile(outPath, '"use client";\n' + out);
        }
        clientComponents.push(file.replace(/\.tsx$/, ""));
      } catch {
        /* skip if entry was tree-shaken away */
      }
    }

    /* ---- 3. Barrel: mark as client too -------------------------------- */
    // The barrel `dist/index.js` re-exports client + server primitives.
    // Mark it as a client boundary so consumers can simply
    // `import { Button } from "@nextjs-voidui/voidui"` from RSC trees.
    // For maximum tree-shaking, prefer deep imports.
    const barrel = "dist/index.js";
    try {
      const b = await readFile(barrel, "utf8");
      if (!b.startsWith('"use client"')) {
        await writeFile(barrel, '"use client";\n' + b);
      }
    } catch {
      /* noop */
    }
  },
});
