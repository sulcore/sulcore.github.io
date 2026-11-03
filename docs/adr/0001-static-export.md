# 0001 — Static export, no runtime server

**Date:** 2026-10-29 · **Status:** Accepted

## Context
The site is presentation and contact. Nothing on it changes per visitor or needs a database.

## Decision
Use Next.js with `output: "export"`. Pages are rendered at build time into `out/`; client
components hydrate only where there is interaction.

## Consequences
- Hosting is free and simple (any static host), with no server to patch or monitor.
- Fast first load; pages are plain HTML.
- No API routes, no server actions, no image optimization at runtime (`images.unoptimized`).
- Anything needing a backend (live demo, storing form submissions) requires a new ADR.

## Alternatives considered
- **Server-rendered Next.js on a platform:** more capability than the site needs, plus cost
  and vendor coupling.
- **Plain HTML/CSS:** fewer dependencies, but no typed content, no components, and a worse
  showcase of the stack we use with clients.
