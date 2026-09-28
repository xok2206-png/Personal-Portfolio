import { Link } from 'react-router-dom'
import { worldDestinations, WORLD_ASSETS } from '../scenes/PortfolioWorld/world.config.js'
import './DestinationFrame.css'

export default function DestinationFrame({ destinationId, children }) {
  const destination = worldDestinations.find(item => item.id === destinationId)
  return <div className="destination-frame">
    <div className="destination-arrival" aria-label={destination.place}>
      <div><Link to="/world-map">← Back to World</Link><p>{destination.place}</p><span>{destination.subtitle}</span></div>
      <img src={`${WORLD_ASSETS}${destination.id}.webp`} alt="" width="480" height="480" onError={event => { event.currentTarget.hidden = true }} />
    </div>
    <div className="destination-content">{children}</div>
    <footer className="destination-footer"><Link to="/world-map">다른 장소 둘러보기 ↗</Link><Link to="/contact">함께할 다음 여정 ↗</Link></footer>
  </div>
}
