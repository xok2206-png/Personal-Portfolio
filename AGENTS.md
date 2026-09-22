# Personal Portfolio — AGENTS.md

> AI Coding Agent 공통 작업 규칙  
> 대상: Claude Code, Codex 및 기타 코드 에이전트  
> 프로젝트: React + Vite 기반 Playable Interactive Personal Portfolio

---

## 01. 프로젝트 목적

이 프로젝트의 목표는 단순히 게임처럼 보이는 웹사이트를 만드는 것이 아니다.

**디자인 의도를 이해하고, 직접 조작 가능한 반응형 웹 경험으로 구현할 수 있는 역량을 포트폴리오 자체로 증명하는 것**이 목적이다.

AI Agent는 항상 다음 우선순위를 지킨다.

1. 포트폴리오 콘텐츠 전달
2. 사용자의 탐색 가능성
3. 조작 명확성
4. 반응형 / 접근성 / 복구 가능성
5. 게임 인터랙션
6. 시각적 장식

게임 연출이 프로젝트 정보 전달을 방해하면 정보 전달을 우선한다.

---

## 02. Source of Truth

작업 전 관련 문서를 반드시 확인한다.

### 문서 역할

- `Personal-Portfolio_PRD_v2.md`
  - 무엇을 만들 것인지
  - Scene / 기능 / 사용자 흐름 / 완료 조건

- `DESIGN_SYSTEM.md` 또는 최신 Design System 문서
  - Color / Typography / Grid / Motion / Player / Camera / Interaction의 현재 기준
  - 단, 디자인·애니메이션·모션·인터랙션 관련 값은 Working Guideline이며 작업 중 개선 가능

- `PROJECT_CONTEXT.md`
  - 현재 실제 구현 상태
  - 완료된 작업
  - 진행 중인 작업
  - 남은 문제
  - 마지막 검증 결과

- `AGENTS.md`
  - 모든 AI Agent가 공통으로 지켜야 할 규칙

- `CLAUDE.md`
  - Claude Code 전용 추가 규칙

- `.agents/skills/.../SKILL.md`
  - 반복 작업의 실행 절차와 구현 Workflow

- `README.md`
  - 외부 공개용 프로젝트 설명

문서와 실제 코드가 충돌하면 임의로 하나를 선택하지 않는다.
현재 구현 상태를 먼저 확인하고 충돌 내용을 보고한 뒤 최소 변경 방향을 제안한다.

---

## 03. LOCKED vs FLEXIBLE

이 프로젝트에서 가장 중요한 구분이다.

### LOCKED — 임의 변경 금지

다음은 명시적인 사용자 요청이 없는 한 유지한다.

- 포트폴리오의 핵심 목적
- 실제 프로젝트 콘텐츠
- 프로젝트 4개 구조
- About / Skills / Projects / Q&A / Contact의 핵심 정보
- Project Case Study의 실제 사실
- 사용자의 실제 Role / Process / Result / Limitation
- Quick View를 통한 직접 접근 원칙
- 게임을 하지 않아도 핵심 콘텐츠에 접근 가능한 구조
- Accessibility / Responsive / Fallback 요구사항
- Product Validation Criteria
- React + Vite 기반 프로젝트
- 기존 `src/scenes/` + `src/pages/`의 역할 분리 원칙
- React Router 기반 URL 구조를 사용한다는 원칙

### FLEXIBLE / ITERATIVE — 작업 중 수정 가능

다음은 실제 브라우저 결과와 구현 품질을 보며 조정할 수 있다.

- 화면 Composition
- Layout 세부 배치
- Color의 미세 조정
- Typography의 미세 조정
- Animation
- Motion timing
- Motion intensity
- Hover / Pressed 반응
- Player animation 연결 방식
- Camera behavior
- Parallax
- Scene transition
- FX
- Ambient event
- Lighting 강도
- Responsive composition
- Scene별 interaction pattern

`DESIGN_SYSTEM.md`의 수치는 기본 기준값이며 모든 값을 절대 불변으로 취급하지 않는다.

변경이 더 나은 사용성·가독성·성능·반응형 결과를 만든다면 변경 가능하다.
단, 주요 기준을 바꿀 경우 이유와 영향을 먼저 설명한다.

---

## 04. 절대 재추가하지 않을 삭제 범위

다음 기능은 현재 Scope에서 삭제 확정이다.

- 숨겨진 섬 / Secret Area
- Companion / 동료 캐릭터 시스템
- Player 외형에 Badge를 누적 장착하는 시스템
- `FIGMA Lv.5` 같은 Skill 숙련도 Level 표시
- 의미 없는 HP
- 의미 없는 Life
- 의미 없는 Score
- 실제 포트폴리오와 관련 없는 Gamification

