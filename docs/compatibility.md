# Compatibility

Current public constants: API family `/v1`; protocol version 1; lifecycle observation schema version 2; program version 2; execution strategy `trade_session`; settlement model `atomic_entitlement_durable_delivery`; maximum eight non-SOL assets per side.

Historical records may still identify an older atomic execution strategy in read models, but this repository does not expose the private legacy atomic instruction encoder for new construction.

Breaking public type/behavior changes will require an explicit release/version decision before npm publication. Until then all packages remain prerelease.
