import { useRef } from 'react'
import SkillIcon from './SkillIcon.jsx'
export default function SkillInventory({skills,selected,onSelect}){
 const bag=useRef(null)
 return <details className="skill-inventory" ref={bag} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();bag.current.open=false;bag.current.querySelector('summary').focus()}}}>
  <summary aria-label="아이템 상자 열기"><svg className="skill-item-chest" viewBox="0 0 160 140" aria-hidden="true">
   <defs><linearGradient id="chest-blue" x2="1" y2="1"><stop stopColor="#3b597a"/><stop offset="1" stopColor="#101d36"/></linearGradient></defs>
   <ellipse cx="80" cy="125" rx="65" ry="10" fill="#07102570"/>
   <path d="m18 66 105-4 20 14v40l-23 13-102-10Z" fill="url(#chest-blue)" stroke="#c5ac78" strokeWidth="2"/>
   <path d="m123 65-3 64M18 78l102 7 23-9M30 84v25l78 7V89" fill="none" stroke="#ae956377"/>
   <g className="chest-lid"><path d="M18 67V47Q18 28 40 28h78q22 0 25 24v24l-23 9Z" fill="url(#chest-blue)" stroke="#d6bc83" strokeWidth="2"/><path d="M18 67l102 8 23-13M120 75V54q0-23-18-26M42 29v41m56-42v46" fill="none" stroke="#c6ad78" strokeWidth="3"/></g>
   <path d="m72 76 14 2v19l-7 6-7-7Z" fill="#ddc58d"/><path d="m79 81 4 7-4 6-4-6Z" fill="#70ddf0"/>
   <path d="m18 96 11 2v19l-11-2m113-24 11-5v25l-11 6" fill="#bda374"/>
   <path className="chest-light" d="M32 57 12 8h134l-20 54Z" fill="#9eeaff" opacity=".15"/>
  </svg><span className="sr-only">아이템 상자</span></summary>
  <nav className="skill-direct" aria-label="기술 바로 선택"><header><span>TOOL COLLECTION</span><strong>당신의 다음 도구</strong><p>보석을 선택해 사용 경험을 확인하세요.</p></header><div className="skill-inventory-grid">{skills.map((s,i)=><button key={s.id} aria-pressed={selected===i} onClick={()=>{bag.current.open=false;onSelect(i,bag.current.querySelector('summary'))}} style={{'--skill-color':s.color,'--orb-hue':s.hue+'deg'}}><span className="skill-inventory-gem"><img src="/assets/production/images/skill-chamber/orb.webp" alt=""/><span><SkillIcon id={s.id}/></span></span><span>{s.name}</span></button>)}</div><footer>✧ 보유한 도구로 새로운 가능성을 만듭니다.</footer></nav>
 </details>
}
