# 0005 — Testing strategy: pure logic in unit tests, behavior in real browsers

**Date:** 2026-11-04 · **Status:** Accepted

## Context
The site says we ship behind test suites and quality gates. Until now the repository only had
`verify-build`, which checks the exported files but never runs the page.

## Decision
- **Logic lives outside components** (`src/lib/`): the console demo state machine, the WhatsApp
  message builder and path helpers are plain TypeScript. Components only wire them to React.
- **Unit tests (Vitest)** cover that logic and the content contract: both languages have the
  same structure and no empty strings, every case listed on the home exists, ready cases are
  complete, and the contact number is valid.
- **End-to-end tests (Playwright)** run against the exported `out/` folder — the same files
  GitHub Pages serves — on a desktop and a mobile profile: every page opens without JS errors
  or 4xx/5xx, has one `h1`, `lang` and `hreflang`, no horizontal scroll; plus language
  redirect and switch, theme persistence, logo scroll-to-top, the demo reaching its audited
  state, and the exact WhatsApp link the contact form opens.
- CI runs `typecheck → unit → build → verify` and then e2e on the built artifact. Deploy repeats
  the first four.

## Consequences
- A regression in any of those behaviors fails the pull request. (We checked: reintroducing the
  logo bug fails `logo › na home, volta ao topo`.)
- E2E adds about a minute to CI and needs a Chromium download.
- Visual regression (screenshot diffing) is deliberately out: fonts render differently across
  runners and it would be flaky.

## Note on npm
The lockfile is generated with **npm 11** (`packageManager` in `package.json`); npm 10 fails on
optional peer dependencies of the test tooling. CI installs npm 11 before `npm ci`.
