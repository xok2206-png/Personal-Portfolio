# Personal Portfolio --- PRD v4 FINAL

> Product Requirements Document\
> Platform: Responsive Web\
> Stack: React + Vite\
> Concept: **Cinematic Interactive Personal Portfolio**\
> Status: FINAL product baseline\
> Visual/UI 기준: `DESIGN_SYSTEM.md`

## 2026-09-30 공통 아트 제작 기준 반영 범위

World / About / Skills / Projects / Contact는 회화적 색면, 무광 중심
재질, 주요 대상에 집중한 디테일, 캐릭터·배경·오브젝트의 일관된 명암을
공유한다. 제작 순서와 검수 기준의 단일 기준은
[DESIGN_SYSTEM.md의 01.1 Portfolio World 공통 아트 제작 기준](DESIGN_SYSTEM.md)이다.
Real World의 실사 작업실 방향과 실제 포트폴리오 정보는 유지한다.

이번 반영은 에셋의 공통 표현 기준에 대한 결정이다. 문서 간 충돌의
우선순위와 페이지별 공간·이동·카메라는 해당 작업 시 판단한다.
특히 아래 Skills의 Ancient Ruin / Skill Orbit 및 LOCKED 표기는
자동 적용할 최우선 확정안이 아니며 실제 구현·시안과 함께 검토한다.
기존 이동 기능을 문서 표현만으로 제거하거나 새로운 이동 방식을 확정하지 않는다.
문서 반영을 에셋 제작·화면 적용 완료로 기록하지 않는다.

## 2026-09-30 화면 적용 지시와 구현 범위

사용자는 자연스러운 젤다 레퍼런스 색감을 최우선으로 하고, 최신 MD의
레이아웃·폰트 역할을 실제 화면에 적용하도록 진행을 요청했다.
공통 Header, 첫 화면에서 인지되는 환경 움직임, 목적지 미리보기,
섬 방향을 따르는 이동을 [DESIGN_SYSTEM.md 01.2](DESIGN_SYSTEM.md)에 정리했다.

구름과 물이 움직여도 본문·Navigation·Case Study는 안정적으로 읽혀야 한다.
영상이나 애니메이션의 완료가 Route와 콘텐츠 접근의 필수 조건이 되어서는 안 된다.
기존 World/Skills/Projects의 제한된 이동과 모든 Direct URL을 유지한다.
주요 색감·Typography·공통 UI 적용은 진행하되, Skills 최종 구조와 각 공간의
세부 Camera/Movement는 페이지별 작업에서 판단한다.
구현 완료 여부는 과거 기획 표기가 아니라 PROJECT_CONTEXT의 최신 QA를 기준으로 한다.

## 01. Product Overview

현실 세계에서 시작해 Portal을 통과하고 Portfolio World에 도착한 뒤
지원자의 정보와 프로젝트를 탐색하는 인터랙티브 개인 포트폴리오다. 게임
자체가 목적이 아니며, 디자인 의도를 이해하고
인터랙션·반응형·접근성·프론트엔드 구현을 하나의 실제 웹 경험으로 연결할
수 있는 역량을 증명한다.

주요 사용자는 채용 담당자, 웹 퍼블리싱/프론트엔드 실무자, UX/UI
디자이너, 기업 관계자다.

## 02. Product Goals

사용자는 짧은 시간 안에 지원자의 정체성, 목표 직무, 기술, 프로젝트 4개,
프로젝트별 역할과 판단, 디자인·개발 연결 역량, 상세 Case Study, 연락
방법을 파악할 수 있어야 한다.

Cinematic / 3D / Game-inspired interaction은 정보를 더 기억에 남게
전달하기 위한 수단이다.

## 03. Core Principles

-   **PORTFOLIO FIRST** --- 콘텐츠가 연출보다 우선.
-   **CINEMATIC → EXPLORE → READ** --- 연출 강도를 단계적으로 낮춤.
-   **WORLD IS NAVIGATION** --- Portfolio World는 주요 콘텐츠 선택 Hub.
-   **DUAL NAVIGATION** --- World Interaction + 일반 HTML Navigation.
-   **GUIDED, NOT LOCKED** --- 추천 Journey는 제공하지만 순서를 강제하지
    않음.
-   **PLAY, BUT NEVER BLOCK CONTENT** --- 게임/3D 없이도 핵심 정보 접근
    가능.
-   **FIRST VISIT IS CINEMATIC, REVISIT IS FAST** --- 재방문은 빠른 접근
    허용.
