import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { islandLayers } from './layers.config.js'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './WorldAtlas.css'
export default function WorldAtlas({ onClose }) {
 const { travelTo } = usePortfolioUI()
 const dialog = useRef(null)
 useEffect(() => {
  const previous = document.activeElement, overflow = document.body.style.overflow
  dialog.current.showModal(); document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = overflow; previous?.focus?.({ preventScroll: true }) }
 }, [])
 function sail(event, path, title) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault(); onClose(); travelTo(path, title)
 }
 return <dialog ref={dialog} className="world-atlas" aria-labelledby="atlas-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
  <header className="atlas-heading"><div><p>WORLD ATLAS</p><h2 id="atlas-title">다음 목적지</h2></div><button type="button" onClick={onClose} autoFocus aria-label="지도 닫기">×</button></header>
  <nav className="atlas-chart" aria-label="탐험 지도 목적지">{islandLayers.map(island => <Link key={island.id} to={island.route} className={'atlas-island atlas-' + island.id} onClick={event => sail(event, island.route, island.title)}><img src={'/assets/production/images/natural-world/' + island.art} alt="" width="240" height="240"/><span>{island.title} ↗</span><small>{island.description}</small></Link>)}</nav>
  <footer className="atlas-footer"><Link to="/world-map" onClick={event => sail(event, '/world-map', 'World')}>월드맵으로 돌아가기 ↗</Link><span>모든 콘텐츠를 바로 열 수 있습니다.</span></footer>
 </dialog>
}
