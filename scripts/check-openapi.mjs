import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { discoverTradeV2Capabilities } from '../packages/escrow-sdk/dist/protocol.js'

const spec = JSON.parse(await readFile(new URL('../openapi/trade-v2-v1.openapi.json', import.meta.url), 'utf8'))
assert.equal(spec.openapi, '3.1.0')
assert.equal(spec.info.version, '2026-08-04')
assert.equal(spec.servers?.[0]?.url, '/v1')
const expected = [
  '/capabilities','/openapi.json','/trades','/trades/{tradeId}','/trades/{tradeId}/history',
  '/trades/{tradeId}/construction-context','/trades/{tradeId}/proposals',
  '/trades/{tradeId}/proposals/{proposalId}/seen','/trades/{tradeId}/proposals/{proposalId}/approve',
  '/trades/{tradeId}/escrow-intents','/escrow-intents/{intentId}/candidates','/trades/{tradeId}/candidates',
  '/webhook-endpoints','/webhook-endpoints/{endpointId}/verify','/webhook-endpoints/{endpointId}/pause',
  '/webhook-endpoints/{endpointId}/reactivate','/webhook-endpoints/{endpointId}/retire',
  '/webhook-endpoints/{endpointId}/rotate-secret','/webhook-endpoints/{endpointId}/deliveries',
  '/webhook-endpoints/{endpointId}/replays',
]
assert.deepEqual(Object.keys(spec.paths).sort(), expected.sort())
for (const path of Object.keys(spec.paths)) assert.ok(!/(operator|oracle|canary|rollout|cohort|emergency)/i.test(path), `private route leaked: ${path}`)
const capabilities = discoverTradeV2Capabilities()
assert.equal(capabilities.apiFamily, 'v1')
assert.deepEqual([...capabilities.rails].sort(), ['compressed_nft','core','pnft','sol','spl','token2022'].sort())
const apiRails = spec.components.schemas.PublicTrade.properties.supportedRails.items.enum
assert.deepEqual([...apiRails].sort(), [...capabilities.rails].sort())
console.log('OPENAPI_PUBLIC_CONTRACT_OK')
