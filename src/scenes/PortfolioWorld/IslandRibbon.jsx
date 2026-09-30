export default function IslandRibbon({ title, subtitle }) {
 return <span className="natural-island-label"><strong>{title}</strong>{subtitle && <small>{subtitle}</small>}<span className="seasonal-enter-cue" aria-hidden="true">입장하기 <span>→</span></span></span>
}
