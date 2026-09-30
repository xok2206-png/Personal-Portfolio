import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import useGalleryWalk from '../Projects/useGalleryWalk.js'
import { projects } from '../../data/content.js'
import SkillCharacter from './SkillCharacter.jsx'
import SkillExperience from './SkillExperience.jsx'
import { experienceSkills as skills, skillAreas as areas } from './skillWorldData.js'
import './SkillsWorld.css'

const project = point => ({ x: point.x, y: 34 + (point.y - 65) / 29 * 54 })
const constrain = point => {
  const floor = project(point), dx = (floor.x - 50) / 38, dy = (floor.y - 61) / 27
  const distance = Math.max(1, Math.hypot(dx, dy))
  return { x: 50 + dx / distance * 38, y: 65 + (61 + dy / distance * 27 - 34) / 54 * 29 }
}
function Device() {
  return <span className="sw-device" aria-hidden="true"><img src="/assets/production/images/skills-world/device-v1.webp" alt="" onError={event => { event.currentTarget.hidden = true }} /><i className="sw-device-light" /></span>
}
export default function SkillsWorld() {
  const { reduced, paused } = usePortfolioUI()
  const [hidden, setHidden] = useState(document.hidden)
  const [selection, setSelection] = useState(null)
  const [completed, setCompleted] = useState([])
  const [hovered, setHovered] = useState(null)
  const stage = useRef(null), panel = useRef(null), title = useRef(null), opener = useRef(null), timeline = useRef(null)
  const { player, go, stop, keyDown, keyUp } = useGalleryWalk({ reduced, paused, hidden, initialPosition: { x: 57, y: 86 }, constrain, speed: 18 })
  const position = project(player)
  const still = reduced || paused || hidden
  const skill = selection?.kind === 'skill' ? skills.find(item => item.id === selection.id) : null
  const area = selection?.kind === 'archive' ? areas.find(item => item.id === selection.id) : null
  const nearest = skills.reduce((best, item) => {
    const distance = Math.hypot(item.x - position.x, (item.y - position.y) * .85)
    return distance < best.distance ? { id: item.id, distance } : best
  }, { id: null, distance: 10 }).id
  const progress = Math.max(0, Math.min(1, (position.x - 15) / 70))
  function open(kind, id, target) { stop(); opener.current = target || document.getElementById('node-' + id); setSelection({ kind, id }) }
  function close() { stop(); setSelection(null); requestAnimationFrame(() => opener.current?.focus({ preventScroll: true })) }
  function complete() { if (skill) setCompleted(previous => previous.includes(skill.area) ? previous : [...previous, skill.area]) }
  function animateWorld() {
    timeline.current?.revert()
    if (still) return
    timeline.current = gsap.context(() => {
      gsap.timeline().to('.sw-node .sw-device', { y: -16, duration: .35, stagger: .09, ease: 'power2.out' }).to('.sw-node .sw-device', { y: 0, duration: .4, stagger: .06, ease: 'power2.inOut' })
    }, stage)
  }
  useEffect(() => { const update = () => setHidden(document.hidden); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update) }, [])
  useEffect(() => { if (selection) title.current?.focus({ preventScroll: true }); return () => timeline.current?.revert() }, [selection])
  useEffect(() => { if (still) timeline.current?.revert() }, [still])
  useEffect(() => {
    const down = event => {
      if (event.key === 'Escape' && selection) { close(); return }
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.target.closest?.('input,textarea,select,a,button,dialog,[contenteditable="true"]')) return
      if (panel.current?.contains(event.target)) return
      if (['e', 'E'].includes(event.key) && nearest) { event.preventDefault(); open('skill', nearest); return }
      if (!selection || skill?.id === 'scrolltrigger') keyDown(event)
    }
    window.addEventListener('keydown', down); window.addEventListener('keyup', keyUp)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', keyUp) }
  })
  function walk(event) {
    if (!event.detail) return
    const rect = stage.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width * 100, y = (event.clientY - rect.top) / rect.height * 100
    if (skill?.id !== 'scrolltrigger') setSelection(null)
    go({ x, y: 65 + (y - 34) / 54 * 29 }); stage.current.focus({ preventScroll: true })
  }
  return <main id="main" className="skills-world" data-still={still} data-panel={Boolean(selection)}>
    <header className="sw-intro"><h1>Skills</h1><p>디자인부터 구현까지,<br />직접 작동시켜 보는 작업 도구.</p><a href="#skill-archive">전체 기술 보기 <span aria-hidden="true">↗</span></a></header>
    <div className="sw-scene-wrap"><div className="sw-scene" ref={stage} tabIndex="-1" aria-label="Skills 섬. WASD와 방향키로 이동, E로 가까운 장치 활성화">
      <img className="sw-environment" src="/assets/production/images/skills-world/island-v1.webp" alt="" fetchPriority="high" onError={event => { event.currentTarget.hidden = true }} />
      <div className="sw-wind" aria-hidden="true" />
      <button className="sw-floor" aria-label="섬 바닥을 클릭해 이동" onClick={walk} />
      <svg className="sw-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{areas.map(item => <path key={item.id} data-connected={completed.includes(item.id)} d={`M50 58 L${item.x} ${item.y + 4}`} />)}</svg>
      <div className="sw-core" data-active={completed.length === 4} style={{ left: '50%', top: '58%' }} aria-label={`중앙 코어: ${completed.length}개 영역 연결`}><Device /><span>{completed.length === 4 ? '연결된 작업 방식' : 'Core'}</span></div>
      {areas.map(item => <button key={item.id} className="sw-area" style={{ left: item.x + '%', top: item.y + '%' }} onClick={event => open('archive', item.id, event.currentTarget)} aria-label={item.name + ' 전체 기술 보기'}><strong>{item.name}</strong><span>{completed.includes(item.id) ? '연결됨 · ' : ''}Archive ↗</span></button>)}
      {skills.map(item => <button id={'node-' + item.id} key={item.id} className="sw-node" style={{ left: item.x + '%', top: item.y + '%', zIndex: Math.round(item.y) }} data-near={hovered === item.id || nearest === item.id} data-active={skill?.id === item.id} aria-label={item.name + ' 체험'} aria-pressed={skill?.id === item.id} onClick={event => open('skill', item.id, event.currentTarget)} onPointerEnter={() => setHovered(item.id)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(item.id)} onBlur={() => setHovered(null)}><Device /><span className="sw-node-label">{item.name}</span></button>)}
      <SkillCharacter player={player} x={position.x} y={position.y} still={still} />
      {nearest && !selection && <p className="sw-near" style={{ left: position.x + '%', top: position.y + '%' }}><kbd>E</kbd> {skills.find(item => item.id === nearest).name}</p>}
    </div></div>
    <div className="sw-guidance"><span><kbd>W A S D</kbd> 이동</span><span><kbd>E</kbd> 체험</span><span>장치를 바로 클릭해도 됩니다.</span></div>
    <p className="sw-conclusion" aria-live="polite">{completed.length === 4 ? '디자인, 개발, AI 도구를 연결해 하나의 웹 경험으로 구현합니다.' : '같은 장치, 서로 다른 경험.'}</p>
    <section className="sw-archive" id="skill-archive" aria-labelledby="sw-archive-title"><header><h2 id="sw-archive-title">작업에 사용하는 기술</h2><p>이동 없이도 모든 체험과 기술을 확인할 수 있습니다.</p></header><div className="sw-archive-areas">{areas.map(item => <section key={item.id}><h3>{item.name}</h3>{item.groups.map(([group, ...names]) => <div className="sw-archive-group" key={group}><h4>{group}</h4><p>{names.join(' · ')}</p></div>)}<div className="sw-direct">{skills.filter(entry => entry.area === item.id).map(entry => <button key={entry.id} onClick={event => open('skill', entry.id, event.currentTarget)}>{entry.name}<span>체험 ↗</span></button>)}</div></section>)}</div></section>
    {selection && <aside ref={panel} className="sw-panel" aria-labelledby="sw-panel-title"><header><span>{skill ? areas.find(item => item.id === skill.area).name : 'Skill Archive'}</span><button onClick={close} aria-label="기술 패널 닫기">×</button></header><div className="sw-panel-content"><h2 id="sw-panel-title" ref={title} tabIndex="-1">{skill?.name || area.name}</h2>{skill ? <><p className="sw-role">{skill.role}</p><p>{skill.detail}</p><SkillExperience key={skill.id} skill={skill} still={still} progress={progress} onComplete={complete} onAnimate={animateWorld} /><div className="sw-evidence"><h3>실제 적용</h3>{skill.projects.map(id => <Link key={id} to={'/projects/' + id}>{projects.find(item => item.id === id)?.english} <span>↗</span></Link>)}{skill.portfolio && <Link to="/world-map">Personal Portfolio <span>↗</span></Link>}{!skill.projects.length && !skill.portfolio && <p>체험 예시입니다. 검증된 프로젝트 사례는 아직 연결하지 않았습니다.</p>}</div></> : <>{area.groups.map(([group, ...names]) => <section className="sw-archive-group" key={group}><h3>{group}</h3><p>{names.join(' · ')}</p></section>)}<h3>직접 체험</h3><div className="sw-direct">{skills.filter(item => item.area === area.id).map(item => <button key={item.id} onClick={() => setSelection({ kind: 'skill', id: item.id })}>{item.name}<span>↗</span></button>)}</div></>}</div><footer>Esc 닫기 · 언제든 다른 페이지로 이동할 수 있습니다.</footer></aside>}
  </main>
}