-   **PROGRESSIVE ENHANCEMENT** --- 영상/3D/FX 실패 시에도 Portfolio
    사용 가능.

## 04. LOCKED vs WORKING

### LOCKED

-   프로젝트 4개
-   Portfolio World 메인 목적지: **About / Skills / Projects / Contact
    4개**
-   Q&A는 삭제하지 않고 Contact/직접 Route에서 접근 가능
-   Resume는 Quick/Direct Access에서 유지
-   실제 Role / Process / Result / Limitation
-   Dual Navigation
-   핵심 콘텐츠 직접 접근
-   Responsive / Accessibility / Fallback
-   React + Vite / React Router
-   Case Study = Read Mode
-   Portfolio World Visual Direction = **Natural Fantasy Adventure ×
    Minimal UI**
-   Typography = **Marcellus + SUIT**
-   World/About/Skills/Projects/Contact의 서로 다른 Composition grammar
-   Projects = Floating Island 반복 금지, Architectural Gallery / 4
    Project Stages
-   Skills = Skill Orbit 기반의 기술 탐색
-   AI Visual Cleanup 원칙

### WORKING

-   정확한 Camera 좌표 / Timing
-   Motion / Transition / FX의 미세값
-   Lighting / Fog / Material 미세값
-   Higgsfield Clip 세부 구성
-   Three.js 적용 범위
-   Contact Ending 세부 연출
-   Q&A/Resume의 세부 UI 배치

Color/Typography/Radius/Padding/Grid/Component State 및 세부 시각 규칙은
`DESIGN_SYSTEM.md`를 따른다.

Color/Typography/Radius/Padding/Grid/Component State는
`DESIGN_SYSTEM.md`를 따른다.

------------------------------------------------------------------------

## 05. Experience Architecture

### ENTER WORLD

``` text
REAL WORLD
→ PORTAL AWAKENING
→ PORTAL OPEN
→ SUCTION
→ TOOL UNIVERSE / TRANSFORMATION
→ FALL / ARRIVAL
→ PORTFOLIO WORLD
```

### QUICK / DIRECT ACCESS

About, Skills, Projects 4개, Q&A, Resume, Contact에 연출 없이 직접
접근할 수 있어야 한다. Portfolio World의 top-level island가 4개라고 해서
Q&A/Resume 콘텐츠를 삭제하지 않는다. 별도 복제 콘텐츠가 아니라 동일
Portfolio Data를 사용한다.

``` text
REAL WORLD
├─ ENTER WORLD
│  └─ PORTAL → TOOL UNIVERSE → ARRIVAL → PORTFOLIO WORLD
│      ├─ ABOUT
│      ├─ SKILLS
│      ├─ PROJECTS → PROJECT ARCHIVE → CASE STUDY
│      ├─ Q&A
│      └─ CONTACT
└─ QUICK ACCESS → 동일 Portfolio Content
```

`POWER UP`, Skill Level, XP, HP, Score, 필수 Jump/Collision Gameplay는
현재 제품 구조에서 사용하지 않는다.

------------------------------------------------------------------------

## 06. Real World

Portfolio World 진입 전 현실의 작업자를 보여주는 첫 화면이며 Portal
Sequence의 기준 프레임이다.

### Visual

서울 야경의 현실적인 작업실, Photorealistic/Cinematic, Warm Desk Light ×
Cool City/Monitor Light, iMac, 캐릭터, 강아지, 커튼과 생활 소품.
왼쪽에는 HTML Hero Copy용 안전 영역을 확보한다.

Hero에서 이름, 역할/직무, 짧은 소개, ENTER WORLD, 빠른 Navigation을
이해할 수 있어야 한다.

Ambient는 Curtain, City Light, Monitor Glow, Character subtle motion,
Dog idle, Plant motion 정도로 제한한다.

### ENTER WORLD

2026-09-30 사용자 요청: 방문 기록과 관계없이 ENTER WORLD를 누를 때마다
진입 영상을 재생한다. 버튼 아래 ‘영상 없이 바로 입장’ 텍스트 링크로
월드맵에 즉시 접근할 수 있다. Motion OFF/Reduced Motion의 직접 진입과
영상 재생 중 건너뛰기는 유지한다.

