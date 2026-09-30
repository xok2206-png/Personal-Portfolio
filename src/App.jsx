import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NextDestination from './components/NextDestination.jsx'
import VoyageTransition from './components/VoyageTransition.jsx'
import AppRouter from './app/router.jsx'
import LivingEnvironment from './components/LivingEnvironment.jsx'
import PageHeader from './components/PageHeader.jsx'
import { PortfolioUIContext } from './app/PortfolioUIContext.jsx'
import './styles/portfolio-theme.css'

function useStoredBoolean(key, fallback) {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw) === true } catch { return fallback }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Optional preference storage. */ } }, [key, value])
  return [value, setValue]
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [paused, setPaused] = useStoredBoolean('world-motion-paused', false)
  const [sound, setSound] = useStoredBoolean('world-sound', false)
  const [systemReduced, setSystemReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [previewDestination, setPreviewDestination] = useState(null)
  const [voyage, setVoyage] = useState(null)
  const timers = useRef([])
  const activeTrip = useRef(null)
  const audio = useRef(null)
  const reduced = systemReduced || paused
  const realWorld = location.pathname === '/'
  const worldMode = location.pathname === '/world-map'
  const clearTravel = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; activeTrip.current = null; setVoyage(null) }, [])
  const finishTravel = useCallback(() => {
    const trip = activeTrip.current
    clearTravel()
    if (trip && !trip.navigated) navigate(trip.to)
  }, [clearTravel, navigate])

  const tone = useCallback((force = false) => {
    if (!sound && !force) return
    try {
      if (!audio.current) audio.current = new (window.AudioContext || window.webkitAudioContext)()
      const context = audio.current
      context.resume()
      const oscillator = context.createOscillator(), gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(600, context.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(900, context.currentTime + .1)
      gain.gain.setValueAtTime(.025, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .15)
      oscillator.connect(gain); gain.connect(context.destination)
      oscillator.start(); oscillator.stop(context.currentTime + .17)
    } catch { /* Silent fallback. */ }
  }, [sound])

  const travelTo = useCallback((path, label) => {
    clearTravel(); setPreviewDestination(null)
    if (reduced || path === location.pathname) {
      navigate(path)
      if (path === '/world-map') window.dispatchEvent(new Event('app:worldreset'))
      return
    }
    const trip = { from: location.pathname, to: path, label, id: performance.now() }
    activeTrip.current = trip; setVoyage(trip); tone()
    // Routes remain independently usable; never wait for media or animation events.
    timers.current = [setTimeout(() => { if (activeTrip.current === trip) { trip.navigated = true; navigate(path) } }, 240), setTimeout(clearTravel, 1000)]
  }, [clearTravel, location.pathname, navigate, reduced, tone])

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setSystemReduced(media.matches)
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
    window.dispatchEvent(new CustomEvent('app:motionchange', { detail: { reduced } }))
    if (reduced) finishTravel()
  }, [reduced, finishTravel])
  useEffect(() => {
    const back = () => clearTravel()
    const escape = event => { if (event.key === 'Escape' && activeTrip.current) finishTravel() }
    window.addEventListener('popstate', back); window.addEventListener('keydown', escape)
    return () => { window.removeEventListener('popstate', back); window.removeEventListener('keydown', escape) }
  }, [clearTravel, finishTravel])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    if (activeTrip.current && ![activeTrip.current.from, activeTrip.current.to].includes(location.pathname)) clearTravel()
    window.scrollTo(0, 0)
    const previousFocus = document.activeElement
    const movementRoute = ['/world-map', '/projects', '/skills'].includes(location.pathname)
    const observer = new MutationObserver(focusDestination)
    function focusDestination() {
      const main = document.getElementById('main')
      if (!main || main.closest('[aria-busy="true"]')) return
      const active = document.activeElement
      if (active !== document.body && active !== previousFocus && (main.contains(active) || active.closest('dialog'))) { observer.disconnect(); return }
      const target = movementRoute ? main : main.querySelector('h1') || main
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true }); observer.disconnect()
    }
    const timer = setTimeout(() => { observer.observe(document.body, { childList: true, subtree: true }); focusDestination() }, 150)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [location.pathname, clearTravel])

  return <PortfolioUIContext.Provider value={{ reduced, systemReduced, paused, setPaused, sound, setSound, tone, travelTo, previewDestination, setPreviewDestination }}>
    <div className={`app ${realWorld ? 'dark' : 'light portfolio-experience'} ${worldMode ? 'world-mode' : ''} ${location.pathname === '/projects' ? 'gallery-mode' : ''} ${location.pathname === '/contact' ? 'contact-mode' : ''} ${location.pathname === '/skills' ? 'skills-mode' : ''}`} data-voyaging={Boolean(voyage)}>
      <a href="#main" className="skip-link">본문으로 건너뛰기</a>
      {!realWorld && <PageHeader />}
      {['/resume', '/quick-view', '/ending'].includes(location.pathname) && <LivingEnvironment variant="reading"/>}
      <AppRouter />
      <NextDestination />
      {voyage && <VoyageTransition key={voyage.id} trip={voyage} onFinish={finishTravel} />}
    </div>
  </PortfolioUIContext.Provider>
}
