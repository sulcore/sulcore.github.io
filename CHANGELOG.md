# Changelog

## 2026-11-04 · quality gates

- ESLint (Next.js + TypeScript) and Prettier in CI; hooks issues fixed with `useSyncExternalStore`.
- WCAG 2.1 AA checks with axe on every page and both themes; contrast fixed at token level.
- Lighthouse CI with minimum scores. ADR-0006.

## 2026-11-04 · tests

- Unit tests (Vitest) for the demo state machine, the WhatsApp message and the content contract.
- End-to-end tests (Playwright) on desktop and mobile against the exported site; new CI job.
- Logic extracted to `src/lib/`; lockfile on npm 11. ADR-0005.

## 2026-11-04

- Dark theme (brand navy) is now the default, with a light/dark toggle in the header; the choice is remembered.
- "Why SulCore" section and team bios rewritten to talk about SulCore, not past employers; roles shown as "Developer".

## 2026-11-03

- Repository renamed to `sulcore/sulcore.github.io`; the site now lives at https://sulcore.github.io/.
- Dependencies updated (Next.js 16.4.3, React 19.3, Tailwind CSS 4.3, TypeScript 7) and GitHub Actions bumped to current majors.
- `@types/node` pinned to the Node 22 runtime; CI runs once per pull request.

- Repository opened to the public, with license, docs and decision records.
- Deploy to GitHub Pages through GitHub Actions; CI on every pull request.
- `verify-build` checks the exported site (required pages, internal links, `hreflang`).
- Base path support so the site works under `sulcore.github.io/<repo>/` or on its own domain.
- Footer link to this repository.

## 2026-10-29

- First version of the site, in Portuguese and English: home with the scripted
  "AI proposes, person confirms, system executes" console, services, Nivela case with real
  product footage and architecture, engineering process, cases, team and WhatsApp contact.
