import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { profile, projects } from '../../data/content.js'
import { aboutObjects } from './aboutStudio.js'

const keywords = ['UI/UX', 'Frontend', 'Publishing', 'Interaction']
const journey = ['Publishing', 'UI/UX', 'Frontend', 'Interactive Experience']
const principles = [['Clarity', '사용자가 먼저 이해할 수 있는 화면'], ['Intent', '디자인의 의도를 실제 동작까지 연결'], ['Detail', '작은 디테일까지 경험의 일부로']]
const interests = [['Interactive Web', '행동에 반응하는 웹 경험'], ['Motion & 3D', '공간과 움직임으로 전하는 이야기'], ['Generative AI', '아이디어 탐색과 제작을 돕는 도구'], ['Digital Experiences', '탐험하고 발견하는 인터페이스']]
// Sourced from the existing design/development answer in content.js.
const process = [['흐름과 우선순위', '사용자 흐름과 정보 우선순위를 먼저 정리합니다.'], ['컴포넌트와 상태', 'Figma에서 컴포넌트와 상태를 정의합니다.'], ['구현과 검증', '실제 브라우저에서 레이아웃과 모션을 검증하며 조정합니다.']]

function PanelContent({ id }) {
  if (id === 'profile') return <>
    <div className="studio-profile-name"><p>KIM {profile.english}</p><h3>김준영</h3><span>{profile.role}</span></div>
    <p className="studio-lead">디자인을 이해하고<br />직접 구현하는 프론트엔드 개발자</p>
    <p>{profile.intro}</p>
    <ul className="studio-keywords">{keywords.map(word => <li key={word}>{word}</li>)}</ul>
    <dl className="studio-profile-fields">{[['Role', 'Frontend Developer'], ['Focus', 'UI/UX · Interaction'], ['Strength', 'Design → Code'], ['Style', 'Clear · Usable · Interactive'], ['Mission', 'Better Web Experiences']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </>
  if (id === 'journey') return <>
    <h3>디자인과 구현을<br />하나의 경험으로.</h3>
    <p>웹 퍼블리싱을 바탕으로 UI/UX와 프론트엔드 영역을 넓혀가고 있습니다. 시안의 의도를 실제 화면과 인터랙션으로 연결합니다.</p>
    <ol className="studio-timeline">{journey.map((name, index) => <li key={name}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h4>{name}</h4></li>)}</ol>
  </>
  if (id === 'process') return <>
    <h3>의도에서 화면까지.</h3>
    <p>디자인과 개발을 연결하는 작업 과정입니다.</p>
    <ol className="studio-process">{process.map(([title, body], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h4>{title}</h4><p>{body}</p></div></li>)}</ol>
    <Link className="studio-content-link" to="/projects">실제 프로젝트에서 보기 <span aria-hidden="true">↗</span></Link>
  </>
  if (id === 'values') return <>
    <h3>좋은 경험을 만드는<br />작업의 기준.</h3>
    <ul className="studio-values">{principles.map(([title, body]) => <li key={title}><h4>{title}</h4><p>{body}</p></li>)}</ul>
    <dl className="studio-profile-fields">{[['문제 해결', '맥락부터'], ['디자인 이해', '의도를 동작으로'], ['구현', '직접 검증'], ['협업', '함께 조정']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <blockquote>“작은 디테일이 더 나은 경험이 되는 곳.”</blockquote>
  </>
  return <>
    <h3>기록과 관심사.</h3>
    <p>지금까지의 작업과 다음으로 탐색하는 분야입니다.</p>
    <h4 className="studio-subheading">프로젝트 기록</h4>
    <ul className="studio-archive-links">{projects.map(project => <li key={project.id}><Link to={'/projects/' + project.id}><span>{project.name}<small>{project.role}</small></span><span aria-hidden="true">↗</span></Link></li>)}</ul>
    <h4 className="studio-subheading">현재 관심사</h4>
    <ul className="studio-interests">{interests.map(([title, body]) => <li key={title}><h4>{title}</h4><p>{body}</p></li>)}</ul>
    <div className="studio-archive-actions"><Link to="/resume">Resume ↗</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗<span className="studio-sr-only">새 창</span></a></div>
  </>
}

export default function AboutHUD({ selected, onSelect, onClose }) {
  const dialog = useRef(null), heading = useRef(null), body = useRef(null)
  const object = aboutObjects[selected]
  useEffect(() => {
    const node = dialog.current
    const previousOverflow = document.body.style.overflow
    node.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow; node.close() }
  }, [])
  useEffect(() => { heading.current?.focus({ preventScroll: true }); body.current?.scrollTo({ top: 0 }) }, [selected])
  return <dialog ref={dialog} id="about-hud" className="studio-hud" aria-labelledby="studio-hud-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose() }}>
    <header className="studio-hud-header"><h2 ref={heading} id="studio-hud-title" tabIndex="-1"><span>{String(selected + 1).padStart(2, '0')}</span> / {object.title}</h2><button type="button" className="studio-close" onClick={onClose} aria-label="정보창 닫기"><span aria-hidden="true">×</span></button></header>
    <div ref={body} className="studio-hud-body" tabIndex="0" aria-label={object.korean + ' 내용'}><PanelContent id={object.id} /></div>
    <footer className="studio-hud-footer"><div><button type="button" onClick={() => onSelect((selected + 4) % 5)} aria-label="이전 이야기">←</button><span>{object.korean}</span><button type="button" onClick={() => onSelect((selected + 1) % 5)} aria-label="다음 이야기">→</button></div><button type="button" className="studio-close-label" onClick={onClose}><kbd>ESC</kbd> 닫기</button></footer>
  </dialog>
}
