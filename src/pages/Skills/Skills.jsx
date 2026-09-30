import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import useGalleryWalk from '../Projects/useGalleryWalk.js'
import { projects } from '../../data/content.js'
import { chamberSkills as skills } from './skillData.js'
import useSkillOrbit from './useSkillOrbit.js'
import SkillIcon from './SkillIcon.jsx'
import SkillCharacter from './SkillCharacter.jsx'
import './Skills.css'
import './SkillHUD.css'
import './SkillNexus.css'
import './SkillDetail.css'
import LivingEnvironment from '../../components/LivingEnvironment.jsx'
import './SkillsNatural.css'
import useSkillFloor, { constrainSkillFloor } from './useSkillFloor.js'

export default function Skills(){
 const {reduced,paused}=usePortfolioUI()
 const [selected,setSelected]=useState(null),[hovered,setHovered]=useState(null),[hidden,setHidden]=useState(document.hidden),[compact,setCompact]=useState(window.innerWidth<768),[used,setUsed]=useState(false),[near,setNear]=useState(null),[look,setLook]=useState(0)
 const [detailTab,setDetailTab]=useState('overview')
 const [collected]=useState(()=>skills.map(()=>false))
 const stage=useRef(null),floor=useRef(null),heading=useRef(null),lastOrb=useRef(null)
 const {player,go,stop,keyDown,keyUp}=useGalleryWalk({reduced,paused,hidden,initialPosition:{x:50,y:87},constrain:constrainSkillFloor,speed:14})
 const still=reduced||paused||hidden
 const area=useSkillFloor(stage)
 const highlighted=selected??hovered??(typeof near==='number'?near:null)
 const {nodes,positions}=useSkillOrbit({count:skills.length,selected,still,compact,collected,area,highlighted})
 const px=area.cx+(player.x-50)/41*area.rx,py=area.cy+(player.y-79.5)/14.5*area.ry
 const skill=selected===null?null:skills[selected]
 function activate(index,returnTarget){setDetailTab('overview');setNear(null);stop();setUsed(true);lastOrb.current=returnTarget||nodes.current[index];setSelected(index)}
 function close(){setSelected(null);requestAnimationFrame(()=>lastOrb.current?.focus({preventScroll:true}))}
 useEffect(()=>{const update=()=>setHidden(document.hidden),size=()=>setCompact(window.innerWidth<768);document.addEventListener('visibilitychange',update);window.addEventListener('resize',size);return()=>{document.removeEventListener('visibilitychange',update);window.removeEventListener('resize',size)}},[])
 useEffect(()=>{const timer=setTimeout(()=>setLook(hovered===null?0:(positions.current[hovered].x<px?-1:1)),240);return()=>clearTimeout(timer)},[hovered,px,positions])
 useEffect(()=>{const timer=setInterval(()=>{let best=null,distance=7;positions.current.forEach((p,i)=>{const d=Math.hypot(p.x-px,(p.y-py)*1.65);if(d<distance){distance=d;best=i}});setNear(best)},100);return()=>clearInterval(timer)},[px,py,positions])
 useEffect(()=>{if(selected!==null)heading.current?.focus({preventScroll:true})},[selected])
 useEffect(()=>{
  const down=e=>{
   if(e.key==='Escape'){stop();if(selected!==null)close();return}
   if(selected!==null && e.target.closest?.('.skill-detail'))return
   if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest?.('input,textarea,select,a,summary,[contenteditable="true"]')||(e.target.closest?.('button')&&e.target!==floor.current))return
   if(['e','E','Enter'].includes(e.key)&&near!==null){e.preventDefault();activate(near);return}
   if(/^Arrow/.test(e.key)||/^[wasd]$/i.test(e.key)){setUsed(true);setSelected(null);keyDown(e)}
  }
  window.addEventListener('keydown',down);window.addEventListener('keyup',keyUp);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',keyUp)}
 })
 function floorClick(e){if(e.detail===0)return;const r=stage.current.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;setUsed(true);setSelected(null);go({x:50+(x-area.cx)/area.rx*41,y:79.5+(y-area.cy)/area.ry*14.5});floor.current.focus({preventScroll:true})}
 return <main id="main" className="skill-chamber" data-still={still} data-selected={selected!==null}>
  <div className="skill-stage" ref={stage}>
   <img draggable="false" className="skill-environment" src="/assets/production/images/natural-world/skills-room-v1.webp" alt="" fetchPriority="high" onError={e=>{e.currentTarget.hidden=true}}/>
   <LivingEnvironment variant="ruins"/>
   <button ref={floor} className="skill-floor" aria-label="신전 바닥: 클릭 또는 WASD·방향키로 이동" aria-describedby="skill-controls" onClick={floorClick} onBlur={stop}/>
   <nav className="skill-orbits" aria-label="작업에 사용하는 기술 선택">{skills.map((s,i)=><button key={s.id} ref={n=>{nodes.current[i]=n}} className="skill-orb" data-active={selected===i} data-near={highlighted===i} data-collected={collected[i]} aria-label={s.name+' · '+s.role} aria-pressed={selected===i} style={{'--skill-color':s.color,'--orb-hue':s.hue+'deg','--float-delay':(-i*.7)+'s'}} onPointerEnter={()=>setHovered(i)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(i)} onBlur={()=>setHovered(null)} onClick={()=>activate(i)}><span className="skill-orb-art"><span className="skill-logo"><SkillIcon id={s.id}/></span></span><span className="skill-orb-label">{s.name}</span></button>)}</nav>


   {near!==null&&!compact&&<div className="nexus-prompt" style={{left:px+'%',top:py+'%'}}><kbd>E</kbd> {skills[near].name + ' 살펴보기'}</div>}
   <SkillCharacter player={player} x={px} y={py} look={look} still={still} selected={selected!==null}/>
  </div>
  <header className="nexus-title"><h1>Tools & Craft</h1><p>기술을 선택하면 작업 방식과 적용 프로젝트를 볼 수 있습니다.</p></header><div className="nexus-side-copy">코드로<br/>상상을 현실로,<br/>새로운 세상을<br/>만듭니다.<i/>TURN IDEAS<br/>INTO<br/>INTERACTIVE WORLDS.</div>
  <div className="skill-controls" id="skill-controls" data-used={used}>

   <div className="skill-move-keys"><span className="skill-key-grid"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span><span>이동</span></div>
   <div className="skill-action-key"><kbd>E</kbd><span>활성화</span></div>

  </div>

  {skill&&<div className="skill-detail-aura" aria-hidden="true"/>}
  {skill&&<div className="skill-display-gem" aria-hidden="true"/>}
  {skill&&<aside key={skill.id} className="skill-detail" aria-labelledby="skill-detail-title" style={{'--skill-color':skill.color}}><svg className="skill-detail-frame" viewBox="0 0 360 460" preserveAspectRatio="none" aria-hidden="true"><path className="detail-frame-cyan" d="M20 2H340L358 20V440L340 458H20L2 440V20Z"/><path className="detail-frame-inner" d="M24 8H336L352 24V436L336 452H24L8 436V24Z"/><path className="detail-frame-accents" d="M3 62V20L20 3H76 M284 3H340L357 20V62 M3 398V440L20 457H76 M284 457H340L357 440V398"/></svg><div className="skill-detail-scroll"><div className="skill-detail-top"><span><i aria-hidden="true">✧</i> SYSTEM · SKILL <small>{String(selected+1).padStart(2,'0')} / {skills.length}</small></span><button onClick={close} aria-label="기술 상세 닫기">×</button></div><div className="skill-detail-title"><span><SkillIcon id={skill.id}/></span><div><h2 ref={heading} id="skill-detail-title" tabIndex="-1">{skill.name}</h2><p>{skill.role}</p></div></div><div className="skill-detail-tabs" role="group" aria-label="스킬 상세 내용"><button aria-pressed={detailTab==='overview'} aria-controls="skill-overview" onClick={()=>setDetailTab('overview')}>설명</button><button aria-pressed={detailTab==='projects'} aria-controls="skill-projects" onClick={()=>setDetailTab('projects')}>사용 프로젝트</button></div><div className="skill-detail-body"><section id="skill-overview" hidden={detailTab!=='overview'} aria-label="스킬 설명"><p className="skill-detail-copy">{skill.detail}</p><ul className="skill-tags">{skill.tags.map(t=><li key={t}>{t}</li>)}</ul></section><section id="skill-projects" hidden={detailTab!=='projects'} aria-label="사용 프로젝트"><div className="skill-related"><h3>관련 프로젝트</h3>{skill.projects.map(id=>{const p=projects.find(p=>p.id===id);return <Link key={id} to={'/projects/'+id}><img src={'/assets/production/images/project-gallery/'+id+'.webp'} alt="" onError={e=>{e.currentTarget.hidden=true}}/><strong>{p.english}</strong><small>{p.role}</small><span>→</span></Link>})}{skill.portfolio&&<Link to="/world-map"><strong>PERSONAL PORTFOLIO</strong><small>현재 포트폴리오의 구현과 시각 자산</small><span>→</span></Link>}{!skill.projects.length&&!skill.portfolio&&<p>검증된 적용 프로젝트를 준비하고 있습니다.</p>}</div></section></div><div className="skill-detail-switch"><button onClick={()=>activate((selected+skills.length-1)%skills.length)} aria-label="이전 기술">←</button><span>EXPLORE THE TOOLS</span><button onClick={()=>activate((selected+1)%skills.length)} aria-label="다음 기술">→</button></div></div></aside>}
 </main>
}
