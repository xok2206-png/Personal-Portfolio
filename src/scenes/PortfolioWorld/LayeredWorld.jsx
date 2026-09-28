import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers, layerRoot } from './layers.config.js'
import WorldAtmosphere, { WaterMist } from './WorldAtmosphere.jsx'
import FlowingWater from './FlowingWater.jsx'
import BasinWater from './BasinWater.jsx'
import IslandLife from './IslandLife.jsx'
import WorldHUD from './WorldHUD.jsx'
import useWorldWalk from './useWorldWalk.js'
import { HudIcon, IslandPlaque } from './HudDetails.jsx'
import './IslandLife.css'
import './LayeredWorld.css'
import './WorldAtmosphere.css'
import './WorldHUD.css'

const characterRoot='/assets/production/images/project-gallery/character/'
const visited=()=>{try{return sessionStorage.getItem('world-travel-seen')==='true'}catch{return false}}
const firstGuide=()=>{try{return sessionStorage.getItem('world-guide-seen')!=='true'}catch{return true}}

export default function LayeredWorld(){
 const {reduced,tone}=usePortfolioUI(),navigate=useNavigate(),location=useLocation()
 const root=useRef(null),camera=useRef(null),timeline=useRef(null),deadline=useRef(null),pointerType=useRef('mouse')
 const [hidden,setHidden]=useState(document.hidden),[onscreen,setOnscreen]=useState(true)
 const [selected,setSelected]=useState(null),[hovered,setHovered]=useState(null),[entering,setEntering]=useState(null),[failed,setFailed]=useState({})
 const [guide,setGuide]=useState(firstGuide),[bearing,setBearing]=useState(0)
 const dismissGuide=useCallback(()=>{setGuide(false);try{sessionStorage.setItem('world-guide-seen','true')}catch{/* optional storage */}},[])
 const cancelTravel=useCallback(()=>{timeline.current?.kill();clearTimeout(deadline.current);timeline.current=null;setEntering(null);if(camera.current)gsap.set(camera.current,{scale:1});if(root.current)gsap.set(root.current.querySelector('.lw-entry-veil'),{opacity:0})},[])
 const manual=useCallback(()=>{dismissGuide();cancelTravel()},[dismissGuide,cancelTravel])
 // Back can interrupt React's destination commit before this scene unmounts.
 useEffect(()=>{cancelTravel()},[location.key,cancelTravel])
 useEffect(()=>{window.addEventListener('popstate',cancelTravel);return()=>window.removeEventListener('popstate',cancelTravel)},[cancelTravel])
 const player=useWorldWalk({reduced,hidden,onManual:manual})
 const near=player.x>29&&player.y<90
 const activeId=hovered||selected||(near?'projects':null)
 const running=!reduced&&!hidden&&onscreen
 useEffect(()=>{if(!guide)return;const timer=setTimeout(dismissGuide,3000);return()=>clearTimeout(timer)},[guide,dismissGuide])
 useEffect(()=>{
  const measure=()=>{const island=root.current?.querySelector(`[data-island="${activeId}"]`),person=root.current?.querySelector('.lw-explorer');if(!island||!person)return;const a=island.getBoundingClientRect(),p=person.getBoundingClientRect();setBearing(Math.atan2(a.x+a.width/2-p.x-p.width/2,p.bottom-a.y-a.height*.45)*180/Math.PI)}
  measure();window.addEventListener('resize',measure);return()=>window.removeEventListener('resize',measure)
 },[activeId,player.x,player.y])
 useEffect(()=>{const visibility=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',visibility);const ob=new IntersectionObserver(([e])=>setOnscreen(e.isIntersecting),{threshold:.05});ob.observe(camera.current);return()=>{ob.disconnect();document.removeEventListener('visibilitychange',visibility);timeline.current?.kill();clearTimeout(deadline.current)}},[])
 useEffect(()=>{if(reduced&&entering){timeline.current?.kill();clearTimeout(deadline.current);navigate(entering.route)}},[reduced,entering,navigate])
 const fail=id=>setFailed(old=>({...old,[id]:true}))
 const enter=useCallback((e,island)=>{
  if((e.button!==undefined&&e.button!==0)||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return
  e.preventDefault();dismissGuide();cancelTravel()
  if(reduced){navigate(island.route);return}
  setEntering(island);setSelected(island.id);setHovered(null);tone()
  const finish=()=>{try{sessionStorage.setItem('world-travel-seen','true')}catch{/* optional storage */}navigate(island.route)}
  const duration=visited()?.6:1.45
  deadline.current=setTimeout(finish,(duration+.25)*1000)
  const target=root.current.querySelector(`[data-island="${island.id}"]`),b=camera.current.getBoundingClientRect(),t=target.getBoundingClientRect()
  try{timeline.current=gsap.timeline({onComplete:()=>{clearTimeout(deadline.current);finish()}})
   .to(camera.current,{transformOrigin:`${t.x+t.width/2-b.x}px ${t.y+t.height*.4-b.y}px`,scale:3,duration:duration-.15,ease:'power2.inOut'},.15)
   .to(root.current.querySelector('.lw-entry-veil'),{opacity:1,duration:duration*.35},duration*.65)
  }catch{clearTimeout(deadline.current);finish()}
 },[cancelTravel,dismissGuide,navigate,reduced,tone])
 useEffect(()=>{const action=e=>{if(!activeId||!['Enter','e','E'].includes(e.key)||e.target.closest?.('a,button,summary,input,textarea,select,[data-hud-panel]'))return;if(e.key!=='Enter'&&!near)return;enter(e,islandLayers.find(i=>i.id===activeId))};window.addEventListener('keydown',action);return()=>window.removeEventListener('keydown',action)},[activeId,near,enter])
 function chooseIsland(e,i){const touch=e.nativeEvent.pointerType==='touch'||(e.detail>0&&pointerType.current==='touch');if(touch&&selected!==i.id){e.preventDefault();dismissGuide();setHovered(null);setSelected(i.id);return}enter(e,i)}
 const looking=Boolean(activeId)&&!player.moving
 const view=looking?(Math.abs(bearing)>55?'side':'back'):player.view
 const facing=looking?(bearing<0?1:-1):player.facing
 return <main id="main" ref={root} className={`layered-world ${entering?'is-entering':''}`} data-paused={!running} data-selected={activeId} aria-describedby="world-movement-help" onPointerDownCapture={e=>{pointerType.current=e.pointerType;dismissGuide()}}>
  <p className="lw-sr" id="world-movement-help">방향키 또는 WASD로 전망대 안에서 이동합니다. Tab으로 섬을 선택하고 Enter로 입장할 수 있습니다. 이동 중 방향키를 누르면 카메라 이동을 취소합니다. 상단 내비게이션과 나침반 지도에서도 콘텐츠에 접근할 수 있습니다.</p>
  <div className="lw-viewport">
   <div className="lw-scene" ref={camera}>
    <img className="lw-backdrop" src={`${layerRoot}background-native.webp`} alt="" fetchPriority="high" onError={()=>fail('background')} />
    {failed.background&&<div className="lw-backdrop-fallback"/>}
    <img className="lw-distant-basin" src={`${layerRoot}distant-basin-native.webp`} alt=""/>
    <BasinWater running={running}/>
    <img className="lw-cloud lw-cloud-far" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-ship lw-ship-far" src={`${layerRoot}airship.webp`} alt=""/>
    <div className="lw-bridges" aria-hidden="true"><img className="lw-bridge b1" src={`${layerRoot}bridge.webp`} alt=""/><img className="lw-bridge b2" src={`${layerRoot}bridge.webp`} alt=""/><img className="lw-bridge b3" src={`${layerRoot}bridge.webp`} alt=""/></div>
    <nav aria-label="세계의 다섯 목적지" className="lw-islands">
     {islandLayers.map(i=><Link key={i.id} to={i.route} data-island={i.id} className={`lw-island lw-${i.id} ${activeId===i.id?'is-selected':''}`} aria-label={`${i.title} 탐색`} aria-describedby={`island-hint-${i.id}`} style={{left:`${i.x}%`,top:`${i.y}%`,width:`${i.w}%`,'--duration':`${i.duration}s`,'--phase':`${i.phase}s`,'--drift':`${i.drift}px`,'--label':`${i.label}%`}} onPointerEnter={e=>{if(e.pointerType!=='touch'){setHovered(i.id);dismissGuide()}}} onPointerLeave={()=>setHovered(null)} onFocus={()=>{setHovered(i.id);dismissGuide()}} onBlur={()=>setHovered(null)} onClick={e=>chooseIsland(e,i)}>
      <div className="lw-float"><div className="lw-response">
       {!failed[i.id]&&<><img className="lw-island-art" src={`${layerRoot}${i.art||`${i.id}-identity-v7.webp`}`} alt="" width="1600" height="1600" onError={()=>fail(i.id)}/><IslandLife id={i.id}/><FlowingWater island={i} running={running}/><WaterMist island={i}/></>}
       <span className={`lw-label ${failed[i.id]?'lw-label-fallback':''}`}><IslandPlaque/>{i.id!=='projects'&&<HudIcon name={i.id} className="lw-label-icon"/>}<span className="lw-waypoint" aria-hidden="true">◆</span><strong>{i.title}</strong><small>{i.subtitle}</small><span className="lw-label-hint" id={`island-hint-${i.id}`}>{i.id==='projects'?'4 PROJECTS · ':''}EXPLORE →</span></span>
      </div></div>
     </Link>)}
    </nav>
    <img className="lw-cloud lw-cloud-mid" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-cloud lw-cloud-near" src={`${layerRoot}cloud.webp`} alt=""/>
    <img className="lw-ship lw-ship-near" src={`${layerRoot}airship.webp`} alt=""/>
    <div className="lw-foreground" aria-hidden="true"><img className="lw-lookout" src={`${layerRoot}lookout-terrace-v10.webp`} alt=""/>
     <div className="lw-explorer" data-moving={player.moving} data-x={player.x.toFixed(2)} data-y={player.y.toFixed(2)} data-heading={player.heading} style={{left:`${player.x}%`,top:`${player.y}%`,'--facing':view==='side'?facing:1}}>
      <span className="lw-player-shadow"/><div className="lw-player-body"><img className="lw-player-idle" src={`${characterRoot}${view}-idle.webp`} alt="" onError={e=>{if(e.currentTarget.dataset.fallback){e.currentTarget.hidden=true;return}e.currentTarget.dataset.fallback='true';e.currentTarget.src=`${layerRoot}character.webp`}}/>{!failed.sprite&&<span className="lw-player-stride"><img src={`${characterRoot}${view}-walk.webp`} alt="" onError={()=>fail('sprite')}/></span>}</div>
     </div>
    </div>
    <WorldAtmosphere/>
    <div className="lw-entry-veil"/>
   </div>
  </div>
  <WorldHUD selected={activeId} entering={entering} onEnter={enter} heading={looking?bearing:player.heading} bearing={bearing} guide={guide} onDismissGuide={dismissGuide} near={near} moving={player.moving}/>
  {entering&&<div className="lw-status"><span role="status">{entering.title}에 들어가는 중</span><Link to={entering.route}>바로 이동 ↗</Link></div>}
 </main>
}


