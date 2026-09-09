# Contributing

This repository is a prerelease public-integration extraction. Changes must preserve the authority boundary: the API/Oracle-backed service supplies authoritative lifecycle state; wallet approval is explicit; client code never holds private keys, signs automatically, automatically resends, or treats RPC confirmation as lifecycle completion.

## Development

Requirements: Node.js 20.18 or newer and npm.

```sh
npm ci
npm run verify
```

`npm run verify` builds/typechecks the SDK and compiling examples, runs SDK/MCP tests, validates the OpenAPI surface, audits private imports and secret patterns, and checks package metadata/content boundaries.

Do not add production endpoints, credentials, wallet signatures, private RPC URLs, private monorepo imports, program source, server/Oracle/operator implementation, deployment code, or production-control material.

## Compatibility

The repository follows the compatibility policy in `docs/compatibility.md`. Until an explicit public release decision is made, package metadata remains private/prerelease and no contribution should add publishing or deployment automation.
