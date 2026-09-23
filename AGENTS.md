# Personal Portfolio --- AGENTS FINAL

> **AI Coding Agent 공통 작업 규칙**\
> 대상: Claude Code, Codex 및 기타 코드 에이전트\
> 프로젝트: React + Vite 기반 **Cinematic Interactive Personal
> Portfolio**\
> Product Source of Truth: `Personal-Portfolio_PRD_FINAL.md`\
> Visual/UI Source of Truth: `DESIGN_SYSTEM.md`\
> Current State Source of Truth: `PROJECT_CONTEXT.md`

## 01. Project Purpose

이 프로젝트의 목적은 게임 사이트를 만드는 것이 아니라 **디자인 의도,
인터랙션, 반응형, 접근성, 프론트엔드 구현 역량을 Portfolio 자체로
증명하는 것**이다.

판단 우선순위: 1. Portfolio Content 2. Navigation / Discoverability 3.
Usability / Interaction Clarity 4. Recovery / Fallback 5. Responsive 6.
Accessibility 7. Performance 8. Motion / Cinematic 9. Decoration

시각적 연출이 정보 전달이나 사용성과 충돌하면 정보 전달과 사용성을
우선한다.

------------------------------------------------------------------------

## 02. Source of Truth & Read Order

작업 전: 1. `Personal-Portfolio_PRD_FINAL.md` 2. `DESIGN_SYSTEM.md` 3.
`PROJECT_CONTEXT.md` 4. `AGENTS.md` 5. Claude 사용 시 `CLAUDE.md` 6.
관련 `SKILL.md` 7. 실제 Route / Scene / Page / CSS / Asset 8.
`package.json` 9. `git status` 10. 현재 Branch

문서 역할: - PRD → 무엇을 만들지 - Design System → 어떻게 보여줄지 -
Project Context → 현재 실제 상태 - AGENTS → 공통 구현 규칙 - CLAUDE →
Claude 전용 추가 규칙 - SKILL → 반복 작업 Workflow - README → 외부 설명

문서와 실제 코드가 충돌하면 추측하지 말고 실제 구현을 확인한다.

------------------------------------------------------------------------

## 03. Decision States

### LOCKED

사용자 요청 없이 변경 금지: - Portfolio First - Real World 현재 방향 -
Real World → Portal → Tool Universe → Arrival → Portfolio World의 큰
흐름 - About / Skills / Projects×4 / Q&A / Contact / Resume - 실제
Project 사실과 Role/Process/Result/Limitation - 게임/3D 없이 핵심 콘텐츠
접근 가능 - Responsive / Accessibility / Fallback - React + Vite / React
Router - Case Study는 읽기와 정보 전달 우선

### WORKING / NOT LOCKED

다음은 아직 확정 기능으로 구현하지 않는다: - Portfolio World Character
이동 여부 - About 공간 디자인 - Skills 최종 디자인 / Toolkit / Game
Item - Projects 최종 공간 디자인 - Gallery / Project Archive 채택 -
Project 선택 시 Character 이동 - Point-based Movement - Q&A / Contact
공간 연출 - 콘텐츠별 Camera / Transition - Ending

**Agent는 WORKING을 임의로 LOCKED로 승격하지 않는다.** Prototype/시안이
필요하면 후보로 구현하거나 제안하되 확정안이라고 기록하지 않는다.

------------------------------------------------------------------------

## 04. Real World Rules

Real World 방향은 LOCKED지만 최종 구현 완료 상태는 아니다.

유지할 방향: - Seoul night workspace - Photorealistic / Cinematic - Warm
desk light × cool city/monitor light - iMac / Character / black-and-tan
Maltipom / white chiffon curtain - Hero copy 안전 영역 - ENTER WORLD -
Portal Cyan은 Portal 이상현상 이후 사용

큰 흐름:
`Real World → Portal Awakening → Portal Open → Suction → Tool Universe → Transformation → Fall/Arrival → Portfolio World`.

세부 Timing/Camera/Higgsfield Clip은 Working.

Real World를 구현할 때 디자인 수치와 Responsive 규칙은 최신 Design
System을 직접 확인한다.

------------------------------------------------------------------------

