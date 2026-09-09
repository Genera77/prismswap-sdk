# Signed webhooks

Verify webhook **raw bytes before JSON parsing**. v1 signs:

`version.eventId.deliveryId.timestamp.endpointId.integrationId.payloadSha256`

using HMAC-SHA256. Receivers verify endpoint/integration identity, timestamp within the default 300-second acceptance window, payload SHA-256, signature, and replay IDs. Retries keep the logical event ID and use a new delivery ID. Webhooks only deliver authoritative state.

See `examples/webhook-receiver`.
