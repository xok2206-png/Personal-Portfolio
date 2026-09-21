import { Route, Routes } from 'react-router-dom'
import Scene01Start from './scenes/Scene01Start/Scene01Start.jsx'
import Scene02Character from './scenes/Scene02Character/Scene02Character.jsx'
import Scene03PowerUp from './scenes/Scene03PowerUp/Scene03PowerUp.jsx'
import Scene04WorldMap from './scenes/Scene04WorldMap/Scene04WorldMap.jsx'
import About from './pages/About/About.jsx'
import Skills from './pages/Skills/Skills.jsx'
import Projects from './pages/Projects/Projects.jsx'
import QA from './pages/QA/QA.jsx'
import Contact from './pages/Contact/Contact.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scene01Start />} />
      <Route path="/character" element={<Scene02Character />} />
      <Route path="/power-up" element={<Scene03PowerUp />} />
      <Route path="/world-map" element={<Scene04WorldMap />} />

      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/qa" element={<main><QA /></main>} />
      <Route path="/contact" element={<main><Contact /></main>} />
    </Routes>
  )
}

export default App