추가 진입 기준(사용자 지정 파일): 첫 화면은 start-ambient.mp4 반복 재생.
ENTER WORLD 선택 시 premium-to-portal-preview.mp4를 처음부터 재생하고,
종료 후 hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4로 이어진다.
대기 배경을 포털 영상의 시작 구간으로 대체하지 않는다. 같은 화면에서 다음
프레임 준비 후 600ms 겹침 전환하며, 첫 전환은 재생 중 대기 영상, 다음 전환은
포털의 마지막 프레임을 유지한다. 상세 기준은 DESIGN_SYSTEM.md 01.4를 따른다.

``` text
UI Fade
→ Ambient 감소
→ Subtle Push-in
→ Focus Shift to Monitor
→ Background DOF 증가
→ Character/Dog Reaction
→ Cyan Anomaly
→ Distortion
→ Portal Awakening
→ Portal Open
→ Physical Suction
→ Character Resistance
→ Character Suction
→ Camera Follow
→ Portal Full Screen
→ Tool Universe
```

핵심은 단순 Zoom보다 **Focus Shift**다. Character는 손 정지→어깨
긴장→모니터 쪽으로 고개 이동. Dog는 귀 세움→고개 듦→모니터 확인→뒤로
물러남. 강아지는 Portal에 들어가지 않는다.

Physical Reaction은 종이→커튼→강아지 털/귀→머리카락/옷→작은 물체 순으로
단계적으로 증가한다. Character는 즉시 날아가지 않고 저항 후 빨려
들어간다.

React/CSS/Three.js는 UI Fade, Dim, Focus/Blur, Monitor Glow, Skip,
Route/Reduced Motion을 담당하고 Higgsfield/Video는 복잡한 물리 반응과
Suction을 담당한다. 동일 Motion을 중복 제어하지 않는다.

Reduced Motion: `Dim → Monitor Cyan Glow → Short Fade → Tool Universe`.

------------------------------------------------------------------------

## 07. Portal / Tool Universe / Arrival

Portal은 Real World와 Stylized Portfolio World를 끊김 없이 연결한다.
Suction→Portal Tunnel→Tool Universe→Transformation→Fall의 Motion
Direction, Camera, Lighting, Character Orientation을 이어준다.

Tool Universe는 Cyan/Electric Blue, Digital Distortion, Abstract
Geometry, Tool Fragment, Motion Trail을 사용할 수 있다. 실제 사용하는
Figma, Photoshop, Illustrator, VS Code, HTML, CSS, JavaScript, React,
Vite, Git, GitHub 등을 기준으로 하며 단순 Logo Wall은 금지한다.

``` text
REALISTIC → DIGITAL DISTORTION → TOOL UNIVERSE → STYLIZED → PORTFOLIO CHARACTER
```

Arrival:

``` text
Portal Exit → Fall → Cloud/Atmosphere → World Reveal
→ Descent → Landing → Impact → Recovery → Look Around
```

착지 후 Character는 시각적 주인공이지만 자유 이동 Player가 기본은
아니다.

------------------------------------------------------------------------

## 08. Portfolio World

전체 Portfolio의 Main Visual Hub. top-level 목적지는 **ABOUT / SKILLS /
PROJECTS / CONTACT 4개**이며 임의의 추가 World를 만들지 않는다. Q&A와
Resume 콘텐츠는 제거하지 않으며 Direct/Quick Access와 최신 IA에서 정의한
위치를 통해 접근한다.

공간은 Floating Nature World / 2.5D Stylized 3D를 기본으로 Sky, Floating
Islands, Bridge, Water, Waterfall, Cloud, Architecture, Vegetation을
사용할 수 있다.

### Navigation

Mouse Hover/Click, Keyboard Focus/Enter, Touch Tap, Global HTML
Navigation을 지원한다.

Portfolio World는 정적인 이미지가 아니라 Interactive Experience다.
Desktop에서 bounded Character Movement를 사용할 수 있으며 기본 조작
언어는 가능한 경우 `WASD = 이동`, `E = 상호작용`으로 단순화한다. 단,
Character Movement는 콘텐츠 접근의 필수 조건이 아니며
Mouse/Keyboard/Touch/Direct Access가 항상 병행된다.
Jump/Combat/Progression Gameplay는 사용하지 않는다.

Mobile은 Desktop WASD를 그대로 복제하지 않고 Tap/Direct Selection
중심으로 재구성한다.

Character는 Idle/Look/Turn/React/Scene Transition 및 필요한 범위의
bounded movement를 사용할 수 있다.

``` text
Hover/Focus
→ Island/Landmark Lighting
→ Label/Preview
→ Character Look/React

Click/Enter
→ Selection
→ Short Camera Focus
→ Atmospheric Transition
→ Target Content
```

