# Reference fidelity revision — 2026-09-28

The user approved preserving supplied `C:/Users/EZEN/Downloads/최종/인트로/01.png` exactly, prioritizing source composition, colour and texture over the previous separately generated assets.

## Delivered

- `src/scenes/PortfolioWorld/PortfolioWorld.jsx` and `.css`: original artwork with semantic island/top-menu links, keyboard focus feedback, bounded 0.9-second camera approach and reduced-motion direct navigation.
- `public/assets/production/images/portfolio-world/reference-world.png`: unmodified source copy. `reference-world.webp`: lossless runtime conversion, 4351×2449, 10,109,534 bytes. Decoded RGBA buffers compare identical. Browser scaling, display colour management and aspect-ratio letterboxing still vary by device.
- Original printed menus and labels are preserved; matching HTML links provide actual navigation without painting duplicate labels over the artwork.
- The earlier replacement islands, CSS waterfall stripes, artificial mist/cloud overlays, tiny substitute airship and separate character no longer render in World. Their existing assets are retained for other routes or future review.
- Desktop fits the full composition. Mobile provides overview, optional horizontally scrollable enlargement and readable direct-access links. Existing portal video, destination pages and project facts remain unchanged.
- Prior World source snapshots are retained in this folder.

## Validation

`npm run lint`, `npm run build`, and `git diff --check` passed (Git reported existing line-ending warnings).

`qa/reference-check.cjs`: 19 viewport layouts passed (11 required sizes and 8 boundary cases); 7 navigation/accessibility/recovery checks passed. No uncaught page errors. The suite verifies source pixels, image aspect ratio, hit regions, reload/back, keyboard, transition cleanup on another navigation, mobile enlargement, image-failure links, reduced motion and 200% CSS zoom. See `report.json` and screenshots in this folder.

## Current limits

This is the approved static fidelity stage. Water, waterfalls, clouds, airships and character are not independently animated. Only hover/focus feedback and route-entry camera motion are active. No claim of completed Living World animation is made. The full-resolution lossless image prioritizes exact fidelity over download size; production network performance, native browser zoom, Safari and real-device testing are not established by these local checks.
