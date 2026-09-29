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
const root='/assets/production/images/skill-chamber/'
export default function Skills(){
 const {reduced,paused,setPaused}=usePortfolioUI()
 const [selected,setSelected]=useState(null),[hovered,setHovered]=useState(null),[hidden,setHidden]=useState(document.hidden),[compact,setCompact]=useState(window.innerWidth<768),[used,setUsed]=useState(false),[near,setNear]=useState(null),[look,setLook]=useState(0)
 const stage=useRef(null),floor=useRef(null),heading=useRef(null),lastOrb=useRef(null)
 const {player,go,stop,keyDown,keyUp}=useGalleryWalk({reduced,paused,hidden,initialPosition:{x:50,y:92}})
 const still=reduced||paused||hidden
 const {nodes,positions}=useSkillOrbit({count:skills.length,selected,hovered,still,compact})
 const py=60+(player.y-65)*1.08,span=py>76?Math.max(5,13-(py-76)*.5):28
 const px=44+Math.max(-span,Math.min(span,(player.x-50)*.68))
 const skill=selected===null?null:skills[selected]
 function activate(index){stop();setUsed(true);lastOrb.current=nodes.current[index];setSelected(index)}
 function close(){setSelected(null);requestAnimationFrame(()=>lastOrb.current?.focus({preventScroll:true}))}
 useEffect(()=>{const update=()=>setHidden(document.hidden),size=()=>setCompact(window.innerWidth<768);document.addEventListener('visibilitychange',update);window.addEventListener('resize',size);return()=>{document.removeEventListener('visibilitychange',update);window.removeEventListener('resize',size)}},[])
 useEffect(()=>{const timer=setTimeout(()=>setLook(hovered===null?0:(positions.current[hovered].x<px?-1:1)),240);return()=>clearTimeout(timer)},[hovered,px,positions])
 useEffect(()=>{const timer=setInterval(()=>{let best=null,distance=13;positions.current.forEach((p,i)=>{const d=Math.hypot(p.x-px,(66+(p.y-40)*.24-py)*1.5);if(d<distance){distance=d;best=i}});setNear(best)},160);return()=>clearInterval(timer)},[px,py,positions])
 useEffect(()=>{if(selected!==null)heading.current?.focus({preventScroll:true})},[selected])
 useEffect(()=>{
  const down=e=>{
   if(e.key==='Escape'){stop();if(selected!==null)close();return}
   if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest?.('input,textarea,select,a,summary,[contenteditable="true"]')||(e.target.closest?.('button')&&e.target!==floor.current))return
   if(['e','E','Enter'].includes(e.key)&&near!==null){e.preventDefault();activate(near);return}
   if(/^Arrow/.test(e.key)||/^[wasd]$/i.test(e.key)){setUsed(true);setSelected(null);keyDown(e)}
  }
  window.addEventListener('keydown',down);window.addEventListener('keyup',keyUp);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',keyUp)}
 })
 function floorClick(e){if(e.detail===0)return;const r=stage.current.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;setUsed(true);setSelected(null);go({x:50+(x-44)/.68,y:65+(y-60)/1.08});floor.current.focus({preventScroll:true})}
 return <main id="main" className="skill-chamber" data-still={still} data-selected={selected!==null}>
  <div className="skill-stage" ref={stage}>
   <img className="skill-environment" src={root+'temple.webp'} alt="" fetchPriority="high" onError={e=>{e.currentTarget.hidden=true}}/>
   <div className="skill-atmosphere" aria-hidden="true"/><div className="skill-beam" aria-hidden="true"/>
   <div className="skill-core" aria-hidden="true" style={{'--skill-color':skill?.color||'#79e7ff'}}><img src={root+'core.webp'} alt="" onError={e=>{e.currentTarget.hidden=true}}/><div>✧<strong>SKILL CORE</strong><small>TOOLS CREATE<br/>A BRIGHTER TOMORROW</small></div></div>
   <button ref={floor} className="skill-floor" aria-label="신전 바닥: 클릭 또는 WASD·방향키로 이동" aria-describedby="skill-controls" onClick={floorClick} onBlur={stop}/>
   <nav className="skill-orbits" aria-label="기술 크리스털 선택">{skills.map((s,i)=><button key={s.id} ref={n=>{nodes.current[i]=n}} className="skill-orb" data-active={selected===i} data-near={near===i||hovered===i} aria-label={s.name+' · '+s.role} aria-pressed={selected===i} style={{left:positions.current[i].x+'%',top:positions.current[i].y+'%','--skill-color':s.color,'--orb-hue':s.hue+'deg','--float-delay':(-i*.7)+'s'}} onPointerEnter={()=>setHovered(i)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(i)} onBlur={()=>setHovered(null)} onClick={()=>activate(i)}><span className="skill-orb-art"><img src={root+'orb.webp'} alt="" onError={e=>{e.currentTarget.hidden=true}}/><span className="skill-logo"><SkillIcon id={s.id}/></span>{selected===i&&<span key={s.id} className={'skill-micro effect-'+s.effect} aria-hidden="true">✧</span>}</span><span className="skill-orb-label">{s.name}<small>{s.role}</small></span></button>)}</nav>
   <SkillCharacter player={player} x={px} y={py} look={look} still={still} selected={selected!==null}/>
  </div>
  <section className="skill-intro"><p>SKILLS</p><h1 tabIndex="-1">배움을 넘어,<br/>더 나은 가능성으로.</h1><p>다양한 도구로 더 좋은 결과를 만들고<br/>새로운 경험을 쌓아가고 있습니다.</p><i/><small>MORE THAN TOOLS<br/>A BRIGHTER TOMORROW</small></section>
  <aside className="skill-motto" aria-hidden="true">Better Tools<br/>A Brighter<br/>Tomorrow</aside>
  <div className="skill-controls" id="skill-controls" data-used={used}><span><kbd>WASD / ↑↓←→</kbd> 이동</span><span><kbd>E / Enter</kbd> 활성화</span><span>클릭 / 탭으로 선택</span><button onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'모션 재생':'모션 일시정지'}</button></div>
  <nav className="skill-direct" aria-label="기술 바로 선택">{skills.map((s,i)=><button key={s.id} aria-pressed={selected===i} onClick={()=>activate(i)}>{s.name}</button>)}</nav>
  {skill&&<aside className="skill-detail" aria-labelledby="skill-detail-title" style={{'--skill-color':skill.color}}><div className="skill-detail-top"><span>{String(selected+1).padStart(2,'0')} / {skills.length}</span><button onClick={close} aria-label="기술 상세 닫기">×</button></div><div className="skill-detail-title"><span><SkillIcon id={skill.id}/></span><div><h2 ref={heading} id="skill-detail-title" tabIndex="-1">{skill.name}</h2><p>{skill.role}</p></div></div><p className="skill-detail-copy">{skill.detail}</p><ul className="skill-tags">{skill.tags.map(t=><li key={t}>{t}</li>)}</ul><div className="skill-related"><h3>관련 프로젝트</h3>{skill.projects.map(id=>{const p=projects.find(p=>p.id===id);return <Link key={id} to={'/projects/'+id}><img src={'/assets/production/images/project-gallery/'+id+'.webp'} alt="" onError={e=>{e.currentTarget.hidden=true}}/><strong>{p.english}</strong><small>{p.role}</small><span>→</span></Link>})}{skill.portfolio&&<Link to="/world-map"><strong>PERSONAL PORTFOLIO</strong><small>현재 포트폴리오의 구현과 시각 자산</small><span>→</span></Link>}{!skill.projects.length&&!skill.portfolio&&<p>검증된 적용 프로젝트를 준비하고 있습니다.</p>}</div><div className="skill-detail-switch"><button onClick={()=>activate((selected+skills.length-1)%skills.length)} aria-label="이전 기술">←</button><span>EXPLORE THE TOOLS</span><button onClick={()=>activate((selected+1)%skills.length)} aria-label="다음 기술">→</button></div></aside>}
 </main>
}
