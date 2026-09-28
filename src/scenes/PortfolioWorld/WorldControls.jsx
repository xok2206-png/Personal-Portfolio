import './WorldControls.css'

function Keys(){return <span className="control-keys" aria-hidden="true">{['←','↑','↓','→'].map(key=><kbd key={key}>{key}</kbd>)}</span>}
function Mouse(){return <svg className="control-mouse" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="4" y="2" width="12" height="20" rx="6"/><path d="M10 3v6M4 10h12"/></svg>}

export default function WorldControls({intro,moving,selected}){
 return <>
  {intro&&<aside className="world-intro-guide" role="status">
   <strong><span aria-hidden="true">◇</span> 월드를 탐험해보세요</strong>
   <p className="controls-desktop">W A S D / 방향키로 이동하거나,<br/>마우스로 원하는 섬을 선택할 수 있어요.</p>
   <p className="controls-touch">섬을 탭해 선택하고,<br/>한 번 더 탭하면 입장해요.</p>
  </aside>}
  {!intro&&<aside className="world-control-guide" tabIndex={0} aria-label="월드 조작 안내">
   <span className={`controls-desktop control-move ${moving?'is-active':''}`}><Keys/><span aria-hidden="true">이동</span><span className="lw-sr">방향키 또는 WASD로 이동</span></span>
   <span className="controls-desktop control-divider" aria-hidden="true">·</span>
   <span className={`controls-desktop control-select ${selected?'is-active':''}`}><Mouse/>마우스 · 섬 선택</span>
   <span className="controls-touch">탭으로 선택 · 한 번 더 탭해 입장</span>
  </aside>}
 </>
}
