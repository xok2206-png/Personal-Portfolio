# Golden cloud-sea World — 2026-09-29

User request: replace five islands and background with the four supplied fantasy references. This updates World exterior art only. Routes, factual content, HUD, character controller and independent layered architecture remain intact. No companion or new movement design was introduced.

## Assets and generation

Built-in image_gen was used, with the supplied first image as the reference for sky/islands and second image for the lookout. Seven independent PNG outputs are preserved in `public/assets/source/world-layers/*-golden-v11.png`; alpha-preserving WebP production copies are in `public/assets/production/images/world-layers/*-golden-v11.webp`. Total production size: approximately 3.73 MB. Existing assets are retained. `qa/prepare-world-v11.cjs` records the output mapping and repeatable format conversion (no chroma key or manual pixel recoloring).

Prompt set / production brief:
- Background: wide 16:9 background plate matching the reference; remove five foreground islands and connecting bridges; warm golden sun upper left, blue sky and crescent planet upper right, immense cream cloud ocean, distant tiny castle islands and mountains, miniature lower-right castle city. Open central composition; no UI, people or animals.
- Projects: transparent square central blue-and-gold castle island; pointed ivory towers, royal blue star banners, glowing blue circular arched gateway, broad terraces, deep inverted faceted limestone cliffs and narrow white-blue waterfalls. Complete silhouette, no other islands or external bridges.
- About: transparent square upper-left cottage island; natural branching trees, golden brown roofs, glowing ivory cottage, bell tower and ruined arch, garden terraces, deep asymmetric limestone cliffs and two waterfalls.
- Skills: transparent square crystal workshop; central blue crystal within delicate gold orbital rings, circular ivory/gold stepped platform, blue glass workstations, sparse trees, inverted limestone cliffs and two waterfalls.
- Q&A: transparent square celestial observatory, based on upper-right castle; ivory spired open colonnade, gold armillary sphere and small telescope on terrace, blue roof accents, sparse cypresses, deep cliffs and two waterfalls.
- Contact: transparent square lighthouse island; ivory lighthouse with gold lantern/roof, arched villa terraces, sparse cypresses and pink trees, blue pools, deep cliffs and two waterfalls.
- Lookout: transparent 3:2 foreground; left ancient stone wall with leaves, warm lanterns, dark blue/gold star tapestry, worn stone steps, broad landing and low parapet along bottom. Golden sunset rim light, shadowed foreground. No people, dog, islands or sky.

All island prompts specify detailed cinematic 3D fantasy materials, warm left sunlight/cool right fill, complete isolated silhouette, actual alpha, no UI/text/people/animals. The results are generated interpretations, not pixel-identical extractions.

## Integration

`layers.config.js` uses five versioned plates and image-aligned waterfall rectangles. `LayeredWorld.jsx` uses the new sky and lookout; the old distant basin image and BasinWater instance are no longer rendered because their coordinates/content belong to the previous background. Their source files remain. Island CSS/JSX aligns decorative glow, crystal, gateway, celestial and beacon effects with the new plates. Background grading is neutral; desktop bridge positions fit the revised composition. Existing responsive portrait layout remains.

## Verification

- npm run lint: passed.
- npm run build: passed, 66 modules.
- Existing fullscreen-check: 19 viewport checks passed (all required sizes and breakpoint boundaries), no overflow, five reachable labels, direct route/back, compass keyboard close, reduced-motion navigation and 200% zoom navigation.
- Visual inspection: 1440×810 and 430×932 screenshots.
- golden-water-check: flowing water changes over time, pause and reduced motion are still, resume works; WebGL-disabled direct navigation passed.
- Physical devices, Safari, measured LCP/INP/CLS and pixel-identical fidelity are not verified. Scene remains layered 2.5D raster art with procedural water, rather than a fully modeled 3D world.
