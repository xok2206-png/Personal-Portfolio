---
name: design-to-react
description: Personal Portfolio의 디자인·에셋·인터랙션을 기존 React + Vite 구조에 안전하게 구현하거나 수정할 때 사용하는 반복 작업 절차.
---

# Personal Portfolio — Design to React Skill

> 목적: 반복 구현 작업의 **순서와 검증 방식**을 고정한다.  
> 이 문서는 진행 일지가 아니다.  
> 실제 상태 기록은 `PROJECT_CONTEXT.md`에서 관리한다.

---

## 01. 언제 이 Skill을 사용하는가

다음 작업에 사용한다.

- Figma/Reference를 React 화면으로 구현
- 기존 Scene 디자인 수정
- Player Motion 연결
- Living World Layer 구현
- World Map Interaction 구현
- Power Up Gameplay 구현
- Project Scene/Case Study 구현
- Responsive 수정
- Motion / Camera / FX 조정
- Higgsfield Asset 적용
- 기존 화면을 새 Design System 기준으로 리뉴얼

작은 텍스트 수정이나 단순 파일명 변경에는 이 Skill을 강제로 적용하지 않는다.

---

## 02. 작업 전 읽기 순서

항상 다음 순서로 확인한다.

1. `AGENTS.md`
2. `CLAUDE.md`
3. `Personal-Portfolio_PRD_v2.md`
4. 최신 `DESIGN_SYSTEM*.md`
5. `PROJECT_CONTEXT.md`
6. 관련 Scene / Page / CSS
7. 관련 Asset
8. `package.json`
9. 현재 Route
10. `git status`

문서와 실제 코드가 충돌하면 실제 구현 상태를 먼저 확인하고 보고한다.

---

## 03. LOCKED vs FLEXIBLE 확인

### LOCKED
임의 변경 금지.

- 실제 Portfolio 콘텐츠
- Project 4개 구조
- 실제 Role / Process / Result / Limitation
- About / Skills / Projects / Q&A / Contact 핵심 정보
- Quick View
- 게임 없이 핵심 콘텐츠 접근 가능
- Product Validation Criteria
- Accessibility / Responsive / Fallback 원칙

### FLEXIBLE
구현 중 조정 가능.

- 디자인
- Layout
- Composition
- Animation
- Motion timing
- Camera
- FX
- Hover
- Transition
- Lighting
- Responsive composition

표현 방식은 브라우저 결과가 더 좋아지면 수정한다.

---

## 04. 작업 계획

여러 파일을 수정하는 작업이라면 먼저 짧은 계획을 만든다.

계획에는 다음을 포함한다.

- Target Scene
- 수정 파일
- 유지할 기존 코드
- 재사용 Component
- 필요한 Asset
- Player State
- World Layer
- Interaction
- Responsive 영향
- Accessibility 영향
- 검증 방법

불필요한 장황한 계획은 만들지 않는다.

---

## 05. 기존 구현 Audit

코드를 쓰기 전에 확인한다.

### Route
- 현재 URL
- React Router 연결
- Direct access 가능 여부
- Back / Refresh 영향

### Scene
- 기존 JSX
- 기존 CSS
- 기존 State
- 기존 Event
- 기존 Animation

### Page
- 실제 Portfolio Content
- 재사용 가능한 정보 UI

### Asset
- 실제 존재 여부
- 파일 경로
- 크기
- 비율
- 투명 배경
- 사용 중 여부

### Dependency
- 이미 설치된 Motion / Utility Library
- 동일 기능을 기존 Dependency로 해결 가능한지

---

## 06. Reference 분석

Reference Image / Figma / 기존 13개 시안을 볼 때
완성 이미지 자체를 복사 대상으로 보지 않는다.

다음으로 분해한다.

### Content
- 어떤 정보가 있는가

### Layout
- 중요 요소 위치
- Safe Area
- Information hierarchy

### Layer
- Sky
- Far
- World
- Gameplay
- Player
- Foreground
- FX
- UI

### Motion Candidate
- 지속 Motion
- Ambient
- Interaction
- Cinematic

### Geometry
- Walkable
- Collision
- Interaction
- Camera Boundary

### Responsive Risk
- 잘릴 요소
- 축소하면 읽히지 않는 요소
- Mobile에서 재배치할 요소

---

## 07. Scene 구현 순서

각 Scene은 가능한 한 아래 순서를 따른다.

### Step 1 — Static Structure
먼저 Motion 없이 기본 구조를 만든다.

- Route
- Layout
- Content
- Player 위치
- World Object
- Information UI

### Step 2 — Responsive Structure
Motion 전에 다음을 확인한다.

- 1440×810
- 1366×768
- Tablet
- Mobile

구조가 깨지는 상태에서 Animation부터 만들지 않는다.

### Step 3 — Player / Interaction
필요한 경우:

- Player State
- Walk
- Run
- Jump
- Collision
- Interaction Range
- Auto Path

