# Personal Portfolio PRD v2

> Product Requirements Document  
> Platform: Responsive Web  
> Stack: React + Vite  
> Concept: **Playable Interactive Portfolio**  
> Status: Working PRD — 콘텐츠 구조는 고정 기준, 디자인·모션·인터랙션은 반복 개선 가능

---

## 01. Product Overview

이 프로젝트는 일반적인 스크롤형 포트폴리오가 아니라,
**사용자가 하나의 세계를 탐험하듯 지원자의 정체성, 기술, 프로젝트, 문제 해결 방식을 경험하는 인터랙티브 퍼스널 포트폴리오**다.

게임 자체가 목적이 아니다.

포트폴리오를 통해 다음 역량을 증명하는 것이 목적이다.

> **디자인 의도를 이해하고, 인터랙션과 반응형을 포함한 실제 웹 경험으로 구현할 수 있는 사람**

주요 사용자는 다음과 같다.

- 채용 담당자
- 프론트엔드/퍼블리싱 실무자
- UX/UI 디자이너
- 포트폴리오를 검토하는 기업 관계자

---

## 02. Product Goal

사용자는 짧은 시간 안에 다음을 파악할 수 있어야 한다.

1. 누구인지
2. 어떤 직무를 목표로 하는지
3. 어떤 기술을 사용하는지
4. 어떤 프로젝트를 했는지
5. 프로젝트에서 어떤 역할과 판단을 했는지
6. 디자인과 개발을 어느 수준으로 연결할 수 있는지
7. 어떻게 연락할 수 있는지

게임 연출은 이 정보를 더 기억에 남게 전달하기 위한 수단이다.

---

## 03. Core Product Principles

### PLAYER
캐릭터는 장식이 아니라 Player Avatar다.

### LIVING WORLD
기본 Game Scene은 사용자가 아무것도 하지 않아도 살아 움직인다.

### JOURNEY
Navigation은 단순 Page Switch보다 이동·발견·상호작용으로 경험한다.

### PORTFOLIO FIRST
게임보다 실제 콘텐츠 전달이 우선이다.

### GUIDED, NOT LOCKED
추천 동선은 제공하지만 사용자를 특정 순서에 가두지 않는다.

### PLAY, BUT NEVER BLOCK CONTENT
게임을 하지 않아도 Project / Contact / Resume에 접근할 수 있어야 한다.

### FIRST VISIT IS CINEMATIC, REVISIT IS FAST
첫 방문은 연출을 충분히 보여주되, 재방문에는 빠른 이동을 허용한다.

---

## 04. LOCKED vs FLEXIBLE

### LOCKED

다음은 명시적인 변경 요청이 없는 한 유지한다.

- 프로젝트 핵심 콘텐츠
- 프로젝트 4개 구조
- About / Skills / Projects / Q&A / Contact의 핵심 정보
- 실제 Role / Process / Result / Limitation
- Quick View
- 게임 없이도 콘텐츠에 접근 가능한 구조
- Product Validation Criteria
- Responsive / Accessibility / Fallback 원칙
- React + Vite
- React Router 기반 Route 구조 사용
- `src/scenes/`와 `src/pages/`의 역할 분리

### FLEXIBLE / ITERATIVE

작업하면서 실제 브라우저 결과를 보고 수정 가능하다.

- 디자인
- 레이아웃
- 화면 Composition
- 애니메이션
- 모션 타이밍
- Hover / Pressed
- 카메라
- Parallax
- Transition
- FX
- Lighting
- Ambient Motion
- Scene별 Interaction 방식
- Responsive Composition
- Color 미세 조정

디자인 시스템은 기준선이며 절대 고정값이 아니다.

---

## 05. Primary User Modes

첫 진입에서 사용자는 두 방식 중 하나를 선택할 수 있다.

### A. ENTER WORLD

전체 Interactive Experience.

- Real World
- Portal
- Player Transformation
- Character
- Power Up
- World Map
- Project Worlds
- Mission
- Stage Clear
- Q&A
- Contact
- Ending

### B. QUICK VIEW

게임을 하지 않고 포트폴리오 정보에 바로 접근.

Quick View는 별도 콘텐츠를 만드는 것이 아니라
**동일한 Portfolio Data를 연출 없이 빠르게 탐색하는 경로**다.

Quick View에서 최소한 다음에 바로 접근할 수 있어야 한다.

- About
- Skills
- Projects 4개
- Q&A
- Resume
- Contact

---

## 06. Overall Experience Flow

