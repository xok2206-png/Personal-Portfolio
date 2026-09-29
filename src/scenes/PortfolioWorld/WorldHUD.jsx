import ExplorationMap from '../../components/ExplorationMap.jsx'
import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers } from './layers.config.js'
import WorldControls from './WorldControls.jsx'

export default function WorldHUD({selected,entering,onEnter,onHover,guide,onDismissGuide,moving,onPanelChange,onReset,bearing,mobileIndex,onBrowse}){
 const {reduced,systemReduced,paused,setPaused,sound,setSound,tone}=usePortfolioUI()
 const current=islandLayers.find(i=>i.id===selected)
 const destination=(e,i)=>{onDismissGuide();onEnter(e,i)}
 const closeOnEscape=e=>{if(e.key==='Escape'){e.stopPropagation();e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus()}}
 const toggle=e=>{onPanelChange(e.currentTarget.open);if(e.currentTarget.open)onHover(null)}
 return <div className="world-hud">
  <header className="lw-header" onClick={onDismissGuide}>
   <Link to="/" className="lw-brand" aria-label="JY · 리얼월드로 돌아가기">JY <span className="world-brand-caption">PORTFOLIO</span></Link>
   <nav className="lw-top-nav" aria-label="월드 주요 이동"><Link to="/world-map" aria-current="page" onClick={onReset}>WORLD</Link>{islandLayers.map(i=><Link key={i.id} to={i.route} data-selected={entering?.id===i.id} onPointerEnter={e=>{if(e.pointerType!=='touch')onHover(i.id)}} onPointerLeave={()=>onHover(null)} onFocus={()=>onHover(i.id)} onBlur={()=>onHover(null)} onClick={e=>destination(e,i)}>{i.title}</Link>)}</nav>
  </header>
  <ExplorationMap bearing={bearing} onOpen={()=>{onPanelChange(true);onHover(null);onDismissGuide()}} onClose={()=>onPanelChange(false)}/>
  <WorldControls intro={guide} moving={moving} selected={Boolean(selected)}/>
  {current&&!entering&&<Link className="lw-context-action" aria-label={`${current.title} 입장`} to={current.route} onClick={e=>destination(e,current)}><span aria-hidden="true">→</span></Link>}
  <div className="world-mobile-pager" aria-label="섬 둘러보기">
   <button type="button" aria-label="이전 섬 보기" disabled={mobileIndex===0} onClick={()=>onBrowse(mobileIndex-1)}>←</button>
   <span aria-live="polite">{islandLayers[mobileIndex].number} / 04</span>
   <button type="button" aria-label="다음 섬 보기" disabled={mobileIndex===3} onClick={()=>onBrowse(mobileIndex+1)}>→</button>
  </div>
  <details className="lw-system" onToggle={toggle} onKeyDown={closeOnEscape}><summary aria-label="시스템 환경 설정" title="환경 설정"><svg className="world-settings-crest" viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path className="crest-enamel" d="M28 3 37 10 48 14 46 34 39 45 28 53 17 45 10 34 8 14 19 10Z"/><path className="crest-filigree" d="M28 7 35 14 43 17 41 33 35 42 28 48 21 42 15 33 13 17 21 14Z M10 20 4 16 6 29 13 36 M46 20 52 16 50 29 43 36 M19 10 18 5 24 9 M37 10 38 5 32 9"/><path className="crest-crystal" d="m28 16 9 12-9 14-9-14Z"/><path className="crest-facet" d="m28 16-3 12 3 14m-9-14h18l-12 0"/><circle cx="28" cy="10" r="1.5"/><circle cx="28" cy="47" r="1.5"/></svg></summary><div className="lw-system-panel" data-hud-panel><p>환경 설정</p><button type="button" disabled={systemReduced} onClick={()=>setPaused(!paused)} aria-pressed={!reduced} aria-label={reduced?'세계 움직임 재생':'세계 움직임 일시정지'}>월드 움직임 <span>{reduced?'OFF':'ON'}</span></button><button type="button" onClick={()=>{setSound(!sound);if(!sound)tone(true)}} aria-pressed={sound} aria-label={sound?'소리 끄기':'소리 켜기'}>선택 효과음 <span>{sound?'ON':'OFF'}</span></button><small>{systemReduced?'기기의 동작 줄이기 설정 적용 중':'Sound는 섬 선택 효과음에 적용됩니다.'}</small></div></details>
 </div>
}
