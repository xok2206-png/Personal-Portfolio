import { Link } from 'react-router-dom'
import './VoyageTransition.css'
const places = { '/world-map':{x:50,y:92}, '/about':{x:23,y:36,id:'about'}, '/skills':{x:38,y:69,id:'skills'}, '/projects':{x:59,y:29,id:'projects'}, '/contact':{x:82,y:66,id:'contact'} }
const place = path => places[path] || (path.startsWith('/projects/') ? places['/projects'] : places['/world-map'])
export default function VoyageTransition({trip,onFinish}) {
  const from=place(trip.from),to=place(trip.to)
  const length=Math.hypot(to.x-from.x,to.y-from.y)||1
  const dx=(to.x-from.x)/length,dy=(to.y-from.y)/length
  return <div className="voyage-transition" style={{'--flight-x':dx,'--flight-y':dy}} data-destination={to.id||'world'}>
    <div className="voyage-sky" aria-hidden="true" />
    {from.id&&<img className="voyage-departure" src={`/assets/production/images/seasonal-world/${from.id}-island-v1.webp`} alt="" aria-hidden="true"/>}
    {to.id&&<img className="voyage-destination" src={`/assets/production/images/seasonal-world/${to.id}-island-v1.webp`} alt="" aria-hidden="true"/>}
    {[0,1,2].map(i=><img key={i} className={`voyage-cloud voyage-cloud-${i}`} src="/assets/production/images/natural-world/painted-cloud-v1.webp" alt="" aria-hidden="true"/>)}
    <div className="voyage-caption"><span role="status">{trip.label}로 이동</span><Link to={trip.to} onClick={event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();onFinish()}}>바로 보기</Link></div>
  </div>
}