Skill은 숫자 Level이 아니라 다음으로 설명한다.

- 무엇을 할 수 있는가
- 실제 어떤 Project에서 사용했는가
- 어떤 결과물에 적용했는가

---

## 05. 핵심 Experience Principles

### PLAYER

캐릭터는 장식이 아니라 Player Avatar다.

World에서 캐릭터를 단순 이미지처럼 배치하지 않는다.
사용자가 이동·점프·상호작용할 수 있는 Scene에서는 실제 Player State를 사용한다.

### LIVING WORLD

기본 Game Scene은 살아 움직여야 한다.

예:

- Cloud
- Grass
- Water
- Waterfall
- Flag
- Light
- Character Idle
- 일부 Ambient Event

그러나 모든 요소를 동시에 크게 움직이지 않는다.

### DEPTH

한 장짜리 완성 배경 이미지 또는 영상으로 전체 Scene을 해결하지 않는다.

가능한 경우 다음을 분리한다.

- Sky
- Far Background
- Main World
- Gameplay
- Player
- Foreground
- FX
- UI

### JOURNEY

주요 Navigation은 가능하면 다음 흐름을 사용한다.

`선택 → Player 반응 → 이동 → World 반응 → Transition → Route`

단 다음 상황은 예외다.

- Quick View
- Direct Link
- Browser Back
- Reduced Motion
- Error Recovery
- Revisit Fast Mode

이 경우 긴 연출을 강제하지 않는다.

---

## 06. Portfolio First

게임보다 Portfolio가 우선이다.

Project Case Study에서는 다음 정보가 명확해야 한다.

- Problem
- Role
- Decision
- Implementation
- Result 또는 Limitation

Stage Clear는 사용자가 콘텐츠를 확인했다는 UX Feedback이다.
실제 프로젝트 성과나 사용성 검증 결과처럼 표현하지 않는다.

실제 근거가 없는 다음 내용은 생성하지 않는다.

- 성과 수치
- 사용자 테스트 결과
- 퍼센트 개선
- 매출 증가
- 전환율 증가
- 허위 사용 후기
- 허위 협업 정보

---

## 07. Product Validation Criteria

모든 주요 구현은 다음 8개 기준으로 검토한다.

| 영역 | 반드시 확인할 질문 |
|---|---|
| 첫인상 | 처음 본 사람이 이름·직무·핵심 강점을 설명할 수 있는가? |
| 탐색 | 게임을 하지 않고도 프로젝트 4개와 Contact/Resume을 찾을 수 있는가? |
| 콘텐츠 | 프로젝트 하나를 본 뒤 역할·문제·주요 결정·구현 내용을 설명할 수 있는가? |
| 조작 | 긴 설명 없이 이동·점프·아이템 획득·진입을 이해할 수 있는가? |
| 복구 | Auto Move 취소·Skip·뒤로가기·새로고침 뒤에도 정상 상태인가? |
| 반응형 | 짧은 노트북·Tablet·Mobile·확대 화면에서 핵심 UI가 유지되는가? |
| 에셋 실패 | 영상/FX가 실패해도 콘텐츠·Navigation·다음 행동이 남아 있는가? |
| 접근성 | Keyboard·Reduced Motion·Motion Pause에서도 동일 정보와 기능에 접근 가능한가? |

새 기능을 추가할 때 위 기준 중 무엇을 개선하는지 설명할 수 없다면 우선순위를 낮춘다.

---

## 08. 작업 전 필수 확인

작업을 시작하기 전에 다음을 확인한다.

1. `git status`
2. 현재 Branch
3. 관련 Route
4. 관련 Scene / Page
5. 실제 사용 중인 Component
6. 기존 CSS
7. 실제 Asset
8. `package.json`
9. 관련 문서
10. 현재 브라우저 구현 상태

존재하지 않는 파일·Component·Asset·Library를 있다고 가정하지 않는다.

미커밋 변경사항이 존재하고 작업 범위와 충돌할 가능성이 있으면 먼저 보고한다.

---

## 09. 코드 변경 원칙

### 기존 코드 우선

새로 만들기 전에 항상 다음을 확인한다.

- 기존 Component 재사용 가능 여부
- 기존 Hook
- 기존 Utility
- 기존 Data
- 기존 CSS
- 기존 Asset
- 기존 Router

### 대량 재작성 금지

사용자가 명시적으로 요청하지 않는 한:

- `src/` 전체 삭제 금지
- Router 전체 재작성 금지
- 기존 콘텐츠 삭제 금지
- 기존 Project Data 삭제 금지
- 기존 Asset 대량 삭제 금지
- 기존 페이지 전체 교체 금지

### 최소 변경

문제를 해결하는 데 필요한 범위만 수정한다.

