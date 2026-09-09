export const TRADE_V2_USER_SAFE_ERRORS: Readonly<Record<string, string>> = {
  IDEMPOTENCY_REQUEST_IN_PROGRESS: 'That request is already being processed. Please wait for verification.',
  TRANSITION_VERIFICATION_PENDING: 'A transaction for this trade is already waiting for Oracle verification.',
  TRANSITION_NOT_AUTHORIZED: 'This action is no longer authorized. Refresh the trade.',
  TRANSITION_NOT_AVAILABLE: 'That step is no longer available. Refresh the trade.',
  ORACLE_CONFLICT: 'The Oracle found conflicting chain evidence. No transaction was prepared.',
  PROPOSAL_EXPIRED: 'This proposal has expired.',
  NOT_CURRENT_PROPOSAL: 'The proposal changed. Review the latest terms before continuing.',
  AUTHORITY_BINDING_MISMATCH: 'The canonical on-chain trade no longer matches these terms.',
  INTENT_CONTEXT_MISMATCH: 'The escrow intent no longer matches this trade.',
  CLUSTER_MISMATCH: 'The wallet is connected to the wrong Solana cluster.',
  PROGRAM_MISMATCH: 'The configured Trade Authority program does not match the server.',
  WALLET_SIGNATURE_REQUIRED: 'Authenticate with the participant wallet before continuing.',
  TRADE_V2_ACTION_DISABLED: 'Trade access or this rollout stage is paused. Safe recovery remains available when authorized.',
}
export class TradeV2ApiError extends Error {
  constructor(readonly code: string, readonly status: number, message: string, readonly retryable: boolean, readonly diagnosticId: string | null = null) {
    super(message); this.name = 'TradeV2ApiError'
  }
}
