# Releasing VoidUI

VoidUI uses **[Changesets](https://github.com/changesets/changesets)** to manage
versions and **GitHub Actions** to publish to npm with **provenance**
(supply-chain attestation via Sigstore).

---

## TL;DR

```bash
# during development
npm run changeset           # describe your change → commits a markdown file
git add .changeset && git commit -m "feat: ..."
git push                    # PR → review → merge to main

# after merge to main:
# 1. The Release workflow opens a "Version Packages" PR.
# 2. Merging that PR triggers automatic publish to npm + GitHub Release.
```

You never run `npm publish` manually.

---

## One-time repository setup

### 1 — Create the npm token

1. Sign in at [npmjs.com](https://www.npmjs.com) → **Access Tokens** → **Generate New Token**.
2. Choose **Granular Access Token** (recommended over classic).
3. Configuration:
   - **Token name**: `voidui-ci`
   - **Expiration**: 90–365 days (rotate on schedule)
   - **Permissions**: **Read and write**
   - **Packages and scopes**: select the `voidui` package (or your scope)
   - **IP allowlist**: leave blank (GitHub Actions IPs vary)
4. Copy the token — you will see it only once.

### 2 — Store it as a GitHub Actions secret

> ⚠️ **Never commit tokens.** Never put them in `.env`, `package.json`, or any file in the repo.

1. Go to **`https://github.com/Satcomx00-x00/VoidUI/settings/secrets/actions`**
2. Click **New repository secret**
3. Name it exactly: **`NPM_TOKEN`**
4. Paste the token value → **Add secret**

The `release.yml` workflow reads it via `${{ secrets.NPM_TOKEN }}`.

### 3 — Allow GitHub Actions to open PRs

`Settings → Actions → General → Workflow permissions`:

- ✅ **Read and write permissions**
- ✅ **Allow GitHub Actions to create and approve pull requests**

This lets the Changesets bot open the "Version Packages" PR.

### 4 — (Optional) npm 2FA for automation

If your npm account requires 2FA, set the package's publish setting to
**"Authorization only"** (not "Authorization and writes") so automation tokens
work. Manage it under your package settings on npmjs.com.

---

## The release flow in detail

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Feature PR     │     │ "Version         │     │  Publish to npm     │
│  + .changeset/  │ ──▶ │  Packages" PR    │ ──▶ │  + GitHub Release   │
│  *.md file      │     │  (auto-opened)   │     │  + provenance       │
└─────────────────┘     └──────────────────┘     └─────────────────────┘
   merged to main          merged to main          triggered automatically
```

1. **Author a change** → `npm run changeset`, pick `patch`/`minor`/`major`,
   write the changelog summary. A file lands in [.changeset/](../.changeset/).
2. **Open a PR** → CI (`ci.yml`) runs lint, typecheck, build on Node 20 & 22.
3. **Merge to `main`** → `release.yml` runs:
   - If unreleased changesets exist → it opens/updates a **"Version Packages"** PR.
   - If a version PR was just merged (no pending changesets, version bumped)
     → it runs `npm run release` which builds and publishes to npm with
     provenance, then creates a GitHub Release with the changelog.

## npm provenance

`publishConfig.provenance` is set in [package.json](../package.json) and
the workflow has `id-token: write`. The published package shows a
**"Built and signed on GitHub Actions"** badge on npmjs.com and is verifiable
via `npm audit signatures`.

## Manual emergency publish (avoid unless necessary)

```bash
npm login
npm run build:lib
npm publish --provenance --access public
```

This skips Changesets — you must then manually bump the version and push a tag.

---

## Where keys live — quick reference

| Secret         | Where                                                                             | Used by                                         |
| -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
| `NPM_TOKEN`    | GitHub → repo Settings → Secrets and variables → Actions → **Repository secrets** | [release.yml](../.github/workflows/release.yml) |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions; no setup needed                                  | All workflows                                   |
