export const SDK_VERSION = '0.1.0' as const
export const TRADE_V2_PROTOCOL_VERSION = 1 as const
export const TRADE_V2_COMMITMENT_SCHEMA_VERSION = 1 as const
export const TRADE_V2_LIFECYCLE_OBSERVATION_SCHEMA_VERSION = 2 as const
export const TRADE_V2_SUPPORTED_PROGRAM_VERSIONS = [2] as const
export const TRADE_V2_STANDARD_RAILS = ['sol', 'spl', 'token2022'] as const
export const TRADE_V2_RAILS = [...TRADE_V2_STANDARD_RAILS, 'core', 'pnft', 'compressed_nft'] as const
export const TRADE_AUTHORITY_MAX_NON_SOL_ASSETS_PER_SIDE = 8 as const

export const TRADE_V2_INBOX_STATUSES = [
  'sent_unseen', 'sent_seen', 'awaiting_your_approval', 'awaiting_their_approval',
  'agreed_awaiting_escrow', 'escrow_submitted_verifying', 'closed_off_chain', 'expired',
  'awaiting_taker_acceptance', 'accepted_awaiting_funding', 'awaiting_maker_funding',
  'awaiting_taker_funding', 'partially_funded', 'fully_funded_ready_to_settle',
  'oracle_verifying', 'settlement_verifying', 'settled', 'cancel_in_progress',
  'cancelled', 'recovery_available', 'recovery_in_progress', 'recovered',
  'oracle_conflict', 'settlement_in_progress', 'expired_recovery_available',
  'recovery_required', 'escrow_initialized_awaiting_custody',
  'escrow_loaded_awaiting_counterparty',
] as const

export const TRADE_V2_INBOX_ACTIONS = [
  'approve', 'create_escrow', 'accept', 'fund', 'settle', 'cancel', 'recover',
  'withdraw', 'complete_exit', 'release', 'close_session', 'wait_for_oracle', 'none',
] as const

export const TRADE_V2_SUBMITTED_TRANSITIONS = [
  'authority_initialized', 'acceptance_recorded', 'maker_sol_funded',
  'maker_asset_funded', 'taker_sol_funded', 'taker_asset_funded',
  'settlement_completed', 'cancellation_initiated', 'recovery_initiated',
  'maker_sol_withdrawn', 'maker_asset_withdrawn', 'taker_sol_withdrawn',
  'taker_asset_withdrawn', 'exit_completed',
] as const

export type TradeV2StandardRail = typeof TRADE_V2_STANDARD_RAILS[number]
export type TradeV2Rail = typeof TRADE_V2_RAILS[number]
export type TradeV2InboxStatus = typeof TRADE_V2_INBOX_STATUSES[number]
export type TradeV2InboxAction = typeof TRADE_V2_INBOX_ACTIONS[number]
export type TradeV2SubmittedTransition = typeof TRADE_V2_SUBMITTED_TRANSITIONS[number]
export type ProposalSide = 'maker' | 'taker'
export type SolProposalAsset = { readonly side: ProposalSide; readonly index: 0; readonly kind: 'sol'; readonly lamports: string }
export type SplProposalAsset = { readonly side: ProposalSide; readonly index: number; readonly kind: 'spl'; readonly mint: string; readonly amount: string }
export type Token2022ProposalAsset = { readonly side: ProposalSide; readonly index: number; readonly kind: 'token2022'; readonly mint: string; readonly amount: string }
export type NftProposalAsset =
  | { readonly side: ProposalSide; readonly index: number; readonly kind: 'pnft'; readonly mint: string }
  | { readonly side: ProposalSide; readonly index: number; readonly kind: 'compressed_nft'; readonly assetId: string; readonly tree: string; readonly leafIndex: number }
  | { readonly side: ProposalSide; readonly index: number; readonly kind: 'core'; readonly assetId: string }
export type ProposalAsset = SolProposalAsset | SplProposalAsset | Token2022ProposalAsset | NftProposalAsset
export type NonSolProposalAsset = Exclude<ProposalAsset, SolProposalAsset>

export function isTradeV2InboxStatus(value: unknown): value is TradeV2InboxStatus {
  return typeof value === 'string' && (TRADE_V2_INBOX_STATUSES as readonly string[]).includes(value)
}
export function isTradeV2InboxAction(value: unknown): value is TradeV2InboxAction {
  return typeof value === 'string' && (TRADE_V2_INBOX_ACTIONS as readonly string[]).includes(value)
}
export function isTradeV2SubmittedTransition(value: unknown): value is TradeV2SubmittedTransition {
  return typeof value === 'string' && (TRADE_V2_SUBMITTED_TRANSITIONS as readonly string[]).includes(value)
}
export function isTradeV2StandardRailAsset(value: Pick<ProposalAsset, 'kind'>): boolean {
  return (TRADE_V2_STANDARD_RAILS as readonly string[]).includes(value.kind)
}

export type TradeV2SdkCapabilities = {
  readonly sdkVersion: typeof SDK_VERSION
  readonly apiFamily: 'v1'
  readonly protocolVersion: typeof TRADE_V2_PROTOCOL_VERSION
  readonly lifecycleObservationSchemaVersion: typeof TRADE_V2_LIFECYCLE_OBSERVATION_SCHEMA_VERSION
  readonly programVersions: readonly number[]
  readonly rails: readonly TradeV2Rail[]
  readonly actions: readonly TradeV2InboxAction[]
  readonly authority: 'oracle_backed_server_status'
  readonly signsTransactions: false
  readonly automaticallyResendsTransactions: false
  readonly maxNonSolAssetsPerSide: 8
  readonly executionStrategies: readonly ['trade_session']
  readonly settlementModel: 'atomic_entitlement_durable_delivery'
}

export function discoverTradeV2Capabilities(): TradeV2SdkCapabilities {
  return {
    sdkVersion: SDK_VERSION,
    apiFamily: 'v1',
    protocolVersion: TRADE_V2_PROTOCOL_VERSION,
    lifecycleObservationSchemaVersion: TRADE_V2_LIFECYCLE_OBSERVATION_SCHEMA_VERSION,
    programVersions: [...TRADE_V2_SUPPORTED_PROGRAM_VERSIONS],
    rails: [...TRADE_V2_RAILS],
    actions: [...TRADE_V2_INBOX_ACTIONS],
    authority: 'oracle_backed_server_status',
    signsTransactions: false,
    automaticallyResendsTransactions: false,
    maxNonSolAssetsPerSide: TRADE_AUTHORITY_MAX_NON_SOL_ASSETS_PER_SIDE,
    executionStrategies: ['trade_session'],
    settlementModel: 'atomic_entitlement_durable_delivery',
  }
}
