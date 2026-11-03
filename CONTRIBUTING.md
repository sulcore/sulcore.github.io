# Contributing

This is a company website, so most changes come from the SulCore team. Issues pointing out
something broken are always welcome.

## Workflow

1. Create a branch from `main`: `feat/…`, `fix/…`, `content/…`, `docs/…`.
2. Keep each pull request about one thing.
3. Run `npm run check` before pushing. CI runs the same steps.
4. Fill in the pull request template.

## Rules

- **Copy changes go in both languages.** `src/content/dictionary.ts` is typed: the English
  object must have the same shape as the Portuguese one, so a missing key fails the typecheck.
- **No invented claims.** Numbers, clients and results on the site must be real and checkable.
- **Static only.** No API routes, no runtime server. If something needs a backend, write an
  ADR first (`docs/adr/`).
- **Accessibility is part of done:** keyboard focus visible, `prefers-reduced-motion`
  respected, no horizontal scroll at 360 px.
- New technical decisions get a short ADR.

## Commit messages

Imperative, short subject, optional prefix: `feat:`, `fix:`, `content:`, `docs:`, `ci:`.
