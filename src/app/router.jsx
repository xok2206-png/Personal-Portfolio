import { lazy, Suspense } from 'react'
import './WorldLoading.css'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import RealWorld from '../scenes/RealWorld/RealWorld.jsx'
import Character from '../scenes/Character/Character.jsx'
import Ending from '../scenes/Ending/Ending.jsx'
import About from '../pages/About/About.jsx'
import Skills from '../pages/Skills/Skills.jsx'
import Projects from '../pages/Projects/Projects.jsx'
import ProjectDetail from '../pages/ProjectDetail/ProjectDetail.jsx'

import Contact from '../pages/Contact/Contact.jsx'
import QuickView from '../pages/QuickView/QuickView.jsx'
import Resume from '../pages/Resume/Resume.jsx'
import DestinationFrame from '../components/DestinationFrame.jsx'
const PortfolioWorld = lazy(() => import('../scenes/PortfolioWorld/PortfolioWorld.jsx'))

function AppRouter() {
  return (
    <Suspense fallback={<main id="main" className="world-loading" aria-busy="true"><div className="world-loading-content"><span className="world-loading-star" aria-hidden="true">✧</span><p role="status">세계를 준비하고 있어요.</p><Link to="/projects">프로젝트 바로 보기 ↗</Link></div></main>}><Routes>
      <Route path="/" element={<RealWorld />} />
      <Route path="/character" element={<Character />} />
      <Route path="/world-map" element={<PortfolioWorld />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<DestinationFrame destinationId="projects"><ProjectDetail /></DestinationFrame>} />

      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/qa" element={<Navigate to="/contact#qa" replace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quick-view" element={<QuickView />} />
      <Route path="/resume" element={<div className="destination-content"><Resume /></div>} />
      <Route path="/ending" element={<Ending />} />
      <Route path="*" element={<main id="main" className="destination-content"><h1 tabIndex="-1">페이지를 찾을 수 없습니다.</h1></main>} />
    </Routes></Suspense>
  )
}

export default AppRouter
