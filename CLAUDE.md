# Personal Portfolio --- CLAUDE.md

@AGENTS.md

> Claude Code 전용 실행 규칙\
> 이 문서는 `AGENTS.md`를 보완하며, 충돌 시 `AGENTS.md`를 우선한다.

------------------------------------------------------------------------

## 01. 작업 시작 순서

Claude Code는 작업 전에 다음 순서로 확인한다.

1.  `AGENTS.md`
2.  `Personal-Portfolio_PRD_FINAL.md`
3.  `DESIGN_SYSTEM.md`
4.  `PROJECT_CONTEXT.md`
5.  관련 `.agents/skills/.../SKILL.md`
6.  `package.json`
7.  관련 Route / Scene / Page / CSS / Asset
8.  `git status`
9.  현재 Branch
10. 가능하면 현재 Browser 결과

단일 파일의 작은 수정은 불필요하게 긴 계획을 만들지 않는다.

여러 파일, Route, Scene, Asset, Motion System을 함께 수정할 때만 짧은
계획을 작성한다.

계획에는 다음을 포함한다.

-   수정할 파일
-   유지할 기존 구조
-   구현 목표
-   재사용할 Component / Pattern / Asset
-   필요한 새 Asset
-   검증 방법
-   예상 위험 요소

------------------------------------------------------------------------

## 02. 먼저 분석하고, 바로 갈아엎지 않는다

현재 프로젝트는 React + Vite + React Router 기반으로 작업 중이다.

새 작업을 시작할 때:

-   기존 코드를 먼저 읽는다.
-   현재 Route를 확인한다.
-   Scene / Page 역할을 확인한다.
-   기존 CSS와 Asset을 확인한다.
-   동일 기능이 이미 존재하는지 확인한다.
-   가능하면 현재 브라우저 결과를 먼저 확인한다.

사용자 요청 없이 다음을 하지 않는다.

-   `src/` 전체 재작성
-   Router 전체 교체
-   Scene / Page 구조 전면 변경
-   기존 Portfolio Content 삭제
-   Project Data 삭제
-   Asset 대량 삭제
-   정상 구현 전체 교체

단순히 더 깔끔해 보인다는 이유로 정상 동작 코드를 전면 재작성하지
않는다.

------------------------------------------------------------------------

## 03. LOCKED / WORKING 구분

### LOCKED

사용자가 명시적으로 변경하지 않는 한 유지한다.

-   Portfolio First
-   Real World의 현재 방향
-   Real World → Portal → Tool Universe → Arrival → Portfolio World의 큰
    흐름
-   About / Skills / Projects × 4 / Q&A / Contact / Resume
-   실제 Project 정보
-   실제 Role / Process / Result / Limitation
-   게임이나 3D 없이도 핵심 콘텐츠에 접근 가능한 구조
-   Responsive / Accessibility / Fallback 원칙
-   React + Vite
-   React Router
-   Case Study는 정보 전달과 읽기가 우선

### WORKING / NOT LOCKED

아직 최종 확정하지 않는다.

-   Portfolio World에서 Character가 실제 이동할지 여부
-   About 공간 디자인
-   Skills 최종 디자인
-   Skills Toolkit / Game Item 표현 방식
-   Projects 최종 공간 디자인
-   Project Archive / Gallery 채택 여부
-   Project 선택 시 Character 이동 여부
-   Point-based Movement
-   Q&A / Contact 공간 연출
-   각 콘텐츠의 Camera / Transition
-   Ending 세부 연출

Claude Code는 WORKING 항목을 임의로 확정 구현하지 않는다.

Prototype이나 후보안을 구현한 경우에도 완료 또는 확정이라고 기록하지
않는다.

------------------------------------------------------------------------

## 04. Real World

Real World는 현재 우선 구현 대상이며 방향은 확정되어 있다.

### 유지할 방향

-   Seoul Night Workspace
-   Photorealistic / Cinematic
-   Warm Desk Light
-   Cool City / Monitor Light
-   iMac
-   Character
-   Black-and-tan Maltipom
-   White Chiffon Curtain
-   Hero Copy Safe Area
-   `ENTER WORLD`

Portal Cyan은 기본 화면의 일반 UI Color로 사용하지 않는다.

Portal 이상현상이 시작된 이후 등장한다.

### 큰 흐름

