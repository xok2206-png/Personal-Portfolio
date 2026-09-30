import { Link } from 'react-router-dom'
const root='/assets/production/images/natural-world/exhibit-'
export default function ProjectPedestal({project:p,index,position:pos,active,selected,near,onSelect,onHover}){
 return <article className={`gallery-exhibit exhibit-${p.id} ${active?'is-active':''} ${selected?'is-selected':''}`} style={{left:`${pos.x}%`,top:`${pos.y}%`,width:`${pos.w}%`,height:`${pos.h}%`,zIndex:pos.z}} onPointerEnter={e=>{if(e.pointerType!=='touch')onHover(index)}} onPointerLeave={()=>onHover(null)} onFocus={()=>onHover(index)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))onHover(null)}}>
  <span className="exhibit-ring" aria-hidden="true"/>
  <button className="exhibit-approach" onClick={()=>onSelect(index)} aria-label={`${p.name} 선택`} aria-pressed={selected}>
   <img className="exhibit-art" src={`${root}${p.id}-v1.webp`} alt="" onError={e=>{e.currentTarget.hidden=true}}/>
   <img className="exhibit-reflection" src={`${root}${p.id}-v1.webp`} alt="" aria-hidden="true" onError={e=>{e.currentTarget.hidden=true}}/>
   <div className="exhibit-heading"><span>{p.num}</span><div><h2>{p.name}</h2><p>{p.description}</p></div></div>
  </button>
  {near&&<span className="gallery-interaction-hint"><kbd>E</kbd> / Enter 상호작용</span>}
  <Link className="exhibit-direct" to={`/projects/${p.id}`}>CASE STUDY ↗</Link>
 </article>
}
