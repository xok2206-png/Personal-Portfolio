import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const digest = data => createHash('sha256').update(data).digest('hex')
const within = (base, name) => {
  const result = path.resolve(base, name)
  if (!result.startsWith(path.resolve(base) + path.sep)) throw new Error(`Unsafe sync path: ${name}`)
  return result
}

// Only explicitly assigned page folders are imported. Shared app files are merged by hand.
export function createPageSync(log = () => {}, workspaceRoot = root) {
  const root = path.resolve(workspaceRoot)
  const configFile = path.join(root, '.page-worktrees.local.json')
  const stateFile = path.join(root, '.page-sync/state.json')
  if (!fs.existsSync(configFile)) return null
  const { sources } = JSON.parse(fs.readFileSync(configFile, 'utf8'))
  let state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {}
  const cache = new Map(), warnings = new Set()
  const stamp = new Date().toISOString().replaceAll(':', '-')
  const warn = message => { if (!warnings.has(message)) { warnings.add(message); log(message) } }
  const collect = (base, relative, output) => {
    const absolute = within(base, relative)
    if (!fs.existsSync(absolute)) return
    const stat = fs.lstatSync(absolute)
    if (stat.isSymbolicLink()) throw new Error(`Symlinks are not imported: ${relative}`)
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(absolute)) collect(base, path.join(relative, name), output)
    } else if (stat.isFile()) output.push({ relative, absolute, stat })
  }
  return () => {
    const changed = [], pending = [], seen = new Set()
    for (const source of sources) {
      if (!fs.existsSync(source.root)) { warn(`[page-sync] Missing authoring folder: ${source.name}`); continue }
      const files = []
      for (const folder of source.paths) collect(source.root, folder, files)
      for (const { relative, absolute, stat } of files) {
        const name = relative.replaceAll('\\', '/')
        if (seen.has(name)) throw new Error(`Multiple page owners: ${name}`)
        seen.add(name)
        // Avoid reading large art sources on every tick; wait for an in-progress save to settle.
        if (Date.now() - stat.mtimeMs < 600) continue
        const key = `${stat.mtimeMs}:${stat.size}`
        const target = within(root, relative)
        const targetStat = fs.existsSync(target) ? fs.statSync(target) : null
        const targetKey = targetStat ? `${targetStat.mtimeMs}:${targetStat.size}` : 'missing'
        if (cache.get(name) === `${key}|${targetKey}`) continue
        const raw = fs.readFileSync(absolute)
        const incoming = /\.(jsx?|css|mjs)$/.test(name) ? Buffer.from(raw.toString('utf8').replace(/\s+$/, '\n')) : raw
        const incomingHash = digest(incoming)
        const existing = targetStat ? fs.readFileSync(target) : null
        const existingHash = existing ? digest(existing) : null
        if (existingHash === incomingHash) {
          state[name] = { owner: source.name, hash: incomingHash }
          cache.set(name, `${key}|${targetKey}`)
          continue
        }
        if (state[name] && existingHash !== state[name].hash) {
          warn(`[page-sync] Local edit preserved; merge required: ${name}`)
          continue
        }
        pending.push({ name, target, incoming, existing, incomingHash, owner: source.name })
      }
    }
    for (const file of pending) {
      if (file.existing) {
        const backup = within(root, path.join('.page-sync/backups', stamp, file.name))
        fs.mkdirSync(path.dirname(backup), { recursive: true })
        if (!fs.existsSync(backup)) fs.writeFileSync(backup, file.existing)
      }
      fs.mkdirSync(path.dirname(file.target), { recursive: true })
      const temp = `${file.target}.page-sync-tmp`
      fs.writeFileSync(temp, file.incoming)
      fs.renameSync(temp, file.target)
      state[file.name] = { owner: file.owner, hash: file.incomingHash }
      changed.push(file.name)
    }
    fs.mkdirSync(path.dirname(stateFile), { recursive: true })
    const serialized = JSON.stringify(state, null, 2) + '\n'
    if (!fs.existsSync(stateFile) || fs.readFileSync(stateFile, 'utf8') !== serialized) fs.writeFileSync(stateFile, serialized)
    if (changed.length) log(`[page-sync] Updated ${changed.length} page files: ${changed.filter(name => name.startsWith('src/')).join(', ')}`)
    return changed
  }
}

export function pageWorktreeSync() {
  let sync, timer
  return {
    name: 'local-page-worktree-sync',
    configResolved(config) {
      sync = createPageSync(message => config.logger.info(message))
      // Portable builds use the checked-in snapshot. The bridge is development-only.
      if (config.command === 'serve') sync?.()
    },
    configureServer(server) {
      if (!sync) return
      timer = setInterval(() => {
        try { sync() } catch (error) { server.config.logger.error(`[page-sync] ${error.message}`) }
      }, 1200)
      server.httpServer?.once('close', () => clearInterval(timer))
    },
    closeBundle() { clearInterval(timer) },
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createPageSync(message => process.stdout.write(message + '\n'))?.()
}