```text
SCENE 00 — REAL WORLD
        ↓
PORTAL OPEN
        ↓
TOOL UNIVERSE / STYLE TRANSFORMATION
        ↓
ARRIVAL
        ↓
CHARACTER
        ↓
POWER UP
        ↓
WORLD MAP
        ↓
PROJECT WORLD
        ↓
PROJECT ENTRY
        ↓
MISSION / CASE STUDY
        ↓
STAGE CLEAR
        ↓
WORLD MAP
        ↓
Q&A / CONTACT
        ↓
GAME CLEAR
        ↓
STAFF ROLL
        ↓
RETURN TO REAL WORLD
```

이 Flow는 권장 Journey다.

사용자는 Quick View / Adventure Book / Direct Link를 통해
중간 콘텐츠로 직접 이동할 수 있다.

---

## 07. SCENE 00 — REAL WORLD

### 목적
Portfolio World로 들어가기 전 현실 세계를 보여주고,
현실 → 게임 세계의 대비를 만든다.

### Visual Direction
- 현실적인 작업실
- 늦은 저녁
- Photorealistic / Cinematic
- Warm Desk Light
- Cool Monitor Light
- 낮은 Motion Intensity

### Ambient
- Monitor glow
- Curtain
- Steam
- Outside light
- Character subtle movement

### Primary Actions
- `ENTER WORLD`
- `QUICK VIEW`

### ENTER WORLD Sequence
1. Monitor 이상 현상
2. 작은 빛
3. Portal 생성
4. 주변 물체가 Portal에 반응
5. Character reaction
6. Character가 Portal로 끌려감
7. Camera가 따라 진입

Intro는 Skip 가능해야 한다.

---

## 08. PORTAL / TOOL UNIVERSE

### 목적
현실의 작업자에서 Portfolio World의 Player Avatar로 전환되는 과정을 보여준다.

### Tools

#### Design
- Figma
- Photoshop
- Illustrator

#### Development
- VS Code
- HTML
- CSS
- JavaScript
- React
- Vite
- Git
- GitHub

#### AI / Creative
- ChatGPT
- Claude
- Gemini
- Midjourney
- Higgsfield

실제 사용하는 Tool이 추가될 경우 Project 자료를 기준으로 갱신한다.

### 연출 원칙
단순 Logo Wall로 만들지 않는다.

Tool을 지나면서:

`REALISTIC → STYLIZED → GAME ART → PLAYER AVATAR`

로 변환된다.

마지막에는 짧은 System Feedback만 허용한다.

예:
`PLAYER READY`

Skill Level 표현은 사용하지 않는다.

---

## 09. ARRIVAL

Portal을 통과한 Player가 Portfolio World로 떨어진다.

### Sequence
- Cloud 통과
- World Reveal
- Fall
- Land
- Dust
- Grass / Flower reaction
- Bird reaction
- Player recovery
- Look around

이후 사용자가 Player Control을 얻게 된다.

화면은 처음으로 밝은 Portfolio World 전체를 보여준다.

---

## 10. CHARACTER

### 목적
지원자의 정체성과 소개 콘텐츠 전달.

### 콘텐츠
- Profile
- Values
- Interests
- History / Background
- Role / Direction

### Interaction
Player가 공간 안에서 각 Information Object로 접근할 수 있다.

예:

- PROFILE
- VALUES
- INTERESTS
- HISTORY

Object에 접근하면 실제 Portfolio Information UI를 보여준다.

게임 조작 없이 Adventure Book에서도 동일 콘텐츠 접근 가능.

---

## 11. POWER UP

### 목적
Skills를 단순 목록이 아니라 직접 획득하는 경험으로 보여준다.

### 기본 조작
Desktop:
- Left / Right 또는 A / D
- Space / Up / W = Jump

필요 시 Point & Click을 보조로 제공한다.

### Core Loop

```text
Player 이동
→ Skill Block 아래 접근
→ Jump
→ Hit
→ Skill Item Pop
→ Player가 획득
→ Power Up Feedback
→ Skill Information
```

### Skill 표현

`FIGMA Lv.5` 같은 자가평가 Level은 사용하지 않는다.

대신:

```text
FIGMA ACQUIRED

Prototype
Component
Design System

USED IN
Project A / Project B
```

처럼 실제 사용 근거와 연결한다.

### Power-up FX 예

- Figma → Wireframe / Grid / Component
- Photoshop → Color / Image / Layer
- Illustrator → Vector / Path
- Frontend → Code / UI Build
- 3D → Wireframe → Render
- AI → Generative / Prompt / Motion

