import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './RealWorld.css'
import PortalCinematic from './PortalCinematic.jsx'

const GATEWAY_STATUS = {
  idle: '● REAL WORLD',
  hover: '◌ SIGNAL DETECTED',
  connecting: 'PORTAL LINK ESTABLISHING...',
  entering: 'ENTERING PORTFOLIO WORLD',
}

function RealWorld() {
  const navigate = useNavigate()
  const { reduced, tone, systemReduced, paused, setPaused, sound, setSound } = usePortfolioUI()
  const videoRef = useRef(null)
  const [journey, setJourney] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [gatewayState, setGatewayState] = useState('idle')
  const [visited] = useState(() => {
    try { return sessionStorage.getItem('portfolio-world-visited') === 'true' } catch { return false }
  })
  const arrive = () => {
    try { sessionStorage.setItem('portfolio-world-visited', 'true') } catch { /* optional */ }
    navigate('/world-map', { state: { arrival: !reduced } })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const sync = () => {
      if (reduced || journey || document.hidden) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }

    sync()
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('app:motionchange', sync)
    return () => {
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('app:motionchange', sync)
      video.pause()
    }
  }, [reduced, journey])

  const enterWorld = () => {
    if (launching) return
    tone()
    if (reduced || visited) {
      navigate('/world-map')
      return
    }
    setLaunching(true)
    setGatewayState('connecting')
    window.setTimeout(() => {
      setGatewayState('entering')
      setJourney(true)
    }, 420)
  }

  return (
    <main id="main" className="start-scene">
      <div className="room-photo" />
      <video
        ref={videoRef}
        className="start-video"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/start-poster.webp"
        aria-hidden="true"
        disablePictureInPicture
      >
        <source src="/assets/production/video/start-ambient-premium.mp4" type="video/mp4" />
      </video>
      <div className="room-shade" />
      <Link className="real-world-brand" to="/" aria-label="JY · 리얼월드">JY <span>PORTFOLIO</span></Link>

      <div className="real-header real-secondary-tools">
        <div className="real-utilities">
          <details className="real-settings" onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary').focus()}}}>
            <summary aria-label="환경 설정" title="환경 설정"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 3 1-1h4l1 3 3 1 3 1v4l-2 2v3l-3 2-1 3h-4l-2-2-3-1-3-2v-4l2-2V7l3-2Z"/><circle cx="12" cy="12" r="3.5"/></svg></summary>
            <div className="real-settings-panel"><strong>환경 설정</strong><button type="button" disabled={systemReduced} aria-pressed={!reduced} onClick={()=>setPaused(!paused)}>Motion <span>{reduced?'OFF':'ON'}</span></button><button type="button" aria-pressed={sound} onClick={()=>{setSound(!sound);if(!sound)tone(true)}}>Sound <span>{sound?'ON':'OFF'}</span></button><small>{systemReduced?'기기의 동작 줄이기 설정 적용 중':'Sound는 선택 효과음에 적용됩니다.'}</small></div>
          </details>
        </div>
      </div>

      <div className={`start-copy${launching ? ' is-launching' : ''}`}>
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          MY PORTFOLIO WORLD
        </p>
        <h1 tabIndex="-1">
          작은 아이디어가
          <br />
          <span className="real-accent">더 나은 경험</span>이 되는 곳
        </h1>
        <p className="start-description">
          사용자와 브랜드를 연결하는 웹 경험을 만들고,
          <br />
          보기 좋은 화면을 실제 동작하는 인터페이스로 구현합니다.
        </p>

        <div className="gateway">
          <div className="start-actions">
            <button
              type="button"
              className="enter-world-button"
              disabled={launching}
              aria-busy={launching}
              onMouseEnter={() => !launching && setGatewayState('hover')}
              onMouseLeave={() => setGatewayState((prev) => (prev === 'hover' ? 'idle' : prev))}
              onFocus={() => !launching && setGatewayState('hover')}
              onBlur={() => setGatewayState((prev) => (prev === 'hover' ? 'idle' : prev))}
              onClick={enterWorld}
            >
              <span className="gateway-diamond" aria-hidden="true" />
              <span>ENTER WORLD</span>
              <svg className="gateway-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>
          <p className="gateway-status" aria-live="polite">
            {GATEWAY_STATUS[gatewayState]}
          </p>
        </div>

        <p className="start-caption">버튼을 누르면 월드로 진입합니다.</p>
        {visited && !reduced && (
          <button className="journey-replay" type="button" onClick={() => setJourney(true)}>
            처음의 여정 다시 보기 ↗
          </button>
        )}
      </div>
      {journey && <PortalCinematic reduced={reduced} onArrive={arrive} />}

      <div className="start-bottom">
        <span className="start-bottom-primary">
          <span className="start-bottom-row">
            <span className="eyebrow-line" aria-hidden="true" />
            SEOUL, KOREA
          </span>
          <small>A FRONTEND DEVELOPER&apos;S REAL WORLD</small>
        </span>
      </div>
    </main>
  )
}

export default RealWorld
