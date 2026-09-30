import { useEffect, useRef } from 'react'

// Same arc-length sampling as the original useSkillOrbit: even visual spacing,
// with the ellipse fitted to the visible viewport instead of the old floor stops.
function ellipseTable(rx, ry) {
  const points = [{ angle: -Math.PI / 2, length: 0 }]
  let length = 0, previous = { x: 0, y: -ry }
  for (let i = 1; i <= 360; i++) {
    const angle = -Math.PI / 2 + i * Math.PI * 2 / 360
    const point = { x: Math.cos(angle) * rx, y: Math.sin(angle) * ry }
    length += Math.hypot(point.x - previous.x, point.y - previous.y)
    points.push({ angle, length }); previous = point
  }
  return { points, length }
}
function angleAt(fraction, table) {
  const length = ((fraction % 1) + 1) % 1 * table.length
  let low = 0, high = table.points.length - 1
  while (high - low > 1) { const mid = (low + high) >> 1; if (table.points[mid].length < length) low = mid; else high = mid }
  const a = table.points[low], b = table.points[high]
  return a.angle + (b.angle - a.angle) * (length - a.length) / Math.max(.001, b.length - a.length)
}
export default function useCoreOrbit({ active, count, still, held, open, compact, core }) {
  const host = useRef(null), nodes = useRef([]), phase = useRef(0), paths = useRef([]), particles = useRef([])
  useEffect(() => {
    if (!active || !host.current || !core.current) return
    const hostNode = host.current, coreNode = core.current
    let frame, last = performance.now(), geometry
    const measure = () => {
      const parent = hostNode.getBoundingClientRect(), center = coreNode.getBoundingClientRect()
      const cx = center.x + center.width / 2 - parent.x, cy = center.y + center.height * .4 - parent.y
      const rx = compact ? Math.min(parent.width / 2 - 72, 180) : Math.min(320, cx - 80, parent.width - cx - 80)
      const ry = Math.max(48, Math.min(compact ? 190 : 225, cy - (parent.height < 600 ? 124 : 192), parent.height - cy - 112))
      geometry = { cx, cy, rx: Math.max(80, rx), ry, table: ellipseTable(Math.max(80, rx), ry) }
    }
    const draw = (now = performance.now()) => {
      const { cx, cy, rx, ry, table } = geometry
      nodes.current.forEach((node, index) => {
        if (!node) return
        const angle = angleAt(phase.current + index / count, table)
        const x = cx + Math.cos(angle) * rx, y = cy + Math.sin(angle) * ry
        node.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0)`
        node.style.zIndex = String(Math.round(50 + Math.sin(angle) * 10))
        const art = node.querySelector('.sc-orb-art')
        const endY = y - node.offsetHeight / 2 + art.offsetTop + art.offsetHeight * .5
        const midX = (cx + x) / 2, midY = (cy + endY) / 2 - 24
        paths.current[index]?.setAttribute('d', `M${cx} ${cy} Q${midX} ${midY} ${x} ${endY}`)
        const t = still ? .62 : ((now / 1450 - index * .11) % 1 + 1) % 1
        const u = 1 - t
        particles.current[index]?.setAttribute('cx', String(u*u*cx + 2*u*t*midX + t*t*x))
        particles.current[index]?.setAttribute('cy', String(u*u*cy + 2*u*t*midY + t*t*endY))
      })
    }
    const tick = now => {
      const delta = Math.min((now - last) / 1000, .05); last = now
      if (!still && !held && !open) phase.current += delta / 72
      draw(now)
      if (!still) frame = requestAnimationFrame(tick)
    }
    const resized = () => { measure(); draw() }
    const observer = new ResizeObserver(resized)
    observer.observe(hostNode); observer.observe(coreNode)
    measure(); draw()
    if (!still) frame = requestAnimationFrame(tick)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [active, count, still, held, open, compact, core])
  return { host, nodes, paths, particles }
}
