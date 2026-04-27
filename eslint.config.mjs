import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";

/**
 * Flat ESLint config — wires Next.js + TypeScript rules directly from their
 * plugins instead of going through `eslint-config-next` via FlatCompat. The
 * compat path broke under strict ESM resolution because the subpath imports
 * (e.g. `eslint-config-next/core-web-vitals`) don't declare an exports map and
 * Node refuses to resolve them without an explicit `.js` extension.
 */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**", "next-env.d.ts"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...jsxA11y.configs.recommended.rules,
      // Wrapper primitives forward `children` via `{...rest}`, which the
      // static rule can't see. The rule still applies to direct usage.
      "jsx-a11y/heading-has-content": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  prettierConfig,
];

export default eslintConfig;
