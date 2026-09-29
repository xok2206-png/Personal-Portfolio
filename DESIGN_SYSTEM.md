## 2026-09-29 — Sitewide font consistency follow-up

Following the user's Contact correction and request to align all pages, Korean body/UI now also uses Gowun Batang, matching Korean headings. English remains Instrument Serif; Pretendard Variable is fallback only. Both shared tokens resolve to the same stack in src/index.css. This supersedes the previous body/UI Pretendard rule. Layout, content, interactions and Working/Locked scene decisions are unchanged.

Validation: lint/build passed. qa/global-font-audit.cjs checked 15 route states (including four case studies and Contact Q&A) at 1440x810, 1128x963, 430x963 and 360x963: no horizontal overflow, wrong Korean computed font stack or page errors. Desktop platform-font samples show no system-font fallback. About and project-detail screenshots visually reviewed. Actual mobile hardware, Safari and 200% zoom remain unverified. Report: docs/layered-world/global-font-report.json.

## 2026-09-29 — Approved Korean typography update

User approved Instrument Serif for Latin, Gowun Batang for Korean headings/emotional copy, and Pretendard Variable for Korean body/UI. Shared --font-primary and --font-heading tokens now implement this across routes. Contact lead uses the heading family; controls and descriptions retain the body family. This supersedes prior typography instructions where conflicting. Existing content, routing, layout and movement decisions are unchanged.

The previous static Pretendard Bold file caused the Skills heading character '넘' to fall back to Malgun Gothic. Browser platform-font inspection now confirms Gowun Batang Bold for all Korean glyphs in that heading, Gowun Batang Regular for Contact lead, and Pretendard Variable for Contact description. Gowun Batang 400/700 is self-hosted as official Google Fonts WOFF2 unicode-range subsets (190 files, 3.07 MB total; only needed subsets load); original TTFs and OFL license are retained.

Validation: npm run lint and npm run build passed. Headless Edge checked 10 routes at 1440x810, 430x932 and 360x932: no horizontal overflow or page errors. Screenshots inspected for Skills and Contact desktop. Physical devices, Safari and 200% zoom not checked. Files: src/index.css, src/gowun-batang.css, heading overrides in Contact/Skills/Projects/RealWorld/PortfolioWorld styles, font assets, qa/typography-check.cjs. No Working scene decision promoted to Locked.

## 2026-09-29 Skills Power Core implementation

Latest explicit user brief authorizes bounded character exploration and slow orbit on /skills. Skills is now a standalone 2.5D chamber using separate environment, transparent core, orbiting interactive crystal buttons and the existing master character. Existing Projects walk hook accepts an optional initialPosition; its default behavior is preserved. WASD/arrows, floor click, near E/Enter, direct orb click, keyboard buttons and a direct skill selector remain available. Selection eases the chosen crystal to a front focus position, slows other orbits, opens a dismissible right panel (mobile bottom sheet), and triggers a brief skill-specific CSS effect. Escape returns focus to the selected orb. Reduced motion/paused/hidden state stops ambient motion. No score, animal, completion gate or independent Q&A nav added.

Eight tools: Figma, React, Three.js (explicitly exploration; no verified implementation claim), GSAP, JavaScript, Git/GitHub, ChatGPT and Higgsfield. Actual existing project data reused; no speculative Claude/VS Code project associations. Prior global Instrument Serif typography retained with Korean fallback. Scene is layered raster + HTML/SVG/CSS/JS, not a full 3D model; background architecture/waterfalls/banners are raster art, while crystal motion, mist, character and UI are independent.

Lint/build passed. qa/skills-chamber-check.cjs verifies 11 specified sizes, orbit, pointer focus/close, WASD, proximity E, reduced motion, mobile panel and image failure. Additional eight breakpoint widths 767/768, 1023/1024, 1279/1280, 1919/1920, short 720×405 viewport and unchanged Projects movement passed. Desktop/mobile screenshots inspected under docs/layered-world/skills-*.png. Physical devices, Safari and true browser 200% zoom remain unverified. Asset prompts and provenance: docs/layered-world/skills-power-core.md. This scopes movement to Skills; other WORKING decisions remain unchanged.

## 2026-09-29 Shared Contact typography

User explicitly requested the selected Contact navigation typeface across every page. Global --font-primary now uses the existing Instrument Serif asset, followed by Pretendard for Korean. Body, page/scene-specific families and --display reference this shared token; font sizes, content, routing and interaction remain unchanged. This supersedes earlier sans-first Latin typography. Updated index.css and existing font declarations in Contact, Projects, DestinationFrame, RealWorld/PortalCinematic and PortfolioWorld styles. Lint/build passed. Headless Edge verified font loading, computed main font family and no horizontal overflow on ten routes at 1440×810 and 430×932. Physical devices, Safari and 200% zoom not checked in this revision.

