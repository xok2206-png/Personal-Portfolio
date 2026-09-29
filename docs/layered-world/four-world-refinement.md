# Portfolio World — four-destination final refinement

Date: 2026-09-29. User source: attached Korean final World Map brief (27 sections). This request supersedes prior five-island/compass directions. No new dependencies or artwork generation.

## Audit before edits

- Branch `main`; prior golden-v11 work was uncommitted and retained. Read package.json, AGENTS.md, CLAUDE.md, PRD entry point, DESIGN_SYSTEM, PROJECT_CONTEXT, router, LayeredWorld, layer configs, WorldHUD, controls, movement, light/water and Contact/QA/QuickView components.
- Five independently composited islands already existed; CSS floats, WebGL water, GSAP camera and React links were reusable.
- `activeId = hovered || selected || proximity` conflated recommended/hover/selected, and even allowed hover to outrank travel.
- Character `view` was computed immediately from bearing; image src and scaleX switched on every hover. No hover dwell threshold or pose blend. Camera began after 150ms, before a deliberate alignment phase.
- Compass exposed a second destination map; Quick View existed as a route but was missing from World HUD.
- Portrait packed five small islands into the same viewport. Background and moving airships competed with foreground destinations.
- QA was a separate route/page in global, gallery and quick navigation. Its six existing answers can be reused without changing facts.

## 1. Q&A removal/integration

Removed Q&A from islandLayers, worldDestinations, the legacy destinations export, global/menu navigation, gallery navigation and World navigation. The existing QA component is now an h2 section inside Contact. `/qa` redirects with replace to `/contact#qa`; hash focus/scroll, reload and existing external links still work. Contact retains GitHub, the original email-availability state, Resume and inquiry copy. No FAQs or project facts were invented or removed. Old Q&A art/decorative CSS is retained as unused historical material, not rendered as a World destination.

## 2–3. Four islands / composition

| Order | Island | Desktop left / top | Width (viewport) | Relative to Projects |
|---|---|---|---|---|
| 01 | About | 14% / 17% | 25.2% | 70% |
| 02 | Skills | 30% / 48% | 27% | 75% |
| 03 | Projects | 42% / 10% | 36% | 100% |
| 04 | Contact | 74% / 38% | 24.5% | 68% |

Projects remains the main landmark; Contact occupies the newly opened right region. Compact desktop and ultrawide have separate reframe rules. Existing golden-v11 house/workshop/castle/lighthouse plates, lookout, character and independent effects are retained.

## 4–5. Navigation / compass

WORLD / ABOUT / SKILLS / PROJECTS / CONTACT. Top nav and island entry call the same handler. Any island is immediately selectable, regardless of recommendation. Quick View is a direct link to the existing readable portfolio route, bypassing travel. Compass/map UI is removed. System remains. New selection replaces old travel; Escape/Cancel clears its GSAP timeline and fallback timer. A visible direct route link is available while travelling. System blocks keyboard movement, including keys held before opening it.

## 6. Labels / guide

Small gold 01–04 + title on compact ivory/pale-blue glass with thin gold edge. Projects slightly larger. PROFILE / CAPABILITIES / SELECTED WORKS / CONTACT · Q&A and EXPLORE → appear for hover/focus or touch selection only. First guide: “탐험을 시작해보세요 / 방향키로 이동 · 마우스로 섬 선택”; dismisses after 2.7s or input. Small bottom-left help persists. Touch copy explains swipe and two-tap entry.

## 7–8. Recommended / hover / selected

- Recommendation: first unvisited World destination (initially About), subtle gold diamond/label and short dotted waypoint. Session memory only; never gates access. Hidden while user interaction takes priority.
- Hover/focus: brightness 1.06, saturation 1.06, contrast 1.02, scale 1.012 and existing landmark-specific lights. Other islands remain visible (saturation .87, contrast .94); ambient playback rate/water clock becomes .6. Web Animations playback rate preserves phase rather than restarting a float cycle.
- Selected: distinct cyan/gold marker and label. Touch first previews; second tap or ENTER commits. Committed selection owns character direction and camera; subsequent hover cannot override it. Native rail movement clears stale touch preview when a different card becomes current.

## 9. Background depth

Existing sky raster gets saturation .62, contrast .78, brightness 1.08 and .5px blur. Pale blue gradients apply stronger haze in lower/distant regions. Airships are smaller/less saturated with lower contrast and opacity. Main island plates retain sharp edges and warm light. No black overlay; no removal of the cloud-sea world.

## 10–11. Character discontinuity and fix