### Step 4 — Living World
- Cloud
- Grass
- Water
- Flag
- Light
- Idle

먼저 최소 Motion만 구현한다.

### Step 5 — Interaction Feedback
- Hover
- Focus
- Pressed
- Object Reaction
- Player Reaction

### Step 6 — Cinematic
마지막에:

- Camera
- Transition
- Portal
- Stage Clear
- Large FX

를 추가한다.

---

## 08. Player 구현

### Gameplay State
최소 핵심:

- Idle
- Walk
- Run
- Jump
- Fall
- Land
- Interact
- Pickup
- Celebrate

### State Transition
Player State가 동시에 여러 개 실행되지 않게 한다.

예:

```text
idle
→ walk
→ run
→ jump
→ fall
→ land
→ idle
```

### Input Priority

- 직접 입력 > Auto Move
- UI Panel > Player Input
- Cinematic Lock 중 Gameplay Input 제한
- Skip 시 Lock 해제
- Route 변경 시 Motion cleanup

### Ground Contact
Player의 발 위치와 Collision 바닥이 일치해야 한다.

영상/PNG가 움직이는 것과 실제 Player 위치를 분리하지 않는다.

---

## 09. Prototype Gate

대규모 Scene 제작 전에 최소 Prototype을 먼저 검증한다.

```text
Idle
Walk
Run
Jump
Fall
Land
Collision
Skill Block
Item Pop
Pickup
Cloud
Grass
Scene Transition
```

### 통과 조건
- 입력 반응이 즉각적
- Player 크기 일관성
- 발이 바닥에서 뜨지 않음
- Animation 전환 자연스러움
- Collision 안정
- Loop 자연스러움
- 1366×768에서 조작 가능
- Mobile 대응 가능성 존재

Prototype이 실패하면 Asset 대량 제작을 진행하지 않는다.

---

## 10. World Map 구현

World Map은 단순 Link Grid가 아니다.

### 기본 구조
- Player
- ABOUT
- SKILLS
- PROJECTS
- Q&A
- CONTACT

### 이동
- Keyboard free movement
- Point & Click
- Destination Auto Path

### Destination Flow

```text
Select
→ Player Look
→ Travel
→ Arrival
→ Environment Reaction
→ Transition
→ Route
```

### 중요
Quick View / Back / Reduced Motion에서는 긴 이동을 강제하지 않는다.

---

## 11. Power Up 구현

### Core Loop

```text
Move
→ Jump
→ Block Hit
→ Item Pop
→ Pickup
→ Skill Feedback
→ Skill Information
```

### Skill 정보

Skill Level 사용 금지.

예:

```text
FIGMA ACQUIRED

Prototype
Component
Design System

USED IN
Project A
Project B
```

Skill은 실제 Project Evidence와 연결한다.

---

## 12. Case Study 구현

Project의 게임 연출과 실제 정보 UI를 분리한다.

### Game
- Entry
- Checkpoint
- Stage Clear
- World Restoration

### Portfolio
- Overview
- Problem
- Role
- Decision
- Solution
- Design
- Development
- Result
- Limitation / Retrospective

사용자가 본문을 읽기 위해 계속 Player를 움직여야 하는 구조는 피한다.

---

## 13. Living World 구현

### Continuous
- Cloud
- Water
- Waterfall
- Grass
- Flag
- Character Idle

### Ambient
- Bird
- Leaf
- Light
- Cloud Shadow
- Sparkle

### Motion Budget
한 순간에:

- 1 Primary
- 최대 2 Secondary

나머지는 약한 Ambient.

### Priority
Player → Current Objective → World → Ambient

---

## 14. Motion 구현 도구 선택

### CSS 우선
사용:
- simple hover
- transition
- opacity
- transform
- basic loop

### Framer Motion
사용:
- Component enter/exit
- state-driven UI motion
- panel / dialog / HUD

### GSAP
사용:
- Portal sequence
- Scene timeline
- complex camera-like transition
- scroll-driven advanced sequence

### ScrollTrigger
실제 Scroll이 진행에 연결될 때만 사용.

동일 Motion을 2개 Library로 동시에 구현하지 않는다.

---

## 15. Higgsfield Asset Workflow

Higgsfield Asset을 바로 코드에 넣기 전에 확인한다.

### Generate
- Character reference 고정
- Style reference 고정
- Lighting direction 고정
- Camera angle 고정
- Background requirement 명확화

### Review
- Character proportion
- Face consistency
- Outfit consistency
- Perspective
- Shadow
- Loop
- Transparent background
- Edge quality

### Optimize
필요에 따라:
- WebP
- AVIF
- WebM
- 적절한 resolution

### Integrate
- Asset path 정리
- Static fallback 준비
- preload/lazy 전략 결정
- 실제 Browser에서 재생 확인

### Do Not
AI 이미지 한 장을 전체 Interactive Scene으로 사용하지 않는다.

