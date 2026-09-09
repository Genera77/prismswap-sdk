import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
const root = new URL('..', import.meta.url).pathname
const codeExt = new Set(['.ts','.tsx','.js','.mjs','.cjs','.json'])
const excludedDirs = new Set(['node_modules','dist','.git'])
const violations = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (excludedDirs.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) { await walk(full); continue }
    if (!codeExt.has(extname(entry.name))) continue
    const rel = relative(root, full)
    const text = await readFile(full, 'utf8')
    for (const pattern of [/@swapfun\//, /file:\.\.\/shared/, /from ['"][^'"]*server\//, /from ['"][^'"]*worker\//, /from ['"][^'"]*program\//]) {
      if (pattern.test(text)) violations.push(`${rel}: ${pattern}`)
    }
  }
}
await walk(root)
if (violations.length) throw new Error(`Private import audit failed:\n${violations.join('\n')}`)
console.log('PRIVATE_IMPORT_AUDIT_OK')