``` text
REAL WORLD
→ PORTAL AWAKENING
→ PORTAL OPEN
→ SUCTION
→ TOOL UNIVERSE
→ TRANSFORMATION
→ FALL / ARRIVAL
→ PORTFOLIO WORLD
```

다음은 아직 Working이다.

-   세부 Motion Timing
-   Camera 수치
-   Higgsfield Clip 분할
-   영상 연결 방식의 세부 조정

구현 시 최신 `DESIGN_SYSTEM.md`를 직접 확인한다.

------------------------------------------------------------------------

## 05. Legacy 기능을 자동 복원하지 않는다

기존 코드나 폴더에 남아 있어도 다음 기능을 자동으로 다시 구현하지
않는다.

-   POWER UP Gameplay
-   Skill Block
-   Item Pickup
-   Skill Acquired Progress
-   Skill Level
-   XP / HP / Life / Score
-   Secret Area
-   Companion
-   Player Badge
-   Portfolio World WASD 자유 이동
-   필수 Jump / Collision
-   Mission Gameplay
-   Stage Clear 중심 Journey
-   Game Clear 중심 Ending
-   Adventure Book 필수 구조

특히 다음 Legacy 구조가 Repository에 남아 있을 수 있다.

-   `PowerUp/`
-   `Mission/`
-   `StageClear/`
-   `/power-up`

삭제가 필요하면 실제 Import / Route / Link / Dependency를 먼저 확인한다.

------------------------------------------------------------------------

## 06. Portfolio 콘텐츠는 사실 기반으로 유지한다

Case Study와 Portfolio 정보는 실제 자료만 사용한다.

실제 근거 없이 다음을 생성하지 않는다.

-   성과 수치
-   사용자 테스트 결과
-   퍼센트 개선
-   매출 증가
-   전환율 증가
-   허위 사용자 후기
-   허위 협업 정보
-   허위 Project Role
-   Skill 숙련도 수치

자료가 부족하면 임의로 채우지 않는다.

부족한 정보가 무엇인지 명확하게 남긴다.

------------------------------------------------------------------------

## 07. Scene / Page 구조

현재 프로젝트는 `src/scenes/`와 `src/pages/`의 역할을 구분한다.

### `src/scenes/`

공간과 연출 중심.

예:

-   Real World
-   Portal
-   World
-   Character
-   Scene Transition

### `src/pages/`

실제 Portfolio Information 중심.

예:

-   About
-   Skills
-   Projects
-   Project Detail
-   Q&A
-   Contact

Scene과 Page를 무조건 1:1로 만들지 않는다.

같은 콘텐츠가 필요하면 Page 또는 Data를 재사용한다.

------------------------------------------------------------------------

## 08. Router 작업

React Router는 URL과 탐색 안정성을 담당한다.

항상 보호한다.

-   Direct URL
-   Refresh
-   Browser Back
-   Browser Forward
-   Reduced Motion
-   Error Recovery
-   핵심 콘텐츠 Direct Access

긴 Animation이 끝나야만 Route 이동이 가능한 구조를 만들지 않는다.

Legacy Route를 삭제하기 전 다음을 확인한다.

1.  `src/app/router.jsx`
2.  Navigation / Link
3.  Import
4.  Scene / Page Dependency
5.  Redirect 필요 여부

------------------------------------------------------------------------

## 09. Character / Interaction

Real World 이후 Character 이동 방식은 아직 확정되지 않았다.

따라서 다음을 기본 전제로 구현하지 않는다.

-   WASD 자유 이동
-   Arrow Key 자유 이동
-   Jump
-   Collision
-   Auto Path
-   Point-based Movement
-   Character가 모든 Navigation을 수행하는 구조

현재 확정된 Interaction 요구사항:

-   Mouse 접근 가능
-   Keyboard 접근 가능
-   Touch 접근 가능
-   Direct Access 가능
-   Hover에만 핵심 정보를 숨기지 않음
-   Motion / 3D가 없어도 핵심 기능 유지

Character Movement는 해당 화면의 디자인이 확정된 후 구현한다.

------------------------------------------------------------------------

## 10. Motion 구현 규칙

Motion은 목적이 있어야 한다.

### Motion Ownership

하나의 움직임은 하나의 시스템이 담당한다.

``` text
Simple UI Motion       → CSS
Complex UI Timeline    → GSAP
3D World / Camera      → Three.js
Complex Cinematic      → Higgsfield / Video
3D Asset Production    → Blender / Astra
```

단, GSAP / Three.js 등의 실제 사용 여부는 `package.json`과 현재 코드를
먼저 확인한다.

