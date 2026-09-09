function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']'
  const record = value as Record<string, unknown>
  return '{' + Object.keys(record).sort().map((key) => JSON.stringify(key) + ':' + canonical(record[key])).join(',') + '}'
}
function randomId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  const bytes = new Uint8Array(16); globalThis.crypto?.getRandomValues?.(bytes)
  return [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('')
}
export class TradeV2IdempotencyRegistry {
  private readonly attempts = new Map<string, { readonly fingerprint: string; readonly key: string }>()
  acquire(logicalAttemptId: string, command: string, payload: unknown): string {
    const fingerprint = canonical({ command, payload }); const existing = this.attempts.get(logicalAttemptId)
    if (existing) { if (existing.fingerprint !== fingerprint) throw new Error('A Trade V2 idempotency attempt cannot be reused with a different command or payload'); return existing.key }
    const key = 'trade-v2:' + command + ':' + randomId(); this.attempts.set(logicalAttemptId, { fingerprint, key }); return key
  }
  complete(logicalAttemptId: string): void { this.attempts.delete(logicalAttemptId) }
}
