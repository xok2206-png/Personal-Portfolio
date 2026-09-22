# Personal Portfolio — PROJECT_CONTEXT.md

> 이 문서는 **현재 실제 프로젝트 상태만 기록**한다.  
> 계획된 기능을 구현 완료로 기록하지 않는다.  
> PRD는 “무엇을 만들지”, DESIGN_SYSTEM은 “어떻게 보여줄지”, 이 문서는 “지금 어디까지 되어 있는지”를 관리한다.

마지막 기준 업데이트: **2026-09-22**

---

## 01. 프로젝트 개요

- 프로젝트명: Personal Portfolio
- 목적: 취업용 Interactive Personal Portfolio
- Framework: React
- Build Tool: Vite
- Language: JavaScript / JSX
- Styling: CSS
- Routing: React Router
- Version Control: Git / GitHub
- 핵심 콘셉트: **Playable Interactive Portfolio**
- Primary World Reference: **1440 × 810 / 16:9**

핵심 목표:

> 디자인 의도를 이해하고, 직접 조작 가능한 반응형 웹 경험으로 구현할 수 있는 역량을 포트폴리오 자체로 증명한다.

---

## 02. 현재 확인된 프로젝트 구조

새 PRD/Design System 기준 폴더·Router 개편(Phase 2 — Structure) 완료 후 구조:

```text
Personal-Portfolio/
├─ .agents/
│  └─ skills/
│     └─ design-to-react/
│        └─ SKILL.md
├─ .gitignore
├─ AGENTS.md
├─ CLAUDE.md
├─ PROJECT_CONTEXT.md
├─ Personal-Portfolio_PRD_v2.md
├─ DESIGN_SYSTEM_v1.4.md
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ public/
│  └─ assets/
│     ├─ backgrounds/   (예비, 비어 있음)
│     ├─ characters/    (예비, 비어 있음)
│     ├─ icons/         (예비, 비어 있음)
│     ├─ images/        (main.png, main title.png)
│     └─ fonts/         (pretendard/fredoka/silkscreen×2/retromario/supermario256)
└─ src/
   ├─ main.jsx
   ├─ App.jsx        → app/router.jsx 렌더링만 담당
   ├─ index.css
   ├─ app/
   │  └─ router.jsx  (Route 정의 전체)
   ├─ scenes/
   │  ├─ RealWorld/       (구 Scene01Start, Route "/")
   │  ├─ Character/       (구 Scene02Character, Route "/character")
   │  ├─ PowerUp/         (구 Scene03PowerUp, Route "/power-up")
   │  ├─ WorldMap/        (구 Scene04WorldMap, Route "/world-map")
   │  ├─ ProjectEntry/    (구 Scene05EnterWorld, Route 미연결)
   │  ├─ Mission/         (구 Scene06Mission, Route 미연결)
   │  ├─ StageClear/      (구 Scene07StageClear, Route 미연결)
   │  ├─ Scene08NextWorld/ (신규 Scene 목록에 대응 항목 없음 — 삭제 여부 미결정, 이름 유지)
   │  ├─ QAWorld/         (구 Scene09QA, Route 미연결, pages/QA 재사용)
   │  └─ Ending/          (구 Scene10StaffRoll, Route "/ending", pages/Contact 재사용)
   └─ pages/
      ├─ About/         (Route "/about")
      ├─ Skills/        (Route "/skills")
      ├─ Projects/      (Route "/projects")
      ├─ ProjectDetail/ (신규, Route "/projects/:projectId")
      ├─ QA/            (Route "/qa")
      ├─ Contact/       (Route "/contact")
      └─ QuickView/     (신규, Route "/quick-view")
```

### 구조 원칙

- `src/scenes/`
  - 게임 연출
  - Player
  - World
  - Scene Transition

- `src/pages/`
  - 실제 Portfolio Information
  - About / Skills / Projects / Q&A / Contact

이 분리는 유지했다.

`components/`, `data/`, `hooks/`, `utils/`, `context/`, `styles/`, `src/assets/`는 이번 개편에서도 만들지 않았다.
실제로 채울 내용(공용 Component, Player Hook, Project Data 등)이 생겼을 때만 추가한다.

`src/app/`은 이번에 새로 추가했다. Route 정의를 `App.jsx`에서 분리해 `router.jsx`로 옮겼다.
Provider가 필요한 Context가 아직 없어 `providers.jsx`는 만들지 않았다.

### Scene08NextWorld — 삭제됨

새 PRD/Scene 목록에는 "NEXT WORLD"에 대응하는 항목이 없다. STAGE CLEAR의 Action(Back to World Map / Next Project / Adventure Book / Quick View)으로 흡수되었다고 보고, 사용자 확인 후 빈 골격 폴더를 삭제했다(`git rm`으로 제거, 이력은 git log에 남아 있음).

