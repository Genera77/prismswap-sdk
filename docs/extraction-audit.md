# Extraction and privacy audit

## Included public-safe source classes

- `/v1` typed API client/contracts and capability metadata
- idempotency helper
- asset/basket validation and deterministic basket commitment logic
- entitlement/claimability safety helpers required by `trade_session`
- Oracle-verification polling
- signed webhook verification/replay protection
- session-only MCP tool metadata and adapter
- source-derived public OpenAPI contract

## Private monorepo dependencies found

1. `@swapfun/shared/trade-authority-entitlement` in the basket SDK. Handling: copied only the deterministic entitlement/claimability helper required by the public basket surface, changed only its type import to the local public protocol types, and retained behavior.
2. `@swapfun/shared/trade-v2-abi` in the legacy `transactions.ts` builder. Handling: **excluded/deferred**. It is a large protocol/ABI subsystem containing PDA derivation, layouts, discriminators, signer/account-meta rules, and instruction encoding; it was not independently recreated.
3. `@prismswap/escrow-ui` source controller imports the excluded legacy builder/inspection surface. Handling: runnable UI extraction deferred; only public status/boundary documentation is included.

## Excluded source paths/classes

No file from the following private areas was copied: `program/**`; server implementation other than the public OpenAPI JSON contract; `worker/**`; migrations; `ops/**`; release-control/canary manifests; internal `AGENTS.md`/`CONTEXT.md`; operator/private runbooks; production environment/configuration; private database code; Oracle implementation; logs; incident reports; deployment code; production-control code; wallet proofs; private RPC URLs; tokens/credentials.

Additionally excluded from package extraction: private `packages/shared/src/trade-v2-abi.ts`, legacy SDK `transactions.ts`, legacy SDK `inspection.ts`, the current React UI source/controller/reference app that depends on those legacy builders, and private pilot material not mechanically separable from source-only assumptions.

## Source SHA

`14162c8e85f019209956e15c60ed2edc13d1bea8`

The historical `trade-v2-public-vectors.json` fixture was not copied because it contains legacy atomic instruction/PDA vectors and concrete key-shaped test identifiers tied to the excluded ABI surface. New public examples use placeholders only.
