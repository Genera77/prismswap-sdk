# Security policy

PrismSwap integration code handles transaction intent, participant authorization, and webhook authenticity. Treat all credentials and wallet authorization material as sensitive.

## Reporting a vulnerability

Use GitHub private vulnerability reporting for this repository. A public security email is not yet published; do not invent or guess one from project domains.

Do **not** include private keys, seed phrases, wallet-auth signatures, integration tokens, webhook secrets, private RPC credentials, production environment values, or other live credentials in an issue, pull request, test fixture, screenshot, or reproduction.

A report should contain the minimum safe reproduction, affected package/file/version, expected safety boundary, observed behavior, and whether the issue could alter signer, beneficiary, construction-context, webhook-authentication, or authoritative-state handling.

## Scope boundaries

This repository does not contain the Solana program, PrismSwap production application, server/Oracle/database implementation, deployment controls, production configuration, or operator credentials. Reports about those systems should not disclose their private implementation here.
