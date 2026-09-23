# PERSONAL PORTFOLIO --- DESIGN SYSTEM v2 FINAL

**Status:** FINAL\
**Core:** Cinematic 2.5D Portfolio World × Editorial Web UI\
**Primary Reference:** 1440×810\
**Principle:** Portfolio First

## 00. Governance

**LOCKED:** IA, Portfolio First, World=Navigation, Dual Navigation,
Information Hierarchy, Cinematic→Explore→Read, gameplay 없이 콘텐츠
접근, First Visit/Revisit, Progressive Enhancement,
Accessibility/Fallback.

**SYSTEM:** Typography, Color, Spacing, Radius, Components, States,
Grid, Responsive, Navigation, World Interaction, Composition Rules,
Transition Grammar.

**WORKING:** Camera, Lighting, Material, Fog, Environment color 미세값,
Glass/Blur/Shadow, Water/Waterfall, Cloud speed, World/Cinematic motion,
Particle/FX, Scene composition.

> WORKING 값 변경만으로 문서 전체를 반복 수정하지 않는다.

## 01. Experience

REAL WORLD → PORTAL → TOOL UNIVERSE → PORTFOLIO WORLD → READ MODE

-   Real World: Photorealistic / Personal / Cinematic
-   Portal: Digital / Cyan / Unstable / Energetic
-   Tool Universe: Abstract / Transformative
-   Portfolio World: Bright / Airy / Soft Stylized 3D / Editorial
-   Read Mode: Quiet / Information First

정보 우선순위: **Identity → Projects → Navigation → World →
Decoration**. PROJECTS는 Primary Landmark다.

  Mode        Content   Motion
  ----------- --------- --------
  Cinematic   Low       High
  Explore     Medium    Medium
  Read        High      Low

READ MODE: Camera Locked, Parallax Off/Minimal, Living Motion 0--1, FX
최소.

## 02. Typography

Primary: **Pretendard Variable**. Editorial Accent: **Instrument
Serif**. Serif는 Hero/짧은 Statement/Scene Opening에만 사용하고 한
viewport 주요 표현은 원칙적으로 1개.

  Style          Size   Single LH   Multi LH     Weight   Tracking
  ------------ ------ ----------- ---------- ---------- ----------
  Display XL     64px        100%       112%        700        -2%
  Display L      56px        100%       114%        700        -2%
  Display M      48px        100%       117%        700      -1.5%
  H1             40px      100%\*       120%        700      -1.5%
  H2             32px      100%\*       125%        700        -1%
  H3             24px      100%\*       133%        600        -1%
  H4             20px      100%\*       140%        600      -0.5%
  Body L         18px         ---       165%        400          0
  Body M         16px         ---       160%        400          0
  Body S         14px         ---       155%        400          0
  Label L        14px        100%     140%\*        600        +1%
  Label M        12px        100%     150%\*        600        +3%
  Caption        12px      100%\*       150%   400--500        +1%

`*` 구조적으로 한 줄이 보장될 때만 100%.
Navigation/Button/Tag/Meta/World Label은 기본 `line-height:1`. Body에는
100% 금지.

Instrument Serif: XL 48--72/105%, L 40--56/108%, M 40/115%, S 28/120%.
한 줄 전용이면 100% 가능.

**Figma → CSS:** font px→rem/clamp, line-height %→unitless, tracking
%→em, text width→ch.\
한글: `word-break:keep-all; overflow-wrap:break-word;`\
Hero 18--24ch / Lead 40--50ch / Body 60--68ch / Article max 68ch.

**Typography owns typography; Layout owns spacing.** Heading/paragraph
기본 margin은 0.

## 03. Color

Neutral:
`#FFFFFF #F8FAFC #F1F5F9 #E2E8F0 #CBD5E1 #94A3B8 #64748B #475569 #334155 #1E293B #0F172A #080D18`.

Focus Blue:
`50 #EFF6FF / 100 #DBEAFE / 200 #BFDBFE / 300 #93C5FD / 400 #60A5FA / 500 #3B82F6 / 600 #2563EB / 700 #1D4ED8 / 800 #1E40AF / 900 #1E3A8A`.
Primary Interactive=`#2563EB`.

Portal Cyan:
`50 #ECFEFF / 100 #CFFAFE / 200 #A5F3FC / 300 #67E8F9 / 400 #22D3EE / 500 #06B6D4 / 600 #0891B2 / 700 #0E7490 / 800 #155E75 / 900 #164E63`.
Portal/Tool Universe/Transformation/Energy 전용.

