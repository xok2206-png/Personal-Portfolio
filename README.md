# Personal Portfolio

> 현실에서 게임 세계로 진입해 직접 탐험하는 **Playable Interactive Portfolio**

React + Vite 기반으로 제작하는 인터랙티브 개인 포트폴리오입니다.

일반적인 스크롤형 포트폴리오 대신, 사용자가 하나의 세계를 탐험하듯
지원자의 정체성, 기술, 프로젝트, 문제 해결 방식을 경험할 수 있도록 설계합니다.

이 프로젝트의 핵심 목적은 단순한 게임 연출이 아니라 다음 역량을 보여주는 것입니다.

> **디자인 의도를 이해하고, 직접 조작 가능한 반응형 웹 경험으로 구현할 수 있는 사람**

---

## Overview

이 포트폴리오는 두 가지 방식으로 탐색할 수 있습니다.

### ENTER WORLD
현실 세계에서 Portal을 통해 Portfolio World로 진입하고,
Player Character를 직접 조작하며 콘텐츠를 탐험하는 전체 경험입니다.

### QUICK VIEW
게임을 플레이하지 않고도
About / Skills / Projects / Q&A / Resume / Contact를 빠르게 확인할 수 있는 경로입니다.

즉, 게임 경험은 강하게 유지하지만 실제 포트폴리오 정보 접근을 막지 않습니다.

---

## Core Experience

```text
REAL WORLD
    ↓
PORTAL
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

이 흐름은 권장 Journey이며 강제 순서는 아닙니다.

사용자는 Quick View, Adventure Book, 직접 URL을 통해 필요한 콘텐츠로 이동할 수 있습니다.

---

## Product Principles

### PLAYER
캐릭터는 장식이 아니라 실제 Player Avatar입니다.

### LIVING WORLD
구름, 물, 풀, 깃발, 빛, 캐릭터 Idle 등
환경 요소가 계속 움직여 세계가 살아 있는 느낌을 만듭니다.

### JOURNEY
Navigation은 단순한 페이지 이동보다
`선택 → 이동 → 상호작용 → 전환 → 콘텐츠`의 흐름으로 경험합니다.

### PORTFOLIO FIRST
게임 연출보다 실제 프로젝트 콘텐츠 전달을 우선합니다.

### GUIDED, NOT LOCKED
권장 동선은 존재하지만 원하는 콘텐츠로 직접 이동할 수 있습니다.

### FIRST VISIT IS CINEMATIC, REVISIT IS FAST
첫 방문은 충분한 연출을 제공하고,
재방문에는 빠른 전환과 Skip을 제공합니다.

---

## World Map

WORLD MAP은 포트폴리오의 중심 Hub입니다.

```text
WORLD MAP
│
├── ABOUT
├── SKILLS
├── PROJECTS
├── Q&A
└── CONTACT
```

Desktop에서는 Player 직접 이동과 Point & Click을 함께 사용할 수 있습니다.

예:

```text
PROJECTS 선택
→ Player가 목적지를 바라봄
→ Walk / Run
→ Path 이동
→ 입구 도착
→ Door / Portal 반응
→ Camera Transition
→ Project World
```

Quick View / Reduced Motion / Browser Back에서는 긴 이동을 강제하지 않습니다.

---

## Projects World

PROJECTS World에서는 핵심 프로젝트 4개를 **한 화면에서 확인할 수 있는 구조**를 유지합니다.

```text
PROJECT WORLD

STAGE 01        STAGE 02

STAGE 03        STAGE 04
```

각 Project는 최소한 다음 정보를 빠르게 확인할 수 있어야 합니다.

- Project Name
- Category
- Role
- Key Visual
- Short Description
- Status
- View / Enter

Project별 World는 서로 다른 분위기를 가질 수 있지만,
공통 Player / Camera / Interaction System을 재사용합니다.

---

## Project Case Study

프로젝트 상세는 게임 연출보다 실제 작업 내용을 읽기 쉽게 전달하는 것을 우선합니다.

기본 구조:

```text
Overview
Problem
Role
Decision / Hypothesis
Solution
Design
Development
Result
Limitation / Retrospective
```

`Project Entry / Checkpoint / Stage Clear`는 Game Experience,
본문 Case Study는 Portfolio Reading Experience로 구분합니다.

실제 근거가 없는 성과 수치나 사용자 테스트 결과는 생성하지 않습니다.

---

## Power Up

Skills는 단순한 아이콘 목록이 아니라
짧은 Platform Action을 통해 획득하는 방식으로 표현합니다.

```text
Move
→ Jump
→ Block Hit
→ Item Pop
→ Pickup
→ Skill Feedback
→ Skill Information
```

Skill 숙련도를 `Lv.5`, 별점 등으로 표현하지 않습니다.

대신 실제 사용 경험과 연결합니다.

```text
FIGMA ACQUIRED

