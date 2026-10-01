import { projectDetailsEnabled } from './projectAccess.js'
import { useEffect, useRef, useState } from 'react'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import { usePortfolioUI } from '../../app/PortfolioUIContext'
import { worldAsset, sunsetAsset, worldProjects } from './projectWorld'
import useProjectExploration from './useProjectExploration'
import ProjectScreen from './ProjectScreen'
import ProjectDepth from './ProjectDepth'
import ProjectAtmosphere from './ProjectAtmosphere'
import './ProjectsWorld.css'
import './ProjectsHUD.css'
import './ProjectsRefinement.css'

function ProjectPicker({ onClose, onWalk, onDetail }) {
  const dialog = useRef(null)
  const [returnFocus] = useState(() => document.activeElement)
  useEffect(() => {
    const element=dialog.current
    element.showModal()
    return () => { element.close();returnFocus?.focus?.() }
  }, [returnFocus])
  return <dialog className="pw-picker" ref={dialog} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }} aria-labelledby="pw-picker-title">
    <header><h2 id="pw-picker-title">목적지 선택</h2><button onClick={onClose} aria-label="목록 닫기">닫기</button></header>
    <div className="pw-destination-list">{worldProjects.map((p,index) => <section key={p.id} className="pw-destination-row"><div><small>{p.landmark}</small><h3>{p.name}</h3></div><div className="pw-destination-actions"><button className="pw-walk-action" onClick={() => { onClose(); onWalk(index) }}>바로 이동</button><button className="pw-detail-action" disabled={!projectDetailsEnabled} title="상세 내용 준비 중" onClick={() => onDetail(p)}>상세 보기</button></div></section>)}</div>
  </dialog>
}

function ProjectDetailDialog({ project, onClose, fallback }) {
  const dialog = useRef(null)
  const [returnFocus] = useState(() => document.activeElement)
  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    return () => {
      element.close(); document.body.style.overflow = previousOverflow
      if (returnFocus?.isConnected) returnFocus.focus()
      else fallback.current?.focus()
    }
  }, [returnFocus, fallback])
  return <dialog ref={dialog} className="pw-detail-dialog" aria-label={project.name + ' 상세 보기'} onCancel={onClose}>
    <button className="pw-detail-close" onClick={onClose} autoFocus aria-label="상세 닫기">닫기 ×</button>
    <ProjectDetail projectId={project.id} onClose={onClose} />
  </dialog>
}

