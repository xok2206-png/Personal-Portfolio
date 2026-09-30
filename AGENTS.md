# Personal Portfolio --- AGENTS FINAL

> **AI Coding Agent 공통 작업 규칙**\
> 대상: Claude Code, Codex 및 기타 코드 에이전트\
> 프로젝트: React + Vite 기반 **Cinematic Interactive Personal
> Portfolio**\
> Product Source of Truth: `Personal-Portfolio_PRD_V4_FINAL.md`\
> Visual/UI Source of Truth: `DESIGN_SYSTEM.md`\
> Current State Source of Truth: `PROJECT_CONTEXT.md`

## 2026-09-30 공통 아트 제작 기준과 결정 범위

World / About / Skills / Projects / Contact의 에셋 제작 시
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)의 **01.1 Portfolio World 공통 아트
제작 기준**을 적용한다. 회화적 색면, 무광 재질, 주요 대상 중심의
디테일 배분, 캐릭터·배경·오브젝트의 광원/명암/원근 일치가 공통 기준이다.
이동 바닥·가림 레이어·콘텐츠 Safe Area를 먼저 설계하고, 대표 외부/실내
장면과 캐릭터 합성을 검토한 뒤 다른 페이지로 확장한다.

Real World는 기존 서울 야경 실사 작업실 기준을 유지한다. 실제 Text/UI는
HTML로, 프로젝트 화면은 실제 자료로 유지한다. 새 Font/Color Token이나
특정 페이지의 공간·이동 방식을 이번 아트 기준에서 파생해 확정하지 않는다.

문서 간 충돌의 우선순위는 해당 페이지 작업 시 판단한다. 특히 Skills의
Ancient Ruin / Skill Orbit은 실제 구현과 시안을 보고 검토할 방향이며,
아래 LOCKED 또는 Override 표기만으로 최우선 확정안으로 적용하지 않는다.
사용자가 만든 기존 변경과 이동 기능을 보존하면서 필요한 범위만 작업한다.
기준의 문서화, 에셋 제작, 코드 적용, 실제 QA 완료를 구분해 기록한다.

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

작업 전: 1. `Personal-Portfolio_PRD_V4_FINAL.md` 2. `DESIGN_SYSTEM.md` 3.
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

### 최신 Visual Decision Override

이 문서의 과거 WORKING 항목 중 Visual Direction과 충돌하는 경우 다음
최신 결정이 우선한다.

-   Portfolio World 메인 월드맵은 **About / Skills / Projects / Contact
    4개 섬**을 기준으로 한다.
-   Q&A / Resume 콘텐츠 자체는 삭제하지 않는다. 최종 진입 위치/표현
    방식은 실제 최신 Route/PRD를 확인한다.
-   Typography는 **Marcellus + SUIT**.
-   Portfolio World Color Direction은 **밝고 자연적인 Fantasy Adventure
    Palette**.
-   AI 특유의 장식/카피/Shadow/Double Border를 제거한다.
-   Page별 Composition을 다르게 설계한다.
-   Projects는 World Map과 동일한 Floating Island 구조를 반복하지
    않는다.

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

Portfolio World는 정적인 배경 감상 페이지가 아니라 **Interactive
Experience**다.

공통 Interaction 원칙: - Desktop에서 Character Movement / Object
Interaction을 사용할 수 있다. - 기본 조작 언어는 가능한 한 단순하게
유지한다: `WASD = 이동`, `E = 상호작용`. - 정확한 Collision / Physics /
Point-based Movement 방식은 실제 Scene 구조를 확인한 뒤 결정한다. -
Mouse / Keyboard / Touch 모두 핵심 콘텐츠에 접근 가능해야 한다. -
Character 조작만이 유일한 Navigation 수단이 되어서는 안 된다. - 핵심
콘텐츠는 Direct Access / Quick Access를 제공한다. - Hover-only 정보
금지. - Motion/3D가 실패하거나 Reduced Motion 환경이어도 핵심 기능을
유지한다. - Mobile에서는 Desktop WASD 조작을 그대로 강제하지 않고 Tap /
Direct UI 중심으로 재구성할 수 있다.

Object Interaction은 기본적으로 `Idle → Near/Focus → Selected → Exit`
흐름을 사용한다.

-   Idle: 불필요한 UI/Glow를 노출하지 않는다.
-   Near/Focus: 상호작용 가능한 대상만 제한적으로 반응한다.
-   Selected: 필요한 정보만 표시한다.
-   Exit: Scene을 다시 깨끗한 기본 상태로 복귀시킨다.

모든 Object가 동시에 빛나거나 움직이거나 UI를 띄우지 않는다.

------------------------------------------------------------------------

## 11. Design System Rules

최신 `DESIGN_SYSTEM.md`를 기준으로: - Typography - Color - Spacing -
Radius - Padding - Border / Shadow - Grid - Responsive - Safe Area -
Component State - Accessibility - Motion Principle

