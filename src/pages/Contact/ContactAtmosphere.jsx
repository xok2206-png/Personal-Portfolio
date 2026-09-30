import { useEffect, useState } from 'react'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
export default function ContactAtmosphere(){
 const {reduced,paused}=usePortfolioUI(),[hidden,setHidden]=useState(document.hidden)
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[])
 return <div className="contact-atmosphere" data-still={reduced||paused||hidden} aria-hidden="true">
  <div className="sunset-bloom"/><div className="sunset-rays"/>
  <img className="sunset-cloud cloud-one" src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt=""/>
  <img className="sunset-cloud cloud-two" src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt=""/>
  <img className="sunset-airship" src="/assets/production/images/world-layers/airship.webp" alt=""/>
  <div className="sunset-birds">{[0,1,2].map(i=><svg key={i} viewBox="0 0 32 16" style={{'--bird':i}}><path d="M2 10 Q9 1 16 10 Q23 1 30 10"/></svg>)}</div>
  <div className="sunset-wind">{[0,1,2,3].map(i=><i key={i} style={{'--leaf':i}}/>)}</div>
 </div>
}