## 05. Legacy Concepts --- Do Not Restore

기존 코드/문서/폴더에 남아 있어도 다음을 자동 복원하지 않는다: - POWER
UP Gameplay - Skill Block / Item Pickup - Skill Acquired Progress -
Skill Level / XP / HP / Life / Score - 의미 없는 Achievement - Secret
Area - Companion - Player Badge - Portfolio World WASD 자유 이동 - 필수
Jump / Collision - Mission Gameplay - Stage Clear 중심 Journey - Game
Clear 중심 Ending - Adventure Book을 필수 Portfolio OS로 만드는 구조

Legacy `PowerUp/`, `Mission/`, `StageClear/` 등의 폴더가 존재해도 PRD의
현재 요구사항보다 우선하지 않는다. 삭제는 실제 참조를 Audit하고 사용자
확인 후 진행한다.

------------------------------------------------------------------------

## 06. Portfolio Content Integrity

Project Case Study는 실제 자료만 사용한다.

반드시 사실 기반: - Problem / Context - Role - Decision / Process -
Implementation - Result 또는 Limitation

실제 근거 없이 생성 금지: - 성과 수치 - 사용자 테스트 결과 - 퍼센트
개선 - 매출/전환율 증가 - 허위 사용자 후기 - 허위 협업 정보 - 허위
Project 역할 - Skill 숙련도 수치

콘텐츠가 부족하면 임의로 채우지 말고 부족한 자료를 명시한다.

------------------------------------------------------------------------

## 07. Work Start Audit

작업 시작 전 확인:

``` bash
git status
git branch --show-current
```

그리고: - 관련 Route - Scene / Page - Component - CSS - Asset - Data -
Hook / Utility - `package.json` - 최신 문서 - 현재 Browser 결과

존재하지 않는 File/Component/Asset/Library를 있다고 가정하지 않는다.

미커밋 변경이 작업 범위와 충돌할 가능성이 있으면 먼저 보고한다.

------------------------------------------------------------------------

## 08. Code Change Principles

### Existing Code First

새 구현 전 기존 Component, Hook, Utility, Data, CSS, Asset, Router를
검색한다.

### Minimum Necessary Change

문제를 해결하는 데 필요한 범위만 수정하고 관련 없는 Refactor를 섞지
않는다.

### No Unrequested Rewrite

사용자 요청 없이 금지: - `src/` 전체 삭제/재작성 - Router 전체 교체 -
기존 Portfolio Content 삭제 - Project Data 삭제 - Asset 대량 삭제 - 정상
페이지 전체 교체 - Framework 변경

정상 동작 코드를 단순히 더 깔끔해 보인다는 이유로 전면 재작성하지
않는다.

------------------------------------------------------------------------

## 09. Scene / Page / Route Architecture

`src/scenes/`는 Cinematic, World, Character, Scene Transition 등
공간/연출 중심.

`src/pages/`는 About, Skills, Projects, Project Detail, Q&A, Contact 등
실제 Portfolio Information 중심.

Scene과 Page를 무조건 1:1로 만들지 않는다. 하나의 Scene에서 Page
Content를 재사용할 수 있다.

React Router는 기술적인 URL 구조이며 Cinematic에 종속시키지 않는다.

반드시 가능한 것: - Direct URL - Refresh - Browser Back / Forward -
Quick/Direct Access - Reduced Motion - Error Recovery

긴 Animation 완료가 Route 변경의 필수 조건이 되어서는 안 된다.

Legacy Route(`/power-up` 등)는 실제 Router/Link dependency Audit 없이
삭제하지 않는다.

------------------------------------------------------------------------

## 10. Interaction Rules

Portfolio World 이후 세부 이동 방식은 아직 NOT LOCKED다.

따라서 Agent는 다음을 기본 전제로 만들지 않는다: - WASD 자유 이동 -
Arrow 자유 이동 - Jump - Collision - Auto Path - Point-based Movement -
Character가 모든 Navigation을 수행하는 구조

현재 확정된 Interaction 요구는: - Mouse 접근 가능 - Keyboard 접근 가능 -
Touch 접근 가능 - 핵심 콘텐츠 Direct Access 가능 - Hover-only 정보
금지 - Motion/3D가 없어도 핵심 기능 유지

