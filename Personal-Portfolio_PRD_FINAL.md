# Personal Portfolio — current PRD entry point

Latest user clarification (2026-09-28): retain the independently separated island architecture and make its island silhouettes, rock/vegetation/water textures, background forms and colour resemble supplied `인트로/01.png` and `02.png`. The user explicitly rejected the static whole-image approach and clarified that a whole-scene video is also not the intended architecture. Independent islands and living environment are required together with reference fidelity. Existing routes, accessibility and portfolio facts remain required. The earlier interpretation that static fidelity takes precedence over independent motion was incorrect and is superseded.

Updated 2026-09-28 for the user's PORTFOLIO WORLD MASTER BUILD request.

The baseline product requirements remain in [Personal-Portfolio_PRD.md](Personal-Portfolio_PRD.md). This entry point resolves the previously missing `_FINAL` reference without deleting or replacing that baseline.

## Latest user-approved World direction

- Real World → Portal → Tool Universe / Transformation → Landing → Living Portfolio World → interactive exploration.
- Approximately 10–12 seconds from ENTER WORLD to arrival; skip, reduced motion, direct content access and fast revisit remain required.
- Five distinct destinations: About = cozy origin studio, Skills = arcane creative workshop, Projects = grand contemporary creative gallery, Q&A = sky observatory, Contact = horizon beacon.
- Projects is the visual anchor, approximately 1.4–1.7 times the other islands' visual width and the most stable floating motion.
- Bright daylight, soft stylized 3D appearance, 2.5D depth and a living environment. Independent floating, flowing water, cloud depth, mist, vegetation, character idle and occasional background life.
- Hover/focus makes the environment and character react. Click/Enter/tap starts a short camera approach with foreground/cloud occlusion before opening the content route.
- Character has navigation reactions; free movement, WASD, jump, collision, progression and companion systems are excluded. Taco remains in the Real World.
- Actual projects, roles, evidence and limitations must remain unchanged. Core content remains accessible without cinematic playback or WebGL.

## Boundaries

The master brief specifies island exteriors and the direction of entry. It does not approve new project facts, final interior designs for every content page, or unrestricted character navigation. Reference images containing Power Up, companion animals, scores or invented projects do not override the written direction.

Implementation state, tested behavior and remaining limitations are in [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) and [the build audit](docs/portfolio-world-master-build.md). Visual measurements and motion timing remain refinable implementation values under DESIGN_SYSTEM.md.
