import { Link } from 'react-router-dom'

function PortfolioWorld() {
  return (
    <main id="world_map" aria-label="WORLD MAP">
      <h1>WORLD MAP</h1>
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

export default PortfolioWorld
