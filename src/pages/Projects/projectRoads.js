// Traced against valley-roads-v3. Coordinates are image percentages;
// y is weighted by the plate aspect ratio for distances and road widths.
export const startPosition = { x: 71.5, y: 88 }
export const roads = [
  [[85,98],[80,94],[75.5,91],[71.5,88],[68,84],[67,80],[66,77],[66,74],[68,71],[68,69],[63,67],[58,64.5],[54,62.5],[49,61],[47,61],[46,60],[44,58.5],[42,57],[41,55],[42,53],[43,51],[39,49],[35,46],[31,43]],
  [[44,58.5],[40,60.5],[37,61.5],[34,61.8],[30,62.2],[27,62.5],[24,63]],
  [[54,62.5],[57,62]],
  [[43,51],[49,50],[55,48.5],[60,48],[63,46.5],[68,44],[73,42],[78,40],[80,38],[81,36],[80,34],[77,31],[78,29]],
  [[68,69],[71,67],[77,65],[82,63],[87,61],[90,59],[91.5,57],[91,55.5],[88.5,54],[86,52.5],[87,50]],
]
export const roadDistance = (a, b) => Math.hypot(a.x - b.x, (a.y - b.y) * 2 / 3)
export function roadWidth(point,segment=projectToRoad(point).segment) {
  const kind=segmentKinds[segment]
  if(kind===1)return 1.1
  if(kind===2)return 1.2
  if(kind===3)return .55+point.y*.019
  if(kind===4)return .8+point.y*.016
  return point.y<57 ? 1.35+Math.max(0,point.y-40)*.045 : .5+(point.y/100)**2*6
}
// A union of road strips and broad paved forecourts, measured at foot level.
// The graph is only for planning long trips; it no longer constrains walking.
export const roadSurfaces = [
  [[70,100],[100,100],[100,94],[93,89],[82,84],[75,81],[70,77],[70,74],[75,71],[67,68],[61,70],[58,73],[60,77],[62,80],[58,82],[51,84],[51,85],[56,88],[63,92]],
  [[20,60],[25,58.8],[30,59.5],[34,60.5],[36,62],[33,64.8],[29,65.5],[24,64.5],[20,63]],
  [[26.5,41.4],[29,40.5],[34,40.6],[35,42.7],[32,44.5],[28,43.9]],
  [[84,47.7],[88,47.4],[91,48],[90,50.6],[87,52.3],[84.5,51]],
  [[74,27.8],[77.3,25.5],[81,25.5],[80.5,29.5],[78,31.5],[75,30]],
]
const solidGround = [
  // Ground footprints, not canopy silhouettes. Keep space for the feet.
  [[47.3,56.6],[49,56.6],[49.1,59.3],[47.4,59.5]],
  [[35.3,64.4],[37.8,64.4],[38.3,68.9],[35.3,69]],
  // Include the aquarium's right wall and front corner, not just its roof.
  [[12,48],[24,51],[26,55],[27,58.5],[27.2,60.8],[24,61.3],[16,60.3]],
  [[25,34],[34,33],[41,35],[41,40.8],[34.5,41],[26,40.2]],
  [[68,18],[85,18],[85,26.8],[81,27],[81,25.4],[77.3,25.4],[75,27.3],[68,27]],
  [[49,54],[55,50],[61,52.5],[62.5,57],[62,60],[59,61],[57.5,60.2],[54.5,61],[51,60]],
  [[59,60.2],[67,60.2],[67,63.2],[61,64.2],[58,62.8]],
  // The station platform extends below the columns; stairs remain accessible.
  [[83,39],[97,39],[97,47.5],[91,49.3],[84,47.7]],
  [[45,77],[48,74.9],[54,74],[59,74.6],[60.5,77],[60.5,80.8],[55,82.2],[48,81.9]],
]
function insidePolygon(point,polygon) {
  let inside=false
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const [x,y]=polygon[i],[px,py]=polygon[j]
    if((y>point.y)!==(py>point.y) && point.x<(px-x)*(point.y-y)/(py-y)+x)inside=!inside
  }
  return inside
}
// Wall clearance uses body width, independently of the narrower road/foot probe.
// The former foot-only test allowed shoulders and the sprite to enter facades.
export function clearsBuildings(point) {
  const radius = .9 * (.48 + point.y / 150)
  return !solidGround.some(polygon => {
    if (insidePolygon(point,polygon)) return true
    return polygon.some(([x,y],i) => {
      const [nx,ny]=polygon[(i+1)%polygon.length]
      const dx=nx-x,dy=(ny-y)*2/3
      const px=point.x-x,py=(point.y-y)*2/3
      const t=Math.max(0,Math.min(1,(px*dx+py*dy)/(dx*dx+dy*dy||1)))
      return Math.hypot(px-dx*t,py-dy*t)<radius
    })
  })
}
export function roadTarget(point) {
  return isWalkable(point) ? { ...point } : null
}
const toPoint = ([x, y]) => ({ x, y })
const segments = roads.flatMap(path => path.slice(1).map((p, i) => [toPoint(path[i]), toPoint(p)]))
const segmentKinds = roads.flatMap((path,index)=>path.slice(1).map(()=>index))

