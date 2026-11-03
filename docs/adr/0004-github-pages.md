# 0004 — GitHub Pages with Actions and a configurable base path

**Date:** 2026-11-03 · **Status:** Accepted

## Context
We want free hosting and an open repository, so visitors who are developers can see the code
behind the site. We don't have a custom domain yet.

## Decision
- Host on **GitHub Pages**, published by a GitHub Actions workflow (not the legacy
  branch-based Pages build).
- The workflow gets the base path from `actions/configure-pages` and passes it as
  `PAGES_BASE_PATH`. `next.config.ts` and the `asset()` helper use it.
- The same `typecheck → build → verify-build` sequence runs in CI and in deploy.

## Consequences
- The site works at `sulcore.github.io/sulcore-site/`, at `sulcore.github.io/` after a repo
  rename, and on a custom domain later — without code changes.
- Pages requires a public repository on the free plan, so internal strategy documents live
  outside this repository.
- No preview deployments per pull request (Pages has one environment). CI still builds and
  verifies every PR.

## Alternatives considered
- **Vercel / Cloudflare Pages:** also free, with PR previews, but less aligned with "the code
  and the site live in the same open place".
