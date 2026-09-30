import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './PortalCinematic.css'
import RealWorldActionIcon from './RealWorldActionIcon.jsx'

const AMBIENT_CLIP = '/assets/start-ambient.mp4'
const PORTAL_CLIP = '/assets/production/video/premium-to-portal-preview.mp4'
const ARRIVAL_CLIP = '/assets/production/video/hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4'
const AMBIENT_POSTER = '/assets/start-poster.webp'
const CROSSFADE_MS = 600
const RECOVERY_DELAY_MS = 8000

export default function PortalCinematic({ active = false, onArrive, reduced }) {
  const ambientRef = useRef(null)
  const portalRef = useRef(null)
  const arrivalRef = useRef(null)
  const complete = useRef(onArrive)
  complete.current = onArrive
  const done = useRef(false)
  const [stage, setStage] = useState('portal')
  const [portalVisible, setPortalVisible] = useState(false)
  const [portalCovered, setPortalCovered] = useState(false)
  const [arrivalVisible, setArrivalVisible] = useState(false)
  const [finishing, setFinishing] = useState(false)

  const finish = (showWelcome = false) => {
    if (done.current) return
    done.current = true
    complete.current(showWelcome === true)
  }

  // Keep the original ambient element playing beneath the first dissolve.
  // Pause only once the decoded portal image completely covers it.
  useEffect(() => {
    const video = ambientRef.current
    if (!video) return
    const sync = () => {
      if (reduced || portalCovered || document.hidden) video.pause()
      else video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { document.removeEventListener('visibilitychange', sync); video.pause() }
  }, [reduced, portalCovered])

  useEffect(() => {
    if (!portalVisible) return
    const timer = window.setTimeout(() => setPortalCovered(true), CROSSFADE_MS + 50)
    return () => window.clearTimeout(timer)
  }, [portalVisible])

  useEffect(() => {
    if (!active) return
    const video = stage === 'portal' ? portalRef.current : arrivalRef.current
    if (!video) return
    let disposed = false
    let watchdog
    let frame
    let animationFrame
    let lastTime = video.currentTime
    const recover = () => {
      if (!disposed && active && !done.current) {
        done.current = true
        complete.current(false)
      }
    }
    const clearWatchdog = () => window.clearTimeout(watchdog)
    const watch = () => {
      clearWatchdog()
      if (active && !document.hidden) watchdog = window.setTimeout(recover, RECOVERY_DELAY_MS)
    }
    const progressed = () => {
      if (!video.paused && video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime
        clearWatchdog()
      }
    }
    const playing = () => {
      clearWatchdog()
      // Keep the actual outgoing last frame underneath until the incoming
      // video has a decoded frame. Do not remount an outgoing video at time 0.
      const reveal = () => {
        if (disposed) return
        if (stage === 'portal') setPortalVisible(true)
        else setArrivalVisible(true)
      }
      if (video.requestVideoFrameCallback) frame = video.requestVideoFrameCallback(reveal)
      else animationFrame = requestAnimationFrame(reveal)
    }
    const sync = () => {
      if (reduced || document.hidden || done.current) {
        clearWatchdog()
        video.pause()
        if (reduced) recover()
      } else if (video.error) recover()
      else {
        watch()
        video.play().catch(recover)
      }
    }
    video.addEventListener('playing', playing)
    video.addEventListener('waiting', watch)
    video.addEventListener('stalled', watch)
    video.addEventListener('timeupdate', progressed)
    video.addEventListener('error', recover)
    document.addEventListener('visibilitychange', sync)
    sync()
    if (active && !video.paused && video.readyState >= 2) playing()
    return () => {
      disposed = true
      clearWatchdog()
      if (frame !== undefined) video.cancelVideoFrameCallback?.(frame)
      cancelAnimationFrame(animationFrame)
      video.removeEventListener('playing', playing)
      video.removeEventListener('waiting', watch)
      video.removeEventListener('stalled', watch)
      video.removeEventListener('timeupdate', progressed)
      video.removeEventListener('error', recover)
      document.removeEventListener('visibilitychange', sync)
      video.pause()
    }
  }, [active, reduced, stage])

  useEffect(() => {
    if (!active) return
    const escape = event => {
      if (event.key === 'Escape' && !done.current) {
        done.current = true
        complete.current(false)
      }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [active])

  return <>
    <div className={`real-world-media${finishing ? ' is-arriving' : ''}`} data-stage={active ? stage : 'ambient'} style={{ '--portal-crossfade': `${CROSSFADE_MS}ms` }} aria-hidden="true">
      <video
        ref={ambientRef}
        className="start-video"
        src={AMBIENT_CLIP}
        poster={AMBIENT_POSTER}
        muted loop playsInline preload="auto" disablePictureInPicture
      />
      {active && <video
        ref={portalRef}
        className={`portal-video portal-entry${portalVisible ? ' is-visible' : ''}`}
        src={PORTAL_CLIP}
        muted playsInline preload="auto" disablePictureInPicture
        onEnded={() => setStage('arrival')}
      />}
      {active && <video
        ref={arrivalRef}
        className={`portal-video portal-arrival${arrivalVisible ? ' is-visible' : ''}`}
        src={ARRIVAL_CLIP}
        muted playsInline preload="auto" disablePictureInPicture
        onEnded={() => finish(true)}
        onTimeUpdate={event => {
          if (event.currentTarget.currentTime > 8.5) setFinishing(true)
        }}
      />}
    </div>
    {active && <section className="portal-cinematic" aria-label="현실에서 포트폴리오 세계로 이동">
      <div className="portal-actions">
        <Link className="real-secondary-action" to="/projects"><span>프로젝트 바로 보기</span><RealWorldActionIcon /></Link>
        <button className="real-secondary-action" type="button" onClick={finish} autoFocus><span>연출 건너뛰기</span><RealWorldActionIcon skip /></button>
      </div>
    </section>}
  </>
}
