import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers, layerRoot, recommendedDestination, rememberDestination, readWorldVisits } from './layers.config.js'
import WorldAtmosphere, { WaterMist } from './WorldAtmosphere.jsx'
import FlowingWater from './FlowingWater.jsx'
import IslandLife from './IslandLife.jsx'
import WorldHUD from './WorldHUD.jsx'
import WorldCharacter from './WorldCharacter.jsx'
import IslandRibbon from './IslandRibbon.jsx'
import useWorldWalk from './useWorldWalk.js'
import './IslandLife.css'
import './LayeredWorld.css'
import './WorldAtmosphere.css'
import './WorldHUD.css'
import './WorldRefinement.css'
import './IslandOrbit.css'

const firstGuide=()=>{try{return sessionStorage.getItem('world-guide-seen')!=='true'}catch{return true}}
const shortestHeading=(from,to)=>from+(((to-from)%360+540)%360)-180

export default function LayeredWorld(){
 const {reduced,tone}=usePortfolioUI(),navigate=useNavigate(),location=useLocation()
 const root=useRef(null),camera=useRef(null),timeline=useRef(null),deadline=useRef(null),pointerType=useRef('mouse'),islandNav=useRef(null),travelTarget=useRef(null),railIndex=useRef(0)
 const [hidden,setHidden]=useState(document.hidden),[onscreen,setOnscreen]=useState(true)
 const [selected,setSelected]=useState(null),[hovered,setHovered]=useState(null),[entering,setEntering]=useState(null),[failed,setFailed]=useState({})
 const [initialAttention,setInitialAttention]=useState(true),[guide,setGuide]=useState(firstGuide),[bearing,setBearing]=useState(0)
 const [panelOpen,setPanelOpen]=useState(false),[mobileIndex,setMobileIndex]=useState(0),[recommended]=useState(recommendedDestination)
 const dismissGuide=useCallback(()=>{setGuide(false);try{sessionStorage.setItem('world-guide-seen','true')}catch{/* optional storage */}},[])
 const cancelTravel=useCallback(()=>{
  timeline.current?.kill();clearTimeout(deadline.current);timeline.current=null;travelTarget.current=null;setEntering(null);setSelected(null)
  if(camera.current)gsap.set(camera.current,{scale:1})
  if(root.current)gsap.set(root.current.querySelector('.lw-entry-veil'),{opacity:0})
 },[])
 const manual=useCallback(()=>{dismissGuide();setInitialAttention(false);setSelected(null);setHovered(null)},[dismissGuide])
 useEffect(()=>{cancelTravel()},[location.key,cancelTravel])
 useEffect(()=>{window.addEventListener('popstate',cancelTravel);return()=>window.removeEventListener('popstate',cancelTravel)},[cancelTravel])
 const player=useWorldWalk({reduced,hidden,sceneRef:camera,blocked:panelOpen||Boolean(entering),onManual:manual})
 const focusId=entering?.id||hovered||selected
 const lookId=entering?.id||(!player.moving&&!panelOpen?(hovered||(initialAttention?'about':null)):null)
 const running=!reduced&&!hidden&&onscreen
 const recommendVisible=!focusId&&!panelOpen&&Boolean(recommended)
 useEffect(()=>{if(!guide)return;const timer=setTimeout(dismissGuide,2700);window.addEventListener('keydown',dismissGuide,{once:true});return()=>{clearTimeout(timer);window.removeEventListener('keydown',dismissGuide)}},[guide,dismissGuide])
 useEffect(()=>{
  const measure=()=>{
   const scene=camera.current,person=root.current?.querySelector('.lw-explorer')
   if(!scene||!person)return
   const p=person.getBoundingClientRect()
   const island=root.current.querySelector(`[data-island="${lookId}"]`)
   if(island){const a=island.getBoundingClientRect(),target=Math.atan2(a.x+a.width/2-p.x-p.width/2,p.bottom-a.y-a.height*.4)*180/Math.PI;setBearing(previous=>shortestHeading(previous,target))}
   else setBearing(previous=>shortestHeading(previous,player.heading))
  }
  measure();window.addEventListener('resize',measure);return()=>window.removeEventListener('resize',measure)
 },[lookId,player.x,player.y,player.heading,recommended])
 useEffect(()=>{
  const visibility=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',visibility)
  const ob=new IntersectionObserver(([e])=>setOnscreen(e.isIntersecting),{threshold:.05});ob.observe(camera.current)
  return()=>{ob.disconnect();document.removeEventListener('visibilitychange',visibility);timeline.current?.kill();clearTimeout(deadline.current)}
 },[])
 // Alter playback rate without changing animation duration/currentTime (no phase jumps).
 useEffect(()=>{
  if(!root.current)return
  root.current.querySelectorAll('.lw-float,.lw-landmark-life *,.lw-spray,.lw-cloud,.lw-ship,.lw-cloud-bank,.lw-cloud-bank img,.lw-haze-ribbon,.lw-flock,.lw-leaf-flight').forEach(node=>{
   const island=node.closest('[data-island]'),rate=focusId&&island?.dataset.island!==focusId? .6:1
   node.getAnimations().forEach(animation=>animation.updatePlaybackRate(rate))
  })
 },[focusId])
 useEffect(()=>{
  const nav=islandNav.current
  const update=()=>{if(!matchMedia('(max-aspect-ratio: 1/1)').matches)return;const b=nav.getBoundingClientRect();let closest=0,distance=Infinity;[...nav.children].forEach((e,i)=>{const a=e.getBoundingClientRect(),d=Math.abs(a.x+a.width/2-b.x-b.width/2);if(d<distance){closest=i;distance=d}});if(closest!==railIndex.current){railIndex.current=closest;if(!travelTarget.current){setSelected(null);setHovered(null)}}setMobileIndex(closest)}
  nav.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update()
  return()=>{nav.removeEventListener('scroll',update);window.removeEventListener('resize',update)}
 },[])
 const finishTravel=useCallback(island=>{rememberDestination(island.id);navigate(island.route)},[navigate])
 useEffect(()=>{if(reduced&&entering){timeline.current?.kill();clearTimeout(deadline.current);travelTarget.current=null;finishTravel(entering)}},[reduced,entering,finishTravel])
 const enter=useCallback((e,island)=>{
  if(!island||(e.button!==undefined&&e.button!==0)||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return
  e.preventDefault();dismissGuide();cancelTravel()
  if(reduced||readWorldVisits().includes(island.id)){finishTravel(island);return}
  setInitialAttention(false);setEntering(island);setSelected(island.id);setHovered(null);tone();travelTarget.current=island.id
  const finish=()=>{if(travelTarget.current!==island.id)return;travelTarget.current=null;clearTimeout(deadline.current);finishTravel(island)}
  deadline.current=setTimeout(finish,1850)
  const target=root.current?.querySelector(`[data-island="${island.id}"]`)
  if(!target||!camera.current){finish();return}
  if(matchMedia('(max-aspect-ratio: 1/1)').matches){const nav=islandNav.current;nav.scrollTo({left:target.offsetLeft-(nav.clientWidth-target.clientWidth)/2,behavior:'instant'})}
  const b=camera.current.getBoundingClientRect(),t=target.getBoundingClientRect()
  try{timeline.current=gsap.timeline({onComplete:finish})
   .to(camera.current,{transformOrigin:`${t.x+t.width/2-b.x}px ${t.y+t.height*.4-b.y}px`,scale:2.8,duration:1.05,ease:'power2.inOut'},.5)
   .to(root.current.querySelector('.lw-entry-veil'),{opacity:1,duration:.45},1.1)
  }catch{finish()}
 },[cancelTravel,dismissGuide,reduced,finishTravel,tone])
 useEffect(()=>{
  const action=e=>{
   if(e.key==='Escape'&&!panelOpen){cancelTravel();setHovered(null);return}
   if(panelOpen||entering||!selected||!['Enter','e','E'].includes(e.key)||e.target.closest?.('a,button,summary,input,textarea,select,[data-hud-panel]'))return
   enter(e,islandLayers.find(i=>i.id===selected))
  }
  window.addEventListener('keydown',action);return()=>window.removeEventListener('keydown',action)
 },[selected,panelOpen,entering,enter,cancelTravel])
 const hover=useCallback(id=>{if(travelTarget.current||panelOpen)return;setHovered(id);if(id){setInitialAttention(false);dismissGuide()}},[panelOpen,dismissGuide])
 function chooseIsland(e,i){
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return
  const touch=e.nativeEvent.pointerType==='touch'||(e.detail>0&&pointerType.current==='touch')
  if(touch&&selected!==i.id){e.preventDefault();dismissGuide();setHovered(null);setSelected(i.id);return}
  enter(e,i)
 }
 function browse(index){dismissGuide();setSelected(null);setHovered(null);const nav=islandNav.current,item=nav.children[index];if(!item)return;nav.scrollTo({left:item.offsetLeft-(nav.clientWidth-item.clientWidth)/2,behavior:reduced?'instant':'smooth'})}
 const reset=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();cancelTravel();setHovered(null);browse(0)}
 return <main id="main" ref={root} className={`layered-world world-refined ${entering?'is-entering':''}`} data-paused={!running} data-focus={focusId||undefined} data-selected={selected||undefined} aria-describedby="world-movement-help" onPointerDownCapture={e=>{pointerType.current=e.pointerType;dismissGuide()}} onKeyDownCapture={dismissGuide}>
  <h1 className="lw-sr">Portfolio World</h1>
  <p className="lw-sr" id="world-movement-help">방향키 또는 WASD로 전망대 안에서 이동합니다. Tab으로 목적지를 선택하고 Enter로 입장합니다. 이동 중 Escape로 취소할 수 있습니다. 상단 메뉴로 모든 목적지에 접근할 수 있습니다.</p>
  <div className="lw-viewport"><div className="lw-scene" ref={camera}>
   <img className="lw-backdrop" src={`${layerRoot}background-golden-v11.webp`} alt="" fetchPriority="high" onError={()=>setFailed(s=>({...s,background:true}))}/>
   {failed.background&&<div className="lw-backdrop-fallback"/>}<div className="world-distance-haze" aria-hidden="true"/>
   <img className="lw-cloud lw-cloud-far" src={`${layerRoot}cloud.webp`} alt=""/>
   <img className="lw-ship lw-ship-far" src={`${layerRoot}airship.webp`} alt=""/>
   <div className="lw-bridges" aria-hidden="true">{[1,2,3].map(i=><img key={i} className={`lw-bridge b${i}`} src={`${layerRoot}bridge.webp`} alt=""/>)}</div>
   <nav ref={islandNav} aria-label="세계의 네 목적지" className="lw-islands">
    {islandLayers.map(i=>{
     const isSelected=(entering?.id||selected)===i.id,isHovered=!entering&&hovered===i.id,isFocused=focusId===i.id
     return <Link key={i.id} to={i.route} data-island={i.id} data-recommended={recommendVisible&&recommended===i.id} data-focus={isFocused} data-entering={entering?.id===i.id} className={`lw-island lw-${i.id} ${isSelected?'is-selected':''} ${isHovered?'is-hovered':''} ${isFocused?'is-reacting':''}`} aria-label={`${i.number} ${i.title} 탐색${recommended===i.id?' · 추천 목적지':''}`} style={{left:`${i.x}%`,top:`${i.y}%`,width:`${i.w}%`,'--duration':`${i.duration}s`,'--phase':`${i.phase}s`,'--drift':`${i.drift}px`,'--label':`${i.label}%`}} onPointerEnter={e=>{if(e.pointerType!=='touch')hover(i.id)}} onPointerLeave={()=>hover(null)} onFocus={()=>{if(pointerType.current!=='touch')hover(i.id)}} onBlur={()=>hover(null)} onClick={e=>chooseIsland(e,i)}>
      <div className="lw-float"><div className="lw-response">
       {!failed[i.id]&&<><img className="lw-island-art" src={`${layerRoot}${i.art}`} alt="" width="1254" height="1254" onError={()=>setFailed(s=>({...s,[i.id]:true}))}/><IslandLife id={i.id}/><FlowingWater island={i} running={running} speed={focusId&&!isFocused? .6:1}/><WaterMist island={i}/></>}
       <span className="lw-label lw-ribbon-label"><IslandRibbon title={i.title}/></span>
      </div></div>
     </Link>
    })}
   </nav>
   <img className="lw-cloud lw-cloud-mid" src={`${layerRoot}cloud.webp`} alt=""/>
   <img className="lw-cloud lw-cloud-near" src={`${layerRoot}cloud.webp`} alt=""/>
   <img className="lw-ship lw-ship-near" src={`${layerRoot}airship.webp`} alt=""/>
   <div className="lw-foreground" aria-hidden="true"><img className="lw-lookout" src={`${layerRoot}lookout-tree-v14.webp`} alt=""/>
    <WorldCharacter player={player} hovered={hovered||(initialAttention?'about':null)} selected={entering?.id} bearing={bearing} reduced={reduced} blocked={panelOpen}/>
   </div>
   <WorldAtmosphere/><div className="lw-entry-veil"/>
  </div></div>
  <WorldHUD selected={selected} entering={entering} onEnter={enter} onHover={hover} guide={guide} onDismissGuide={dismissGuide} moving={player.moving} onPanelChange={setPanelOpen} onReset={reset} bearing={bearing} mobileIndex={mobileIndex} onBrowse={browse}/>
  {entering&&<div className="lw-status"><span role="status">{entering.title}</span><Link to={entering.route}>바로 이동 ↗</Link><button type="button" onClick={cancelTravel}>취소</button></div>}
 </main>
}

