import { useEffect, useRef, useState } from 'react'

const controls = {ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]}
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v))
const spawn={x:24,y:92,view:'back',facing:1,heading:0,moving:false}

// Deliberately confined to the foreground paving. No physics or island traversal.
export default function useWorldWalk({reduced,hidden,onManual}) {
 const [player,setPlayer]=useState(spawn)
 const position=useRef(spawn),keys=useRef(new Set()),manual=useRef(onManual)
 useEffect(()=>{manual.current=onManual},[onManual])
 useEffect(()=>{
  let frame=0,last=0
  const update=(dx,dy,dt)=>{
   const length=Math.hypot(dx,dy)||1,p=position.current
   const view=Math.abs(dx)>Math.abs(dy)?'side':dy>0?'front':'back'
   const next={x:clamp(p.x+dx/length*dt*7,18,34),y:clamp(p.y+dy/length*dt*7,87.5,94),view,facing:dx<0?1:dx>0?-1:p.facing,heading:Math.atan2(dx,-dy)*180/Math.PI,moving:!reduced}
   next.moving=next.moving&&(next.x!==p.x||next.y!==p.y)
   position.current=next;setPlayer(next)
  }
  const tick=now=>{
   const dt=Math.min((now-last)/1000,.05);last=now
   let dx=0,dy=0
   keys.current.forEach(key=>{dx+=controls[key][0];dy+=controls[key][1]})
   if(dx||dy)update(dx,dy,dt)
   frame=requestAnimationFrame(tick)
  }
  const stop=()=>{keys.current.clear();cancelAnimationFrame(frame);frame=0;position.current={...position.current,moving:false};setPlayer(position.current)}
  const down=e=>{
   const key=e.key.length===1?e.key.toLowerCase():e.key
   if(!controls[key]||hidden||e.altKey||e.metaKey||e.ctrlKey)return
   if(e.target.closest?.('input,textarea,select,button,summary,[contenteditable="true"],[data-hud-panel]'))return
   e.preventDefault();manual.current()
   if(reduced){if(!e.repeat)update(...controls[key],.2);return}
   keys.current.add(key)
   if(!frame){last=performance.now();frame=requestAnimationFrame(tick)}
  }
  const up=e=>{keys.current.delete(e.key.length===1?e.key.toLowerCase():e.key);if(!keys.current.size)stop()}
  const visibility=()=>{if(document.hidden)stop()}
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',stop);document.addEventListener('visibilitychange',visibility)
  return()=>{cancelAnimationFrame(frame);keys.current.clear();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',stop);document.removeEventListener('visibilitychange',visibility)}
 },[reduced,hidden])
 return {...player,moving:player.moving&&!reduced&&!hidden}
}
