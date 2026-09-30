import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePortfolioUI } from '../../app/PortfolioUIContext.jsx'
import { projects } from '../../data/content.js'
import useGalleryWalk from '../Projects/useGalleryWalk.js'
import SkillCharacter from './SkillCharacter.jsx'
import SkillExperience from './SkillExperience.jsx'
import { skillAreas, experienceSkills } from './skillWorldData.js'
import { chamberSkills } from './skillData.js'
import SkillIcon from './SkillIcon.jsx'
import CapabilityPanel from './CapabilityPanel.jsx'
import CapabilityDemo from './CapabilityDemo.jsx'
import { skillCapabilities, simpleTools } from './skillCapabilities.js'
import useCoreOrbit from './useCoreOrbit.js'
import './SkillsWorld.css'
import './SkillsCore.css'

const notes = {
  Photoshop: '이미지 보정, 합성과 시각 자료를 다루는 디자인 도구입니다.',
  Illustrator: '벡터 그래픽과 아이콘, 확장 가능한 시각 요소를 다루는 디자인 도구입니다.',
  HTML: '콘텐츠의 의미와 문서 구조를 구성하는 마크업입니다.',
  CSS: '레이아웃, 간격, 타이포그래피와 반응형 화면을 구성합니다.',
  Vite: '개발 서버와 프로덕션 빌드를 구성하는 도구입니다. 현재 포트폴리오의 빌드 환경에 사용합니다.',
  Swiper: '슬라이드 탐색과 터치 인터랙션을 구성하는 라이브러리입니다.',
  Lenis: '스크롤의 흐름과 감속을 제어하는 라이브러리입니다.',
  'VS Code': '코드 편집과 개발 작업을 진행하는 에디터입니다.',
  npm: '패키지 의존성과 개발·빌드 스크립트를 관리합니다.',
  Vercel: '웹 프로젝트 배포와 프리뷰를 다루는 플랫폼입니다.',
}
const catalog = skillAreas.map(area => ({ ...area, skills: [...new Set(area.groups.flatMap(([, ...names]) => names).map(name => ['Git', 'GitHub'].includes(name) ? 'Git / GitHub' : name))].map(name => {
  const existing = experienceSkills.find(item => item.name === name) || chamberSkills.find(item => item.name === name)
  return existing ? { ...existing, area: area.id } : { id: name.toLowerCase().replaceAll(' ', '-'), name, area: area.id, role: area.name, detail: notes[name], projects: [], tags: [], portfolio: name === 'Vite' }
}) }))
const constrain = point => {
  const x = (point.x - 50) / 37, y = (point.y - 79.5) / 12
  const distance = Math.max(1, Math.hypot(x, y))
  return { x: 50 + x / distance * 37, y: 79.5 + y / distance * 12 }
}

