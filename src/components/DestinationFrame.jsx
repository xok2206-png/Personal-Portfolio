import { Link } from 'react-router-dom'
import { worldDestinations } from '../scenes/PortfolioWorld/world.config.js'
import LivingEnvironment from './LivingEnvironment.jsx'
import './DestinationFrame.css'
export default function DestinationFrame({ destinationId, children }) {
 const destination = worldDestinations.find(item => item.id === destinationId)
 return <div className="destination-frame">
  <LivingEnvironment variant="reading"/>
  <div className="destination-arrival" aria-label={destination.place}><div><p>{destination.place}</p><span>{destination.subtitle}</span></div><img src={'/assets/production/images/natural-world/' + destination.id + '-island-v1.webp'} alt="" width="480" height="480" onError={event => { event.currentTarget.hidden = true }}/></div>
  <div className="destination-content">{children}</div>
  <footer className="destination-footer"><Link to="/contact">함께할 다음 여정 ↗</Link></footer>
 </div>
}
