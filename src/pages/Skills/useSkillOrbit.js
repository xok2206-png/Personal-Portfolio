import { useEffect, useRef } from 'react'
import { nexusStops } from './nexusLayout.js'
export const orbitPoint=(angle,compact=false)=>({x:50+Math.cos(angle)*(compact?34:28),y:(compact?46:44)+Math.sin(angle)*(compact?19:17)})
// Sample physical ellipse length so spacing remains even on wide and tall stages.
function ellipseSamples(width,height,compact){
 const points=[{angle:-Math.PI/2,length:0}];let length=0,last=orbitPoint(-Math.PI/2,compact)
 for(let i=1;i<=720;i++){const angle=-Math.PI/2+i*Math.PI*2/720,p=orbitPoint(angle,compact);length+=Math.hypot((p.x-last.x)*width,(p.y-last.y)*height);points.push({angle,length});last=p}
 return {points,length,compact}
}
function pointAt(fraction,table){
 const length=((fraction%1)+1)%1*table.length
 let low=0,high=table.points.length-1
 while(high-low>1){const mid=(low+high)>>1;if(table.points[mid].length<length)low=mid;else high=mid}
 const a=table.points[low],b=table.points[high],mix=(length-a.length)/(b.length-a.length)
 return orbitPoint(a.angle+(b.angle-a.angle)*mix,table.compact)
}
export default function useSkillOrbit({count,selected,still,compact,collected,area,highlighted}){
 const nodes=useRef([]),positions=useRef(Array.from({length:count},(_,i)=>orbitPoint(-Math.PI/2+i*Math.PI*2/count))),phase=useRef(0),scales=useRef([])
 useEffect(()=>{
  let frame,last=performance.now();const parent=nodes.current[0]?.parentElement
  let table=ellipseSamples(parent?.clientWidth||1440,parent?.clientHeight||810,compact)
  const lines=Array.from({length:count},(_,i)=>parent?.parentElement.querySelectorAll('[data-network-index="'+i+'"]'))
  const observer=new ResizeObserver(()=>{table=ellipseSamples(parent.clientWidth,parent.clientHeight,compact)})
  if(parent)observer.observe(parent)
  const tick=now=>{
   const dt=Math.min((now-last)/1000,.05);last=now
   const width=parent?.clientWidth||1440,height=parent?.clientHeight||810
   if(!still)phase.current+=dt/200*(selected===null?1:.6)
   nodes.current.forEach((node,i)=>{
    if(!node)return
    const indices=collected.flatMap((v,index)=>v?[index]:[])
    let target=pointAt(phase.current+Math.max(0,indices.indexOf(i))/Math.max(1,indices.length),table)
    if(selected===i){const display=parent?.closest('.skill-chamber')?.querySelector('.skill-display-gem');if(display){const r=display.getBoundingClientRect(),stage=parent.getBoundingClientRect();target={x:(r.x+r.width/2-stage.x)/width*100,y:(r.y+r.height/2-stage.y)/height*100}}}
    const p=nexusStops[i]
    const source=compact?{x:16+(i%4)*22.6,y:73+Math.floor(i/4)*12}:{x:area.cx+(p.x-50)/41*area.rx,y:area.cy+(p.y-79.5)/14.5*area.ry-3}
    const current=positions.current[i],ease=still?1:1-Math.exp(-dt*6)
    if(!collected[i]){current.x=source.x;current.y=source.y}
    else{current.x+=(target.x-current.x)*ease;current.y+=(target.y-current.y)*ease}
    node.style.opacity=String(highlighted!==null&&highlighted!==i?.38:1)
    node.dataset.launched=String(collected[i])
    const displayWidth=selected===i?parent?.closest('.skill-chamber')?.querySelector('.skill-display-gem')?.clientWidth:0
    const scale=displayWidth?displayWidth/node.offsetWidth:collected[i]?(.88+(current.y-23)/40*.2):(compact?1:.78)
    scales.current[i]=(scales.current[i]??scale)+(scale-(scales.current[i]??scale))*ease
    node.style.transform=`translate(-50%,-50%) translate3d(${(current.x-50)*width/100}px,${(current.y-40)*height/100}px,0) scale(${scales.current[i]})`;node.style.zIndex=highlighted===i?'100':String(Math.round(current.y))
    lines[i]?.forEach(line=>line.setAttribute('d',`M 50 43 Q ${(50+current.x)/2} ${current.y-5} ${current.x} ${current.y}`))

   })
   if(!still)frame=requestAnimationFrame(tick)
  }
  frame=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(frame);observer.disconnect()}
 },[count,selected,still,compact,collected,area,highlighted])
 return {nodes,positions}
}