---

## 03. 현재 확인된 Route

폴더·Router 개편 후 실제 `src/app/router.jsx` 기준:

```text
/                    → RealWorld
/character           → Character
/power-up            → PowerUp
/world-map           → WorldMap

/projects            → Projects (pages)
/projects/:projectId → ProjectDetail (pages, 신규 — 실제 Project 데이터 없음, projectId만 표시)

/about               → About (pages)
/skills              → Skills (pages)
/qa                  → QA (pages)
/contact             → Contact (pages)
/quick-view          → QuickView (pages, 신규 — 빈 골격)
/ending              → Ending (scenes, pages/Contact 재사용)
```

### 아직 Route가 직접 연결되지 않은 Scene 골격

- ProjectEntry
- Mission
- StageClear

PRD 6장은 `/projects/:projectId/enter`, `/projects/:projectId/clear`를 "정말 필요할 때만" 만들라고 명시하므로, 실제 연출 구현 전인 지금은 추가하지 않았다.

QAWorld / Ending Scene은 각각 `pages/QA`, `pages/Contact` 콘텐츠를 재사용하는 구조를 유지했다(중복 Page 생성 없음). 단, Ending이 STAFF ROLL과 CONTACT를 그대로 함께 렌더링하는 것은 예전 Scene10StaffRoll 구조를 이름만 바꿔 유지한 것이며, 콘텐츠 재구성은 이번 범위가 아니다.

### 검증한 것

- `npm run lint`, `npm run build` 통과 (아래 22장 참고)
- 서버 사이드 렌더링으로 `/`, `/character`, `/power-up`, `/world-map`, `/projects`, `/about`, `/skills`, `/qa`, `/contact`, `/quick-view`, `/ending`, `/projects/abc` 응답 확인은 아직 하지 않음 — 다음 검증 시 확인 필요

### 중요

이번 작업은 **폴더/컴포넌트 이름 변경 + Route 재배선**만 수행했다.
Real World / Portal / Player / Living World 등 실제 화면 구현은 포함하지 않는다.

---

## 04. 현재 Fonts

현재 정리된 Font Asset 기준:

```text
public/assets/fonts/
├─ pretendard-variable.woff2
├─ fredoka-variable.ttf
├─ silkscreen-regular.ttf
├─ silkscreen-bold.ttf
├─ retromario-regular.otf
└─ supermario256.ttf
```

### 역할

- Pretendard → Korean / Body / Information
- Fredoka → Game Display / Scene Heading
- Silkscreen → HUD / System Feedback
- SuperMario256 → Brand Logo (확정, RetroMario는 후보 제외)

기존 Lilita One은 새 Typography System에서 제외한다.
`src/index.css`의 `@font-face`와 `RealWorld.css`의 `font-family`를 Fredoka Variable로 교체 완료(Font Roles 표의 "Game Display / Scene Heading" 기준). 다른 크기·굵기 값(Display XL 72px 등 Type Scale 전체)은 아직 적용하지 않았다 — font-family 참조만 고쳤다.

SuperMario256은 Brand Font로 확정되었지만 아직 코드에서 사용하지 않는다. 현재 `MY PORTFOLIO WORLD` 로고는 `main title.png` 이미지이며, 이 폰트로 실제 텍스트 로고를 구현하는 작업은 별도로 진행한다. `public/assets/fonts/retromario-regular.otf`는 후보 탈락 상태로 남아 있으며, 삭제 여부는 확인 후 진행한다.

---

## 05. 현재 Asset 상태

최근 Audit에서 확인된 기존 Image Asset:

- `public/assets/images/main.png`
- Scene 01 Logo Image 1개

Scene 01 Logo 파일명은 최근 실제 파일 시스템에서 다시 확인해야 한다.

기존 `backgrounds/`, `characters/`, `icons/` 등은 예비 구조가 존재했으며
실제 대규모 Asset 구조 개편은 아직 진행하지 않은 상태로 본다.

### 앞으로의 Asset 원칙

Asset Folder 구조는 MD 개편 완료 후
새 Scene / Player / Higgsfield Strategy에 맞춰 한 번에 재설계한다.

현재 단계에서 임의로 대량 이동/삭제하지 않는다.

---

## 06. 현재 구현 완료로 볼 수 있는 것

최근 Audit 기준으로 확실히 확인된 항목만 기록한다.

- React + Vite 프로젝트 구성
- Git 저장소 및 GitHub Repository 연결
- React Router 기반 기본 Route 구성
- `src/scenes/` 구조 존재
- `src/pages/` 구조 존재
- Scene 01~10 폴더 골격 존재
- About / Skills / Projects / QA / Contact Page 존재
- Font Asset 정리
- 기존 2.5D Portfolio Reference 및 초기 구현 존재

