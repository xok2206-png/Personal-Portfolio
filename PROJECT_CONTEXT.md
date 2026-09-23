# Personal Portfolio --- PROJECT_CONTEXT FINAL

> **Purpose:** 현재 실제 프로젝트 상태, 구조, Route, Asset, 문서 기준,
> 검증 상태를 기록한다.\
> **Rule:** 계획된 기능을 구현 완료로 기록하지 않는다.\
> **Product requirements:** `Personal-Portfolio_PRD_FINAL.md`\
> **Visual/UI requirements:** `DESIGN_SYSTEM.md`\
> **Last baseline update:** 2026-09-23

## 01. Project Overview

-   Project: Personal Portfolio
-   Purpose: 취업용 Interactive Personal Portfolio
-   Platform: Responsive Web
-   Framework: React
-   Build Tool: Vite
-   Language: JavaScript / JSX
-   Styling: CSS
-   Routing: React Router
-   Version Control: Git / GitHub
-   Current concept: **Cinematic Interactive Personal Portfolio**
-   Primary desktop reference: **1440×810**
-   Primary mobile reference: **430×932**

핵심 목표는 디자인 의도를 이해하고 인터랙션·반응형·접근성·프론트엔드
구현을 실제 웹 경험으로 연결할 수 있는 역량을 포트폴리오 자체로 증명하는
것이다.

------------------------------------------------------------------------

## 02. Source of Truth

  -------------------------------------------------------------------------------
  Document                                    Responsibility
  ------------------------------------------- -----------------------------------
  `Personal-Portfolio_PRD_FINAL.md`           제품 목적, 콘텐츠, 사용자 경험,
                                              기능 요구사항, 완료 조건

  `DESIGN_SYSTEM.md`                          Typography, Color, Spacing, Radius,
                                              Grid, Responsive, Component, Motion
                                              원칙

  `PROJECT_CONTEXT.md`                        현재 실제 코드/Route/Asset/검증
                                              상태

  `AGENTS.md`                                 AI Coding Agent 공통 규칙

  `CLAUDE.md`                                 Claude Code 추가 규칙

  `.agents/skills/design-to-react/SKILL.md`   반복 구현 Workflow

  `README.md`                                 외부 공개용 프로젝트 설명
  -------------------------------------------------------------------------------

충돌 시 실제 구현 상태가 필요한 문제는 코드를 먼저 확인한다. 무엇을
만들지는 PRD, 어떻게 보여줄지는 Design System, 구현 절차는
AGENTS/CLAUDE/SKILL을 따른다.

------------------------------------------------------------------------

## 03. Decision Status

### LOCKED

-   Portfolio First
-   Real World의 현재 방향
-   Real World → Portal → Tool Universe → Arrival → Portfolio World의 큰
    진입 흐름
-   Portfolio Core Content: About / Skills / Projects×4 / Q&A / Contact
    / Resume
-   게임/3D 없이 핵심 콘텐츠 접근 가능
-   Responsive / Accessibility / Fallback
-   React + Vite / React Router
-   Case Study는 정보 전달과 읽기가 우선

### WORKING / NOT LOCKED

Real World 이후 콘텐츠의 **세부 디자인과 이동 방식은 아직 확정하지
않는다.**

확정 구현으로 간주하지 않을 항목: - Portfolio World Character 실제 이동
여부 - About 공간 구성 - Skills 최종 디자인 및 Toolkit/Game Item 표현 -
Projects 최종 공간 디자인 - Project Archive/Gallery 채택 여부 - Project
선택 시 Character 이동 여부 - Point-based Movement - Q&A / Contact 공간
연출 - 각 콘텐츠 Camera / Transition - Ending 세부 연출

AI Agent는 WORKING 항목을 임의로 LOCKED로 승격하지 않는다.

------------------------------------------------------------------------

## 04. Real World --- Direction Locked / Implementation Pending

현재 가장 먼저 완성할 Scene.

