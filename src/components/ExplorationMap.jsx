import { useState } from 'react'
import { usePortfolioUI } from '../app/PortfolioUIContext.jsx'
import WorldAtlas from '../scenes/PortfolioWorld/WorldAtlas.jsx'
import './ExplorationMap.css'

export default function ExplorationMap({bearing=0,onOpen,onClose}){
 const {reduced}=usePortfolioUI()
 const [atlasOpen,setAtlasOpen]=useState(false)
 const closeAtlas=()=>{setAtlasOpen(false);onClose?.()}
 return <div className="world-refined exploration-navigation">
  <button type="button" className="world-compass-ornament" onClick={()=>{setAtlasOpen(true);onOpen?.()}} aria-label="나침반 · 탐험 지도 열기" aria-haspopup="dialog" aria-expanded={atlasOpen} title="탐험 지도 열기">
   <img className="captain-compass-body" src="/assets/production/images/world-layers/celestial-compass-v2.webp" alt=""/>
   <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
    <circle className="compass-halo" cx="50" cy="50" r="28"/>
    <circle className="compass-fine-ring" cx="50" cy="50" r="32"/>
    <path className="compass-ticks" d="M50 12v7M50 81v7M12 50h7M81 50h7M25 25l5 5M70 70l5 5M25 75l5-5M70 30l5-5"/>
    <g className="compass-needle" style={{transform:`rotate(${bearing}deg)`}}>
    <path className="compass-secondary" d="M28 28 50 44 72 28 56 50 72 72 50 56 28 72 44 50Z"/>
    <path className="compass-star" d="M50 17 57 43 83 50 57 57 50 83 43 57 17 50 43 43Z"/>
    <path className="compass-gold" d="M50 17 50 50 43 43Z M50 50 57 57 50 83Z"/>
    <path className="compass-center" d="m50 45 5 5-5 5-5-5Z"/>
    </g>
    <text x="50" y="9">N</text><text x="94" y="53">E</text><text x="50" y="98">S</text><text x="6" y="53">W</text>
   </svg><span className="compass-map-label">탐험 지도</span>
  </button>
  {atlasOpen&&<WorldAtlas onClose={closeAtlas} reduced={reduced}/>}
 </div>
}
