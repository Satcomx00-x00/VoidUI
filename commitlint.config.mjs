/**
 * commitlint configuration — enforces Conventional Commits.
 * See https://www.conventionalcommits.org and https://commitlint.js.org.
 *
 * Aligned with the commit groups in `cliff.toml` so the changelog
 * generation always finds matching types.
 */
export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => /^Signed-off-by: dependabot\[bot\]/m.test(message)],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "docs",
        "style",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["upper-case", "pascal-case", "start-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};
