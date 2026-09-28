import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import './PortalCinematic.css'

// Video owns all room/character/camera motion. React owns recovery and navigation.
export default function PortalCinematic({ onArrive, reduced }) {
  const videoRef = useRef(null)
  const done = useRef(false)
  const complete = useRef(onArrive)
  complete.current = onArrive
  const finish = () => {
    if (done.current) return
    done.current = true
    complete.current()
  }
  useEffect(() => {
    if (reduced) { finish(); return }
    let active = true
    const recover = () => { if (active) finish() }
    const video = videoRef.current
    const startup = setTimeout(() => { if (!video || video.readyState < 2 || video.paused) recover() }, 2500)
    const escape = event => { if (event.key === 'Escape') finish() }
    const visibility = () => { if (document.hidden) video?.pause(); else if (video && !done.current) video.play().catch(recover) }
    document.addEventListener('keydown', escape)
    document.addEventListener('visibilitychange', visibility)
    video?.play().catch(recover)
    return () => {
      active = false
      clearTimeout(startup); video?.pause()
      document.removeEventListener('keydown', escape)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [reduced])
  // Loops continuously until the visitor explicitly skips or picks a destination; no auto-navigate on end.
  // Portaled to document.body so this fixed, full-viewport layer can't be constrained to the
  // RealWorld scene's own (smaller, overflow:hidden) box in browsers that clip fixed descendants.
  return createPortal(
    <section className="portal-cinematic" aria-label="현실에서 포트폴리오 세계로 이동">
    <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/assets/start-poster.webp" onError={finish} onTimeUpdate={event => {
      const time = event.currentTarget.currentTime
      const section = event.currentTarget.parentElement
      section.dataset.phase = time < .3 ? 'normal' : time < 1.3 ? 'monitor' : time < 2.8 ? 'reality' : time < 6.1 ? 'transit' : 'arrival'
      if (time > 7.4) section.classList.add('portal-arriving')
    }} aria-hidden="true">
      <source src="/assets/production/video/portal-journey-premium.mp4" type="video/mp4" />
    </video>
    <div className="portal-effects" aria-hidden="true">
      <div className="portal-monitor-noise" />
      <svg className="portal-design-space" viewBox="0 0 1600 900" fill="none">
        <g className="portal-vector"><path d="M80 420C200 90 330 580 470 220" /><path d="M80 420 150 250M470 220 370 370" /><rect x="73" y="413" width="14" height="14" /><rect x="463" y="213" width="14" height="14" /><circle cx="150" cy="250" r="5" /><circle cx="370" cy="370" r="5" /></g>
        <g className="portal-frames"><rect x="1100" y="110" width="300" height="210" rx="4"/><path d="M1100 160H1400M1175 160V320M1250 160V320M1325 160V320M1100 215H1400M1100 270H1400"/><rect x="1140" y="135" width="300" height="210" rx="4"/></g>
        <g className="portal-components"><rect x="150" y="650" width="120" height="80" rx="12"/><rect x="300" y="620" width="120" height="80" rx="12"/><rect x="300" y="730" width="120" height="80" rx="12"/><path d="M270 690H285V660H300M285 690V770H300"/></g>
        <g className="portal-code"><rect x="1070" y="580" width="290" height="160" rx="8"/><path d="M1090 610H1200M1105 636H1290M1105 660H1250M1090 685H1180M1120 708H1300"/><path d="m1010 650-24 20 24 20m380-40 24 20-24 20"/></g>
      </svg>
    </div>
    <div className="portal-caption"><span>INTO A BIGGER WORLD</span><p>현실의 호기심이 새로운 세계로 이어집니다.</p></div>
    <div className="portal-actions"><Link to="/projects">프로젝트 바로 보기</Link><button type="button" onClick={finish} autoFocus>연출 건너뛰기 <span aria-hidden="true">↗</span></button></div>
    </section>,
    document.body,
  )
}