확정 방향: - Seoul night workspace - Photorealistic / Cinematic - Warm
desk light × cool city/monitor light - iMac / 작업 공간 - Character -
black-and-tan Maltipom - white chiffon curtain - Hero copy 안전 영역 -
`ENTER WORLD` - Portal Cyan은 Default UI가 아니라 Portal 이상현상 이후
등장

큰 흐름:
`REAL WORLD → Portal Awakening → Portal Open → Suction → Tool Universe → Transformation → Fall/Arrival → Portfolio World`.

세부 Motion timing, Higgsfield clip 분할, Camera 수치는 Working이다. 위
내용은 기획 확정 상태이며 전체 Cinematic이 코드 구현 완료되었다는 의미가
아니다.

------------------------------------------------------------------------

## 05. Current Repository Structure

최근 제공된 Context 기준:

``` text
Personal-Portfolio/
├─ .agents/skills/design-to-react/SKILL.md
├─ AGENTS.md
├─ CLAUDE.md
├─ PROJECT_CONTEXT.md
├─ Personal-Portfolio_PRD.md        (⚠ 문서가 참조하는 _FINAL.md 아님, 15번 참고)
├─ DESIGN_SYSTEM.md
├─ README.md
├─ package.json
├─ vite.config.js
├─ public/assets/
│  ├─ backgrounds/         (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  ├─ characters/          (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  ├─ icons/                (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  └─ production/          (2026-09-23 3차 정리에서 신설 — 실제 Asset이 있는 Category만 생성)
│     ├─ images/real-world/
│     │  ├─ main.png           (RealWorld 배경, 사용 중)
│     │  └─ main-title.png     (RealWorld 타이틀 이미지, 사용 중)
│     └─ fonts/
│        ├─ pretendard-variable.woff2   (파일 존재, @font-face 미선언 — 미연결)
│        ├─ fredoka-variable.ttf        (RealWorld.css에서 실제 사용 중)
│        ├─ silkscreen-regular.ttf      (미사용)
│        ├─ silkscreen-bold.ttf         (미사용)
│        ├─ retromario-regular.otf      (미사용)
│        └─ supermario256.ttf           (미사용)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ app/router.jsx
   ├─ scenes/
   │  ├─ RealWorld/        (route "/")
   │  ├─ Character/        (route "/character" — RealWorld의 START GAME 버튼에서 연결, 내부 Link는 /world-map으로 직접 연결)
   │  ├─ PortfolioWorld/   (route "/world-map" — 2026-09-23 WorldMap에서 rename, Character에서 연결, About/Skills/Projects/QA/Contact로 가는 실제 Nav Hub)
   │  └─ Ending/           (route "/ending" — router에는 등록되어 있으나 앱 내 어디서도 Link 없음, Direct URL만 가능, 사용자 결정으로 KEEP)
   └─ pages/
      ├─ About/
      ├─ Skills/
      ├─ Projects/
      ├─ ProjectDetail/
      ├─ QA/
      ├─ Contact/
      └─ QuickView/         (route "/quick-view" — router 등록, Link 없음. SKILL.md의 LOCKED "Quick View"와의 연관 모호, 사용자 결정으로 KEEP)
```

**2026-09-23 구조 정리 1차 (Audit 결과 실행):** `scenes/Mission`, `scenes/StageClear`,
`scenes/QAWorld`, `scenes/ProjectEntry`는 `router.jsx`에도 등록되어 있지 않고
어떤 Link/Import에서도 참조되지 않는 완전한 고아 Placeholder였음을 확인하고
제거했다 (git 이력으로 복구 가능).

**2026-09-23 구조 정리 2차:**
- `scenes/PowerUp/`은 사용자가 세션 중 `PowerUp.jsx`를 직접 삭제한 상태였고,
  Import/Route/Link 참조를 전수 확인한 뒤(참조: `router.jsx`의 import+Route,
  `Character.jsx`의 `Link to="/power-up"` 두 곳뿐, CSS/Asset 없음) 나머지
  참조를 정리해 완전히 제거했다. `router.jsx`에서 `/power-up` Route와 import를
  삭제하고, `Character.jsx`의 Link를 `/world-map`으로 직접 연결해 Navigation
  체인이 끊기지 않도록 했다 (`RealWorld → Character → PortfolioWorld`).
