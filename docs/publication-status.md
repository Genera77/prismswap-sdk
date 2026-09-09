# Publication status

## Source provenance

This extraction is pinned to `Genera77/swapfun` PR #1173 at source commit:

`14162c8e85f019209956e15c60ed2edc13d1bea8`

The source repository was private. This public repository contains only reviewed public-integration material and standalone adaptations documented in `extraction-audit.md`.

## Current package status

| Surface | Status |
| --- | --- |
| `@prismswap/escrow-sdk` | source present, prerelease, private package metadata, not published |
| `/v1` OpenAPI | source-derived contract present, not a live endpoint guarantee |
| signed webhooks | SDK verification + receiver example present; production worker activation not included |
| `@prismswap/trade-v2-mcp` | source present, private/unpublished, session-only safety adapter |
| `@prismswap/escrow-ui` | deferred: source controller depends on excluded private legacy atomic ABI/builders |
| escrow UI reference | deferred with UI package |

Repository readiness does not prove live production acceptance or general developer credential availability.

## Deferred heavy lifting

- npm publication
- final semantic-version and release policy
- public production API hostname
- developer signup and integration-token provisioning
- developer dashboard
- hosted documentation website
- hosted widget
- production webhook worker activation
- sandbox/test environment
- generated SDKs for other languages
- mobile-native SDKs
- A2A or autonomous wallet delegation
- open-sourcing the Solana program
- external security audit of the extracted repository
- live two-wallet integration acceptance
- migration of the private legacy atomic ABI/instruction-builder dependency
- standalone React UI/controller extraction after the canonical session-v4 preparation surface is public-safe
- final branding, support, issue tracker policy, and public security contact

## Bootstrap note

Repository initialization may temporarily include a lockfile-only GitHub Actions workflow. It performs dependency resolution only, writes `package-lock.json`, and contains no publishing, deployment, wallet, RPC, validator, production API, or transaction step. It is removed after the lockfile is committed.
