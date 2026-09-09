import type { ProposalAsset, TradeV2InboxAction, TradeV2InboxStatus, TradeV2SubmittedTransition } from './protocol.js'

export type TradeV2ParticipantIdentities = { readonly maker: string; readonly taker: string }
export type TradeV2InboxRow = {
  readonly key: string; readonly tradeId: string | null; readonly proposalId: string | null; readonly escrowPda: string | null
  readonly direction: 'to_me' | 'by_me'; readonly status: TradeV2InboxStatus; readonly authoritativeStatus: TradeV2InboxStatus
  readonly action: TradeV2InboxAction; readonly actions: readonly TradeV2InboxAction[]; readonly active: boolean; readonly history: boolean
  readonly unread: boolean; readonly authority: 'off_chain' | 'oracle'; readonly standardRailSupported: boolean
  readonly pendingSubmission: { readonly id: string; readonly expectedTransition: TradeV2SubmittedTransition; readonly createdAt: string } | null
  readonly participants: TradeV2ParticipantIdentities
  readonly proposal: { readonly assets: readonly ProposalAsset[]; readonly expiresAt: string; readonly tradeCommitment: string } | null
  readonly v2Beta?: { readonly beta: true; readonly eligible: boolean; readonly disabledReasons: readonly string[]; readonly diagnosticIds: readonly string[] }
}
export type TradeV2ConstructionContext = {
  readonly schemaVersion?: 'v1'; readonly tradeId: string; readonly proposalId: string; readonly cluster: string; readonly programId: string
  readonly maker: string; readonly taker: string; readonly status: 'open' | 'closed'
  readonly proposal: { readonly tradeCommitment: string; readonly termsHash: string; readonly assets: readonly ProposalAsset[]; readonly makerSolLamports: string; readonly takerSolLamports: string; readonly expiresAt: string; readonly standardRailSupported: boolean }
  readonly executionStrategy?: 'trade_v2_atomic' | 'trade_session'
  readonly orderedTerms?: { readonly maker: readonly ProposalAsset[]; readonly taker: readonly ProposalAsset[]; readonly makerSolLamports: string; readonly takerSolLamports: string; readonly expiresAt?: string | null }
  readonly perLegProgress?: readonly { readonly side: 'maker' | 'taker'; readonly index: number; readonly kind: Exclude<ProposalAsset['kind'], 'sol'>; readonly mint: string | null; readonly assetId?: string | null; readonly tree?: string | null; readonly leafIndex?: number | null; readonly amount: string; readonly tokenProgram?: string | null; readonly state: 'required' | 'deposited' | 'released' | 'withdrawn' | 'unknown' | 'conflict'; readonly beneficiary: string; readonly entitlementState?: 'NOT_SETTLED' | 'ENTITLED_PENDING_DELIVERY' | 'DELIVERED'; readonly custodyAccount?: string | null; readonly oracleSequence?: string | null; readonly observedSlot?: string | null; readonly claimabilityDecision?: Readonly<Record<string, unknown>> | null }[]
  readonly railAccountExplanations?: readonly { readonly side: 'maker' | 'taker'; readonly index: number; readonly kind: Exclude<ProposalAsset['kind'], 'sol'>; readonly identity: string; readonly accounts: readonly { readonly role: string; readonly address: string }[]; readonly complete: boolean; readonly proofFetchedAt?: string; readonly proofContextSlot?: string; readonly ruleSet?: string | null; readonly authorizationDataPresent?: boolean }[]
  readonly progress?: { readonly required: number; readonly funded: number; readonly released: number; readonly withdrawn: number }
  readonly basketLifecycle?: string; readonly basketSessionPda?: string | null; readonly productState?: 'READY_TO_SETTLE' | 'SETTLED_PENDING_DELIVERY' | 'DELIVERY_COMPLETE'; readonly manualClaimAvailable?: boolean
  readonly intent: { readonly id: string; readonly nonce: string; readonly expectedAuthorityPda: string | null; readonly expiresAt: string } | null
  readonly canonicalAccounts: { readonly authorityPda: string | null; readonly custodyPda: string | null; readonly executionPlanPda: string | null; readonly acceptancePda: string | null; readonly fundingPda: string | null; readonly terminalCompletionPda: string | null }
  readonly projection: Readonly<Record<string, unknown>> | null
  readonly pendingSubmission: { readonly id: string; readonly expectedTransition: TradeV2SubmittedTransition; readonly submitter: string; readonly signature: string; readonly submittedSlot: string | null; readonly createdAt: string } | null
  readonly inbox: TradeV2InboxRow; readonly requiredSigner?: string; readonly feePayer?: string; readonly beneficiaries?: TradeV2ParticipantIdentities
  readonly principal?: Readonly<Record<string, unknown>>; readonly mints?: readonly string[]; readonly tokenPrograms?: readonly string[]
  readonly constructionContextBinding?: Readonly<Record<string, unknown>>; readonly freshness?: Readonly<Record<string, unknown>>; readonly unsignedTransaction?: string | null
}
export type TradeV2TradeRecord = Readonly<Record<string, unknown>> & { readonly tradeId: string; readonly proposalId?: string | null; readonly status?: string; readonly authoritativeStatus?: string; readonly priorStatus?: string | null; readonly externalReference?: string | null; readonly diagnosticId?: string }
export type TradeV2CandidateSubmission = { readonly proposalId: string; readonly intentId?: string | null; readonly authorityPda: string; readonly cluster: string; readonly programId: string; readonly signature: string; readonly submittedSlot?: string; readonly expectedTransition: Exclude<TradeV2SubmittedTransition, 'authority_initialized'>; readonly replacesSubmissionId?: string }
export type TradeV2ApiAuth = { readonly integrationToken: string; readonly walletAddress?: string; readonly signMessage?: (message: Uint8Array) => Promise<Uint8Array> }
export type TradeV2CommandAuth = TradeV2ApiAuth & { readonly idempotencyKey: string }