- `scenes/WorldMap/` → `scenes/PortfolioWorld/`로 폴더/파일/컴포넌트명을
  rename했다 (`WorldMap.jsx` → `PortfolioWorld.jsx`, 함수명 `WorldMap` →
  `PortfolioWorld`). PRD 권장대로 **Route URL `/world-map`은 그대로 유지**했다
  (Route URL과 Component 이름은 동일할 필요 없음).
- `Ending`, `QuickView`는 참조가 0건으로 확인되었으나(Ending: Removed Scope와
  내용 겹침, QuickView: SKILL.md LOCKED 문구와의 연관 모호) 사용자에게 직접
  확인한 결과 **둘 다 KEEP FOR NOW**로 결정되어 삭제하지 않았다.

**2026-09-23 구조 정리 3차:**
- `public/assets/images/`, `public/assets/fonts/`(flat)를 목표 구조
  `public/assets/production/images/<scene>/`, `production/fonts/`로 이동했다
  (사용자 승인). 실제 Asset이 있는 Category(이미지 2개→`real-world/`, 폰트
  6개)만 생성했고, `source/`나 아직 파일이 없는 `production/video`,
  `production/models`, `production/icons`, `production/audio`는 생성하지
  않았다. 참조 3곳(`RealWorld.css` background, `RealWorld.jsx` img src,
  `index.css` Fredoka `@font-face`)을 함께 갱신하고 `npm run build`로 `dist`
  결과물에 새 경로가 정상 반영됨을 확인했다. 기존 flat `images/`, `fonts/`
  폴더(placeholder `.gitkeep` 포함)는 내용이 모두 이동해 제거했다.
- **Contact + Final Experience 확정 사항 기록:** 사용자가 이번 라운드에서
  Contact의 역할을 "단순 연락처"에서 "CONTACT + FINAL EXPERIENCE + CREDITS"로
  확정했다고 전달했다. IA: Intro/Contact Message → Contact Links(Email/
  GitHub/Resume/Optional) → Final Message → Credits/Staff Roll Concept →
  Back to Portfolio World. `/contact`는 항상 Direct Access 가능해야 하며
  Project 완료나 Game Clear로 잠그지 않는다. **이번 라운드에서는 이 IA를
  기록만 했고 실제 Contact 구현/디자인은 변경하지 않았다** (`pages/Contact/`는
  여전히 최소 Placeholder). `scenes/Ending/`은 위 IA와 개념이 겹치지만 실제로
  재사용 가능한 고유 Content/Data는 없음을 확인했다(`Ending.jsx`는 `pages/
  Contact`를 그대로 import해 감싸고 "GAME CLEAR / STAFF ROLL" 헤딩만 추가하는
  구조). Ending은 사용자 결정대로 KEEP FOR NOW 유지.

`scenes/`는 Cinematic/World/Character/Transition 중심, `pages/`는 실제
Portfolio Information 중심으로 사용한다. Scene과 Page를 무조건 1:1로
만들지 않는다.

------------------------------------------------------------------------

## 06. Current Routes

2026-09-23 구조 정리 2차 후 `src/app/router.jsx` 실제 상태:

``` text
/                     → RealWorld
/character            → Character            (Legacy 이름, 실제 Nav 경로로 사용 중 — KEEP)
/world-map            → PortfolioWorld        (2026-09-23 WorldMap에서 rename, URL은 유지)
/projects             → Projects
/projects/:projectId  → ProjectDetail
/about                → About
/skills               → Skills
/qa                   → QA
/contact               → Contact
/quick-view            → QuickView             (참조 0건이지만 사용자 결정으로 KEEP)
/ending               → Ending                 (참조 0건이지만 사용자 결정으로 KEEP)
```

`/power-up`은 2026-09-23 실제 참조(router import+Route, `Character.jsx`의
Link 1곳)를 모두 확인한 뒤 제거했다. `Character.jsx`의 Link는 `/world-map`으로
직접 연결해 Navigation 체인(`RealWorld → Character → PortfolioWorld →
About/Skills/Projects/QA/Contact`)이 끊기지 않도록 했다.

