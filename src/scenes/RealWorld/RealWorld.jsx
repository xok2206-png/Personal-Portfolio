import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './RealWorld.css'
import PortalCinematic from './PortalCinematic.jsx'

function RealWorld() {
  const navigate = useNavigate()
  const { reduced, tone } = usePortfolioUI()
  const videoRef = useRef(null)
  const [journey, setJourney] = useState(false)
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

      <div className="start-copy">
        <div className="eyebrow">
          <span className="live-dot" aria-hidden="true" /> JUNYOUNG&apos;S INTERACTIVE PORTFOLIO
        </div>
        <h1 tabIndex="-1">
          Every great
          <br />
          journey starts
          <br />
          <em>with a spark.</em>
        </h1>
        <p className="start-korean">작은 호기심이, 새로운 경험이 되는 곳.</p>
        <p className="start-description">
          안녕하세요, 준영입니다.
          <br />
          디자인과 코드를 연결하는 저의 세계로 초대합니다.
        </p>
        <div className="start-actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              tone()
              if (reduced || visited) navigate('/world-map')
              else setJourney(true)
            }}
          >
            ENTER WORLD
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </button>
          <Link to="/quick-view" className="button secondary">
            DIRECT ACCESS <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <p className="start-caption">탐험하며 알아가거나, 바로 작품을 둘러보세요.</p>
        {visited && !reduced && <button className="journey-replay" type="button" onClick={() => setJourney(true)}>처음의 여정 다시 보기 ↗</button>}
      </div>
      {journey && <PortalCinematic reduced={reduced} onArrive={arrive} />}

      <div className="start-bottom">
        <span>UI/UX DESIGN · FRONTEND · INTERACTION</span>
        <span>
          SEOUL, KR <i /> PORTFOLIO 2026
        </span>
      </div>
    </main>
  )
}

export default RealWorld
