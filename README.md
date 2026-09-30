# Personal Portfolio

> 현실의 작업 공간에서 시작해 Portal을 통과하고, 살아 있는 Fantasy
> Portfolio World를 탐험하는 **Cinematic Interactive Personal
> Portfolio**

React + Vite 기반의 반응형 인터랙티브 개인 포트폴리오입니다.

### 로컬 통합 미리보기

현재 통합 작업 폴더에서 `npm run dev`를 실행하고 `http://127.0.0.1:5174`를 사용합니다.
포트를 이미 사용 중이면 Vite는 다른 번호로 옮겨 실행하지 않고 오류를 표시합니다.
다른 작업 폴더에서 실행한 서버는 그 폴더의 코드만 보여주므로 통합 확인에는 사용하지 않습니다.

페이지별 병행 작업 연결은 로컬 `.page-worktrees.local.json`에만 설정합니다.
개발 중 지정된 페이지/에셋은 약 1.2초마다 이 폴더로 반영되며 원본은 수정하지 않습니다.
공통 App/Router/Header 변경은 수동 병합합니다. 같은 파일을 이 통합 폴더에서도
수정한 경우 자동 덮어쓰기를 중단하고 서버 로그에 알려줍니다. 이전 파일은
`.page-sync/backups/`에 보관됩니다. 배포 빌드는 외부 폴더 없이 통합된 파일만 사용합니다.

게임 자체를 만드는 것이 목적이 아니라, **UI/UX 디자인 의도 → 인터랙션 →
반응형 → 접근성 → 프론트엔드 구현**을 하나의 실제 웹 경험으로 연결할 수
있는 역량을 보여주는 것이 목적입니다.

------------------------------------------------------------------------

## Overview

포트폴리오는 두 가지 접근 방식을 함께 제공합니다.

### ENTER WORLD

`Real World → Portal → Tool Universe / Transformation → Arrival → Portfolio World`

첫 방문에서는 Cinematic Experience를 통해 세계관으로 진입합니다.

### DIRECT ACCESS

Cinematic이나 Character 조작 없이도 About / Skills / Projects / Q&A /
Resume / Contact에 직접 접근할 수 있습니다.

**인터랙션은 경험을 강화하지만 콘텐츠 접근을 막지 않습니다.**

------------------------------------------------------------------------

## Core Experience

``` text
REAL WORLD
   ↓
PORTAL AWAKENING / OPEN
   ↓
TOOL UNIVERSE / TRANSFORMATION
   ↓
FALL / ARRIVAL
   ↓
PORTFOLIO WORLD
   ├── ABOUT
   ├── SKILLS
   ├── PROJECTS
   └── CONTACT
        └── Q&A access

DIRECT / QUICK ACCESS
   ├── ABOUT
   ├── SKILLS
   ├── PROJECTS
   ├── Q&A
   ├── RESUME
   └── CONTACT
```

Portfolio World의 **top-level destination은 4개**입니다.

-   About
-   Skills
-   Projects
-   Contact

Q&A는 삭제하지 않습니다. 독립 World Island에서만 제외되며 Contact/호환
Route 등 최신 IA를 통해 접근할 수 있습니다. Resume 역시 Direct
Access에서 유지합니다.

------------------------------------------------------------------------

## Product Principles

### PORTFOLIO FIRST

Cinematic, Character, 3D, Fantasy 연출보다 실제 Portfolio Content를
우선합니다.

### CINEMATIC → EXPLORE → READ

-   Cinematic: Real World / Portal / Transformation
-   Explore: Portfolio World / About / Skills / Projects / Contact
-   Read: Project Case Study / Resume / Information Content

콘텐츠 밀도가 높아질수록 Motion과 장식을 줄입니다.

### WORLD IS NAVIGATION

Portfolio World는 About / Skills / Projects / Contact를 탐색하는 Visual
Navigation Hub입니다.

### DUAL NAVIGATION

World Interaction과 일반 HTML Navigation을 함께 제공합니다.

### GUIDED, NOT LOCKED

추천 Journey는 제공할 수 있지만 사용자를 특정 순서에 가두지 않습니다.

### PROGRESSIVE ENHANCEMENT

