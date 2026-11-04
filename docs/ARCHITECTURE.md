# Architecture

## Shape

The site is a **Next.js App Router project exported to static HTML** (`output: "export"`).
`npm run build` writes everything to `out/`; GitHub Pages serves that folder as is.

```
request ─▶ GitHub Pages ─▶ out/<locale>/<page>/index.html
                              ├─ HTML rendered at build time (server components)
                              ├─ small client bundles: Console, VideoShowcase, ContactComposer
                              └─ /video/*.mp4, /favicon.svg
```

There is no runtime server. Anything that would need one (a live AI demo, form storage)
is out of scope until an ADR says otherwise — see [ADR-0003](adr/0003-scripted-demo.md).

## Routing and languages

| Path | Source |
|---|---|
| `/` | `public/index.html` — picks `pt/` or `en/` from the browser language |
| `/pt/`, `/en/` | `src/app/[locale]/page.tsx` |
| `/pt/cases/<slug>/` | `src/app/[locale]/cases/[slug]/page.tsx` |
| `/pt/og.png`, `/en/og.png` | `src/app/[locale]/og.png/route.tsx` — share image rendered at build |
| `/pt/build/`, `/en/build/` | `src/app/[locale]/build/page.tsx` — numbers from `scripts/metrics.mjs` ([ADR-0009](adr/0009-build-page.md)) |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |
| any missing path | `src/app/global-not-found.tsx` → `404.html`, bilingual |

`generateStaticParams` lists every locale and case, so each URL becomes a real file.
`[locale]/layout.tsx` is the root layout: it sets `<html lang>`, fonts, metadata and
`hreflang` alternates. Details in [ADR-0002](adr/0002-route-based-i18n.md).

## Content

All copy lives in `src/content/`, separate from components:

- `dictionary.ts` — one object per language. `Dict` is the type of the Portuguese object and
  the English object is declared as `Dict`, so the compiler enforces that both languages have
  the same keys.
- `cases.ts` — case studies. A case with `ready: false` renders a structured placeholder.
- `site.ts` — contact number, public URL, repository URL and the `asset()` helper.

## Base path

On GitHub Pages the site may live under a sub-path (`/sulcore-site/`) or at the root of a
custom domain. The deploy workflow reads the right value from `actions/configure-pages` and
passes it as `PAGES_BASE_PATH`:

- `next.config.ts` sets `basePath` from it, so every `<Link>` and Next asset is prefixed;
- `asset()` in `site.ts` prefixes paths Next doesn't touch (video, poster, favicon);
- `public/index.html` uses relative links, so it works at any depth.

Locally `PAGES_BASE_PATH` is empty and the site runs at the root. See
[ADR-0004](adr/0004-github-pages.md).

## Components

| Component | Kind | Notes |
|---|---|---|
| `Console` | client | Scripted demo state machine: typing → thinking → proposal → checks → confirm → done. Pauses off-screen, shows the final state under `prefers-reduced-motion`. |
| `VideoShowcase` | client | Real product footage, muted autoplay, poster first. |
| `ContactComposer` | client | Builds the WhatsApp message in the browser and opens `wa.me`. |
| `RevealObserver` | client | Adds `.is-in` to `.reveal` elements on scroll. Without JS, content is visible (the hiding rule is scoped to `html.js`). |
| `Header`, `Footer`, `Logo`, `ReparaMark`, `SectionHead`, `Architecture` | server | Pure markup. `ReparaMark` is the Repara wordmark: three dots for the job stages, the last one in amber (`--color-repara`). |

## Design tokens

Defined once in `src/app/globals.css` under `@theme` and used as Tailwind utilities
(`bg-paper`, `text-fg`, `bg-ink`, `text-blue`…). The dark theme is the default and is the
brand navy, like the dark version of the logo; light is opt-in.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `paper` | `#062b52` | `#f3f0ea` | page background |
| `fg` | `#eaf2fb` | `#062b52` | text on the page |
| `ink` | `#041c37` | `#062b52` | navy panels (console, case, contact, footer) |
| `cta` | `#2a6fc0` | `#062b52` | primary buttons |
| `blue` | `#4f9be8` | `#3b8be0` | brand accent |
| `mist` | `#eaf2fb` | `#eaf2fb` | text on navy panels |

The theme lives in `<html data-theme>`. A tiny inline script in `[locale]/layout.tsx` applies
the saved choice (`localStorage.theme`) before first paint, so there is no flash;
`ThemeToggle` switches it.

Fonts: Geist Sans and Geist Mono, self-hosted through the `geist` package.

## Quality gates

| Step | Where | What fails it |
|---|---|---|
| `tsc --noEmit` | CI, deploy | type errors, missing translation keys |
| `eslint .` | CI, deploy | React hooks misuse, Next.js and TypeScript rules |
| `prettier --check .` | CI | unformatted code |
| `vitest run` | CI, deploy | broken demo/contact logic, languages out of sync, incomplete case |
| `next build` | CI, deploy | build errors |
| `scripts/verify-build.mjs` | CI, deploy | missing required page, broken internal link or asset, page without `hreflang`, missing contact section |
| `playwright test` | CI | JS error or 4xx on any page, horizontal scroll, broken theme, logo, demo, language switch or WhatsApp link — on desktop and mobile |
| mobile layout (in Playwright) | CI | at 320, 360 and 390px on every page and the 404: horizontal scroll, element past the right edge, text spilling out of a link or button, touch target under 24×24px (WCAG 2.2), fixed-height button with its label on two lines |
| axe (in Playwright) | CI | any WCAG 2.1 AA violation, every page, both themes |
| Lighthouse CI | CI | performance < 0.85, accessibility < 1, best practices or SEO < 0.95 |

Deploy only publishes if its gates pass. Testing approach: [ADR-0005](adr/0005-testing-strategy.md); gates: [ADR-0006](adr/0006-quality-gates.md).
