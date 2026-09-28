# Personal Portfolio --- PROJECT_CONTEXT FINAL

## 2026-09-28 Unified reference-material revision v6

- User approved addressing the three supplied references as an overall composition/material problem. Replaced five islands, foreground lookout and framing tree with seven reference-conditioned transparent assets (`*-reference-v6.webp`). Wider walkable terraces, several stepped cliff buttresses, larger readable rock faces, naturally grouped tree canopies and grass/flowers around stone edges replace prior narrow pointed islands and dense repeating foliage. Sources/previous versions retained; prompts/jobs in `docs/layered-world/reference-v6.json`. Generations use the previously uploaded image matching the third supplied reference; these are interpretations, not exact extracted reference layers.
- `LayeredWorld.jsx`, `layers.config.js`, `LayeredWorld.css`, `WorldAtmosphere.css`, `FlowingWater.jsx`: new art sources, adjusted water outlets/labels, slightly shifted Skills, enlarged desktop explorer, replaced/positioned lookout, reduced background saturation/contrast/opacity for depth without downsampling or blur. All five source artworks omit falling water; existing procedural water now supplies each waterfall. Native background pixels retained. Independent floating/navigation, birds/leaves/clouds/mist and accessibility remain.
- Lint/build passed. All 19 viewport checks plus keyboard/direct-route/200% zoom checks passed. Water pixel motion, pause/resume, reduced-motion and missing-WebGL navigation passed; ambient transform/pause checks passed. Desktop 1440x810 and portrait 430x932 screenshots inspected. Physical-device/Safari performance not measured. No route/content/dependency or LOCKED product changes; other concurrent Real World edits preserved.

## 2026-09-28 Portal cinematic sizing fix — matches the pre-click screen now

- User reported the ENTER WORLD cinematic rendering visibly smaller than the start screen it replaces. Two likely causes fixed:
  1. `PortalCinematic.css` switched the video to `object-fit: contain` under 767px, letterboxing it (unlike the always-`cover` ambient video) — removed that override so it stays `cover` at every width, same as the start screen.
  2. `PortalCinematic`'s `position: fixed` section was rendered inside `RealWorld`'s own `.start-scene` box, which has `overflow: hidden` + `isolation: isolate` — a combination that can make browsers constrain a `position: fixed` descendant to that ancestor's (smaller, header-offset) box instead of the true viewport. `PortalCinematic.jsx` now renders via `createPortal(..., document.body)`, so it always sizes to the real viewport regardless of the RealWorld scene's own box.
- `npm run lint` / `npm run build` passed. Not verified in an actual browser (none available in this environment) — please confirm the cinematic now visually matches the start screen's size.

## 2026-09-28 First-screen ambient video swapped to the premium loop