Video / WebGL / 3D / Motion이 실패해도 핵심 Portfolio와 Navigation은
유지합니다.

------------------------------------------------------------------------

## Final Visual Direction

Portfolio World의 최종 방향은:

**Natural Fantasy Adventure × Minimal Portfolio UI**

세계관은 하늘, 구름, 자연, 따뜻한 석재, 고대 유적, 건축, 대기 원근,
Character와 Interaction으로 표현합니다.

UI는 판타지 장식보다 **정돈된 Layout / Typography / Hierarchy /
Usability**를 우선합니다.

> Fantasy = Environment\
> UI = Minimal / Functional

페이지별 Composition은 반복하지 않습니다.

  Page       Direction
  ---------- -------------------------------------------------
  World      Wide Landscape / Exploration
  About      Interior / 3/4 Composition / Object Interaction
  Skills     Ancient Ruin / Negative Space / Skill Orbit
  Projects   Architectural Gallery / 4 Project Stages
  Contact    Quiet Ending / Contact Action

Projects는 World Map의 Floating Island 구조를 다시 반복하지 않습니다.

------------------------------------------------------------------------

## 공통 아트 제작 기준

World / About / Skills / Projects / Contact는 형태가 명확한 회화적 2.5D
배경, 무광 중심 재질, 주요 대상에 집중한 디테일, 캐릭터와 배경의 일관된
명암을 공유하는 방향으로 제작합니다. 같은 팔레트와 재질 표현 안에서
시간대와 구도로 장소의 차이를 만듭니다. Real World는 실사 작업실 방향을 유지합니다.

이동할 바닥, 상호작용 대상, 가림 관계와 콘텐츠 영역을 먼저 설계하고,
대표 외부/실내 장면과 캐릭터 합성을 검토한 뒤 각 페이지로 확장합니다.
세부 제작 기준은 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)의 01.1을 따릅니다.
현재는 문서 반영 단계이며 새 에셋과 화면 적용을 완료한 상태는 아닙니다.

문서 간 우선순위와 페이지별 공간·이동·카메라는 해당 작업 시 판단합니다.
이 문서의 Skills Ancient Ruin / Skill Orbit 표기는 작업 시 검토할
방향이며 자동으로 최우선 확정안으로 적용하지 않습니다.

## Typography

Portfolio World는 **2-Font System**을 사용합니다.

### Marcellus

Fantasy Display 전용.

사용 예: - World / Chapter Title - ABOUT / SKILLS / PROJECTS / CONTACT
같은 Page Display Title

### SUIT

실제 UI와 콘텐츠 전체.

사용: - Korean - Large English Hero Copy - Navigation - Button / Label -
Project / Skill Name - Body / Description - Metadata / Number - Control
Guide - Case Study

제3 Font를 임의로 추가하지 않습니다.

상세 Type Scale, Weight, Line Height, Tracking, Responsive `clamp()`는
`DESIGN_SYSTEM.md`를 기준으로 합니다.

------------------------------------------------------------------------

## Color Direction

Portfolio World는 밝고 자연적인 Fantasy Palette를 공유합니다.

핵심 계열: - Clear Sky Blue - Cloud / Warm Ivory - Warm Stone / Sand -
Natural Grass / Sage Green - Deep Natural Green - Neutral Ink -
Interaction Blue - restrained Warm Accent

페이지마다 별도 Color System을 만들기보다 같은 Palette 안에서 Lighting과
시간대로 차이를 만듭니다.

-   World → Clear Morning
-   About → Warm Afternoon
-   Skills → Clear Day / Ancient Ruins
-   Projects → Late Afternoon
-   Contact → Golden Hour

임의 HEX 추가는 하지 않습니다. 정확한 Token은
`DESIGN_SYSTEM.md`를 따릅니다.

------------------------------------------------------------------------

## AI Visual Cleanup

AI/Astra/Higgsfield는 **Asset 제작 도구**로 사용합니다.

Layout / Typography / UI / Interaction은 Design System과 실제 코드가
결정합니다.

