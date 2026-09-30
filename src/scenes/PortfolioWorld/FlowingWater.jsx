import { useId } from 'react'
import { seasonalRoot } from './layers.config.js'

// Reuse the approved water pixels, tiled downwards inside feathered waterfall masks.
// CSS moves only original water pixels; no drawn white ripple/foam strokes.
export default function FlowingWater({ island, running }) {
 const id = useId().replace(/:/g, '')
 return <div className="lw-water" aria-hidden="true" data-running={running}>
  <svg className="lw-water-streams" viewBox="0 0 100 100" focusable="false">
   <defs>
    <filter id={id + '-surface-soft'} x="-10%" y="-10%" width="120%" height="120%">
     <feGaussianBlur stdDeviation=".22"/>
    </filter>
    <mask id={id + '-surface'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
     <g fill="white" filter={`url(#${id}-surface-soft)`}>
      {island.surfaceAreas.map(d => <path key={d} d={d}/>)}
     </g>
    </mask>
    <linearGradient id={id + '-edge'}>
     <stop stopColor="white" stopOpacity="0"/>
     <stop offset=".18" stopColor="white"/>
     <stop offset=".82" stopColor="white"/>
     <stop offset="1" stopColor="white" stopOpacity="0"/>
    </linearGradient>
    <linearGradient id={id + '-fade'} x1="0" y1="0" x2="0" y2="1">
     <stop stopColor="white" stopOpacity="0"/>
     <stop offset=".08" stopColor="white"/>
     <stop offset=".7" stopColor="white"/>
     <stop offset="1" stopColor="white" stopOpacity="0"/>
    </linearGradient>
    {island.water.map(([x,y,w,h],i) => {
     const tile = Math.min(8, h * .65)
     return <g key={i}>
      <pattern id={id + '-texture-' + i} x={x} y={y} width={w} height={tile}
       patternUnits="userSpaceOnUse" viewBox={`${x} ${y + h * .18} ${w} ${tile}`} preserveAspectRatio="none">
       <image href={seasonalRoot + island.art} width="100" height="100"/>
      </pattern>
      <mask id={id + '-fall-' + i} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
       <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-fade)`}/>
      </mask>
      <mask id={id + '-sides-' + i} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
       <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-edge)`}/>
      </mask>
     </g>
    })}
   </defs>
   {island.water.map(([x,y,w,h],i) => {
    const tile = Math.min(8, h * .65)
    return <g key={i} mask={`url(#${id}-fall-${i})`}>
     <g mask={`url(#${id}-sides-${i})`}>
      <rect className="lw-water-texture" x={x} y={y-tile} width={w} height={h+tile*2}
       fill={`url(#${id}-texture-${i})`}
       style={{'--water-travel':tile + 'px',animationDuration:(.85+i*.17) + 's',animationDelay:(-i*.37) + 's'}}/>
     </g>
    </g>
   })}
   <g mask={`url(#${id}-surface)`}>
    <image className="lw-water-surface-texture" href={seasonalRoot + island.art} width="100" height="100"
     style={{animationDelay:island.phase + 's',animationDuration:island.id === 'contact' ? '6.8s' : '4.8s'}}/>
   </g>
  </svg>
 </div>
}
