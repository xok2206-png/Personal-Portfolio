import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers } from './layers.config.js'
import { HudIcon } from './HudDetails.jsx'
import WorldControls from './WorldControls.jsx'

export default function WorldHUD({selected,entering,onEnter,onHover,guide,onDismissGuide,moving,onPanelChange,onReset,bearing,mobileIndex,onBrowse}){
 const {reduced,systemReduced,paused,setPaused,sound,setSound,tone}=usePortfolioUI()
 const current=islandLayers.find(i=>i.id===selected)
 const destination=(e,i)=>{onDismissGuide();onEnter(e,i)}
 const closeOnEscape=e=>{if(e.key==='Escape'){e.stopPropagation();e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus()}}
 const toggle=e=>{onPanelChange(e.currentTarget.open);if(e.currentTarget.open)onHover(null)}
 return <div className="world-hud">
  <header className="lw-header" onClick={onDismissGuide}>
   <Link to="/" className="lw-brand" aria-label="JY · 리얼월드로 돌아가기"><span className="lw-monogram">JY</span><small>JUNYOUNG KIM<br/><span>PORTFOLIO WORLD</span></small></Link>
   <nav className="lw-top-nav" aria-label="월드 주요 이동"><Link to="/world-map" aria-current="page" onClick={onReset}>WORLD</Link>{islandLayers.map(i=><Link key={i.id} to={i.route} data-selected={entering?.id===i.id} onPointerEnter={e=>{if(e.pointerType!=='touch')onHover(i.id)}} onPointerLeave={()=>onHover(null)} onFocus={()=>onHover(i.id)} onBlur={()=>onHover(null)} onClick={e=>destination(e,i)}>{i.title}</Link>)}</nav>
  </header>
  <button type="button" className="world-compass-ornament" onClick={onReset} aria-label="나침반 · 월드맵 기본 시점으로 돌아가기" title="기본 시점으로 돌아가기">
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
   </svg>
  </button>
  <WorldControls intro={guide} moving={moving} selected={Boolean(selected)}/>
  {current&&!entering&&<Link className="lw-context-action" aria-label={`${current.title} 입장`} to={current.route} onClick={e=>destination(e,current)}><span aria-hidden="true">→</span></Link>}
  <div className="world-mobile-pager" aria-label="섬 둘러보기">
   <button type="button" aria-label="이전 섬 보기" disabled={mobileIndex===0} onClick={()=>onBrowse(mobileIndex-1)}>←</button>
   <span aria-live="polite">{islandLayers[mobileIndex].number} / 04</span>
   <button type="button" aria-label="다음 섬 보기" disabled={mobileIndex===3} onClick={()=>onBrowse(mobileIndex+1)}>→</button>
  </div>
  <details className="lw-system" onToggle={toggle} onKeyDown={closeOnEscape}><summary aria-label="시스템 환경 설정" title="환경 설정"><HudIcon name="preferences"/><span className="world-settings-label">설정</span></summary><div className="lw-system-panel" data-hud-panel><p>환경 설정</p><button type="button" disabled={systemReduced} onClick={()=>setPaused(!paused)} aria-pressed={!reduced} aria-label={reduced?'세계 움직임 재생':'세계 움직임 일시정지'}>월드 움직임 <span>{reduced?'OFF':'ON'}</span></button><button type="button" onClick={()=>{setSound(!sound);if(!sound)tone(true)}} aria-pressed={sound} aria-label={sound?'소리 끄기':'소리 켜기'}>선택 효과음 <span>{sound?'ON':'OFF'}</span></button><small>{systemReduced?'기기의 동작 줄이기 설정 적용 중':'Sound는 섬 선택 효과음에 적용됩니다.'}</small></div></details>
 </div>
}
