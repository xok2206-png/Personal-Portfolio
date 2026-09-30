# About workroom assets

## Current: wide open atelier, 2026-10-01

The user's new screenshot and scale correction supersede the close interior below.
The live scene uses `terrace-workroom-v2.webp`, a pulled-back open workshop with a
smaller left desk, rear noticeboard/bookshelf, right archive chest and a continuous
central walking floor. The background has no baked UI, text or character. Existing
morning colors, character identity, HTML content and compact reading panel remain.
Full prompt, source path and production details: [wide-atelier-prompt.md](wide-atelier-prompt.md).

Object hit regions and light masks use the new 1672 × 941 image coordinates. The
character width is 6.4% of the image, down from 8.2%. Walking feet are constrained
to y=60–80%, with horizontal bounds interpolated between back (44–62%), middle
(37–79%) and front (36–63%) floor rows. Atmospheric foliage masks, clouds, sunlight
and cup steam were relocated to the new environment. No new animation library.
Portrait crops retain the direct list for all five contents; clipped objects are inert.

## Historical: first morning interior

Implementation date: 2026-10-01. User brief: 2026-09-30.

- Tool: built-in `image_gen` (imagegen skill), one environment edit.
- Source: `public/assets/source/about-studio/morning-workroom-v1.png`.
- Browser asset: `public/assets/production/images/about-studio/morning-workroom-v1.webp`.
- Dimensions: 1672 × 941. WebP quality 88, 199,210 bytes.
- References: `public/assets/production/images/natural-world/about-room-v1.webp`
  (existing room) and `public/assets/production/images/seasonal-world/about-island-v1.webp`
  (existing tree/library island). Both were visually inspected before generation.
- Existing character identity and directional sprites are reused from
  `public/assets/production/images/project-gallery/character/`.
- Original assets remain intact. Generated environment contains no UI, labels or characters.
- The generated window/desk/shelf/board/box/door coordinates were inspected and then
  fitted to the requested interaction layout; all click regions and prompts are HTML.
  Floor feet stay at x=23–84%, y=73–92%, in front of the desk. The desk does not
  require a foreground mask because the walker cannot enter the desk footprint.
- The room uses the 1672:941 coordinate plane, covering a fixed single viewport.
  Object anchors are projected into a separate HTML layer without moving them away
  from their objects. Portrait mobile uses a room crop; cropped targets are inert.
  All five direct entries remain in a collapsed viewport menu; there is no stacked
  content section below the room.
  All breakpoints open a compact panel from the right, with only its body scrolling.
- Character sprite style is inherited from the current World/Projects identity.
  No new character art or physics engine was generated.

## Runtime motion — 2026-10-01 follow-up

The user requested stronger discoverability and a visibly living room. The initial
five numbered labels were superseded by the later object-light direction below.
No new generated image or video was needed.
`StudioAtmosphere.jsx` uses a native WebGL shader to displace only green pixels inside
the existing plant regions; the desk, walls, object coordinates and original image remain fixed.
Rendering is limited to approximately 30fps and 1800px width with a capped pixel ratio.
The existing `natural-world/painted-cloud-v1.webp` moves inside the window; CSS owns
the separate sunlight, cloud shadow and cup steam layers. No full-frame camera loop.
Opening content, motion pause, reduced motion, a hidden tab or an offscreen room stops
the atmosphere. The original image remains underneath the canvas for WebGL failure.

## Object light — latest 2026-10-01 direction

The user rejected persistent colored cards and requested Palworld/Zelda references,
light on the objects themselves, and a smaller panel shown only after selecting.
`StudioItemLights.jsx` traces the laptop silhouette, one book spine, the open notebook,
pinned papers and archive box in the same 1672 × 941 image plane. The SVG paths are
functional light masks using existing Ivory/Cloud tokens, not a new environment asset.
Staggered corner glints indicate availability; hover, focus or proximity illuminates
one contour and shows a compact one-line HTML prompt. Selection hides these effects
and opens the shared right panel, at most 360 × 560px. Reduced motion pauses the glints.
The existing room, content, fonts, navigation, camera and environmental motion remain.

Official references inspected: [Pocketpair Palworld](https://www.pocketpair.jp/en/games-en/palworld-en/)
and [Nintendo Zelda](https://www.nintendo.com/us/store/products/the-legend-of-zelda-breath-of-the-wild-switch/).
The implementation interprets an environment-first exploration interface; no game
artwork, HUD graphics, logos, colors or fonts were imported.

## Final generation prompt

Use case: precise-object-edit

Asset type: text-free 2.5D environment background for an interactive About portfolio room, landscape 16:9.

Input images: Image 1 is the existing room to redesign; Image 2 is the existing About island, a world/material reference. Preserve the belonging to this warm stone and wooden tree-library world, but recompose the room entirely to the following layout.

Primary request: a believable working studio in gentle morning sunlight, painterly stylized 2.5D adventure game environment, matte materials, simple broad color planes, clean silhouettes, deliberately sparse practical furnishing. An elevated three-quarter camera looking down enough to clearly see open wooden floor. The entire room fills the landscape frame, no floating island, no vignette.

Composition: Upper 12% quiet plaster wall and beam area kept free for HTML navigation. Large arched window in LEFT wall at image x=17% y=34%, showing pale morning blue sky, soft ivory clouds and muted green tree foliage. One practical warm brown WORK DESK in middle at x=46% y=51%, width about 31% frame. On its right a clearly recognizable open contemporary laptop at x=52% y=49%, screen a quiet blue-gray without interface or text; on its left an open working notebook at x=38% y=53%. Include laptop trackpad/keyboard, a small mouse and an orderly short cable on desk, a single used ceramic mug near laptop. Bookshelf on back wall at x=62% y=32%, width 15% frame, filled with plain books of warm brown, muted sage and ivory spines, no letters. Small wall-mounted cork board on RIGHT wall at x=81% y=44%, some blank pinned papers and no writing. Closed small archive storage box on floor at x=19% y=77%. Arched wooden exit doorway in right wall at x=91% y=72%. Keep floor from x=28 to 78%, y=65 to 92% EMPTY for a walking character, without rugs or decor obstacles. Do NOT draw a character, chair in the open walking floor, pet, human, HUD, label, text, icons or marker. Very little foreground obstruction.

Lighting: Morning sunlight enters from upper LEFT window, warm ivory highlights, broad soft deep blue-navy cast shadows to lower right, physically consistent furniture perspective and contact shadows. Warm plaster/stone, medium-to-dark warm wood, muted natural sage plants only one small plant at window. Colors harmonized to existing palette: pale sky #DDEEF5, haze #A9D4E5, light #F6F3EA, ivory #F2EBDD, stone #D8D0BE/#B9AE96, vegetation #78965F/#405A45, navy shadow family #0B315B. No neon, no purple, no mint, no turquoise emissive lights.

Avoid: giant fantasy props, random scattered clutter, banners, crystals, shiny plastic render, gloss, bloom, excessive leafy vines, tiny high-frequency texture, text of any kind, UI, logos, borders, extreme wide angle or cinematic shallow blur. Environment image only.
