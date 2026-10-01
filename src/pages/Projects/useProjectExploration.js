import { useCallback, useEffect, useRef, useState } from 'react'
import { startPosition, worldProjects, worldSize } from './projectWorld'
import { roadTarget, roadRoute, roadDistance, moveOnRoad } from './projectRoads.js'

const spriteRoot = '/assets/production/images/projects-world/character/'
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const aliases = { w: 'ArrowUp', s: 'ArrowDown', a: 'ArrowLeft', d: 'ArrowRight' }

export default function useProjectExploration({ viewport, stage, walker, roadCursor, paused, onEnter, onApproach }) {
  const [near, setNear] = useState(null)
  const [visited, setVisited] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('projects-visited') || '[]').filter(id => worldProjects.some(p => p.id === id)) } catch { return [] }
  })
  const [discovery, setDiscovery] = useState(null)
  const [zoom, setZoom] = useState(1)
  const state = useRef({ position: { ...startPosition }, camera: { x: 50, y: 50 }, keys: new Set(), zoom: 1, near: null, route: [], drag: null, follow: false })
  const callbacks = useRef({ onEnter, onApproach, paused, visited })
  useEffect(() => { callbacks.current = { onEnter, onApproach, paused, visited } }, [onEnter, onApproach, paused, visited])

  const stop = useCallback(() => { state.current.keys.clear(); state.current.route = [] }, [])
  const warpTo = useCallback(project => {
    const s=state.current
    s.keys.clear()
    s.route=[]
    s.drag=null
    s.teleport={target:{x:project.entrance[0],y:project.entrance[1]},started:performance.now(),arrived:false}
    s.follow=true
    viewport.current?.focus({preventScroll:true})
  }, [viewport])
  const aim = useCallback(project => {
    const s = state.current
    s.camera = { x: project.entrance[0], y: project.entrance[1] - 8 }
    s.follow = false
    s.zoom = callbacks.current.paused ? 1 : 1.25
    setZoom(s.zoom)
  }, [])
  const changeZoom = useCallback(value => {
    const s = state.current
    s.zoom = clamp(value, 1, 1.8)
    if (s.zoom === 1) { s.camera = { x: 50, y: 50 }; s.follow = false }
    setZoom(s.zoom)
  }, [])

  useEffect(() => {
    const s = state.current
    let frame, previous = performance.now(), noticeTimer, lastPose = '', phase = 0
    // Decode direction sheets before turns so a direction change doesn't flash.
    const spriteCache = ['front','side','back'].flatMap(view => ['idle','walk'].map(pose => {
      const image = new Image(); image.src = `${spriteRoot}${view}-${pose}-v2.webp`; return image
    }))
    let renderCamera = { ...s.camera }, renderZoom = 1
    let size = { width: viewport.current.clientWidth, height: viewport.current.clientHeight }
    const observer = new ResizeObserver(([entry]) => { size = { width: entry.contentRect.width, height: entry.contentRect.height } })
    observer.observe(viewport.current)
    const clear = () => { stop(); s.drag = null }
    const down = e => {
      if (matchMedia('(max-width:767px), (max-width:1023px) and (orientation:portrait)').matches) return
      if (document.querySelector('dialog[open]') || e.altKey || e.ctrlKey || e.metaKey || e.target.closest?.('input,textarea,select,a,button,summary,[contenteditable="true"]')) return
      if (e.key === 'Escape') { clear(); return }
      if (s.teleport) return
      if (e.key.toLowerCase() === 'e' && s.near !== null) { e.preventDefault(); if (!e.repeat) callbacks.current.onEnter(worldProjects[s.near]); return }
      const key = aliases[e.key.toLowerCase()] || e.key
      if (key === 'Shift' || key.startsWith('Arrow')) {
        e.preventDefault(); s.keys.add(key); s.follow = true; s.route = []
      }
    }
    const up = e => s.keys.delete(aliases[e.key.toLowerCase()] || e.key)
    const tick = now => {
      const dt = Math.min((now - previous) / 1000, .04); previous = now
      if (!document.hidden && viewport.current && stage.current && walker.current) {
        const inView = viewport.current.getBoundingClientRect().bottom > 0
        const blocked = !inView || document.querySelector('dialog[open]')
        if (blocked) clear()
        if (s.teleport) {
          const trip=s.teleport, elapsed=now-trip.started
          const instant=callbacks.current.paused
          if ((elapsed>=220 || instant) && !trip.arrived) {
            s.position={...trip.target};s.camera={x:s.position.x,y:s.position.y-12};s.warped=true;trip.arrived=true
          }
          walker.current.dataset.teleport=trip.arrived ? "arriving" : "departing"
          if (elapsed>=700 || instant) { s.teleport=null;delete walker.current.dataset.teleport }
        }
        let dx = Number(s.keys.has('ArrowRight')) - Number(s.keys.has('ArrowLeft'))
        let dy = Number(s.keys.has('ArrowDown')) - Number(s.keys.has('ArrowUp'))
        while (s.route.length && roadDistance(s.position, s.route[0]) < .06) s.route.shift()
        const target = s.route[0]
        if (target) { dx = target.x - s.position.x; dy = (target.y - s.position.y) * 2 / 3 }
        const length = Math.hypot(dx, dy)
        const before = s.position
        const depth = .48 + s.position.y / 150
        if (length && !blocked && !s.teleport) {
          const speed = (4.2 + s.position.y * .03) * 1.5 * (s.keys.has('Shift') ? 1.6 : 1)
          const step = Math.min(speed * dt, target ? length : Infinity)
          const next=moveOnRoad(s.position,{x:dx/length*step,y:dy/length*step*1.5})
          if (roadDistance(next, s.position) < .0001 && target) s.route = []
          s.position = next
        }
        const actual = roadDistance(before, s.position)
        const moving = actual / dt > .1 && !blocked
        const actualX = s.position.x - before.x, actualY = (s.position.y - before.y) * 2 / 3
        // Hysteresis keeps slight steering at a verge from flickering between views.
        const sideThreshold = lastPose === 'side' ? 1.1 : 1.6
        const view = moving ? Math.abs(actualX) > Math.abs(actualY) * sideThreshold ? 'side' : actualY > 0 ? 'front' : 'back' : lastPose || 'back'
        if (view !== lastPose) {
          walker.current.querySelector('.pw-idle').src = `${spriteRoot}${view}-idle-v2.webp`
          walker.current.querySelector('.pw-stride img').src = `${spriteRoot}${view}-walk-v2.webp`
          lastPose = view
        }
        // Phase comes from real ground distance, including cornering and running.
        // Use the four authored poses; never mirror the entire body between steps.
        if (moving) phase = (phase + actual / (2.6 * depth)) % 1
        const gait = Math.floor(phase * 4)
        const cell = gait
        if (view === 'side' && moving) walker.current.style.setProperty('--facing', actualX < 0 ? 1 : -1)
        if (view !== 'side') walker.current.style.setProperty('--facing', 1)
        walker.current.querySelector('.pw-stride img').style.transform = `translateX(-${cell * 25}%)`
        walker.current.dataset.frame = gait
        walker.current.dataset.pose = view
        walker.current.dataset.moving = Boolean(moving && !callbacks.current.paused)
        walker.current.style.left = `${s.position.x}%`
        walker.current.style.top = `${s.position.y}%`
        walker.current.style.zIndex = Math.round(s.position.y*10)
        walker.current.style.setProperty('--person-scale', depth / (.48 + startPosition.y / 150))
        const treeShade=(s.position.x>33 && s.position.x<39 && s.position.y>60 && s.position.y<69) || (s.position.x>47 && s.position.x<50 && s.position.y>49 && s.position.y<59)
        walker.current.style.setProperty('--ground-light',treeShade ? .78 : .91)
        walker.current.dataset.x = s.position.x.toFixed(2)
        walker.current.dataset.y = s.position.y.toFixed(2)
        const closest = worldProjects.findIndex(p => Math.hypot(p.entrance[0] - s.position.x, (p.entrance[1] - s.position.y) * .667) < 2.8)
        const nextNear = closest < 0 ? null : closest
        if (nextNear !== s.near) {
          s.near = nextNear; setNear(nextNear)
          callbacks.current.onApproach()
          if (nextNear !== null && !callbacks.current.visited.includes(worldProjects[nextNear].id)) {
            const id = worldProjects[nextNear].id
            const nextVisited = [...callbacks.current.visited, id]
            callbacks.current.visited = nextVisited
            setVisited(nextVisited)
            try { sessionStorage.setItem('projects-visited', JSON.stringify(nextVisited)) } catch { /* Optional storage. */ }
            setDiscovery(worldProjects[nextNear].name)
            clearTimeout(noticeTimer); noticeTimer = setTimeout(() => setDiscovery(null), 1500)
          }
        }
        if (s.follow && !callbacks.current.paused) s.camera = { x: s.position.x, y: s.position.y - 12 }
        if (s.warped) { renderCamera = { ...s.camera }; s.warped = false }
        const ease = callbacks.current.paused ? 1 : 1 - Math.exp(-dt * 7)
        renderCamera.x += (s.camera.x - renderCamera.x) * ease
        renderCamera.y += (s.camera.y - renderCamera.y) * ease
        renderZoom += (s.zoom - renderZoom) * ease
        const baseScale = Math.max(size.width / worldSize.width, size.height / worldSize.height)
        const scale = baseScale * renderZoom
        // About: 6.4% of a 1672/941 cover canvas, 362 visible pixels in a 265px-wide sprite.
        // Project art: 260 visible pixels in a 288px-high frame. Normalize alpha padding
        // and base camera fit, retaining the user's zoom and the existing ground depth.
        const aboutVisibleHeight = Math.max(innerWidth, innerHeight * 1672 / 941) * .064 * 362 / 265
        walker.current.style.setProperty('--person-height', `${aboutVisibleHeight * 288 / 260 / baseScale}px`)
        const width = worldSize.width * scale, height = worldSize.height * scale
        const x = clamp(size.width / 2 - renderCamera.x / 100 * width, size.width - width, 0)
        const y = clamp(size.height / 2 - renderCamera.y / 100 * height, size.height - height, 0)
        stage.current.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
        stage.current.style.setProperty('--label-scale', 1 / scale)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    window.addEventListener('blur', clear); document.addEventListener('visibilitychange', clear)
    return () => {
      cancelAnimationFrame(frame); clearTimeout(noticeTimer); observer.disconnect(); clear()
      spriteCache.forEach(image => { image.onload = null; image.onerror = null })
      window.removeEventListener('keydown', down); window.removeEventListener('keyup', up)
      window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clear)
    }
  }, [viewport, stage, walker, stop])

  const pointerDown = e => {
    if (state.current.teleport || e.target.closest('button,a') || e.pointerType === 'touch') return
    if(roadCursor.current)roadCursor.current.hidden=true
    state.current.drag = { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false }
    viewport.current.setPointerCapture(e.pointerId)
  }
  const pointerMove = e => {
    const s = state.current, drag = s.drag
    if (!drag) {
      const rect=stage.current.getBoundingClientRect()
      const target=e.target.closest('button,a') ? null : roadTarget({x:(e.clientX-rect.left)/rect.width*100,y:(e.clientY-rect.top)/rect.height*100})
      if(roadCursor.current){roadCursor.current.hidden=!target;if(target){roadCursor.current.style.left=`${target.x}%`;roadCursor.current.style.top=`${target.y}%`}}
      viewport.current.style.cursor=target ? 'pointer' : 'grab'
      return
    }
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 5) drag.moved = true
    const rect = stage.current.getBoundingClientRect()
    s.camera.x = clamp(s.camera.x - (e.clientX - drag.x) / rect.width * 100, 0, 100)
    s.camera.y = clamp(s.camera.y - (e.clientY - drag.y) / rect.height * 100, 0, 100)
    s.follow = false; drag.x = e.clientX; drag.y = e.clientY
  }
  const pointerUp = e => {
    const s = state.current
    if (!s.drag) return
    if (!s.drag.moved) {
      const rect = stage.current.getBoundingClientRect()
      const point = { x: (e.clientX - rect.left) / rect.width * 100, y: (e.clientY - rect.top) / rect.height * 100 }
      const target = roadTarget(point)
      // Ignore vegetation, roofs and water clicks. Only the visible road accepts targets.
      if (target) {
        s.keys.clear(); s.route = roadRoute(s.position, target)
        s.follow = true; viewport.current.focus({ preventScroll: true })
      }
    }
    s.drag = null
  }
  return { near, visited, discovery, zoom, aim, warpTo, changeZoom, stop, pointerDown, pointerMove, pointerUp }
}
