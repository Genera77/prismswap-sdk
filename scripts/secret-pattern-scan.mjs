import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
const root = new URL('..', import.meta.url).pathname
const allowedExt = new Set(['.ts','.tsx','.js','.mjs','.cjs','.json','.md','.yml','.yaml','.example','.gitignore'])
const skip = new Set(['node_modules','dist','.git'])
const findings = []
const patterns = [
  ['private-key-pem', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['seed-phrase-label', /(?:seed phrase|mnemonic)\s*[:=]\s*[a-z]+(?:\s+[a-z]+){11,}/i],
  ['github-token', /gh[pousr]_[A-Za-z0-9]{30,}/],
  ['aws-access-key', /AKIA[0-9A-Z]{16}/],
  ['private-rpc-url', /https?:\/\/[^\s'"`]*(?:private-rpc|rpc\.internal|localhost:\d+\/.*token=)/i],
]
async function walk(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    if (skip.has(entry.name)) continue
    const full=join(dir,entry.name)
    if (entry.isDirectory()) { await walk(full); continue }
    if (!allowedExt.has(extname(entry.name)) && entry.name !== '.gitignore') continue
    const rel=relative(root,full); const text=await readFile(full,'utf8')
    for (const [label,re] of patterns) if (re.test(text)) findings.push(`${rel}: ${label}`)
  }
}
await walk(root)
if (findings.length) throw new Error(`Secret scan failed:\n${findings.join('\n')}`)
console.log('SECRET_PATTERN_SCAN_OK')
