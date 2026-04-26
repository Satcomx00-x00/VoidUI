import { defineConfig } from "tsup";

/**
 * VoidUI — library bundler config.
 *
 * Builds the consumable npm package from `src/index.ts`.
 * The Next.js app under `src/app/` is excluded from the published bundle.
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
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
    // Copy the design-token stylesheet into the published bundle so consumers
    // can `import "voidui/styles.css"` from their app.
    const { copyFile } = await import("node:fs/promises");
    await copyFile("src/app/globals.css", "dist/styles.css");
  },
});
