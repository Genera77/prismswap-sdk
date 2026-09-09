# @prismswap/escrow-sdk

Prerelease TypeScript helpers for PrismSwap's public `/v1` integration surface. The package is present as reviewed source and is **not published to npm**.

Included in this extraction: capability discovery, typed API transport/client, contracts, idempotency, basket/session validation and commitment helpers, entitlement safety, Oracle-verification polling, and signed webhook verification/replay protection.

The package does not hold private keys, sign, automatically resend, or declare lifecycle completion from RPC. Current construction is `trade_session`; the legacy atomic instruction builder was deliberately excluded because it depends on a private ABI subsystem that is outside this safe extraction pass. See `../../docs/publication-status.md`.
