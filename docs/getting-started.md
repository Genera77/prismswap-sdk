# Getting started

Use Node.js 20.18 or newer. Packages are not yet published to npm, so examples in this repository resolve them through npm workspaces.

The public API family is `/v1`. Start with capability discovery and treat the returned API/Oracle state as authoritative. Do not infer lifecycle completion from an RPC signature.

```ts
import { TradeV2Client, createTradeV2FetchTransport } from '@prismswap/escrow-sdk'
const client = new TradeV2Client(createTradeV2FetchTransport({ baseUrl: 'https://api.example.com' }))
const auth = { integrationToken: 'PRISMSWAP_INTEGRATION_TOKEN' }
await client.getCapabilities(auth)
await client.listTrades(auth)
```