Living World는 Cloud/Water/Waterfall/Grass/Character Idle 등의
Continuous Motion과 Bird/Leaf/Mist/Light Shift 등의 Ambient Event를
사용할 수 있다. 모든 Object를 동시에 강하게 움직이지 않는다.

------------------------------------------------------------------------

## 09. About / Skills

### ABOUT --- VISUAL DIRECTION LOCKED

Profile, Role, Background, Work Direction, Values를 전달한다. **Warm
Interior / 3/4 Composition / Personal Space / Object Interaction**을
기본 문법으로 한다. World처럼 중앙 후면 Character + 원경 구조를 반복하지
않는다.

의미 있는 Object 소수에 Interaction을 연결한다. Idle 상태에서
Profile/Journey/Values/Interests 같은 Floating Menu를 항상 띄우지
않는다. 정보를 읽기 위해 Character 조작을 강제하지 않으며 빠른
Overview/Direct Access를 제공할 수 있다.

### SKILLS --- VISUAL DIRECTION LOCKED

목적은 Tool 개수보다 **무엇을 할 수 있고 실제 어디에 사용했는지**를
보여주는 것이다.

기본 방향은 **Ancient Ruin / Negative Space / Skill Orbit**이다. Game
Item/Toolkit의 과도한 장식은 사용하지 않는다.

각 Skill:

``` text
SKILL / ITEM NAME
CATEGORY
WHAT I CAN DO
USED IN PROJECTS
```

필요 시 Design / Frontend / Motion·3D / Workflow로 분류한다.

Skill Orbit은 하나의 중심 시스템과 통일된 Skill Object를 사용한다.
Idle에서는 천천히 공전하고, Near/Focus에서는 대상이 강조되며,
Selected에서는 공전을 멈추거나 약화하고 선택 Skill을 Focus한다. Exit 시
원래 상태로 돌아간다.

Hover/Focus/Touch/직접 선택과 Character proximity interaction 모두
동일한 핵심 정보에 접근할 수 있어야 한다. Desktop bounded movement를
사용하더라도 복잡한 Physics/Jump/Combat은 요구하지 않는다.

화려한 Crystal 안에 네모난 Brand Logo를 억지로 삽입하지 않는다. 실제
Logo가 필요하면 SVG/HTML Asset으로 분리한다.

금지: POWER UP, Skill Level, XP, HP, Life, Score, `Figma 95%` 같은 근거
없는 숙련도. 게임 아이템은 시각적 메타포이고 실제 역량은 Portfolio
Evidence로 설명한다.

------------------------------------------------------------------------

## 10. Projects --- Structure Locked / Presentation Working

**프로젝트 4개가 한 화면에서 모두 인지 가능해야 한다.** Portfolio
World의 Floating Island 문법을 반복하지 않는다.

``` text
Portfolio World → PROJECTS Focus → Short Transition → PROJECT ARCHIVE
```

Project Archive는 **Architectural Gallery / Exhibition Space / 4 Project
Stages**를 확정 방향으로 한다. Portfolio World가
Organic/Nature/Floating/Open이라면 Archive는
Architectural/Gallery/Structured/Editorial/Controlled로 대비한다.

PROJECTS는 실제 작업물이 주인공이다. AI가 만든 Fantasy
Island/Architecture가 실제 Project Thumbnail/Identity/Role/Summary를
대체하면 안 된다.

각 Project는 Project Number, Name, Category, Role, Key Visual, One-line
Summary, View Case Study를 제공한다. 필요 시 Year/Team/Tech 추가.

Default에서는 4개가 모두 보인다. Hover/Focus는 Exhibit Lighting +
Signature Motion + Label + Preview + Character Look. Click/Enter는
Project Selected → 해당 Exhibit Point로 Character의 짧은 자동 이동 →
Preview 확장 → `VIEW CASE STUDY`.

### Point-based Character Movement

`HOME / PROJECT 01 / PROJECT 02 / PROJECT 03 / PROJECT 04`의 고정
Point만 사용한다. 자유 WASD, Collision, Pathfinding, Jump, Platform
Gameplay는 기본 구현에서 제외한다.

------------------------------------------------------------------------

## 11. Project Detail / Q&A / Contact / Ending

### CASE STUDY

**READ MODE**. 3D/Character/Camera Motion을 크게 줄이고 실제 프로젝트
정보를 주인공으로 만든다.

