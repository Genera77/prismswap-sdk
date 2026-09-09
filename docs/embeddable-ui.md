# Embeddable UI

`@prismswap/escrow-ui` is not extracted as a runnable package in this pass. The reviewed private-source controller still imports the excluded legacy atomic transaction builders and inspection path. Shipping it would either fail standalone compilation or require independently recreating the private ABI, both of which violate the extraction boundary.

The intended public UI boundary remains: explicit host wallet adapter, participant proof boundary, pre-approval transaction/action inspection, Oracle-pending presentation, per-leg funding/delivery state, cancellation/recovery, terminal/conflict diagnostics, theming, and webhook-triggered refresh. It must never accept private keys, sign automatically, resend automatically, infer completion from RPC, infer omitted beneficiaries/accounts, or import the private PrismSwap application.

A hosted widget is future work.
