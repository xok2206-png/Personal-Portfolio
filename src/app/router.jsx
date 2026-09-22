import { Route, Routes } from 'react-router-dom'
import RealWorld from '../scenes/RealWorld/RealWorld.jsx'
import Character from '../scenes/Character/Character.jsx'
import PowerUp from '../scenes/PowerUp/PowerUp.jsx'
import WorldMap from '../scenes/WorldMap/WorldMap.jsx'
import Ending from '../scenes/Ending/Ending.jsx'
import About from '../pages/About/About.jsx'
import Skills from '../pages/Skills/Skills.jsx'
import Projects from '../pages/Projects/Projects.jsx'
import ProjectDetail from '../pages/ProjectDetail/ProjectDetail.jsx'
import QA from '../pages/QA/QA.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import QuickView from '../pages/QuickView/QuickView.jsx'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RealWorld />} />
      <Route path="/character" element={<Character />} />
      <Route path="/power-up" element={<PowerUp />} />
      <Route path="/world-map" element={<WorldMap />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />

      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/qa" element={<main><QA /></main>} />
      <Route path="/contact" element={<main><Contact /></main>} />
      <Route path="/quick-view" element={<QuickView />} />
      <Route path="/ending" element={<Ending />} />
    </Routes>
  )
}

export default AppRouter
