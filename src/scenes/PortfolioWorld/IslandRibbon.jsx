export default function IslandRibbon({ title, subtitle }) {
 return <span className="natural-island-label"><strong>{title}<span aria-hidden="true">↗</span></strong>{subtitle && <small>{subtitle}</small>}</span>
}
