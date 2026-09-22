import { Link } from 'react-router-dom'
import './RealWorld.css'

function RealWorld() {
  return (
    <main id="scene_01_start" className="scene_01_start">
      <header className="scene_01_header">
        <div className="scene_01_brand">
          <p className="scene_01_name">KIM JUNYOUNG</p>
          <p className="scene_01_role">UI/UX DESIGNER</p>
        </div>
        <nav className="scene_01_nav" aria-label="WORLD">
          <Link to="/about">ABOUT</Link>
          <Link to="/projects">PROJECT</Link>
          <Link to="/qa">Q&amp;A</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
      </header>

      <section className="scene_01_content">
        <p className="scene_01_welcome">WELCOME TO</p>
        <h1 className="scene_01_title">
          <img
            src="/assets/images/main%20title.png"
            width="560"
            height="280"
            alt="MY PORTFOLIO WORLD"
          />
        </h1>
        <p className="scene_01_tagline">EXPLORE. DISCOVER. GET TO KNOW ME.</p>
        <Link to="/character" className="scene_01_start_button">
          <svg
            className="scene_01_start_icon"
            viewBox="0 0 24 28"
            aria-hidden="true"
          >
            <path d="M2 2 L22 14 L2 26 Z" />
          </svg>
          START GAME
        </Link>
      </section>
    </main>
  )
}

export default RealWorld
