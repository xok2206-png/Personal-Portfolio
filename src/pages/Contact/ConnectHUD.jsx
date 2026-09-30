import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, faqs } from '../../data/content.js'
import ContactEmail from './ContactEmail.jsx'
const choices = [['email', 'EMAIL', 'Let’s talk.'], ['resume', 'RESUME', 'View my experience.'], ['github', 'GITHUB', 'Explore my code.'], ['qa', 'Q&A', 'Learn more about me.']]
function moveFocus(event) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
  const entries = [...event.currentTarget.querySelectorAll('[data-choice]')]
  const index = entries.indexOf(document.activeElement)
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? entries.length - 1 : index < 0 ? (event.key === 'ArrowDown' ? 0 : entries.length - 1) : (index + (event.key === 'ArrowDown' ? 1 : -1) + entries.length) % entries.length
  event.preventDefault(); entries[next]?.focus()
}
export default function ConnectHUD({ panel, onNavigate, onClose, onSent, fallbackRef }) {
  const dialog = useRef(null), heading = useRef(null)
  const [question, setQuestion] = useState(null)
  const [copied, setCopied] = useState('')
  const [draft, setDraft] = useState({ name: '', email: '', message: '' })
  useEffect(() => {
    const previous = document.activeElement
    dialog.current.showModal()
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = before
      // Restore after dialog removal; native close focus must not override the trigger.
      const target = fallbackRef.current || (previous !== document.body ? previous : null)
      requestAnimationFrame(() => { if (target?.isConnected) target.focus({ preventScroll: true }) })
    }
  }, [fallbackRef])
  useEffect(() => { heading.current?.focus({ preventScroll: true }); dialog.current.scrollTop = 0; setQuestion(null); setCopied('') }, [panel])
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied('이메일 주소를 복사했습니다.') }
    catch { setCopied('복사하지 못했습니다. 위 주소를 선택해 복사해주세요.') }
  }
  const back = () => {
    if (panel === 'qa' && question !== null) { setQuestion(null); requestAnimationFrame(() => dialog.current.querySelector('[data-question="' + question + '"]')?.focus()); return }
    if (panel === 'message') onNavigate('email')
    else onClose()
  }
  return <dialog ref={dialog} className="connect-hud" aria-labelledby="connect-hud-title" onKeyDown={event => { if (panel === 'connect' || (panel === 'qa' && question === null)) moveFocus(event) }} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => {
    if (event.target !== event.currentTarget) return
    const r = event.currentTarget.getBoundingClientRect()
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose()
  }}>
    <header className="connect-hud-header"><p>CONNECT{panel !== 'connect' && <span> / {panel === 'message' ? 'EMAIL' : panel.toUpperCase()}</span>}</p><button onClick={onClose} aria-label="연결 메뉴 닫기">닫기 <kbd>ESC</kbd></button></header>
    <div className="connect-hud-body">
      <h2 id="connect-hud-title" ref={heading} tabIndex={-1}>{panel === 'connect' ? '어디로 연결할까요?' : panel === 'email' ? 'LET’S TALK.' : panel === 'message' ? 'SEND MESSAGE' : panel === 'qa' ? '무엇이 궁금한가요?' : panel.toUpperCase()}</h2>
      {panel === 'connect' && <div className="connect-menu">{choices.map(([id, title, sub], index) => <button data-choice key={id} onClick={() => onNavigate(id)}><span className="connect-number">0{index + 1}</span><span><strong>{title}</strong><small>{sub}</small></span><span aria-hidden="true">↗</span></button>)}</div>}
      {panel === 'email' && <section className="connect-detail"><p>함께할 프로젝트나<br/>궁금한 점이 있다면 연락해주세요.</p><div className="connect-email-address"><small>EMAIL</small><p>{profile.email || '이메일 주소 준비 중'}</p></div><div className="connect-actions"><button disabled={!profile.email} onClick={copy}>COPY EMAIL</button><button className="connect-primary" onClick={() => onNavigate('message')}>SEND MESSAGE</button></div><p className="connect-status" role="status">{copied}</p></section>}
      {panel === 'message' && <ContactEmail draft={draft} setDraft={setDraft} onSent={onSent}/>}
      {panel === 'resume' && <section className="connect-detail"><p>Experience · Skills · Projects</p><p>경험과 작업을 한눈에 확인하세요.</p><div className="connect-actions"><Link className="connect-primary" to="/resume">VIEW RESUME ↗</Link><button disabled>DOWNLOAD PDF</button></div><p className="connect-status">다운로드용 PDF는 준비 중입니다. 이력서 보기에서 요약을 인쇄하거나 PDF로 저장할 수 있습니다.</p></section>}
      {panel === 'github' && <section className="connect-detail"><p>Frontend Projects<br/>Source Code · Experiments</p><p>프로젝트의 코드와 구현 과정을 살펴보세요.</p><a className="connect-primary" href={profile.github} target="_blank" rel="noopener noreferrer">VISIT GITHUB ↗<span className="connect-sr-only"> (새 탭)</span></a></section>}
      {panel === 'qa' && (question === null ? <div className="connect-questions">{faqs.map(([q], index) => <button key={q} data-choice data-question={index} onClick={() => { setQuestion(index); requestAnimationFrame(() => heading.current?.focus()) }}><span aria-hidden="true">›</span>{q}</button>)}</div> : <article className="connect-answer"><small>Q.</small><h3>{faqs[question][0]}</h3><small>A.</small><p>{faqs[question][1]}</p></article>)}
    </div>
    <footer className="connect-hud-footer">{panel !== 'connect' ? <button onClick={back}>{panel === 'qa' && question !== null ? '← 질문 목록' : panel === 'message' ? '← 이메일 안내' : '← 연락 방법'}</button> : <span>↑ ↓ 선택 · Enter 열기</span>}<span>Let’s Connect</span></footer>
  </dialog>
}