설치되어 있다고 가정하지 않는다.

동일 Motion을 여러 Library로 중복 구현하지 않는다.

### Motion 조정

다음 문제가 생기면 Motion을 줄이거나 수정한다.

-   콘텐츠를 가림
-   조작 반응이 늦음
-   너무 산만함
-   Motion sickness 가능성
-   Mobile 성능 저하

Reduced Motion에서는 강한 Camera Travel, Suction, Parallax 등을 줄이거나
대체한다.

------------------------------------------------------------------------

## 11. Design System 적용

최신 `DESIGN_SYSTEM.md`를 기준으로 한다.

임의로 새 Token을 만들지 않는다.

-   Typography
-   Color
-   Spacing
-   Radius
-   Padding
-   Border
-   Shadow
-   Grid
-   Safe Area
-   Component State
-   Responsive
-   Accessibility
-   Motion Principle

현재 Font System:

-   Pretendard Variable → Primary
-   Instrument Serif → Editorial Accent

Legacy Font:

-   Fredoka
-   Silkscreen
-   RetroMario
-   SuperMario256

파일이 존재하더라도 새 디자인에 자동 적용하지 않는다.

Design System의 주요 기준을 변경해야 한다면:

1.  문제 확인
2.  변경 이유 설명
3.  영향 범위 확인
4.  최소 변경
5.  브라우저 검증

순서로 처리한다.

------------------------------------------------------------------------

## 12. Asset 작업

새 Asset을 만들기 전에 기존 Asset을 확인한다.

### 목표 구조

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

실제 Repository에 아직 없는 폴더는 필요할 때 단계적으로 만든다.

### Naming

-   lowercase
-   kebab-case
-   English
-   no spaces

### Format

-   Image → WebP / AVIF
-   Video → WebM, 필요 시 MP4 Fallback
-   3D → GLB
-   Icon → SVG
-   Font → WOFF2 우선

### AI / Higgsfield Asset 검수

-   Character Identity
-   Proportion
-   Perspective
-   Lighting
-   Material
-   Shadow
-   Color
-   Transparency
-   Loop
-   Browser Playback
-   Layer Separation

완성 이미지 한 장을 전체 Interactive Scene 완성으로 판단하지 않는다.

------------------------------------------------------------------------

## 13. Responsive 구현

### Breakpoints

``` text
Wide              ≥ 1920
Desktop           1280–1919
Compact Desktop   1024–1279
Tablet            768–1023
Mobile            < 768
```

### Primary

``` text
Desktop   1440×810
Mobile    430×932
```

### QA

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

### Boundary QA

``` text
767 / 768
1023 / 1024
1279 / 1280
1919 / 1920
```

### Rules

-   Desktop을 단순 축소해 Mobile로 만들지 않는다.
-   Visual Parity보다 Content Parity를 우선한다.
-   Important Object는 Safe Area를 유지한다.
-   Ultrawide에서 중앙 Scene을 과도하게 확대하지 않는다.
-   Short Viewport를 별도로 확인한다.
-   Hover 기능은 Touch / Keyboard 대체 경로를 제공한다.
-   200% Zoom을 확인한다.
-   Mobile에서 복잡한 3D / Character 조작을 강제하지 않는다.

Real World 외 화면의 구체적인 Responsive Layout은 디자인 확정 전 임의로
확정하지 않는다.

------------------------------------------------------------------------

## 14. Accessibility

선택 사항이 아니다.

-   Semantic HTML
-   `button` / `a` 역할 구분
-   Keyboard Navigation
-   `focus-visible`
-   충분한 Contrast
-   Touch Target 약 44×44px 이상
-   의미 있는 Image Alt
-   Color만으로 State 전달 금지
-   Reduced Motion
-   Skip Cinematic
-   Direct Content Access
-   200% Zoom

Motion을 줄이거나 3D가 없어도 동일한 핵심 정보에 접근할 수 있어야 한다.

------------------------------------------------------------------------

## 15. Asset Failure / Fallback

고급 Asset이 실패해도 Portfolio가 멈추면 안 된다.

``` text
Video Failure
→ Poster / Static Layer

WebGL / Three.js Failure
→ Static World + HTML Navigation

Character Motion Failure
→ Static Character

Audio Failure
→ Silent Mode

Ambient Failure
→ 해당 Ambient만 제거

Image Failure
→ Fallback Surface + Alt

Transition Failure
→ Immediate Route

Loading Failure
→ Skip / Direct Access
```

