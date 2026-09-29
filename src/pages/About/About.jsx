import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/content.js'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import './About.css'
import './ProfilePanel.css'

const tabs = ['PROFILE', 'JOURNEY', 'VALUES', 'INTERESTS']
const keywords = ['UI/UX', 'Frontend', 'Publishing', 'Interaction']
const icons = ['M4 5h16v12H4z M8 21h8 M12 17v4 M8 9h5v4H8z','m8 6-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18','M12 7c-3-3-7-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-2-1-6-2-9 1Z M12 7v13 M9 2v3 M15 2v3','M10 13V6a2 2 0 0 1 4 0v6 M14 10a2 2 0 0 1 4 0v3 M18 12a2 2 0 0 1 4 0v5c0 4-3 6-7 5l-6-5-2-3c-1-2 1-3 3-1l2 2 M6 7C1 6 1 13 5 14']
function Compass() { return <svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="23"/><path d="M40 1 45 32 79 40 45 46 40 79 34 46 1 40 34 33Z M40 12v56 M12 40h56 M20 20l40 40 M60 20 20 60"/><path d="m40 22 5 13 13 5-13 5-5 13-5-13-13-5 13-5Z"/></svg> }
function Frame() {
  return <svg className="archive-frame" viewBox="0 0 500 800" preserveAspectRatio="none" aria-hidden="true">
    <path className="frame-gold" d="M35 8H215L235 18H265L285 8H465L490 35V765L465 792H285L265 782H235L215 792H35L10 765V35Z"/>
    <path className="frame-blue" d="M40 17H212L235 29H265L288 17H460L482 40V760L460 783H288L265 771H235L212 783H40L18 760V40Z"/>
    <path className="frame-fine" d="M48 26H208L233 38H267L292 26H452L474 48V752L452 774H292L267 762H233L208 774H48L26 752V48Z"/>
    <path className="frame-corners" d="M12 100V38L38 12H105 M395 12H462L488 38V100 M12 700V762L38 788H105 M395 788H462L488 762V700 M3 155L18 170L3 185 M497 155L482 170L497 185 M3 615L18 630L3 645 M497 615L482 630L497 645"/>
    <path className="frame-gold" d="m250 4 10 13-10 13-10-13Z m0 766 10 13-10 13-10-13Z M42 42h15l-15 20Z M458 42h-15l15 20Z M42 758h15l-15-20Z M458 758h-15l15-20Z"/>
    <path className="frame-trace" pathLength="100" d="M40 17H212L235 29H265L288 17H460L482 40V760L460 783H288L265 771H235L212 783H40L18 760V40Z"/>
    <path className="frame-circuits" d="M12 115 6 105V65l18-22 M18 190l-8 10v70 M490 290l-8 14v82l10 12 M10 450l8 13v68l-10 10 M482 600l10 12v105 M62 9l13 13h68l8-7 M356 785h59l9-10 M475 65l-20-27h-36 M31 719v34l28 24h45"/>
    <g className="frame-stars"><path d="m18 95 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z m464 534 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z m-464 118 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/></g>
    <path className="frame-inside" d="M40 108H460V696H40Z M40 202H460 M40 391H460 M40 557H460"/>
  </svg>
}
export default function About() {
  const { reduced } = usePortfolioUI()
  const [tab, setTab] = useState(0)
  const [part, setPart] = useState(0)
  const [notice, setNotice] = useState(false)
  const buttons = useRef([])
  useEffect(() => {
    const start = setTimeout(() => {
      try { if (sessionStorage.getItem('about-archive-opened')) return; sessionStorage.setItem('about-archive-opened','true') } catch { /* optional session notice */ }
      setNotice(true)
    }, 100)
    const end = setTimeout(() => setNotice(false), 1500)
    return () => { clearTimeout(start); clearTimeout(end) }
  }, [])
  function tabKey(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null
    if (next === null) return
    event.preventDefault(); setTab(next); buttons.current[next]?.focus()
  }
  return <main id="main" className="about-archive" data-reduced={reduced} data-profile-part={part}>
    <div className="about-atelier" aria-hidden="true"/>
    <section className="archive-identity" aria-labelledby="archive-name">
      <p className="archive-eyebrow">ABOUT</p>
      <h1 id="archive-name" tabIndex="-1">KIM<br/>JUNYOUNG</h1>
      <h2>디자인을 이해하고<br/>직접 구현하는 프론트엔드 개발자</h2>
      <p className="archive-intro">{profile.intro}</p>
      <ul className="archive-tags">{keywords.map(word => <li key={word}>{word}</li>)}</ul>
      <p className="archive-motto">Same Tools,<br/><em>A Brighter Me.</em></p>
    </section>
    <figure className="archive-character"><img src="/assets/production/images/about/character-desk-v2.webp" alt="작업실 책상에 앉아 생각하는 김준영의 포트폴리오 캐릭터" onError={e => { e.currentTarget.hidden = true }}/></figure>
    <section className="archive-panel" aria-label="개인 프로필 아카이브">
      <Frame/><div className="archive-panel-crest"><Compass/><span>A BRIGHTER TOMORROW</span></div><div className="archive-astrolabe" aria-hidden="true"/>
      <header className="archive-panel-heading"><Compass/><h2>PLAYER PROFILE</h2><button type="button" className="archive-replay" aria-label="아카이브 알림 보기" onClick={() => setNotice(true)}>PORTFOLIO<br/>2026</button></header>
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
      <button type="button" className="archive-cta" onClick={() => { setTab(1); buttons.current[1]?.focus() }}><span aria-hidden="true">✧</span>VIEW MY STORY <span aria-hidden="true">→</span></button>
    </section>
    <aside className="archive-notice" aria-label="아카이브 시스템 알림">{notice && <><Frame/><strong>ARCHIVE UNLOCKED</strong><span className="notice-book" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 25V8C12 4 7 5 4 6v18c4-1 8-1 12 3 4-4 8-4 12-3V6c-3-1-8-2-12 2 M8 9v11 M24 9v11"/></svg></span><p role="status">PROFILE 정보가 해금되었습니다.</p><p className="notice-message">“더 나은 경험을 만드는 여정이<br/>이제 시작됩니다.”</p><button type="button" onClick={() => { setNotice(false); document.querySelector('.archive-replay')?.focus() }}>OK</button></>}</aside>
    <footer className="archive-footer">KIM JUNYOUNG<br/>PERSONAL PORTFOLIO<span>BETTER EXPERIENCES · A BRIGHTER TOMORROW</span></footer>
  </main>
}
