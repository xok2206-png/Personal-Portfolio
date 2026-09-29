import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { constrainToStairs, placeOnLookout } from './lookoutWalkArea.js'

const controls = {ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]}

const spawn={x:20.4,y:94,view:'back',facing:1,heading:0,moving:false}

// Deliberately confined to the foreground paving. No physics or island traversal.
export default function useWorldWalk({reduced,hidden,blocked=false,onManual,sceneRef}) {
 const [player,setPlayer]=useState(spawn)
 const position=useRef(spawn),keys=useRef(new Set()),manual=useRef(onManual),ground=useRef(null)
 useEffect(()=>{manual.current=onManual},[onManual])
 useLayoutEffect(()=>{
  const scene=sceneRef.current,lookout=scene?.querySelector('.lw-lookout')
  if(!lookout)return
  const measure=()=>{
   const previous=ground.current,p=position.current
   const u=previous?(p.x-previous.left)/previous.width*100:34
   const v=previous?(p.y-previous.top)/previous.height*100:94
   const frame={left:lookout.offsetLeft/scene.clientWidth*100,top:lookout.offsetTop/scene.clientHeight*100,width:lookout.offsetWidth/scene.clientWidth*100,height:lookout.offsetHeight/scene.clientHeight*100}
   if(!frame.width||!frame.height)return
   ground.current=frame
   position.current={...p,...placeOnLookout(u,v,frame),moving:false};setPlayer(position.current)
  }
  measure();const observer=new ResizeObserver(measure);observer.observe(scene);observer.observe(lookout);window.addEventListener('resize',measure)
  return()=>{observer.disconnect();window.removeEventListener('resize',measure)}
 },[sceneRef])
 useEffect(()=>{
  let frame=0,last=0
  const update=(dx,dy,dt)=>{
   const length=Math.hypot(dx,dy)||1,p=position.current
   const view=Math.abs(dx)>Math.abs(dy)?'side':dy>0?'front':'back'
   if(!ground.current)return
   const foot=constrainToStairs({x:p.x+dx/length*dt*7,y:p.y+dy/length*dt*7},ground.current)
   const next={...foot,view,facing:dx<0?1:dx>0?-1:p.facing,heading:Math.atan2(dx,-dy)*180/Math.PI,moving:!reduced}
   next.moving=next.moving&&(Math.abs(next.x-p.x)>.0001||Math.abs(next.y-p.y)>.0001)
   position.current=next;setPlayer(next)
  }
  position.current={...position.current,moving:false};setPlayer(position.current)
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
   if(!controls[key]||hidden||blocked||e.altKey||e.metaKey||e.ctrlKey)return
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
 },[reduced,hidden,blocked])
 return {...player,moving:player.moving&&!reduced&&!hidden&&!blocked}
}
