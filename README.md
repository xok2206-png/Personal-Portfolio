# Personal Portfolio

> 현실에서 시작해 Portfolio World로 이어지는 **Cinematic Interactive
> Personal Portfolio**

React + Vite 기반으로 제작하는 반응형 인터랙티브 개인 포트폴리오입니다.

일반적인 스크롤형 포트폴리오에서 벗어나, 현실의 작업 공간에서 Portal을
통과해 Portfolio World에 도착하는 하나의 경험으로 지원자의 정체성, 기술,
프로젝트와 문제 해결 과정을 보여주는 것을 목표로 합니다.

게임 자체가 목적이 아니라 **디자인 의도를 이해하고
인터랙션·반응형·접근성·프론트엔드 구현을 하나의 실제 웹 경험으로 연결할
수 있는 역량**을 포트폴리오 자체로 보여주는 프로젝트입니다.

------------------------------------------------------------------------

## Overview

포트폴리오는 두 가지 접근 방식을 지원합니다.

### ENTER WORLD

Real World에서 시작해 Portal / Tool Universe / Transformation /
Arrival을 거쳐 Portfolio World로 진입하는 전체 Cinematic
Experience입니다.

### DIRECT ACCESS

Cinematic을 거치지 않고도 About / Skills / Projects / Q&A / Resume /
Contact 등 핵심 Portfolio Content에 접근할 수 있습니다.

즉, 인터랙티브 경험을 제공하지만 콘텐츠 접근을 게임 플레이에 종속시키지
않습니다.

------------------------------------------------------------------------

## Core Experience

``` text
REAL WORLD
    ↓
PORTAL AWAKENING / OPEN
    ↓
SUCTION
    ↓
TOOL UNIVERSE / TRANSFORMATION
    ↓
FALL / ARRIVAL
    ↓
PORTFOLIO WORLD
    │
    ├── ABOUT
    ├── SKILLS
    ├── PROJECTS × 4
    ├── Q&A
    └── CONTACT
```

Portfolio World 이후 각 콘텐츠의 세부 공간 디자인과 Character 이동
방식은 현재 디자인 검토 중이며, 확정되지 않은 Interaction을 미리
고정하지 않습니다.

------------------------------------------------------------------------

## Product Principles

### PORTFOLIO FIRST

Cinematic과 3D 연출보다 실제 Portfolio Content 전달을 우선합니다.

### CINEMATIC → EXPLORE → READ

``` text
CINEMATIC
Real World / Portal / Tool Universe / Arrival

        ↓

EXPLORE
Portfolio World / Portfolio Content

        ↓

READ
Project Case Study / Information Content
```

화면의 목적에 따라 Motion과 Interaction Density를 다르게 사용합니다.

### WORLD IS NAVIGATION

Portfolio World는 단순 배경이 아니라 About / Skills / Projects / Q&A /
Contact를 탐색하는 Visual Navigation Hub입니다.

### DUAL NAVIGATION

World Interaction과 일반 HTML Navigation을 함께 제공해 3D나 게임적
Interaction을 사용하지 않아도 핵심 콘텐츠에 접근할 수 있도록 합니다.

### GUIDED, NOT LOCKED

추천 Journey는 제공하지만 사용자를 특정 순서에 가두지 않습니다.

### FIRST VISIT IS CINEMATIC, REVISIT IS FAST

첫 방문에는 Cinematic Experience를 제공하고, 재방문이나 Direct URL에서는
빠른 접근을 허용합니다.

### PROGRESSIVE ENHANCEMENT

Video / WebGL / 3D / Motion이 실패하거나 기기 성능이 낮아도 Portfolio의
핵심 정보와 Navigation은 유지합니다.

------------------------------------------------------------------------

## Real World

Real World는 현재 프로젝트에서 가장 먼저 완성하는 Scene이며 큰 방향이
확정되어 있습니다.

### Direction

-   Seoul Night Workspace
-   Photorealistic
-   Cinematic
-   Warm Desk Light
-   Cool City / Monitor Light
-   iMac / Designer-Developer Workspace
-   Character
-   Black-and-tan Maltipom
-   White Chiffon Curtain
-   Hero Copy Safe Area
-   `ENTER WORLD`

Portal Cyan은 기본 UI Color로 사용하지 않고 Portal 이상현상이 시작된
이후 등장합니다.

### ENTER WORLD

``` text
UI Fade
→ Focus Shift
→ Monitor Anomaly
→ Portal Awakening
→ Portal Open
→ Physical Suction
→ Character Resistance
→ Camera Follow
→ Tool Universe
```

