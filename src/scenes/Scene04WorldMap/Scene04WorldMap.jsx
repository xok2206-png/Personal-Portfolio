import { Link } from 'react-router-dom'

function Scene04WorldMap() {
  return (
    <main id="scene_04_world_map" aria-label="SCENE 04 — WORLD MAP">
      <h1>SCENE 04 — WORLD MAP</h1>
      <nav aria-label="WORLD">
        <ul>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/skills">SKILLS</Link></li>
          <li><Link to="/projects">PROJECTS</Link></li>
          <li><Link to="/qa">Q&amp;A</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </nav>
    </main>
  )
}

export default Scene04WorldMap