export default function Projects() {
  const { reduced, paused } = usePortfolioUI()
  const viewport = useRef(null), stage = useRef(null), walker = useRef(null), roadCursor=useRef(null)
  const [selected, setSelected] = useState(null)
  const [waypoint, setWaypoint] = useState(null)
  const [picker, setPicker] = useState(false)
  const [entering, setEntering] = useState(null)
  const [hidden, setHidden] = useState(document.hidden)
  const [onscreen, setOnscreen] = useState(true)
  const [artFailed, setArtFailed] = useState(false)
  const [time, setTime] = useState(() => { try { return Math.min(240, Number(sessionStorage.getItem('projects-time')) || 0) } catch { return 0 } })
  function enter(project) {
    if (!projectDetailsEnabled || entering) return
    explore.stop(); setPicker(false)
    setEntering(project)
  }
  const explore = useProjectExploration({ viewport, stage, walker, roadCursor, paused: reduced || paused || Boolean(entering), onEnter: enter, onApproach: () => setSelected(null) })
  const current = selected !== null ? worldProjects[selected] : explore.near !== null ? worldProjects[explore.near] : null
  useEffect(() => {
    const visibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', visibility)
    const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting))
    observer.observe(viewport.current)
    const open = () => setPicker(true)
    window.addEventListener('projects:select', open)
    const escape = event => {
      if (event.key === 'Escape' && !document.querySelector('dialog[open]')) setSelected(null)
      if (event.key.toLowerCase()==='m' && !event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey && !document.querySelector('dialog[open]') && !event.target.closest?.('input,textarea,select,[contenteditable="true"]')) { event.preventDefault();setPicker(true) }
    }
    window.addEventListener('keydown', escape)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('projects:select', open); window.removeEventListener('keydown', escape) }
  }, [])
  useEffect(() => {
    if (reduced || paused || hidden || !onscreen) return
    const timer = setInterval(() => setTime(value => Math.min(value + 1, 240)), 1000)
    return () => clearInterval(timer)
  }, [reduced, paused, hidden, onscreen])
  useEffect(() => { try { sessionStorage.setItem('projects-time', String(time)) } catch { /* Optional storage. */ } }, [time])
  function choose(index) { setSelected(index); setWaypoint(index); explore.warpTo(worldProjects[index]) }
  function setDirection(index) { choose(index) }
  const sunset=Math.max(0,time-20)/220*.38

  return <main id="main" className="projects-world" data-still={reduced || paused || hidden || !onscreen} data-entering={Boolean(entering)}>
    <section className="pw-landscape" aria-label="다섯 프로젝트 탐험 공간">
      <div className="pw-viewport" ref={viewport} tabIndex={0} aria-label="프로젝트 탐험: WASD와 방향키로 이동, Shift로 달리기, E로 입장" aria-describedby="pw-help" onPointerDown={explore.pointerDown} onPointerMove={explore.pointerMove} onPointerUp={explore.pointerUp} onPointerCancel={explore.stop} onPointerLeave={()=>{if(roadCursor.current)roadCursor.current.hidden=true}}>
        <div className="pw-stage" ref={stage}>
          <img className="pw-environment" src={worldAsset} alt="물가부터 숲과 언덕 정원까지 길로 연결된 프로젝트 계곡" fetchPriority="high" onError={() => setArtFailed(true)} />
          <img className="pw-sunset" src={sunsetAsset} alt="" style={{ opacity: sunset }} onError={e => { e.currentTarget.hidden = true }} />
          <ProjectAtmosphere sunset={sunset} />
          <nav className="pw-landmarks" aria-label="랜드마크 선택">
            {worldProjects.map((project, index) => <div key={project.id} className="pw-landmark" data-active={current?.id === project.id} data-near={explore.near === index} style={{ left: `${project.x}%`, top: `${project.y}%` }}>
              <button className="pw-landmark-label" onClick={() => choose(index)} aria-pressed={selected === index} aria-label={`${project.name}${explore.visited.includes(project.id) ? ', 방문함' : ''}`}>
                <strong>{project.name}</strong><i className="pw-location-pin" aria-hidden="true" data-visited={explore.visited.includes(project.id)} />
              </button>
              {project.screen && <ProjectScreen project={project} className="pw-landmark-screen" />}
              {explore.near === index && <button className="pw-near-enter" disabled={!projectDetailsEnabled} title="상세 내용 준비 중" onClick={() => enter(project)}><kbd>E</kbd> 입장</button>}
            </div>)}
          </nav>
          {waypoint !== null && <div className="pw-waypoint" style={{ left: `${worldProjects[waypoint].entrance[0]}%`, top: `${worldProjects[waypoint].entrance[1]}%` }}><span /><b>{worldProjects[waypoint].name}</b></div>}
          <div className="pw-character" ref={walker} aria-hidden="true" style={{ left: '71.5%', top: '88%' }}>
            <span className="pw-shadow" /><div className="pw-person"><img className="pw-idle" src="/assets/production/images/projects-world/character/back-idle-v2.webp" alt="" onError={e => { e.currentTarget.hidden = true }} /><div className="pw-stride"><img src="/assets/production/images/projects-world/character/back-walk-v2.webp" alt="" onError={e => { e.currentTarget.closest('.pw-character').dataset.spriteFailed = true }} /></div></div>
          </div>
          <ProjectDepth sunset={sunset} />
          <span className="pw-road-cursor" ref={roadCursor} hidden aria-hidden="true" />
        </div>
      </div>
      <h1 className="pw-accessible-title">프로젝트</h1>
      <div className="pw-camera" aria-label="카메라 배율"><button onClick={() => explore.changeZoom(explore.zoom + .2)} aria-label="확대" disabled={explore.zoom >= 1.8}>+</button><button onClick={() => explore.changeZoom(explore.zoom - .2)} aria-label="축소" disabled={explore.zoom <= 1}>−</button></div>
      {artFailed && <p className="pw-art-fallback" role="status">풍경을 불러오지 못했습니다. 프로젝트 목록에서 모든 작업을 볼 수 있습니다.</p>}
      <p className="pw-discovery" role="status">{explore.discovery && `${explore.discovery}에 도착했습니다.`}</p>
      {current && <aside className="pw-preview" aria-label={`${current.name} 미리보기`}>
        <button className="pw-preview-close" aria-label="미리보기 닫기" onClick={() => { setSelected(-1); viewport.current?.focus() }}>×</button>
        {current.screen && <ProjectScreen key={current.id} project={current} />}
        <div className="pw-preview-body"><small>{current.landmark}</small><h2>{current.name}</h2><p>{current.description}</p><span>{current.role || '담당 역할 자료 준비 중'}</span><div className="pw-preview-actions"><button onClick={() => setDirection(worldProjects.indexOf(current))}>바로 이동</button><button className="pw-detail-action" disabled={!projectDetailsEnabled} title="상세 내용 준비 중" onClick={() => enter(current)}>상세 보기</button></div></div>
      </aside>}
      <div className="pw-bottom">
        <button className="pw-journey-menu" onClick={() => setPicker(true)} aria-haspopup="dialog" aria-keyshortcuts="M"><span className="pw-compass-mark" aria-hidden="true"/><span>목적지 선택{waypoint !== null && <small>{worldProjects[waypoint].name}</small>}</span><kbd>M</kbd></button>
        <p id="pw-help"><span><kbd>WASD</kbd> 이동</span><span><kbd>Shift</kbd> 달리기</span><span><kbd>E</kbd> 입장</span><span className="pw-mouse-hint">길 클릭으로 이동</span></p>
      </div>
    </section>
    <section className="pw-mobile-index" aria-labelledby="pw-index-title"><h2 id="pw-index-title">목적지 선택</h2>{worldProjects.map((p,index) => <button key={p.id} onClick={() => choose(index)}><div><small>{p.landmark}</small><h3>{p.name}</h3><p>{p.role || '자료 준비 중'}</p></div><span aria-hidden="true">↗</span></button>)}</section>
    {picker && <ProjectPicker onClose={() => setPicker(false)} onWalk={setDirection} onDetail={enter} />}
    {projectDetailsEnabled && entering && <ProjectDetailDialog project={entering} fallback={viewport} onClose={() => setEntering(null)} />}
  </main>
}
