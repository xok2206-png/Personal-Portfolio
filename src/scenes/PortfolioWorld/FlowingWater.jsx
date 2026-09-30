import { useId } from 'react'

// SVG alpha gradients remain consistent across browser GPU/compositing backends.
// The original island art supplies the source; this layer extends it into mist.
export default function FlowingWater({ island, running, speed = 1 }) {
 const broad = island.id === 'projects'
 const id = useId().replace(/:/g, '')
 return <div className="lw-water" aria-hidden="true" data-running={running}>
  <svg className="lw-water-streams" viewBox="0 0 100 150" preserveAspectRatio="none" style={{ '--water-duration': `${1.8 / speed}s` }}>
   <defs>
    <linearGradient id={`${id}-body`}>
     <stop stopColor="var(--sky-500)" stopOpacity="0"/>
     <stop offset=".22" stopColor="var(--sky-300)" stopOpacity=".25"/>
     <stop offset=".5" stopColor="var(--cloud)" stopOpacity=".55"/>
     <stop offset=".78" stopColor="var(--sky-300)" stopOpacity=".25"/>
     <stop offset="1" stopColor="var(--sky-500)" stopOpacity="0"/>
    </linearGradient>
    <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
     <stop stopColor="white" stopOpacity="0"/>
     <stop offset=".05" stopColor="white"/>
     <stop offset=".35" stopColor="white" stopOpacity=".8"/>
     <stop offset=".7" stopColor="white" stopOpacity=".3"/>
     <stop offset="1" stopColor="white" stopOpacity="0"/>
    </linearGradient>
    {island.water.map(([x,y,w,h],i)=><mask key={i} id={`${id}-fall-${i}`} maskUnits="userSpaceOnUse" x={x-w*.1} y={y} width={w*1.2} height={h}>
     <rect x={x-w*.1} y={y} width={w*1.2} height={h} fill={`url(#${id}-fade)`}/>
    </mask>)}
   </defs>
   {island.water.map(([x,y,w,h],i)=><g key={i} mask={`url(#${id}-fall-${i})`}>
    <path d={`M${x},${y} L${x+w},${y} Q${x+w*.97},${y+h*.5} ${x+w*1.08},${y+h} L${x-w*.08},${y+h} Q${x+w*.03},${y+h*.5} ${x},${y}`} fill={`url(#${id}-body)`}/>
    {Array.from({length:12},(_,lane)=>{
     const sx=x+w*(.10+lane*.071)
     const d=`M${sx},${y} C${sx-w*.04},${y+h*.3} ${sx+w*.06},${y+h*.65} ${sx+w*.03},${y+h}`
     return <g key={lane} fill="none" stroke="var(--cloud)" strokeWidth={Math.min(w*(lane%3===0?.035:.02),.23)} strokeLinecap="round">
      <path d={d} opacity=".14"/>
      <path className="lw-water-flow" d={d} pathLength="100" strokeDasharray={broad?"17 5":"9 13"} opacity={broad?.28:.48} style={{animationDelay:`${-lane*.27-i*.7}s`,animationDuration:`${(1.6+(lane%3)*.35)/speed}s`}}/>
      <path className="lw-water-flow lw-water-undercurrent" d={d} pathLength="100" stroke="var(--interaction)" strokeWidth={Math.min(w*.02,.16)} strokeDasharray="5 17" opacity={broad?.12:.22} style={{animationDelay:`${-lane*.19-i*.5}s`,animationDuration:`${2.8/speed}s`}}/>
     </g>
    })}
   </g>)}
  </svg>
 </div>
}
