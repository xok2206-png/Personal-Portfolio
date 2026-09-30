import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { islandLayers, rememberDestination } from './layers.config.js'
import WorldAtmosphere, { WaterMist } from './WorldAtmosphere.jsx'
import FlowingWater from './FlowingWater.jsx'
import WorldHUD from './WorldHUD.jsx'
import WorldCharacter from './WorldCharacter.jsx'
import IslandRibbon from './IslandRibbon.jsx'
import useWorldWalk from './useWorldWalk.js'
import './LayeredWorld.css'
import './WorldAtmosphere.css'
import './WorldHUD.css'
import './WorldRefinement.css'
import './IslandOrbit.css'
import './NaturalWorld.css'

const firstGuide = () => { try { return sessionStorage.getItem('world-guide-seen') !== 'true' } catch { return true } }
const shortestHeading = (from, to) => from + (((to - from) % 360 + 540) % 360) - 180
const naturalRoot = '/assets/production/images/natural-world/'

export default function LayeredWorld() {
 const { reduced, travelTo, previewDestination } = usePortfolioUI()
 const root = useRef(null), camera = useRef(null), islandNav = useRef(null), pointerType = useRef('mouse')
 const [hidden, setHidden] = useState(document.hidden), [onscreen, setOnscreen] = useState(true)
 const [selected, setSelected] = useState(null), [hovered, setHovered] = useState(null), [failed, setFailed] = useState({})
 const [guide, setGuide] = useState(firstGuide), [bearing, setBearing] = useState(0), [panelOpen, setPanelOpen] = useState(false), [mobileIndex, setMobileIndex] = useState(0)
 const dismissGuide = useCallback(() => { setGuide(false); try { sessionStorage.setItem('world-guide-seen', 'true') } catch { /* Optional hint. */ } }, [])
 const manual = useCallback(() => { dismissGuide(); setSelected(null); setHovered(null) }, [dismissGuide])
 const player = useWorldWalk({ reduced, hidden, sceneRef: camera, blocked: panelOpen, onManual: manual })
 const preview = islandLayers.find(island => island.route === previewDestination)?.id
 const focusId = preview || hovered || selected
 const running = !reduced && !hidden && onscreen
 const active = islandLayers.find(island => island.id === focusId)
 useEffect(() => {
  if (!guide) return
  const timer = setTimeout(dismissGuide, 4500)
  return () => clearTimeout(timer)
 }, [guide, dismissGuide])
 useEffect(() => {
  const measure = () => {
   const person = root.current?.querySelector('.lw-explorer'), island = root.current?.querySelector('[data-island="' + focusId + '"]')
   if (!person) return
   if (island && !player.moving) {
    const p = person.getBoundingClientRect(), a = island.getBoundingClientRect()
    setBearing(previous => shortestHeading(previous, Math.atan2(a.x + a.width / 2 - p.x - p.width / 2, p.bottom - a.y - a.height * .4) * 180 / Math.PI))
   } else setBearing(previous => shortestHeading(previous, player.heading))
  }
  measure(); window.addEventListener('resize', measure)
  return () => window.removeEventListener('resize', measure)
 }, [focusId, player.x, player.y, player.heading, player.moving])
 useEffect(() => {
  const visibility = () => setHidden(document.hidden)
  document.addEventListener('visibilitychange', visibility)
  const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting), { threshold: .05 })
  observer.observe(camera.current)
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
 }, [])
 const browse = useCallback(index => {
  dismissGuide(); setSelected(null); setHovered(null)
  const nav = islandNav.current, item = nav.children[index]
  if (item) nav.scrollTo({ left: item.offsetLeft - (nav.clientWidth - item.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' })
 }, [dismissGuide, reduced])
 useEffect(() => {
  const nav = islandNav.current
  const update = () => {
   if (!matchMedia('(max-aspect-ratio: 1/1)').matches) return
   const bounds = nav.getBoundingClientRect()
   let closest = 0, distance = Infinity
   ;[...nav.children].forEach((element, index) => { const rect = element.getBoundingClientRect(), d = Math.abs(rect.x + rect.width / 2 - bounds.x - bounds.width / 2); if (d < distance) { closest = index; distance = d } })
   setMobileIndex(closest)
  }
  const reset = () => browse(0)
  nav.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); window.addEventListener('app:worldreset', reset); update()
  return () => { nav.removeEventListener('scroll', update); window.removeEventListener('resize', update); window.removeEventListener('app:worldreset', reset) }
 }, [browse])
 const enter = useCallback((event, island) => {
  if (!island || (event.button !== undefined && event.button !== 0) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault(); dismissGuide(); rememberDestination(island.id); travelTo(island.route, island.title)
 }, [dismissGuide, travelTo])
 useEffect(() => {
  const key = event => {
   if (event.key === 'Escape') { setSelected(null); setHovered(null) }
   if (panelOpen || !selected || !['Enter', 'e', 'E'].includes(event.key) || event.target.closest?.('a,button,summary,input,textarea,select,dialog')) return
   enter(event, islandLayers.find(island => island.id === selected))
  }
  window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
 }, [enter, selected, panelOpen])
 const hover = id => { if (!panelOpen) { setHovered(id); if (id) dismissGuide() } }
 function choose(event, island) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const touch = event.nativeEvent.pointerType === 'touch' || (event.detail > 0 && pointerType.current === 'touch')
  if (touch && selected !== island.id) { event.preventDefault(); dismissGuide(); setHovered(null); setSelected(island.id); return }
  enter(event, island)
 }
 return <main id="main" ref={root} className="layered-world world-refined natural-world" data-paused={!running} data-focus={focusId || undefined} data-selected={selected || undefined} aria-describedby="world-movement-help" onPointerDownCapture={event => { pointerType.current = event.pointerType; dismissGuide() }}>
  <div className="natural-world-heading"><p>JUNYOUNG · PERSONAL PORTFOLIO</p><h1 className="world-scene-title">A world of possibilities.</h1><span>{active ? active.description + ' ↗' : '네 개의 섬에서 만나는, 디자인과 구현의 기록.'}</span></div>
  <p className="lw-sr" id="world-movement-help">방향키 또는 WASD로 전망대 안에서 이동합니다. Tab으로 목적지를 선택하고 Enter로 입장합니다. 상단 메뉴로 모든 목적지에 바로 접근할 수 있습니다.</p>
  <div className="lw-viewport"><div className="lw-scene" ref={camera}>
   <img className="lw-backdrop" src={naturalRoot + 'world-sky-v1.webp'} alt="" fetchPriority="high" onError={() => setFailed(state => ({ ...state, background: true }))}/>
   {failed.background && <div className="lw-backdrop-fallback"/>}
   <img className="lw-cloud lw-cloud-far" src={naturalRoot + 'painted-cloud-v1.webp'} alt=""/>
   <nav ref={islandNav} aria-label="세계의 네 목적지" className="lw-islands">
    {islandLayers.map(island => <Link key={island.id} to={island.route} data-island={island.id} data-focus={focusId === island.id} className={'lw-island lw-' + island.id + (focusId === island.id ? ' is-reacting' : '')} aria-label={island.title + ' · ' + island.description} style={{ '--label': '89%' }} onPointerEnter={event => { if (event.pointerType !== 'touch') hover(island.id) }} onPointerLeave={() => hover(null)} onFocus={() => { if (pointerType.current !== 'touch') hover(island.id) }} onBlur={() => hover(null)} onClick={event => choose(event, island)}>
     <div className="lw-float"><div className="lw-response">
      {!failed[island.id] && <><img className="lw-island-art" src={naturalRoot + island.art} alt="" width="1254" height="1254" onError={() => setFailed(state => ({ ...state, [island.id]: true }))}/><span className="natural-island-shadow" aria-hidden="true" style={{ maskImage: 'url(' + naturalRoot + island.art + ')' }}/><FlowingWater island={island} running={running}/><WaterMist island={island}/></>}
      <span className="lw-label lw-ribbon-label"><IslandRibbon title={island.title} subtitle={island.description}/></span>
     </div></div>
    </Link>)}
   </nav>
   <img className="lw-cloud lw-cloud-mid" src={naturalRoot + 'painted-cloud-v1.webp'} alt=""/>
   <img className="lw-cloud lw-cloud-near" src={naturalRoot + 'painted-cloud-v1.webp'} alt=""/>
   <div className="lw-foreground" aria-hidden="true"><img className="lw-lookout" src={naturalRoot + 'world-lookout-v1.webp'} alt="" onError={event => { event.currentTarget.hidden = true }}/><WorldCharacter player={player} hovered={focusId} bearing={bearing} reduced={reduced} blocked={panelOpen}/></div>
   <WorldAtmosphere/>
  </div></div>
  <WorldHUD selected={selected} onEnter={enter} guide={guide} moving={player.moving} onPanelChange={setPanelOpen} bearing={bearing} mobileIndex={mobileIndex} onBrowse={browse}/>
 </main>
}
