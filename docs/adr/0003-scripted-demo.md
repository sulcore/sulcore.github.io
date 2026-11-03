# 0003 — Scripted AI demo instead of a live model call

**Date:** 2026-10-29 · **Status:** Accepted

## Context
The hero shows the pattern we use to put AI into operations: the AI proposes, a person
confirms, the system executes. A live call to a model would be more impressive, but a public
endpoint can be abused and every call costs money.

## Decision
The console runs **scripted scenarios** (scheduling, finance, support) entirely in the
browser. It animates the real sequence — request, proposal built from data, server checks,
confirmation, audited execution — and says plainly that it is a demonstration.

## Consequences
- Zero running cost, no secrets, nothing to abuse.
- Works offline and under `prefers-reduced-motion` (final state shown).
- It can't answer free text.

## If we go live later
Required before enabling a real model call: invisible captcha, per-IP limits, a **global daily
spend ceiling** that falls back to the scripted mode, a small model with short outputs and a
cached fixed prompt, closed scope (only the demo scenarios), and a kill switch. That also
needs a backend, so it supersedes part of ADR-0001.