---

## 16. Asset Folder 원칙

실제 필요가 생겼을 때만 Folder를 만든다.

예상 구조:

```text
public/assets/
├─ fonts/
├─ character/
├─ real-world/
├─ portal/
├─ world/
├─ skills/
├─ projects/
├─ fx/
├─ ui/
├─ video/
└─ audio/
```

빈 Folder를 대량 생성하지 않는다.

기존 Asset을 이동할 때:

1. 사용처 검색
2. Move
3. Import / URL 수정
4. Browser 확인
5. Build 확인

순서를 지킨다.

---

## 17. Responsive Workflow

### Desktop 기준
1440×810.

### 반드시 확인
- 1920×1080
- 1440×810
- 1366×768
- 1180×820
- 1024×768
- 768×1024
- 430×932
- 402×874
- 390×844
- 360×800

### 문제 발생 시 순서

1. Stretch하지 않는다.
2. Camera Reframe 검토
3. Player scale visual adjustment
4. Decorative layer crop
5. UI reposition
6. Mobile composition 별도 적용

World Object의 Collision scale을 단순 viewport scale로 바꾸지 않는다.

---

## 18. Accessibility Workflow

구현 후 확인:

- Tab
- Enter
- Space
- focus-visible
- Button semantics
- Link semantics
- Alt
- Contrast
- Touch target
- Reduced Motion
- Motion Pause
- Skip Intro
- Skip Cinematic
- Quick View

Hover에만 핵심 정보를 넣지 않는다.

---

## 19. Failure / Recovery Workflow

### Video Failure
Poster / Static Layer로 전환.

### Motion Failure
Static Player / Static Prop으로 계속 진행.

### Audio Failure
Silent Mode.

### Progress Failure
콘텐츠는 Unlock 상태 유지.

### Auto Move Failure
사용자가 직접 이동하거나 Direct Navigation 가능.

### Route Failure
안전한 Route / World Map으로 복구.

### Loading Failure
Skip / Quick View 제공.

가짜 `%` 금지.

---

## 20. Performance Workflow

Asset 추가 시 확인:

- filesize
- dimensions
- codec
- lazy/preload
- offscreen behavior

작업 후:

- unnecessary animation loop 확인
- requestAnimationFrame cleanup
- event listener cleanup
- video pause
- particle count
- mobile quality

Target:
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

---

## 21. Browser Validation

구현이 끝나면 이미지 비교만 하지 않는다.

### 확인 순서

1. 첫 진입
2. Direct URL
3. Reload
4. Back / Forward
5. Keyboard
6. Mouse
7. Touch 가능성
8. Player control
9. Motion
10. Reduced Motion
11. Asset Failure fallback
12. Responsive

---

## 22. Product Validation

작업 결과를 아래 8개 질문으로 평가한다.

1. **첫인상** — 이름·직무·강점을 이해하는가?
2. **탐색** — 게임 없이 Project 4개와 Contact/Resume 접근 가능한가?
3. **콘텐츠** — 역할·문제·결정·구현이 전달되는가?
4. **조작** — 설명 없이 핵심 조작을 이해하는가?
5. **복구** — Skip/Back/Reload/Auto Move Cancel이 정상인가?
6. **반응형** — 다양한 화면에서 핵심 UI가 유지되는가?
7. **Asset Failure** — Asset 실패 후에도 다음 행동이 가능한가?
8. **접근성** — Keyboard/Reduced Motion에서도 동일 정보에 접근 가능한가?

---

## 23. 작업 후 검증

실제 `package.json` script를 확인한다.

기본:

```bash
npm run lint
npm run build
```

필요 시:

```bash
npm run dev
npm run preview
```

실행하지 않은 검증을 통과했다고 보고하지 않는다.

---

## 24. PROJECT_CONTEXT 갱신

중요 변경 후에만 업데이트한다.

- Route
- Scene 완료
- Player System
- Asset Strategy
- Major Design Decision
- Known Issue
- Validation 결과

계획을 구현 완료로 기록하지 않는다.

---

## 25. 완료 보고

다음만 간결하게 보고한다.

### Changed
수정한 파일.

### Implemented
실제 구현 내용.

### Adjusted
디자인/모션에서 작업 중 수정한 내용과 이유.

### Validation
실행한 검사.

### Remaining
미완료/미검증 항목.

---

## 26. 금지 사항

- 콘텐츠 임의 생성/변경
- Skill Level 추가
- 숨겨진 섬 추가
- Companion 추가
- Badge 장착 추가
- 의미 없는 HP/Life/Score
- 모든 Hover에 Glow/Scale/Particle
- 단일 영상으로 Interactive World 전체 대체
- Responsive를 단순 축소로 해결
- 접근성/Quick View 제거
- Asset 실패 시 전체 진행 중단
- 사용자 승인 없는 대량 Refactor
- 실제 검증 없이 완료 보고
