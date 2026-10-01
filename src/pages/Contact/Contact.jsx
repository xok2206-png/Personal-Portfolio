import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { profile } from '../../data/content.js'
import ConnectScene from './ConnectScene.jsx'
import ConnectHUD from './ConnectHUD.jsx'
import ContactIcon from './ContactIcon.jsx'
import './Connect.css'
import './ConnectDirect.css'

const panels = new Set(['connect', 'email', 'message', 'resume', 'github', 'qa'])
export default function Contact() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const { reduced, paused } = usePortfolioUI()
  const [signal, setSignal] = useState(0)
  const [hidden, setHidden] = useState(document.hidden)
  const firstChoice = useRef(null)
  const opener = useRef(null)
  const panel = panels.has(hash.slice(1)) ? hash.slice(1) : null
  useEffect(() => {
    const change = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', change)
    return () => document.removeEventListener('visibilitychange', change)
  }, [])
  const open = (next, trigger) => {
    if (!panel) opener.current = trigger || document.activeElement
    navigate('/contact#' + next, { replace: Boolean(panel) })
  }
  const close = () => {
    navigate('/contact', { replace: true })
    requestAnimationFrame(() => (opener.current?.isConnected ? opener.current : firstChoice.current)?.focus({ preventScroll: true }))
  }
  return <main id="main" className="connect-world connect-direct" data-still={reduced || paused || hidden} tabIndex={-1}>
    <ConnectScene blocked={Boolean(panel)} still={reduced || paused || hidden} hidden={hidden} signal={signal}/>
    <section className="connect-invitation" aria-labelledby="connect-title">
      <h1 id="connect-title" tabIndex={-1}>Connect</h1>
      <p>프로젝트 제안이나 궁금한 이야기를 남겨주세요.</p>
      <nav className="connect-card-grid" aria-label="연락 방법">
        <button ref={firstChoice} className="connect-choice choice-email" onClick={event => open('email', event.currentTarget)} aria-haspopup="dialog"><span className="connect-choice-icon"><ContactIcon name="email"/></span><strong>Email</strong><span className="connect-choice-action">메시지 보내기 <ContactIcon name="send"/></span></button>
        <button className="connect-choice choice-resume" onClick={event => open('resume', event.currentTarget)} aria-haspopup="dialog"><span className="connect-choice-icon"><ContactIcon name="resume"/></span><strong>Resume</strong><span className="connect-choice-action">이력서 보기</span></button>
        <a className="connect-choice choice-github" href={profile.github} target="_blank" rel="noopener noreferrer"><span className="connect-choice-icon"><ContactIcon name="github"/></span><strong>GitHub</strong><span className="connect-choice-action">소스 코드 보기<span className="connect-sr-only"> (새 탭)</span></span></a>
        <button className="connect-choice choice-qa" onClick={event => open('qa', event.currentTarget)} aria-haspopup="dialog"><span className="connect-choice-icon"><ContactIcon name="question"/></span><strong>Q&amp;A</strong><span className="connect-choice-action">자주 묻는 질문</span></button>
      </nav>
    </section>
    {panel && <ConnectHUD panel={panel} onNavigate={open} onClose={close} onSent={() => setSignal(s => s + 1)} fallbackRef={opener}/>}
  </main>
}
