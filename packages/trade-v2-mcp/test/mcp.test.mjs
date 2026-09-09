import assert from 'node:assert/strict'
import test from 'node:test'
import { BoundedMcpSessions, TradeV2McpAdapter } from '../src/adapter.mjs'

test('tool surface contains the agent-safe contract', () => {
  const sessions = new BoundedMcpSessions()
  sessions.put('default', 'placeholder-token')
  const adapter = new TradeV2McpAdapter({ sessions, clientFactory: () => ({}) })
  const names = adapter.listTools().map((tool) => tool.name)
  for (const name of ['escrow_get_capabilities','escrow_create_trade','escrow_get_trade','escrow_get_authorized_actions','escrow_prepare_initialization','escrow_prepare_acceptance','escrow_prepare_funding','escrow_prepare_settlement','escrow_prepare_claim_remaining','escrow_submit_signature','escrow_wait_for_verification','escrow_prepare_cancellation','escrow_prepare_recovery','escrow_get_conflict']) assert.ok(names.includes(name))
})

test('signing and automatic resend are forbidden', async () => {
  const sessions = new BoundedMcpSessions()
  sessions.put('default', 'placeholder-token')
  const adapter = new TradeV2McpAdapter({ sessions, clientFactory: () => ({}) })
  await assert.rejects(adapter.callTool('escrow_sign_transaction'), /forbidden/)
  await assert.rejects(adapter.callTool('escrow_resend_transaction'), /forbidden/)
})
