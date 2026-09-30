import { projects } from '../../data/content.js'
import { projectMedia } from '../../data/projectMedia.js'

// Screen slots intentionally stay empty until the owner's real work is supplied.
// Positions use the environment plate's 1600 × 1067 coordinate system.
export const worldProjects = [
  { id: 'aquarium', name: '롯데월드 아쿠아리움', english: 'AQUARIUM', category: 'WEB EXPERIENCE', status: '자료 준비 중', role: null, description: '웹 경험과 인터랙션을 소개할 프로젝트입니다.', tags: [], landmark: '물가 유적', focus: 'Visual · Web Experience · Interaction', x: 21, y: 51, entrance: [24, 63] },
  { ...projects.find(p => p.id === 'animal24'), landmark: '숲의 보호소', focus: 'Research · Information Architecture', x: 31, y: 32, entrance: [31, 43] },
  { ...projects.find(p => p.id === 'sulwhasoo'), landmark: '언덕 정원', focus: 'Brand · Interaction · Frontend', x: 76, y: 27, entrance: [78, 29] },
  { ...projects.find(p => p.id === 'jaduya'), landmark: '계곡 마을', focus: 'Service · Responsive UI', x: 56, y: 48, entrance: [57, 62] },
  { ...projects.find(p => p.id === 'masillo'), english: 'MASHILLO', landmark: '여행자의 정류장', focus: 'Course · User Flow', x: 86, y: 35, entrance: [87, 50] },
].map((project, index) => ({ ...project, num: String(index + 1).padStart(2, '0'), ...projectMedia[project.id] }))

export const worldAsset = '/assets/production/images/projects-world/valley-roads-v3.webp'
export const sunsetAsset = '/assets/production/images/projects-world/valley-roads-sunset-v3.webp'
export { startPosition, roads as trails, constrainToTrail } from './projectRoads.js'
export const worldSize = { width: 1600, height: 1067 }