복잡한 Cinematic Motion은 Video/Higgsfield를 활용할 수 있고, UI / Focus
/ Route / Reduced Motion 등은 Web Layer에서 처리하는 방향을 사용합니다.

------------------------------------------------------------------------

## Portal & Tool Universe

Portal은 현실의 작업자가 Stylized Portfolio Character로 변화하는 연결
구간입니다.

``` text
REALISTIC
→ DIGITAL DISTORTION
→ TOOL UNIVERSE
→ STYLIZED
→ PORTFOLIO CHARACTER
```

Tool은 단순 Logo Wall이 아니라 Transformation의 일부로 사용합니다.

실제 프로젝트에서 사용하는 Design / Development / Creative Tool을
기준으로 구성합니다.

------------------------------------------------------------------------

## Portfolio World

Portfolio World는 전체 Portfolio의 Main Visual Hub입니다.

``` text
PORTFOLIO WORLD
│
├── ABOUT
├── SKILLS
├── PROJECTS
├── Q&A
└── CONTACT
```

현재 큰 방향은 Floating Nature World / 2.5D Stylized 3D입니다.

Cloud, Water, Waterfall, Vegetation, Architecture, Character 등의 Living
Elements를 활용할 수 있습니다.

### Interaction Status

Portfolio World에서 Character를 실제로 이동시킬지, Hover/Click/Reaction
중심으로 구성할지는 아직 최종 확정하지 않았습니다.

따라서 다음은 현재 필수 기능이 아닙니다.

-   WASD 자유 이동
-   Jump
-   Collision
-   Auto Path
-   Point-based Movement

최종 Interaction은 디자인과 Prototype 검증 후 결정합니다.

------------------------------------------------------------------------

## Skills

Skills의 목적은 Tool 개수를 보여주는 것이 아니라 다음을 설명하는
것입니다.

-   무엇을 할 수 있는가
-   어떤 Tool을 사용하는가
-   실제 어떤 Project에서 사용했는가

`Toolkit / Game Item` 방식은 현재 검토 중인 Visual Direction이며 최종
확정안은 아닙니다.

다음과 같은 근거 없는 Gamification은 사용하지 않습니다.

-   Skill Level
-   XP
-   HP / Life / Score
-   숙련도 %
-   의미 없는 Achievement

------------------------------------------------------------------------

## Projects

Portfolio에는 핵심 프로젝트 4개를 구성합니다.

사용자는 프로젝트의 다음 정보를 빠르게 확인할 수 있어야 합니다.

-   Project Name
-   Category
-   Role
-   Key Visual
-   One-line Summary
-   View Case Study

Projects 영역의 최종 공간 디자인, Gallery / Archive 방식, Character 이동
방식은 아직 디자인 검토 중입니다.

### Project Case Study

Case Study는 **READ MODE**를 우선합니다.

실제 Project 자료가 지원하는 범위에서 다음 정보를 구성합니다.

``` text
Overview
Problem / Context
Role
Process / Decision
Solution
Design
Development
Result
Limitation / Retrospective
```

실제 근거가 없는 성과 수치, 사용자 테스트 결과, 개선율, 매출/전환율,
협업 정보는 생성하지 않습니다.

------------------------------------------------------------------------

## Visual Direction

### Real World

**Photorealistic · Cinematic · Personal · Night**

### Portal / Tool Universe

**Digital · Cyan · Electric · Transformative**

### Portfolio World

**Bright · Airy · Soft Stylized 3D · 2.5D · Living**

### Information / Case Study

**Editorial · Quiet · Content First**

각 World의 Environment는 달라지지만 Typography, Spacing, Radius,
Component Structure, Navigation, Accessibility 등 UI System은 일관되게
유지합니다.

------------------------------------------------------------------------

## Typography

현재 Typography System은 두 개의 Font Family를 사용합니다.

### Pretendard Variable

Primary Font.

사용:

-   Korean
-   UI
-   Navigation
-   Button
-   Heading
-   Body
-   Project Information
-   Case Study

### Instrument Serif

Editorial Accent Font.

사용:

-   `Hello,`
-   짧은 Hero Accent
-   Scene Opening
-   짧은 Editorial Statement

기존 Fredoka / Silkscreen / RetroMario / SuperMario256 Asset은
Legacy이며 현재 Typography System의 기준 Font가 아닙니다.

상세 Type Scale과 Line Height 규칙은 `DESIGN_SYSTEM.md`를 기준으로
합니다.

------------------------------------------------------------------------

