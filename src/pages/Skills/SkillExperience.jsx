import { useEffect, useRef, useState } from 'react'

function Artifact({ angle }) {
  const host = useRef(null), engine = useRef(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let disposed = false, cleanup = () => {}
    import('three').then(THREE => {
      if (disposed) return
      let renderer
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) } catch { setFailed(true); return }
      const colors = getComputedStyle(host.current)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, .1, 100)
      camera.position.set(0, 1, 6)
      const geometry = new THREE.IcosahedronGeometry(1.2, 0)
      const material = new THREE.MeshStandardMaterial({ color: colors.getPropertyValue('--stone-200').trim(), roughness: 1, flatShading: true })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh, new THREE.HemisphereLight(colors.getPropertyValue('--cloud').trim(), colors.getPropertyValue('--deep-green').trim(), 3))
      const light = new THREE.DirectionalLight(colors.getPropertyValue('--cloud').trim(), 4); light.position.set(-3, 4, 3); scene.add(light)
      host.current.append(renderer.domElement)
      const draw = () => renderer.render(scene, camera)
      engine.current = { mesh, draw }
      const observer = new ResizeObserver(([entry]) => { const width = entry.contentRect.width; renderer.setSize(width, 180); camera.aspect = width / 180; camera.updateProjectionMatrix(); draw() })
      observer.observe(host.current)
      const lost = event => { event.preventDefault(); setFailed(true) }
      renderer.domElement.addEventListener('webglcontextlost', lost)
      cleanup = () => { observer.disconnect(); renderer.domElement.removeEventListener('webglcontextlost', lost); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); engine.current = null }
      draw()
    }).catch(() => { if (!disposed) setFailed(true) })
    return () => { disposed = true; cleanup() }
  }, [])
  useEffect(() => { if (engine.current) { engine.current.mesh.rotation.y = angle * Math.PI / 180; engine.current.draw() } }, [angle])
  return <div className="sw-artifact" ref={host}>{failed && <p>3D 보기를 사용할 수 없습니다. 회전 값과 기술 설명은 계속 확인할 수 있습니다.</p>}</div>
}

export default function SkillExperience({ skill, still, progress, onComplete, onAnimate }) {
  const [step, setStep] = useState(0), [value, setValue] = useState(0), [manualProgress, setManualProgress] = useState(null)
  const [done, setDone] = useState(false)
  const finish = () => { setDone(true); onComplete() }
  const advance = limit => { const next = (step + 1) % (limit + 1); setStep(next); if (next === limit) finish() }
  const stages = skill.id === 'git' ? ['Local', 'Code', 'Branch', 'Commit', 'Push', 'Merge', 'Build', 'Deploy', 'Live'] : skill.id === 'claude' ? ['Idea', 'Structure', 'Design', 'Implementation'] : ['Wireframe', 'UI Design', 'Prototype']
  const travel = manualProgress ?? progress
  return <section className="sw-experience" aria-label={skill.name + ' 직접 체험'}>
    <h3>직접 체험</h3><p>{skill.instruction}</p>
    {skill.id === 'figma' && <><div className="sw-design-demo" data-step={step}><span>Skills</span><div><i /><i /><i /></div><button disabled={step < 2} onClick={finish}>{step === 2 ? '프로토타입 실행' : '화면 구조'}</button></div><p aria-live="polite">{stages[step]}</p><button className="sw-action" onClick={() => advance(2)}>다음 단계</button></>}
    {skill.id === 'javascript' && <><div className="sw-door" data-open={value > 0}><span /><span /><p>{value ? '문이 열렸습니다' : '입력을 기다립니다'}</p></div><button className="sw-action" onClick={() => { setValue(value ? 0 : 1); finish() }}>{value ? '문 닫기' : '장치 작동'}</button></>}
    {skill.id === 'react' && <><div className="sw-state-demo">{['Header', 'Content', 'Preview'].map(name => <div key={name}><span>{name}</span><strong>{value}</strong></div>)}</div><button className="sw-action" onClick={() => { setValue(value + 1); finish() }}>공유 상태 +1</button></>}
    {skill.id === 'gsap' && <><ol className="sw-sequence"><li>첫 방향 회전</li><li>반대 방향 회전</li><li>제자리 복귀</li></ol><button className="sw-action" onClick={() => { onAnimate(); finish() }}>타임라인 실행</button>{still && <p>모션 끄기 상태에서는 이동 연출을 생략합니다.</p>}</>}
    {skill.id === 'scrolltrigger' && <><div className="sw-travel">{['등장', '이동', '활성화'].map((label, i) => <span key={label} data-reached={travel >= (i + 1) / 4}>{label}</span>)}</div><label className="sw-range">이동 진행 <output>{Math.round(travel * 100)}%</output><input aria-label="이동 진행" type="range" min="0" max="100" value={Math.round(travel * 100)} onChange={event => { setManualProgress(Number(event.target.value) / 100); if (Number(event.target.value) >= 75) finish() }} /></label><button className="sw-action" onClick={() => { setManualProgress(null); if (progress >= .75) finish() }}>캐릭터 위치로 연결</button></>}
    {skill.id === 'three' && <><Artifact angle={value} /><label className="sw-range">조형물 회전 <output>{value}°</output><input type="range" aria-label="조형물 회전" min="0" max="360" value={value} onChange={event => { setValue(Number(event.target.value)); finish() }} /></label></>}
    {skill.id === 'claude' && <><ol className="sw-pipeline">{stages.map((label, i) => <li key={label} data-active={step >= i}>{label}</li>)}</ol><button className="sw-action" onClick={() => advance(3)}>다음 단계로 정리</button></>}
    {skill.id === 'claude-code' && <><div className="sw-code-demo"><pre>{'src/\n  components/\n    Status.jsx\n  pages/\n  assets/\n\n<Status ready={' + Boolean(value) + '} />'}</pre><output>{value ? '준비되었습니다' : '작업 중'}</output></div><button className="sw-action" onClick={() => { setValue(value ? 0 : 1); finish() }}>컴포넌트 상태 변경</button></>}
    {skill.id === 'higgsfield' && <><div className="sw-media-demo" data-playing={value > 0 && !still}><img src="/assets/production/images/natural-world/skills-room-v1.webp" alt="정지 환경에 빛과 바람의 움직임을 연결하는 예시" onError={event => { event.currentTarget.hidden = true }} /><span /></div><p>{value ? 'Motion → Web Experience' : 'Static Image'}</p><button className="sw-action" onClick={() => { setValue(value ? 0 : 1); finish() }}>{value ? '정지 장면으로' : '움직임 연결'}</button>{still && <p>모션 끄기 설정을 따릅니다.</p>}</>}
    {skill.id === 'git' && <><ol className="sw-pipeline">{stages.map((label, i) => <li key={label} data-active={step >= i}>{label}</li>)}</ol>{step === 8 && <LinkPreview />}<button className="sw-action" onClick={() => advance(8)}>{step === 8 ? '다시 보기' : '다음: ' + stages[step + 1]}</button></>}
    <p className="sw-experience-status" role="status">{done ? '체험을 확인했습니다. 다시 조작해 볼 수 있습니다.' : '직접 조작하면 반응을 확인할 수 있습니다.'}</p>
  </section>
}
function LinkPreview() { return <a className="sw-live" href="/world-map">완성된 포트폴리오 보기 ↗</a> }
