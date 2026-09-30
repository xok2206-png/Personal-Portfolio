import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { usePortfolioUI } from '../app/PortfolioUIContext.jsx'
import './PageHeader.css'

const destinations = [['World', '/world-map'], ['About', '/about'], ['Skills', '/skills'], ['Projects', '/projects'], ['Contact', '/contact']]
const isPlainClick = event => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

function HeaderDialog({ kind, onClose, children }) {
  const dialog = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    dialog.current.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; previous?.focus?.() }
  }, [])
  return <dialog ref={dialog} className="portfolio-header-dialog" aria-label={kind === 'menu' ? '포트폴리오 메뉴' : '환경 설정'} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="portfolio-dialog-title"><h2>{kind === 'menu' ? '둘러보기' : '환경 설정'}</h2><button type="button" onClick={onClose} aria-label="닫기" autoFocus>×</button></div>
    {children}
  </dialog>
}

export default function PageHeader() {
  const { pathname } = useLocation()
  const { travelTo, previewDestination, setPreviewDestination, reduced, systemReduced, paused, setPaused, sound, setSound, tone } = usePortfolioUI()
  const [panel, setPanel] = useState(null)
  const current = destinations.find(([, path]) => pathname === path || (path === '/projects' && pathname.startsWith('/projects/')))?.[0] || (pathname === '/resume' ? 'Resume' : 'Portfolio')
  useEffect(() => { setPanel(null); setPreviewDestination(null) }, [pathname, setPreviewDestination])
  const previewId = ['/about', '/skills', '/projects', '/contact'].includes(previewDestination) && previewDestination !== pathname ? previewDestination.slice(1) : null
  const close = () => { setPanel(null); setPreviewDestination(null) }
  function choose(event, path, label) {
    if (!isPlainClick(event)) return
    event.preventDefault(); close(); travelTo(path, label)
  }
  function links() {
    return destinations.map(([label, path]) => <NavLink key={path} to={path} end={path !== '/projects'} data-preview={previewDestination === path} onPointerEnter={event => { if (event.pointerType !== 'touch') setPreviewDestination(path) }} onPointerLeave={() => setPreviewDestination(null)} onFocus={() => setPreviewDestination(path)} onBlur={() => setPreviewDestination(null)} onClick={event => choose(event, path, label)}>{label}</NavLink>)
  }
  return <>
    <header className="page-header">
      <div className="page-header-origin">
        <Link className="page-brand" to="/world-map" aria-label="JY · 월드맵" onClick={event => choose(event, '/world-map', 'World')}>JY.</Link>
        <Link className="page-realworld" to="/" onClick={close}><span aria-hidden="true">←</span> 리얼월드</Link>
      </div>
      <nav className="page-primary-nav" aria-label="주요 메뉴">{links()}</nav>
      <span className="page-current-location">{current}</span>
      <div className="page-header-tools"><Link className="page-resume" to="/resume">Resume <span aria-hidden="true">↗</span></Link><button className="page-settings" type="button" aria-haspopup="dialog" aria-expanded={panel === 'settings'} onClick={() => setPanel('settings')}>설정</button><button className="page-menu-toggle" type="button" aria-haspopup="dialog" aria-expanded={panel === 'menu'} onClick={() => setPanel('menu')}>메뉴</button></div>
    </header>
    {!panel && pathname !== '/world-map' && previewId && <aside className="page-destination-preview" aria-hidden="true"><img src={"/assets/production/images/natural-world/" + previewId + "-island-v1.webp"} alt=""/><span>{destinations.find(([, path]) => path === previewDestination)?.[0]} ↗</span></aside>}
    {panel && <HeaderDialog kind={panel} onClose={close}>
      {panel === 'menu' ? <><nav className="page-mobile-nav" aria-label="모바일 주요 메뉴">{links()}</nav><div className="page-mobile-utilities"><Link to="/" onClick={close}>← 리얼월드</Link><Link to="/resume" onClick={close}>Resume ↗</Link><button type="button" onClick={() => setPanel('settings')}>환경 설정</button></div></> : <div className="page-settings-list">
        <button type="button" disabled={systemReduced} aria-pressed={!reduced} onClick={() => setPaused(!paused)}><span>배경 움직임</span><strong>{reduced ? '일시정지' : '재생 중'}</strong></button>
        <button type="button" aria-pressed={sound} onClick={() => { setSound(!sound); if (!sound) tone(true) }}><span>선택 효과음</span><strong>{sound ? '켜짐' : '꺼짐'}</strong></button>
        <p>{systemReduced ? '기기의 동작 줄이기 설정을 적용하고 있습니다.' : '움직임을 멈춰도 모든 콘텐츠를 이용할 수 있습니다.'}</p>
        <p>이동 가능한 공간에서는 WASD·방향키 또는 바닥 선택으로 이동합니다. 메뉴로 바로 이동할 수도 있습니다.</p>
      </div>}
    </HeaderDialog>}
  </>
}
