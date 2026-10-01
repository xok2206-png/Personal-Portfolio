import { Link } from 'react-router-dom'
import { profile, skills, projects } from '../../data/content.js'

function Resume({ embedded = false }) {
  const Container = embedded ? 'article' : 'main'
  return (
    <Container id={embedded ? undefined : "main"} className={embedded ? "connect-resume" : "resume_world"}>
      <h1 tabIndex="-1">{profile.name}</h1>
      <p>{profile.role}</p>
      <p>{profile.intro}</p>

      <h2>주요 역량</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.label}</strong> — {skill.detail}
          </li>
        ))}
      </ul>

      <h2>프로젝트 경험</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> — {project.description}
          </li>
        ))}
      </ul>

      {!embedded && <><button type="button" onClick={() => window.print()}>
        요약 인쇄 / PDF 저장
      </button>
      <Link to="/contact">연락처 보기</Link></>}
    </Container>
  )
}

export default Resume
