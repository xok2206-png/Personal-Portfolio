import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../../data/content.js'
import QA from '../QA/QA.jsx'
import './Contact.css'

function ContactLookout(){
 const avatar=useRef(null)
 useLayoutEffect(()=>{
  const node=avatar.current,scene=node.parentElement,background=scene.querySelector('.contact-reference-bg')
  const update=()=>{
   const a=background.getBoundingClientRect(),b=scene.getBoundingClientRect(),style=getComputedStyle(background),fit=style.objectFit
   const scale=(fit==='cover'?Math.max:Math.min)(a.width/1672,a.height/941),h=941*scale
   const [,py]=style.objectPosition.split(' ').map(v=>parseFloat(v)/100)
   node.style.left='50%';node.style.top=(a.top-b.top+(a.height-h)*py+h*.96)+'px';node.style.width=Math.min(h*.13,a.width*.23)+'px'
  }
  update();const observer=new ResizeObserver(update);observer.observe(background);background.addEventListener('load',update)
  return()=>{observer.disconnect();background.removeEventListener('load',update)}
 },[])
 return <img ref={avatar} className="contact-lookout-character" src="/assets/production/images/project-gallery/character/front-idle.webp" alt="사용자를 바라보며 서 있는 포트폴리오 캐릭터" onError={e=>{e.currentTarget.hidden=true}}/>
}

function ContactIcon({name}){
 const paths={email:'M3 5h26v20H3z M3 6l13 11L29 6 M3 25l9-11m17 11-9-11',resume:'M7 2h12l7 7v21H7z M19 2v8h7 M11 15h11m-11 5h11m-11 5h8',question:'M6 5h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H14l-7 5v-5H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z M9 15h.1M16 15h.1M23 15h.1'}
 if(name==='github')return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.12.68-3.78-1.33-3.78-1.33-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.9 1.69 3.28 1.17.1-.72.39-1.21.71-1.49-2.49-.28-5.11-1.24-5.11-5.54 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.07-1.15 3.07-1.15.62 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3.01 0 4.31-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.08v2.83c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8z"/></svg>
 return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d={paths[name]}/></svg>
}
function CardContent({icon,label,unavailable=false}){
 const outline='M20 3 H65 L80 8 L95 3 H140 L145 12 L157 20 V160 L145 168 L140 177 H95 L80 172 L65 177 H20 L15 168 L3 160 V20 L15 12 Z'
 return <><svg className="contact-card-frame" viewBox="0 0 160 180" preserveAspectRatio="none" aria-hidden="true"><path className="contact-frame-base" d={outline}/><path className="contact-frame-inner" d="M22 9 H63 L80 14 L97 9 H138 L141 16 L151 24 V156 L141 164 L138 171 H97 L80 166 L63 171 H22 L19 164 L9 156 V24 L19 16 Z"/><path className="contact-frame-light" d={outline} pathLength="100"/></svg><span className="contact-card-gem" aria-hidden="true">✦</span><span className="contact-card-icon"><ContactIcon name={icon}/></span><span className="contact-card-title">{label}</span><small>{unavailable?'준비 중':'→'}</small><span className="contact-card-gem bottom" aria-hidden="true">◇</span></>
}
function QuestionDialog({onClose}){
 const dialog=useRef(null)
 useEffect(()=>{const before=document.activeElement;dialog.current.showModal();return()=>before?.focus?.()},[])
 return <dialog className="contact-dialog" ref={dialog} onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}} aria-labelledby="qa-heading"><div className="contact-dialog-head"><span>LET’S TALK · Q&A</span><button autoFocus onClick={onClose} aria-label="질문 창 닫기">닫기 ×</button></div><QA/></dialog>
}


export default function Contact(){
 const {hash}=useLocation(),navigate=useNavigate(),[failed,setFailed]=useState(false)
 const close=()=>navigate('/contact',{replace:true})
 return <main id="main" className="contact-chapter" data-failed={failed}>
 <img className="contact-reference-bg" src="/assets/production/images/contact/contact-background-v5.webp" alt="" onError={()=>setFailed(true)} fetchPriority="high"/>
 <ContactLookout/>
 <div className="contact-shade"/>
 <section className="contact-copy" aria-labelledby="contact-title"><p className="contact-eyebrow"><span aria-hidden="true">✧</span> CONTACT <span aria-hidden="true">✧</span></p><h1 id="contact-title" tabIndex="-1">Let’s Connect</h1><p className="contact-lead">이번 여정은 여기까지지만,<br/>다음 이야기는 함께 만들 수 있습니다.</p><p className="contact-description">프로젝트, 협업 또는 제 작업에 대해<br/>궁금한 점이 있다면 편하게 연락해주세요.</p>
 <nav className="contact-choices" aria-label="연락 및 질문">{profile.email?<a href={'mailto:'+profile.email}><CardContent icon="email" label="Email"/></a>:<button disabled aria-label="Email 준비 중"><CardContent icon="email" label="Email" unavailable/></button>}<a href={profile.github} target="_blank" rel="noopener noreferrer"><CardContent icon="github" label="GitHub"/></a><Link to="/resume"><CardContent icon="resume" label="Resume"/></Link><Link to="/contact#qa" aria-haspopup="dialog"><CardContent icon="question" label="Ask a Question"/></Link></nav></section>
 <aside className="contact-motto" aria-hidden="true">Different<br/><span>People</span><br/>Brighter<br/><span>Worlds.</span><i>✦ ─────</i></aside>
 <footer className="contact-footer"><span>A SMALL STEP<br/>FOR A BRIGHTER TOMORROW.</span><span>SEE YOU<br/>IN THE NEXT WORLD.<i aria-hidden="true">── ✧ ──</i></span></footer>
 {hash==='#qa'&&<QuestionDialog onClose={close}/>}
 </main>
}
