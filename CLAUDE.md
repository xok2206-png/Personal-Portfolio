# Personal Portfolio — CLAUDE.md

@AGENTS.md

> Claude Code 전용 실행 규칙  
> 이 문서는 `AGENTS.md`를 보완하며, 충돌 시 `AGENTS.md`를 우선한다.

---

## 01. 작업 시작 순서

Claude Code는 작업을 시작하기 전에 다음 순서로 확인한다.

1. `AGENTS.md`
2. `Personal-Portfolio_PRD_v2.md`
3. 최신 `DESIGN_SYSTEM*.md`
4. `PROJECT_CONTEXT.md`
5. 관련 `.agents/skills/.../SKILL.md`
6. `package.json`
7. 관련 Route / Scene / Page / CSS / Asset
8. `git status`
9. 현재 Branch

단일 파일의 아주 작은 수정은 불필요하게 장황한 계획을 만들지 않는다.

여러 파일, Route, Scene, Asset, Motion System을 함께 수정해야 하는 경우에는
먼저 짧은 계획을 작성한다.

계획에는 다음을 포함한다.

- 수정할 파일
- 유지할 기존 구조
- 구현 목표
- 재사용할 Component / Pattern / Asset
- 필요한 새 Asset
- 검증 방법
- 예상 위험 요소

---

## 02. 먼저 분석하고, 바로 갈아엎지 않는다

기존 프로젝트는 이미 React + Vite와 `react-router-dom` 구조로 작업 중이다.

따라서 새로운 작업을 시작할 때:

- 기존 코드를 먼저 읽는다.
- 현재 Route를 확인한다.
- 현재 Scene / Page 역할을 확인한다.
- 기존 CSS와 Asset을 확인한다.
- 동일 기능이 이미 존재하는지 확인한다.
- 실제 브라우저 동작을 확인할 수 있으면 먼저 확인한다.

사용자 요청 없이 다음을 하지 않는다.

- `src/` 전체 재작성
- Router 전체 교체
- Scene/Page 구조 전면 변경
- 기존 콘텐츠 삭제
- Project Data 삭제
- Asset 대량 삭제
- 기존 구현을 전부 새 방식으로 교체

"더 깔끔해 보인다"는 이유만으로 정상 동작 코드를 전면 재작성하지 않는다.

---

## 03. 콘텐츠와 표현 방식을 구분한다

### 콘텐츠는 LOCKED

다음은 사용자가 명시적으로 변경하지 않는 한 임의 변경하지 않는다.

- 실제 Project 정보
- Project 4개 구조
- About / Skills / Projects / Q&A / Contact의 핵심 정보
- 실제 Role / Process / Result / Limitation
- Resume / Contact 정보
- Case Study의 사실 관계
- Product Validation Criteria

콘텐츠가 부족하다고 판단해도 임의로 내용을 만들어 채우지 않는다.

### 디자인·모션은 FLEXIBLE

다음은 실제 구현 결과를 보며 수정할 수 있다.

- Layout
- Composition
- Camera
- Animation
- Motion timing
- Interaction
- Hover
- FX
- Lighting intensity
- Parallax
- Transition
- Responsive composition

`DESIGN_SYSTEM`은 현재 기준선이지 절대 불변의 정답지가 아니다.

실제 화면에서 더 나은 사용성, 가독성, 성능, 조작성을 만들 수 있다면
디자인/모션 값은 조정할 수 있다.

주요 기준을 바꾸는 경우:

1. 현재 문제를 설명
2. 변경 이유를 설명
3. 영향 범위를 설명
4. 최소 변경으로 구현
5. 브라우저에서 검증
6. 필요 시 Design System 갱신 제안

---

## 04. 구현 판단의 우선순위

애매한 선택이 생기면 다음 순서를 따른다.

**Content → Navigation → Control → Recovery → Responsive → Accessibility → Performance → Motion → Decoration**

예:

