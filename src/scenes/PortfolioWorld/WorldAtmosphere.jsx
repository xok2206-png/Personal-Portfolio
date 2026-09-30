const cloud = '/assets/production/images/natural-world/painted-cloud-v1.webp'

// Fixed seeds keep hydration/reloads stable; long staggered quiet intervals avoid a confetti loop.
const leaves = Array.from({ length: 3 }, (_, i) => ({
  delay: -(i * 4.7 + 6), duration: 24 + (i * 7 % 19),
  top: 13 + (i * 17 % 67), size: 11 + (i * 3 % 10), depth: i % 3,
}))
const leafContours = [
  'M1 10 6 7 5 5 10 5 12 2 15 3 29 1 24 6 25 8 21 9 19 12 15 11 11 14 8 12Z',
  'M1 11 8 7 7 5 13 4 14 2 19 3 29 0 25 6 21 8 20 11 15 10 12 13 7 12Z',
  'M1 12 9 6 15 4 29 1 23 6 19 10 12 12 7 11Z',
]

export function WaterMist({ island }) {
  return <div className="lw-water-mist" aria-hidden="true">{island.water.map(([x,y,w,h],i)=><img
    key={i} src={cloud} alt="" className="lw-spray"
    style={{left:`${x-w*1.5}%`,top:`${y+h-9}%`,width:`${w*4}%`,'--mist-time':`${11+i*4+island.drift}s`,'--mist-delay':`${-i*6-island.drift}s`}}
  />)}</div>
}

export default function WorldAtmosphere() {
  return <>
    <div className="lw-cloud-banks" aria-hidden="true">{[0,1,3].map(i=><div key={i} className={`lw-cloud-bank bank-${i}`}><img src={cloud} alt=""/></div>)}</div>
    <div className="lw-haze" aria-hidden="true">
      <img className="lw-haze-ribbon haze-a" src={cloud} alt=""/>
      <img className="lw-haze-ribbon haze-b" src={cloud} alt=""/>
      <img className="lw-haze-ribbon haze-c" src={cloud} alt=""/>
    </div>
    <div className="lw-birdlife" aria-hidden="true">{[0].map(flock=><div className={`lw-flock flock-${flock}`} key={flock}>{[0,1,2,3,4].map(i=><svg key={i} viewBox="0 0 32 18" className="lw-bird" style={{left:`${i*27}px`,top:`${Math.abs(i-2)*10}px`,'--wing-delay':`${-i*.37}s`,width:`${flock===1?11:16+i%2*3}px`}}><path className="bird-wing bird-left" d="M16 11Q8 2 0 5Q8 5 16 13Z"/><path className="bird-wing bird-right" d="M16 11Q24 2 32 5Q24 5 16 13Z"/><path d="m15 9 2 0 1 6-2-1-2 1Z"/></svg>)}</div>)}</div>
    <div className="lw-wind-life" aria-hidden="true">
      {leaves.map((leaf,i)=><div key={i} className={`lw-leaf-flight leaf-depth-${leaf.depth}`} style={{top:`${leaf.top}%`,'--leaf-time':`${leaf.duration}s`,'--leaf-delay':`${leaf.delay}s`,'--leaf-size':`${leaf.size}px`}}>
        <svg viewBox="0 0 30 16" className="lw-leaf"><path d={leafContours[i%3]} fill={i%3===0?'var(--grass-300)':'var(--grass-500)'}/><path d="M0 13 26 3M10 9 11 6M17 6 18 10" stroke="var(--stone-200)" strokeWidth=".45" fill="none"/></svg>
      </div>)}
    </div>
  </>
}
