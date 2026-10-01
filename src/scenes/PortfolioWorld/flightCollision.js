// Conservative island footprint plus the full wing span: altitude never bypasses it.
export const islandRadius = island => island.size * .28 + 4.2
export const islandDock = island => ({ x: island.x, y: island.y - 1.4, z: island.z + islandRadius(island) + 1 })
export function clearSegment(a, b, islands) {
  const dx = b.x - a.x, dz = b.z - a.z, length2 = dx * dx + dz * dz
  return islands.every(p => {
    const t = length2 ? Math.max(0, Math.min(1, ((p.x-a.x)*dx+(p.z-a.z)*dz)/length2)) : 0
    return Math.hypot(a.x+t*dx-p.x, a.z+t*dz-p.z) >= islandRadius(p) - 1e-6
  })
}
export function safeFlightPath(start, end, islands) {
  const nodes = [start, end]
  for (const p of islands) {
    const radius = islandRadius(p) / Math.cos(Math.PI / 16) + .3
    for (let i=0;i<16;i++) {
      const angle = i * Math.PI / 8
      const point = { x:p.x+Math.cos(angle)*radius, y:p.y-1.4, z:p.z+Math.sin(angle)*radius }
      if (clearSegment(point,point,islands)) nodes.push(point)
    }
  }
  const distances = nodes.map(()=>Infinity), previous = [], visited = new Set()
  distances[0]=0
  while (visited.size<nodes.length) {
    let current=-1
    for(let i=0;i<nodes.length;i++) if(!visited.has(i)&&(current<0||distances[i]<distances[current])) current=i
    if(current<0||!Number.isFinite(distances[current])) return null
    if(current===1) {
      const path=[]
      for(let i=1;i!==undefined;i=previous[i]) path.unshift(nodes[i])
      return path
    }
    visited.add(current)
    for(let i=0;i<nodes.length;i++) {
      if(visited.has(i)||!clearSegment(nodes[current],nodes[i],islands)) continue
      const distance=distances[current]+Math.hypot(nodes[i].x-nodes[current].x,nodes[i].z-nodes[current].z)
      if(distance<distances[i]) { distances[i]=distance;previous[i]=current }
    }
  }
  return null
}
export function moveOutsideIslands(position, dx, dz, islands) {
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.15))
  let hit=false
  for(let i=0;i<steps;i++) {
    const next={x:position.x+dx/steps,z:position.z+dz/steps}
    if(clearSegment(position,next,islands)) { position.x=next.x;position.z=next.z;continue }
    hit=true
    // Reject penetration and retain only a safe tangential slide.
    const p=islands.find(p=>!clearSegment(position,next,[p]))
    const length=Math.hypot(position.x-p.x,position.z-p.z)
    const nx=(position.x-p.x)/length,nz=(position.z-p.z)/length
    const inward=Math.min(0,dx/steps*nx+dz/steps*nz)
    const slide={x:position.x+dx/steps-inward*nx,z:position.z+dz/steps-inward*nz}
    if(clearSegment(position,slide,islands)) {position.x=slide.x;position.z=slide.z}
  }
  return hit
}
