# AGENTS.md — sulcore.github.io

Rules for AI agents (Claude Code, Codex) working on this repository. Humans: see `CONTRIBUTING.md`.

## Read first

1. `CONTRIBUTING.md` — workflow and rules (branch from `main`, one thing per PR, both languages).
2. `docs/CONTENT.md` — where every text lives and **what must never be published** (this repo is public).
3. `docs/ARCHITECTURE.md` and `docs/adr/` — static export, i18n, testing and quality gates.

## Non-negotiable

- **Public repository and public site.** No IPs, internal hosts, CI machine names, credentials, tokens,
  personal e-mails or customer data — not in content, code, docs, commits or PR text. Product infrastructure
  belongs to the products' private repos/vault. `tests/unit/content.test.ts` enforces part of this.
- **No invented claims.** Numbers about Nivela or Repara must come from the real product and be rounded down;
  say in the PR where each number came from and when.
- **Copy changes go in both languages** (`src/content/dictionary.ts`, `src/content/cases.ts`).
- **Static only** (no API routes or server). A backend needs an ADR first.

## Validate before the PR

```bash
npm ci
npm run check      # typecheck + lint + format + unit tests + static build + output verification
npm run test:e2e   # Playwright desktop and mobile, includes accessibility checks
```

Report what you ran and the result; never claim a check you didn't run.
