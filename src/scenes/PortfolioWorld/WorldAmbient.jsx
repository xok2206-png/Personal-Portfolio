import { useEffect, useRef, useState } from 'react'

/** Ambient media owns environmental motion. Navigation remains independent HTML. */
export default function WorldAmbient({ reduced }) {
  const video = useRef(null)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(document.hidden)
  const shouldPlay = !reduced && !paused && !hidden && visible && !failed

  useEffect(() => {
    const update = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 })
    if (video.current) observer.observe(video.current)
    return () => { document.removeEventListener('visibilitychange', update); observer.disconnect() }
  }, [])

  useEffect(() => {
    const media = video.current
    if (!media) return
    let active = true
    if (shouldPlay) {
      media.play()?.catch(() => { if (active) setBlocked(true) })
    } else media.pause()
    return () => { active = false; media.pause() }
  }, [shouldPlay])

  function toggle() {
    if (blocked) {
      video.current?.play().then(() => setBlocked(false)).catch(() => setFailed(true))
    } else setPaused(value => !value)
  }

  return <>
    <video ref={video} src={reduced ? undefined : '/assets/production/video/world-living.mp4'} className={`rw-ambient ${ready && !failed && !reduced ? 'is-ready' : ''}`} muted loop playsInline preload={reduced ? 'none' : 'auto'} aria-hidden="true" tabIndex="-1"
      onPlaying={() => { setReady(true); setBlocked(false) }} onError={() => setFailed(true)} />
    <div className="rw-life-controls">
      {failed ? <span role="status">움직임을 불러오지 못해 원본 풍경을 표시합니다.</span> : reduced ? <span>모션 감소 설정 적용 중</span> : <button type="button" aria-pressed={paused} onClick={toggle} aria-label={blocked || paused ? '세계 움직임 재생' : '세계 움직임 일시정지'}>{blocked || paused ? '▷ 움직임 재생' : 'Ⅱ 움직임 멈추기'}</button>}
    </div>
  </>
}