Semantic: Text Primary `#0F172A`, Secondary `#475569`, Muted `#64748B`,
Inverse `#FFFFFF`; Surface Base `#FFFFFF`, Subtle `#F8FAFC`; Border
Default `#E2E8F0`, Strong `#CBD5E1`; Success `#16A34A`, Warning
`#D97706`, Error `#DC2626`, Info `#2563EB`.

On Media: Primary `#FFFFFF`, Secondary `#E2E8F0`, Muted `#94A3B8`, Scrim
Strong `#080D18`, Soft `#0F172A`. Scrim opacity는 WORKING.

Environment Reference: Sky `#DCEFFF/#A8D8F0/#73B6D8`; Cloud `#F8FCFF`;
Water `#A7E4F2/#64C6DF/#3697B8`; Grass `#BBD98B/#83B96A/#527D4D`; Stone
`#D8D6CE/#AAA9A3/#737672`; Sunlight `#FFE7A8`; Architecture
`#D88968/#AFC7D5`.

Environment HEX는 literal material output이 아니다.
Material+Lighting+Fog+Tone Mapping 결과로 판단. 일반 텍스트 대비 4.5:1,
큰 텍스트 3:1 이상.

## 04. Spacing / Radius / Composition

Spacing: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 80 / 96`.\
Semantic: 2XS4, XS8, S12, M16, ML20, L24, XL32, 2XL48, 3XL64, 4XL80,
5XL96.

Radius: XS6, S10, M14, L20, XL24, 2XL32, Full Pill/Circle.

### Surface Rule

**Surface/Card 계열: Corner Radius = Internal Padding 값.**

  Surface            Radius   Padding   Internal Gap
  ---------------- -------- --------- --------------
  Compact                10        10              8
  Small                  14        14          8--12
  Standard               20        20         12--16
  Large/Floating         24        24         16--20
  Modal/Major            32        32         20--24

Button/Input/Tag/Pill/Circle은 예외. `R50%→P50%` 규칙 없음.\
Nested: **Inner Radius \< Outer Radius**.\
Spacing relation: **Internal Gap \< Container Padding \< Group Gap \<
Section Gap**.

Border: Default `1px #E2E8F0`, Strong `1px #CBD5E1`, Focus
`2px #3B82F6`.\
Shadow: 0 none; 1 `0 2px 8px rgba(15,23,42,.08)`; 2
`0 8px 24px rgba(15,23,42,.10)`; 3 `0 16px 40px rgba(15,23,42,.14)`.\
Surface: Base / Raised / Floating / Glass. Border+Strong
Shadow+Glass+Glow 동시 남용 금지.

## 05. Components / Interaction

고정 height보다 `min-height`.

-   Button S: min-H36 / X14 / gap6
-   Button M: min-H44 / X18 / gap8
-   Button L: min-H52 / X24 / gap10
-   Input: min-H44 / padding 12×16
-   Textarea: min-H120 / resize vertical
-   Icon Button: min44×44
-   Interaction target: 최소 44×44
-   Icons: 16/20/24/32; 44px control→20px icon, 52px→24px icon

States: Default / Hover / Focus-visible / Pressed / Selected /
Transitioning / Disabled / Loading / Error.

Primary: Default `#2563EB`, Hover `#1D4ED8`, Pressed `#1E40AF`, Disabled
`#E2E8F0/#94A3B8`. Pressed scale(.98)은 optional.

Focus: `outline:2px solid #3B82F6; outline-offset:2px`. Hover-only 정보
금지. World Hotspot Hover는 Blue Button State가 아니라
Lighting+Label/Preview.

Navigation: ABOUT / SKILLS / PROJECTS / Q&A / CONTACT. World 조작 없이도
Global HTML Navigation 사용 가능.

Project Preview 필수: Number, Name, Category, My Role, One-line Summary,
Thumbnail, View Project. 선택: Year/Tech/Team.

## 06. Responsive

Grid: Desktop12 / Tablet8 / Mobile4. Primary Composition
Reference=1440×810, 강제 16:9 아님.

Breakpoints: Wide≥1920 / Desktop1280--1919 / Compact1024--1279 /
Tablet768--1023 / Mobile\<768.

최종 경험은 **Width + Viewport Shape + Capability** 3축으로 결정.
Breakpoint ≠ Quality Tier.

QA: 2560×1440, 1920×1080, **1440×810 PRIMARY**, **1366×768 HIGH**,
1180×820, 1024×768, 768×1024, **430×932 PRIMARY MOBILE**, 402×874,
390×844, **360×800 WORST CASE**. Boundary: 767/768, 1023/1024,
1279/1280, 1919/1920.

