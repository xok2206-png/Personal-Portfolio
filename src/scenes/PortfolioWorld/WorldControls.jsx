import './WorldControls.css'

export default function WorldControls({intro}){
 return <>{intro && <aside className="world-intro-guide" role="status">
  <strong><span aria-hidden="true">◇</span> 월드를 탐험해보세요</strong>
  <p className="controls-desktop">방향키로 이동하거나, 마우스로 원하는 섬을 선택할 수 있어요.</p>
  <p className="controls-touch">밀어서 둘러보기 · 탭으로 선택</p>
 </aside>}
 </>
}