새 디자인에서 피하는 패턴: - Text Shadow / Text Glow - Double Border -
의미 없는 두 줄 장식선 - 반복적인 Corner Ornament - 빈 공간을 채우기
위한 감성 영어 카피 - 모든 Hover의 Scale + Glow + Particle - 모든
Object의 상시 Glow - 모든 페이지의 동일한 중앙 후면 Character 구도 -
모든 페이지의 Floating Island 반복 - 과도한 소품 밀도 - AI Environment
이미지 안의 실제 Navigation / Button / 설명 Text - AI Object 안에 Brand
Logo를 억지로 합성하는 방식

Background/Environment Asset은 기본적으로 **text-free**로 제작하고 실제
UI/Text는 React + HTML/CSS로 구현합니다.

------------------------------------------------------------------------

## Real World

Real World는 Portfolio World에 들어가기 전 현실의 작업자를 보여주는
Cinematic Scene입니다.

핵심 방향: - Seoul Night Workspace - Photorealistic / Cinematic - Warm
Desk Light × Cool City / Monitor Light - Designer/Developer Workspace -
Character - Real World 범위의 Maltipom 연출 - Hero Copy Safe Area -
`ENTER WORLD`

Portfolio World에는 Pet/Companion/NPC를 임의로 추가하지 않습니다.

------------------------------------------------------------------------

## Skills

Skills는 Tool 개수보다 **무엇을 할 수 있고 실제 어디에 사용했는지**를
보여주는 것이 목적입니다.

최종 Visual Direction: **Ancient Ruin / Negative Space / Skill Orbit**

Skill Orbit은 단순 장식이 아니라 Interaction State를 표현합니다.

``` text
Idle
→ Slow Orbit

Near / Focus
→ Target Emphasis

Selected
→ Orbit Pause / De-emphasis
→ Selected Skill Focus

Exit
→ Return to Orbit
```

Skill Level / XP / HP / Score / 근거 없는 숙련도 %는 사용하지 않습니다.

실제 Skill Logo가 필요하면 AI Object 안에 억지로 생성하지 않고 SVG/HTML
Asset으로 분리합니다.

------------------------------------------------------------------------

## Projects

핵심 프로젝트는 4개입니다.

Projects는 World Map의 섬 구조를 반복하지 않습니다.

최종 방향:

**Architectural Gallery / Project Archive / 4 Project Stages**

각 Project에서 빠르게 확인할 정보: - Project Name - Category - Role -
Key Visual / Thumbnail - One-line Summary - View Case Study

Fantasy Environment보다 **실제 Project 결과물과 정보가 주인공**입니다.

Case Study는 READ MODE로 전환해 Motion을 줄이고 실제 Problem / Role /
Decision / Implementation / Result / Limitation을 중심으로 구성합니다.

------------------------------------------------------------------------

## About

About은 Profile / Role / Background / Work Direction / Values를
전달합니다.

최종 방향:

**Warm Interior / 3/4 Composition / Personal Space / Object
Interaction**

항상 열려 있는 Floating Information Card를 여러 개 배치하기보다 의미
있는 Object에 Interaction을 연결합니다.

탐험이 번거로운 사용자를 위해 핵심 정보를 빠르게 볼 수 있는
Direct/Overview 접근을 병행할 수 있습니다.

------------------------------------------------------------------------

## Contact

Contact는 Journey의 마지막 공간이면서 실제 연락 행동을 위한
페이지입니다.

최종 방향:

**Quiet Ending / Destination / Contact Action**

Email / GitHub / Resume / 필요한 외부 링크를 즉시 사용할 수 있어야 하며
Character나 Cinematic 진행을 요구하지 않습니다.

Q&A 콘텐츠도 삭제하지 않고 이 영역 또는 호환 Route에서 접근 가능하게
유지합니다.

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

Primary: - Desktop: `1440×810` - Mobile: `430×932`

Required QA: `2560×1440`, `1920×1080`, `1440×810`, `1366×768`,
`1180×820`, `1024×768`, `768×1024`, `430×932`, `402×874`, `390×844`,
`360×800`.

Boundary QA: `767/768`, `1023/1024`, `1279/1280`, `1919/1920`.

