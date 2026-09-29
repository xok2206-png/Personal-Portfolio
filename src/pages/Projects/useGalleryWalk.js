import { useEffect, useRef, useState } from 'react'

export const exhibitStops = [{x:16,y:73},{x:34,y:65},{x:65,y:65},{x:84,y:73}]
const aliases={a:'ArrowLeft',d:'ArrowRight',w:'ArrowUp',s:'ArrowDown'}
const direction = (dx,dy) => Math.abs(dx)>Math.abs(dy)*1.3?'side':dy>0?'front':'back'
const limit = (value,min,max) => Math.max(min,Math.min(max,value))
export default function useGalleryWalk({reduced,paused,hidden,initialPosition={x:50,y:80}}){
 const position=useRef(initialPosition),target=useRef(null),keys=useRef(new Set())
 const [player,setPlayer]=useState({...position.current,moving:false,facing:1,view:'back'})
 const [active,setActive]=useState(false)
 const stop=()=>{keys.current.clear();target.current=null;setActive(false);setPlayer(p=>({...p,moving:false}))}
 const go=point=>{
  const next={x:limit(point.x,9,91),y:limit(point.y,65,94)}
  keys.current.clear()
  if(reduced||paused){const view=direction(next.x-position.current.x,(next.y-position.current.y)*1.6);position.current=next;target.current=null;setActive(false);setPlayer({...next,moving:false,facing:next.x<player.x?1:-1,view});return}
  target.current=next;setActive(true)
 }
 const keyDown=e=>{
  const key=aliases[e.key.toLowerCase()]||e.key
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key))return
  e.preventDefault();target.current=null
  if(reduced||paused){go({x:position.current.x+(key==='ArrowLeft'?-3:key==='ArrowRight'?3:0),y:position.current.y+(key==='ArrowUp'?-2:key==='ArrowDown'?2:0)});return}
  keys.current.add(key);setActive(true)
 }
 const keyUp=e=>{keys.current.delete(aliases[e.key.toLowerCase()]||e.key)}
 useEffect(()=>{
  if(!active||paused||hidden||reduced)return
  let frame,last=performance.now(),facing=player.facing,view=player.view
  const tick=now=>{
   const dt=Math.min((now-last)/1000,.05);last=now
   let dx=0,dy=0
   if(keys.current.size){dx=Number(keys.current.has('ArrowRight'))-Number(keys.current.has('ArrowLeft'));dy=Number(keys.current.has('ArrowDown'))-Number(keys.current.has('ArrowUp'))}
   else if(target.current){dx=target.current.x-position.current.x;dy=(target.current.y-position.current.y)*1.6;if(Math.hypot(dx,dy)<.35){position.current=target.current;target.current=null;dx=0;dy=0}}
   const length=Math.hypot(dx,dy)
   if(!length){setPlayer({...position.current,moving:false,facing,view});setActive(false);return}
   if(Math.abs(dx)>.01)facing=dx<0?1:-1;view=direction(dx,dy)
   const distance=Math.min(18*dt,length)
   position.current={x:limit(position.current.x+dx/length*distance,9,91),y:limit(position.current.y+dy/length*distance/1.6,65,94)}
   setPlayer({...position.current,moving:true,facing,view});frame=requestAnimationFrame(tick)
  }
  frame=requestAnimationFrame(tick)
  return()=>cancelAnimationFrame(frame)
 // Facing is captured when movement starts, not an independent animation owner.

 },[active,paused,hidden,reduced])
 useEffect(()=>{const clear=()=>{keys.current.clear();target.current=null;setActive(false);setPlayer(p=>({...p,moving:false}))};window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);return()=>{window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear)}},[])
 return {player,go,stop,keyDown,keyUp}
}



