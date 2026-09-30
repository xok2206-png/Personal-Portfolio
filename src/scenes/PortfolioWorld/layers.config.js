export const layerRoot = '/assets/production/images/world-layers/'
export const seasonalRoot = '/assets/production/images/seasonal-world/'
export const islandLayers = [
 {id:'about',number:'01',art:'about-island-v1.webp',title:'ABOUT',subtitle:'PROFILE',description:'저를 소개합니다',route:'/about',x:16,y:20,w:25.2,duration:7.4,phase:-1.8,drift:12,label:57,water:[[32,53.2,5.4,4.6],[39.4,59.4,6.6,6.6],[46.7,69.3,9.7,23]],surfaceAreas:['M29 52L33 51.7L36 52.1L35.5 52.8L30 52.6Z','M35 57.6L40 56.9L44 58L43 58.8L37 58.2Z','M45 65.8Q50 64.5 56 65.5L54 67.5L48 68L44 67Z']},
 {id:'skills',number:'02',art:'skills-island-v1.webp',title:'SKILLS',subtitle:'CAPABILITIES',description:'작업에 사용하는 기술',route:'/skills',x:30,y:48,w:27,duration:6.6,phase:-4.1,drift:14,label:58,water:[[23,49,5.7,4.9],[36,61.7,5.7,24],[78,62.6,5.7,26]],surfaceAreas:['M16 46.2Q21 46.2 25 47.8L24 48.5L17 47.1Z','M28 54Q35 54.5 40 57.5L39 59.3Q33 56.3 28 55Z','M69 58L75 56.7L81 59.1L80 61L74 59.7L70 59Z']},
 {id:'projects',number:'03',art:'projects-island-v1.webp',title:'PROJECTS',subtitle:'SELECTED WORKS',description:'선택한 프로젝트와 구현 과정',route:'/projects',x:42,y:10,w:36,duration:9.6,phase:-6.2,drift:9,label:58,water:[[47.8,54.6,10.1,32.5]],surfaceAreas:['M38 48.5Q51 47.8 60 48.5L71 49.1L63 51.4L59 53.2L47.5 53.2L42 51.5Z']},
 {id:'contact',number:'04',art:'contact-island-v1.webp',title:'CONTACT',subtitle:'CONTACT · Q&A',description:'연락과 자주 묻는 질문',route:'/contact',x:71,y:36,w:27.4,duration:8.3,phase:-2.8,drift:10,label:60,water:[[71.2,70,6,23]],surfaceAreas:['M39 59.7L46 58.7L48 60.5L44 61.5L37 62Z','M32 63Q42 62 47 62.9L53 63L57 64.7L47 65.5L35 64.3Z','M48 65Q59 63.7 63 65.3L69 67.1L74 69.2L68 69.1L59 67.7L52 67Z']},
]

export function readWorldVisits(){try{return JSON.parse(sessionStorage.getItem('world-visited-destinations')||'[]')}catch{return []}}
export function rememberDestination(id){try{const visits=readWorldVisits();sessionStorage.setItem('world-visited-destinations',JSON.stringify([...new Set([...(Array.isArray(visits)?visits:[]),id])]))}catch{/* Recommendation is optional; never gate routes. */}}
export function recommendedDestination(){const visits=readWorldVisits();return islandLayers.find(i=>!Array.isArray(visits)||!visits.includes(i.id))?.id||null}
