# Portfolio World HUD and lookout movement — 2026-09-28

## Audit and scope

Read package.json, current PRD/Design System/Project Context, AGENTS.md, CLAUDE.md and design-to-react skill. React 19/Vite 8/React Router 7 remain. Installed GSAP owns camera travel; CSS owns floating/ambient/decorative UI motion; WebGL owns waterfall and basin flow. Framer Motion, Three.js and Lenis were available but no additional dependency was necessary.

`PortfolioWorld.jsx` delegates to `LayeredWorld.jsx`; the world is already composed of independent transparent island/foreground assets. Kept all six v10 scene plates, current blue-white water, cloud/bird/leaf systems and portfolio data. Reused existing gallery character front/side/back idle and four-frame walking strips. Current uncommitted gallery/RealWorld/video work was preserved. Router and case-study content were not changed.

Before this change, top navigation linked directly, labels had dark navy backgrounds, Quick View existed as a disclosure, and local motion pause duplicated the application's stored preference. There was no functioning world compass or world character controller. Global sound already supported a short selection tone. Gallery movement remains its separate implementation.

## Implemented

- Exact supplied Korean headline/body and JY identity; low glass capsule navigation with World active marker, focus and pressed states; compact Menu contains destinations and Resume.
- Ivory/pale-blue labels, gold outline/diamond, supplied subtitles and focus/touch-equivalent secondary information. Projects stays dominant (desktop 34% scene width, other islands 21–23.5%). Reframed existing composition to give copy room, raised Skills to avoid foreground planting.
- `useWorldWalk.js` confines arrow/WASD movement to foreground paving: x 18–34%, foot y 87.5–94%. No jumping, physics, traversal across bridges, or gameplay progression. Inputs in controls/panels are not hijacked. Key release, blur and visibility loss stop walking; reduced/paused motion uses discrete user-initiated steps. Camera remains fixed during walking.
- Existing reference-based 2.5D directional sprites, subtle whole-body idle, directional destination look. First-session guide disappears after three seconds or first pointer/movement input. Persistent screen-reader movement instructions remain.
- Selection marker and contextual Enter action; upper-right lookout entrance proximity provides default Projects/E action. Mouse/keyboard enter directly. Touch first selects, second tap or Enter action enters.
- Compass ring follows avatar heading/look in the fixed-camera view; edge marker uses actual projected destination bearing. Click opens a compact five-destination map; second click/Escape closes it.
- Quick View directly exposes Profile/Skills/Projects/Q&A/Contact/Resume plus project summary, bypassing cinematic travel. Bottom System owns the shared persisted Motion/Sound settings. OS reduced motion cannot be overridden. Sound means the existing selection effect; no soundtrack was invented.
- Camera approach lasts 1.45 s on first entry, 0.6 s on repeat visits. Cloud occlusion, immediate direct link, reduced-motion immediate navigation and deadline fallback remain. New selections replace earlier travel, movement input cancels travel and its deadline.
- History-key changes reset travel even when Back interrupts the destination render before the world unmounts. Travel status sits above bottom HUD controls, preserving compass/System access during entry.
- Landmark-specific focus/hover/touch responses: warm studio windows, workshop data sweep, gallery gateway light, observatory ring, single beacon sweep. Shared reduced-motion/pause handling remains.

## Validation

- `npm run lint` and `npm run build` pass.
- `qa/fullscreen-check.cjs`: all 19 specified desktop/mobile/boundary sizes; labels hit-test correctly, no overflow, Quick View Escape/focus, direct navigation and 200% zoom access pass.
- `qa/world-hud-check.cjs`: movement/heading, boundary, guide, entrance action, cancellation including delayed fallback, latest-click wins, compass routing, persistence, OS reduced motion, keyboard focus, touch two-step entry and direct Resume access pass.
- `qa/world-hud-layout.cjs`: Menu/Quick View/Compass/System overlay bounds and character safe area at nine sizes including 2560×1440, 390×844 and 1280×600; image-failure direct navigation pass. Desktop1440×810 and mobile390×844 screenshots inspected.
- Updated existing water/basin/ambient QA to open System before toggling motion. Flow, pause/resume, reduced motion and WebGL-failure navigation pass; ambient clouds, birds, leaves and canopy still move.

## Limits

This remains a layered 2.5D scene. Walking uses the existing four-frame sprites; hair, clothing and straps are not independently rigged. The compass expresses avatar direction and screen-space destination bearing, not a simulated 3D compass. Physical mobile devices, Safari, screen-reader software and measured Core Web Vitals have not been tested. All contents remain accessible without movement, artwork or WebGL.
