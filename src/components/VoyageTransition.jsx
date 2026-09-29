import './VoyageTransition.css'
export default function VoyageTransition({label,arrived}){
 return <div className="voyage-transition" data-arrived={arrived} role="status" aria-live="polite"><div className="voyage-clouds" aria-hidden="true"/><div className="voyage-content"><span className="voyage-caption">다음 세계로 항해 중</span><svg viewBox="0 0 360 100" aria-hidden="true"><path className="voyage-path" d="M20 75Q100 10 180 50T340 25"/><g className="voyage-ship"><ellipse cx="0" cy="0" rx="24" ry="12"/><path d="M-23 0H24M-8-11Q-15 0-8 11M8-11Q15 0 8 11M-10 12l4 9h13l4-9M-4 13v8"/><path d="m-24-3-8-7v20l8-7"/></g></svg><strong>{label}</strong></div></div>
}
