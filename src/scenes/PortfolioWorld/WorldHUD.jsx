import { Link } from 'react-router-dom'
import ExplorationMap from '../../components/ExplorationMap.jsx'
import { islandLayers } from './layers.config.js'
import WorldControls from './WorldControls.jsx'
export default function WorldHUD({ selected, onEnter, guide, moving, onPanelChange, bearing, mobileIndex, onBrowse }) {
 const current = islandLayers.find(island => island.id === selected)
 return <div className="world-hud">
  <ExplorationMap bearing={bearing} onOpen={() => onPanelChange(true)} onClose={() => onPanelChange(false)}/>
  <WorldControls intro={guide} moving={moving} selected={Boolean(selected)}/>
  {current && <Link className="lw-context-action" to={current.route} onClick={event => onEnter(event, current)}>{current.title} 입장 ↗</Link>}
  <div className="world-mobile-pager" aria-label="섬 둘러보기"><button type="button" aria-label="이전 섬 보기" disabled={mobileIndex === 0} onClick={() => onBrowse(mobileIndex - 1)}>←</button><span aria-live="polite">{islandLayers[mobileIndex].number} / 04</span><button type="button" aria-label="다음 섬 보기" disabled={mobileIndex === 3} onClick={() => onBrowse(mobileIndex + 1)}>→</button></div>
 </div>
}