# PERSONAL PORTFOLIO --- DESIGN SYSTEM v2 FINAL

## 2026-09-29 Contact static reference revision

Latest user instruction supersedes the auto-walk and no-card directions: match the supplied sunset composition, show four icon plaques, and do not walk. Contact.jsx/Contact.css now use a static reference-edited background with real HTML navigation, title, four SVG-icon actions and existing Q&A modal. Auto-walk, layered character, moving environment and delayed credits removed from this page; world/project movement unchanged. Email still awaits an actual address. Asset was edited using built-in imagegen, not pixel-identical to the source. Production: public/assets/production/images/contact/contact-reference-v2.webp; source: public/assets/source/contact/contact-reference-v2.png. Prompt: preserve the exact supplied scene/composition/characters/pet/lighthouse/path; remove UI logo/navigation/headings/Korean text/four cards/handwriting/footer overlays and reconstruct sky; preserve the physical wooden sign. No new UI baked into the image. Lint/build passed; static-character absence, four icons, nine viewport widths, six FAQs, Escape and Resume navigation verified. Desktop screenshot inspected. Physical devices/Safari unverified.


## 2026-09-29 Contact Final Chapter

Latest explicit Contact brief authorizes an optional automatic 2.5D journey toward a sunset beacon, with Contact actions primary and a small delayed epilogue. Standalone Contact route replaces its old DestinationFrame wrapper; existing FAQ content is now a hash-addressable native dialogue. New generated environment asset plus separate sprite/cloud/airship/light layers; existing WorldCharacter, shared Motion and real profile data reused. Email remains unavailable until the user provides an address; Resume links to the existing factual summary. No other movement/page direction is locked. Lint/build and 19-size Contact regression checks passed; desktop/mobile visuals inspected. Files, prompt, asset provenance, exact QA and limitations: docs/layered-world/contact-final-chapter.md.


## 2026-09-29 Readable functional World HUD

Latest explicit request restores the functional compass: direction needle plus camera/portrait-rail reset on click or keyboard, with visible Korean caption. Navigation keeps its existing sizing but adopts the Projects gallery navy/gold capsule and ivory text. Settings uses a new slider icon with text, matching dark panel and Korean control labels. Portrait panel sits below navigation. Changed WorldHUD.jsx, LayeredWorld.jsx, HudDetails.jsx and WorldRefinement.css; artwork, routes, stair controller and content unchanged. This supersedes the decorative-only compass direction, without locking broader movement decisions. Lint/build and 21-viewport suite passed; compass bearing/cancel/reset/Space, settings Motion/Escape and mobile reset verified. Inspected 1440×810 and 430×932. Physical devices/Safari unverified.


## 2026-09-29 Latest ASTRA World refinement brief

The newly supplied brief supersedes the functional compass request: compass is subtle decorative HUD again. Four islands and existing artwork/routes/content remain. About shifts inward/down; Contact grows about 12%; avatar grows 10% while retaining the image-space stair boundary. Initial head/shoulder attention faces About, then hover/manual input takes ownership. Labels now use ivory rectangular plaques, gold inset/corner detail and number medallions; subtitle, supporting line and Explore reveal on hover/focus/touch selection. Open top navigation replaces the glass capsule. Background contrast/saturation/clarity reduced. Numbered waypoints guide without restoring the deleted character dotted path. Revisited destinations enter immediately; first visits retain character alignment then camera travel. Movement remains a prototype, not a new locked architecture.

Changed layers.config.js, LayeredWorld.jsx, WorldHUD.jsx, WorldCharacter inputs, WorldControls.jsx and WorldRefinement.css. Existing water/environment/fallback/content structure retained. Lint/build passed. Stair boundary checks passed 24 contacts over six sizes. Browser validation and limits recorded in docs/layered-world/astra-refinement.md.


## 2026-09-29 Functional compass

Latest user request makes the existing compass interactive. Its needle follows the character/look bearing; click, Enter or Space uses the existing World reset to cancel pending travel, restore the default camera and return the portrait rail to the first island. Gold/ivory design, bounded stairs, routes and content retained; no new movement decision locked. Changed WorldHUD.jsx, LayeredWorld.jsx and WorldRefinement.css. Lint/build passed; Edge checks at 1440×810 and 430×932 passed direction updates, travel cancellation without delayed navigation, keyboard activation, reduced-motion mobile reset and touch-target bounds. Physical devices/Safari unverified.