Prototype
Component
Design System

USED IN
Project A / Project B
```

---

## Real World & Portal

첫 화면은 Portfolio World와 대비되는 현실적인 작업실입니다.

- Photorealistic
- Cinematic
- Dark
- Warm Desk Light
- Cool Monitor Light

`ENTER WORLD`를 선택하면 Portal이 열리고,
디자인·개발·AI Tool을 지나며 Player Avatar로 변화합니다.

주요 Tool 예:

- Figma
- Photoshop
- Illustrator
- VS Code
- HTML / CSS / JavaScript
- React / Vite
- Git / GitHub
- ChatGPT
- Claude
- Gemini
- Midjourney
- Higgsfield

Tool은 단순 Logo Wall이 아니라
현실의 작업자가 Portfolio Player로 변화하는 과정의 일부로 사용합니다.

---

## Visual Direction

### Real World
**Photorealistic · Cinematic · Dark · Quiet**

### Portal
**Electric · Blue · Cyan · Violet · Dynamic**

### Portfolio World
**Bright · Playful · Soft 3D · 2.5D · Chunky · Alive · Adventurous**

Nintendo 게임은 특정 디자인을 복제하는 대상이 아니라
Interaction과 World Design 원리를 참고하는 레퍼런스입니다.

- Mario 계열 → Platform / Power Up / World Map
- Kirby 계열 → Character Reaction / Reward
- Zelda 계열 → Exploration / Discovery
- Animal Crossing 계열 → Living World / Ambient Motion

---

## Typography

사용 Font:

```text
Pretendard Variable
Fredoka Variable
Silkscreen Regular
Silkscreen Bold
RetroMario / SuperMario256 (Brand 후보)
```

역할:

- Pretendard → 한글 / 본문 / Case Study
- Fredoka → Scene Heading / Game Display
- Silkscreen → HUD / System Feedback
- Brand Font → `MY PORTFOLIO WORLD` Logo 전용

---

## Responsive

Primary World Reference:

```text
1440 × 810 / 16:9
```

이 값은 사이트의 최대 너비가 아니라 World Design 기준 좌표입니다.

주요 대응 환경:

```text
1920×1080
1440×810
1366×768
1180×820
1024×768
768×1024
430×932
402×874
390×844
360×800
```

원칙:

- 단순 Stretch 금지
- Camera Reframe 우선
- Important Object는 Safe Area 유지
- Ultrawide에서는 Far Environment 확장
- Mobile은 Desktop의 축소판이 아니라 별도 Composition

---

## Accessibility

게임을 하지 않아도 동일한 핵심 정보를 확인할 수 있어야 합니다.

지원 방향:

- Semantic HTML
- Keyboard Navigation
- focus-visible
- 약 44×44px 이상의 Interaction Target
- 색상만으로 State 표현 금지
- 의미 있는 이미지 Alt
- Sound Toggle
- `prefers-reduced-motion`
- Motion Pause
- Skip Intro
- Skip Cinematic
- Quick View
- Adventure Book Direct Navigation

---

## Failure & Recovery

고급 Asset이 실패해도 Portfolio가 멈추지 않도록 설계합니다.

- Video 실패 → Poster / Static Layer
- Player Motion 실패 → Static Character
- Ambient 실패 → 해당 Motion만 생략
- Audio 실패 → Silent Mode
- Progress 저장 실패 → 콘텐츠 잠금 금지
- Loading 실패 → Skip / Quick View
- Browser Back / Reload / Direct URL 유지

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- JSX
- CSS

### Routing
- React Router

### Development
- VS Code
- Claude Code
- Git
- GitHub

### Design / Creative
- Figma
- Photoshop
- Illustrator
- Higgsfield
- AI Creative Tools

Motion Library는 실제 `package.json`과 구현 요구사항을 확인한 뒤 사용합니다.

---

## Project Structure

현재 확인된 프로젝트 구조:

```text
src/
├── scenes/
│   ├── Scene01Start/
│   ├── Scene02Character/
│   ├── Scene03PowerUp/
│   ├── Scene04WorldMap/
│   ├── Scene05EnterWorld/
│   ├── Scene06Mission/
│   ├── Scene07StageClear/
│   ├── Scene08NextWorld/
│   ├── Scene09QA/
│   └── Scene10StaffRoll/
│
├── pages/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── QA/
│   └── Contact/
│
├── App.jsx
├── main.jsx
└── index.css
```

### Structure Principle

`scenes/`
→ Game Experience / Player / World / Transition

`pages/`
→ Portfolio Information / Content

새 기획에 따라 Route 및 Scene 역할은 향후 조정될 수 있지만,
현재 실제 코드와 충돌하지 않도록 단계적으로 변경합니다.

---

## Current Routes

최근 프로젝트 Audit 기준:

```text
/             → Scene01Start
/character    → Scene02Character
/power-up     → Scene03PowerUp
/world-map    → Scene04WorldMap