`/character`는 이름은 Legacy Concept과 겹치지만 `RealWorld.jsx`의 실제
Link 대상이라 삭제하지 않았다. `/ending`, `/quick-view`는 참조가 없지만
사용자가 직접 KEEP으로 결정했다.

PRD의 현재 권장 정보 Route: `/`, `/about`, `/skills`, `/world-map`,
`/projects`, `/projects/:projectId`, `/qa`, `/contact`. 실제 Route는 이
권장안에 `/character`, `/ending`, `/quick-view`가 추가로 남아 있는 상태다.

기존 Route를 문서만 보고 즉시 삭제하지 않는다.

------------------------------------------------------------------------

## 07. Fonts

2026-09-23 실제 코드 검색 결과:

  Font                    File                                                    실제 사용                              Classification
  ------------------------ ------------------------------------------------------- --------------------------------------- ----------------
  Fredoka                  `fredoka-variable.ttf`                                  `index.css` @font-face + `RealWorld.css` `font-family` 실사용   KEEP (Legacy 지정이지만 RealWorld에서 현재 활성 사용 중)
  Pretendard Variable      `pretendard-variable.woff2`                             파일만 존재, `@font-face` 선언 없음, 어디서도 미적용            미연결 — Design System Primary 적용 필요 시 `@font-face` 추가 필요
  Instrument Serif         없음                                                     Repository에 Font 파일 자체가 없음                              Asset 없음 — 임의 다운로드하지 않음, 필요 시 별도 확보
  Silkscreen (Regular/Bold) `silkscreen-regular.ttf`, `silkscreen-bold.ttf`         `@font-face`/`font-family` 참조 전혀 없음                        UNUSED / REMOVE CANDIDATE
  RetroMario               `retromario-regular.otf`                                참조 없음                                                        UNUSED / REMOVE CANDIDATE
  SuperMario256            `supermario256.ttf`                                     참조 없음                                                        UNUSED / REMOVE CANDIDATE

Fredoka는 Legacy Font로 지정되어 있지만 `RealWorld.css`가 실제로
`font-family: 'Fredoka'`를 사용 중이라 지금 삭제하면 RealWorld 화면이
깨진다. RealWorld 디자인이 확정/구현되기 전까지는 KEEP.

Silkscreen/RetroMario/SuperMario256은 코드 어디에서도 참조가 없어
REMOVE CANDIDATE로 분류했으나, 이번 구조 정리 작업에서는 실제로
삭제하지 않고 상태만 기록했다(사용자 확인 필요).

------------------------------------------------------------------------

## 08. Asset State & Target Architecture

2026-09-23 3차 구조 정리에서 실제 파일 시스템 기준으로 재확인 및 이동 완료.

현재 실제 구조:

``` text
public/assets/
├─ backgrounds/                 (.gitkeep만, 실제 Asset 없음)
├─ characters/                  (.gitkeep만, 실제 Asset 없음)
├─ icons/                       (.gitkeep만, 실제 Asset 없음)
└─ production/
   ├─ images/real-world/
   │  ├─ main.png                (RealWorld.css 배경으로 사용 중)
   │  └─ main-title.png          (RealWorld.jsx 타이틀 이미지로 사용 중)
   └─ fonts/
      ├─ pretendard-variable.woff2   (미연결)
      ├─ fredoka-variable.ttf        (사용 중)
      ├─ silkscreen-regular.ttf      (미사용)
      ├─ silkscreen-bold.ttf         (미사용)
      ├─ retromario-regular.otf      (미사용)
      └─ supermario256.ttf           (미사용)
```

목표(최종) Asset 구조:

``` text
public/assets/
├─ source/
│  ├─ original/
│  ├─ higgsfield/
│  ├─ astra/
│  └─ blender/
└─ production/
   ├─ images/
   │  ├─ real-world/      ← 구현 완료 (2026-09-23)
   │  ├─ portal/
   │  ├─ portfolio-world/
   │  ├─ skills/
   │  ├─ projects/
   │  ├─ contact/
   │  └─ common/
   ├─ video/
   ├─ models/
   ├─ icons/
   ├─ audio/
   └─ fonts/              ← 구현 완료 (2026-09-23)
```