## 2026-09-29 Latest compass and World HUD correction

Restore a restrained decorative compass: fine gold ring/ticks, ivory/navy directional star, small cardinal letters at bottom-right. It is non-interactive and does not reopen a destination map. Remove World Quick View and the dotted character-to-recommendation path. Preserve island label recommendation diamonds and primary top navigation. This supersedes previous compass removal/Quick View restoration instructions below.

## 2026-09-29 Latest four-island focus and hierarchy

Explicit final brief: primary 2560×1440; four islands, relative widths Projects 100%, Skills 75%, About 70%, Contact 68%. About upper-left, Skills lower-center-left, Projects central-upper, Contact right-center. Keep current golden art; reduce backdrop/airship saturation and contrast with pale-blue distance haze, never a black overlay. Labels use tiny gold 01–04 and title only; short secondary/CTA reveal on hover, focus and touch preview. Recommendation gold diamond is weaker than hover and cyan/gold selection. Top nav WORLD/ABOUT/SKILLS/PROJECTS/CONTACT; no compass map; Quick View + System retained. Character hover dwell 240ms, subtle upper-body response, commit pose blend 450ms before 1.55s total travel. Portrait uses large native scroll-snap island browsing with top navigation. These user-approved layout/interaction revisions supersede older five-island and compass instructions below; interiors remain undecided.

## 2026-09-29 Latest World exterior reference

The supplied golden fantasy references now govern the World exterior: warm sunset left, rich blue sky/crescent planet right, luminous cloud ocean, deep faceted floating cliffs, ivory architecture with gold and royal blue detail. Five distinct independent islands remain: cottage, crystal workshop, central monumental castle, celestial observatory and lighthouse. This supersedes the terrace-only exterior direction below; existing HUD, typography, navigation and interior decision states remain.


## Latest System and introduction treatment

System is now a small icon-only gear at top right, aligned with the header and retaining a 44px target. Use existing blue glass/ivory-gold detailing with a restrained static glow; open settings downward. Intro copy sits over translucent backdrop-blurred glass rather than an opaque white wash. Compass stays at bottom right. This supersedes the bottom-left System and ivory intro backing below.

## Latest explicit HUD simplification

Remove World HUD Quick View and Menu controls. Keep the thin blue cardinal compass freestanding at bottom right, and place compact pale-glass System at bottom left within safe areas. Preserve direct navigation through the top capsule and compass map, including Resume. Portrait layouts retain visible top destination links. Improve the approved left introduction with a soft-edged ivory backing, navy text and stronger body weight; retain the scenery and copy. This supersedes older Quick View/Menu/System placement instructions below.

## HUD reference-detail correction

Latest screenshot revision: horizontal white JY monogram/name lockup; blue-glass top navigation and utility capsules with delicate double ivory/gold outlines, separators and star/diamond accents. Quick View/System share this shell with small vector icons. Island names remain navy on pale ivory/blue plaques, now with shaped gold frames and destination icons. Compass uses thin blue cardinal lines and a faint local legibility wash, without a filled circular button or heavy border; it sits above System. Existing navigation/movement behavior and approved Korean copy remain unchanged. No reference coordinates or decorative project claims are copied.

## Latest World HUD refinement — explicit user brief

World > Character > Destination > HUD > Typography. Retain the current scenery and use a low pale-glass capsule nav, subtle active diamond, ivory/pale-blue island labels with thin gold ornaments and navy text. Scene-local HUD palette uses existing navy/blue with warm ivory `#f7f5ee` and restrained gold `#b79a61` for the requested treatment. No dark label rectangles, large hover scale or duplicated top Sound/Motion. Supplied Korean copy replaces prior handwritten/English marketing copy. Projects remains dominant; surrounding landmarks use 60–70% of its desktop width.

Bottom Quick View, functional compass with small map, contextual selected-destination action and System stay inside safe areas. Tablet/portrait reframe the scene; mobile touch selects then confirms. World lookout arrow/WASD movement is now explicitly requested and overrides previous exclusions below, within a bounded foreground region only. Reduced motion preserves user movement as discrete steps and immediate route access. Existing typography, scene assets and blue-white water direction remain.

## Latest water palette correction

The latest user reference supersedes the earlier turquoise water direction: sky-blue/clear blue pool surfaces and pale blue waterfall shadows with predominantly white foam/highlights. Avoid a green/teal cast. Preserve warm ivory architecture and foliage; apply water-specific grading rather than a global scene hue shift.

## 2026-09-28 Vivid grand world reference revision

