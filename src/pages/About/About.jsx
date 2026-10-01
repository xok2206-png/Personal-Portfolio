import SeasonalAtmosphere from '../../components/SeasonalAtmosphere.jsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import useGalleryWalk from '../Projects/useGalleryWalk.js'
import AboutHUD from './AboutHUD.jsx'
import StudioAtmosphere from './StudioAtmosphere.jsx'
import StudioItemLights from './StudioItemLights.jsx'
import { aboutObjects, constrainStudioFloor, studioRoom } from './aboutStudio.js'
import './About.css'

const characterRoot = '/assets/production/images/project-gallery/character/'
const directLayout = '(max-width: 767px), (pointer: coarse)'

function StudioExplorer({ player, still }) {
  const [ready, setReady] = useState({})
  const [failed, setFailed] = useState({})
  return <div className="studio-explorer" aria-hidden="true" data-x={player.x.toFixed(2)} data-y={player.y.toFixed(2)} data-moving={player.moving && !still} style={{ left: player.x + '%', top: player.y + '%', '--facing': player.view === 'side' ? player.facing : 1 }}>
    <span className="studio-explorer-shadow" />
    {['back', 'front', 'side'].map(view => <div key={view} className="studio-pose" data-active={player.view === view} data-ready={ready[view] && !failed[view]}>
      <img className="studio-idle" src={characterRoot + view + '-idle.webp'} alt="" onError={event => { event.currentTarget.hidden = true }} />
      <div className="studio-stride"><img src={characterRoot + view + '-walk.webp'} alt="" onLoad={async event => { try { await event.currentTarget.decode(); setReady(value => ({ ...value, [view]: true })) } catch { setFailed(value => ({ ...value, [view]: true })) } }} onError={() => setFailed(value => ({ ...value, [view]: true }))} /></div>
    </div>)}
  </div>
}