Wide는 중앙을 단순 확대하지 않고 주변 World 확장. Compact는 camera
reframe+UI 재배치. Tablet은 vertical composition. Mobile은 Reduced/2.5D
기본, capability 충분 시 enhanced 가능.

Container padding: Wide/Desktop32--48, Compact24--32, Tablet24,
Mobile16--20.\
Fullscreen: `min-height:100vh; min-height:100dvh;`. `width:100%` 우선,
safe-area env() 고려.

## 07. World / Motion / Transition

Static: Island/Bridge/Cliff/Architecture/Platform/Major Tree. Living:
Waterfall/Water/Cloud/Grass/Flower/Tree/Character Idle. Ambient:
Bird/Leaf/Mist/Light Shift/Distant Motion. 모든 오브젝트를 움직이지
않는다.

Material: Soft Stylized 3D. Heavy metallic/chrome/gritty PBR/plastic toy
look 지양.

Lighting: Real World=Warm Desk+City Blue; Portal=Cyan Core+Electric
Blue+Violet; Portfolio World=Warm Sun+Sky Fill+Cloud/Water Bounce.

Player Height=1U reference. World Scale+Camera FOV+Camera Distance를
함께 검증.

Player: Idle/Look/Turn/React/Landing/Recovery/Scene Enter/Exit. 선택
Short Walk/Approach. World Map 기본에서 Free Run/Platform Jump/Combat
제외.

Motion reference: Micro100--200ms / Component160--240 / Panel240--400 /
World Camera600--1000. 이동 거리가 커질수록 duration 증가. UI는
transform/opacity 우선. Cinematic은 WORKING.

Living Motion Budget: Primary 최대1, Secondary 최대2, 나머지는 약한
Ambient.

Transition: World→Focus/Push/Atmosphere/New Scene; Information→short
fade/slide; Cinematic→full-screen. Cinematic은 navigation을 잠그지
않는다.

First Visit: Real World→Portal→Tool Universe→Arrival→World. Return:
Direct World. Direct URL: Direct Content. Back: Previous state. Intro
강제 재생 금지.

Sound: Visual autoplay / Audio opt-in.

## 08. Accessibility / Web / Performance

Semantic HTML 사용. 이동은 `<a>`, action은 `<button>`.
Keyboard/Focus/Touch/Reduced Motion/200% Zoom 지원. Color만으로 상태
표현 금지. 핵심 콘텐츠를 breakpoint에서 제거하지 않는다.

HTML/React owns: 이름, 직무, Navigation, Button, Project 정보, Tooltip,
Forms, Contact, Resume, Accessibility.\
Three.js/World owns: Island, Bridge, Waterfall, Architecture,
Environment, Lighting, Character, Camera, FX. 중요 텍스트를 이미지/3D
texture에 굽지 않는다.

Motion Ownership: 한 움직임에는 하나의 Owner만 둔다. Curtain/Portal
Suction→Higgsfield, World Camera→Three.js, Navigation/UI→CSS/GSAP,
Waterfall→선택한 단일 방식.

Priority: **Content \> UI \> World \> Living Motion \> Decorative FX**.\
Loading: Semantic HTML/Core Content → Critical CSS/Fonts → Hero Poster →
Navigation → World Base → Three.js → Living Motion → FX.

Fallback: Video fail→Poster; Three.js fail→Static World; WebGL fail→HTML
Portfolio; Waterfall fail→Static Waterfall; Character fail→Idle Image;
Transition fail→Immediate Route; Sound fail→Silent.

QA: Keyboard only / 200% zoom / Reduced Motion / Touch only / No WebGL /
Video failure / Image failure / Back / Refresh.

## 09. Final Composition Rules

1.  Surface Radius = Surface Padding.
2.  Inner Radius \< Outer Radius.
3.  Internal Gap \< Container Padding.
4.  Group Gap \> Internal Gap.
5.  Single-line UI = 100% line-height.
6.  Multi-line Heading uses dedicated multi-line LH.
7.  Body never uses 100% LH.
8.  Icon+Label uses Flex/Grid center.
9.  Visual Size ≠ Hit Area.
10. Typography owns type; parent owns spacing.
11. Hover information = Focus/Touch accessible.
12. Motion distance ↑ → Duration ↑.
13. World Scale ↔ Camera 검증.
14. Material ↔ Lighting 검증.
15. Asset focal point ↔ Responsive crop 검증.
16. Loading ↔ Layout Stability 검증.
17. Desktop/Mobile visual parity는 불필요하지만 **Content parity는
    필수**.
