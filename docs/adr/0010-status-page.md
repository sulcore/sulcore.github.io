# 0010 — Public engineering status: signal only, from a public JSON

**Date:** 2026-11-10 · **Status:** Accepted

## Context
We want visitors to see that our products are under control: Nivela's CI and security analysis
passing, test coverage and uptime. Nivela's repository is private, so GitHub's native Actions badge
does not render for anonymous visitors — embedding its URL would show a broken image.

## Decision
- A workflow in Nivela's repository writes **only the signal** (passing/failing, coverage %) to a
  public gist, in shields.io's endpoint format. `/pt/status/` and `/en/status/` render
  `img.shields.io/endpoint?url=<that JSON>`. The gist's "raw" folder is `SITE.status.signal`.
- Uptime comes from an independent public status page (`SITE.status.uptime`), linked, not embedded.
- Empty configuration renders "being set up" and makes no third-party request.
- **Never shown:** logs, stack traces, job or machine names, IPs, environment variables or any
  infrastructure detail. Transparency is about the outcome, not the attack surface.

## Consequences
- The status page loads images from shields.io once configured (the only third-party request on
  the site); badges are cached for ~5 minutes.
- The signal reflects Nivela's production branch, not pull requests.
- `tests/unit/content.test.ts` keeps the signal list in sync with what the pipeline publishes.
