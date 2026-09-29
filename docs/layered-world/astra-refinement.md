# ASTRA brief refinement — 2026-09-29

Implemented against the existing 2.5D world, with no new dependency or art generation.

- Four destinations retained; Projects remains the largest. About moved from 14/17 to 16/20 percent. Contact width 24.5 → 27.4 percent. Desktop/avatar width +10%; portrait +10%.
- Initial About head/shoulder attention; intentional hover or movement ends initial attention. Existing 240 ms dwell, 450 ms body pose blend and first-visit travel retained. Previously visited sections bypass travel.
- Number medallions, ivory/gold nameplates, progressive supporting descriptions; refined open top navigation and lower-contrast distant art.
- Latest prompt requests decorative-only compass, superseding the immediately prior reset behavior. Existing WORLD link still resets camera/portrait rail. No Quick View or character dotted line restored.
- Existing independent ambient motion, four original project/content routes, FAQ integration, reduced motion and stair restriction preserved. No working decision promoted to locked.

Validation: lint/build passed. Existing four-world browser suite covers 21 required/boundary/short/ultrawide sizes, labels/nav, hover/cancel, keyboard, touch selection, 200% zoom, Back/Forward, direct QA redirect, failed image/WebGL fallback. Stair suite passed 24 boundary contacts across six sizes. Visual inspection at 2560×1440 and 430×932. Physical devices, Safari and Core Web Vitals unverified. The character remains a layered sprite, not a rigged 3D model.