`source/`와 아직 실제 Asset이 없는 `production/video`, `production/models`,
`production/icons`, `production/audio`, 그리고 `images/`의 나머지 scene별
하위 폴더(portal, portfolio-world, skills, projects, contact, common)는
실제 Asset이 생기기 전까지 생성하지 않는다.

Naming: lowercase / kebab-case / English / no spaces.\
Image WebP/AVIF, Video WebM(+필요 시 MP4), 3D GLB, Icon SVG, Font WOFF2
우선. 기존 `main.png`/`main-title.png`/폰트 파일들은 아직 PNG/TTF/OTF
원본 형식 그대로이며, 이번 작업에서는 위치만 이동했고 포맷 변환/재압축은
하지 않았다(Real World 디자인이 확정되지 않아 재작업 범위 밖).

------------------------------------------------------------------------

## 09. Implementation Status

### Confirmed Foundation

-   React + Vite 프로젝트
-   Git / GitHub 연결
-   React Router 구조
-   `src/scenes/`, `src/pages/`, `src/app/router.jsx`
-   About / Skills / Projects / QA / Contact Page 골격
-   ProjectDetail Page 골격
-   기존 Font/Image Asset 일부

### Documentation / Planning Confirmed

-   PRD 현재 방향 재정리
-   Design System 최신 방향 정리
-   Responsive Architecture 상세화
-   Real World 방향 확정

### NOT IMPLEMENTATION COMPLETE

Real World 최종 화면, Portal Awakening/Open/Suction, Tool Universe,
Transformation, Arrival, Portfolio World 최종 디자인,
About/Skills/Projects 최종 디자인, Character Movement, Project Archive,
Case Study 최종 콘텐츠, Q&A/Contact 최종 디자인, Responsive 전체 QA,
Reduced Motion, Asset Failure Fallback, Performance Optimization.

기획이 존재한다는 이유로 구현 완료라고 기록하지 않는다.

------------------------------------------------------------------------

## 10. Legacy Concepts --- Do Not Restore Automatically

현재 제거되었거나 더 이상 확정 요구사항이 아닌 항목: - POWER UP
Gameplay - Skill Block / Item Pickup Loop - Skill Acquired Progress -
Skill Level / XP / HP / Life / Score - 의미 없는 Achievement - Secret
Area - Companion System - Player Badge - Portfolio World WASD 자유
이동 - 필수 Jump / Collision - Stage Clear 중심 Journey - Mission
Gameplay - Game Clear 중심 Ending - Adventure Book을 필수 Portfolio OS로
만드는 구조

Legacy Folder/Route/Code가 남아 있어도 자동 복원하지 않는다.

------------------------------------------------------------------------

## 11. Responsive Baseline

``` text
Wide              ≥1920
Desktop           1280–1919
Compact Desktop   1024–1279
Tablet            768–1023
Mobile            <768
```

Primary: Desktop `1440×810`, Mobile `430×932`.

QA: `2560×1440`, `1920×1080`, `1440×810`, `1366×768`, `1180×820`,
`1024×768`, `768×1024`, `430×932`, `402×874`, `390×844`, `360×800`.

Boundary: `767/768`, `1023/1024`, `1279/1280`, `1919/1920`.

이 Matrix는 요구사항이며 실제 전체 검증 완료를 의미하지 않는다. Real
World 외 세부 Responsive Composition은 각 화면 디자인 확정 후
구현/검증한다.

------------------------------------------------------------------------

## 12. Accessibility / Fallback Baseline

요구사항: Semantic HTML, Keyboard Navigation, focus-visible, 약 44×44px
이상 Touch Target, 충분한 Contrast, Color-only State 금지, Alt Text,
Reduced Motion, Skip Cinematic, Direct Content Access, 200% Zoom,
Video/Three.js/Character/Transition fallback.

현재 전체 기능의 실제 구현 여부는 Browser QA 전까지 완료로 기록하지
않는다.

