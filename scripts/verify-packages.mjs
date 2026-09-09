import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
const root = new URL('..', import.meta.url).pathname
for (const rel of ['packages/escrow-sdk/package.json','packages/trade-v2-mcp/package.json']) {
  const pkg = JSON.parse(await readFile(join(root, rel), 'utf8'))
  assert.equal(pkg.private, true, `${rel} must remain unpublished/private during prerelease extraction`)
  assert.ok(String(pkg.version).includes('prerelease'))
  const serialized = JSON.stringify(pkg)
  assert.ok(!serialized.includes('PUBLIC_REPOSITORY_URL_PENDING'))
  assert.ok(!serialized.includes('PUBLIC_ISSUE_TRACKER_URL_PENDING'))
  assert.ok(!serialized.includes('PUBLIC_DOCUMENTATION_URL_PENDING'))
}
const uiEntries = await readdir(join(root, 'packages/escrow-ui'))
assert.ok(!uiEntries.includes('package.json'), 'deferred UI must not masquerade as a publishable package')
console.log('PACKAGE_BOUNDARY_OK')
