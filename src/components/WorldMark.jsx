import { useState } from 'react'
import './WorldMark.css'

export default function WorldMark() {
  const [failed, setFailed] = useState(false)
  return <div className="world-mark portfolio-logo-lockup">
    <div className="portfolio-logo-symbol" aria-hidden="true">
      {!failed && <img className="portfolio-brand-logo" src="/assets/production/images/brand/portfolio-world-logo.webp" width="384" height="384" alt="" onError={() => setFailed(true)} />}
    </div>
  </div>
}
