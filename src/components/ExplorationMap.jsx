import { useState } from 'react'
import { usePortfolioUI } from '../app/PortfolioUIContext.jsx'
import WorldAtlas from '../scenes/PortfolioWorld/WorldAtlas.jsx'
import './ExplorationMap.css'
export default function ExplorationMap({ bearing = 0, onOpen, onClose }) {
 const { reduced } = usePortfolioUI()
 const [atlasOpen, setAtlasOpen] = useState(false)
 const closeAtlas = () => { setAtlasOpen(false); onClose?.() }
 return <div className="exploration-navigation">
  <button type="button" className="natural-map-button" onClick={() => { setAtlasOpen(true); onOpen?.() }} aria-label="탐험 지도 열기" aria-haspopup="dialog" aria-expanded={atlasOpen}><span aria-hidden="true" style={{ rotate: bearing + 'deg' }}>↑</span> 지도</button>
  {atlasOpen && <WorldAtlas onClose={closeAtlas} reduced={reduced}/>}
 </div>
}
