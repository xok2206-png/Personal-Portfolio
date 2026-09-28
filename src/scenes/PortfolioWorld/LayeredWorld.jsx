import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers, layerRoot } from './layers.config.js'
import WorldAtmosphere, { WaterMist } from './WorldAtmosphere.jsx'
import FlowingWater from './FlowingWater.jsx'
import './LayeredWorld.css'
import './WorldAtmosphere.css'

export default function LayeredWorld(){
 const {reduced,tone}=usePortfolioUI(),navigate=useNavigate()
 const root=useRef(null),camera=useRef(null),timeline=useRef(null),deadline=useRef(null)
 const [paused,setPaused]=useState(false),[hidden,setHidden]=useState(document.hidden),[onscreen,setOnscreen]=useState(true)
 const [selected,setSelected]=useState(null),[entering,setEntering]=useState(null),[failed,setFailed]=useState({})
 const running=!reduced&&!paused&&!hidden&&onscreen
 useEffect(()=>{const visibility=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',visibility);const ob=new IntersectionObserver(([e])=>setOnscreen(e.isIntersecting),{threshold:.05});ob.observe(camera.current);return()=>{ob.disconnect();document.removeEventListener('visibilitychange',visibility);timeline.current?.kill();clearTimeout(deadline.current)}},[])
 useEffect(()=>{if(reduced&&entering){timeline.current?.kill();clearTimeout(deadline.current);navigate(entering.route)}},[reduced,entering,navigate])
 const fail=id=>setFailed(old=>({...old,[id]:true}))
 function enter(e,island){
  if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||reduced)return
  e.preventDefault();if(entering)return
  setEntering(island);setSelected(island.id);tone()
  const finish=()=>navigate(island.route);deadline.current=setTimeout(finish,1500)
  const target=root.current.querySelector(`[data-island="${island.id}"]`),b=camera.current.getBoundingClientRect(),t=target.getBoundingClientRect()
  timeline.current=gsap.timeline({onComplete:()=>{clearTimeout(deadline.current);finish()}})
   .to(camera.current,{transformOrigin:`${t.x+t.width/2-b.x}px ${t.y+t.height*.4-b.y}px`,scale:2.5,duration:1.1,ease:'power2.inOut'})
   .to(root.current.querySelector('.lw-entry-veil'),{opacity:1,duration:.4},.7)
 }
 return <main id="main" ref={root} className={`layered-world ${entering?'is-entering':''}`} data-paused={!running} data-selected={selected}>
  <h1 className="lw-sr" tabIndex="-1">김준영의 살아 있는 포트폴리오 세계</h1>
  <div className="lw-viewport">
   <div className="lw-scene" ref={camera}>
    <img className="lw-backdrop" src={`${layerRoot}background-native.webp`} alt="" fetchPriority="high" onError={()=>fail('background')} />
    {failed.background&&<div className="lw-backdrop-fallback"/>}
    <img className="lw-distant-basin" src={`${layerRoot}distant-basin-native.webp`} alt=""/>
    <img className="lw-cloud lw-cloud-far" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-ship lw-ship-far" src={`${layerRoot}airship.webp`} alt=""/>
    <div className="lw-bridges" aria-hidden="true"><img className="lw-bridge b1" src={`${layerRoot}bridge.webp`} alt=""/><img className="lw-bridge b2" src={`${layerRoot}bridge.webp`} alt=""/><img className="lw-bridge b3" src={`${layerRoot}bridge.webp`} alt=""/></div>
    <nav aria-label="세계의 다섯 목적지" className="lw-islands">
     {islandLayers.map(i=><Link key={i.id} to={i.route} data-island={i.id} className={`lw-island lw-${i.id} ${selected===i.id?'is-selected':''}`} aria-label={`${i.title} 탐색`} style={{left:`${i.x}%`,top:`${i.y}%`,width:`${i.w}%`,'--duration':`${i.duration}s`,'--phase':`${i.phase}s`,'--drift':`${i.drift}px`,'--label':`${i.label}%`}} onPointerEnter={()=>setSelected(i.id)} onPointerLeave={()=>!entering&&setSelected(null)} onFocus={()=>setSelected(i.id)} onBlur={()=>!entering&&setSelected(null)} onClick={e=>enter(e,i)}>
      <div className="lw-float"><div className="lw-response">
       {!failed[i.id]&&<><img className="lw-island-art" src={`${layerRoot}${i.id}-reference-v6.webp`} alt="" width="1200" height="1200" onError={()=>fail(i.id)}/><FlowingWater island={i} running={running}/><WaterMist island={i}/></>}
       <span className={`lw-label ${failed[i.id]?'lw-label-fallback':''}`}><strong>{i.title}</strong><small>{i.subtitle}</small><i aria-hidden="true">↗</i></span>
      </div></div>
     </Link>)}
    </nav>
    <img className="lw-cloud lw-cloud-mid" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-cloud lw-cloud-near" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-ship lw-ship-near" src={`${layerRoot}airship.webp`} alt=""/>
    {!failed.tree&&<div className="lw-framing-tree" aria-hidden="true">
     <img className="lw-tree-trunk" src={`${layerRoot}foreground-tree-reference-v6.webp`} alt="" onError={()=>fail('tree')}/>
     <img className="lw-tree-canopy canopy-left" src={`${layerRoot}foreground-tree-reference-v6.webp`} alt=""/>
     <img className="lw-tree-canopy canopy-right" src={`${layerRoot}foreground-tree-reference-v6.webp`} alt=""/>
    </div>}
    <div className="lw-foreground" aria-hidden="true"><img className="lw-lookout" src={`${layerRoot}lookout-reference-v6.webp`} alt=""/><div className="lw-explorer"><img src={`${layerRoot}character.webp`} alt=""/></div></div>
    <WorldAtmosphere/>
    <header className="lw-header"><Link to="/" className="lw-brand">JY<small>JUNYOUNG KIM<br/>PORTFOLIO</small></Link><nav aria-label="상단 바로가기">{islandLayers.map(i=><Link key={i.id} to={i.route}>{i.title}</Link>)}</nav></header>
    <div className="lw-copy" aria-hidden="true">작은 아이디어도,<br/>더 나은 경험이 될 수 있다.<span>A BETTER EXPERIENCE.<br/>A BRIGHTER TOMORROW.</span></div>
    <div className="lw-controls"><button type="button" onClick={()=>setPaused(v=>!v)} disabled={reduced} aria-pressed={paused} aria-label={paused?'세계 움직임 재생':'세계 움직임 일시정지'}>{reduced?'모션 감소 적용 중':paused?'▷ 움직임 재생':'Ⅱ 움직임 멈추기'}</button></div>
    <div className="lw-entry-veil"/>
   </div>
  </div>
  <details className="lw-access" onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary').focus()}}}>
   <summary>콘텐츠 바로가기 <span aria-hidden="true">↗</span></summary>
   <div className="lw-access-panel"><nav aria-label="콘텐츠 직접 탐색">{islandLayers.map(i=><Link key={i.id} to={i.route}><strong>{i.title}</strong><span>{i.subtitle} ↗</span></Link>)}</nav><div className="lw-extra"><Link to="/quick-view">프로젝트 한눈에 보기 ↗</Link><Link to="/resume">경력·역량 요약 ↗</Link></div></div>
  </details>
  {entering&&<div className="lw-status"><span role="status">{entering.title}에 들어가는 중</span><Link to={entering.route}>바로 이동 ↗</Link></div>}
 </main>
}

