import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { islandLayers } from './layers.config.js'
import './WorldAtlas.css'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'

export default function WorldAtlas({onClose,reduced}){
 const {travelTo}=usePortfolioUI()
 const sail=(e,destination)=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();onClose();travelTo(destination.route,destination.title)}
 const dialog=useRef(null), paper=useRef(null), closing=useRef(false), animations=useRef([])
 const [folding,setFolding]=useState(false)
 const [selected,setSelected]=useState('projects')
 const current=islandLayers.find(i=>i.id===selected)
 useEffect(()=>{
  const previous=document.querySelector('.world-compass-ornament')||document.activeElement,node=dialog.current
  node.showModal()
  const short=matchMedia('(max-width:600px)').matches
  const duration=reduced?120:short?1100:1400
  const track=(el,frames)=>{const a=el.animate(frames,{duration,easing:'cubic-bezier(.45,0,.2,1)',fill:'both'});animations.current.push(a)}
  track(paper.current,reduced?[{opacity:0},{opacity:1}]:[{clipPath:'inset(0 49% round 14px)'},{clipPath:'inset(0 0% round 3px)'}])
  if(!reduced) node.querySelectorAll('.atlas-scroll-rod').forEach((rod,i)=>track(rod,[{translate:(i?'-':'')+(node.clientWidth/2-14)+'px 0'},{translate:'0 0'}]))
  return()=>{animations.current.forEach(a=>a.cancel());requestAnimationFrame(()=>{if(previous?.isConnected)previous.focus({preventScroll:true})})}
 },[reduced])
 const fold=()=>{
  if(closing.current)return
  closing.current=true;setFolding(true)
  const node=dialog.current, surface=paper.current
  const currentClip=getComputedStyle(surface).clipPath
  const rods=[...node.querySelectorAll('.atlas-scroll-rod')]
  const positions=rods.map(rod=>getComputedStyle(rod).translate)
  animations.current.forEach(a=>a.cancel())
  const duration=reduced?120:matchMedia('(max-width:600px)').matches?900:1100
  const timing={duration,easing:'cubic-bezier(.45,0,.55,1)',fill:'forwards'}
  const collapse=surface.animate(reduced?[{opacity:1},{opacity:0}]:[{clipPath:currentClip},{clipPath:'inset(0 49% round 14px)'}],timing)
  animations.current=[collapse]
  if(!reduced) rods.forEach((rod,i)=>animations.current.push(rod.animate([{translate:positions[i]},{translate:(i?'-':'')+(node.clientWidth/2-14)+'px 0'}],timing)))
  collapse.finished.then(onClose).catch(()=>{})
 }
 return <dialog ref={dialog} className="world-atlas captain-atlas" data-reduced={reduced} data-folding={folding} aria-labelledby="atlas-title" onCancel={e=>{e.preventDefault();fold()}} onClick={e=>{if(e.target===e.currentTarget)fold()}}>
  <div ref={paper} className="atlas-paper" inert={folding}>
   <header className="atlas-heading"><div><p>ATLAS OF THE SKY REALM</p><h2 id="atlas-title">구름 너머, 다음 이야기</h2></div><button onClick={fold} aria-label="지도 닫기">×</button></header>
   <p className="atlas-intro">나침반을 따라, 당신이 궁금한 세계로.</p>
   <div className="atlas-chart" data-selected={selected}>
    <svg className="atlas-routes" viewBox="0 0 800 420" preserveAspectRatio="none" aria-hidden="true"><path d="M155 130Q360 20 415 140T650 260M415 140Q290 220 270 305"/><path className="atlas-active-route" d={{about:'M415 140Q360 20 155 130',skills:'M415 140Q290 220 270 305',projects:'M270 305Q290 220 415 140',contact:'M415 140Q490 200 650 260'}[selected]}/></svg>
    {islandLayers.map(i=><Link key={i.id} to={i.route} onClick={e=>sail(e,i)} className={`atlas-island atlas-${i.id}`} aria-label={i.title+" 페이지로 이동"} onPointerEnter={e=>{if(e.pointerType==='mouse')setSelected(i.id)}} onFocus={()=>setSelected(i.id)} data-active={selected===i.id}><b className="atlas-pin" aria-hidden="true">✦</b><span>{i.title}</span><small>{i.description}</small></Link>)}
    <div className="atlas-rose" aria-hidden="true"><span style={{rotate:`${{about:-60,projects:0,skills:-140,contact:65}[selected]}deg`}}>✧</span><i>N</i></div>
   </div>
   <footer className="atlas-footer"><span><small>선택한 목적지</small>{current.title}<small>{current.description}</small></span><Link className="atlas-sail" to={current.route} onClick={e=>sail(e,current)}>이 세계로 이동 <span aria-hidden="true">→</span></Link></footer>
  </div>
  <i className="atlas-scroll-rod rod-left" aria-hidden="true"/><i className="atlas-scroll-rod rod-right" aria-hidden="true"/>
 </dialog>
}
