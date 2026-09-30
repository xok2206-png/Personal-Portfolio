import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/content.js'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './About.css'
import LivingEnvironment from '../../components/LivingEnvironment.jsx'

const tabs = ['프로필', '여정', '작업 기준', '관심사']
const keywords = ['UI/UX', 'Frontend', 'Publishing', 'Interaction']
const icons = ['M4 5h16v12H4z M8 21h8 M12 17v4 M8 9h5v4H8z','m8 6-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18','M12 7c-3-3-7-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-2-1-6-2-9 1Z M12 7v13 M9 2v3 M15 2v3','M10 13V6a2 2 0 0 1 4 0v6 M14 10a2 2 0 0 1 4 0v3 M18 12a2 2 0 0 1 4 0v5c0 4-3 6-7 5l-6-5-2-3c-1-2 1-3 3-1l2 2 M6 7C1 6 1 13 5 14']
export default function About() {
  const { reduced } = usePortfolioUI()
  const [tab, setTab] = useState(0)
  const [part, setPart] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)
  const opener = useRef(null), panelTitle = useRef(null)
  const open = event => { opener.current = event.currentTarget; setPanelOpen(true) }
  const close = () => { setPanelOpen(false); requestAnimationFrame(() => (opener.current?.isConnected ? opener.current : document.querySelector('.archive-overview'))?.focus()) }
  useEffect(() => { if (!panelOpen) return; panelTitle.current?.focus(); if (window.innerWidth < 768) panelTitle.current?.scrollIntoView({block:'start',behavior:'instant'}); const key = event => { if (event.key === 'Escape') { setPanelOpen(false); requestAnimationFrame(() => (opener.current?.isConnected ? opener.current : document.querySelector('.archive-overview'))?.focus()) } }; window.addEventListener('keydown',key); return () => window.removeEventListener('keydown',key) }, [panelOpen])
  const buttons = useRef([])
  function tabKey(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null
    if (next === null) return
    event.preventDefault(); setTab(next); buttons.current[next]?.focus()
  }
  return <main id="main" className="about-archive" data-reduced={reduced} data-profile-part={part}>
    <div className="about-atelier" aria-hidden="true"/><LivingEnvironment variant="atelier"/>
    <section className="archive-identity" aria-labelledby="archive-name">
      <p className="archive-eyebrow">ABOUT</p>
      <h1 id="archive-name" tabIndex="-1">KIM<br/>JUNYOUNG</h1>
      <h2>디자인을 이해하고<br/>직접 구현하는 프론트엔드 개발자</h2>
      <p className="archive-intro">{profile.intro}</p>
      <ul className="archive-tags">{keywords.map(word => <li key={word}>{word}</li>)}</ul>
      <button type="button" className="archive-overview" aria-expanded={panelOpen} aria-controls="about-profile-panel" onClick={open}>프로필 살펴보기 ↗</button>
      <p className="archive-motto">Same Tools,<br/><em>A Brighter Me.</em></p>
    </section>
    <figure className="archive-character"><img src="/assets/production/images/natural-world/about-character-v1.webp" alt="작업실 책상에 앉아 생각하는 김준영의 포트폴리오 캐릭터" onError={e => { e.currentTarget.hidden = true }}/></figure>
    {!panelOpen && <button type="button" className="archive-notebook-target" onClick={open} aria-label="작업 노트에서 프로필 열기">작업 노트 ↗</button>}
    {panelOpen && <section id="about-profile-panel" className="archive-panel" aria-label="개인 프로필 아카이브">
      <header className="archive-panel-heading"><h2 ref={panelTitle} tabIndex="-1">프로필</h2><button type="button" onClick={close} aria-label="프로필 닫기">×</button></header>
      <div id="archive-content" className="archive-content" role="tabpanel" tabIndex="0" aria-labelledby={'archive-tab-' + tab}>
        <div className="archive-content-enter" key={tab}>
        {tab === 0 && <>
          <div className="archive-profile-primary">
            <div className="archive-nameplate"><div className="archive-portrait" aria-hidden="true"/><small>NAME</small><h3>김준영 <span>Kim Junyoung</span></h3></div>
            <dl className="archive-fields">{[['ROLE','Frontend Developer'],['FOCUS','UI/UX · Interaction'],['STRENGTH','Design → Code'],['STYLE','Clear · Usable · Interactive'],['MISSION','Better Web Experiences']].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          <div className="archive-profile-secondary">
            <h3 className="archive-section-label">CORE KEYWORDS</h3>
            <ul className="archive-keywords">{keywords.map((word,i) => <li key={word}><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[i]}/></svg></span>{word}</li>)}</ul>
            <h3 className="archive-section-label">TRAITS</h3>
            <div className="archive-traits-row"><ul className="archive-traits"><li><span>문제 해결</span><i aria-hidden="true"/>맥락부터</li><li><span>디자인 이해</span><i aria-hidden="true"/>의도를 동작으로</li><li><span>구현</span><i aria-hidden="true"/>직접 검증</li><li><span>협업</span><i aria-hidden="true"/>함께 조정</li></ul><blockquote>“작은 디테일이<br/>더 나은 경험이 되는 곳.”</blockquote></div>
          </div>
          <button className="archive-profile-pager" type="button" onClick={() => setPart(p => 1-p)}>{part === 0 ? '핵심 분야 · 작업 방식 →' : '← 프로필 정보'}</button>
        </>}
        {tab === 1 && <div className="archive-story"><p className="archive-section-label">JOURNEY LOG</p><h3>디자인과 구현을<br/>하나의 경험으로.</h3><ol>{['Publishing','UI/UX','Frontend','Interactive Experience'].map((word,i) => <li key={word}><small>0{i+1}</small>{word}</li>)}</ol><p>웹 퍼블리싱을 바탕으로 UI/UX와 프론트엔드 영역을 넓혀가고 있습니다. 시안의 의도를 실제 화면과 인터랙션으로 연결합니다.</p></div>}
        {tab === 2 && <div className="archive-story"><p className="archive-section-label">MY WORKING PRINCIPLES</p><h3>좋은 경험을 만드는<br/>작업의 기준.</h3><ul className="archive-values"><li><b>Clarity</b>사용자가 먼저 이해할 수 있는 화면</li><li><b>Intent</b>디자인의 의도를 실제 동작까지 연결</li><li><b>Detail</b>작은 디테일까지 경험의 일부로</li></ul></div>}
        {tab === 3 && <div className="archive-story"><p className="archive-section-label">CURRENT INTERESTS</p><h3>다음 가능성을<br/>탐색합니다.</h3><ul className="archive-values"><li><b>Interactive Web</b>행동에 반응하는 웹 경험</li><li><b>Motion & 3D</b>공간과 움직임으로 전하는 이야기</li><li><b>Generative AI</b>아이디어 탐색과 제작을 돕는 도구</li><li><b>Digital Experiences</b>탐험하고 발견하는 인터페이스</li></ul></div>}
        </div>
      </div>
      <div className="archive-tabs" role="tablist" aria-label="소개 항목">{tabs.map((name, i) => <button key={name} type="button" ref={node => { buttons.current[i] = node }} id={'archive-tab-' + i} role="tab" aria-selected={tab === i} aria-controls="archive-content" tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={e => tabKey(e,i)}>{name}</button>)}</div>
      <button type="button" className="archive-cta" onClick={() => { setTab(1); buttons.current[1]?.focus() }}>나의 여정 보기 <span aria-hidden="true">→</span></button>
    </section>}
    <footer className="archive-footer">KIM JUNYOUNG<br/>PERSONAL PORTFOLIO<span>BETTER EXPERIENCES · A BRIGHTER TOMORROW</span></footer>
  </main>
}