- Camera 연출 때문에 Project Title이 가려짐 → Camera를 수정
- Ambient Motion 때문에 프레임 저하 → Ambient를 줄임
- 게임 조작 때문에 Contact 접근이 늦어짐 → Direct Access 제공
- 포털 영상이 실패함 → Static Fallback으로 진행

---

## 05. 8대 검증 기준

주요 작업 완료 전 아래를 확인한다.

### 첫인상
처음 본 사용자가 이름·직무·핵심 강점을 빠르게 이해할 수 있는가?

### 탐색
게임을 하지 않아도 Project 4개와 Contact/Resume을 찾을 수 있는가?

### 콘텐츠
Project 하나를 본 뒤 역할·문제·주요 결정·구현 내용을 이해할 수 있는가?

### 조작
설명을 길게 읽지 않아도 이동·점프·아이템 획득·진입이 가능한가?

### 복구
Auto Move 취소, Skip, Browser Back, Reload 뒤에도 정상 상태인가?

### 반응형
짧은 노트북, Tablet, Mobile, 확대 화면에서도 핵심 UI가 유지되는가?

### Asset Failure
Video / FX / Audio가 실패해도 콘텐츠와 다음 행동이 남아 있는가?

### 접근성
Keyboard / Reduced Motion / Motion Pause에서도 동일한 정보와 기능에 접근 가능한가?

작업이 위 기준 중 무엇을 개선하는지 설명할 수 없다면 우선순위를 낮춘다.

---

## 06. Scene / Page 구조

현재 프로젝트는 `src/scenes/`와 `src/pages/`의 역할을 분리한다.

### `src/scenes/`
게임 연출, Player, World, Transition 중심.

### `src/pages/`
실제 Portfolio Information / Content 중심.

Scene과 Page를 임의로 합치지 않는다.

같은 콘텐츠가 필요하면 Page 또는 Data를 재사용하고,
Scene에서는 연출과 상호작용을 담당한다.

---

## 07. Router 작업

React Router는 URL과 탐색 안정성을 담당한다.

Claude Code는 다음을 항상 보호한다.

- 직접 URL 접근
- 새로고침
- Browser Back
- Browser Forward
- Quick View
- Reduced Motion
- Error Recovery

Route 변경 전에 긴 Animation이 반드시 끝나야만 이동되는 구조를 만들지 않는다.

게임 연출은 Route를 보조해야지 Route 안정성을 깨면 안 된다.

---

## 08. Player 작업

Player는 장식이 아니다.

Player 관련 구현 시 다음을 구분한다.

### Gameplay Motion
- Idle
- Walk
- Run
- Jump
- Fall
- Land
- Interact
- Pickup

즉각적인 입력 반응이 중요하다.

### Cinematic Motion
- Portal Resist
- Portal Pull
- Transformation
- Arrival
- Stage Clear
- Ending

Cinematic 중에는 필요 시 Player Control을 잠그되,
끝난 뒤 반드시 Control을 반환한다.

### 입력 우선순위

- Auto Move 중 직접 이동 입력 → Auto Move 취소
- Dialog / Adventure Book / Info Panel → Player Input 잠금
- Jump / Pickup / Land 중 → 장식성 Look/Hover 반응 억제
- 목적지 연속 선택 → 마지막 유효 목적지 우선
- Skip / Error → Player/Camera Lock 해제

---

## 09. Motion 구현 규칙

Motion은 목적이 있어야 한다.

### 구현 도구 우선순위

1. CSS
   - 간단한 hover
   - transition
   - loop
   - transform
   - opacity

2. Framer Motion
   - Component-level motion
   - UI enter/exit
   - 상태 기반 motion

3. GSAP
   - 복잡한 timeline
   - Scene transition
   - Camera-like sequence
   - scroll-driven animation

4. ScrollTrigger
   - 실제 Scroll과 Scene 진행이 연결될 때만

