import type { TradeV2ApiAuth, TradeV2TradeRecord } from './contracts.js'
import type { TradeV2Client } from './api.js'
export type TradeV2WaitOptions = { readonly intervalMs?: number; readonly timeoutMs?: number; readonly signal?: AbortSignal }
export async function waitForTradeV2Verification(client: TradeV2Client, auth: TradeV2ApiAuth, tradeId: string, previousSequence: string | null, options: TradeV2WaitOptions = {}): Promise<TradeV2TradeRecord> {
  const intervalMs = options.intervalMs ?? 3_000; const deadline = Date.now() + (options.timeoutMs ?? 120_000)
  while (Date.now() < deadline) {
    if (options.signal?.aborted) throw new DOMException('Verification wait aborted', 'AbortError')
    const trade = await client.getTrade(auth, tradeId); const pending = trade.pendingCandidate && typeof trade.pendingCandidate === 'object'; const oracle = trade.oracle && typeof trade.oracle === 'object' ? trade.oracle as Record<string, unknown> : null; const sequence = oracle && typeof oracle.sequence === 'string' ? oracle.sequence : null
    if (!pending && (previousSequence === null || (sequence !== null && BigInt(sequence) > BigInt(previousSequence)))) return trade
    await new Promise<void>((resolve, reject) => { const timer = setTimeout(resolve, intervalMs); options.signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Verification wait aborted', 'AbortError')) }, { once: true }) })
  }
  throw new Error('Timed out waiting for authoritative Oracle verification')
}