Root cause: immediate src replacement and dynamic scaleX flip in hover-derived state, plus camera starting before alignment. New WorldCharacter renders permanently oriented back/front/left/right pose layers and cross-fades opacity, so direction never flips the same layer instantly. Hover has a cancellable 240ms dwell threshold; only the latest target is retained. Upper sprite segment responds by at most 2.2 degrees/1.5px; lower segment stays fixed. Hover-out eases to neutral in 400ms. Commit blends full-body pose in 450ms; camera starts at 500ms and reaches route at ~1.55s, with an independent 1.85s recovery deadline. Heading target uses the shortest angular delta. Movement outranks idle hover; committed travel and System lock movement. Escape cancels travel. This is an honest 2.5D sprite approximation, not skeletal head tracking or a 3D turn animation.

## 12–13. Responsive / reduced motion

Primary 2560×1440. Compact desktop repositions islands; ultrawide caps width. Portrait shows one large island with next-island peek in a native horizontal scroll-snap rail (76vw mobile / 60vw tablet). Swipe or 44px previous/next controls browse; persistent top links enter any route. Before animated mobile nav travel, the chosen offscreen island is brought into view. Portrait waypoint is omitted for clarity. Reduced motion routes immediately, disables decorative motion/blending, uses immediate rail paging and retains discrete keyboard movement and all information.

## 14. Modified files for this refinement

- src/scenes/PortfolioWorld/LayeredWorld.jsx — distinct interaction states, shared travel, recommendation, rail, recovery.
- src/scenes/PortfolioWorld/layers.config.js — four destinations, numbers/copy, placement and optional recommendation memory.
- src/scenes/PortfolioWorld/WorldHUD.jsx — four-link nav, Quick View, removed compass, pager and System lock reporting.
- src/scenes/PortfolioWorld/WorldCharacter.jsx (new) — stable hover and fixed-facing pose blends.
- src/scenes/PortfolioWorld/WorldRefinement.css (new) — targeted final composition/state/depth/character/portrait styles.
- src/scenes/PortfolioWorld/useWorldWalk.js — blocked input and held-key cleanup.
- src/scenes/PortfolioWorld/FlowingWater.jsx — focus-aware clock speed without clock reset.
- src/scenes/PortfolioWorld/IslandLife.css — environmental reactions follow focused island.
- src/scenes/PortfolioWorld/WorldControls.jsx — short desktop/touch guidance.
- src/scenes/PortfolioWorld/world.config.js — remove independent QA destination.
- src/App.jsx; src/pages/Projects/GalleryHUD.jsx; src/pages/QuickView/QuickView.jsx — four-destination navigation consistency.
- src/app/router.jsx — backward-compatible QA redirect.
- src/pages/Contact/Contact.jsx; src/pages/Contact/Contact.css (new); src/pages/QA/QA.jsx — FAQ integration, section links and hash focus.
- src/data/content.js — remove obsolete QA navigation entry only; profile, projects, skills and FAQ facts unchanged.
- Personal-Portfolio_PRD_FINAL.md; DESIGN_SYSTEM.md; PROJECT_CONTEXT.md — latest explicitly approved direction and actual state.
- qa/four-world-check.cjs; qa/four-world-preview.cjs; qa/four-world-swipe.cjs; qa/golden-water-check.cjs — behavior/layout checks, visual captures and updated fallback navigation.
- docs/layered-world/four-world-*.png; four-contact-mobile.png; four-world-report.json; golden-water-report.json; golden-world-desktop.png; this report — QA evidence.

## Validation

- npm run lint: PASS. npm run build: PASS, 69 modules. No dependencies added.
- four-world-check: PASS, zero page errors. 21 sizes: 2560×1440, 1920×1080, 1440×810, 1366×768, 1180×820, 1024×768, 768×1024, 430×932, 402×874, 390×844, 360×800, 767×900, 768×900, 1023×900, 1024×900, 1279×900, 1280×900, 1919×1080, 1920×900, 1280×600, 2560×1080. All desktop labels/nav remain in bounds; all four portrait labels were paged into view and hit-tested. No document overflow.
- Recommendation, delayed hover, transient-hover rejection, return to neutral, body-pose stability, 60% inactive animation rate, movement/System lock, alignment-before-travel, selected priority, cancellation timer, latest-destination wins: PASS.
- Contact six FAQs, `/qa` redirect/hash focus/reload, keyboard Enter, Back/Forward, 200% zoom Quick View, touch two-tap and all-four paging: PASS.
- Native touch-event swipe and non-reduced mobile offscreen-destination reframe: PASS.
- Water clock changes, pause/resume, reduced-motion stillness, image/WebGL failure direct navigation: PASS.
- Visually inspected 2560×1440, 1440×810, 430×932 and stable-hover/Contact captures.
- Physical touch devices, Safari and measured Core Web Vitals remain unverified. Email and original resume file remain unavailable in the existing content; no fabricated replacements.
