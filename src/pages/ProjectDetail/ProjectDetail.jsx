import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { worldProjects, worldAsset } from '../Projects/projectWorld'
import ProjectScreen from '../Projects/ProjectScreen'
import { usePortfolioUI } from '../../app/PortfolioUIContext'
import './ProjectDetail.css'

const chapters = [
  ['overview', 'Overview', '프로젝트 소개'],
  ['challenge', 'Challenge', '문제와 맥락'],
  ['process', 'Process', '판단과 과정'],
  ['experience', 'Key experience', '핵심 경험'],
  ['build', 'Build', '구현'],
  ['result', 'Result', '결과와 남은 과제'],
]
export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = worldProjects.find(p => p.id === projectId)
  const { reduced } = usePortfolioUI()
  const [active, setActive] = useState('overview')
  const root = useRef(null)
  useEffect(() => {
    if (!root.current) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })
    root.current.querySelectorAll('[data-chapter]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [projectId])
  if (!project) return <main id="main" className="project-reading"><h1 tabIndex={-1}>프로젝트를 찾을 수 없습니다.</h1><Link to="/projects">Projects로 돌아가기</Link></main>
  const copy = {
    overview: project.description,
    challenge: project.problem,
    process: project.decision,
    experience: project.focus,
    build: project.implementation,
    result: project.result,
  }
  return <main id="main" className="project-reading" ref={root} data-reduced={reduced}>
    <header className="pr-heading"><Link to="/projects">← Projects</Link><p>{project.category}</p><h1 tabIndex={-1}>{project.name}</h1><dl><div><dt>담당</dt><dd>{project.role || '자료 준비 중'}</dd></div><div><dt>상태</dt><dd>{project.status}</dd></div></dl></header>
    <nav className="pr-chapters" aria-label="프로젝트 내용">{chapters.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
    <div className="pr-exhibition">
      <aside className="pr-display" aria-label="프로젝트 화면 전시" style={{ '--view-x': `${project.x}%`, '--view-y': `${project.y}%` }} data-chapter={active}>
        <img className="pr-place" src={worldAsset} alt="" />
        <ProjectScreen key={project.id} project={project} />
        <p>{project.english}<span>{chapters.find(([id]) => id === active)?.[1]}</span></p>
      </aside>
      <article className="pr-story">{chapters.map(([id, label, title], index) => <section id={id} key={id} data-chapter={id}>
        <span className="pr-number">{String(index + 1).padStart(2, '0')} / {label}</span><h2>{title}</h2>
        <p>{copy[id] || '프로젝트 자료를 준비하고 있습니다.'}</p>
        {id === 'overview' && <p className="pr-role">{project.role}</p>}
        {id === 'challenge' && project.quote && <blockquote>{project.quote}</blockquote>}
        {id === 'build' && project.tags.length > 0 && <ul className="pr-tools" aria-label="사용 도구">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {id === 'result' && project.limitation && <div className="pr-limitation"><h3>한계와 다음 단계</h3><p>{project.limitation}</p></div>}
      </section>)}</article>
    </div>
    <footer className="pr-footer"><h2>프로젝트 확인하기</h2><div>{project.live && <a href={project.live} target="_blank" rel="noreferrer">사이트 보기 ↗</a>}{project.repo && <a href={project.repo} target="_blank" rel="noreferrer">코드 보기 ↗</a>}<Link to="/projects">Projects로 돌아가기 →</Link></div><p>실제 작업 화면과 사이트 링크는 추후 연결됩니다.</p></footer>
  </main>
}
