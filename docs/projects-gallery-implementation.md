# Projects sky gallery — 2026-09-28

## Implemented
- `/projects` retains its existing React route, factual project data and case study destinations.
- GalleryHUD and ProjectPedestal separate screen-space controls from the panorama and character controller.
- Bounded WASD/arrows and floor click/tap movement. Proximity preview, E/Enter selection, pointer preview, explicit selection, separate CASE STUDY entry.
- Shared motion pause and reduced motion: movement becomes discrete, ambient animation stops. Blur/hidden stop walking.
- Daylight ivory atrium, pale gold details, separate existing project sculptures, light plaques, active rings/halo, moving cloud layer, dust, sunlight/floor shimmer and restrained camera breathing.
- Mobile panorama follows character, project picker gives direct access to all four exhibits, touch guide and compact HUD. Existing project descriptions/roles are preserved.

## Asset provenance
- `public/assets/production/images/project-gallery/hall-sky-v2.webp`
- Built-in imagegen edit, input existing `hall-depth.webp`; original output preserved at `C:/Users/EZEN/.codex/generated_images/01a0e5e8-ed3f-7723-b64f-bae0878ff3bf/exec-74b637e5-cfa5-4b31-afc1-ed2e1b0b14c2.png`.
- Optimized with Sharp WebP quality 93, no new runtime dependency.
- Prompt: Preserve 16:9 camera perspective and existing four pedestal placements (near x16/84%, far x34/65%) and central circular platform. Create bright daylight aerial fantasy atrium with ivory limestone arches, restrained gold inlays, open blue sky and distant floating limestone islands/waterfalls. Sparse Mediterranean/cypress landscaping. Blank central navy gold-edged banner. Empty pedestals; no objects, character, animals, UI, logos or text.

## Validation
- ESLint and Vite production build pass.
- Headless Edge: WASD movement, four exhibit selections, reduced-motion proximity/E selection, case study route and browser back, shared motion pause.
- 17 viewport configurations from 360×800 to 2560×1440, including breakpoint boundaries: no horizontal overflow, all six nav links present. See `projects-gallery-qa.json` for actual dimensions.
- Visual screenshots reviewed at 1440×810 and 430×932; screenshots also captured 1920×1080.

## Limitations / further refinement
- This is a bounded 2.5D gallery, not free 3D. Background architecture, banner texture and distant islands are raster scenery; cloud/light/dust and exhibit layers animate independently. No independent background-island geometry or simulated vegetation.
- Existing project sculptures are conceptual artwork, not actual app screenshots. Real project mockups would make the Jaduya display more specific.
- Automated viewport checks are not a manual visual audit of every viewport. Screen reader and real touch-device tests remain outstanding.
