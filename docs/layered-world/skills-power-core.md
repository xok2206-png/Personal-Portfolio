# Skills Power Core

User reference: codex-clipboard-96b5bf2f-9bcf-40c4-8551-0b4dad978a53.png. Detailed brief: attachment feb37924-c06c-434b-b3c1-a3a6db2d1a84.

## Assets
Built-in imagegen edited the supplied reference. Originals in public/assets/source/skill-chamber; WebP files in public/assets/production/images/skill-chamber. Existing character artwork is reused from project-gallery/character. All are local project assets.

- temple: exec-075e05ce-fe66-433c-a532-b08744556953.png. Prompt: preserve reference architecture, lighting and composition; remove all UI/text/logos, player, orbiting orbs, center crystal/rings/beam; reconstruct empty circular ivory/gold platform and entrance walkway, navy banners, sunset floating islands, thin architectural blue waterfalls. No animals.
- core: exec-414908ec-271c-4b8f-b123-f51fba2eba10.png. Prompt: isolated large faceted translucent cyan/sapphire diamond, dark blue center, two thin gold orbital rings, small ornate pedestal, transparent background, no text/logos/scene/people.
- orb: exec-ffecec0f-ec15-4063-a714-c984273f449a.png. Prompt: single round faceted sapphire crystal with dark empty logo center, glowing cyan rim, small gold/ivory pedestal, transparent background, no writing/people/background. Color variants use CSS hue rotation; labels and tool marks are separate semantic HTML/SVG. ChatGPT/Higgsfield use abstract symbols with visible text labels.

## Ownership
useSkillOrbit owns positions and smooth focus/return; CSS owns inner float and activation feedback. Existing useGalleryWalk owns character position, with Skills-specific ground mapping and optional initial position. SkillCharacter reuses idle and four-frame walk sheets with fixed layers and upper-body hover look. Shared PortfolioUIContext owns pause/reduced-motion. Hidden page cancels orbit frames and walking.

## Validation / limits
See newest PROJECT_CONTEXT entry and qa/skills-chamber-check.cjs. Generated assets approximate the reference, not pixel-identical. Background waterfalls and banners are painted; no true 3D camera or independently animated architectural water. Direct skill information survives missing images and stopped animation. Three.js is transparently labeled exploration, not a completed project skill.