## Responsive

### Breakpoints

``` text
Wide              ≥ 1920
Desktop           1280–1919
Compact Desktop   1024–1279
Tablet            768–1023
Mobile            < 768
```

### Primary Reference

``` text
Desktop   1440×810
Mobile    430×932
```

### QA Viewports

``` text
2560×1440
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

### Principles

-   Desktop을 단순 축소해 Mobile로 만들지 않습니다.
-   Visual Parity보다 Content Parity를 우선합니다.
-   Important Object는 Safe Area를 유지합니다.
-   Ultrawide에서 Main Composition을 과도하게 확대하지 않습니다.
-   Short Viewport를 별도로 검증합니다.
-   Hover Interaction에는 Touch / Keyboard 대체 경로를 제공합니다.
-   Mobile에서 복잡한 3D / Character Interaction을 강제하지 않습니다.
-   Real World는 Tablet / Mobile에서 별도 Crop / Composition을 사용할 수
    있습니다.

------------------------------------------------------------------------

## Accessibility

핵심 Portfolio Content는 Motion이나 3D 사용 여부와 관계없이 접근할 수
있어야 합니다.

지원 방향:

-   Semantic HTML
-   Keyboard Navigation
-   `focus-visible`
-   Button / Link Semantics
-   약 44×44px 이상의 Interaction Target
-   충분한 Contrast
-   Color-only State 금지
-   의미 있는 Image Alt
-   `prefers-reduced-motion`
-   Skip Cinematic
-   Direct Content Access
-   200% Browser Zoom

------------------------------------------------------------------------

## Failure & Recovery

고급 Asset이 실패해도 Portfolio가 중단되지 않도록 설계합니다.

``` text
Video Failure
→ Poster / Static Layer

WebGL / Three.js Failure
→ Static World + HTML Navigation

Character Motion Failure
→ Static Character

Audio Failure
→ Silent Mode

Image Failure
→ Fallback Surface + Alt

Transition Failure
→ Immediate Route

Loading Failure
→ Skip / Direct Access
```

Browser Back / Reload / Direct URL도 정상적으로 사용할 수 있어야 합니다.

------------------------------------------------------------------------

## Tech Stack

### Core

-   React
-   Vite
-   JavaScript / JSX
-   CSS
-   React Router
-   Git / GitHub

### Design / Creative

-   Figma
-   Photoshop
-   Illustrator
-   Higgsfield

### Advanced Interaction / Asset --- As Needed

-   Three.js
-   GSAP
-   Blender
-   Astra
-   AI Creative Tools

Three.js / GSAP 등의 Library는 실제 `package.json`과 구현 요구사항을
확인한 뒤 사용합니다.

------------------------------------------------------------------------

## Project Structure

현재 프로젝트는 Scene과 Information Page의 역할을 분리합니다.

``` text
src/
├── app/
│   └── router.jsx
├── scenes/
├── pages/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── ProjectDetail/
│   ├── QA/
│   └── Contact/
├── App.jsx
├── main.jsx
└── index.css
```

### Structure Principle

``` text
scenes/
→ Cinematic / World / Character / Transition

pages/
→ Portfolio Information / Content
```

이전 기획의 `PowerUp`, `Mission`, `StageClear`, `QAWorld`, `ProjectEntry`
Legacy Scene은 실제 참조를 확인한 뒤 2026-09-23 구조 정리에서 제거했습니다
(`WorldMap`은 `PortfolioWorld`로 rename, Route URL `/world-map`은 유지).

`Character`, `Ending`, `QuickView`는 이름은 이전 기획과 겹치지만 각각 실제
Navigation 참조가 있거나(Character) 사용자가 유지를 결정해(Ending,
QuickView) 아직 남아 있습니다. 최신 상태는 `PROJECT_CONTEXT.md`를 기준으로
확인합니다.

------------------------------------------------------------------------

## Asset Structure

목표 Asset 구조:

``` text
public/assets/
├── source/
│   ├── original/
│   ├── higgsfield/
│   ├── astra/
│   └── blender/
└── production/
    ├── images/
    ├── video/
    ├── models/
    ├── icons/
    ├── audio/
    └── fonts/
