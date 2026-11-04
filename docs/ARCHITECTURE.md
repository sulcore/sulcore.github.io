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
| `Header`, `Footer`, `Logo`, `SectionHead`, `Architecture` | server | Pure markup. |

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
| `vitest run` | CI, deploy | broken demo/contact logic, languages out of sync, incomplete case |
| `next build` | CI, deploy | build errors |
| `scripts/verify-build.mjs` | CI, deploy | missing required page, broken internal link or asset, page without `hreflang`, missing contact section |
| `playwright test` | CI | JS error or 4xx on any page, horizontal scroll, broken theme, logo, demo, language switch or WhatsApp link — on desktop and mobile |

Deploy only publishes if its gates pass. Testing approach: [ADR-0005](adr/0005-testing-strategy.md).
