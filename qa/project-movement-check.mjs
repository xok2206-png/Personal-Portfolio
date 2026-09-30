import assert from 'node:assert/strict'
import { startPosition, roads, isWalkable, roadRoute, roadLineClear, moveOnRoad, roadDistance } from '../src/pages/Projects/projectRoads.js'

const entrances = [[24,63],[31,43],[78,29],[57,62],[87,50]].map(([x,y])=>({x,y}))
// Regression: these visible building corners previously accepted click targets
// and keyboard movement because the road forecourt overlapped their footprints.
for (const point of [{x:26,y:60},{x:25.5,y:60},{x:90,y:48.5}]) {
  assert.equal(isWalkable(point),false,'Building corner must be solid: '+JSON.stringify(point))
}
for (const obstacle of [{x:48,y:58},{x:36.5,y:67},{x:55,y:56},{x:20,y:55},{x:90,y:44},{x:30,y:38},{x:79,y:23}]) {
  assert.equal(isWalkable(obstacle), false, `Solid footprint ${JSON.stringify(obstacle)}`)
}
for (const from of [startPosition, ...entrances]) for (const to of entrances) {
  const route = roadRoute(from,to)
  assert.ok(route.length, `Route to ${JSON.stringify(to)}`)
  let position = from
  for (const waypoint of route) {
    assert.ok(roadLineClear(position,waypoint), 'Planned edge clears obstacles')
    for (let steps=0; roadDistance(position,waypoint)>.001; steps++) {
      assert.ok(steps<3000,'Route must not become stuck')
      const distance=roadDistance(position,waypoint), ratio=Math.min(.18/distance,1)
      position=moveOnRoad(position,{x:(waypoint.x-position.x)*ratio,y:(waypoint.y-position.y)*ratio})
      assert.ok(isWalkable(position),'Walking feet remain on valid ground')
    }
  }
  assert.ok(roadDistance(position,to)<.01)
}
for (const [x,y] of roads.flat()) for(let direction=0;direction<16;direction++) {
  let position={x,y}
  const a=direction*Math.PI/8
  for(let tick=0;tick<12;tick++) {
    const next=moveOnRoad(position,{x:Math.cos(a)*.65,y:Math.sin(a)*.975})
    assert.ok(isWalkable(next),'Running cannot cross a blocked surface')
    assert.ok(roadLineClear(position,next),'Swept movement cannot tunnel')
    if (roadDistance(position,next)<.00001) break
    position=next
  }
}
console.log('PASS: 30 entrance routes, 7 solid footprints, 16-direction running sweeps at every road node')