핵심 원칙: - Desktop을 단순 축소해 Mobile로 만들지 않습니다. - **Content
Parity + Interaction Parity \> Visual Parity** - Background focal point
/ crop을 viewport별로 검증합니다. - Mobile에서 Desktop WASD를 그대로
강제하지 않습니다. - Tap / Direct Selection / Bottom Sheet / Drawer
등으로 Interaction을 재구성할 수 있습니다. - Safe Area와 `dvh/svh`를
고려합니다. - Landscape / Orientation Change / Short Viewport를
검증합니다. - 200% Zoom에서도 핵심 콘텐츠와 Navigation을 유지합니다. -
Hover에는 Keyboard / Touch 대체 경로가 있어야 합니다.

------------------------------------------------------------------------

## Accessibility & Fallback

지원: - Semantic HTML - Keyboard Navigation - `focus-visible` - Button /
Link semantics - Touch Target 약 44×44px 이상 - 충분한 Contrast -
Color-only State 금지 - meaningful Alt - `prefers-reduced-motion` - Skip
Cinematic - Direct Content Access - 200% Zoom

Fallback:

``` text
Video Failure      → Poster / Static
WebGL Failure      → Static World + HTML Navigation
Character Failure  → Static Character
Image Failure      → Fallback + Alt
Transition Failure → Immediate Route
Loading Failure    → Skip / Direct Access
```

Asset 실패가 Project / Contact / Navigation 접근을 막으면 안 됩니다.

------------------------------------------------------------------------

## Tech Stack

Core: - React - Vite - JavaScript / JSX - CSS - React Router - Git /
GitHub

Design / Creative: - Figma - Photoshop - Illustrator - Higgsfield

As Needed: - Three.js - GSAP - Blender - Astra - AI Creative Tools

Library는 실제 `package.json`과 구현 요구를 확인한 뒤 사용합니다.

------------------------------------------------------------------------

## Project Structure

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

실제 현재 Route/Folder 상태는 `PROJECT_CONTEXT.md`와
Repository Audit을 기준으로 확인합니다.

------------------------------------------------------------------------

## Asset Structure

Target:

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

Naming: lowercase / kebab-case / English / no spaces.

Recommended: Image WebP/AVIF / Video WebM(+MP4 fallback) / 3D GLB / Icon
SVG / Font WOFF2.

------------------------------------------------------------------------

## Documentation

-   `Personal-Portfolio_PRD_V4_FINAL.md` → Product / IA / Content /
    Requirements
-   `DESIGN_SYSTEM.md` → Layout / Hierarchy / Typography /
    Color / Responsive
-   `AGENTS.md` → AI Agent common rules
-   `CLAUDE.md` → Claude Code rules
-   `PROJECT_CONTEXT.md` → current implementation / QA /
    known conflicts
-   `.agents/skills/design-to-react/SKILL.md` → repeated implementation
    workflow
-   `README.md` → public project overview

------------------------------------------------------------------------

## Development

``` bash
npm install
npm run dev
npm run lint
npm run build
```

실제 `package.json`에 존재하는 script를 기준으로 실행합니다.

------------------------------------------------------------------------

## Validation

최종 결과는 다음을 확인합니다.

-   First Impression: 이름/직무/핵심 강점이 빠르게 보이는가?
-   Hierarchy: 무엇을 먼저 봐야 하는지 명확한가?
-   Navigation: 게임/3D 없이 핵심 콘텐츠 접근이 가능한가?
-   Projects: 4개 실제 프로젝트와 역할/결정을 이해할 수 있는가?
-   Interaction: Hover/Focus/Touch/Keyboard가 명확한가?
-   Responsive: Desktop/Tablet/Mobile에서 정보와 Interaction parity가
    유지되는가?
-   Recovery: Skip/Back/Reload/Direct URL이 정상인가?
-   Accessibility: Reduced Motion/Keyboard/200% Zoom에서도 접근
    가능한가?
-   AI Cleanup: 불필요한 Shadow/Glow/Double Border/장식 카피가 다시
    생기지 않았는가?
-   Asset Failure: 고급 Asset 실패 후에도 다음 행동이 가능한가?

------------------------------------------------------------------------

## Repository

GitHub Repository: `https://github.com/xok2206-png/Personal-Portfolio`

------------------------------------------------------------------------

## License

This repository is a personal portfolio project.

Third-party fonts, visual references, generated assets, libraries, and
external tools may have their own licenses and terms. Review them before
final public deployment.