관련 없는 Refactor를 같은 작업에 섞지 않는다.

---

## 10. Scene / Page 구조

현재 프로젝트는 다음 개념을 구분한다.

### `src/scenes/`

게임 연출과 Scene Experience.

예:

- Start / Real World
- Character
- Power Up
- World Map
- Enter World
- Mission
- Stage Clear
- Ending

### `src/pages/`

실제 Portfolio Information / Content.

예:

- About
- Skills
- Projects
- Q&A
- Contact

Scene과 Page의 역할을 임의로 합치지 않는다.

필요한 경우 하나의 Scene에서 Page Content를 재사용한다.

---

## 11. Router 규칙

React Router는 기술적인 URL 구조다.

사용자는 Route 변경을 가능한 경우 공간 이동처럼 경험한다.

그러나 Router 자체를 게임 연출에 종속시키지 않는다.

다음은 반드시 가능해야 한다.

- 직접 URL 접근
- 새로고침
- Browser Back
- Browser Forward
- Quick View
- Reduced Motion
- Error Recovery

Route 변경 전에 긴 Animation이 필수 조건이 되어서는 안 된다.

---

## 12. Player Interaction

Desktop 기본:

- WASD / 방향키 → 자유 이동
- Space → Jump가 필요한 Gameplay Scene에서만 사용
- Mouse / Point & Click → 목적지 선택
- 목적지 선택 → Auto Path 가능

### Input Priority

- Auto Move 중 직접 이동 입력 → Auto Move 취소
- Dialog / Adventure Book / Information UI 활성 중 → UI 입력 우선
- Jump / Pickup / Land 중 → 장식성 Player Look 억제
- 연속 목적지 클릭 → 마지막 유효 목적지를 우선
- Cinematic Skip → Player/Camera Lock 해제
- Error → 안전 State로 복구

조작 방식은 Scene 목적에 따라 단순화할 수 있다.

---

## 13. Motion / Animation

Motion은 목적이 있어야 한다.

### 우선순위

1. Player
2. Current Objective
3. World
4. Ambient

한 순간에 강한 Motion은 기본적으로:

- 1 Primary
- 최대 2 Secondary

Power Up / Stage Clear / Portal 같은 강한 Event 중에는 Ambient를 줄인다.

### Motion 변경 가능성

Animation timing, Easing, Camera, Hover, FX는 작업 중 수정 가능하다.

실제 화면에서 다음 문제가 발생하면 Design System보다 구현 결과를 우선해 조정한다.

- 너무 느림
- 너무 빠름
- 산만함
- 콘텐츠를 가림
- 조작 반응이 늦음
- Motion sickness 가능성
- Mobile 성능 저하

---

## 14. Design System 적용 규칙

최신 `DESIGN_SYSTEM` 문서를 기본 기준으로 사용한다.

다음은 기본적으로 따른다.

- Typography Roles
- Color Token
- Spacing
- Radius
- Border
- Shadow
- Grid
- Safe Area
- Layer
- Z-index
- Motion Level
- Accessibility

그러나 디자인·애니메이션·모션·인터랙션은 Working System이다.

실제 구현 중 수정이 필요한 경우:

1. 문제를 확인
2. 변경 이유 설명
3. 영향 범위 확인
4. 변경
5. 브라우저 검증
6. 필요 시 Design System 문서 갱신

---

## 15. Asset 규칙

Asset을 사용하기 전에 실제 파일을 확인한다.

임의 Placeholder, 임의 Image URL, 존재하지 않는 Icon을 사용하지 않는다.

AI / Higgsfield Asset은 다음을 검토한다.

- Color 일관성
- Lighting Direction
- Material
- Camera / Perspective
- Character Proportion
- Shadow Softness
- World Scale
- Layer 분리 가능성
- Loop 자연스러움
- Transparency / Background
- Browser 재생 가능성

`AI 이미지 한 장 = Scene 완성`으로 판단하지 않는다.

---

## 16. Asset Failure / Fallback

고급 Asset이 실패해도 Portfolio가 멈추면 안 된다.

- Video 실패 → Poster / Static Layer
- Transparent Motion 실패 → Static Player / Prop
- Ambient 실패 → Ambient만 생략
- Audio 실패 → 무음 진행
- Image 실패 → Fallback Surface + Alt
- Progress 저장 실패 → 콘텐츠를 잠그지 않음
- Loading 실패 → Quick View / Skip 제공

가짜 Loading `%`를 생성하지 않는다.

---

## 17. Responsive

Primary World Reference:

**1440 × 810 / 16:9**

단순 Scale이 아니라 **Camera Reframe**을 사용한다.

반드시 확인할 대표 환경:

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

Game Scene과 Information Scene의 Responsive 전략은 달라도 된다.