export default function SkillsCore() {
  const { reduced, paused } = usePortfolioUI()
  const [hidden, setHidden] = useState(document.hidden)
  const [open, setOpen] = useState(false)
  const [orbitActive, setOrbitActive] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [compact, setCompact] = useState(window.innerWidth < 1024)
  const [panelView, setPanelView] = useState('capability')
  const [capabilityId, setCapabilityId] = useState('figma')
  const [skillId, setSkillId] = useState('figma')
  const [imageFailed, setImageFailed] = useState(false)
  const stage = useRef(null), core = useRef(null), panel = useRef(null), heading = useRef(null), timeline = useRef(null), returnFocus = useRef(null)
  const { player, go, stop, keyDown, keyUp } = useGalleryWalk({ reduced, paused, hidden, initialPosition: { x: 40, y: 87 }, constrain, speed: 16 })
  const still = reduced || paused || hidden
  const orbit = useCoreOrbit({ active: orbitActive, count: skillCapabilities.length, still: still || (open && compact), held: hovered !== null || focused !== null, open, compact, core })
  const capability = skillCapabilities.find(item => item.id === capabilityId)
  const skill = catalog.flatMap(item => item.skills).find(item => item.id === skillId)
  const connected = open ? panelView === 'capability' ? capability.id : skill.id : hovered ?? focused
  const sourceDemo = experienceSkills.find(item => item.id === skill.id)
  const demo = sourceDemo?.id === 'gsap' ? { ...sourceDemo, instruction: '타임라인을 실행하면 코어가 두 방향으로 회전한 뒤 제자리로 돌아옵니다.' } : sourceDemo
  const near = Math.hypot(player.x - 50, (player.y - 84) * 1.5) < 15
  function show() { stop(); setOrbitActive(true) }
  function toggleCore() {
    if (!orbitActive) { show(); return }
    stop(); setOpen(false); setOrbitActive(false); setHovered(null); setFocused(null)
  }
  function inspect(id, target) {
    stop(); returnFocus.current = target; setCapabilityId(id); setSkillId(id); setPanelView('capability'); setOpen(true)
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
  }
  function showTools(target) { stop(); if (!open) returnFocus.current = target; setPanelView('tools'); setOpen(true) }
  function close() { stop(); setOpen(false); requestAnimationFrame(() => (returnFocus.current?.isConnected ? returnFocus.current : core.current)?.focus({ preventScroll: true })) }
  function animateCore() {
    timeline.current?.revert()
    if (still) return
    timeline.current = gsap.context(() => gsap.timeline().to('.sc-core-art', { rotate: -2, duration: .3 }).to('.sc-core-art', { rotate: 2, duration: .5 }).to('.sc-core-art', { rotate: 0, duration: .3 }), stage)
  }
  useEffect(() => { const update = () => setHidden(document.hidden); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update) }, [])
  useEffect(() => { const update = () => setCompact(window.innerWidth < 1024); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }, [])
  useEffect(() => { if (open) heading.current?.focus({ preventScroll: true }); return () => timeline.current?.revert() }, [open, panelView])
  useEffect(() => { panel.current?.querySelector('.sc-info')?.scrollTo({ top: 0 }) }, [skill.id, capability.id, panelView])
  useEffect(() => { if (still) timeline.current?.revert() }, [still])
  useEffect(() => {
    const down = event => {
      if (event.key === 'Escape' && open) { close(); return }
      if (event.key === 'Escape' && orbitActive) { setOrbitActive(false); setHovered(null); setFocused(null); core.current?.focus({ preventScroll: true }); return }
      if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented || event.target.closest?.('input,select,textarea,button,a,summary,dialog,[contenteditable=true]') || panel.current?.contains(event.target)) return
      if (event.key.toLowerCase() === 'e' && near) { event.preventDefault(); show(); return }
      if (!open || (panelView === 'tools' && skill.id === 'scrolltrigger')) keyDown(event)
    }
    window.addEventListener('keydown', down); window.addEventListener('keyup', keyUp)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', keyUp) }
  })
  function walk(event) {
    if (!event.detail) return
    const rect = stage.current.getBoundingClientRect()
    go({ x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 })
    stage.current.focus({ preventScroll: true })
  }
  return <main id="main" className="skills-world skills-core" data-still={still} data-panel={open} data-orbit={orbitActive}>
    <div className="sc-stage" ref={stage} tabIndex="-1" aria-label="Skills 공간. WASD 이동, 코어 근처에서 E로 할 수 있는 일 펼치기">
      <img className="sc-background" src="/assets/production/images/skills-world/courtyard-v3.webp" alt="" fetchPriority="high" onError={event => { event.currentTarget.hidden = true }} />
      <div className="sc-atmosphere" aria-hidden="true" />
      <button className="sc-floor" aria-label="바닥을 클릭해 이동" onClick={walk} />
      <button ref={core} className="sc-core" aria-label="Skill Core 공전 펼치기 또는 접기" aria-expanded={orbitActive} aria-controls="sc-orbit" onClick={toggleCore} data-near={near} data-failed={imageFailed}>
        <img className="sc-core-art" src="/assets/production/images/skills-world/relic-core-v3.webp" alt="" onError={() => setImageFailed(true)} />
        <span className="sc-core-label"><strong>제가 할 수 있는 일</strong><span>{orbitActive ? '접기' : '코어를 눌러 살펴보세요'} <span aria-hidden="true">↗</span></span></span>
      </button>
      <SkillCharacter player={player} x={player.x} y={player.y} still={still} />
    </div>
    {orbitActive && <nav id="sc-orbit" className="sc-orbit" ref={orbit.host} aria-label="공전하는 기술 선택" inert={open && compact ? true : undefined}>
      <svg className="sc-energy" aria-hidden="true">{skillCapabilities.map((item,index) => <g key={item.id} data-connected={connected === item.id}><path ref={node => { orbit.paths.current[index] = node }} /><circle ref={node => { orbit.particles.current[index] = node }} r="3" /></g>)}</svg>
      {skillCapabilities.map((item, index) => <button key={item.id} ref={node => { orbit.nodes.current[index] = node }} className="sc-orb" data-gem={item.id} data-active={open && connected === item.id} data-connected={connected === item.id} aria-label={item.name + ' 알아보기'} aria-pressed={open && connected === item.id} onPointerEnter={() => setHovered(item.id)} onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(item.id)} onBlur={() => setFocused(null)} onClick={event => inspect(item.id, event.currentTarget)}><span className="sc-orb-art"><span className="sc-orb-logo">{['javascript','git'].includes(item.id) ? <span className={'sc-orb-glyph sc-orb-glyph-' + item.id} aria-hidden="true">{item.id === 'javascript' ? 'JS' : 'Git'}</span> : <SkillIcon id={item.id} />}</span></span><span className="sc-orb-name"><strong>{item.name}</strong><small>{item.id === 'chatgpt' ? 'AI 도구' : item.tools}</small></span></button>)}
    </nav>}
    <header className="sc-intro"><h1>Skills</h1><p>화면을 디자인하고, 실제로 작동하게 만듭니다.</p></header>
    <div className="sc-controls"><span><kbd>W A S D</kbd> 이동</span><span><kbd>E</kbd> 코어 열기</span><button className="sc-all-skills" onClick={event => showTools(event.currentTarget)}>사용하는 도구 전체 보기 ↗</button>{orbitActive && <button className="sc-all-skills" onClick={() => { toggleCore(); core.current?.focus({ preventScroll: true }) }}>공전 접기</button>}</div>
    {open && <aside className="sw-panel sc-panel" id="sc-panel" ref={panel} aria-labelledby="sc-panel-heading">
      <header><h2 id="sc-panel-heading" ref={heading} tabIndex="-1">{panelView === 'capability' ? capability.name : '사용하는 도구'}</h2><button onClick={close} aria-label="기술 패널 닫기">×</button></header>
      <div className="sw-panel-content sc-info" id="sc-info">
        {panelView === 'capability' ? <CapabilityPanel key={capability.id} capability={capability} still={still} /> : <>
        <label className="sc-select">도구 선택<select value={skill.id} onChange={event => setSkillId(event.target.value)}>{catalog.map(group => <optgroup key={group.id} label={{design:'화면 디자인',development:'웹 제작',ai:'AI 활용',workflow:'작업 관리'}[group.id]}>{group.skills.map(item => <option key={item.id} value={item.id}>{item.name}{item.id === 'three' ? ' — 학습·실험 중' : ''}</option>)}</optgroup>)}</select></label>
        <section className="sc-skill" aria-labelledby="sc-skill-title" key={skill.id}>
          <h3 id="sc-skill-title">{skill.name}</h3>{skill.id === 'three' && <p className="sc-learning">학습·실험 중</p>}<p>{simpleTools[skill.id] || skill.detail}</p>
          {(skill.projects.length > 0 || skill.portfolio) && <div className="sw-evidence"><h4>사용한 작업</h4>{skill.projects.map(id => { const item = projects.find(entry => entry.id === id); return <Link key={id} to={'/projects/' + id}><span><strong>{item?.name} 작업 보기</strong><small>{item?.role}</small></span><span aria-hidden="true">↗</span></Link> })}{skill.portfolio && <Link to="/world-map"><span><strong>현재 포트폴리오 보기</strong></span><span aria-hidden="true">↗</span></Link>}</div>}
          <details className="sc-method"><summary>활용 내용 자세히 보기</summary><p>{skill.detail}</p>{skill.tags.length > 0 && <p className="sc-technical-tags">{skill.tags.join(' / ')}</p>}</details>
          {demo && <details className="sc-demo"><summary>직접 작동해 보기</summary>{skillCapabilities.find(item => item.id === skill.id)?.demo ? <CapabilityDemo type={skillCapabilities.find(item => item.id === skill.id).demo} still={still} /> : <><p className="sc-demo-note">원리를 보여주는 예시입니다.</p><SkillExperience skill={demo} still={still} progress={Math.max(0, Math.min(1, (player.x - 15) / 70))} onComplete={() => {}} onAnimate={animateCore} /></>}</details>}
        </section>
        </>}
      </div>
      <footer><span>Esc 닫기</span>{panelView === 'capability' ? <button onClick={() => showTools()}>도구 전체 보기 ↗</button> : <button onClick={() => setPanelView('capability')}>할 수 있는 일 보기 ↗</button>}</footer>
    </aside>}
  </main>
}