Latest user direction applies the grand limestone architecture, warm ivory sunlight, blue sky and turquoise water palette across all five islands. Projects remains dominant; each other landmark stays distinct. Lower city buildings/bridges and left cloud forms must remain legible: use depth through spacing and selective atmospheric layers instead of globally washing out the background. Independent island/water/cloud motion remains required. This supersedes the earlier globally reduced backdrop saturation/contrast instruction.

## 2026-09-28 Projects interior reference and movement

User requested a grand circular glass exhibition hall with spatial depth and character movement. Stage larger near-side exhibits and smaller rear exhibits around an open central entrance; retain warm stone reflections, cool sky and a central hanging banner. Use independently interactive exhibit and character layers. Bounded movement is authorized for this gallery only; other interior designs and World-map movement remain undecided. Mobile follows character position within the panoramic scene and retains persistent HTML destination controls. Reduced motion uses immediate positioning; case studies never require arrival.

## 2026-09-28 Latest terrace reference refinement

Latest supplied reference uses bright ivory Mediterranean/classical architecture: stepped villas, circular glass workshop, monumental terraced gallery palace, open celestial colonnade and lighthouse terraces. Keep Projects largest, sparse cypresses/natural trees, readable limestone cliffs and turquoise flowing water. Foreground uses worn stone steps, curved parapets and ruined columns with restrained planting. Preserve independent island/character/environment layers. This supersedes earlier gothic castle silhouettes for the world exterior only; no companion or broader interaction changes are implied.

## 2026-09-28 Reference material clarification

User-approved visual correction: wide walkable island tops and asymmetric stepped cliffs; large readable rock planes with localized vegetation; naturally grouped tree canopies with visible branches; varied grass and flowers between exposed foreground stones. Avoid repeated narrow cones, pebble/scale-like stone patterns and uniform dense moss. Foreground should establish human scale; distant scenery should recede through lower contrast/saturation while preserving source resolution. Keep independently interactive layers and living motion; matching these references does not mean replacing the scene with a single image. This does not lock interior destination designs or character movement.

## 최신 사용자 수정 — 레퍼런스 질감과 독립 레이어 유지

추가 사용자 요청: World를 브라우저 전체 화면에 연속적으로 채운다. 상단 풍경과 하단 카드 영역을 분리하지 않는다. 콘텐츠 직접 접근은 풍경 위의 펼침 메뉴로 제공하고 세로 화면에서는 섬 배치를 조정한다.

사용자의 최종 설명은 “이전처럼 섬 단위로 분리하되 레퍼런스의 섬 형태·질감·배경 형태·질감”을 구현하는 것이다. 정지 이미지 한 장이나 전체 화면 영상으로 대체하지 않는다. `인트로/01.png`, `02.png`의 밝은 청색 하늘, 따뜻한 식생, 깊은 절벽, 청록색 물, 풍부한 구름과 식별 가능한 배경 섬·비행선을 기준으로 독립 레이어를 구성한다. 섬별 부유, 물 흐름, 구름과 비행선 이동을 개별 제어한다. 이미지 재구성 결과를 원본 픽셀과 완전히 동일하다고 표현하지 않는다.

전체 풍경과 콘텐츠 직접 접근을 함께 제공하며 모바일 확대 탐색은 선택 사항이다. 기존 정지 원본 방향은 사용자 의도에 대한 잘못된 해석으로 폐기한다. 콘텐츠 내부 공간과 자유 이동은 계속 미확정이며 이번 수정으로 LOCKED로 바꾸지 않는다.


## 2026-09-28 사용자 Master Build 우선 적용

아래의 과거 방향과 충돌할 때 이번 사용자 지시를 우선한다. Portfolio World 외관은 About의 개인 스튜디오/큰 나무, Skills의 Creative Tech Workshop, Projects의 웅장한 현대 갤러리, Q&A의 천문대, Contact의 등대로 구분한다. Projects가 가장 큰 시각적 중심이다. 낮의 밝은 2.5D 세계에 독립 부유, 물/구름/안개/선택적 식생 움직임을 적용한다.

Hover/Focus는 환경과 캐릭터의 미세 반응, Click/Touch는 구름을 통과하는 카메라 진입으로 연결한다. Reduced Motion과 직접 콘텐츠 접근은 유지한다. Power Up, Companion, WASD, Jump, Collision은 적용하지 않는다. 아래 과거 문구에 있는 Game Item/Toolkit 및 Point-based Character Movement를 이번 구현의 확정 요구사항으로 취급하지 않는다. 각 콘텐츠 내부 공간의 최종 디자인과 자유 이동은 여전히 미확정이다. Typography는 Pretendard Variable + Instrument Serif를 유지한다.


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
