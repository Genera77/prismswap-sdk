# PrismSwap SDK

Public developer-integration repository for PrismSwap. This repository is a prerelease extraction from the private PrismSwap application and is **not** evidence of general production availability.

## What integration enables

The public `/v1` surface and `@prismswap/escrow-sdk` expose typed trade creation/read flows, construction-context retrieval, idempotent candidate submission, Oracle-verification polling, signed webhook verification/replay protection, basket validation/commitment helpers, and current `trade_session` entitlement/durable-delivery planning.

PrismSwap provides authoritative trade state through its API and Oracle-backed service. RPC confirmation alone is not lifecycle completion. SDK and MCP code never hold private keys, never sign automatically, and never automatically resend transactions. Wallet approval remains explicit at the host-wallet boundary.

## Packages and interfaces

- `@prismswap/escrow-sdk` — prerelease source included; **not published to npm**.
- Public `/v1` OpenAPI contract — `openapi/trade-v2-v1.openapi.json`.
- Signed webhooks — verification and replay-protection helpers plus receiver example.
- `@prismswap/trade-v2-mcp` — private/unpublished session-only MCP adapter; never signs.
- `@prismswap/escrow-ui` — extraction **deferred** because the private source controller still imports a large legacy atomic ABI/builder surface that is outside this safe extraction pass.
- Escrow UI reference app — deferred with the UI package; no hosted widget exists in this repository.

## Supported asset surface

Current public capability metadata represents SOL plus up to **8 non-SOL assets per side** using Metaplex Core, pNFT, compressed NFT/cNFT, classic SPL unit-principal collectible compatibility, and supported extension-free Token-2022 unit-principal compatibility. SPL/Token-2022 session legs are collectible compatibility surfaces, not arbitrary fungible-token basket trading.

## Five-minute start

```ts
import { TradeV2Client, createTradeV2FetchTransport } from '@prismswap/escrow-sdk'

const client = new TradeV2Client(createTradeV2FetchTransport({
  baseUrl: 'https://api.example.com',
}))

const auth = { integrationToken: 'PRISMSWAP_INTEGRATION_TOKEN' }
console.log(await client.getCapabilities(auth))
```

Mutating calls require an `Idempotency-Key` and, where required by the API, participant-wallet proof headers. A developer credential grants integration scope only; it does not grant wallet, Oracle, rollout, operator, or program authority.

## Lifecycle boundary

A typical external flow is: discover capabilities → create/read trade → retrieve construction context → explicitly inspect/approve a host-wallet action → submit the already-known signature as a candidate → wait for a newer Oracle-backed `/v1` state → continue only from newly authorized actions. Atomic entitlement settlement and durable delivery are represented by the current `trade_session` model.

## Webhooks

Webhook receivers must verify the raw bytes, v1 HMAC signature, endpoint/integration identity, timestamp acceptance window, payload SHA-256, and replay IDs before parsing the event. Webhooks report authoritative state; they do not create state.

## Current status

Packages are prerelease and not published. Production API hostname, general developer onboarding/credentials, hosted docs/widget, sandbox, live two-wallet acceptance, and final release policy are deferred. See [publication status](docs/publication-status.md) and [compatibility](docs/compatibility.md).

## Documentation

- [Getting started](docs/getting-started.md)
- [Authentication](docs/authentication.md)
- [Trades and lifecycle](docs/trades-and-lifecycle.md)
- [Transaction safety](docs/transaction-safety.md)
- [Webhooks](docs/webhooks.md)
- [Embeddable UI status](docs/embeddable-ui.md)
- [MCP adapter](docs/mcp.md)
- [Compatibility](docs/compatibility.md)
- [Publication status](docs/publication-status.md)
- [Extraction/security audit](docs/extraction-audit.md)
