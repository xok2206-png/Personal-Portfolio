import { useEffect, useRef } from 'react'
export const orbitPoint=(angle,compact=false)=>({x:(compact?50:46)+Math.cos(angle)*(compact?34:26),y:40+Math.sin(angle)*(compact?26:23)})
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
export default function useSkillOrbit({count,selected,hovered,still,compact}){
 const nodes=useRef([]),positions=useRef(Array.from({length:count},(_,i)=>orbitPoint(-Math.PI/2+i*Math.PI*2/count))),phase=useRef(0)
 useEffect(()=>{
  let frame,last=performance.now();const parent=nodes.current[0]?.parentElement
  let table=ellipseSamples(parent?.clientWidth||1440,parent?.clientHeight||810,compact)
  const observer=new ResizeObserver(()=>{table=ellipseSamples(parent.clientWidth,parent.clientHeight,compact)})
  if(parent)observer.observe(parent)
  const tick=now=>{
   const dt=Math.min((now-last)/1000,.05);last=now
   if(!still&&hovered===null)phase.current+=dt/200*(selected===null?1:.6)
   nodes.current.forEach((node,i)=>{
    if(!node)return
    const visibleCount=compact?6:count
    const target=selected===i?{x:compact?50:60,y:compact?50:75}:pointAt(phase.current+i/visibleCount,table)
    const current=positions.current[i],ease=still?1:1-Math.exp(-dt*6)
    current.x+=(target.x-current.x)*ease;current.y+=(target.y-current.y)*ease
    node.style.left=current.x+'%';node.style.top=current.y+'%';node.style.zIndex=selected===i?'100':String(Math.round(current.y))
   })
   if(!still)frame=requestAnimationFrame(tick)
  }
  frame=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(frame);observer.disconnect()}
 },[count,selected,hovered,still,compact])
 return {nodes,positions}
}
