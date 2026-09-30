export const layerRoot = '/assets/production/images/world-layers/'
export const islandLayers = [
 {id:'about',number:'01',art:'about-island-v1.webp',title:'ABOUT',subtitle:'PROFILE',description:'저를 소개합니다',route:'/about',x:16,y:20,w:25.2,duration:19,phase:-3,drift:7,label:57,water:[]},
 {id:'skills',number:'02',art:'skills-island-v1.webp',title:'SKILLS',subtitle:'CAPABILITIES',description:'작업에 사용하는 기술',route:'/skills',x:30,y:48,w:27,duration:23,phase:-11,drift:9,label:58,water:[]},
 {id:'projects',number:'03',art:'projects-island-v1.webp',title:'PROJECTS',subtitle:'SELECTED WORKS',description:'선택한 프로젝트와 구현 과정',route:'/projects',x:42,y:10,w:36,duration:31,phase:-7,drift:4,label:58,water:[[88,45,4,38]]},
 {id:'contact',number:'04',art:'contact-island-v1.webp',title:'CONTACT',subtitle:'CONTACT · Q&A',description:'연락과 자주 묻는 질문',route:'/contact',x:71,y:36,w:27.4,duration:27,phase:-15,drift:8,label:60,water:[]},
]

export function readWorldVisits(){try{return JSON.parse(sessionStorage.getItem('world-visited-destinations')||'[]')}catch{return []}}
export function rememberDestination(id){try{const visits=readWorldVisits();sessionStorage.setItem('world-visited-destinations',JSON.stringify([...new Set([...(Array.isArray(visits)?visits:[]),id])]))}catch{/* Recommendation is optional; never gate routes. */}}
export function recommendedDestination(){const visits=readWorldVisits();return islandLayers.find(i=>!Array.isArray(visits)||!visits.includes(i.id))?.id||null}