Skill 목록은 실제 Portfolio Content를 기준으로 최종 확정한다.

---

## 12. WORLD MAP

### 목적
Portfolio 전체의 Main Hub.

### Main Destinations
- ABOUT
- SKILLS
- PROJECTS
- Q&A
- CONTACT

새 World를 임의로 추가하지 않는다.

### Navigation

#### 자유 이동
- WASD
- 방향키

#### 목적지 선택
- Point & Click
- Destination 선택 시 Auto Path 가능

### Destination Interaction

```text
Select
→ Player Look
→ Walk / Run
→ Path Travel
→ Arrival
→ Door / Portal / Environment Reaction
→ Transition
→ Route
```

Quick View / Browser Back / Reduced Motion에서는 긴 이동을 강제하지 않는다.

### World State

Progress에 따라 World가 일부 변화할 수 있다.

예:
- Project Cleared
- Light On
- Environment Restored
- Flag Active

단, 숨겨진 섬 / Companion / Badge 장착 시스템은 사용하지 않는다.

---

## 13. PROJECTS WORLD

### 핵심 구조

**4개의 프로젝트 Stage가 한 화면에 보여야 한다.**

```text
PROJECT WORLD

STAGE 01        STAGE 02

STAGE 03        STAGE 04
```

각 Stage에서 최소 다음을 빠르게 확인할 수 있어야 한다.

- Project Name
- Category
- Role
- Key Visual
- Short Description
- Project Status
- Enter / View

Project 4개의 실제 콘텐츠는 변경하지 않는다.

### 디자인
각 Project의 성격을 Environment / Biome / Architecture로 차별화할 수 있다.

단 각 Project를 서로 다른 별도 게임으로 만들 필요는 없다.

공통 World System을 재사용한다.

---

## 14. PROJECT ENTRY

Project 선택 시 바로 상세 페이지로 순간 이동하는 대신
가능한 경우 짧은 진입 연출을 사용한다.

```text
Player 이동
→ Entrance 도착
→ Door / Portal
→ Camera Follow
→ Project Intro
```

First Visit는 Full.
Revisit은 Short.

Skip 가능.

---

## 15. MISSION / CASE STUDY

### 목적
Project의 실제 문제 해결 과정을 보여준다.

### 기본 구조

```text
Overview
Problem
Role
Hypothesis / Decision
Solution
Design
Development
Result
Limitation / Retrospective
```

실제 Project에 없는 항목은 억지로 채우지 않는다.

### Experience Rule

`Checkpoint / Entry / Clear = Game`

`Case Study Content = Portfolio`

즉 Project 본문을 읽기 위해 계속 게임 조작을 요구하지 않는다.

### World Restoration

Project의 문제 해결 과정을 Environment 변화로 표현할 수 있다.

예:

Problem
→ Incomplete World

Process
→ 변화 진행

Result
→ Restored World

이는 Visual Metaphor이며 실제 사용자 성과를 의미하지 않는다.

---

## 16. STAGE CLEAR

### 목적
사용자가 Project 콘텐츠를 확인했다는 완료 Feedback.

### Sequence
- Final checkpoint
- Player reaction
- Star / Light / Particle
- Environment reaction
- `STAGE CLEAR`

### 중요
Stage Clear는 실제 Project 성과를 의미하지 않는다.

허위 지표나 개선 수치를 연결하지 않는다.

### Actions
- Back to World Map
- Next Project
- Adventure Book
- Quick View

---

## 17. Q&A

### 목적
사용자/채용 담당자가 궁금해할 내용을 쉽게 확인.

### 콘텐츠 예
- 작업 방식
- 협업 방식
- 문제 해결 방식
- 디자인/개발 역할
- 프로젝트 관련 질문

### Interaction
Character / World Interaction을 사용할 수 있지만
Q&A 정보 자체는 즉시 읽을 수 있어야 한다.

---

## 18. CONTACT

### 목적
Portfolio 탐험 후 바로 연락 행동으로 연결.

### 최소 정보
- Email
- GitHub
- Resume
- 필요한 외부 링크

Contact는 게임 진행도를 요구하지 않는다.

언제든 Adventure Book / Quick View에서 접근 가능해야 한다.

---

## 19. GAME CLEAR / STAFF ROLL

모든 주요 Journey를 마치면 World가 시간적으로 변화한다.

```text
DAY
→ SUNSET
→ NIGHT
```

