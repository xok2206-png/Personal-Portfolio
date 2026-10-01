import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers, rememberDestination, seasonalRoot } from './layers.config.js'
import WorldArrival from './WorldArrival.jsx'
import FlightAtmosphere from './FlightAtmosphere.jsx'
import './FlightWorld.css'

// Recreate the imperative WebGL scene when its dynamically loaded module changes in development.
if (import.meta.hot) {
  import.meta.hot.accept('./flightScene.js', () => window.location.reload())
}

const plainClick = event => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

export default function FlightWorld() {
  const { reduced, travelTo, previewDestination } = usePortfolioUI()
  const location = useLocation(), navigate = useNavigate()
  const root = useRef(null), canvas = useRef(null), labels = useRef([]), engine = useRef(null)
  const [compact, setCompact] = useState(() => matchMedia('(max-width: 1023px), (max-aspect-ratio: 1/1)').matches)
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false)
  const [near, setNear] = useState(null), [target, setTarget] = useState(null)
  const [hovered, setHovered] = useState(null), [focused, setFocused] = useState(null)
  const [arrival, setArrival] = useState(() => Boolean(location.state?.arrival) && !reduced)
  const direct = compact || reduced || failed
  const finishArrival = useCallback(() => {
    setArrival(false)
    navigate('/world-map', { replace: true, state: null })
    requestAnimationFrame(() => root.current?.focus({ preventScroll: true }))
  }, [navigate])
  useEffect(() => {
    const media = matchMedia('(max-width: 1023px), (max-aspect-ratio: 1/1)')
    const sync = () => setCompact(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (compact || reduced) return
    let cancelled = false, instance
    const controller = new AbortController()
    const watchdog = setTimeout(() => { cancelled = true; controller.abort(); setFailed(true); setReady(false) }, 8000)
    setReady(false); setFailed(false)
    import('./flightScene.js').then(async ({ createFlightScene }) => {
      if (cancelled) return
      instance = await createFlightScene({ canvas: canvas.current, root: root.current, labels: labels.current,
        onNear: id => { if (!cancelled) { setNear(id); if (id) setTarget(null) } },
        onManual: () => { if (!cancelled) setTarget(null) },
        signal: controller.signal,
        onReady: () => { clearTimeout(watchdog); if (!cancelled) setReady(true) },
        onError: () => { clearTimeout(watchdog); if (!cancelled) { setFailed(true); setReady(false) } },
      })
      if (cancelled) instance.dispose()
      else engine.current = instance
    }).catch(() => { clearTimeout(watchdog); if (!cancelled) { setFailed(true); setReady(false) } })
    return () => { cancelled = true; clearTimeout(watchdog); controller.abort(); instance?.dispose(); engine.current = null; setNear(null); setTarget(null) }
  }, [compact, reduced])
  useEffect(() => { engine.current?.pause(arrival); }, [arrival, ready])
  useEffect(() => { if (reduced && arrival) finishArrival() }, [reduced, arrival, finishArrival])
  const enter = useCallback((event, island) => {
    if (event && !plainClick(event)) return
    event?.preventDefault(); rememberDestination(island.id); travelTo(island.route, island.title)
  }, [travelTo])
  useEffect(() => {
    const key = event => {
      if (arrival || document.querySelector('dialog[open]') || event.target.closest?.('a,button,input,textarea,select') || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key.toLowerCase() === 'e' && !event.repeat && near && !direct) { event.preventDefault(); enter(null, islandLayers.find(i => i.id === near)) }
      if (event.key === 'Escape') { engine.current?.reset(); setNear(null); setTarget(null) }
    }
    const reset = () => { engine.current?.reset(); setNear(null); setTarget(null) }
    window.addEventListener('keydown', key); window.addEventListener('app:worldreset', reset)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('app:worldreset', reset) }
  }, [near, direct, enter, arrival])
  function choose(event, island) {
    if (!plainClick(event)) return
    if (direct || !ready || near === island.id) { enter(event, island); return }
    event.preventDefault(); setTarget(island.id); setNear(null); engine.current?.fly(island.id)
    root.current?.focus({ preventScroll: true })
  }
  const destination = islandLayers.find(i => i.id === near)
  const flyingTo = islandLayers.find(i => i.id === target)
  const mode = direct ? 'direct' : ready ? 'flight' : 'loading'
  const highlighted = hovered ?? focused ?? target ?? near ?? islandLayers.find(i => i.route === previewDestination)?.id ?? ''
  useEffect(() => { engine.current?.highlight(highlighted) }, [highlighted, ready])
  return <main id="main" ref={root} tabIndex={-1} className="flight-world" data-mode={mode} data-arrival={arrival} data-near={near || ''} data-highlighted={highlighted} aria-describedby="flight-instructions">
    <div className="flight-sky" aria-hidden="true" />
    <FlightAtmosphere reduced={reduced} flight={mode === 'flight'} arrival={arrival} />
    <canvas ref={canvas} className="flight-canvas" aria-hidden="true" />
    <div className="flight-heading"><h1>Portfolio World</h1><p>{mode === 'loading' ? '섬을 준비하고 있습니다.' : direct ? '네 개의 섬에서 만나는 저의 이야기.' : '마음이 가는 섬으로 날아가 보세요.'}</p></div>
    <nav className="flight-islands" aria-label="세계의 네 목적지" inert={arrival}>
      {islandLayers.map((island, index) => <Link ref={el => { labels.current[index] = el }} key={island.id} to={island.route} className="flight-island" data-island={island.id} data-emphasis={highlighted === island.id} onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(island.id) }} onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(island.id)} onBlur={() => setFocused(null)} data-active={near === island.id || target === island.id || previewDestination === island.route} aria-label={`${island.title} · ${island.description}${mode === 'flight' ? ' · 비행하기' : ''}`} onClick={event => choose(event, island)}>
        <img src={seasonalRoot + island.id + '-island-flight-v1.webp'} alt="" onError={event => { event.currentTarget.hidden = true }} />
        <span className="flight-label"><strong>{island.title.charAt(0) + island.title.slice(1).toLowerCase()}</strong></span>
        <span className="flight-island-description">{island.description}</span>
      </Link>)}
    </nav>
    <div className="flight-controls" inert={arrival}>
      <p className="flight-sr" id="flight-instructions">{direct ? '섬 또는 상단 메뉴를 선택하면 해당 페이지로 이동합니다.' : 'WASD 또는 방향키로 비행, 섬 클릭으로 자동 비행, 가까운 섬에서 E로 입장합니다. Escape로 처음 위치로 돌아갑니다. 상단 메뉴는 직접 이동입니다.'}</p>
      <div className="flight-destination" role="status" aria-live="polite">
        {destination && mode === 'flight' ? <><Link to={destination.route} onClick={event => enter(event, destination)}><kbd>E</kbd> {destination.title.charAt(0) + destination.title.slice(1).toLowerCase()} 입장하기 <span aria-hidden="true">→</span></Link></> : flyingTo && mode === 'flight' ? <span>{flyingTo.title.charAt(0) + flyingTo.title.slice(1).toLowerCase()}로 비행 중 </span> : null}
      </div>
    </div>
    {arrival && !reduced && <WorldArrival onFinish={finishArrival} />}
  </main>
}