실제 자료가 지원하는 항목만 사용:
`Overview / Problem·Context / Role / Process·Decision / Solution / Design / Development / Result / Limitation·Retrospective`.

Metadata는 Project Name, Category, Role, Duration, Team/Individual,
Tools/Tech, 실제 존재할 경우 Live/GitHub. 본문을 읽기 위해 Character
조작을 요구하지 않는다.

근거 없는 성과 수치, 사용자 테스트, 전환율, 매출, 개선 %, 협업, 후기는
생성하지 않는다.

### Q&A

작업 방식, 협업 방식, 문제 해결 방식, 디자인/개발 역할, 프로젝트 질문,
성장 방향을 즉시 읽을 수 있게 한다.

### CONTACT

Email, GitHub, Resume, 필요한 외부 링크를 제공하며 어떤 Progress도
요구하지 않는다.

시각 방향은 **Quiet Ending / Destination / Contact Action 중심**이다.
Character는 Secondary 또는 Minimal하게 사용한다. World와 같은 '중앙
Character가 풍경을 바라보는 화면'을 반복하는 것만으로 Contact를 구성하지
않는다. 연락 수단은 즉시 접근 가능한 HTML UI다.

Q&A는 삭제하지 않으며 Contact 내부 진입 또는 `/qa` 호환 Route 등 최신
구현 구조를 통해 접근 가능하게 유지한다.

### ENDING --- WORKING

`Journey Complete → Calm Transition → Contact/Final Message → Optional Real World Callback`
정도를 후보로 둔다. GAME CLEAR/STAGE CLEAR/Score 기반 Ending은 필수
요구사항에서 제외한다.

------------------------------------------------------------------------

## 12. Navigation / Responsive / Accessibility

Router는 Cinematic에 종속되지 않는다. Direct URL, Refresh, Browser
Back/Forward, Quick Access, Reduced Motion, Error Recovery를 지원하고
Cinematic 완료가 Route 변경의 필수 조건이 되어서는 안 된다.

권장 Route: `/`, `/about`, `/skills`, `/world-map`, `/projects`,
`/projects/:projectId`, `/qa`, `/contact`. 실제 코드와 충돌하면 현재
Router를 먼저 Audit한다.

First Visit:
`Real World → Portal → Tool Universe → Arrival → Portfolio World`.
Same-session Revisit은 빠른 접근. Direct URL은 해당 콘텐츠 직접 진입.

### Responsive QA

2560×1440 / 1920×1080 / 1440×810 / 1366×768 / 1180×820 / 1024×768 /
768×1024 / 430×932 / 402×874 / 390×844 / 360×800.

단순 Scale보다 Composition/Reframe을 우선한다. Important Object /
Character / CTA / Navigation Safe Area, Short Viewport, Ultrawide,
Mobile 별도 Composition을 검증한다.

**Content parity와 Interaction parity가 Visual parity보다 우선한다.**
Desktop WASD/Object Interaction은 Mobile에서 Tap/Direct Selection/Bottom
Sheet/Drawer 등 동등한 접근 방식으로 전환한다. Background focal
point/crop, safe-area inset, `dvh/svh`, orientation/landscape, 200%
Zoom을 검증한다. 핵심 콘텐츠는 어떤 breakpoint에서도 삭제하지 않는다.

### Accessibility

Semantic HTML, Keyboard Navigation, focus-visible, 약 44×44 이상 Touch
Target, 충분한 Contrast, Color-only State 금지, Alt Text, Sound Control,
Reduced Motion, 필요한 Motion Pause/Stop, Skip Cinematic, Quick/Direct
Access, 200% Zoom QA를 지원한다.

------------------------------------------------------------------------

## 13. Failure / Performance / Assets

### Failure

Video→Poster/Static, Three.js/WebGL→Static World+HTML Navigation,
Character Motion→Static Character, Ambient→해당 Motion 생략,
Audio→Silent, Image→Fallback+Alt, Transition→Immediate Route,
Loading→Skip/Direct Access. 가짜 Loading `%` 금지.

### Performance

WebP/AVIF, WebM(+필요 시 MP4), GLB, Lazy Loading, 필요한 Asset만
Preload, Offscreen Animation/Video Pause, Particle 제한, Cleanup, Mobile
Quality Reduction, Layout Shift 최소화.

Target: LCP≤2.5s / INP≤200ms / CLS≤0.1.

Loading Priority:
`Semantic HTML/Core Content → Critical CSS/Fonts → Hero Poster → Navigation → World Base → Three.js → Living Motion → FX`.