동일한 Motion을 여러 라이브러리로 중복 구현하지 않는다.

### Motion 강도

강한 Motion은 기본적으로:

- 1 Primary
- 최대 2 Secondary

Portal / Power Up / Stage Clear 중에는 Ambient를 줄인다.

### 수정 가능성

Motion timing / Easing / Camera / Hover / FX는 실제 화면을 보며 조정 가능하다.

---

## 10. Living World 구현 규칙

Living World는 핵심이지만 화면을 산만하게 만들면 안 된다.

기본 예:

- Cloud
- Grass
- Water
- Waterfall
- Flag
- Light
- Character Idle

Ambient Event 예:

- Bird
- Leaf
- Cloud Shadow
- Sparkle

모든 요소를 같은 속도와 같은 진폭으로 반복하지 않는다.

사용자가 Reduced Motion / Motion Pause를 선택하면:

- Parallax 감소
- Floating 감소
- Camera Shake 제거
- 반복 Particle 감소
- 장식성 Motion 정지 가능

핵심 Navigation과 Player Feedback은 유지한다.

---

## 11. Design System 사용

최신 `DESIGN_SYSTEM*.md`를 기본 기준으로 사용한다.

다음 Token은 임의 생성하지 않는다.

- Color
- Typography
- Spacing
- Radius
- Border
- Shadow
- Z-index

새 값이 정말 필요하면 이유를 먼저 설명한다.

단, Design System은 Working System이다.

실제 구현 결과가 좋지 않으면 디자인 값이나 Motion을 수정할 수 있으며,
콘텐츠를 바꾸는 대신 표현 방식을 개선한다.

---

## 12. Asset 작업

새 Asset을 만들기 전에 기존 Asset을 확인한다.

Higgsfield / AI Asset 사용 시 확인:

- Character identity
- Proportion
- Perspective
- Lighting
- Material
- Shadow
- Color
- Background transparency
- Loop quality
- Browser playback
- Layer separation

완성 이미지 한 장을 Interactive Scene 전체로 사용하지 않는다.

가능하면 다음을 분리한다.

- Background
- Environment
- Player
- Prop
- FX
- UI

---

## 13. Asset Failure 대응

고급 Asset이 없어도 페이지가 동작해야 한다.

- Video 실패 → Poster / Static Layer
- Transparent Motion 실패 → Static Character / Prop
- Audio 실패 → Silent Mode
- Ambient 실패 → Ambient만 제거
- Image 실패 → Fallback Surface / Alt
- Progress 저장 실패 → 콘텐츠 잠금 금지

Asset 실패를 이유로 Route나 Contact 접근을 막지 않는다.

---

## 14. Responsive 구현

Primary World Reference는 `1440×810 / 16:9`.

반응형은 단순 Scale이 아니라 Camera Reframe을 사용한다.

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

Game Scene과 Information Scene은 다른 Responsive 전략을 사용할 수 있다.

Mobile은 Desktop 화면을 단순 축소하지 않는다.

---

## 15. 접근성

다음은 선택 사항이 아니다.

- Semantic HTML
- button / a 역할 구분
- Keyboard Navigation
- focus-visible
- 충분한 Contrast
- Touch Target 약 44×44px 이상
- 의미 있는 이미지 Alt
- 색상만으로 상태 전달 금지
- Sound Toggle
- Reduced Motion
- Motion Pause / Stop
- Skip Intro
- Skip Cinematic
- Quick View

Hover에만 핵심 정보를 숨기지 않는다.

---

## 16. Performance

Asset-heavy 프로젝트이므로 작업 중 성능을 계속 확인한다.

- WebP / AVIF 우선
- 필요한 Video는 WebM 검토
- 불필요한 4K PNG 금지
- Lazy Loading
- Scene별 Asset Preload
- Route Code Splitting 검토
- Offscreen Motion Pause
- Offscreen Video Pause
- Particle 제한
- Cleanup
- Mobile Quality Reduction

