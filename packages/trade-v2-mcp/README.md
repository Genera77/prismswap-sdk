# @prismswap/trade-v2-mcp

Private/unpublished prerelease MCP adapter for the PrismSwap public `/v1` API and current `trade_session` SDK helpers.

It exposes discovery, trade create/read, authorized-action inspection, unsigned session action planning, known-signature submission, Oracle verification polling, cancellation/recovery planning, claim-remaining planning, and safe conflict diagnostics. It never holds keys, signs, automatically resends, invokes a wallet without explicit human approval, exposes operator routes, or treats RPC/webhook evidence as completion.

Example stdio start after installation/build:

```sh
PRISMSWAP_API_URL=https://api.example.com \
PRISMSWAP_INTEGRATION_TOKEN=PRISMSWAP_INTEGRATION_TOKEN \
node packages/trade-v2-mcp/src/stdio.mjs
```

The package remains `private: true` and is not published.
