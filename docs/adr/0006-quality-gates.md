# 0006 — Quality gates: lint, format, accessibility and Lighthouse budgets

**Date:** 2026-11-04 · **Status:** Accepted

## Context
Tests prove behavior (ADR-0005). They don't catch React anti-patterns, style drift, contrast
problems or a slow page. The site promises quality gates, so those need to block a pull
request too.

## Decision
- **ESLint** with `eslint-config-next` (core web vitals + TypeScript) and a few strict rules
  (`eqeqeq`, no stray `console`). It caught real issues on the first run: `setState` called
  synchronously inside effects in the demo console and the theme toggle. Both were rewritten
  with `useSyncExternalStore` (reduced-motion media query, `data-theme` attribute) instead of
  silencing the rule.
- **Prettier**, checked in CI (`format:check`).
- **Accessibility, WCAG 2.1 AA, with axe** inside the Playwright suite: every page, in **both
  themes**, on desktop and mobile. It found contrast failures Lighthouse's sampling missed,
  mostly in the light theme; colors were adjusted at the token level (light-theme text blue
  `#2766ad`, secondary gray `#5f5b54`, button color with ≥ 5:1 on white) rather than per element.
- **Lighthouse CI** on `/pt/`, `/en/` and the Nivela case, mobile profile, median of 3 runs:
  performance ≥ 0.85, accessibility = 1, best practices ≥ 0.95, SEO ≥ 0.95. Reports are
  uploaded to Lighthouse's temporary public storage and linked from the job log.

## Consequences
- A PR that drops contrast, breaks hooks rules, loses formatting or gets slower fails CI.
- TypeScript stays on 6.x until `typescript-eslint` supports 7 (Dependabot ignores the major).
- Lighthouse adds ~2 minutes to CI; it runs in parallel with the e2e job.
