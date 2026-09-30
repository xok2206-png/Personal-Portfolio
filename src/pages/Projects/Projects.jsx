import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GalleryNav, GalleryIntro, ProjectHUD, GalleryControls, GalleryCompass } from './GalleryHUD.jsx'
import ProjectPedestal from './ProjectPedestal.jsx'
import { projects } from '../../data/content.js'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import useGalleryWalk, { exhibitStops } from './useGalleryWalk.js'
import './Projects.css'
import './ProjectsNatural.css'

const placements=[{x:16,y:62,w:25,h:37,z:9},{x:34,y:55,w:18,h:29,z:5},{x:65,y:55,w:18,h:29,z:5},{x:84,y:62,w:25,h:37,z:9}]
const root='/assets/production/images/project-gallery/'
export default function Projects(){
 const {reduced,systemReduced,paused,setPaused}=usePortfolioUI(),stage=useRef(null),viewport=useRef(null),floor=useRef(null)
 const [onscreen,setOnscreen]=useState(true)
 const [hidden,setHidden]=useState(document.hidden),[selected,setSelected]=useState(null),[hovered,setHovered]=useState(null),[measure,setMeasure]=useState({width:1440,view:1440}),[spriteFailed,setSpriteFailed]=useState(false)
 const {player,go,stop,keyDown,keyUp}=useGalleryWalk({reduced,paused,hidden:hidden||!onscreen})
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);const observer=new ResizeObserver(()=>{if(stage.current&&viewport.current)setMeasure({width:stage.current.offsetWidth,view:viewport.current.clientWidth})});observer.observe(viewport.current);const visibility=new IntersectionObserver(([entry])=>setOnscreen(entry.isIntersecting));visibility.observe(viewport.current);return()=>{visibility.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',update)}},[])
 const near=exhibitStops.findIndex(p=>Math.hypot(p.x-player.x,(p.y-player.y)*1.6)<7)
 const current=hovered??selected??(near>=0?near:null)
 const pan=Math.max(-(measure.width-measure.view)/2,Math.min((measure.width-measure.view)/2,(50-player.x)/100*measure.width))
 function approach(index){setSelected(index)}
 useEffect(()=>{
  const down=e=>{
   if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest?.('input,textarea,select,summary,a,[contenteditable="true"]')||(e.target.closest?.('button')&&e.target!==floor.current))return
   if(e.key==='Escape'){stop();return}
   if(['e','E','Enter'].includes(e.key)&&near>=0){e.preventDefault();setSelected(near);return}
   if(/^Arrow/.test(e.key)||/^[wasd]$/i.test(e.key)){setSelected(null);setHovered(null);keyDown(e)}
  }
  window.addEventListener('keydown',down);window.addEventListener('keyup',keyUp)
  return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',keyUp)}
 })
 function moveOnFloor(e){if(e.detail===0)return;const rect=stage.current.getBoundingClientRect();setSelected(null);setHovered(null);go({x:(e.clientX-rect.left)/rect.width*100,y:(e.clientY-rect.top)/rect.height*100});e.currentTarget.focus({preventScroll:true})}
 return <main id="main" className="project-gallery gallery-depth" data-still={reduced||paused||hidden||!onscreen}>
  <GalleryNav projects={projects} onSelect={approach} paused={paused} reduced={systemReduced} onPause={()=>setPaused(v=>!v)}/><GalleryIntro/>
    <div className="gallery-title"><span>SELECTED WORKS</span><h1 tabIndex="-1">Projects</h1><p>REAL PROBLEMS.<br/>THOUGHTFUL EXPERIENCES.</p></div>
  <div className="gallery-viewport" ref={viewport}>
   <div className="gallery-stage" ref={stage} style={{'--camera-pan':`${pan}px`}}>
    <div className="gallery-room" aria-hidden="true"><img src="/assets/production/images/natural-world/projects-room-v1.webp" alt="" fetchPriority="high" onError={e=>{e.currentTarget.hidden=true}}/><div className="gallery-window-clouds"><img src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt=""/></div><div className="gallery-banner-sheen"/><div className="gallery-sunlight"/><div className="gallery-floor-shimmer"/>{Array.from({length:12},(_,i)=><i key={i} className="gallery-mote" style={{left:`${10+i*7}%`,top:`${20+(i*17)%60}%`,animationDelay:`${-i*1.7}s`}}/>)}</div>

    <button className="gallery-floor" ref={floor} type="button" aria-label="전시관 바닥: 클릭, WASD 또는 방향키로 캐릭터 이동" aria-describedby="gallery-help" onClick={moveOnFloor} onBlur={stop}/>
    <nav className="gallery-exhibits" aria-label="네 개의 프로젝트 전시">
     {projects.map((p,index)=><ProjectPedestal key={p.id} project={p} index={index} position={placements[index]} active={current===index} selected={selected===index} near={near===index} onSelect={approach} onHover={setHovered}/>)}
    </nav>
    <div className="gallery-walker" data-moving={player.moving&&!paused&&!hidden&&!reduced} data-direction={player.view} data-x={player.x.toFixed(2)} data-y={player.y.toFixed(2)} style={{left:`${player.x}%`,top:`${player.y}%`,zIndex:player.y>70?12:7,'--person-scale':.72+(player.y-65)/29*.4,'--facing':player.view==='side'?player.facing:1}} aria-hidden="true">
     <span className="walker-shadow"/>
     <div className="walker-body"><img className="walker-idle" src={`${root}character/${player.view}-idle.webp`} alt="" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="/assets/production/images/world-layers/character.webp"}}/><div className={`walker-stride ${spriteFailed?'sprite-failed':''}`}><img src={`${root}character/${player.view}-walk.webp`} alt="" onError={()=>setSpriteFailed(true)}/></div></div>
    </div>
   </div>
  </div>
  <section className="gallery-project-index" aria-label="프로젝트 바로 보기"><h2>네 개의 작업</h2><ol>{projects.map(project => <li key={project.id}><span>{project.num} · {project.status}</span><h3>{project.name}</h3><p>{project.description}</p><small>{project.role}</small><Link to={"/projects/" + project.id}>작업 과정 보기 ↗</Link></li>)}</ol></section>
  <GalleryControls/><ProjectHUD project={projects[current]} selected={current===selected&&selected!==null}/><GalleryCompass heading={player.view==="side"?(player.facing===1?-90:90):player.view==="front"?180:0}/>
 </main>
}