- User added a new 5s/1920×1080/24fps HEVC clip to `public/assets/` (`Create-a-seamless-cinematic-ambient-loop.mp4`) for the Real World start screen (not the portal cinematic). Moved it to `public/assets/production/video/start-ambient-premium.mp4` and pointed `RealWorld.jsx`'s ambient `<source>` at it, replacing `start-ambient.mp4` (still on disk at `public/assets/`, unreferenced, not deleted). The `<video>` element already had `loop`, so no JS changes were needed — it loops automatically like the previous clip.
- `start-poster.webp` (used as this video's `poster` fallback frame) was not regenerated — it's still the old ambient clip's first frame, so it may not exactly match the new clip's opening frame. Could not extract a new poster frame (no ffmpeg/browser available in this environment).
- Codec caveat: same as the portal clip — HEVC in MP4. Browsers without HEVC decode simply won't show motion; `poster` + the static `.room-photo` layer underneath still render, so the screen doesn't break, it just stays static for those visitors.
- `npm run lint` / `npm run build` passed; confirmed the new file is included in `dist/assets/production/video/`.

## 2026-09-28 Visible ambient life and airy old oak

- User requested clearer falling water, an old foreground tree, swaying foliage, visible birds/leaves/mist and moving clouds. Added staggered accelerating foam packets to the continuous water shader without restoring saturated cyan coloration. These are procedural visual motion, not simulated fluid.
- Left tree now uses `foreground-oak-v5.webp`: aged bark and branches with open foliage. Two complementary canopy masks sway at different timings; individual leaves within the image are not rigged. Preserved bright sky visibility and existing island art/layout.
- Added three small SVG bird flocks with wingbeats/gliding, increased leaf size and on-screen time, increased depth-cloud travel and made three mist ribbons and waterfall spray more visible. Desktop has 15 birds, mobile reduces to six; reduced motion hides birds and loose leaves. Global pause/visibility still controls ambient CSS and water clock.
- Lint/build, 19 responsive viewport/navigation checks, water motion/pause/reduced/WebGL-fallback checks passed. `qa/living-world-check.cjs` verifies actual transform changes for clouds/mist/birds/leaves/canopy and pause/reduced behavior. Desktop 1440x810 inspected; physical-device/Safari performance unverified. No route, content or LOCKED product changes. Asset provenance: `docs/layered-world/foreground-oak-v5.json`.

## 2026-09-28 Water visual integration refinement

- User flagged the new wave effect as incompatible with the scene. Reduced cyan saturation, contrast, opacity, lateral bending and flow speed in `FlowingWater.jsx`; changed to fine silver-white descending streams and earlier mist fade. Softened the underlying CSS fallback gradient in `WorldAtmosphere.css`. Higher shader precision avoids coarse mediump noise artifacts. No scene/layout/content changes.
- Lint/build and waterfall pixel-motion, pause/resume, reduced-motion and unavailable-WebGL navigation checks passed. Desktop 1440x810 screenshot inspected. This remains procedural water; no claim of physically simulated or photorealistic fluid.

## 2026-09-28 Airy sky-island correction and flowing water

- User rejected the overgrown ancient-tree direction and specified open, bright Final Fantasy/Zelda/Ghibli-like sky islands. Replaced left tree with sparse light foliage and clean branches; replaced fern foreground with sparse meadow grasses. About now uses `about-airy-v4.webp` with exposed light rock, low meadow and a light-barked tree. Other four islands use the less-overgrown `natural-v2` versions again. New direction is applied first to About, not claimed as a completed all-island art redesign. Provenance: `docs/layered-world/airy-v4.json`.
- `FlowingWater.jsx` replaces the old low-opacity SVG streak overlay on all five islands. A continuously advancing WebGL noise field renders full cyan/white water curtains at capped resolution/30fps, with broad flow, fine foam and irregular edges; there is no video or periodic playback reset. About's baked waterfalls were removed in its new art, and spring positions are aligned to two dynamic falls. Other four islands still contain baked water beneath the new rendering. This is a procedural visual effect, not fluid simulation.
- Existing mist, floating parents, navigation and pause/reduced-motion/visibility handling remain. CSS water fallback renders if WebGL is unavailable; navigation does not depend on it. No dependencies/routes/content changes or new LOCKED decisions.
- Lint/build, 19 viewport checks, direct navigation and 200% zoom passed. `qa/water-shader-check.cjs` verifies changing waterfall pixels, pause/resume, reduced motion and WebGL-unavailable navigation; supersedes the old SVG period test via `qa/ambient-continuity.cjs`. Desktop 1440x810 inspected. Physical device performance and Safari remain unverified.

## 2026-09-28 Grand fantasy vegetation revision

- User approved replacing rounded vegetation with grand ancient-tree, fern, grass and trailing-vine forms. Five independently navigable island artworks and the left framing tree now use versioned `*-fantasy-v3.webp` assets. Added a transparent fern/grass/wildflower cluster at three foreground positions (two on mobile); old assets remain available. Generation provenance: `docs/layered-world/fantasy-vegetation-v3.json`.
- Foreground canopy and fern clusters share a 24-second gust rhythm with staggered response. Seven sparse drifting seed highlights (three on mobile) supplement existing leaf, cloud, mist, ship and waterfall animation. Existing pause, visibility and reduced-motion ownership applies. Vegetation inside island artwork remains baked imagery; this is layered ambient motion, not individually simulated branches or fluid.
- Changed `LayeredWorld.jsx`, `WorldAtmosphere.jsx/.css`, and production/source artwork. No route/content/layout or LOCKED product changes. No additional dependency. Native-resolution background preserved.
- Lint/build, 19 viewport layout/touch-target checks, direct-route/keyboard/200% zoom navigation and ambient continuity/pause/reduced-motion checks passed. Desktop 1440x810 and mobile 430x932 screenshots inspected. Actual-device/Safari performance remains unverified.

## 2026-09-28 Natural foliage/material revision

- User flagged round, artificial foliage/grass and similar island masses. Inspected source art: repeated rounded vegetation, stylized rock scales and a broad light alpha fringe on About, plus simple vector leaves/grass contributed to the mismatch.
- Five island textures and foreground tree now reference `*-natural-v2.webp`, generated as reference-conditioned material edits with finer pointed foliage and rougher fractured rock. Islands export at 1600²; tree at 1344×1800. Previous versions remain on disk. Some generated details differ; this does not imply pixel-exact preservation or completely eliminated rounding. Source alpha verified; provenance/prompts: `docs/layered-world/natural-materials-v2.json`.
- Updated native vector leaf contours to three irregular tapered variants, smaller size; grass blades are thinner and vary by tuft. Adjusted water/spray masks for revised assets. Existing layout, destinations, character, background and ambient ownership remain.
- Lint/build and 19 viewport checks passed. Ambient continuity/pause/reduced-motion checks also passed after final mask alignment. Actual-device/Safari frame pacing remains unverified. No product content or LOCKED decisions changed.

## 2026-09-28 Left foreground framing tree

- Added a transparent foreground oak: trunk along the left edge with an overhanging canopy across the upper-left. New asset `foreground-tree.webp` (1344×1800, 793 KB) is derived from the retained RGBA PNG. Generation prompt/job provenance is in `docs/layered-world/tree-asset.json`.
- `LayeredWorld.jsx` mounts decorative trunk/canopy layers; `WorldAtmosphere.css` softly masks their join and gives the canopy a small nine-second breeze. Existing pause/reduced-motion rules apply. Failed tree loads remove only this decoration. Character, islands, navigation and world movement remain unchanged.
- Logo is light over the dark canopy; the decorative intro copy moves into the clear space below the branches. Portrait sizing keeps destinations and character visible. No new dependencies or content/LOCKED changes.
- Lint/build and 19 viewport/navigation checks passed. Desktop 1440×810 and portrait 430×932 screenshots were inspected. Real-device/Safari verification remains outstanding.

## 2026-09-28 Continuous water and ambient detail

- Replaced the waterfall's three-second `feOffset` turbulence reset with a periodic 120-unit tile translated exactly one period. Subtle light/dark flow streaks are feather-masked to existing water regions; the original island artwork stays static underneath. This is an overlay flow effect, not fluid simulation or a new waterfall render.
- `WorldAtmosphere.jsx/.css` adds eight localized waterfall mist plumes, two low-opacity haze ribbons, twelve staggered leaf flights (six on small screens) and eighteen foreground grass blades (nine on small screens). Existing three cloud layers now have longer separate depth drift; two airships cross the screen on 181/237-second paths with offscreen wrapping and subtle vertical motion. Background/source trees remain baked into the art.
- Existing global ambient pause, document visibility, reduced motion and cleanup behavior remain in control. No new packages/assets, route changes, content changes or free character movement. The new local MP4 seen in git status was not modified or used.
- `qa/ambient-continuity.cjs` tests loop-boundary pixel difference versus ordinary motion, actual changing water pixels, pause/resume, CSS pause and reduced-motion behavior. Passed; see `docs/layered-world/ambient-report.json`. Native source imagery was fully decoded before comparison. Mean channel difference at the Projects loop boundary was 0.00254/255 vs 0.00192/255 for an ordinary equal time step; exact-cycle difference 0.000306/255 (raster rounding).
- Fullscreen QA again passed all 19 viewport sizes plus menu/route checks. Lint/build passed. Real device frame pacing and Safari rendering remain unverified. Earlier texture-displacement descriptions are superseded by this periodic-overlay approach.

## 2026-09-28 Portal cinematic now loops instead of playing once

- User asked for the ENTER WORLD clip to keep playing on a loop rather than a single pass. `PortalCinematic.jsx`'s `<video>` now has `loop`; removed `onEnded={finish}` (moot once looping — `ended` never fires on a looping element) and removed the unconditional 10s `deadline` timer that used to force-navigate to `/world-map` after a fixed time regardless of playback state. The 2.5s `startup` check (real failure: video never actually starts) is kept as the only automatic recovery path.
- Net effect: the cinematic now plays indefinitely until the visitor explicitly leaves via the "연출 건너뛰기" skip button, the "프로젝트 바로 보기" link, Escape, a failed video load, or `prefers-reduced-motion`. It no longer auto-advances to World on its own.
- `npm run lint` / `npm run build` passed. Not verified in an actual browser (none available in this environment).

## 2026-09-28 Portal cinematic swapped to the premium single-take clip

- User added a new 8s/1920×1080/24fps HEVC clip to `public/assets/` (`Create-one-continuous-premium-cinematic.mp4`) and asked for it to play when ENTER WORLD is pressed. Moved it to `public/assets/production/video/portal-journey-premium.mp4` and pointed `PortalCinematic.jsx`'s `<source>` at it, replacing the prior 10s/720p `portal-journey.mp4`/`.webm` pair (still on disk, unreferenced, not deleted).
- Rescaled the `onTimeUpdate` phase thresholds (`normal`/`monitor`/`reality`/`transit`/`arrival`) and the recovery deadline proportionally from the old ~10s timing to the new clip's 8s length (0.3/1.3/2.8/6.1/7.4s, 10s deadline), since the new clip's actual content/pacing was not viewed frame-by-frame — these are an estimate, not a verified shot-matched sync.
- Codec caveat: the source is HEVC in an MP4 container. Browsers/OSes without HEVC decode support will fail to play it; the existing `onError={finish}` handler already skips straight to `/world-map` in that case (matches the project's video-failure fallback principle), so playback failure does not block navigation, it just means some visitors won't see the cinematic. Not verified in an actual browser (no browser available in this environment).
- `npm run lint` / `npm run build` passed; confirmed the new file is included in `dist/assets/production/video/`.

## 2026-09-28 Background image quality

- Investigated the reported soft background: the browser used 2400×1357 lossy derivatives of 2688×1520 PNG sources, with no CSS blur. At the inspected 1221×720 / DPR 1.5 viewport, the source already exceeded the needed physical resolution; enlargement was not established as the cause. Source haze and the basin's existing blend also contribute to a soft appearance.
- The two background layers now use native-resolution lossless WebP (`background-native.webp`, `distant-basin-native.webp`). Decoded RGBA exactly matches each PNG source, verified in `docs/layered-world/background-quality.json`. No sharpening, generative repainting, layout or colour changes. This removes conversion loss but cannot restore detail absent in the source.
- Quality tradeoff: combined background transfer increases from about 1.87 MB to 9.43 MB. Production loading metrics remain unmeasured. Original compressed versions remain available on disk.

## 2026-09-28 Full-viewport World layout — latest adjustment

- User requested one continuous full-screen World without separate upper/lower sections. `LayeredWorld` now fills the browser viewport with no lower content cards or letterboxing. Existing island motion and assets remain intact.
- Direct content links, Quick View and Resume are in an accessible disclosure menu over the landscape. Escape closes it and restores summary focus. Portrait view rearranges all five islands, foreground and airships; decorative bridges are hidden there to avoid disconnected spans.
- `qa/fullscreen-check.cjs`: all 19 viewport sizes fill the viewport without document scrolling and preserve visible 44px island targets. Disclosure keyboard behavior, Contact navigation, reduced-motion entry and 200% CSS-zoom navigation passed. ESLint and Vite build passed. Current screenshots/report: `docs/layered-world/fullscreen-*`. Older overview/expansion tests describe the superseded layout. Real-device/Safari/performance limitations remain.

## 2026-09-28 Independent reference layers — latest state

The user clarified that the previous independent-island architecture must be retained, with reference-like forms, colour and texture. This supersedes the static reference and whole-scene video experiments.

- `/world-map` exports `LayeredWorld.jsx`. Five transparent reference-conditioned island reconstructions, a cleaned background, masked distant basin, three bridges, cloud layers, two airships, lookout and character form the scene. Production WebP assets live under `public/assets/production/images/world-layers/`; source PNGs and generation provenance are retained.
- Each island has a distinct CSS floating duration/phase/amplitude. Masked SVG displacement animates its own waterfall pixels. Clouds, ships and character idle have separate CSS ownership. No whole-scene video is mounted. Background islands remain image details; vegetation is not yet independently animated.
- Hover/focus highlights the selected destination; existing GSAP camera approach is bounded to 1.1 seconds with a 1.5-second recovery deadline. Existing routes, content facts, direct links and portal cinematic remain intact. Character reaction is a small whole-layer tilt, not an articulated rig.
- Local pause, OS reduced motion, page visibility and offscreen detection pause ambient CSS/SVG. Mobile offers an overview, readable direct links and optional horizontally scrollable enlargement. Failed island images retain labels; failed backdrop has a gradient fallback.
- These are reference-conditioned reconstructions, not exact cutouts: some architectural details and silhouettes differ from the source. Water uses local texture displacement rather than a physically simulated fluid; cloud wisps/vegetation are not fully separated. Final art fidelity and real-device performance remain to be refined.
- Current QA and screenshots: `docs/layered-world/`; reproducible browser checks: `qa/layered-check.cjs`. Earlier report folders describe superseded implementations. No npm package, gameplay, character controller or portfolio fact was added in this revision.

## 2026-09-28 Reference fidelity revision — historical, superseded

This historical implementation interpreted exact fidelity as priority over independent animation. The user rejected that interpretation. The bullets below describe the superseded static experiment, not the current World.

- World now displays that source artwork at its original aspect ratio with no colour filters, repainted water, replacement islands or synthetic clouds/airships. Lossless WebP conversion is verified against decoded source pixels. Source is 4351×2449; runtime asset is approximately 10.1 MB, a deliberate fidelity-first tradeoff, not a production performance claim.
- HTML links align with the five pictured islands and printed top menu. Hover/focus reveals a small action label. Click applies a brief whole-artwork camera approach; reduced motion enters directly. Existing content, route paths and portal video remain intact.
- Desktop preserves the complete artwork with letterboxing where necessary. Mobile provides the full composition, an optional horizontally scrollable enlarged view, and separate readable destination links. Direct links also recover from image failure.
- Waterfalls, clouds, ships and character are currently STATIC parts of the source. Independent living animation is deliberately deferred until it can preserve source fidelity; do not report the earlier animated build as the current World.
- Previous World JSX/CSS snapshots and current screenshots/results are in `docs/reference-revision/`. The earlier `docs/qa/world/report.json` applies to the previous build; current checks use `qa/reference-check.cjs`.


## 2026-09-28 Master Build — current implementation

This update takes precedence over older implementation-status statements below.

- `/world-map` now renders separate transparent island assets, sky/cloud depth layers, flowing-water overlays, mist, selective vegetation motion, occasional birds/leaves, a lookout and a reactive character. Islands float independently; Projects is the main visual anchor.
- Hover/focus selects a destination. Click/touch triggers a bounded GSAP camera approach with cloud occlusion before the existing content route. Direct navigation and reduced-motion access remain available. Existing project data is preserved.
- Real World entry plays an approximately 10-second generated portal/transformation/arrival clip, with skip, Escape, media-error recovery and a 12-second deadline. Same-session revisits go directly to World; replay is available. This is a first integrated cinematic asset, not final shot-by-shot approval.
- Five destination pages use an editorial arrival frame around existing content. Quick View exposes the existing four projects; Contact has a closing message and World return. No game progression, free character movement or companion system was added.
- Runtime assets are WebP (640/1200px island variants) and silent 720p WebM/MP4. Sources and provenance are retained. No npm dependency was added.
- QA covers required sizes and breakpoint cases, navigation, keyboard/touch, reduced motion, pause, media failure, storage denial and cinematic timing. Latest results: `docs/qa/world/report.json`. 200% testing is CSS zoom; native zoom, real devices, Safari and production performance metrics remain unmeasured.
- Details and limitations: `docs/portfolio-world-master-build.md`. Provenance: `docs/world-asset-manifest.json`. Existing missing resume/contact details were not invented.


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

**2026-09-28 구조 정리 5차 — RealWorld(`/`) 구현 교체:** 사용자 요청으로
기존 "WELCOME TO / main-title.png / START GAME" Mario 스타일 구현
(Fredoka 폰트, `main.png` 배경)을 삭제하고, 4차에서 보존해둔 신버전
Start 영상 자산(`/assets/start-ambient.mp4`, `/assets/start-poster.webp`)과
신버전 Hero 카피("Every great journey starts with a spark." 등)를 사용한
새 구현으로 교체했다. `WorldUI.jsx`/`styles.css`는 이미 삭제된 상태라
의존하지 않고 `RealWorld.jsx`/`RealWorld.css` 안에 자체 마크업·CSS로
재구현했다(공유 컴포넌트 신규 생성 없음). `prefers-reduced-motion`에서는
영상 대신 `start-poster.webp`를 배경으로 표시.

**동작 변화:** `ENTER WORLD` 버튼이 이제 `/character`를 거치지 않고
`/world-map`으로 직접 이동한다(신버전 Start.jsx와 동일 동작). 기존 헤더의
ABOUT/PROJECT/Q&A/CONTACT 인라인 nav도 신버전 구조에 맞춰 제거했다 —
신버전은 전역 헤더 nav를 가정하지만 이 프로젝트엔 아직 전역 헤더가 없어서,
직접 접근 경로는 `DIRECT ACCESS` 버튼 → `/quick-view` 하나만 남는다
(QuickView는 여전히 빈 Placeholder). `/character`는 이제 `RealWorld`에서
링크가 끊겨 `Ending`/`QuickView`와 같은 "참조 없음, KEEP 상태"가 됐다.

**새로 미사용이 된 것(삭제하지 않고 보고만):** `public/assets/production/
images/real-world/{main.png,main-title.png}`, `public/assets/production/
fonts/fredoka-variable.ttf` + `index.css`의 `@font-face 'Fredoka'` 선언 —
전부 이 교체 이전엔 RealWorld가 유일한 사용처였다.

**2026-09-28 구조 정리 5차-1 — CSS 정정:** 5차에서 작성한 `RealWorld.css`는
실제 신버전 `styles.css`를 읽지 않고(4차에서 그 파일을 내용 확인 없이
삭제했었음) 새 JSX 구조에 맞춰 **임의로 새로 만든 CSS**였다. 사용자가
실제 결과물이 신버전과 다르다고 지적해 원본 프로젝트 폴더
(`C:\Users\EZEN\Downloads\Personal-Portfolio-2026-09-28\Personal-Portfolio`)를
받아 실제 `src/styles.css`의 `.start-scene` 관련 규칙(base + 모든 반응형
breakpoint: 1700/950/600/370px, 두 short-viewport 조합, reduced-motion)을
그대로 확인한 뒤 `RealWorld.css`를 값 그대로 다시 작성했다. 전역 `.button`/
`.eyebrow` 등 범용 클래스명과의 충돌을 피하기 위해 전부 `.start-scene`
조상 선택자로 스코프했다. 원본이 쓰는 Pretendard 정적 서브셋 2개
(`pretendard-400.woff2`, `pretendard-700.woff2`)도 원본 폴더에서 그대로
복사해 `production/fonts/`에 추가하고 `index.css`에 `@font-face`를
등록했다.

**2026-09-28 구조 정리 5차-2 — 전역 Site Header 추가:** 사용자가 실제
배포된 신버전 스크린샷(로고 "MY PORTFOLIO WORLD", ABOUT/SKILLS/PROJECTS/
Q&A/CONTACT nav, WORLD MAP 버튼, 일시정지/음소거/메뉴 아이콘이 모든
페이지 상단에 있는 전역 헤더)을 보여주며 현재 버전엔 이게 없다고 지적했다.
원본에서 이 헤더는 `App.jsx`가 `<Routes>`를 감싸는 형태로 전역 렌더링하는
구조라, 이번에 다음을 새로 추가했다:
- [App.jsx](src/App.jsx) — `AppRouter`를 감싸는 전역 `<header className="site-header">`
  (brand/로고, `desktop-nav`, WORLD MAP 링크, 일시정지·음소거·메뉴
  아이콘버튼), `location.pathname==='/'` 기준 dark/light 테마 클래스,
  `world-motion-paused`/`world-sound` localStorage 상태, Web Audio
  `tone()` 효과음, 라우트 변경 시 포커스를 `<h1>`으로 이동시키는
  접근성 처리, "PORTFOLIO NAVIGATION" Direct Access 모달(`<dialog>`)을
  원본 그대로 이식했다. Modal/Icon은 별도 공유 파일로 부활시키지 않고
  `App.jsx` 내부 로컬 함수로 구현했다.
- [PortfolioUIContext.jsx](src/app/PortfolioUIContext.jsx) — 신규 추가.
  `router.jsx`를 거치는 개별 Scene/Page까지 `reduced`(모션 축소 여부)와
  `tone()`을 prop-drilling 없이 전달하기 위한 최소 Context. `RealWorld`가
  이 Context로 영상 재생/정지와 ENTER WORLD 효과음을 처리하도록 갱신했다.
- [index.css](src/index.css) — `:root` 변수(`--header`, `--display`),
  전역 reset, `.site-header`/`.brand`/`.desktop-nav`/`.header-controls`/
  `.map-link`/`.icon-button`/`.dark` 변형/`.skip-link`/`dialog`/
  `.adventure-body`/`.book-bottom`, 반응형(1180/950/600/370px), `html[data-
  motion=reduced]` 규칙을 원본 값 그대로 추가했다. `RealWorld.css`의
  `--header:0px` 국소 고정은 제거하고 이제 전역 `--header` 값을 그대로
  쓰도록 되돌렸다.

**알려진 한계:** Skip Link(`href="#main"`)는 `RealWorld`(`id="main"`)에서만
동작한다. About/Skills/Projects/QA/Contact 등 나머지 old 페이지는 각자
다른 id(`about_world` 등)를 쓰고 있어 아직 연결되지 않는다 — 페이지별
콘텐츠/디자인은 이번 범위(전역 헤더 추가) 밖이라 손대지 않았다.

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
│     │  ├─ main.png           (2026-09-28 5차 이후 미사용 — RealWorld가 더 이상 참조하지 않음)
│     │  └─ main-title.png     (2026-09-28 5차 이후 미사용)
│     └─ fonts/
│        ├─ pretendard-400.woff2        (2026-09-28 5차-1 추가, RealWorld.css에서 실제 사용 중)
│        ├─ pretendard-700.woff2        (2026-09-28 5차-1 추가, RealWorld.css에서 실제 사용 중)
│        ├─ pretendard-variable.woff2   (파일 존재, @font-face 미선언 — 여전히 미연결. 실제로는 위 정적 서브셋 2개를 사용)
│        ├─ fredoka-variable.ttf        (RealWorld.css `--display` var로 실제 사용 중)
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

**2026-09-28 구조 정리 4차 — 외부에서 추가된 병렬 구현 정리:**

세션 밖에서 완전히 별도의(추정: OpenAI Sites 계열) 구현체 한 벌이 이
Repository에 통째로 추가됐다. `src/App.jsx`/`src/main.jsx`가 `./app/router.jsx`
대신 자체 `<Routes>`를 직접 정의하도록 덮어써져 있었고, `src/scenes/{Start,
Character,PowerUp,WorldMap}.jsx`(flat), `src/pages/{Content,Projects}.jsx`
(flat), `src/components/WorldUI.jsx`, `src/styles.css`, `src/data/content.js`,
`server/higgsfield/`, `qa/`, `scripts/postbuild.mjs`, `docs/`,
`AGENTS_FINAL.md`/`PROJECT_CONTEXT_FINAL.md`/`Personal-Portfolio_PRD_FINAL.md`
/`SKILL_FINAL.md`, `package.json`(이름 `junyoung-portfolio-world`로 변경,
`gsap`/`three`/`framer-motion`/`lenis` 제거 + `@fontsource/*` 추가), 신규
media asset(`public/assets/{room,portal,start-poster,world-sprites}.webp`,
`start-ambient.mp4`)이 함께 딸려 왔다. `AGENTS.md`/`CLAUDE.md`/
`DESIGN_SYSTEM.md`/`PROJECT_CONTEXT.md`/`README.md`/`SKILL.md`도 이
구현체의 문서(각각 `*_FINAL.md`를 가리키는 얇은 pointer)로 덮어써져 있었다.

**확인 결과:** `package.json`이 바뀌었지만 이 로컬 환경에서 `npm install`이
실행된 적이 없어 `node_modules`와 불일치했고, 실제로 `npm run build`가
`@fontsource/fredoka` 미설치로 실패하는 상태였다(그쪽 산출물의 "build 통과"
기록은 이 저장소 기준이 아니었음).

**사용자 결정 (2026-09-28):** 라우팅 구조는 기존 `router.jsx` + 폴더형
`scenes/`·`pages/`를 그대로 사용하고, 새로 온 구현체의 실제 텍스트
콘텐츠(`src/data/content.js`의 profile/projects/skills/faqs/destinations)만
가져와서 채운다. 시각 컴포넌트(`WorldUI.jsx`)·전용 CSS(`styles.css`)는
가져오지 않는다(기존 구조 디자인은 이번에 변경하지 않음).

**실행한 작업:**
- `src/App.jsx`, `src/main.jsx`, `package.json`, `package-lock.json`을
  드롭 이전 커밋(`97343c5`) 기준으로 복원 — `AppRouter` 경유 구조와
  `gsap`/`three`/`framer-motion`/`lenis` 의존성 복구.
- `AGENTS.md`, `CLAUDE.md`, `DESIGN_SYSTEM.md`, `PROJECT_CONTEXT.md`,
  `README.md`, `.agents/skills/design-to-react/SKILL.md`도 같은 커밋
  기준으로 복원한 뒤, 이 섹션에 오늘 실제 변경사항을 반영.
- `src/data/content.js`는 그대로 유지하고, `pages/About`, `pages/Skills`,
  `pages/Projects`, `pages/ProjectDetail`, `pages/QA`, `pages/Contact`,
  `scenes/PortfolioWorld`가 이 데이터를 import해서 실제 콘텐츠(이름/직무/
  소개, 프로젝트 4개 각각의 Problem/Decision/Implementation/Result/
  Limitation, Skill 3분류, FAQ 6개, World Map 목적지 sub-label)를 렌더링하도록
  채웠다. 기존에는 전부 `<h1>ABOUT</h1>` 같은 빈 Placeholder였다.
- **`pages/Resume/Resume.jsx` 신규 추가 + `router.jsx`에 `/resume` Route
  추가.** About/Skills/Projects×4/Q&A/Contact/**Resume**는 AGENTS.md·
  CLAUDE.md의 LOCKED 목록에 이미 포함돼 있었지만 기존 Router에는 Route가
  없었던 항목이라 이번에 데이터 재사용으로 채워 넣었다.
- 완전히 미참조로 확인된 신버전 전용 파일을 삭제: `src/scenes/{Character,
  PowerUp,Start,WorldMap}.jsx`(flat), `src/pages/{Content,Projects}.jsx`
  (flat), `src/components/`, `src/styles.css`, `scripts/`, `qa/`,
  `docs/audit/`, `docs/baseline/`, `AGENTS_FINAL.md`, `PROJECT_CONTEXT_FINAL.md`,
  `Personal-Portfolio_PRD_FINAL.md`, `SKILL_FINAL.md`, `.openai/`,
  `public/assets/fonts/pretendard-{400,700}.woff2`(이미 `production/fonts/
  pretendard-variable.woff2`와 중복).
- **의도적으로 보존한 것(현재 미연동, 향후 판단용):**
  `public/assets/{room,portal,start-poster,world-sprites}.webp`,
  `start-ambient.mp4`(실사용자 제공 영상의 웹 변환본으로 추정, Real World
  구현 시 재사용 가치 있음) / `server/higgsfield/`, `docs/higgsfield-api.md`,
  `.env.example`(로컬 전용 에셋 생성 API, 현재 `package.json`에 구동
  script·의존성이 연결돼 있지 않아 지금은 비활성 상태) / `docs/font-licenses/`
  (참고용 라이선스 텍스트). 이 항목들은 현재 App에서 import되지 않는다.

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
/resume               → Resume                 (2026-09-28 신규 추가 — LOCKED 목록에 있었으나 Route 없던 항목)
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

2026-09-23 실제 코드 검색 결과, 2026-09-28 5차-1에서 갱신:

  Font                    File                                                    실제 사용                              Classification
  ------------------------ ------------------------------------------------------- --------------------------------------- ----------------
  Fredoka                  `fredoka-variable.ttf`                                  `index.css` @font-face + `RealWorld.css`의 `--display` var (`h1`) 실사용   KEEP (RealWorld Start 신버전 이식에서 계속 사용)
  Pretendard (정적 서브셋)  `pretendard-400.woff2`, `pretendard-700.woff2`         2026-09-28 5차-1 추가. `index.css` @font-face + `RealWorld.css`의 기본 `font-family` 실사용   KEEP — 원본 신버전 그대로 이식
  Pretendard Variable      `pretendard-variable.woff2`                             파일만 존재, `@font-face` 선언 없음, 어디서도 미적용            미연결 — Design System Primary(Variable) 적용은 여전히 별도 작업 필요
  Instrument Serif         없음                                                     Repository에 Font 파일 자체가 없음                              Asset 없음 — 임의 다운로드하지 않음, 필요 시 별도 확보
  Silkscreen (Regular/Bold) `silkscreen-regular.ttf`, `silkscreen-bold.ttf`         `@font-face`/`font-family` 참조 전혀 없음                        UNUSED / REMOVE CANDIDATE
  RetroMario               `retromario-regular.otf`                                참조 없음                                                        UNUSED / REMOVE CANDIDATE
  SuperMario256            `supermario256.ttf`                                     참조 없음                                                        UNUSED / REMOVE CANDIDATE

Fredoka와 Pretendard 정적 서브셋은 둘 다 Design System의 최종 기준
(Pretendard Variable + Instrument Serif)이 아니지만, RealWorld Start
신버전 이식이 실제로 사용 중이라 KEEP. Design System 최종 폰트 적용은
Real World 디자인이 확정된 이후 별도 작업으로 진행한다.

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
- **`/character`, `/ending` 라우트:** `router.jsx`에 등록되어 있으나 앱
  내 어디에서도 Link로 연결되지 않는다(Direct URL로만 접근 가능) — 5차
  RealWorld 교체로 `ENTER WORLD`가 `/world-map`으로 직접 이동하면서
  `/character`도 이때 링크가 끊겼다. `Ending`의 "GAME CLEAR / STAFF
  ROLL" 내용은 PRD의 Removed Scope와 겹친다. 2026-09-28에 사용자에게
  다시 확인 → **KEEP FOR NOW로 재확정**.
- **`/quick-view` 라우트:** 2026-09-23엔 참조 0건이었으나, 5차-2(전역
  헤더 추가)에서 `RealWorld`의 `DIRECT ACCESS` 버튼과 헤더 메뉴 모달의
  `DIRECT ACCESS` 링크가 실제로 이 경로를 가리키게 되어 **이제 실사용
  중**이다. 다만 `QuickView.jsx` 자체는 여전히 빈 Placeholder라 실제
  콘텐츠는 없다.
- **Pretendard Variable:** 파일은 존재하지만 `@font-face` 선언이 없어
  실제로 로드되지 않는다(실제로는 정적 서브셋 `pretendard-400/700.woff2`가
  RealWorld에 연결되어 사용 중, 07번 참고).
- **Instrument Serif:** Font Asset이 Repository에 없다. 임의로 다운로드
  하지 않았다.
- **Silkscreen/RetroMario/SuperMario256:** 코드 참조 없음(REMOVE
  CANDIDATE). 2026-09-28에 사용자에게 재확인 → KEEP FOR NOW.
- **RealWorld의 구 Asset 미사용화:** `main.png`, `main-title.png`도
  5차 RealWorld 교체 이후 미사용(REMOVE CANDIDATE). 2026-09-28에 사용자
  확인 → KEEP FOR NOW.
- **`portal.webp`, `room.webp`, `world-sprites.webp`:** 4차에서 보존한
  신버전 Asset 중 실제로 RealWorld 포팅에 쓰인 건 `start-ambient.mp4`/
  `start-poster.webp`뿐이고 이 3개는 미사용(REMOVE CANDIDATE). 2026-09-28
  사용자 확인 → KEEP FOR NOW.
- **Asset 목표 구조(source/production) 미적용:** 현재 `public/assets/`는
  `production/`만 일부 적용되어 있고(images/real-world, fonts) `source/`는
  아직 없다. Real World 구현이 본격화될 때 다시 판단한다.
- **2026-09-28 Higgsfield 도구 제거:** `server/higgsfield/`,
  `docs/higgsfield-api.md`, `.env.example`은 `package.json`에 구동
  script·의존성이 연결되지 않아 완전히 죽은 코드 상태였다. 사용자 확인
  후 제거했다(`docs/font-licenses/`는 무해한 참고 자료라 유지).

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

**2026-09-28 구조 정리 4차(외부 병렬 구현 정리 + 콘텐츠 이식) 실제 검증 결과:**
- 정리 시작 시점 `npm run build` → **실패**(`@fontsource/fredoka` 미설치,
  새 `package.json`과 `node_modules` 불일치) — 실제로 확인 후 기록.
- `App.jsx`/`main.jsx`/`package.json`/`package-lock.json` 복원 직후
  `npm run lint` → 에러 없음, `npm run build` → 성공(39 modules).
- 신버전 전용 파일 삭제 후 `npm run lint` → 에러 없음, `npm run build` →
  성공(39 modules, 에러 없음).
- `npm run dev` / Browser 수동 확인(Direct URL, Refresh, Back/Forward,
  `/resume` 포함 전체 Route, Reduced Motion, Responsive)은 이번 작업에서
  실행하지 않았다 (미검증).

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

