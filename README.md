<p>
  <strong>SulCore</strong> · software development<br>
  Custom software, properly engineered.
</p>

[![CI](https://github.com/sulcore/sulcore.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/sulcore/sulcore.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/sulcore/sulcore.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/sulcore/sulcore.github.io/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/sulcore/sulcore.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/sulcore/sulcore.github.io/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/sulcore/sulcore.github.io/badge)](https://scorecard.dev/viewer/?uri=github.com/sulcore/sulcore.github.io)
![Next.js](https://img.shields.io/badge/Next.js-16-062b52)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3b8be0)
![License](https://img.shields.io/badge/code-MIT-8dbbea)

**[sulcore.github.io](https://sulcore.github.io)** · [Leia em português](README.pt-BR.md)

This is the source of the SulCore website. We build management systems, integrations and
AI that works inside business processes — and we keep this repository open so you can see
how we work, not just read about it.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), fully static export |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS 4, design tokens in `@theme` |
| i18n | Route-based (`/pt/`, `/en/`), typed dictionaries |
| Hosting | GitHub Pages, deployed by GitHub Actions |
| Runtime JS | Only what interactive parts need: the demo console, video switcher, contact composer |

No server, no database, no tracking. The contact form builds a WhatsApp message in the
browser; nothing is sent anywhere until the visitor taps the button.

## Run it

```bash
nvm use            # Node 22 (see .nvmrc)
npm i -g npm@11    # the lockfile is npm 11 (see ADR-0005)
npm ci
npm run dev        # http://localhost:3000/pt/
```

```bash
npm run check      # typecheck + lint + format + unit tests + static build + output verification
npm run test:e2e   # Playwright on desktop and mobile, against out/
npm run preview    # serve the exported site from out/
```

## Layout

```
src/
  app/[locale]/            pages (home, cases/[slug]) rendered per language
  components/              UI building blocks
  content/
    dictionary.ts          all copy, PT and EN, one typed object per language
    cases.ts               case studies
    site.ts                contact, public URL, base path helper
  lib/                     pure logic (demo state machine, WhatsApp message, paths)
tests/unit/                Vitest: logic and content contract
tests/e2e/                 Playwright: real browser, desktop and mobile
scripts/verify-build.mjs   checks the exported site before every deploy
docs/                      architecture, content guide, deploy, decision records
```

## How changes ship

1. Branch, change, open a pull request.
2. **CI** runs typecheck, lint, format check, unit tests, build and `verify-build`; then, in
   parallel, end-to-end + WCAG 2.1 AA accessibility tests (desktop and mobile, both themes) and
   Lighthouse with minimum scores.
3. Merge to `main` → **Deploy** builds again with the Pages base path, verifies, publishes.

Every non-obvious technical choice is recorded in [`docs/adr/`](docs/adr/). The live numbers —
tests, Lighthouse scores, page weight, decisions — are on
**[sulcore.github.io/en/build](https://sulcore.github.io/en/build/)**, generated on every deploy.

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Editing content](docs/CONTENT.md)
- [Deploy and domain](docs/DEPLOY.md)
- [Architecture decision records](docs/adr/README.md)
- [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Changelog](CHANGELOG.md)

## License

Code is [MIT](LICENSE). The SulCore name and logo, the site copy, and the Nivela product
footage in `public/video/` are **not** covered by the license — see [NOTICE](NOTICE.md).

---

Made in Novo Hamburgo, southern Brazil · working with clients across Brazil and abroad.
