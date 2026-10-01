import assert from 'node:assert/strict'
import {flightPlaces} from '../src/scenes/PortfolioWorld/flightScene.js'
import {islandDock,safeFlightPath,clearSegment,moveOutsideIslands,islandRadius} from '../src/scenes/PortfolioWorld/flightCollision.js'
const docks=flightPlaces.map(islandDock);docks.push({x:1,y:1.2,z:18})
for(const a of docks)for(const b of docks){const path=safeFlightPath(a,b,flightPlaces);assert.ok(path);for(let i=1;i<path.length;i++)assert.ok(clearSegment(path[i-1],path[i],flightPlaces))}
for(const p of flightPlaces)for(let a=0;a<Math.PI*2;a+=.1){const r=islandRadius(p)+1;const pos={x:p.x+Math.cos(a)*r,z:p.z+Math.sin(a)*r};if(!clearSegment(pos,pos,flightPlaces))continue;for(let i=0;i<80;i++){const old={...pos};moveOutsideIslands(pos,-Math.cos(a)*.4,-Math.sin(a)*.4,flightPlaces);assert.ok(clearSegment(old,pos,flightPlaces));assert.ok(clearSegment(pos,pos,flightPlaces))}}
console.log('25 docking routes and all-direction sustained collision sweeps passed')