목표:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

단, 실제 Gameplay 입력 반응은 별도로 확인한다.

---

## 17. Prototype Gate

대규모 Asset 제작 전에 최소 Gameplay Prototype을 먼저 검증한다.

필수:

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

검증 항목:

- Character Scale
- Ground Contact
- Animation Transition
- Input Response
- Collision
- Loop
- Asset Consistency
- Short Viewport
- Mobile 가능성

Prototype이 불안정한데 대규모 Asset부터 생성하지 않는다.

---

## 18. 삭제된 Scope

다음 기능은 다시 추가하지 않는다.

- 숨겨진 섬 / Secret Area
- Companion / 동료
- Player Badge 장착
- Skill Level
- 의미 없는 HP
- 의미 없는 Life
- 의미 없는 Score

필요해 보이더라도 사용자 승인 없이 복원하지 않는다.

---

## 19. Dependency 규칙

새 Package 설치 전에:

1. `package.json` 확인
2. 기존 Dependency로 가능한지 검토
3. 설치 필요 이유 설명
4. Bundle 영향 검토

요청 없이:

- Framework 변경 금지
- State Library 추가 금지
- Animation Library 중복 추가 금지
- Dependency 삭제 금지

---

## 20. Git 안전 규칙

작업 전:

```bash
git status
git branch --show-current
```

파괴적 작업 금지:

- `git reset --hard`
- `git clean`
- Force Push
- Rebase
- Branch 삭제
- Commit History 변경

사용자의 명시적 승인 없이 실행하지 않는다.

---

## 21. 검증

작업 후 실제 `package.json` script를 기준으로 검증한다.

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

추가 확인:

- Console Error
- Broken Import
- Asset Path
- Font Loading
- Route Direct Access
- Browser Back
- Refresh
- Keyboard
- Reduced Motion
- Mobile
- Short Viewport

실행하지 않은 검증을 통과했다고 보고하지 않는다.

---

## 22. PROJECT_CONTEXT 업데이트

작업 완료 후 무조건 모든 사소한 내용을 기록하지 않는다.

다음과 같은 중요한 변경이 있을 때 갱신한다.

- Route 변경
- Scene 완료
- Player System 변경
- Asset Strategy 변경
- 주요 Design Decision
- 주요 Known Issue
- 검증 결과

`PROJECT_CONTEXT.md`에는 실제 구현된 상태만 기록한다.

계획된 기능을 완료된 기능처럼 기록하지 않는다.

---

## 23. 반복 문제 처리

같은 문제가 반복되면 같은 Patch만 반복하지 않는다.

예:

- Asset path 오류 반복
- Player state 충돌 반복
- 동일 Responsive 깨짐 반복
- Motion cleanup 오류 반복
- Scene Transition 오류 반복

이 경우:

1. Root Cause 확인
2. 공통 Component / Hook / Utility 필요성 검토
3. Skill 또는 Rule 보완 제안
4. 사용자 승인 후 구조 개선

---

## 24. 완료 보고 형식

작업 완료 후 아래 순서로 간결하게 보고한다.

### 변경 파일
실제로 수정한 파일

### 구현 내용
실제로 구현한 기능

### 유지한 구조
건드리지 않고 유지한 기존 구조

### 디자인 / 모션 조정
작업 중 변경한 표현 방식과 이유

### 검증
실제로 실행한 명령과 결과

### 확인한 Viewport
실제로 테스트한 화면 크기

### 남은 문제
미완료 / 미검증 / 추가 확인 필요 항목

---

## 25. 최종 판단 기준

Claude Code는 “더 화려한 결과”보다 다음을 우선한다.

**명확한 콘텐츠 → 쉬운 탐색 → 안정적인 조작 → 복구 가능성 → 반응형 → 접근성 → 성능 → 모션 → 장식**

사용성을 해치지 않는 범위에서
**Player + Living World + Journey**를 적극적으로 구현한다.