특정 Scene의 Character Movement는 해당 디자인이 LOCKED된 후 구현한다.

------------------------------------------------------------------------

## 11. Design System Rules

최신 `DESIGN_SYSTEM.md`를 기준으로: - Typography - Color - Spacing -
Radius - Padding - Border / Shadow - Grid - Responsive - Safe Area -
Component State - Accessibility - Motion Principle

을 적용한다.

특히 임의의 새 Font/Color/Radius/Spacing Token을 추가하지 않는다.

현재 Typography 기준은 **Pretendard Variable + Instrument Serif**다.
Legacy Fredoka/Silkscreen/RetroMario/SuperMario Font는 파일이
존재하더라도 새 디자인에 자동 사용하지 않는다.

Design System 변경이 필요하면 문제, 변경 이유, 영향 범위를 먼저
확인한다.

------------------------------------------------------------------------

## 12. Responsive Rules

Breakpoints:

``` text
Wide              ≥1920
Desktop           1280–1919
Compact Desktop   1024–1279
Tablet            768–1023
Mobile            <768
```

Primary: `1440×810` Desktop / `430×932` Mobile.

필수 QA: `2560×1440`, `1920×1080`, `1440×810`, `1366×768`, `1180×820`,
`1024×768`, `768×1024`, `430×932`, `402×874`, `390×844`, `360×800`.

Boundary QA: `767/768`, `1023/1024`, `1279/1280`, `1919/1920`.

규칙: - Desktop을 단순 축소해 Mobile로 만들지 않는다. - Visual
parity보다 Content parity. - Important Object Safe Area 유지. -
Ultrawide에서 중앙 Scene 과대 확대 금지. - Short viewport 별도 검증. -
Hover 기능은 Touch/Keyboard 대체 제공. - 200% Zoom 검증. - Mobile에서
복잡한 3D/Character 조작을 강제하지 않는다. - Real World 외 화면의
구체적인 Mobile Layout은 디자인 확정 전 임의로 LOCK하지 않는다.

------------------------------------------------------------------------

## 13. Motion / Ownership

Motion은 목적이 있어야 하며 콘텐츠를 가리거나 조작 반응을 늦추면 안
된다.

강한 Motion은 동시에 과도하게 사용하지 않는다.

**One Motion = One Owner.**

권장 Ownership: - Simple UI → CSS - Complex UI Timeline → GSAP(실제 사용
시) - World Camera / 3D → Three.js - Complex Cinematic →
Higgsfield/Video - 3D Asset 제작 → Blender/Astra Workflow

같은 움직임을 CSS + GSAP + Three.js + Video가 중복 제어하지 않는다.

`prefers-reduced-motion`에서 강한 Camera/Suction/Parallax를 줄이거나
대체한다.

------------------------------------------------------------------------

## 14. Asset Rules

Asset 사용 전 실제 파일 존재와 사용 위치를 확인한다. 임의 Placeholder
URL, 존재하지 않는 Icon/Asset 금지.

목표 구조:

``` text
public/assets/
├─ source/
│  ├─ original/
│  ├─ higgsfield/
│  ├─ astra/
│  └─ blender/
└─ production/
   ├─ images/
   ├─ video/
   ├─ models/
   ├─ icons/
   ├─ audio/
   └─ fonts/
```

이 구조가 실제 Repository에 아직 없다면 필요 시 단계적으로 만든다.

Naming: lowercase / kebab-case / English / no spaces.

Format: Image WebP/AVIF, Video WebM(+MP4 fallback 필요 시), 3D GLB, Icon
SVG, Font WOFF2 우선.

AI/Higgsfield Asset은 Color, Lighting, Perspective, Character
Proportion, Shadow, World Scale, Loop, Transparency, Browser 재생을
검토한다.

`AI 이미지 한 장 = Interactive Scene 완성`으로 판단하지 않는다.

------------------------------------------------------------------------

## 15. Accessibility / Fallback

필수: - Semantic HTML - Keyboard Navigation - `focus-visible` - 약
44×44px 이상 Touch Target - 충분한 Contrast - Color-only State 금지 -
의미 있는 Image Alt - Reduced Motion - Skip Cinematic - Direct Content
Access - 200% Zoom

