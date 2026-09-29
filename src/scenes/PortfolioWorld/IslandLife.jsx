// Decorative light follows each island; CSS owns motion and pause/reduced motion.
export default function IslandLife({id}) {
 return <div className={`lw-landmark-life life-${id}`} aria-hidden="true">
  <span className="island-feature-effect"/><span className="island-feature-secondary"/><span className="lw-landmark-light"/><span className="lw-landmark-response"/>
  <svg className="lw-landmark-detail" viewBox="0 0 100 100" focusable="false">
   {id==='about'&&<g className="studio-windows"><path d="M39 33V30Q40 28 41 30V33ZM49 35V31Q50.5 29 52 31V35ZM58 34V31Q59.5 29 61 31V34Z"/></g>}
   {id==='skills'&&<g className="workshop-circuit"><path className="energy-trace" d="M50 5 63 16 51 28 39 16ZM50 5 51 28M39 16H63"/><ellipse className="orbit-trace" cx="51" cy="18" rx="18" ry="8"/></g>}
   {id==='projects'&&<g className="gallery-power"><path className="gateway-trace" d="M46 45V39Q50 33 54 39V45"/><path className="spire-trace" d="M50 9V3"/><ellipse className="orbit-trace" cx="50" cy="40" rx="4" ry="5"/></g>}
   {id==='qa'&&<g className="celestial-instrument"><ellipse className="celestial-orbit" cx="57" cy="35" rx="4" ry="5" transform="rotate(35 57 35)"/><ellipse className="celestial-orbit secondary" cx="57" cy="35" rx="4" ry="2"/></g>}
   {id==='contact'&&<g className="beacon-lantern"><path d="M59 11H62V13H59Z"/><path className="beacon-flare" d="M60.5 9V15M57.5 12H63.5"/></g>}
  </svg>
 </div>
}
