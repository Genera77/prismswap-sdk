import { TradeV2WebhookReplayGuard, verifyTradeV2Webhook } from '@prismswap/escrow-sdk'

const replayGuard = new TradeV2WebhookReplayGuard()

export async function receivePrismSwapWebhook(input: {
  payloadBytes: Uint8Array
  headers: Headers | Readonly<Record<string, string>>
  webhookSecret: string
  endpointId: string
  integrationId: string
}) {
  // Verify the exact raw body bytes before parsing or taking side effects.
  return verifyTradeV2Webhook({
    payloadBytes: input.payloadBytes,
    headers: input.headers,
    secrets: [input.webhookSecret],
    endpointId: input.endpointId,
    integrationId: input.integrationId,
    replayGuard,
  })
}