### 연출
- World lights on
- Player resting
- Calm environment
- Staff Roll / Credits
- Final message

마지막에는 Real World로 돌아갈 수 있다.

Real World의 모니터 또는 작은 Object를 통해
Journey의 흔적을 암시할 수 있다.

Ending 역시 Skip 가능.

---

## 20. Adventure Book

Adventure Book은 게임 메뉴가 아니라 **Portfolio OS**다.

### 최소 항목
- Profile
- Skills
- Projects
- Q&A
- Contact
- Resume
- Current Location
- Progress

### 목적
- 현재 위치 확인
- 직접 이동
- Project 빠른 접근
- 게임 없이 정보 열람
- Progress 확인

숨겨진 섬 / Secret Discovery System은 포함하지 않는다.

---

## 21. Progress System

Progress는 실제 Portfolio Content와 연결된 상태만 사용한다.

### 허용
- Skill Acquired
- Project Visited
- Project Cleared
- Intro Watched

### 금지
- Skill Level
- HP
- Life
- Score
- Player Badge 장착
- 의미 없는 Achievement 수치

Progress 저장 실패 시 콘텐츠가 잠기면 안 된다.

---

## 22. Player Control

### Desktop

- WASD / Arrow = 이동
- Space = Jump가 필요한 Scene에서만
- Mouse = Destination Select / UI
- Point & Click = Auto Path

### Input Priority

- Auto Move 중 직접 이동 → Auto Move 취소
- UI Panel 활성 → Player Input 잠금
- Jump/Pickup/Land 중 → 비필수 reaction 억제
- 목적지 연속 선택 → 마지막 유효 목적지
- Skip/Error → Control Lock 해제

### Mobile
Desktop을 축소하지 않는다.

- Tap
- Contextual Action
- 필요 시 Virtual Control
- Camera simplification

---

## 23. Living World

### 기본 원칙

사용자가 아무것도 하지 않아도 세계가 살아 있어야 한다.

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
- Cloud Shadow
- Light
- Sparkle

### 중요
모든 Object를 동시에 강하게 움직이지 않는다.

Motion Priority:

1. Player
2. Current Objective
3. World
4. Ambient

---

## 24. Motion / Camera

Motion / Animation / Camera는 Working System이다.

실제 화면을 보며 계속 수정할 수 있다.

### Experience Density

HIGH / WOW:
- Portal
- Power Up
- World Enter
- Stage Clear

MEDIUM / PLAY:
- Character
- World Map
- Q&A

LOW / READ:
- Project Case Study
- Resume
- Contact
- Adventure Book

### Camera
- Real World → Cinematic
- Portal → Push / Distortion
- Arrival → Fall / Land / Reveal
- Character → Player-oriented
- Power Up → Side Platform
- World Map → 2.5D Exploration
- Project Entry → Follow / Zoom
- Mission → Stable / Scroll / Follow
- Stage Clear → Short Cinematic
- Ending → Slow Cinematic

---

## 25. Responsive Requirements

Primary World Reference:

**1440 × 810 / 16:9**

반응형은 단순 Scale보다 Camera Reframe을 우선한다.

### 필수 테스트
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

### 원칙
- Important Object는 Safe Area 유지
- Ultrawide에서 Main World Stretch 금지
- Short viewport에서 Camera Zoom-out
- Mobile은 별도 Composition
- Information UI는 Game Scene과 별도 Responsive 규칙 사용 가능

---

## 26. Accessibility Requirements

필수:

- Semantic HTML
- Keyboard Navigation
- focus-visible
- Touch Target 약 44×44px 이상
- 충분한 Contrast
- 색상만으로 State 전달 금지
- Alt Text
- Sound Toggle
- Reduced Motion
- Motion Pause
- Skip Intro
- Skip Cinematic
- Quick View
- Adventure Book Direct Navigation

게임을 하지 않아도 동일한 핵심 정보에 접근 가능해야 한다.

---

## 27. Failure / Recovery Requirements

### Asset Failure
- Video 실패 → Poster / Static Layer
- Character Motion 실패 → Static Character
- Ambient 실패 → Ambient만 생략
- Audio 실패 → Silent Mode
- Image 실패 → Fallback Surface + Alt

### Navigation
- Browser Back 정상 작동
- Refresh 정상 작동
- Direct URL 정상 작동
- Quick View 정상 작동

### Loading
- 무한 Loading 금지
- 실제 Progress를 모르면 가짜 `%` 금지
- 핵심 Asset 지연 시 Skip / Quick View 가능

