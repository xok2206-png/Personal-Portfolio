// Decorative light lives in the island coordinate system and follows its float.
// CSS owns these small motions; the world pause/reduced-motion rules apply.
export default function IslandLife({id}) {
 return <div className={`lw-landmark-life life-${id}`} aria-hidden="true">
  <span className="lw-landmark-light"/><span className="lw-landmark-response"/>
  <svg className="lw-landmark-detail" viewBox="0 0 100 100" focusable="false">
   {id==='about'&&<g className="studio-windows">
    <path d="M48.8 36.8V32.5Q50.4 29.4 52.2 32.5V36.8Z"/>
    <path d="M48.6 26.3V24Q50 21.8 51.4 24V26.3Z"/>
    <path d="M33.3 43V40Q35 37.6 36.6 40V43Z"/>
    <path d="M62.2 44V41Q63.5 39 64.8 41V44Z"/>
   </g>}
   {id==='skills'&&<g className="workshop-circuit">
    <path className="energy-trace" d="M43 12 50 8.4 56.5 12V20L50 23.5 43 20ZM43 12 56.5 20M50 8.4V23.5M56.5 12 43 20"/>
    <path className="screen-trace" d="M37 29H44V36H37ZM51 29H58V36H51ZM66 29H68V35H66Z"/>
    <ellipse className="orbit-trace" cx="50" cy="26.2" rx="18" ry="1.6"/>
   </g>}
   {id==='projects'&&<g className="gallery-power">
    <path className="gateway-trace" d="M48.6 41.3V37.5Q50 34.5 51.4 37.5V41.3M48.7 29.7V25.5Q50 23 51.3 25.5V29.7"/>
    <path className="spire-trace" d="M50 22V5M44 22V12M56 22V12"/>
    <ellipse className="orbit-trace" cx="50" cy="14.5" rx="18.7" ry="3.1"/>
   </g>}
   {id==='qa'&&<g className="celestial-instrument">
    <ellipse className="celestial-orbit" cx="51" cy="15" rx="9.8" ry="6.2" transform="rotate(40 51 15)"/>
    <ellipse className="celestial-orbit secondary" cx="51" cy="15" rx="9.8" ry="3.2" transform="rotate(-38 51 15)"/>
    <path className="celestial-star" d="M51 11V19M47 15H55M49 13 53 17M49 17 53 13"/>
   </g>}
   {id==='contact'&&<g className="beacon-lantern">
    <path d="M44 8.3H47.8V10H44Z"/>
    <path className="beacon-flare" d="M45.9 6.1V12.1M42.5 9.1H49.3"/>
   </g>}
  </svg>
 </div>
}