------------------------------------------------------------------------

## 13. Creative / Technical Tool Direction

React/CSS: Portfolio Content, UI, Navigation, Responsive Layout,
Accessibility, State, Simple Interaction.

Three.js 후보: Portfolio World, Camera, 3D Environment, Waterfall/World
Object, Character/Model, Atmospheric FX. 적용 범위는 화면 디자인 확정 후
결정.

Higgsfield 후보: Real World Cinematic, Portal, Complex Character Motion,
Suction, Cinematic Transition, Video FX source.

Astra/Blender: Asset/3D 제작 Workflow에 활용 가능하며 실제 범위는 제작
단계에서 결정.

**Motion Ownership:** 하나의 움직임은 하나의 시스템이 소유한다. 예:
UI→CSS/GSAP, World Camera→Three.js, Complex Cinema→Higgsfield, 3D
Asset→Blender/Astra workflow.

------------------------------------------------------------------------

## 14. Current Development Priority

``` text
1. Documentation baseline
2. Real World
3. Portal transition
4. Tool Universe / Transformation
5. Arrival
6. Portfolio World
7. Remaining content
8. Responsive / Accessibility / Performance QA
```

Immediate Focus는 **Real World 완성**.

권장 순서:
`Real World Desktop Default → Hero/Navigation → Background/Media → Ambient → ENTER WORLD → Focus/DOF → Portal Awakening → Portal Video → Reduced Motion/Skip → Desktop QA → Tablet/Mobile`.

About / Skills / Projects 등의 세부 이동과 디자인은 아직 확정하지
않는다.

------------------------------------------------------------------------

## 15. Known Issues / Audit Required

**2026-09-23 구조 Audit로 해소된 항목:**
- `Mission/`, `StageClear/`, `QAWorld/`, `ProjectEntry/` → 참조 없음 확인 후 제거.
- `main title.png` → `main-title.png`로 rename, `RealWorld.jsx` 참조 갱신.
- `PowerUp/` → 참조(router import+Route, `Character.jsx` Link 1곳) 전수 확인
  후 제거. `Character.jsx` Link를 `/world-map`으로 직접 연결.
- `WorldMap/` → `PortfolioWorld/`로 rename (Route URL `/world-map`은 유지).
- `/ending`, `/quick-view` 유지 여부를 사용자에게 직접 확인 → 둘 다 KEEP.
- Font 실제 사용처 확인 (07번 참고).
- `git status` / lint / build 확인 완료 (16번 참고).

**여전히 확인/결정이 필요한 항목:**
- **문서 불일치:** `AGENTS.md`/`CLAUDE.md`/`SKILL.md`가 Source of Truth로
  지정한 `Personal-Portfolio_PRD_FINAL.md`가 Repository에 존재하지 않는다.
  실제 파일은 `Personal-Portfolio_PRD.md`("PRD v3", untracked)다. 파일명을
  맞출지 문서 참조를 고칠지는 제품 문서 결정이라 이번 구조 정리에서
  임의로 처리하지 않았다.
- **RealWorld 실제 구현 vs 문서 방향 불일치:** `RealWorld.jsx`는 현재
  Seoul Night Workspace/ENTER WORLD가 아니라 "WELCOME TO ... START GAME"
  형태의 이전 게임 컨셉으로 구현되어 있고, `Character`→`PortfolioWorld`
  체인이 About/Skills/Projects/QA/Contact로 가는 유일한 인앱 Navigation
  경로다. 문서상 LOCKED된 Real World 방향과 실제 코드가 다르지만, 이번
  작업 범위(구조 정리, 디자인/콘텐츠 변경 금지)상 수정하지 않았다.
- **`/ending` 라우트:** `router.jsx`에 등록되어 있으나 앱 내 어디에서도
  Link로 연결되지 않는다(Direct URL로만 접근 가능). 내용은 "GAME CLEAR /
  STAFF ROLL"로 PRD의 Removed Scope("Game Clear 중심 Ending")와 겹치지만,
  사용자가 2026-09-23에 KEEP FOR NOW로 명시적으로 결정했다.