export function projectToRoad(point) {
  let bestSquared = Infinity, bestX = 0, bestY = 0, bestSegment = 0
  for (let index = 0; index < segments.length; index++) {
    const [a,b] = segments[index]
    const dx = b.x-a.x, dy = (b.y-a.y)*2/3
    const t = Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.y-a.y)*2/3*dy)/(dx*dx+dy*dy)))
    const x = a.x+(b.x-a.x)*t, y = a.y+(b.y-a.y)*t
    const distanceSquared = (point.x-x)**2+((point.y-y)*2/3)**2
    if (distanceSquared < bestSquared) {
      bestSquared=distanceSquared;bestX=x;bestY=y;bestSegment=index
    }
  }
  return {point:{x:bestX,y:bestY},distance:Math.sqrt(bestSquared),segment:bestSegment}
}

export function constrainToTrail(point) {
  if (isWalkable(point)) return { ...point }
  return projectToRoad(point).point
}

function isGroundWalkable(point) {
  if(point.x<0 || point.x>99.5 || point.y<0 || point.y>99.5 || solidGround.some(polygon=>insidePolygon(point,polygon)))return false
  if(roadSurfaces.some(polygon=>insidePolygon(point,polygon)))return true
  const nearest=projectToRoad(point)
  return nearest.distance<=roadWidth(nearest.point,nearest.segment)
}

// A small footprint prevents the body straddling walls, tree trunks and verges.
export function isWalkable(point) {
  const radius = .38 * (.48 + point.y / 150)
  return clearsBuildings(point) && isGroundWalkable(point) && Array.from({length:8}, (_, i) => {
    const angle = i * Math.PI / 4
    return isGroundWalkable({x:point.x + Math.cos(angle)*radius, y:point.y + Math.sin(angle)*radius*1.5})
  }).every(Boolean)
}

export function roadLineClear(from,to) {
  const steps=Math.max(1,Math.ceil(roadDistance(from,to)/.12))
  for(let i=0;i<=steps;i++)if(!isWalkable({x:from.x+(to.x-from.x)*i/steps,y:from.y+(to.y-from.y)*i/steps}))return false
  return true
}

// Sweep small foot steps to prevent tunnelling. Interior movement is unmodified;
// only a boundary removes the blocked part and permits sliding along its edge.
export function moveOnRoad(from,delta) {
  const distance=Math.hypot(delta.x,delta.y*2/3),steps=Math.max(1,Math.ceil(distance/.12))
  const dx=delta.x/steps,dy=delta.y*2/3/steps
  let position={...from}
  for(let i=0;i<steps;i++){
    const next={x:position.x+dx,y:position.y+dy*1.5}
    if(roadLineClear(position,next) && roadLineClear(from,next)){position=next;continue}
    let low=0,high=1
    for(let j=0;j<9;j++){const t=(low+high)/2;if(isWalkable({x:position.x+dx*t,y:position.y+dy*t*1.5}))low=t;else high=t}
    position={x:position.x+dx*low,y:position.y+dy*low*1.5}
    let slide=null
    for(const angle of [15,-15,30,-30,45,-45,60,-60,75,-75]){
      const r=angle*Math.PI/180,c=Math.cos(r),s=Math.sin(r),left=1-low
      const candidate={x:position.x+(dx*c-dy*s)*c*left,y:position.y+(dx*s+dy*c)*c*left*1.5}
      if(roadLineClear(position,candidate) && roadLineClear(from,candidate)){slide=candidate;break}
    }
    if(slide)position=slide
  }
  return roadLineClear(from,position) ? position : { ...from }
}

// Attach the exact clicked point to visible road nodes, then shorten only across
// contiguous paving. Off-centre destinations are never snapped to the graph.
export function roadRoute(from, to) {
  if(!isWalkable(from)||!isWalkable(to))return []
  if(roadLineClear(from,to))return [{...to}]
  const start = projectToRoad(from), finish = projectToRoad(to)
  const graph = new Map(), points = new Map()
  const id = p => `${p.x}:${p.y}`
  const connect = (a, b) => {
    if (!roadLineClear(a,b)) return
    const ak = id(a), bk = id(b), distance = roadDistance(a, b)
    for (const [key, point] of [[ak,a],[bk,b]]) { if (!graph.has(key)) graph.set(key, []); points.set(key, point) }
    graph.get(ak).push([bk, distance]); graph.get(bk).push([ak, distance])
  }
  segments.forEach(([a,b]) => connect(a,b))
  for (const endpoint of [start, finish]) for (const end of segments[endpoint.segment]) connect(endpoint.point, end)
  if (start.segment === finish.segment) connect(start.point, finish.point)
  for(const endpoint of [from,to]){
    const candidates=[...points.values()].sort((a,b)=>roadDistance(endpoint,a)-roadDistance(endpoint,b))
    let linked=0
    for(const point of candidates)if(roadLineClear(endpoint,point)){connect(endpoint,point);if(++linked===8)break}
    if(!linked)return []
  }
  const origin=id(from), destination=id(to), distances=new Map([[origin,0]]), previous=new Map(), remaining=new Set(graph.keys())
  while (remaining.size) {
    let next=null, cost=Infinity
    for (const key of remaining) if ((distances.get(key) ?? Infinity) < cost) { next=key; cost=distances.get(key) }
    if (!next || next === destination) break
    remaining.delete(next)
    for (const [neighbor, weight] of graph.get(next)) if (cost+weight < (distances.get(neighbor) ?? Infinity)) { distances.set(neighbor,cost+weight); previous.set(neighbor,next) }
  }
  if(!distances.has(destination))return []
  const result=[to]
  let current=destination
  while (previous.has(current)) { current=previous.get(current); result.unshift(points.get(current)) }
  const smooth=[]
  for(let i=0;i<result.length-1;){
    let next=result.length-1
    while(next>i+1&&!roadLineClear(result[i],result[next]))next--
    smooth.push(result[next]);i=next
  }
  return smooth
}