export default function About() {
  const { reduced, tone } = usePortfolioUI()
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [visited, setVisited] = useState([])
  const [hidden, setHidden] = useState(document.hidden)
  const [visible, setVisible] = useState(true)
  const [imageFailed, setImageFailed] = useState(false)
  const main = useRef(null), viewport = useRef(null), canvas = useRef(null), floor = useRef(null), opener = useRef(null), indexMenu = useRef(null)
  const { player, go, stop, keyDown, keyUp } = useGalleryWalk({ reduced, paused: selected !== null, hidden: hidden || !visible, initialPosition: { x: 52, y: 78 }, constrain: constrainStudioFloor, speed: 16, minY: 60 })
  const near = aboutObjects.findIndex(object => Math.hypot(object.stop.x - player.x, (object.stop.y - player.y) * 1.6) < 6)
  const active = selected === null ? (focused ?? hovered ?? (near >= 0 ? near : null)) : null

  useEffect(() => {
    const update = () => setHidden(document.hidden)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(viewport.current)
    const items = new IntersectionObserver(entries => entries.forEach(entry => {
      const onscreen = entry.intersectionRatio >= .4
      entry.target.inert = !onscreen
      entry.target.dataset.onscreen = String(onscreen)
    }), { root: viewport.current, threshold: [0, .4] })
    main.current.querySelectorAll('.studio-object').forEach(node => items.observe(node))
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); items.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  function open(index, element) {
    stop()
    opener.current = element?.closest('.studio-index') ? indexMenu.current.querySelector('summary') : element || floor.current
    if (indexMenu.current) indexMenu.current.open = false
    setSelected(index)
    setHovered(null)
    setFocused(null)
    setVisited(current => current.includes(index) ? current : [...current, index])
    tone()
  }

  const close = useCallback(() => {
    setSelected(null)
    setHovered(null)
    setFocused(null)
    requestAnimationFrame(() => (opener.current?.isConnected && !opener.current.inert ? opener.current : indexMenu.current?.querySelector('summary'))?.focus({ preventScroll: true }))
  }, [])

  useEffect(() => {
    const down = event => {
      if (selected !== null || hidden || !visible || event.altKey || event.ctrlKey || event.metaKey || matchMedia(directLayout).matches) return
      if (event.target.closest?.('dialog,nav,a,input,textarea,select,summary,[contenteditable="true"]')) return
      const object = event.target.closest?.('[data-object-index]')
      if (event.key.toLowerCase() === 'e' && (object || active !== null)) {
        event.preventDefault()
        if (!event.repeat) open(object ? Number(object.dataset.objectIndex) : active, object || floor.current)
        return
      }
      if (event.target.closest?.('button') && event.target !== floor.current) return
      if (event.key === 'Escape') { stop(); return }
      keyDown(event)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', keyUp)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', keyUp) }
  })

  function moveOnFloor(event) {
    if (!event.detail || !canvas.current || matchMedia(directLayout).matches) return
    const bounds = canvas.current.getBoundingClientRect()
    go({ x: (event.clientX - bounds.left) / bounds.width * 100, y: (event.clientY - bounds.top) / bounds.height * 100 })
  }

  return <main ref={main} id="main" className="about-studio" data-selected={selected !== null} data-still={reduced || hidden || !visible} data-image-failed={imageFailed} tabIndex="-1">
    <h1 className="studio-sr-only" tabIndex="-1">About</h1>
    <div ref={viewport} className="studio-viewport">
      <div ref={canvas} className="studio-canvas" style={{ '--focus-x': (aboutObjects[selected]?.x ?? 50) + '%', '--focus-y': (aboutObjects[selected]?.y ?? 50) + '%' }}>
        <img className="studio-room" src={studioRoom} alt="하늘과 연결된 넓은 작업실 테라스. 왼쪽 책상의 노트북과 노트, 뒤쪽 보드와 책장, 오른쪽 보관 상자가 열린 바닥을 둘러싸고 있습니다." fetchPriority="high" onError={() => setImageFailed(true)} />
        {!imageFailed && <StudioAtmosphere key={studioRoom} running={!reduced && !hidden && visible && selected === null} />}
        {!imageFailed && <StudioItemLights active={active} selected={selected !== null} />}
        <button ref={floor} className="studio-floor" type="button" aria-label="작업실 바닥: WASD 또는 방향키로 이동" aria-describedby="studio-help" onClick={moveOnFloor} onBlur={stop} />
        <SeasonalAtmosphere season="spring" still={reduced || hidden || !visible || selected !== null} />
        <StudioExplorer player={player} still={reduced || hidden || !visible || selected !== null} />
      </div>
        <div className="studio-objects" aria-label="작업실의 다섯 이야기">
          {aboutObjects.map((object, index) => <button key={object.id} type="button" className={'studio-object studio-object-' + object.id} data-object-index={index} data-active={active === index} data-visited={visited.includes(index)} style={{ '--object-x': (object.x - 50) / 100, '--object-y': (object.y - 50) / 100, '--object-width': object.width / 100, '--object-height': object.height / 100 }} aria-label={object.label + '에서 ' + object.title + ' 살펴보기'} aria-haspopup="dialog" aria-controls="about-hud" onPointerEnter={event => { if (event.pointerType !== 'touch') { setHovered(index); setFocused(null) } }} onPointerLeave={() => setHovered(null)} onFocus={() => { setFocused(index); setHovered(null) }} onBlur={() => setFocused(null)} onClick={event => open(index, event.currentTarget)}>
            <span className="studio-prompt" aria-hidden="true"><kbd>E</kbd><span className="studio-tap-hint">열기</span><strong>{object.label} 살펴보기</strong></span>
          </button>)}
        </div>
    </div>
    <details ref={indexMenu} className="studio-index" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); indexMenu.current.open = false; indexMenu.current.querySelector('summary').focus() } }}>
      <summary><svg className="studio-journal-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Zm0 0v15" /></svg><span>이야기 목록</span><span aria-label={'5개 중 ' + visited.length + '개 읽음'}>{String(visited.length).padStart(2, '0')} / 05</span></summary>
      <nav aria-label="About 바로 보기"><ol>{aboutObjects.map((object, index) => <li key={object.id}><button type="button" data-read={visited.includes(index)} onClick={event => open(index, event.currentTarget)} aria-haspopup="dialog" aria-controls="about-hud"><span className="studio-read-dot" aria-hidden="true" /><span>{object.label}</span><small>{object.korean}</small><span className="studio-sr-only">{visited.includes(index) ? '읽음' : '아직 읽지 않음'}</span></button></li>)}</ol></nav>
    </details>
    <p id="studio-help" className="studio-help"><span className="studio-keyboard-help"><kbd>W A S D</kbd> 이동 <kbd>E</kbd> 살펴보기</span><span className="studio-touch-help">빛나는 물건을 눌러 살펴보기</span></p>
    {imageFailed && <p role="status" className="studio-fallback">작업실 이미지를 불러오지 못했습니다. 아래 목록에서 모든 이야기를 볼 수 있습니다.</p>}
    {selected !== null && <AboutHUD selected={selected} onSelect={index => { setSelected(index); setVisited(current => current.includes(index) ? current : [...current, index]) }} onClose={close} />}
  </main>
}
