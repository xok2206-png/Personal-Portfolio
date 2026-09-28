import { profile } from '../../data/content.js'

function About() {
  return (
    <main id="main" className="about_world">
      <h1 tabIndex="-1">ABOUT</h1>
      <p className="about_role">{profile.role}</p>
      <h2>
        {profile.headline.split('\n').map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </h2>
      <p>{profile.intro}</p>
    </main>
  )
}

export default About
