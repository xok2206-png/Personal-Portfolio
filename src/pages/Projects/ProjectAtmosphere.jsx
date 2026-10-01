import './ProjectAtmosphere.css'

const cloud = '/assets/production/images/natural-world/painted-cloud-v1.webp'
const water = [[14,68,17,8],[2,63,12,5],[23,73,10,4],[29,20.5,15,3],[46,25,12,3],[9,25,6,2]]
const falls = [[7.5,13.3,.95,11.1],[8.1,35.7,.85,8.5]]
const flocks = [{top:15,time:49,delay:-24,size:13,count:5},{top:10,time:68,delay:-9,size:9,count:6},{top:19,time:57,delay:-41,size:11,count:4}]
const leaves = [
  { top:37, delay:-7, duration:19, size:10 },
  { top:49, delay:-16, duration:24, size:8 },
  { top:63, delay:-3, duration:21, size:12 },
  { top:76, delay:-11, duration:26, size:11 },
  { top:86, delay:-20, duration:29, size:14 },
  { top:56, delay:-25, duration:32, size:7 },
]
// Reuse the leaf and bird silhouettes from WorldAtmosphere. The landscape
// stays fixed outside the masked river and waterfall surfaces.
const leafContours = [
  'M1 10 6 7 5 5 10 5 12 2 15 3 29 1 24 6 25 8 21 9 19 12 15 11 11 14 8 12Z',
  'M1 12 9 6 15 4 29 1 23 6 19 10 12 12 7 11Z',
]
export default function ProjectAtmosphere({ sunset = 0 }) {
  return <>
    <div className="pw-water-motion pw-river-motion" aria-hidden="true"><img src="/assets/production/images/projects-world/valley-roads-v3.webp" alt="" /></div>
    <div className="pw-water-motion pw-cascade-motion pw-cascade-upper" aria-hidden="true"><img src="/assets/production/images/projects-world/valley-roads-v3.webp" alt="" /></div>
    <div className="pw-water-motion pw-cascade-motion pw-cascade-lower" aria-hidden="true"><img src="/assets/production/images/projects-world/valley-roads-v3.webp" alt="" /></div>
    {water.map(([x,y,w,h],i)=><div key={`water-${i}`} className="pw-lake-surface" aria-hidden="true" style={{left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`,'--water-delay':`${-i*2.1}s`}}><div className="pw-water-glints" /><div className="pw-water-glints pw-water-return" /></div>)}
    {falls.map(([x,y,w,h],i)=><div key={`fall-${i}`} className="pw-falls-light" aria-hidden="true" style={{left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`}}>{[0,1,2].map(j=><i key={j} style={{left:`${j*33}%`,'--fall-delay':`${-j*.71-i*.32}s`,'--fall-time':`${1.6+j*.4}s`}} />)}</div>)}
    <div className="pw-sun" aria-hidden="true" style={{opacity:.85-sunset*.18}}><span /></div>
    <div className="pw-sky-cloud pw-sky-cloud-near" aria-hidden="true"><img src={cloud} alt="" /></div>
    <div className="pw-sky-cloud pw-sky-cloud-far" aria-hidden="true"><img src={cloud} alt="" /></div>
    <div className="pw-airship-route" aria-hidden="true"><img className="pw-airship" src="/assets/production/images/world-layers/airship.webp" alt="" onError={e=>{e.currentTarget.hidden=true}} /></div>
    {flocks.map((flock,f)=><div key={f} className="pw-bird-flock" aria-hidden="true" style={{top:`${flock.top}%`,animationDuration:`${flock.time}s`,animationDelay:`${flock.delay}s`}}>{Array.from({length:flock.count},(_,i)=><svg key={i} viewBox="0 0 32 18" className="pw-bird" style={{left:`${i*26}px`,top:`${Math.abs(i-2)*9}px`,width:`${flock.size+i%2*2}px`,'--wing-delay':`${-i*.31-f*.27}s`}}>
      <path className="pw-wing pw-wing-left" d="M16 11Q8 2 0 5Q8 5 16 13Z"/><path className="pw-wing pw-wing-right" d="M16 11Q24 2 32 5Q24 5 16 13Z"/><path d="m15 9 2 0 1 6-2-1-2 1Z"/>
    </svg>)}</div>)}
    <div className="pw-wind-leaves" aria-hidden="true">{leaves.map((leaf,i)=><div className="pw-leaf-route" key={i} style={{top:`${leaf.top}%`,'--leaf-time':`${leaf.duration}s`,'--leaf-delay':`${leaf.delay}s`,'--leaf-size':`${leaf.size}px`}}>
      <svg viewBox="0 0 30 16" className="pw-flying-leaf"><path d={leafContours[i%2]} fill={i%3===0?'var(--warm-accent)':'var(--grass-500)'}/><path d="M0 13 26 3M10 9 11 6M17 6 18 10" stroke="var(--stone-200)" strokeWidth=".45"/></svg>
    </div>)}</div>
  </>
}