### Assets

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

Filename은 lowercase kebab-case 영문. Image WebP/AVIF, Video WebM(+MP4),
3D GLB, Icon SVG, Font WOFF2 우선. Fullscreen Asset은 Focal Point/Safe
Area를 정의한다.

------------------------------------------------------------------------

## 14. Technical / Scope / Validation

### Technical Baseline

React / Vite / JavaScript·JSX / React Router / CSS / ESLint /
Git·GitHub. Three.js, GSAP 등은 실제 `package.json`과 요구사항을 확인한
뒤 사용하고 새 Dependency를 자동 추가하지 않는다.

HTML/React는 이름, 직무, Navigation, Button, Project 정보, Forms,
Contact, Resume, Accessibility를 소유한다. World/Three.js는 Environment,
Island/Architecture, Waterfall, Lighting, Character, Camera, Atmospheric
FX를 담당한다. 중요 텍스트를 이미지/3D Texture에만 굽지 않는다.

### Removed Scope

POWER UP Gameplay, Skill Block/Item Pickup Loop, Skill Level,
XP/HP/Life/Score, 의미 없는 Achievement, 숨겨진 섬/Secret Area, Badge
장착, Portfolio World 자유 이동, 필수 Jump/Collision, Project Archive
자유 이동, 게임 때문에 콘텐츠를 잠그는 Progress System.

### Product Validation

-   첫인상: 이름/직무/강점이 명확한가?
-   탐색: 게임 없이 Project 4개와 Contact/Resume에 접근 가능한가?
-   콘텐츠: Project의 역할/문제/결정/구현을 이해할 수 있는가?
-   인터랙션: Hover/Click/Focus/Tap이 설명 없이 이해되는가?
-   복구: Skip/Back/Reload/Direct URL이 정상인가?
-   반응형: Laptop/Tablet/Mobile/200% Zoom에서 핵심 UI가 유지되는가?
-   에셋 실패: Video/3D/FX 실패 후에도 다음 행동이 가능한가?
-   접근성: Keyboard/Reduced Motion에서도 동일 정보에 접근 가능한가?

### MVP Completion

Real World와 ENTER WORLD, Portal 또는 대체 Transition, Portfolio World,
About/Skills/Projects/Q&A/Contact 접근, Project Archive의 4개 프로젝트,
Case Study, Direct URL/Back/Reload, Responsive QA, Reduced Motion, Asset
Fallback, lint/build 치명적 오류 없음.

### Out of Scope

실제 게임 엔진, 로그인, 결제, CMS, 관리자 페이지, 게임 서버,
Multiplayer, 의미 없는 점수 시스템, 프로젝트와 무관한 추가 World, 필요
이상의 WebGL 구현.

## 15. Visual Product Requirements --- LOCKED

이 PRD는 세부 색상/폰트 수치를 `DESIGN_SYSTEM.md`에 위임하지만 다음 제품
수준의 시각 원칙은 LOCKED다.

-   Natural Fantasy Adventure × Minimal UI
-   Fantasy는 Environment가 담당하고 UI는 기능 중심
-   Marcellus + SUIT 2-Font System
-   공통 Navigation은 Portfolio World 전 페이지에서 동일
-   배경/AI Asset에 실제 Navigation/Button/설명 Text를 굽지 않음
-   Text Shadow/Text Glow 금지
-   Double Border/두 줄 장식/의미 없는 장식 기호 남발 금지
-   감성 영어 카피로 빈 공간을 채우지 않음
-   한 화면 Primary Focal Point 1개
-   정보 위계는 원칙적으로 Primary/Secondary/Utility 3단계
-   모든 페이지의 Camera/Composition을 동일하게 반복하지 않음
-   AI/Astra/Higgsfield는 Asset 제작 도구이며 Layout/Typography/UI를
    결정하지 않음
-   Portfolio World에 Pet/Companion/NPC를 임의 추가하지 않음
-   Real World의 기존 강아지 연출은 Real World 범위에서만 유지

------------------------------------------------------------------------

## 16. PRD Update Rule

이 PRD는 **제품의 콘텐츠·기능·사용자 경험·완료 조건**을 관리한다. Color,
Typography, Radius, Padding, Component State, 세부 Animation
Timing/Camera 수치는 `DESIGN_SYSTEM.md`에서 관리한다.

제품 구조가 바뀌면 PRD를 갱신한다. WORKING인 세부 디자인/모션이 조정될
때마다 PRD 전체를 수정하지 않는다.