Fallback: - Video 실패 → Poster/Static - Three.js/WebGL 실패 → Static
World + HTML Navigation - Character Motion 실패 → Static Character -
Ambient 실패 → 해당 Motion만 생략 - Audio 실패 → Silent - Image 실패 →
Fallback + Alt - Transition 실패 → Immediate Route - Loading 실패 →
Skip/Direct Access

가짜 Loading `%` 금지.

------------------------------------------------------------------------

## 16. Performance / Dependency

성능은 기능으로 취급한다.

-   WebP/AVIF
-   WebM
-   GLB
-   필요한 Asset만 Preload
-   Route/Scene Lazy Load
-   Offscreen Animation/Video Pause
-   Particle 제한
-   Cleanup
-   Mobile Quality Reduction
-   Layout Shift 최소화

Target: LCP≤2.5s / INP≤200ms / CLS≤0.1.

새 Package 설치 전: 1. `package.json` 확인 2. 기존 Package로 해결
가능한지 확인 3. 추가 이유 확인 4. Bundle/Maintenance 영향 확인

동일 기능을 여러 Animation Library로 중복 구현하지 않는다.

------------------------------------------------------------------------

## 17. Git Safety

작업 전:

``` bash
git status
git branch --show-current
```

작업 후 가능한 범위에서:

``` bash
npm run lint
npm run build
git status
```

사용자 명시적 요청 없이 금지: - hard reset - rebase - force push - 다른
Branch 삭제 - Commit history 변경 - 대량 파일 삭제

사용자 작업을 임의로 되돌리지 않는다.

------------------------------------------------------------------------

## 18. Validation & Reporting

작업 후 보고: 1. 변경 파일 2. 구현 내용 3. 유지한 기존 구조 4.
Working/Locked에 영향을 준 부분 5. Lint 결과 6. Build 결과 7. 실제 확인
Viewport 8. 확인하지 못한 부분 9. 남은 문제

실행하지 않은 검증을 통과했다고 보고하지 않는다.

주요 구현은 다음을 확인: - 첫인상 - 콘텐츠 탐색 - Project 정보 이해 -
Interaction 명확성 - Back/Reload/Direct URL - Responsive - Asset
Failure - Keyboard/Reduced Motion

------------------------------------------------------------------------

## 19. Documentation Update

`PROJECT_CONTEXT.md`에는 실제 상태만 기록한다.

다음과 같은 중요한 변경 시 갱신: - Route 변경 - Scene/Page Architecture
변경 - 주요 구현 완료 - Asset Strategy 변경 - LOCKED Decision 변경 -
실제 QA 결과 - 알려진 문제

사소한 CSS 수정마다 문서를 과도하게 갱신하지 않는다.

PRD의 WORKING 디자인을 확정된 것으로 Project Context에 기록하지 않는다.

------------------------------------------------------------------------

## 20. Final Prohibitions

-   존재하지 않는 Asset/Library 가정
-   사용자 요청 없이 Portfolio Content 변경
-   근거 없는 Project 사실 생성
-   Skill Level/숙련도 수치 생성
-   Legacy Power Up/Stage Clear/Mission 자동 복원
-   Portfolio World 자유 이동 자동 구현
-   미확정 Character Movement 임의 구현
-   모든 Hover에 Scale+Glow+Particle
-   모든 화면에 동일 Motion Pattern
-   단일 영상/이미지로 전체 Interactive Experience 대체
-   게임 때문에 Case Study 읽기를 어렵게 만들기
-   Responsive를 단순 Scale로 해결
-   접근성 제거
-   Asset 실패 시 Navigation 중단
-   확인 없이 대량 삭제/전면 재작성

## 21. Final Decision Rule

애매한 선택은 다음 순서로 판단한다.

**Content → Navigation → Usability → Recovery → Responsive →
Accessibility → Performance → Motion → Decoration**

그리고 가장 중요한 규칙:

> **LOCKED는 지킨다. WORKING은 확정하지 않는다. 실제 구현 상태는
> 확인하고 기록한다.**
