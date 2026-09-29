import { useEffect, useState } from 'react'
import { layerRoot } from './layers.config.js'
const characterRoot='/assets/production/images/project-gallery/character/'
const poses=[['back','back',1],['front','front',1],['left','side',1],['right','side',-1]]

// Fixed-facing layers blend opacity; hover never swaps/reflects the whole sprite.
export default function WorldCharacter({player,hovered,selected,bearing,reduced,blocked}){
 const [stableHover,setStableHover]=useState(null)
 const [failed,setFailed]=useState({}),[ready,setReady]=useState({})
 useEffect(()=>{
  const timer=setTimeout(()=>setStableHover(hovered),hovered?240:0)
  return()=>clearTimeout(timer)
 },[hovered])
 const looking=!selected&&!player.moving&&!blocked&&stableHover===hovered&&Boolean(stableHover)
 const travelPose=Math.abs(bearing)>55?(bearing<0?'left':'right'):'back'
 const movePose=player.view==='side'?(player.facing===1?'left':'right'):player.view
 const pose=selected?travelPose:movePose
 const look=looking?Math.max(-1,Math.min(1,bearing/65)):0
 return <div className="lw-explorer" data-moving={player.moving&&!selected&&!blocked} data-pose={pose} data-look={looking?'stable':'neutral'} data-committed={Boolean(selected)} data-x={player.x.toFixed(2)} data-y={player.y.toFixed(2)} data-heading={bearing} style={{left:`${player.x}%`,top:`${player.y}%`,'--head-look':`${look*2.2}deg`,'--head-shift':`${look*1.5}px`,'--pose-time':reduced?'0ms':selected?'450ms':'180ms'}}>
  <span className="lw-player-shadow"/>
  <div className="world-character-breathe">
   {poses.map(([name,view,facing])=><div key={name} className="world-character-pose" data-active={pose===name} data-walk-ready={Boolean(ready[view])&&!failed[`${view}-walk`]} style={{'--pose-facing':facing}}>
    <div className="world-character-still">
     {['lower','upper'].map(part=><div key={part} className={`world-character-${part}`}><img src={failed[view]?`${layerRoot}character.webp`:`${characterRoot}${view}-idle.webp`} alt="" onError={e=>{if(failed[view])e.currentTarget.hidden=true;else setFailed(s=>({...s,[view]:true}))}}/></div>)}
    </div>
    {!failed[`${view}-walk`]&&<div className="world-character-walk"><img src={`${characterRoot}${view}-walk.webp`} alt="" onLoad={async e=>{try{await e.currentTarget.decode();setReady(s=>({...s,[view]:true}))}catch{setFailed(s=>({...s,[`${view}-walk`]:true}))}}} onError={()=>setFailed(s=>({...s,[`${view}-walk`]:true}))}/></div>}
   </div>)}
  </div>
 </div>
}
