import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createPageSync } from '../scripts/page-worktree-sync.mjs'

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-page-sync-'))
const target = path.join(fixture, 'target'), source = path.join(fixture, 'source')
fs.mkdirSync(target); fs.mkdirSync(source)
const write = (root, file, text) => {
  const name = path.join(root, file)
  fs.mkdirSync(path.dirname(name), { recursive: true }); fs.writeFileSync(name, text)
  fs.utimesSync(name, new Date(0), new Date(1000))
}
write(target, '.page-worktrees.local.json', JSON.stringify({ sources: [{ name: 'test', root: source, paths: ['page'] }] }))
write(target, 'page/a.js', 'old\n')
write(source, 'page/a.js', 'new\n\n')
const messages = [], sync = createPageSync(message => messages.push(message), target)
assert.equal(sync().length, 1)
assert.equal(fs.readFileSync(path.join(target, 'page/a.js'), 'utf8'), 'new\n')
assert.equal(sync().length, 0)
write(source, 'page/a.js', 'updated\n')
assert.equal(sync().length, 1)
write(target, 'page/a.js', 'local work\n')
write(source, 'page/a.js', 'new source version\n')
assert.equal(sync().length, 0)
assert.equal(fs.readFileSync(path.join(target, 'page/a.js'), 'utf8'), 'local work\n')
assert.ok(messages.some(message => message.includes('Local edit preserved')))
fs.unlinkSync(path.join(source, 'page/a.js'))
sync()
assert.ok(fs.existsSync(path.join(target, 'page/a.js')))
assert.ok(fs.readdirSync(path.join(target, '.page-sync/backups')).length)
console.log('PASS: initial import, repeat/no change, update, conflict preservation, recovery backup, source deletion preservation')
