# Authentication

External integrations use a scoped bearer integration credential. Mutating participant actions additionally require exact participant-wallet authorization supplied by the host wallet boundary. The SDK never stores private keys or seed phrases and never signs automatically.

Never commit integration tokens, wallet-auth signatures, private RPC credentials, seed phrases, or private keys. Placeholder examples use `PRISMSWAP_INTEGRATION_TOKEN` and `WALLET_PUBLIC_KEY` only.
