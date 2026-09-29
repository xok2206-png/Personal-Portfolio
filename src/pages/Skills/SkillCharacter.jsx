import { useState } from 'react'
const root='/assets/production/images/project-gallery/character/'
export default function SkillCharacter({player,x,y,still}){
 const [ready,setReady]=useState({}),[failed,setFailed]=useState({})
 const pose=player.view
 return <div className="skill-walker" data-x={x.toFixed(2)} data-y={y.toFixed(2)} data-view={pose} data-moving={player.moving&&!still} style={{left:x+'%',top:y+'%','--facing':pose==='side'?player.facing:1}} aria-hidden="true"><span className="skill-walker-shadow"/>{['back','front','side'].map(view=><div key={view} className="skill-pose" data-visible={pose===view} data-ready={ready[view]&&!failed[view]}><div className="skill-idle"><img src={root+view+'-idle.webp'} alt="" onError={e=>{e.currentTarget.hidden=true}}/></div><div className="skill-stride"><img src={root+view+'-walk.webp'} alt="" onLoad={async e=>{try{await e.currentTarget.decode();setReady(r=>({...r,[view]:true}))}catch{setFailed(r=>({...r,[view]:true}))}}} onError={()=>setFailed(r=>({...r,[view]:true}))}/></div></div>)}</div>
}
