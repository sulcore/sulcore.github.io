# 0008 — Supply-chain security for a static site

**Date:** 2026-11-04 · **Status:** Accepted

## Context
A static site has no server to attack, so the real surface is the pipeline: the actions that
run with write access to Pages, the npm packages that run at build time, and what gets merged
into `main`.

## Decision
- **Actions pinned by commit SHA**, with the tag in a comment (`@<sha> # v7.0.1`). A moved or
  compromised tag can't change what runs. Dependabot keeps the pins up to date.
- **Least privilege:** every workflow starts from `contents: read`; only the jobs that need it
  get `pages`, `id-token` or `security-events`. Checkout never persists credentials.
- **CodeQL** (`security-and-quality`) on TypeScript and on the workflow files themselves, on
  every PR, on `main` and weekly.
- **OpenSSF Scorecard** weekly and on `main`, published (badge in the README) and uploaded to
  code scanning.
- **Dependency review** on every PR: a new dependency with a high-severity advisory or a
  GPL/AGPL license fails the check.
- **`npm audit` in CI:** zero tolerance (moderate+) for packages that go into the build; high+
  for development tooling.
- **No third-party static server in tests:** `scripts/serve.mjs` (Node `http`, ~40 lines)
  replaced `serve`, which pulled a package with a high-severity advisory.
- `main` is protected by a repository ruleset (see `docs/DEPLOY.md`): changes only through
  pull requests with the CI checks green.

## Consequences
- More workflows to keep green, but each is small and single-purpose.
- SHA pins are unreadable on their own, hence the version comment on every line.
