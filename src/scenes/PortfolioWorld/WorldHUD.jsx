import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers } from './layers.config.js'
import { HudIcon } from './HudDetails.jsx'
import WorldControls from './WorldControls.jsx'

function closeOnEscape(e){if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus()}}
function exclusive(e){if(e.currentTarget.open)document.querySelectorAll('.world-hud details[open]').forEach(node=>{if(node!==e.currentTarget)node.open=false})}
const closePanel=e=>{const detail=e.currentTarget.closest('details');if(detail)detail.open=false}

export default function WorldHUD({selected,entering,onEnter,heading,bearing,guide,onDismissGuide,near,moving}){
 const {reduced,systemReduced,paused,setPaused,sound,setSound,tone}=usePortfolioUI()
 const current=islandLayers.find(i=>i.id===selected)
 const destination=(e,i)=>{closePanel(e);onDismissGuide();onEnter(e,i)}
 return <div className="world-hud">
  <header className="lw-header" onClick={onDismissGuide}>
   <Link to="/" className="lw-brand" aria-label="JY · 리얼월드로 돌아가기"><span className="lw-monogram">JY</span><small>JUNYOUNG KIM<br/><span>PORTFOLIO WORLD</span></small></Link>
   <nav className="lw-top-nav" aria-label="상단 바로가기"><Link to="/world-map" aria-current="page">WORLD</Link>{islandLayers.map(i=><Link key={i.id} to={i.route} onClick={e=>destination(e,i)}>{i.title}</Link>)}</nav>
  </header>
  <WorldControls intro={guide} moving={moving} selected={Boolean(selected)}/>
  {current&&!entering&&<Link className={`lw-context-action ${near?'is-near':''}`} to={current.route} onClick={e=>destination(e,current)}><kbd aria-hidden="true">Enter</kbd><span>ENTER {current.title}<small>선택한 섬으로 입장</small></span><span aria-hidden="true">→</span></Link>}
  <div className="lw-bottom-right">
   <details className="lw-compass" onToggle={exclusive} onKeyDown={closeOnEscape}>
    <summary aria-label="나침반: 작은 월드 지도 열기" style={{'--heading':`${-heading}deg`,'--bearing':`${bearing}deg`}}>
     <span className="compass-ring" aria-hidden="true"><b className="north">N</b><b className="east">E</b><b className="south">S</b><b className="west">W</b><svg viewBox="0 0 100 100"><path d="M50 16 57 43 84 50 57 57 50 84 43 57 16 50 43 43Z"/><path d="M50 16 50 50 43 43Z" className="compass-needle"/></svg></span>
     {current&&<span className="compass-waypoint" aria-hidden="true">◆</span>}<span className="lw-sr">{current?`선택한 목적지 ${current.title}`:'월드 지도'}</span>
    </summary>
    <div className="lw-mini-map" data-hud-panel><p>WORLD <span>목적지 선택</span></p><nav aria-label="나침반 월드 지도">{islandLayers.map(i=><Link className={`map-${i.id}`} key={i.id} to={i.route} aria-current={selected===i.id?'true':undefined} onClick={e=>destination(e,i)}><span aria-hidden="true">◇</span>{i.title}</Link>)}</nav><Link className="lw-map-resume" to="/resume">RESUME · 경력·역량 요약 ↗</Link></div>
   </details>
   <details className="lw-system" onToggle={exclusive} onKeyDown={closeOnEscape}><summary aria-label="시스템 환경 설정" title="환경 설정"><HudIcon name="system"/></summary><div className="lw-system-panel" data-hud-panel><p>환경 설정</p><button type="button" disabled={systemReduced} onClick={()=>setPaused(!paused)} aria-pressed={!reduced} aria-label={reduced?'세계 움직임 재생':'세계 움직임 일시정지'}>Motion <span>{reduced?'OFF':'ON'}</span></button><button type="button" onClick={()=>{setSound(!sound);if(!sound)tone(true)}} aria-pressed={sound} aria-label={sound?'소리 끄기':'소리 켜기'}>Sound <span>{sound?'ON':'OFF'}</span></button><small>{systemReduced?'기기의 동작 줄이기 설정 적용 중':'Sound는 섬 선택 효과음에 적용됩니다.'}</small></div></details>
  </div>
 </div>
}



