import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './RealWorld.css'
import './RealWorldCredits.css'
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
  const [journey, setJourney] = useState(false)
  const launching = journey
  const [gatewayState, setGatewayState] = useState('idle')

  const arrive = () => {
    try { sessionStorage.setItem('portfolio-world-visited', 'true') } catch { /* optional */ }
    navigate('/world-map', { state: { arrival: !reduced } })
  }

  const enterWorld = () => {
    if (launching) return
    tone()
    if (reduced) {
      navigate('/world-map')
      return
    }
    setGatewayState('entering')
    setJourney(true)
  }

  return (
    <main id="main" className={`start-scene cinematic-credits${launching ? ' is-launching' : ''}`}>
      <div className="room-photo" />
      <PortalCinematic active={journey} reduced={reduced} onArrive={arrive} />
      <div className="room-shade" />
      <Link className="real-world-brand" to="/" tabIndex={launching ? -1 : undefined} aria-hidden={launching || undefined} aria-label="JY · 리얼월드">JY.</Link>

      <div className="real-header real-secondary-tools" inert={launching} aria-hidden={launching || undefined}>
        <nav className="real-utilities" aria-label="리얼월드 바로가기">
          <Link className="real-quick" to="/quick-view">QUICK VIEW <span aria-hidden="true">↗</span></Link>
          <details className="real-settings" onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary').focus()}}}>
            <summary aria-label="환경 설정" title="환경 설정"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 3 1-1h4l1 3 3 1 3 1v4l-2 2v3l-3 2-1 3h-4l-2-2-3-1-3-2v-4l2-2V7l3-2Z"/><circle cx="12" cy="12" r="3.5"/></svg></summary>
            <div className="real-settings-panel"><strong>환경 설정</strong><button type="button" disabled={systemReduced} aria-pressed={!reduced} onClick={()=>setPaused(!paused)}>Motion <span>{reduced?'OFF':'ON'}</span></button><button type="button" aria-pressed={sound} onClick={()=>{setSound(!sound);if(!sound)tone(true)}}>Sound <span>{sound?'ON':'OFF'}</span></button><small>{systemReduced?'기기의 동작 줄이기 설정 적용 중':'Sound는 선택 효과음에 적용됩니다.'}</small></div>
          </details>
        </nav>
      </div>

      <div className={`start-copy${launching ? ' is-launching' : ''}`} inert={launching} aria-hidden={launching || undefined}>
        <div className="real-credit-copy">
          <h1 tabIndex="-1">작은 아이디어가<br /><strong>더 나은 경험이 되는곳</strong></h1>
          <p className="real-credit-identity"><span>김준영</span><span aria-hidden="true">·</span><span>Frontend Developer / UI·UX</span></p>
        </div>
        <div className="gateway">
          <div className="start-actions">
            <button type="button" className="enter-world-button" disabled={launching} aria-busy={launching}
              onMouseEnter={() => !launching && setGatewayState('hover')}
              onMouseLeave={() => setGatewayState(prev => prev === 'hover' ? 'idle' : prev)}
              onFocus={() => !launching && setGatewayState('hover')}
              onBlur={() => setGatewayState(prev => prev === 'hover' ? 'idle' : prev)}
              onClick={enterWorld}>
              <span className="credit-entry-circle" aria-hidden="true"><svg className="gateway-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></span>
              <span className="credit-entry-label">ENTER WORLD</span>
            </button>
          </div>
          <p className="gateway-status" aria-live="polite">{GATEWAY_STATUS[gatewayState]}</p>
          <Link className="journey-direct" to="/world-map" tabIndex={launching ? -1 : undefined} aria-hidden={launching || undefined}>영상 없이 바로 입장 <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  )
}

export default RealWorld