### 주의

아래는 “기획이 완료된 것”이지 “코드 구현이 완료된 것”이 아니다.

- Real World
- Portal
- Player Transformation
- Living World System
- Hybrid Player Control
- New Power Up Gameplay
- New World Map Movement
- Project Mission / World Restoration
- New Stage Clear
- Adventure Book
- Quick View
- New Ending

---

## 07. 새 기획에서 확정된 콘텐츠 구조

### Portfolio Core Content

- About
- Skills
- Projects × 4
- Q&A
- Contact
- Resume

실제 Project 콘텐츠는 임의 변경하지 않는다.

### 권장 Journey

```text
REAL WORLD
→ PORTAL
→ TOOL UNIVERSE / STYLE TRANSFORMATION
→ ARRIVAL
→ CHARACTER
→ POWER UP
→ WORLD MAP
→ PROJECT WORLD
→ PROJECT ENTRY
→ MISSION / CASE STUDY
→ STAGE CLEAR
→ WORLD MAP
→ Q&A / CONTACT
→ GAME CLEAR
→ STAFF ROLL
→ RETURN TO REAL WORLD
```

이 Journey는 권장 흐름이며 강제 Lock 구조가 아니다.

---

## 08. 새 기획의 핵심 원칙

### PLAYER
캐릭터는 Decoration이 아니라 Player Avatar.

### LIVING WORLD
기본 Game Scene은 살아 움직인다.

### JOURNEY
Navigation은 이동·발견·상호작용처럼 느껴져야 한다.

### PORTFOLIO FIRST
Project 콘텐츠 전달이 Game 연출보다 우선.

### GUIDED, NOT LOCKED
권장 동선은 존재하지만 직접 이동 가능.

### QUICK VIEW
게임 없이 실제 Portfolio Content로 직접 접근 가능.

---

## 09. LOCKED

다음은 사용자 요청 없이는 변경하지 않는다.

- 실제 Portfolio 콘텐츠
- Project 4개 구조
- About / Skills / Projects / Q&A / Contact 핵심 정보
- 실제 Project Role / Process / Result / Limitation
- Quick View 원칙
- 게임 없이 콘텐츠 접근 가능
- Product Validation Criteria
- Responsive / Accessibility / Fallback 원칙
- React + Vite
- Scene / Page 역할 분리

---

## 10. FLEXIBLE / ITERATIVE

다음은 작업 중 실제 브라우저를 보며 수정 가능하다.

- Visual Design
- Layout
- Composition
- Color 미세 조정
- Animation
- Motion
- Camera
- Parallax
- Hover
- FX
- Lighting
- Scene Transition
- Player Animation 연결 방식
- Scene별 Interaction
- Responsive Composition

`DESIGN_SYSTEM`은 Working Guideline이다.

디자인·모션을 문서에 맞추기 위해 실제 사용성을 희생하지 않는다.

---

## 11. 삭제 확정 Scope

다음 기능은 현재 프로젝트에서 사용하지 않는다.

- 숨겨진 섬 / Secret Area
- Companion / 동료 캐릭터
- Player Badge 장착
- Skill Level (`FIGMA Lv.5` 등)
- 의미 없는 HP
- 의미 없는 Life
- 의미 없는 Score
- 실제 Portfolio와 연결되지 않는 Gamification

---

## 12. Skill 표현 정책

Skill은 Level/별점으로 평가하지 않는다.

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

Skill은 실제 사용 Project와 연결해서 증명한다.

---

## 13. Product Validation Criteria

프로젝트 구현 판단의 최상위 기준.

| 영역 | 확인할 질문 |
|---|---|
| 첫인상 | 처음 본 사람이 이름·직무·핵심 강점을 설명할 수 있는가? |
| 탐색 | 게임 없이 Project 4개와 Contact/Resume을 찾을 수 있는가? |
| 콘텐츠 | Project를 본 뒤 역할·문제·주요 결정·구현을 이해할 수 있는가? |
| 조작 | 긴 설명 없이 이동·점프·아이템 획득·진입을 이해하는가? |
| 복구 | Auto Move 취소·Skip·Back·Reload 뒤 정상인가? |
| 반응형 | 노트북·Tablet·Mobile·확대 화면에서 핵심 UI가 유지되는가? |
| 에셋 실패 | Video/FX 실패 뒤에도 콘텐츠와 다음 행동이 남는가? |
| 접근성 | Keyboard·Reduced Motion·Motion Pause에서도 동일 정보에 접근 가능한가? |

---

## 14. 새 Design System 상태

새 Design System에서 정리된 주요 Foundation:

