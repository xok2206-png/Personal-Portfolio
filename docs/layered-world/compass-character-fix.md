# World compass and character visibility correction — 2026-09-29

User request: restore a compass matching the design, remove Quick View and the character dotted path, fix movement flicker.

Changes: WorldHUD.jsx now renders a non-interactive gold/ivory/navy SVG compass at bottom-right, with no map, button or tab stop. Quick View is removed from this World HUD; the existing /quick-view route and other pages are retained. LayeredWorld.jsx removes the dotted path renderer, state and measurement code; island recommendation diamonds remain. Updated screen-reader guidance refers to top navigation.

Flicker audit found compounded transitions: a direction-pose fade ran while every idle layer also faded away, but only the incoming active pose showed its walk layer. An observed sample had outgoing pose alpha .930292 × idle .738351 and incoming pose alpha .0697081, exposing bright scenery behind the character. Walking images could also hide idle before decoding.

WorldCharacter.jsx now gates walking on atlas decode success; delayed/failed atlases keep the static character. WorldRefinement.css switches ready idle/walk layers without a second opacity fade and blends complementary direction-pose opacity with plus-lighter inside an isolated group. Unsupported browsers use immediate pose switching to avoid the visibility dip. Existing selected turn duration, hover look and bounded movement remain. A dedicated four-cell animation uses only 0/-25/-50/-75% offsets, including the loop endpoint, rather than relying on an off-atlas -100% keyframe.

No assets, routes, factual content, movement bounds or dependencies changed. Prior uncommitted work retained.

Validation: compass-character-check.cjs passed four-direction opacity checks (28 samples, total pose alpha ~1), valid frame offsets at loop boundaries, delayed/failed walk atlas visibility, reduced-motion navigation, and compass bounds at 2560×1440, 1440×810, 1024×768, 430×932, 390×844 and 360×800. Desktop1440/mobile430 screenshots visually inspected. npm run lint and npm run build passed. Physical devices/Safari unverified.

Modified production files: src/scenes/PortfolioWorld/WorldHUD.jsx, LayeredWorld.jsx, WorldCharacter.jsx, WorldRefinement.css. Updated PRD/Design System/Project Context latest direction; added qa/compass-character-check.cjs and baseline audit script, refreshed four-world-check.cjs to use top navigation instead of removed Quick View. Evidence: compass-character-report.json and compass-fix-1440.png/compass-fix-430.png.
