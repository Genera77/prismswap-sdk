# MCP adapter

`@prismswap/trade-v2-mcp` is private/unpublished in this repository. The extracted adapter is restricted to the current `trade_session` construction model and refuses historical atomic construction.

Available tool names include capability discovery, trade creation/read, authorized-action discovery, initialization/acceptance/funding/settlement/cancellation/recovery preparation, remaining-entitlement delivery preparation, known-signature candidate submission, Oracle-verification waiting, and conflict diagnostics.

The adapter never holds keys, signs, automatically resends, invokes a wallet without explicit human approval, exposes operator routes, or treats webhook/RPC evidence as completion.
