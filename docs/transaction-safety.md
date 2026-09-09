# Transaction safety

The public integration boundary is fail-closed:

- private keys and seed phrases are never accepted;
- wallet approval is explicit and host-controlled;
- the SDK/MCP adapter never signs or automatically resends;
- construction context must be current and Oracle-backed;
- omitted beneficiaries/accounts are not inferred;
- RPC confirmation alone is not lifecycle completion;
- cNFT release planning requires fresh proof handling;
- pNFT/Core/cNFT rail-specific accounts must be explained by authoritative construction context.

The private source's legacy atomic transaction encoder imports account layouts, discriminators, PDA derivation, signer/meta rules, and instruction encoding from a large private ABI module. That module is intentionally excluded in this extraction rather than being independently reimplemented.
