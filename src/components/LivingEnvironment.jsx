import { useEffect, useRef, useState } from 'react'
import { usePortfolioUI } from '../app/PortfolioUIContext.jsx'
import './LivingEnvironment.css'
export default function LivingEnvironment({ variant = 'reading' }) {
 const { reduced } = usePortfolioUI()
 const root = useRef(null)
 const [hidden, setHidden] = useState(document.hidden)
 const [visible, setVisible] = useState(true)
 useEffect(() => {
  const visibility = () => setHidden(document.hidden)
  const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
  observer.observe(root.current); document.addEventListener('visibilitychange', visibility)
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
 }, [])
 return <div ref={root} className={'living-environment living-' + variant} data-still={reduced || hidden || !visible} aria-hidden="true">
  <div className="living-cloud-window"><img className="living-cloud living-cloud-one" src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt=""/><img className="living-cloud living-cloud-two" src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt=""/></div>
  <div className="living-shadow"/>
  {variant === 'ruins' && <div className="living-leaves">{[0, 1, 2].map(index => <i key={index} style={{ '--leaf-index': index }}/>)}</div>}
 </div>
}
