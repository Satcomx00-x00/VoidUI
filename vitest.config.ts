import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/components/ui/**/*.tsx"],
      exclude: ["src/app/**", "src/__tests__/**"],
    },
  },
  resolve: {
    alias: {
      "../../lib/cn": "/workspaces/test/VoidUI/src/lib/cn.ts",
    },
  },
});