Asset 실패를 이유로 Project / Contact / Navigation 접근을 막지 않는다.

가짜 Loading `%`를 생성하지 않는다.

------------------------------------------------------------------------

## 16. Performance

Asset-heavy 프로젝트이므로 성능을 기능으로 취급한다.

-   WebP / AVIF 우선
-   Video는 WebM 우선
-   3D는 GLB 우선
-   필요한 Asset만 Preload
-   Route / Scene Lazy Loading
-   Offscreen Motion Pause
-   Offscreen Video Pause
-   Particle 제한
-   Animation Cleanup
-   Mobile Quality Reduction
-   Layout Shift 최소화

목표:

-   LCP ≤ 2.5s
-   INP ≤ 200ms
-   CLS ≤ 0.1

------------------------------------------------------------------------

## 17. Dependency 규칙

새 Package 설치 전에:

1.  `package.json` 확인
2.  기존 Dependency로 가능한지 검토
3.  설치 이유 확인
4.  Bundle / Maintenance 영향 확인

사용자 요청 없이:

-   Framework 변경 금지
-   State Library 추가 금지
-   Animation Library 중복 추가 금지
-   기존 Dependency 삭제 금지

------------------------------------------------------------------------

## 18. Git 안전 규칙

작업 전:

``` bash
git status
git branch --show-current
```

사용자 승인 없이 다음을 실행하지 않는다.

-   `git reset --hard`
-   `git clean`
-   Force Push
-   Rebase
-   Branch 삭제
-   Commit History 변경
-   사용자 작업 되돌리기

------------------------------------------------------------------------

## 19. 검증

작업 후 실제 `package.json` Script를 기준으로 검증한다.

기본:

``` bash
npm run lint
npm run build
```

필요 시:

``` bash
npm run dev
npm run preview
```

추가 확인:

-   Console Error
-   Broken Import
-   Asset Path
-   Font Loading
-   Direct URL
-   Browser Back
-   Refresh
-   Keyboard
-   Reduced Motion
-   Responsive
-   Mobile
-   Short Viewport
-   200% Zoom

실행하지 않은 검증을 통과했다고 보고하지 않는다.

------------------------------------------------------------------------

## 20. 반복 문제 처리

같은 문제가 반복되면 같은 Patch만 반복하지 않는다.

예:

-   Asset Path 오류 반복
-   동일 Responsive 깨짐 반복
-   Motion Cleanup 오류 반복
-   Scene Transition 오류 반복
-   Route State 오류 반복

이 경우:

1.  Root Cause 확인
2.  공통 Component / Hook / Utility 필요성 검토
3.  구조 개선 범위 확인
4.  사용자 요청 범위 안에서 수정

------------------------------------------------------------------------

## 21. PROJECT_CONTEXT 업데이트

다음과 같은 중요한 변경이 있을 때만 갱신한다.

-   Route 변경
-   Scene / Page Architecture 변경
-   주요 구현 완료
-   Asset Strategy 변경
-   LOCKED Decision 변경
-   주요 Known Issue
-   실제 검증 결과

계획된 기능을 완료로 기록하지 않는다.

WORKING 디자인을 확정된 것으로 기록하지 않는다.

사소한 CSS 수정마다 갱신하지 않는다.

------------------------------------------------------------------------

## 22. 완료 보고 형식

작업 완료 후 다음 순서로 간결하게 보고한다.

### 변경 파일

실제로 수정한 파일.

### 구현 내용

실제로 구현한 기능.

### 유지한 구조

건드리지 않고 유지한 기존 구조.

### Decision 영향

LOCKED / WORKING에 영향을 준 부분.

### 검증

실제로 실행한 명령과 결과.

### 확인한 Viewport

실제로 테스트한 화면 크기.

### 남은 문제

미완료 / 미검증 / 추가 확인 항목.

완료하지 않은 작업을 완료했다고 보고하지 않는다.

------------------------------------------------------------------------

## 23. 최종 판단 기준

Claude Code는 더 화려한 결과보다 다음을 우선한다.

**Content → Navigation → Usability → Recovery → Responsive →
Accessibility → Performance → Motion → Decoration**

가장 중요한 규칙:

> **AGENTS.md를 따른다. LOCKED는 지킨다. WORKING은 확정하지 않는다. 기존
> 코드를 먼저 확인하고 필요한 범위만 수정한다.**
