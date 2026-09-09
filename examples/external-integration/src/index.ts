import {
  TradeV2Client,
  TradeV2IdempotencyRegistry,
  createTradeV2FetchTransport,
  waitForTradeV2Verification,
  type ProposalAsset,
} from '@prismswap/escrow-sdk'

const API_BASE_URL = 'https://api.example.com'
const INTEGRATION_TOKEN = 'PRISMSWAP_INTEGRATION_TOKEN'
const WALLET_PUBLIC_KEY = 'WALLET_PUBLIC_KEY'

export function createClient() {
  return new TradeV2Client(createTradeV2FetchTransport({ baseUrl: API_BASE_URL }))
}

export async function discoverCapabilities() {
  return createClient().getCapabilities({ integrationToken: INTEGRATION_TOKEN })
}

export async function listAndReadTrade(tradeId: string) {
  const client = createClient()
  const auth = { integrationToken: INTEGRATION_TOKEN }
  return {
    list: await client.listTrades(auth, { limit: 10 }),
    trade: await client.getTrade(auth, tradeId),
  }
}

export async function createTradeWithExternalReference(taker: string, assets: readonly ProposalAsset[]) {
  const client = createClient()
  const idempotency = new TradeV2IdempotencyRegistry()
  const payload = { taker, assets, expiresAt: '2030-01-01T00:00:00.000Z', externalReference: 'ORDER_REFERENCE' }
  return client.createTrade({
    integrationToken: INTEGRATION_TOKEN,
    walletAddress: WALLET_PUBLIC_KEY,
    idempotencyKey: idempotency.acquire('create-trade', 'createTrade', payload),
  }, payload)
}

export async function getConstructionContext(tradeId: string) {
  return createClient().getConstructionContext({ integrationToken: INTEGRATION_TOKEN }, tradeId)
}

// Wallet construction/inspection remains explicit and is not fabricated by this
// prerelease extraction. After a host wallet has approved and submitted a
// canonical transaction, submit only the already-known signature candidate.
export async function submitKnownSignature(tradeId: string, candidate: Parameters<TradeV2Client['submitTransitionCandidate']>[2]) {
  return createClient().submitTransitionCandidate({
    integrationToken: INTEGRATION_TOKEN,
    walletAddress: WALLET_PUBLIC_KEY,
    idempotencyKey: 'known-signature-candidate-0001',
  }, tradeId, candidate)
}

export async function waitForOracle(tradeId: string, previousSequence: string | null) {
  const client = createClient()
  return waitForTradeV2Verification(client, { integrationToken: INTEGRATION_TOKEN }, tradeId, previousSequence)
}
