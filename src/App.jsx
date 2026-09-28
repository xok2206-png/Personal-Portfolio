import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppRouter from './app/router.jsx'
import { PortfolioUIContext } from './app/PortfolioUIContext.jsx'

const ICON_PATHS = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  map: 'm3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  play: 'm8 5 11 7-11 7V5Z',
  pause: 'M8 5v14M16 5v14',
  sound: 'm4 9 4 0 5-4v14l-5-4H4V9Zm12-2c4 3 4 7 0 10',
  mute: 'm4 9 4 0 5-4v14l-5-4H4V9Zm12 0 5 6m-5 0 5-6',
  star: 'm12 3 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1 3-6Z',
}

function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={ICON_PATHS[name] || ICON_PATHS.arrow} />
    </svg>
  )
}

function NavMenu({ location, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const before = document.activeElement
    const node = dialogRef.current
    node?.showModal?.()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      before?.focus?.()
    }
  }, [])

  const links = [
    ['ABOUT', '/about'],
    ['SKILLS', '/skills'],
    ['PROJECTS', '/projects'],
    ['Q&A', '/qa'],
    ['CONTACT', '/contact'],
  ]

  const current = location.pathname === '/' ? 'START' : location.pathname.split('/')[1].toUpperCase()

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      aria-label="PORTFOLIO NAVIGATION"
    >
      <div className="dialog-head">
        <span>PORTFOLIO NAVIGATION</span>
        <button className="icon-button" aria-label="닫기" onClick={onClose} autoFocus>
          <Icon name="close" />
        </button>
      </div>
      <div className="adventure-body">
        <div className="eyebrow">DIRECT ACCESS</div>
        <h2>포트폴리오 바로가기</h2>
        <p>현재 위치 · {current}</p>
        <nav aria-label="빠른 이동">
          {links.map(([title, to], index) => (
            <Link key={to} to={to}>
              <span>0{index + 1}</span>
              {title}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
        <div className="book-bottom">
          <Link to="/quick-view">DIRECT ACCESS ↗</Link>
          <Link to="/resume">경력·역량 요약 ↗</Link>
        </div>
        <small>모든 콘텐츠에 바로 접근할 수 있어요.</small>
      </div>
    </dialog>
  )
}

function useStoredBoolean(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? fallback : JSON.parse(raw) === true
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage is optional */
    }
  }, [key, value])

  return [value, setValue]
}

function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [paused, setPaused] = useStoredBoolean('world-motion-paused', false)
  const [sound, setSound] = useStoredBoolean('world-sound', false)
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const audioRef = useRef(null)

  const dark = location.pathname === '/'
  const worldMode = location.pathname === '/world-map'
  const reduced = systemReduced || paused

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
    window.dispatchEvent(new CustomEvent('app:motionchange', { detail: { reduced } }))
  }, [reduced])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
    const timer = setTimeout(() => document.querySelector('h1')?.focus({ preventScroll: true }), 150)
    return () => clearTimeout(timer)
  }, [location.pathname])

  function tone(force = false) {
    if (!sound && !force) return
    try {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioRef.current
      ctx.resume()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(600, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.025, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      oscillator.connect(gain)
      gain.connect(ctx.destination)
      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.17)
    } catch {
      /* silent fallback */
    }
  }

  const links = [
    ['ABOUT', '/about'],
    ['SKILLS', '/skills'],
    ['PROJECTS', '/projects'],
    ['Q&A', '/qa'],
    ['CONTACT', '/contact'],
  ]

  return (
    <PortfolioUIContext.Provider value={{ reduced, tone }}>
      <div className={`app ${dark ? 'dark' : 'light'} ${worldMode ? 'world-mode' : ''}`}>
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>

        <header className="site-header">
          <Link to="/" className="brand">
            <span className="brand-icon">{worldMode ? 'JY' : <Icon name="star" size={22} />}</span>
            <span>
              {worldMode ? <>JUNYOUNG KIM</> : <>MY PORTFOLIO <b>WORLD</b></>}
              <small>JUNYOUNG · DESIGNER &amp; DEVELOPER</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            {links.map(([title, to]) => (
              <NavLink key={to} to={to}>
                {title}
              </NavLink>
            ))}
          </nav>

          <div className="header-controls">
            <Link to="/world-map" className="map-link">
              <Icon name="map" />
              <span>WORLD MAP</span>
            </Link>
            <button
              className="icon-button"
              title={reduced ? '움직임 재생' : '움직임 일시정지'}
              aria-label={reduced ? '움직임 재생' : '움직임 일시정지'}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              <Icon name={reduced ? 'play' : 'pause'} />
            </button>
            <button
              className="icon-button sound-toggle"
              aria-label={sound ? '소리 끄기' : '소리 켜기'}
              aria-pressed={sound}
              onClick={() => {
                setSound(!sound)
                if (!sound) tone(true)
              }}
            >
              <Icon name={sound ? 'sound' : 'mute'} />
            </button>
            <button
              className="icon-button book-toggle"
              aria-label="포트폴리오 메뉴 열기"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </header>

        <AppRouter />

        {menuOpen && <NavMenu location={location} onClose={() => setMenuOpen(false)} />}
      </div>
    </PortfolioUIContext.Provider>
  )
}

export default App