Mobile은 Desktop의 축소판으로 만들지 않는다.

---

## 18. Accessibility

반드시 지원한다.

- Semantic HTML
- Keyboard Navigation
- Visible Focus
- Touch Target 약 44×44px 이상
- 색상만으로 State 표현 금지
- 의미 있는 이미지 Alt
- Sound Toggle
- `prefers-reduced-motion`
- Motion Pause / Stop
- Skip Intro
- Skip Cinematic
- Quick View
- Adventure Book Direct Navigation

Motion을 줄이거나 꺼도 동일 콘텐츠에 접근할 수 있어야 한다.

---

## 19. Performance

Asset-heavy Portfolio이므로 성능을 기능으로 취급한다.

기본 원칙:

- WebP / AVIF 우선
- Video는 필요한 경우 WebM
- 불필요한 4K PNG 금지
- Scene 단위 Lazy Load
- Route 단위 Code Splitting 검토
- 필요한 Asset만 Preload
- Offscreen Animation Pause
- Offscreen Video Pause
- Particle 제한
- Animation Cleanup
- Mobile Quality Reduction

목표:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

실제 Player 입력 반응은 Core Web Vitals와 별도로 확인한다.

---

## 20. Prototype Gate

대규모 World/Asset 제작 전에 작은 Gameplay Prototype을 먼저 통과한다.

필수 Prototype:

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

검증:

- Character scale 일관성
- Ground contact
- Animation transition
- Input response
- Collision 안정성
- Loop 자연스러움
- Asset quality
- Mobile / Short viewport 가능성

Prototype이 불안정하면 대규모 Asset 제작을 먼저 진행하지 않는다.

---

## 21. Dependency 규칙

새 Package를 설치하기 전:

1. 기존 `package.json` 확인
2. 현재 Package로 해결 가능한지 검토
3. Package 추가 이유 설명
4. Bundle / Maintenance 영향 확인

동일 기능을 여러 Animation Library로 중복 구현하지 않는다.

사용자 승인 없이 대규모 Framework 변경 금지.

---

## 22. Git 규칙

작업 전:

```bash
git status
git branch --show-current
```

작업 후:

```bash
npm run lint
npm run build
git status
```

사용자의 명시적 요청 없이:

- 강제 Reset 금지
- Rebase 금지
- Force Push 금지
- 다른 Branch 삭제 금지
- 기존 Commit History 변경 금지

---

## 23. 검증 후 보고 형식

작업 완료 후 간단하게 다음을 보고한다.

1. 변경한 파일
2. 구현한 내용
3. 유지한 기존 구조
4. 디자인/인터랙션에서 조정한 부분
5. Lint 결과
6. Build 결과
7. 실제 확인한 Viewport
8. 확인하지 못한 부분
9. 남은 문제

완료하지 않은 작업을 완료했다고 보고하지 않는다.

---

## 24. 프로젝트 문서 업데이트

`PROJECT_CONTEXT.md`는 실제 구현 상태만 기록한다.

계획된 기능을 구현 완료로 기록하지 않는다.

다음과 같은 중요한 변경이 있을 때만 갱신한다.

- Route 변경
- Scene 완료
- 주요 Player System 변경
- Asset Strategy 변경
- 중요한 Design Decision 변경
- 검증 결과
- 알려진 문제

사소한 CSS 수정마다 Context를 과도하게 업데이트하지 않는다.

---

## 25. 금지 사항

- 존재하지 않는 Asset을 있다고 가정
- 사용자 요청 없이 콘텐츠 변경
- 실제 근거 없는 Portfolio 내용 생성
- Skill Level 자가평가
- 숨겨진 섬 재추가
- Companion 재추가
- Badge 장착 시스템 재추가
- 의미 없는 Game Score/HP/Life 추가
- 모든 화면에 같은 Motion 적용
- 모든 Hover에 Scale + Glow + Particle 적용
- 단일 배경 이미지/영상으로 전체 Interactive Scene 대체
- 게임 때문에 Project 콘텐츠를 읽기 어렵게 만들기
- Responsive를 단순 축소로 해결
- 접근성 기능 제거
- 에셋 실패 시 전체 Navigation 중단
- 확인 없이 대량 파일 삭제
- 관련 없는 코드 전면 재작성

---

## 26. 최종 판단 원칙

애매한 선택이 생기면 다음 순서로 판단한다.

**Content → Navigation → Control → Recovery → Responsive → Accessibility → Performance → Motion → Decoration**

예쁜 연출과 명확한 사용성이 충돌하면 명확한 사용성을 선택한다.

단, 사용성을 해치지 않는 범위에서는 이 프로젝트의 핵심인
**Player + Living World + Journey** 경험을 적극적으로 살린다.
