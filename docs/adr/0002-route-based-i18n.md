# 0002 — Languages by route with typed dictionaries

**Date:** 2026-10-29 · **Status:** Accepted

## Context
The site sells in Brazil and abroad, so it ships in Portuguese and English. It is static
(ADR-0001), so language can't be negotiated on the server.

## Decision
- Each language is a route segment: `/pt/…`, `/en/…`, generated with `generateStaticParams`.
- `/` is a tiny static page that redirects to `pt/` or `en/` from `navigator.languages`.
- Copy lives in `src/content/dictionary.ts`. The English object is typed as the Portuguese
  object's type, so a missing translation is a compile error.
- Every page declares `hreflang` alternates; `verify-build` fails if one doesn't.

## Consequences
- Shareable, indexable URLs per language; no flash of the wrong language.
- No i18n library to maintain.
- Adding a language means one more dictionary and one more entry in `LOCALES`.