/about        → About
/skills       → Skills
/projects     → Projects
/qa           → QA
/contact      → Contact
```

새 PRD의 전체 Journey가 이미 구현된 것으로 간주하지 않습니다.

---

## Project Documentation

프로젝트 루트 및 Agent Skill에서 다음 문서를 관리합니다.

```text
AGENTS.md
CLAUDE.md
Personal-Portfolio_PRD_v2.md
DESIGN_SYSTEM.md
PROJECT_CONTEXT.md
README.md
.agents/skills/design-to-react/SKILL.md
```

역할:

- AGENTS → 모든 AI Agent 공통 규칙
- CLAUDE → Claude Code 전용 규칙
- PRD → 제품 요구사항과 Scene/기능
- DESIGN SYSTEM → 디자인/모션/인터랙션의 Working Guideline
- PROJECT CONTEXT → 현재 실제 구현 상태
- SKILL → 반복 구현 Workflow
- README → 외부 프로젝트 설명

---

## Development Workflow

```text
Documentation
    ↓
Structure / Route Audit
    ↓
Player Prototype
    ↓
Asset Strategy
    ↓
Scene Build
    ↓
Responsive
    ↓
Accessibility
    ↓
Performance
    ↓
QA
    ↓
Deploy
```

대규모 Asset 제작 전 먼저 다음 Prototype을 검증합니다.

- Idle
- Walk
- Run
- Jump
- Fall
- Land
- Collision
- Skill Block
- Item Pop
- Pickup
- Cloud / Grass Motion
- Scene Transition

---

## Product Validation

모든 주요 구현은 다음 기준으로 확인합니다.

| Area | Validation Question |
|---|---|
| First Impression | 이름·직무·핵심 강점을 이해할 수 있는가? |
| Navigation | 게임 없이 Project 4개와 Contact/Resume을 찾을 수 있는가? |
| Content | Project 역할·문제·결정·구현이 전달되는가? |
| Controls | 긴 설명 없이 이동·점프·획득·진입을 이해하는가? |
| Recovery | Skip·Back·Reload·Auto Move Cancel 뒤 정상인가? |
| Responsive | 다양한 화면에서 핵심 UI가 유지되는가? |
| Asset Failure | Video/FX 실패 뒤에도 다음 행동이 가능한가? |
| Accessibility | Keyboard/Reduced Motion에서도 동일 정보에 접근 가능한가? |

---

## Removed Scope

현재 범위에서 제외합니다.

- 숨겨진 섬 / Secret Area
- Companion / 동료 캐릭터
- Player Badge 장착
- Skill Level
- HP / Life / Score
- 의미 없는 Gamification
- 필요 이상의 3D Game Engine 구현

---

## Development

### Install

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

실제 `package.json`에 존재하는 scripts를 기준으로 실행합니다.

---

## Project Status

현재는 기존 React + Vite 프로젝트를
새 **Playable Interactive Portfolio** 기획으로 리뉴얼하는 단계입니다.

### Completed / Confirmed
- [x] React + Vite 프로젝트 구성
- [x] Git / GitHub 연결
- [x] 기존 Scene / Page 구조 Audit
- [x] 기본 React Router 구조
- [x] Font Asset 정리
- [x] New PRD 작성
- [x] Agent Rules 재정리
- [x] Design System Foundation 정리
- [x] Product Validation Criteria 정의

### Next
- [ ] 최신 문서 기준 Folder / Asset Structure 재설계
- [ ] Route / Scene Architecture Audit
- [ ] Player Prototype
- [ ] Living World Prototype
- [ ] Power Up Core Loop
- [ ] New World Map
- [ ] Projects World
- [ ] Project Case Study Integration
- [ ] Responsive QA
- [ ] Accessibility QA
- [ ] Performance QA
- [ ] Final Deployment

---

## Repository

GitHub Repository: `https://github.com/xok2206-png/Personal-Portfolio`

---

## License

This repository is a personal portfolio project.

Third-party fonts, visual references, generated assets, and external tools may have their own licenses and terms. Their usage should be reviewed separately before final public deployment.
