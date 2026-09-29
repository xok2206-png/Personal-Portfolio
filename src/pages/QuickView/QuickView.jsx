import { Link } from 'react-router-dom'
import { profile, projects } from '../../data/content.js'
function QuickView() {
  return (
    <main id="main" className="destination-content">
      <h1 tabIndex="-1">포트폴리오 바로 보기</h1>
      <h2>{profile.name} · {profile.role}</h2>
      <p>{profile.intro}</p>
      <nav aria-label="콘텐츠 바로가기"><Link to="/about">About</Link> · <Link to="/skills">Skills</Link> · <Link to="/projects">Projects</Link> · <Link to="/contact">Contact · Q&amp;A</Link> · <Link to="/resume">역량 요약</Link></nav>
      <ul>{projects.map(project => <li key={project.id}><span>{project.num}</span><h2>{project.name}</h2><p>{project.role}</p><p>{project.description}</p><Link to={`/projects/${project.id}`}>VIEW CASE STUDY ↗</Link></li>)}</ul>
    </main>
  )
}

export default QuickView