- Primary World Reference: 1440×810 / 16:9
- Pretendard / Fredoka / Silkscreen
- World / Portal / Real / Sunset / Night Color System
- Grid / Responsive
- Spacing / Radius / Border / Elevation
- Lighting
- Layer / Depth / Z-index
- Player Motion / Direction
- World Interaction Geometry
- Living World
- Motion Budget
- Camera
- Interaction States

### 중요

Design System의 값은 현재 기준이며
디자인·모션·인터랙션 관련 값은 구현 중 조정 가능하다.

---

## 15. Player Prototype Gate

대규모 World Asset 제작 전 다음 Prototype을 먼저 검증해야 한다.

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
11. Cloud / Grass Motion
12. Scene Transition 1회

Prototype에서 먼저 확인:

- Character Identity
- Character Scale
- Ground Contact
- Animation Transition
- Input Response
- Collision
- Loop
- Responsive 가능성

---

## 16. Higgsfield / AI Asset 방향

Higgsfield를 이미지와 영상 Asset 제작에 활용할 계획이다.

주요 후보:

- Real World cinematic
- Portal
- Complex Character Motion
- Cinematic Transition
- Environment Loop
- FX Source

단, 모든 World를 Video 한 장으로 만들지 않는다.

가능한 경우 Layer를 분리하고
React/CSS/Motion Code와 결합한다.

---

## 17. 아직 구현 여부를 확인해야 하는 것

다음은 실제 코드/브라우저 확인 전 “완료”로 기록하지 않는다.

- 최신 Router 상태
- Scene 01 현재 Visual
- Character Player Control
- Power Up Gameplay
- World Map 실제 이동
- Camera Follow
- Collision
- Progress State
- Quick View
- Adventure Book
- Reduced Motion
- Motion Pause
- Asset Fallback
- Direct URL
- Browser Back
- Responsive
- Mobile Interaction
- Performance

---

## 18. 다음 작업 순서

### Phase 1 — Documentation

1. `AGENTS.md` 새 기준 반영
2. `CLAUDE.md` 새 기준 반영
3. `Personal-Portfolio_PRD_v2.md` 새 기준 반영
4. `PROJECT_CONTEXT.md` 갱신
5. `SKILL.md` 갱신
6. `README.md` 갱신
7. 최신 `DESIGN_SYSTEM.md` 프로젝트에 반영

### Phase 2 — Structure

- 최신 문서 기준 Router Audit
- Scene 역할 재정의
- Folder / Asset 구조 설계
- Data / Component / Hook 필요 여부 결정
- 기존 코드 KEEP / REFACTOR / REBUILD 분류

### Phase 3 — Prototype

- Player Prototype Gate 구현
- 기본 Collision
- Skill Block
- Pickup
- Living World 최소 Motion
- Scene Transition

### Phase 4 — Asset Production

Prototype 검증 후 Higgsfield Asset 제작.

### Phase 5 — Main Build

- Real World
- Portal
- Character
- Power Up
- World Map
- Project World
- Mission / Case Study
- Stage Clear
- Q&A
- Contact
- Ending

### Phase 6 — QA

- Product Validation 8개 기준
- Responsive
- Accessibility
- Fallback
- Performance
- Build / Deploy

---

## 19. 마지막 Git 상태

최근 Audit 당시:

- 마지막 확인 Commit: `374a9c7`
- Working Tree: Clean

현재 상태는 작업 시작 전 다시 확인해야 한다.

```bash
git status
git branch --show-current
```

---

## 20. 마지막 검증 상태

최근 Audit 이후 전체 새 기획 기준의 브라우저 검증은 아직 완료되지 않았다.

따라서 다음을 아직 통과했다고 기록하지 않는다.

- New Scene Flow
- New Player System
- New Power Up
- New World Map
- Responsive 10개 환경
- Keyboard
- Reduced Motion
- Asset Fallback
- Performance Target
- Final Lint
- Final Build

각 구현 단계에서 실제 실행 후 갱신한다.

---

## 21. PROJECT_CONTEXT 작성 규칙

이 파일에는 **현재 실제 상태만 기록**한다.

### 기록할 것
- 실제 완료 기능
- 현재 구현 중 기능
- 알려진 문제
- 실제 사용 Library
- 실제 Route
- Asset 상태
- 주요 Decision
- 실제 검증 결과

### 기록하지 않을 것
- 아직 구현하지 않은 기능을 완료로 표현
- 계획만 존재하는 기능
- 추측
- 허위 검증 결과

사소한 CSS 수정마다 갱신하지 않는다.

Route / Scene / Player System / Asset Strategy / 중요한 Design Decision / 검증 상태가 바뀔 때 갱신한다.
