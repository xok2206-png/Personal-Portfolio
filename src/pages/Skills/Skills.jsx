import { Link } from 'react-router-dom'
import { skills } from '../../data/content.js'

function Skills() {
  return (
    <main id="main" className="skills_world">
      <h1 tabIndex="-1">SKILLS</h1>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <h2>{skill.name}</h2>
            <p>{skill.label}</p>
            <p>{skill.detail}</p>
            <Link to={`/projects/${skill.project}`}>{skill.proof}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Skills