---

## 28. Performance Requirements

- WebP / AVIF 우선
- 필요 시 WebM
- 불필요한 4K PNG 금지
- Scene / Route Lazy Loading
- 필요 Asset Preload
- Offscreen Animation Pause
- Offscreen Video Pause
- Particle 제한
- Cleanup
- Mobile Quality Reduction

Target:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Player 입력 반응은 별도로 검증한다.

---

## 29. Prototype Gate

전체 제작 전에 다음 작은 Gameplay Prototype을 먼저 검증한다.

1. Idle
2. Walk
3. Run
4. Jump
5. Fall
6. Land
7. Collision
8. Skill Block 1개
9. Item Pop
10. Pickup
11. Cloud / Grass Living Motion
12. Scene Transition 1회

### 통과 기준
- Character 비율 유지
- Ground Contact 안정
- Motion Transition 자연스러움
- Input Response 정상
- Collision 안정
- Asset Loop 자연스러움
- 1366×768에서도 조작 가능
- Mobile 전략이 가능한 구조

Prototype이 불안정하면 대규모 Asset 제작을 먼저 하지 않는다.

---

## 30. Removed Scope

다음은 현재 범위에서 삭제 확정.

- 숨겨진 섬 / Secret Area
- Companion / 동료
- Player Badge 장착
- Skill Level
- HP
- Life
- Score
- 의미 없는 Gamification

---

## 31. Product Validation Criteria

| 영역 | 질문 |
|---|---|
| 첫인상 | 이름·직무·핵심 강점을 설명할 수 있는가? |
| 탐색 | 게임 없이 Project 4개와 Contact/Resume을 찾을 수 있는가? |
| 콘텐츠 | Project 하나를 본 뒤 역할·문제·주요 결정·구현을 이해하는가? |
| 조작 | 긴 설명 없이 이동·점프·아이템 획득·진입을 이해하는가? |
| 복구 | Auto Move 취소·Skip·Back·Reload 뒤 정상인가? |
| 반응형 | 노트북·Tablet·Mobile·확대 화면에서 핵심 UI가 유지되는가? |
| 에셋 실패 | Video/FX 실패 후에도 콘텐츠와 다음 행동이 남는가? |
| 접근성 | Keyboard·Reduced Motion·Motion Pause에서도 동일 정보에 접근 가능한가? |

기능이나 연출을 추가할 때 이 기준 중 무엇을 개선하는지 설명할 수 없다면 우선순위를 낮춘다.

---

## 32. Completion Criteria

MVP 완료 조건:

- Real World에서 ENTER WORLD / Quick View 사용 가능
- Portal 또는 대체 Transition으로 Portfolio World 진입 가능
- Player 기본 이동 시스템 동작
- Character 콘텐츠 접근 가능
- Power Up 핵심 Loop 동작
- World Map 탐색 가능
- Project 4개를 한 화면에서 확인 가능
- Project 상세 콘텐츠 접근 가능
- Stage Clear Feedback 동작
- Q&A / Contact / Resume 접근 가능
- Adventure Book 동작
- Direct URL / Back / Reload 동작
- Responsive 핵심 환경 검증
- Reduced Motion 동작
- Asset Failure Fallback 존재
- Lint / Build 치명적 오류 없음

---

## 33. Out of Scope

- 실제 게임 엔진
- 사용자 로그인
- 결제
- CMS
- 관리자 페이지
- 실제 게임 서버
- 복잡한 Multiplayer
- 의미 없는 게임 점수 시스템
- 프로젝트와 관계없는 추가 World
- 필요 이상의 WebGL / 3D Engine 구현

---

## 34. Technical Baseline

- Framework: React
- Build: Vite
- Language: JavaScript
- Routing: React Router
- Styling: CSS
- Lint: ESLint
- Version Control: Git / GitHub

Motion Library는 실제 `package.json`과 구현 요구를 확인한 뒤 사용한다.

새 Dependency는 자동으로 추가하지 않는다.

---

## 35. PRD Update Rule

이 PRD는 **제품의 콘텐츠·기능·사용자 목표**를 관리한다.

디자인 세부 값, Animation Timing, Camera 수치 등은 최신 `DESIGN_SYSTEM`에서 관리한다.

작업 중 디자인·모션·인터랙션이 개선되는 것은 허용되며,
제품 목표나 콘텐츠 구조가 바뀌는 경우에만 PRD를 갱신한다.
