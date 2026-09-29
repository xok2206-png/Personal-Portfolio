import { useState } from 'react'
import './IslandRibbon.css'
export default function IslandRibbon({title}){
 const [failed,setFailed]=useState(false)
 return <span className="island-ribbon" data-failed={failed}>
  {!failed&&<img src="/assets/production/images/world-labels/ornate-gold-label.webp" alt="" aria-hidden="true" draggable="false" onError={()=>setFailed(true)}/>}
  <strong className="island-ribbon-title">{title}</strong>
 </span>
}