- **`/quick-view` 라우트:** 등록되어 있으나 Link 없음. `SKILL.md`의 LOCKED
  "Quick View"가 이 특정 파일을 가리키는지 PRD의 일반 Direct Access 개념을
  가리키는지 문서상 모호하며, 사용자가 2026-09-23에 KEEP FOR NOW로
  결정했다.
- **Pretendard Variable:** 파일은 존재하지만 `@font-face` 선언이 없어
  실제로 로드되지 않는다. Real World 외 화면 구현 시 연결이 필요하다.
- **Instrument Serif:** Font Asset이 Repository에 없다. 임의로 다운로드
  하지 않았다.
- **Silkscreen/RetroMario/SuperMario256:** 코드 참조 없음(REMOVE
  CANDIDATE). 이번 작업에서는 삭제하지 않고 상태만 기록했다.
- **Asset 목표 구조(source/production) 미적용:** 현재 `public/assets/`는
  flat 구조(`images/`, `fonts/` 등)다. `source/production` 분리는 실제
  Asset 종류가 늘어나고 Real World 구현이 본격화될 때 이동 범위를 다시
  판단해 진행한다.

확인 전에는 삭제/완료로 기록하지 않는다.

------------------------------------------------------------------------

## 16. Git / Verification State

과거 Context의 Commit/Clean Working Tree 기록은 현재 상태로 간주하지
않는다.

작업 시작:

``` bash
git status
git branch --show-current
```

검증 후:

``` bash
npm run lint
npm run build
```

실제 실행하지 않았다면 통과했다고 기록하지 않는다.

**2026-09-23 구조 정리 1차 실제 검증 결과:**
- `npm run lint` → 에러 없음 (변경 전/후 모두 통과)
- `npm run build` → 성공 (`vite build`, 38 modules transformed, 에러 없음)

**2026-09-23 구조 정리 2차(PowerUp 제거 + WorldMap→PortfolioWorld rename) 실제 검증 결과:**
- `npm run lint` → 에러 없음
- `npm run build` → 성공 (`vite build`, 37 modules transformed, 에러 없음)

**2026-09-23 구조 정리 3차(Asset production/ 이동) 실제 검증 결과:**
- `npm run lint` → 에러 없음
- `npm run build` → 성공 (`vite build`, 37 modules transformed, 에러 없음)
- `dist/assets/production/images/real-world/`, `dist/assets/production/fonts/`
  경로에 이동된 8개 파일이 정상적으로 빌드 결과물에 포함됨을 `find`로 확인
- 코드 전체에서 구 경로(`/assets/images/`, `/assets/fonts/`) 잔존 참조 0건
  확인 (Grep)
- `npm run dev` / Browser 수동 확인(Direct URL, Refresh, Back/Forward, 실제
  이미지·폰트 렌더링)은 이번 작업에서 실행하지 않았다 (미검증).

------------------------------------------------------------------------

## 17. Next Work

Documentation: 1. `PROJECT_CONTEXT.md` 갱신 2. `AGENTS.md` 3.
`CLAUDE.md` 4. `SKILL.md` 5. `README.md`

Implementation은 문서 정리 후 Real World부터 진행한다. Legacy
Folder/Route 정리는 실제 코드 Audit 후 별도 작업으로 진행한다.

------------------------------------------------------------------------

## 18. PROJECT_CONTEXT Update Rule

이 파일은 **현재 실제 상태만 기록**한다.

기록: 실제 Repository 구조, Route, 설치 Library, Asset 상태, 완료 기능,
구현 중 기능, 알려진 문제, 중요한 확정 Decision, 실제 검증 결과.

기록하지 않음: 계획만 존재하는 기능을 완료로 표현, WORKING 디자인을
확정으로 표현, 추측, 실행하지 않은 QA, 존재 여부를 확인하지 않은
Asset/Library.

Route, Scene architecture, Asset strategy, 주요 구현 상태, 중요한
Decision, 검증 상태가 바뀔 때 갱신한다. 사소한 CSS/Spacing 수정마다
업데이트하지 않는다.