을 적용한다.

특히 임의의 새 Font/Color/Radius/Spacing Token을 추가하지 않는다.

현재 Typography 기준은 **Marcellus + SUIT** 2-Font System이다.

-   **Marcellus**: World / Chapter / Page Display Title 등 Fantasy
    Display 전용
-   **SUIT**: Korean, English Hero Copy, Navigation, Button, Label,
    Skill/Project Name, Body, Description, Number, Metadata, Control
    Guide 등 나머지 전체

Legacy Pretendard Variable / Instrument Serif / Fredoka / Silkscreen /
RetroMario / SuperMario Font는 파일이 존재하더라도 새 디자인에 자동
사용하지 않는다.

금지: - 페이지마다 다른 Font 추가 - Handwriting / Pixel / Decorative
Font 임의 사용 - 큰 영어 문장이라는 이유만으로 Display Font 사용 -
과도한 ALL CAPS / Letter Spacing - `text-shadow` / Text Glow로 가독성을
해결하는 방식

Design System 변경이 필요하면 문제, 변경 이유, 영향 범위를 먼저
확인한다.

### 11.1 Final Visual Direction --- LOCKED

Portfolio World의 최종 시각 방향은 **밝고 자연적인 Fantasy Adventure ×
Minimal UI**다.

-   Fantasy는 Environment / Architecture / Nature / Character /
    Interaction이 담당한다.
-   UI는 현대적이고 단순하며 기능 중심으로 유지한다.
-   자연광, 하늘, 구름, 식생, 따뜻한 석재, 대기 원근을 시각 중심으로
    사용한다.
-   기존 Dark Navy + Gold + Purple/Cyan Glow를 모든 페이지의 기본
    조합으로 사용하지 않는다.
-   특정 게임의 UI/Asset/HEX를 복제하지 않고, 밝은 자연 판타지의
    색채·공간·탐험 원리만 참고한다.

Color 방향: - Clear Sky Blue - Cloud / Warm Ivory - Warm Stone / Sand -
Natural Grass / Sage Green - Deep Natural Green - Neutral Ink - 제한적인
Interaction Blue - 제한적인 Warm Accent

페이지마다 별도 Color System을 만들지 않는다. 같은 Palette를 공유하고
시간대/조명으로 차이를 만든다.

-   World → Clear Morning
-   About → Warm Afternoon
-   Skills → Clear Day / Ancient Ruins
-   Projects → Late Afternoon
-   Contact → Golden Hour

임의 HEX 추가 금지. 새 Color Token이 필요하면 Design System 변경 이유와
영향 범위를 먼저 확인한다.

### 11.2 AI Visual Cleanup Rules --- LOCKED

새 디자인에서 다음 패턴을 사용하지 않는다.

-   의미 없는 가로선 / 두 줄 장식선
-   Double Border / Frame 안의 Frame
-   Corner Ornament 남발
-   `◆`, `◇`, `✦`, `✧` 등 장식 기호 반복
-   Text Shadow / Text Glow
-   빈 공간을 채우기 위한 감성 영어 문구
-   `EXPLORE / CREATE / GROW`류의 일반적인 장식 카피 남발
-   같은 의미의 한글/영문 중복 카피
-   과도한 Glassmorphism
-   모든 Hover에 Scale + Glow + Particle
-   모든 Object의 상시 Glow
-   모든 화면의 동일한 중앙 후면 Character 구도
-   모든 페이지를 Floating Island 구도로 반복
-   빈 공간을 책 / 식물 / 랜턴 / 배너 / 크리스탈로 무조건 채우기
-   AI가 생성한 배경 이미지 안에 실제 UI / Navigation / Button / 설명
    Text를 Bake-in
-   AI Object 안에 Brand Logo를 억지로 합성해 형태가 깨지는 방식
-   AI가 Layout / Typography / UI hierarchy를 임의로 결정하는 방식

**AI는 Asset Artist로 사용한다.** Layout / Typography / UI / Interaction
결정은 `DESIGN_SYSTEM.md`와 실제 코드가 담당한다.

Environment Asset에는 Readable Text, Navigation, Button, Project Name,
Skill Name을 넣지 않는다. 실제 Text/UI는 React + HTML/CSS로 구현한다.

### 11.3 Common Navigation --- LOCKED

Portfolio World의 공통 Navigation은 페이지마다 디자인을 바꾸지 않는다.

기본 구조: `JY. | World | About | Skills | Projects | Contact`

-   동일 위치 / 높이 / Font / Spacing / Active Rule
-   SUIT 사용
-   Active는 Weight/Color + 얇은 Underline 등 최소 표현
-   Glow / RPG Frame / Particle / Gradient Text 금지
-   복잡한 배경 위에서는 필요한 최소 Contrast Surface만 제공
-   Mobile에서는 정보 구조를 유지하면서 공간에 맞는 Menu Pattern으로
    변환 가능

