import { useId } from 'react'

// Each landmark has its own idle activity; all animation is owned by CSS.
export default function SeasonalIslandLife({ id }) {
 const gradient = useId().replace(/:/g, '')
 return <svg className={'seasonal-life seasonal-life-' + id} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <defs>
   <radialGradient id={gradient + '-warm'}>
    <stop stopColor="var(--cloud)" stopOpacity=".8"/>
    <stop offset=".5" stopColor="var(--warm-accent)" stopOpacity=".45"/>
    <stop offset="1" stopColor="var(--warm-accent)" stopOpacity="0"/>
   </radialGradient>
   <linearGradient id={gradient + '-beam'}>
    <stop stopColor="var(--cloud)" stopOpacity="0"/>
    <stop offset="1" stopColor="var(--cloud)" stopOpacity=".85"/>
   </linearGradient>
  </defs>
  {id === 'about' && <>
   <ellipse className="archive-welcome" cx="69" cy="46" rx="16" ry="10" fill={`url(#${gradient}-warm)`}/>
   {[[18,29],[37,18],[64,17],[77,28],[27,39],[55,31],[84,38],[42,25]].map(([x,y],i) =>
    <g key={i} transform={`translate(${x} ${y})`}>
     <g className="seasonal-petal" style={{animationDelay:(-i*.83)+'s',animationDuration:(5.8+i%3*.8)+'s'}}>
      <path d="M0 0Q1.6-1.5 2.2 0Q1.2 2.1 0 0"/>
     </g>
    </g>)}
  </>}
  {id === 'skills' && <>
   <path className="wind-canvas-light" d="M43 20Q35 31 47 43Q50 45 54 45Q45 32 43 20ZM58 16Q63 29 54 39Q63 33 61 23Z"/>
   <g transform="translate(58 44) scale(.72 1)">
    <g className="seasonal-gear">
     <circle r="3.5" fill="none" strokeWidth=".7" strokeDasharray=".8 .9"/>
     <circle r="2.8" fill="none" strokeWidth=".5"/>
     <path d="M-2.7 0h5.4M0-2.7v5.4M-1.9-1.9l3.8 3.8M-1.9 1.9l3.8-3.8" fill="none" strokeWidth=".5"/>
    </g>
   </g>
   <g className="seasonal-wind" fill="none">
    <path d="M22 32Q32 26 48 30T72 27" pathLength="100"/>
    <path d="M30 21Q42 16 61 22T80 18" pathLength="100"/>
   </g>
  </>}
  {id === 'projects' && <>
   <g className="gallery-lamps">
    {['M26 36L38 37V43H26Z','M46 35H51V43H46Z','M56 35H60V43H56Z','M69 37L80 36V43H69Z'].map((d,i) =>
     <path key={d} className="gallery-window" d={d} style={{animationDelay:(-i*1.2)+'s'}}/>)}
   </g>
   {[[15,35],[30,26],[64,27],[82,34],[13,48],[86,47]].map(([x,y],i) =>
    <g key={i} transform={`translate(${x} ${y})`}>
     <g className="seasonal-leaf" style={{animationDelay:(-i*1.1)+'s',animationDuration:(6.5+i%3)+'s'}}>
      <path d="M0 0Q1.2-2.2 2.8-1Q2.3 1.3 0 0"/>
     </g>
    </g>)}
  </>}
  {id === 'contact' && <>
   <g transform="translate(72 13)">
    <path className="seasonal-beacon" d="M0 0L-37-7Q-41 0-37 7Z" fill={`url(#${gradient}-beam)`}/>
    <ellipse className="beacon-lantern-light" rx="4.5" ry="2" fill={`url(#${gradient}-warm)`}/>
   </g>
   {[[35,31],[51,21],[67,30],[87,25],[40,43],[75,44],[92,43],[58,37],[29,51],[83,53]].map(([x,y],i) =>
    <g key={i} transform={`translate(${x} ${y})`}>
     <circle className="seasonal-snow" r={i%3===0 ? .45 : .3}
      style={{animationDelay:(-i*.63)+'s',animationDuration:(5+i%3)+'s'}}/>
    </g>)}
  </>}
 </svg>
}
