# Trades and lifecycle

The public API family is `/v1`, protocol version 1, lifecycle-observation schema version 2, and supported program version 2. Current construction uses `trade_session` for new Trade Authority flows.

The canonical settlement model is: both baskets funded → atomic entitlement settlement at commit → permissionless/durable delivery of remaining assets → terminal close/recovery when authorized. Oracle-backed state determines what action is authorized next. Candidate submission and RPC confirmation do not advance authoritative lifecycle state.

The capability surface represents SOL and up to eight non-SOL assets per side across Core, pNFT, cNFT, classic SPL unit-principal collectible compatibility, and supported extension-free Token-2022 unit-principal compatibility. It does not advertise arbitrary fungible-token basket trading.
