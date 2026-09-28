import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/content.js'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import useGalleryWalk, { exhibitStops } from './useGalleryWalk.js'
import './Projects.css'

const placements=[{x:16,y:62,w:25,h:37,z:9},{x:34,y:55,w:18,h:29,z:5},{x:65,y:55,w:18,h:29,z:5},{x:84,y:62,w:25,h:37,z:9}]
const root='/assets/production/images/project-gallery/'
export default function Projects(){
 const {reduced}=usePortfolioUI(),stage=useRef(null),viewport=useRef(null),floor=useRef(null)
 const [paused,setPaused]=useState(false),[hidden,setHidden]=useState(document.hidden),[selected,setSelected]=useState(null),[measure,setMeasure]=useState({width:1440,view:1440}),[spriteFailed,setSpriteFailed]=useState(false)
 const {player,go,stop,keyDown,keyUp}=useGalleryWalk({reduced,paused,hidden})
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);const observer=new ResizeObserver(()=>setMeasure({width:stage.current.offsetWidth,view:viewport.current.clientWidth}));observer.observe(viewport.current);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update)}},[])
 const near=exhibitStops.findIndex(p=>Math.hypot(p.x-player.x,(p.y-player.y)*1.6)<7)
 const current=selected===null?near:selected
 const pan=Math.max(-(measure.width-measure.view)/2,Math.min((measure.width-measure.view)/2,(50-player.x)/100*measure.width))
 function approach(index){setSelected(index);go(exhibitStops[index]);floor.current.focus({preventScroll:true})}
 function moveOnFloor(e){if(e.detail===0)return;const rect=stage.current.getBoundingClientRect();setSelected(null);go({x:(e.clientX-rect.left)/rect.width*100,y:(e.clientY-rect.top)/rect.height*100});e.currentTarget.focus({preventScroll:true})}
 return <main id="main" className="project-gallery gallery-depth" data-still={reduced||paused||hidden}>
  <header className="gallery-header"><Link to="/world-map">← BACK TO WORLD</Link><details className="gallery-menu"><summary>전시 메뉴</summary><nav aria-label="전시관 메뉴">{projects.map((p,i)=><button key={p.id} onClick={e=>{e.currentTarget.closest('details').open=false;approach(i)}}>{p.num} {p.name}</button>)}<Link to="/quick-view">전체 프로젝트 요약 ↗</Link><Link to="/contact">CONTACT ↗</Link><button onClick={()=>setPaused(v=>!v)} disabled={reduced}>{reduced?'모션 감소 적용 중':paused?'움직임 재생':'움직임 멈추기'}</button></nav></details></header>
  <div className="gallery-viewport" ref={viewport}>
   <div className="gallery-stage" ref={stage} style={{'--camera-pan':`${pan}px`}}>
    <div className="gallery-room" aria-hidden="true"><img src={`${root}hall-depth.webp`} alt="" fetchPriority="high" onError={e=>{e.currentTarget.hidden=true}}/><div className="gallery-sunlight"/></div>
    <div className="gallery-title"><span>SELECTED WORKS</span><h1 tabIndex="-1">Projects</h1><p>REAL PROBLEMS.<br/>THOUGHTFUL EXPERIENCES.</p></div>
    <button className="gallery-floor" ref={floor} type="button" aria-label="전시관 바닥: 클릭하거나 방향키로 캐릭터 이동" aria-describedby="gallery-help" onClick={moveOnFloor} onKeyDown={e=>{if(e.key==='Escape'){stop();return}if(e.key.startsWith('Arrow'))setSelected(null);keyDown(e)}} onKeyUp={keyUp} onBlur={stop}/>
    <nav className="gallery-exhibits" aria-label="네 개의 프로젝트 전시">
     {projects.map((p,index)=>{const pos=placements[index];return <article key={p.id} className={`gallery-exhibit exhibit-${p.id} ${current===index?'is-active':''}`} style={{left:`${pos.x}%`,top:`${pos.y}%`,width:`${pos.w}%`,height:`${pos.h}%`,zIndex:pos.z}}>
      <button className="exhibit-approach" onClick={()=>approach(index)} aria-label={`${p.name} 전시대로 이동`}>
       <div className="exhibit-heading"><span>{p.num}</span><h2>{p.name}</h2><p>{p.role}</p></div>
       <img className="exhibit-art" src={`${root}${p.id}.webp`} alt="" onError={e=>{e.currentTarget.hidden=true}}/>
       <img className="exhibit-reflection" src={`${root}${p.id}.webp`} alt="" aria-hidden="true" onError={e=>{e.currentTarget.hidden=true}}/>
      </button>
      <Link className="exhibit-direct" to={`/projects/${p.id}`}>CASE STUDY ↗</Link>
     </article>})}
    </nav>
    <div className="gallery-walker" data-moving={player.moving&&!paused&&!hidden&&!reduced} data-direction={player.view} data-x={player.x.toFixed(2)} data-y={player.y.toFixed(2)} style={{left:`${player.x}%`,top:`${player.y}%`,zIndex:player.y>70?12:7,'--person-scale':.72+(player.y-65)/29*.4,'--facing':player.view==='side'?player.facing:1}} aria-hidden="true">
     <span className="walker-shadow"/>
     <div className="walker-body"><img className="walker-idle" src={`${root}character/${player.view}-idle.webp`} alt="" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="/assets/production/images/world-layers/character.webp"}}/><div className={`walker-stride ${spriteFailed?'sprite-failed':''}`}><img src={`${root}character/${player.view}-walk.webp`} alt="" onError={()=>setSpriteFailed(true)}/></div></div>
    </div>
   </div>
  </div>
  <p id="gallery-help" className="gallery-sr-only">바닥 클릭·터치 또는 바닥에 포커스 후 방향키로 이동합니다. Esc로 정지합니다. 상단 전시 메뉴에서도 작품을 선택할 수 있습니다.</p>
 </main>
}


