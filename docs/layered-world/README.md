# Reference-derived independent World layers

2026-09-28. Current route: `/world-map`.

Latest ambient revision: `WorldAtmosphere.jsx/.css` adds local waterfall spray, haze ribbons, staggered flying leaves and foreground grass sway. Cloud layers drift at separate depths; airships use long cross-screen paths that reset offscreen. The former three-second noise reset was replaced with a seam-matched periodic water overlay. Underlying waterfall artwork remains static; this is a subtle overlay, not a simulated fluid. Baked background trees are not independently rigged. `ambient-report.json` records passing frame-boundary continuity, moving pixels, pause/resume and reduced-motion checks; `fullscreen-report.json` records 19 passing layouts and menu/navigation. Lint/build passed. No new assets or packages were required.

Background quality correction: runtime background/basin now use native 2688×1520 lossless WebPs. `background-quality.json` verifies decoded pixels match the source PNGs. Previously both were resized to 2400×1357 and lossily compressed. There is no CSS backdrop blur; source atmosphere and the existing basin blend remain. Combined background bytes increase to 9.43 MB; this is fidelity preservation, not new high-resolution detail or a performance certification. Reproduce with `qa/preserve-background-quality.cjs`.

Latest layout adjustment: the World now occupies the complete browser viewport. The separate lower card section and optional landscape enlargement were replaced by an overlaid disclosure menu. Portrait screens use a separate island arrangement. `fullscreen-report.json` / `qa/fullscreen-check.cjs` supersede the old layout tests: 19 viewport checks, menu keyboard/Escape, direct Contact, reduced-motion route entry and 200% CSS-zoom navigation passed. Lint/build passed. Previous motion checks below remain historical evidence; no ambient-motion code changed in this layout adjustment.

The user wanted the earlier independently separated islands with the supplied reference's forms, colour and texture. A static screenshot and a whole-scene video did not meet that request. This revision restores independent layers and replaces the earlier art with reference-conditioned transparent reconstructions.

## Changes

- `src/scenes/PortfolioWorld/PortfolioWorld.jsx` exports `LayeredWorld.jsx`.
- `LayeredWorld.jsx`, `LayeredWorld.css`, `layers.config.js` own this scene. Five island links preserve the existing About, Skills, Projects, Q&A and Contact routes. No portfolio content or project facts changed in this revision.
- Five islands have different float periods (19/23/31/21/27 seconds), phases and amplitudes. Projects is largest and most stable. Each uses an actual transparent WebP asset.
- Waterfall areas use masked, animated SVG displacement of their own source texture. No bright synthetic waterfall stripes or whole-scene video. The source image remains visible if SVG motion fails.
- Cloud depth layers, two airships, lookout, bridges and character are separate assets. CSS owns ambient movement; GSAP owns the bounded camera entry. Pause, reduced motion, visibility and offscreen state control ambient animation.
- Mobile retains an overview plus readable direct navigation and optional expanded landscape. Image failures preserve destination labels and direct links. A 1.5-second watchdog provides a route-entry deadline; reduced motion uses normal links immediately.
- Existing Real World/portal assets, router, content and other pages remain unchanged by this revision. No dependency was added. No free movement, game progression or companion behavior was introduced. Interior designs remain WORKING.

## Assets

Source PNGs: `public/assets/source/world-layers/`. Runtime WebPs: `public/assets/production/images/world-layers/`. Reference: supplied `인트로/01.png`. Model/job IDs and exact prompts are recorded in `assets.json`. Higgsfield GPT Image 2.5 generated these reconstructions at high quality. Alpha was checked before use. WebP optimization uses Sharp; it does not repaint the assets.

The first background reconstruction retained large islands and was rejected as the main backdrop. A revised clean background is used; the first is visible only through a lower-basin mask for distant river/island depth. Earlier static and whole-video experiments remain on disk but are not mounted by the World scene.

## Validation

`qa/layered-check.cjs` writes `report.json` and viewport screenshots. Chromium/installed Edge headless, local Vite server.

- All 19 viewport checks passed: 2560×1440, 1920×1080, 1440×810, 1366×768, 1180×820, 1024×768, 768×1024, 430×932, 402×874, 390×844, 360×800, plus 767/768, 1023/1024, 1279/1280 and 1919/1920 breakpoint pairs. Checks cover horizontal overflow, loaded images, 44px label targets and unobstructed label center hit tests.
- Ten behavior checks passed: five destination entries/reload/Back, keyboard Tab/Enter, cancellation of camera navigation on unmount, independent transforms plus changing waterfall pixels, pause/resume of CSS/SVG clocks, offscreen pause/resume, mobile touch/expansion, failed images, reduced motion, and 200% CSS zoom.
- Moving island labels are clicked using their observed on-screen centers after a hit test. Playwright's default stable-element click waits forever on ambient floating elements; this is why coordinate-based clicks are used in the test.
- ESLint and Vite build passed. No browser page errors during the automated run.

## Remaining limits

These are reference-conditioned assets, not pixel-identical cutouts. Island architecture, character proportions and some edges differ. Water is local texture displacement, not a fluid simulation. Distant islands remain background details; trees/grass do not yet move independently. Character idle and selected-direction response are whole-layer transforms, not articulated character animation. The camera approaches and fades into existing content rather than traversing a modeled island interior.

Native browser zoom, Safari, Firefox, real phones, low-power devices and production LCP/INP/CLS have not been measured. This revision does not certify the entire Master Build as complete.