18. 같은 Component Family에서 임의의 중간 Radius/Padding/Gap 값을 만들지
    않는다.

## 10. Visual Do / Don't

### DO

Portfolio first; Editorial hierarchy; PROJECTS prominence; controlled
whitespace; living environment; subtle interaction; consistent
transitions; accessible navigation; progressive enhancement.

### DON'T

Game HUD everywhere; forced gameplay; XP/Level/Badge; rainbow UI;
excessive glass/glow/radius; every object moving; long fly-through; too
many fonts; image-baked UI text; generic AI floating cards; arbitrary
spacing/radius values.

------------------------------------------------------------------------

**FINAL RULE:** 콘텐츠·IA·접근성·시스템 규칙은 고정한다.
디자인·카메라·모션·FX의 세부값은 실제 구현 결과를 보며 WORKING 범위에서
조정한다.

# FINAL EXPERIENCE UPDATE --- 2026-09-23

## Real World

-   첫 화면은 Seoul Night Workspace 기반의 Photorealistic Cinematic
    Scene.
-   Warm desk light × cool city blue.
-   iMac, designer/developer workspace, black-and-tan Maltipom, white
    chiffon curtains 유지.
-   왼쪽은 HTML Hero Copy용 안전 영역.
-   `Hello,`만 Instrument Serif, 나머지 UI는 Pretendard.
-   Portal Cyan은 Default 화면에서 사용하지 않고 `ENTER WORLD` 이후
    이상현상부터 등장.
-   흐름: UI Fade → Ambient Slow → Monitor Focus → DOF 증가 →
    캐릭터/강아지 반응 → Cyan Pixel → Distortion → Portal Awakening →
    Portal Open → Suction → Camera Follow → Tool Universe.
-   Reduced Motion: Dim → Monitor Cyan Glow → Short Fade → Tool
    Universe.

## Portfolio World

-   Floating Nature World.
-   자유 이동은 기본 제공하지 않는다.
-   캐릭터는 Idle / Look / React / Scene Transition 중심.
-   섬 Hover/Focus/Click으로 탐색하며 Global HTML Navigation을 항상
    병행한다.

## Projects / Project Archive

-   Portfolio World의 공중섬 구조를 반복하지 않는다.
-   PROJECTS 진입 후 공간은 **Architectural Gallery / Exhibition
    Archive**.
-   4개 프로젝트를 한 화면에 동시에 보여주는 B 방식 유지.
-   Hover/Focus → 전시물 반응 + Preview.
-   Click → 캐릭터가 HOME + 프로젝트 4개 고정 포인트 중 해당 위치로 짧게
    자동 이동(Point-based Movement) → Preview 확장 → View Case Study.
-   자유 이동, Collision, Pathfinding은 기본 구현에서 제외.
-   Case Study 진입 후 READ MODE.

## Skills

-   기존 `POWER UP` 개념 삭제.
-   XP / Level / 성장 / 획득 시스템 사용 금지.
-   Portfolio World와 같은 섬 구조, Project Archive와 같은 전시관 구조를
    반복하지 않는다.
-   방향은 **Game Item / Toolkit UI**.
-   Skill은 실제 작업 도구를 게임 아이템처럼 재해석하되 정보는 실제 역량
    중심.
-   예: Figma / Photoshop / Illustrator / HTML / CSS / JavaScript /
    React / Git / GitHub / GSAP / Three.js / AI Tools.
-   정보 구조: Item Name → Category → What I Can Do → Used In Projects.
-   Hover/Focus/Touch 모두 동일 핵심 정보에 접근 가능.
-   복잡한 자유 이동은 사용하지 않는다.

## Cross-Scene Interaction Grammar

-   Portfolio World = Map / Select.
-   Skills = Toolkit / Item Select.
-   Projects = Gallery / Exhibit Select + Point-based Character
    Movement.
-   Case Study = Document / Read.
-   화면마다 같은 공간 문법과 인터랙션을 반복하지 않는다.

## Locked Composition Rules

-   Surface/Card: Radius = Internal Padding.
-   Inner Radius \< Outer Radius.
-   Internal Gap \< Container Padding.
-   Group Gap \> Internal Gap.
-   구조적으로 한 줄인 UI는 Line Height 100%.
-   여러 줄 Heading은 Multi-line LH Token 사용.
-   Body에는 100% Line Height 금지.
-   Typography owns type; Parent owns spacing.
-   Visual Size ≠ Hit Area.
-   Hover 핵심 정보는 Focus/Touch에서도 접근 가능.
