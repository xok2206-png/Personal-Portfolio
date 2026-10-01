import { useEffect, useRef, useState } from 'react'
import WorldAtmosphere from './WorldAtmosphere.jsx'
import './WorldAtmosphere.css'
import './FlightAtmosphere.css'

export default function FlightAtmosphere({ reduced, flight, arrival }) {
  const root = useRef(null)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const visibility = () => setHidden(document.hidden)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(root.current)
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  return <div ref={root} className="flight-atmosphere" data-still={reduced || hidden || !visible || arrival} data-flight={flight} aria-hidden="true">
    <div className="flight-daylight"><div className="flight-sun" /></div>
    <WorldAtmosphere />
    {!flight && <div className="flight-distant-ship"><img src="/assets/production/images/world-layers/airship.webp" alt="" /></div>}
    <svg className="flight-breeze" viewBox="0 0 1440 810" preserveAspectRatio="none">
      <path d="M-160 320C100 230 150 340 340 300S540 220 660 260" />
      <path d="M820 570C1020 510 1170 640 1600 520" />
    </svg>
  </div>
}