```

2026-09-23 기준 `production/images/real-world/`와 `production/fonts/`만
실제로 구현되어 있으며, 나머지 Category는 해당 Asset이 실제로 생길 때
단계적으로 추가합니다.

### Naming

-   lowercase
-   kebab-case
-   English
-   no spaces

### Recommended Formats

-   Image → WebP / AVIF
-   Video → WebM, 필요 시 MP4 Fallback
-   3D → GLB
-   Icon → SVG
-   Font → WOFF2

------------------------------------------------------------------------

## Project Documentation

``` text
AGENTS.md
CLAUDE.md
Personal-Portfolio_PRD_FINAL.md
DESIGN_SYSTEM.md
PROJECT_CONTEXT.md
README.md
.agents/skills/design-to-react/SKILL.md
```

### Responsibility

-   `AGENTS.md` → AI Coding Agent 공통 규칙
-   `CLAUDE.md` → Claude Code 실행 규칙
-   `PRD` → 제품 / 콘텐츠 / 사용자 경험 / 요구사항
-   `DESIGN_SYSTEM` → Visual / UI / Responsive 기준
-   `PROJECT_CONTEXT` → 현재 실제 구현 상태
-   `SKILL` → 반복 구현 Workflow
-   `README` → 외부 프로젝트 설명

------------------------------------------------------------------------

## Development Workflow

``` text
Documentation
    ↓
Code / Route Audit
    ↓
Real World
    ↓
Portal / Tool Universe
    ↓
Arrival
    ↓
Portfolio World
    ↓
Remaining Content
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

Real World 이후 세부 콘텐츠의 공간 디자인이나 Character Movement는
디자인 확정 후 구현합니다.

------------------------------------------------------------------------

## Product Validation

  -----------------------------------------------------------------------
  Area                                Validation Question
  ----------------------------------- -----------------------------------
  First Impression                    이름·직무·핵심 강점을 빠르게 이해할
                                      수 있는가?

  Navigation                          게임/3D 없이 Project 4개와
                                      Contact/Resume에 접근 가능한가?

  Content                             Project의 역할·문제·결정·구현을
                                      이해할 수 있는가?

  Interaction                         설명 없이 핵심 행동을 이해할 수
                                      있는가?

  Recovery                            Skip·Back·Reload·Direct URL이
                                      정상인가?

  Responsive                          다양한 화면에서 핵심 UI가
                                      유지되는가?

  Asset Failure                       Video/3D/FX 실패 뒤에도 다음 행동이
                                      가능한가?

  Accessibility                       Keyboard/Reduced Motion에서도 동일
                                      정보에 접근 가능한가?
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Removed / Legacy Scope

현재 제품 요구사항에서 제외하거나 자동 복원하지 않습니다.

-   POWER UP Gameplay
-   Skill Block / Item Pickup Loop
-   Skill Level / XP
-   HP / Life / Score
-   Secret Area
-   Companion
-   Player Badge
-   Portfolio World 자유 이동
-   필수 Jump / Collision
-   Mission Gameplay
-   Stage Clear 중심 Journey
-   Game Clear 중심 Ending
-   의미 없는 Gamification
-   필요 이상의 3D Game Engine 구현

------------------------------------------------------------------------

## Development

### Install

``` bash
npm install
```

### Development Server

``` bash
npm run dev
```

### Build

``` bash
npm run build
```

### Lint

``` bash
npm run lint
```

실제 `package.json`에 존재하는 Script를 기준으로 실행합니다.

------------------------------------------------------------------------

## Project Status

현재는 기존 React + Vite 프로젝트를 최신 **Cinematic Interactive
Personal Portfolio** 방향으로 리뉴얼하는 단계입니다.

### Confirmed

-   [x] React + Vite 프로젝트 구성
-   [x] Git / GitHub 연결
-   [x] React Router 기반 구조
-   [x] PRD 최신화
-   [x] Design System 최신화
-   [x] Project Context 최신화
-   [x] Agent / Claude / Skill 규칙 최신화
-   [x] Responsive Architecture 정의
-   [x] Real World 방향 확정

### Current Priority

-   [ ] Real World 최종 구현
-   [ ] Portal Sequence
-   [ ] Tool Universe / Transformation
-   [ ] Arrival
-   [ ] Portfolio World
-   [ ] Remaining Portfolio Content
-   [ ] Responsive QA
-   [ ] Accessibility QA
-   [ ] Performance QA
-   [ ] Final Deployment

Portfolio World 이후의 세부 디자인과 Character 이동 방식은 아직 확정되지
않았습니다.

------------------------------------------------------------------------

## Repository

GitHub Repository: `https://github.com/xok2206-png/Personal-Portfolio`

------------------------------------------------------------------------

## License

This repository is a personal portfolio project.

Third-party fonts, visual references, generated assets, libraries, and
external tools may have their own licenses and terms. Their usage should
be reviewed separately before final public deployment.
