import { Link } from 'react-router-dom'
import { projects } from '../../data/content.js'

function Projects() {
  return (
    <main id="main" className="projects_world">
      <h1 tabIndex="-1">PROJECTS</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span>{project.num}</span>
            <h2>{project.name}</h2>
            <p>{project.category}</p>
            <p>{project.role}</p>
            <p>{project.description}</p>
            <Link to={`/projects/${project.id}`}>VIEW CASE STUDY</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Projects
