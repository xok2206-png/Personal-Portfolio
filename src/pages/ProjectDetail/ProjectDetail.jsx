import { Link, useParams } from 'react-router-dom'
import { projects } from '../../data/content.js'

function ProjectDetail() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <main id="main" className="project_detail">
        <h1 tabIndex="-1">PROJECT DETAIL</h1>
        <p>프로젝트를 찾을 수 없습니다.</p>
        <Link to="/projects">PROJECTS로 돌아가기</Link>
      </main>
    )
  }

  return (
    <main id="main" className="project_detail">
      <p>{project.num}</p>
      <h1 tabIndex="-1">{project.name}</h1>
      <p>{project.category}</p>
      <p>{project.role}</p>
      <p>{project.status}</p>
      <p>{project.description}</p>

      <h2>Problem</h2>
      <p>{project.problem}</p>

      <h2>Decision</h2>
      <p>{project.decision}</p>

      <h2>Implementation</h2>
      <p>{project.implementation}</p>

      <h2>Result</h2>
      <p>{project.result}</p>

      <h2>Limitation</h2>
      <p>{project.limitation}</p>

      {project.quote && <blockquote>{project.quote}</blockquote>}

      <ul>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </a>
      )}

      <Link to="/projects">PROJECTS로 돌아가기</Link>
    </main>
  )
}

export default ProjectDetail
