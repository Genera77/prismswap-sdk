import assert from 'node:assert/strict'
import test from 'node:test'
import {
  TradeV2IdempotencyRegistry,
  assertSupportedTradeV2Assets,
  discoverTradeV2Capabilities,
  validateTradeAuthorityBasket,
} from '../dist/index.js'

test('capabilities expose current public session surface', () => {
  const value = discoverTradeV2Capabilities()
  assert.equal(value.apiFamily, 'v1')
  assert.equal(value.protocolVersion, 1)
  assert.equal(value.lifecycleObservationSchemaVersion, 2)
  assert.deepEqual(value.programVersions, [2])
  assert.deepEqual(value.executionStrategies, ['trade_session'])
  assert.equal(value.maxNonSolAssetsPerSide, 8)
  assert.equal(value.signsTransactions, false)
  assert.equal(value.automaticallyResendsTransactions, false)
  for (const rail of ['sol', 'spl', 'token2022', 'core', 'pnft', 'compressed_nft']) assert.ok(value.rails.includes(rail))
})

test('idempotency key is stable for canonical-equivalent payload and rejects drift', () => {
  const registry = new TradeV2IdempotencyRegistry()
  const first = registry.acquire('attempt', 'approve', { b: 2, a: 1 })
  const second = registry.acquire('attempt', 'approve', { a: 1, b: 2 })
  assert.equal(first, second)
  assert.throws(() => registry.acquire('attempt', 'approve', { a: 2, b: 2 }))
})

test('asset validation enforces ordered eight-per-side cap', () => {
  const assets = Array.from({ length: 9 }, (_, index) => ({ side: 'maker', index, kind: 'core', assetId: `asset-${index}` }))
  assert.throws(() => assertSupportedTradeV2Assets(assets), /8-per-side|index/)
})

test('session token legs are unit-principal only', () => {
  assert.throws(() => validateTradeAuthorityBasket({
    maker: '11111111111111111111111111111111',
    taker: 'SysvarRent111111111111111111111111111111111',
    assets: [
      { side: 'maker', index: 0, kind: 'spl', mint: '11111111111111111111111111111111', amount: '2' },
      { side: 'taker', index: 0, kind: 'core', assetId: 'asset-taker' },
    ],
    expiresAt: '2030-01-01T00:00:00.000Z',
  }), /exactly one token/)
})