### 11.4 Page Visual Identity --- LOCKED

같은 세계관이지만 Composition / Camera / Environment / Interaction을
반복하지 않는다.

-   **World** → Wide Landscape / Exploration / World Overview
-   **About** → Interior / 3/4 Composition / Personal Space / Object
    Interaction
-   **Skills** → Ancient Ruin / Skill Orbit / Negative Space / 기술 탐색
-   **Projects** → Architectural Gallery / Project Archive / 4개의 실제
    Project Stage
-   **Contact** → Quiet Ending / Destination / Contact UI 중심

특히 Projects를 다시 여러 개의 Floating Project Island로 구성해 World
Map과 동일한 문법을 반복하지 않는다.

Character는 세계관 연결 장치이자 Interaction 주체지만 모든 페이지의 Hero
Visual이 되어서는 안 된다.

-   World: Character 비중 높음
-   About: Character가 공간 안에서 행동
-   Skills: Character보다 Skill Interaction 우선
-   Projects: 실제 Project가 주인공
-   Contact: Contact Action / Ending이 주인공

Portfolio World에 Pet / Companion / NPC를 임의로 추가하지 않는다. Real
World에 이미 확정된 별도 Asset/연출은 해당 Scene 규칙을 따른다.

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
parity보다 **Content parity / Interaction parity**를 우선한다. -
Important Object / Character / CTA / Navigation Safe Area를 유지한다. -
Background는 `cover`만 믿지 말고 Viewport별 focal point / crop을
검증한다. - Ultrawide에서 중앙 Scene을 과대 확대하지 않는다. - Short
viewport는 별도 검증한다. - Hover 기능은 Touch / Keyboard 대체를
제공한다. - 200% Zoom에서도 핵심 콘텐츠와 Navigation이 손실되지 않아야
한다. - Mobile에서 복잡한 3D / Character 조작을 강제하지 않는다. -
Desktop WASD Interaction이 있는 Scene은 Mobile에서 Tap / Direct
Selection / Bottom Sheet 등 동등한 접근 방식으로 재설계한다. -
Navigation, 핵심 콘텐츠, Project 진입, Contact는 모든 Breakpoint에서
직접 접근 가능해야 한다. - 장식 Asset은 Mobile에서 단순 축소가 아니라
우선순위에 따라 제거/단순화할 수 있다. - Typography는 Breakpoint별
Token을 사용하며 이미지 비율에 맞춰 임의 축소하지 않는다. - Panel은
Mobile에서 Drawer / Bottom Sheet / Fullscreen Sheet 등으로 전환할 수
있다. - Touch Target은 최소 약 44×44px를 유지한다. - 필요한 Mobile UI에
`env(safe-area-inset-*)`를 반영한다. - `100vh` 고정 의존을 피하고 필요한
경우 `dvh/svh`를 사용한다. - Orientation change와 Landscape Mobile /
Tablet에서도 핵심 콘텐츠가 가려지지 않는지 확인한다. - Real World 외
화면도 최종 디자인이 확정된 영역은 위 Responsive 원칙에 따라 명시적으로
구현하고 QA한다.

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

추가 규칙: - Environment Asset에는 실제 UI Text / Navigation / Button /
Skill Name / Project Name을 생성하지 않는다. - 상호작용 대상은 필요 시
Background와 분리된 Asset으로 제작해 Hover / Focus / Selected 상태를
코드에서 제어한다. - AI Asset이 Layout을 결정하지 않는다. 확정된 Layout
/ Safe Area / Focal Point에 맞춰 Asset을 제작한다. - 과도한 소품
밀도보다 Negative Space와 명확한 Silhouette을 우선한다.

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
-   Marcellus + SUIT 외 Font 임의 추가
-   Design System 밖의 HEX / Radius / Spacing 임의 추가
-   Text Shadow / Text Glow
-   의미 없는 Double Border / 두 줄 장식 / 장식 기호 반복
-   빈 공간을 감성 영어 카피로 채우기
-   AI 배경 이미지 안에 실제 UI/Text Bake-in
-   모든 페이지를 동일한 Character 후면 중앙 구도로 반복
-   World Map과 Projects를 동일한 Floating Island 선택 구조로 반복
-   Portfolio World에 Pet / Companion / NPC 임의 추가
-   Responsive를 Desktop 화면의 비율 축소로만 처리
-   Mobile에서 Desktop Interaction을 그대로 강제

## 21. Final Decision Rule

애매한 선택은 다음 순서로 판단한다.

**Content → Navigation → Usability → Recovery → Responsive →
Accessibility → Performance → Motion → Decoration**

그리고 가장 중요한 규칙:

> **LOCKED는 지킨다. WORKING은 확정하지 않는다. 실제 구현 상태는
> 확인하고 기록한다.**
