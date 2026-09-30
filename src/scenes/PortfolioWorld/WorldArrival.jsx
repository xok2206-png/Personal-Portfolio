import { useCallback, useEffect, useRef, useState } from 'react'

export default function WorldArrival({ onFinish }) {
  const dialog = useRef(null)
  const [leaving, setLeaving] = useState(false)
  const leave = useCallback(() => setLeaving(true), [])
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(onFinish, 600)
    return () => clearTimeout(timer)
  }, [leaving, onFinish])
  useEffect(() => {
    dialog.current.showModal()
    let remaining = 3800, started = performance.now(), timer
    const schedule = () => { started = performance.now(); timer = setTimeout(leave, remaining) }
    const visibility = () => {
      clearTimeout(timer)
      if (document.hidden) remaining -= performance.now() - started
      else schedule()
    }
    if (!document.hidden) schedule()
    document.addEventListener('visibilitychange', visibility)
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', visibility) }
  }, [leave])
  return <dialog ref={dialog} tabIndex={-1} autoFocus onKeyDown={event => { if (event.key === 'Enter' && event.target === event.currentTarget) leave() }} className="world-arrival" data-leaving={leaving} aria-labelledby="arrival-title" onCancel={event => { event.preventDefault(); leave() }}>
    <div className="world-arrival-sky" aria-hidden="true" />
    <div className="world-arrival-copy">
      <h1 id="arrival-title"><span>Welcome to my</span>Portfolio World</h1>
      <button type="button" onClick={leave}>세계 둘러보기 <span className="arrival-arrow" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></span></button>
    </div>
  </dialog>
}


