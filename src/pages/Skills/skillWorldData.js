import { chamberSkills } from './skillData.js'

export const skillAreas = [
  { id: 'design', name: 'Design', x: 50, y: 30, groups: [['Design', 'Figma', 'Photoshop', 'Illustrator']] },
  { id: 'development', name: 'Development', x: 23, y: 49, groups: [['Foundation', 'HTML', 'CSS', 'JavaScript'], ['Frontend', 'React', 'Vite'], ['Motion', 'GSAP', 'ScrollTrigger', 'Swiper', 'Lenis'], ['3D · 탐색', 'Three.js']] },
  { id: 'ai', name: 'Creative AI', x: 77, y: 49, groups: [['Creative AI', 'Claude', 'Claude Code', 'ChatGPT', 'Higgsfield']] },
  { id: 'workflow', name: 'Workflow', x: 50, y: 79, groups: [['Workflow', 'VS Code', 'Git', 'GitHub', 'npm', 'Vercel']] },
]

const existing = id => chamberSkills.find(skill => skill.id === id)
export const experienceSkills = [
  { ...existing('figma'), area: 'design', x: 50, y: 39, instruction: '단계를 넘기며 구조, 시각 체계, 프로토타입의 차이를 확인하세요.' },
  { ...existing('javascript'), area: 'development', x: 18, y: 58, instruction: '장치를 작동시키면 입력에 따라 문이 열립니다.' },
  { ...existing('react'), area: 'development', x: 29, y: 58, instruction: '하나의 상태를 바꾸면 연결된 세 컴포넌트가 함께 갱신됩니다.' },
  { ...existing('gsap'), area: 'development', x: 17, y: 70, instruction: '타임라인을 실행하면 섬의 장치들이 순서대로 반응합니다.' },
  { id: 'scrolltrigger', name: 'ScrollTrigger', role: 'Movement & Progress', area: 'development', x: 29, y: 70, projects: [], tags: ['Progress', 'Sequence'], detail: '스크롤 위치에 반응하는 인터랙션을 캐릭터의 이동 거리로 재해석한 데모입니다. 이 체험의 진행 값은 이동 좌표가 제어합니다.', instruction: '패널 밖 바닥을 클릭하거나 WASD로 좌우 이동하세요. 모바일에서는 슬라이더로 같은 반응을 확인합니다.' },
  { ...existing('three'), area: 'development', x: 38, y: 49, detail: '웹 공간 표현을 탐색하는 도구입니다. 이 체험에서는 실제 WebGL 오브젝트를 회전해 봅니다. 별도 고객 프로젝트 적용 실적과는 구분합니다.', instruction: '회전 값을 바꿔 돌 조형물을 다른 각도에서 살펴보세요.' },
  { id: 'claude', name: 'Claude', role: 'Planning & Design', area: 'ai', x: 69, y: 58, projects: [], tags: ['Planning', 'UX/UI', 'Design Iteration'], detail: '아이디어와 요구사항을 구조화하고 UX/UI 방향, 디자인 반복과 문제 해결을 검토하는 데 활용합니다.', instruction: '아이디어를 정리해 제작 순서로 연결하세요.' },
  { id: 'claude-code', name: 'Claude Code', role: 'Development Workflow', area: 'ai', x: 81, y: 58, projects: [], tags: ['Implementation', 'Audit', 'Debugging', 'Refactoring'], detail: '프로젝트 구조를 읽고 구현, 코드 점검, 디버깅과 리팩터링을 보조하는 데 활용합니다. 결과는 실제 실행과 검증으로 확인합니다.', instruction: '컴포넌트를 수정하면 데모 화면의 상태가 함께 갱신됩니다.' },
  { ...existing('higgsfield'), area: 'ai', x: 75, y: 70, instruction: '정지 장면에 움직임을 연결해 웹에서의 활용 방식을 확인하세요. 이 데모 모션은 CSS가 제어합니다.' },
  { ...existing('git'), area: 'workflow', x: 50, y: 86, instruction: '다음 단계를 눌러 로컬 작업부터 배포까지의 흐름을 살펴보세요. 실제 저장소나 배포는 변경하지 않습니다.' },
]
