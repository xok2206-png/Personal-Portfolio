import { Link } from 'react-router-dom'

export function GalleryNav({paused,onPause,reduced,projects,onSelect}){
 return   <details className="gallery-menu gallery-secondary-tools" onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary').focus()}}}><summary>전시 목록 · 설정</summary><nav aria-label="전시관 메뉴">{projects.map((p,i)=><button key={p.id} onClick={e=>{e.currentTarget.closest('details').open=false;onSelect(i)}}>{p.num} {p.name}</button>)}<Link to="/quick-view">프로젝트 요약 ↗</Link><button onClick={onPause} disabled={reduced}>{reduced?'동작 줄이기 적용 중':paused?'움직임 재생':'움직임 멈추기'}</button></nav></details>
}
export function GalleryIntro(){return <aside className="gallery-intro"><h2>좋은 경험이<br/>더 나은 가능성을 만듭니다.</h2><p>사용자의 일상에 스며드는<br/>의미 있는 웹 경험을 만들기 위한<br/>다양한 프로젝트를 소개합니다.</p><em>Same Ideas,<br/>A Brighter Tomorrow.</em></aside>}
export function ProjectHUD({project,selected}){return <aside className="gallery-project-hud" aria-label="프로젝트 미리보기">
 {project?<><img src={`/assets/production/images/project-gallery/${project.id}.webp`} alt=""/><div><small>{selected?'SELECTED PROJECT':'EXPLORE PROJECT'} · {project.num}</small><h2>{project.name}</h2><p>{project.description}</p><span>{project.role}</span><Link to={`/projects/${project.id}`}>CASE STUDY <span aria-hidden="true">→</span></Link></div></>:<div><small>SELECTED WORKS · 04</small><h2>어떤 경험을 만나볼까요?</h2><p>전시대에 다가가거나 작품을 선택하세요.</p><Link to="/quick-view">전체 프로젝트 보기 →</Link></div>}
 </aside>}
export function GalleryControls(){return <aside className="gallery-controls" id="gallery-help" tabIndex={0}><span className="gallery-desktop-help"><kbd>W A S D</kbd> / 방향키 이동 <i/> 마우스 선택 <i/> <kbd>E / Enter</kbd> 상호작용</span><span className="gallery-touch-help">바닥 탭으로 이동 · 작품 탭으로 선택</span></aside>}
export function GalleryCompass({heading}){return <div className="gallery-compass" aria-hidden="true"><span>N</span><div style={{rotate:`${heading}deg`}}>✧</div><span>S</span><small>EXPLORE<br/>MORE POSSIBILITIES</small></div>}
