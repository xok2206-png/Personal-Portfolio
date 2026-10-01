import { useEffect, useRef, useState } from 'react'
import Resume from '../Resume/Resume.jsx'
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
  useEffect(() => { heading.current?.focus({ preventScroll: true }); dialog.current.scrollTop = 0; setQuestion(null) }, [panel])
  const back = () => {
    if (panel === 'qa' && question !== null) { setQuestion(null); requestAnimationFrame(() => dialog.current.querySelector('[data-question="' + question + '"]')?.focus()); return }
    onClose()
  }
  return <dialog ref={dialog} className="connect-hud" data-panel={panel} aria-labelledby="connect-hud-title" onKeyDown={event => { if (panel === 'connect' || (panel === 'qa' && question === null)) moveFocus(event) }} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => {
    if (event.target !== event.currentTarget) return
    const r = event.currentTarget.getBoundingClientRect()
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose()
  }}>
    <header className="connect-hud-header"><p>CONNECT{panel !== 'connect' && <span> / {panel === 'message' ? 'EMAIL' : panel.toUpperCase()}</span>}</p><button onClick={onClose} aria-label="연결 메뉴 닫기">닫기 <kbd>ESC</kbd></button></header>
    <div className="connect-hud-body">
      <h2 id="connect-hud-title" ref={heading} tabIndex={-1}>{panel === 'connect' ? '어디로 연결할까요?' : panel === 'email' || panel === 'message' ? '메시지 보내기' : panel === 'resume' ? '이력서' : panel === 'qa' ? '무엇이 궁금한가요?' : panel.toUpperCase()}</h2>
      {panel === 'connect' && <div className="connect-menu">{choices.map(([id, title, sub], index) => <button data-choice key={id} onClick={() => onNavigate(id)}><span className="connect-number">0{index + 1}</span><span><strong>{title}</strong><small>{sub}</small></span><span aria-hidden="true">↗</span></button>)}</div>}
      {(panel === 'email' || panel === 'message') && <ContactEmail draft={draft} setDraft={setDraft} onSent={onSent}/>}
      {panel === 'resume' && <Resume embedded/>}
      {panel === 'github' && <section className="connect-detail"><p>Frontend Projects<br/>Source Code · Experiments</p><p>프로젝트의 코드와 구현 과정을 살펴보세요.</p><a className="connect-primary" href={profile.github} target="_blank" rel="noopener noreferrer">VISIT GITHUB ↗<span className="connect-sr-only"> (새 탭)</span></a></section>}
      {panel === 'qa' && (question === null ? <div className="connect-questions">{faqs.map(([q], index) => <button key={q} data-choice data-question={index} onClick={() => { setQuestion(index); requestAnimationFrame(() => heading.current?.focus()) }}><span aria-hidden="true">›</span>{q}</button>)}</div> : <article className="connect-answer"><small>Q.</small><h3>{faqs[question][0]}</h3><small>A.</small><p>{faqs[question][1]}</p></article>)}
    </div>
    <footer className="connect-hud-footer">{panel !== 'connect' ? <button onClick={back}>{panel === 'qa' && question !== null ? '← 질문 목록' : '← 연락 방법'}</button> : <span>↑ ↓ 선택 · Enter 열기</span>}<span>Let’s Connect</span></footer>
  </dialog>
}
