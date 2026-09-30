import { Link, useLocation } from 'react-router-dom'
import { usePortfolioUI } from '../app/PortfolioUIContext.jsx'
import './NextDestination.css'
const journey={ '/skills':['Projects','/projects'], '/projects':['Contact','/contact'] }
export default function NextDestination(){
 const {pathname}=useLocation(), {travelTo}=usePortfolioUI()
 const next=journey[pathname]
 if(!next)return null
 return <Link className="next-destination" to={next[1]} onClick={e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();travelTo(next[1],next[0])}}><small>다음 이야기</small><span>{next[0]} <b aria-hidden="true">→</b></span></Link>
}
