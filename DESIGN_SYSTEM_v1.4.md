# PERSONAL PORTFOLIO — DESIGN SYSTEM v1.4

> Status: Final Foundation Review v1.4  
> Primary World Reference: **1440 × 810 / 16:9**  
> Core Experience: **Playable Interactive Portfolio**

---

## 01. Core Principles

이 프로젝트의 목적은 “게임을 만드는 것”이 아니라,
**디자인 의도를 이해하고 직접 조작 가능한 반응형 웹 경험으로 구현할 수 있는 사람**이라는 점을 증명하는 것이다.

### 1. PLAYER
캐릭터는 장식용 일러스트가 아니라 **사용자의 Player Avatar**다.

### 2. LIVING WORLD
기본 경험에서 주요 Game Scene은 살아 움직인다.  
단, 사용자가 Reduced Motion / Motion Pause를 선택하면 장식성 움직임은 줄거나 멈출 수 있어야 한다.

### 3. DEPTH
완성 이미지 한 장에 의존하지 않는다.  
World는 Layer / Parallax / Scale / Shadow / Blur / Occlusion / Camera Framing으로 공간감을 만든다.

### 4. JOURNEY
주요 Navigation은 단순 Page Switch보다 다음 흐름을 우선한다.

`발견 → 선택 → 이동 → 상호작용 → 전환 → 콘텐츠`

단, Quick View / Direct Link / Browser Back / Reduced Motion에서는 긴 연출을 강제하지 않는다.

### 5. PORTFOLIO FIRST
게임 연출보다 다음이 우선한다.

1. 이름 / 직무 / 핵심 강점 전달
2. 프로젝트 접근성
3. Case Study 가독성
4. Contact / Resume 접근성
5. 게임 연출

### 6. GUIDED, NOT LOCKED
권장 순서는 존재하지만 사용자는 원하는 World / Project로 직접 이동할 수 있다.

### 7. PLAY, BUT NEVER BLOCK CONTENT
게임 조작 실패, Asset Failure, Reduced Motion 상태에서도 핵심 Portfolio 콘텐츠는 접근 가능해야 한다.

### 8. FIRST VISIT IS CINEMATIC, REVISIT IS FAST
첫 방문은 Full Cinematic을 허용한다.  
재방문은 Short Transition을 기본으로 하고 Skip을 제공한다.

### 9. EVIDENCE OVER SELF-RATING
Skill은 `Lv.5`, 별점, 숙련도 숫자로 평가하지 않는다.  
무엇을 할 수 있고 어떤 Project에서 사용했는지로 증명한다.

### 10. FAIL SOFT
영상, 오디오, Ambient Asset, 저장 기능이 실패해도 Navigation과 콘텐츠는 살아 있어야 한다.

---

## 02. Art Direction

### Core Visual Identity

> **Bright · Playful · Soft 3D · 2.5D · Chunky · Alive · Adventurous · Warm · Discoverable**

기존 13개 Reference의 Visual DNA는 유지하되,
새 버전은 “정적인 게임 일러스트”가 아니라 **실제로 반응하는 World**로 발전시킨다.

### Reference DNA

- Mario 계열 → Platform / Power Up / World Map / Stage Clear
- Kirby 계열 → Character Reaction / Reward Feedback
- Zelda 계열 → Exploration / Discovery / Environmental Storytelling
- Animal Crossing 계열 → Living Environment / Ambient Motion / 시간 변화

레퍼런스는 **원리만 참고**한다.
특정 캐릭터, Block, Map Layout, UI, Icon, Asset을 복제하지 않는다.

### Three Visual Worlds

#### REAL WORLD
- Photorealistic
- Cinematic
- Dark / Quiet
- Physical materials
- Low motion intensity
- Warm desk light + cool monitor light

#### PORTAL
- Real World와 Game World가 충돌하는 Transition Space
- Blue / Cyan / Violet / White
- Distortion / Pull / Particle / Dynamic Light
- 가장 강한 Visual Contrast 허용

#### PORTFOLIO WORLD
- Bright / Clear / Saturated
- Soft 3D / 2.5D
- Clean silhouette
- Rounded environment
- Living motion
- Game UI는 최소화

### Visual Quality Rules

- Cute ≠ Childish.
- Colorful ≠ Rainbow UI.
- Game-like ≠ Game asset copy.
- AI-generated ≠ Finished Scene.
- 각 Asset은 동일 Lighting / Material / Perspective / Character Proportion을 따라야 한다.
- Scene마다 시각적 중심은 1개를 기본으로 한다.
- 실제 Project Screen / Result가 장식용 World보다 정보 우선순위가 높다.

---

## 03. Typography

### Font Roles

| Role | Font | Usage |
|---|---|---|
| Body / Korean / Information | Pretendard Variable | Case Study, Q&A, Resume, General UI |
| Game Display | Fredoka Variable | Scene Heading, World Title |
| Game System | Silkscreen Regular/Bold | HUD, Status, Short Feedback |
| Brand Logo | SuperMario256 | `MY PORTFOLIO WORLD` Logo only |

Brand Font는 **SuperMario256으로 확정**했다. RetroMario는 후보에서 제외한다.

### Desktop Typography

| Token | Font | Size | Line | Weight | Tracking |
|---|---|---:|---:|---:|---:|
| Display XL | Fredoka | 72px | 76px | 700 | -1.5px |
| Display L | Fredoka | 56px | 60px | 700 | -1px |
| Display M | Fredoka | 40px | 44px | 600 | -0.5px |
| H1 | Pretendard | 36px | 48px | 700 | -0.6px |
| H2 | Pretendard | 28px | 38px | 700 | -0.4px |
| H3 | Pretendard | 22px | 32px | 600 | -0.2px |
| Body L | Pretendard | 18px | 30px | 400 | 0 |
| Body M | Pretendard | 16px | 26px | 400 | 0 |
| Body S | Pretendard | 14px | 22px | 400 | 0 |
| Caption | Pretendard | 12px | 18px | 500 | 0 |
| Game L | Silkscreen Bold | 24px | 32px | 700 | 0 |
| Game M | Silkscreen Regular | 16px | 24px | 400 | 0 |
| Game S | Silkscreen Regular | 12px | 18px | 400 | 0 |

### Tablet Typography

| Token | Size / Line | Weight | Tracking |
|---|---:|---:|---:|
| Display XL | 56 / 60 | 700 | -1px |
| Display L | 44 / 48 | 700 | -0.8px |
| Display M | 34 / 40 | 600 | -0.4px |
| H1 | 32 / 42 | 700 | -0.5px |
| H2 | 26 / 36 | 700 | -0.3px |
| H3 | 21 / 30 | 600 | -0.2px |
| Body L | 18 / 30 | 400 | 0 |
| Body M | 16 / 26 | 400 | 0 |
| Body S | 14 / 22 | 400 | 0 |
| Caption | 12 / 18 | 500 | 0 |
| Game L | 22 / 30 | 700 | 0 |
| Game M | 15 / 22 | 400 | 0 |
| Game S | 12 / 18 | 400 | 0 |

### Mobile Typography

| Token | Size / Line | Weight | Tracking |
|---|---:|---:|---:|
| Display XL | 42 / 46 | 700 | -0.8px |
| Display L | 36 / 40 | 700 | -0.6px |
| Display M | 30 / 36 | 600 | -0.3px |
| H1 | 28 / 38 | 700 | -0.4px |
| H2 | 24 / 34 | 700 | -0.2px |
| H3 | 20 / 30 | 600 | -0.1px |
| Body L | 17 / 28 | 400 | 0 |
| Body M | 16 / 26 | 400 | 0 |
| Body S | 14 / 22 | 400 | 0 |
| Caption | 12 / 18 | 500 | 0 |
| Game L | 20 / 28 | 700 | 0 |
| Game M | 14 / 21 | 400 | 0 |
| Game S | **12 / 18** | 400 | 0 |

### Typography Rules

- Mobile 기본 Body는 16px.
- Mobile Game S는 12px 미만으로 내려가지 않는다.
- Case Study 본문에는 Silkscreen / Brand Font 금지.
- Brand Font는 Logo 전용.
- Game UI는 짧은 Feedback에만 사용.
- 본문 한 줄 길이는 Desktop 기준 약 **45–75 characters** 범위를 목표로 한다.
- 긴 영어 All Caps 문장은 Silkscreen으로 사용하지 않는다.
- Font Loading 실패 시 가독성이 유지되는 System Sans fallback을 제공한다.

---

## 04. Color System

### Core Colors

| Role | HEX |
|---|---|
| World Sky | `#65C8F3` |
| World Green | `#69C94A` |
| World Water | `#42BFE8` |
| Earth Base | `#BD894B` |
| Reward Yellow | `#FFD84D` |
| UI Navy | `#183153` |

### Primitive Scale

| Scale | Blue | Green | Yellow | Aqua | Earth | Coral | Violet |
|---|---|---|---|---|---|---|---|
| 50 | #F0FAFF | #F3FBEF | #FFFBEA | #EEFCFE | #FFF9F0 | #FFF3F1 | #F7F4FF |
| 100 | #DDF4FD | #E1F5D7 | #FFF4BF | #D3F6FB | #FCEEDB | #FFE0DB | #EEE8FF |
| 200 | #BCE9FA | #C5ECB1 | #FFE982 | #A6E8F7 | #F5DDBB | #FFC5BD | #DDD3FF |
| 300 | #8EDAF6 | #A2DF83 | #FFDD55 | #72D8F0 | #EAC58F | #F99C90 | #C4B2FF |
| 400 | #65C8F3 | #82D160 | #FFD84D | #42BFE8 | #D8A866 | #F27B70 | #A78CFF |
| 500 | #3DB8EC | #69C94A | #F6C62C | #24A5D1 | #BD894B | #F06A61 | #846BFF |
| 600 | #2699D2 | #4EAA36 | #DFA514 | #2185AD | #9E6D3D | #D94C45 | #7150EF |
| 700 | #217AAC | #3E872F | #B77C10 | #216B8C | #7D5435 | #B63A36 | #5E3DD2 |
| 800 | #225F85 | #356B2D | #936116 | #225873 | #62432F | #96332F | #4D35AB |
| 900 | #204F6D | #2D5828 | #795018 | #214A61 | #50382B | #7D302D | #412F88 |

### Neutral Scale

| Scale | HEX |
|---|---|
| White | `#FFFFFF` |
| 50 | `#F7FBFD` |
| 100 | `#EDF4F7` |
| 200 | `#D9E8EF` |
| 300 | `#BACCD5` |
| 400 | `#91A6B2` |
| 500 | `#718896` |
| 600 | `#5E7185` |
| 700 | `#405469` |
| 800 | `#253B53` |
| 900 | `#17283E` |
| Navy | `#183153` |
| Navy Dark | `#10243E` |

### Semantic Map

| Token | HEX | Usage |
|---|---|---|
| `world/sky` | #65C8F3 | Day sky |
| `world/sky-light` | #BCE9FA | Horizon |
| `world/grass` | #69C94A | Main terrain |
| `world/grass-light` | #A2DF83 | Highlight |
| `world/grass-shadow` | #3E872F | Vegetation shadow |
| `world/water` | #42BFE8 | Sea / waterfall |
| `world/water-light` | #A6E8F7 | Water highlight |
| `world/cloud` | #FFFFFF | Cloud |
| `world/path` | #F2D49B | Path |
| `text/primary` | #17283E | Main text |
| `text/secondary` | #5E7185 | Secondary text |
| `text/inverse` | #FFFFFF | Verified dark surface only |
| `surface/base` | #FFFFFF | Main information surface |
| `surface/soft` | #F7FBFD | Secondary information surface |
| `border/default` | #D9E8EF | UI border |
| `action/primary` | #183153 | Primary action |
| `action/hover` | #10243E | Primary hover |
| `game/reward` | #FFD84D | Reward |
| `game/achievement` | #F6C62C | Achievement |
| `game/locked` | #91A6B2 | Locked |
| `game/cleared` | #69C94A | Cleared |
| `game/warning` | #F06A61 | Warning |
| `portal/core` | #5577FF | Portal core |
| `portal/energy` | #59E1FF | Portal energy |
| `portal/violet` | #846BFF | Portal magic |
| `portal/light` | #F7FDFF | Portal highlight |

### Special Palettes

**Real World**  
BG `#111722` · Surface `#1A2330` · Surface Light `#243246` · Text `#F3F5F7` · Muted `#8D98A8` · Warm `#F2B56B` · Monitor `#7CBCE8`

**Sunset**  
Top `#6686D9` · Horizon `#F4A77C` · Peach `#F7C09A` · Gold `#FFD278` · Cloud `#FFF0DE` · Shadow `#56648C`

**Night**  
Sky `#243B73` · Deep `#182A56` · Moon `#DCEBFF` · Star `#FFF1A8` · Window `#FFD878` · Grass `#356B52` · Water `#317FA5`

### Color Usage Rules

- **DAY → SUNSET → NIGHT**
- 임의 HEX 추가 금지.
- Reward Yellow / Bright Green 위 본문은 Navy 계열.
- 밝은 Accent 위 White Text 기본 사용 금지.
- State는 Color만으로 전달하지 않는다.
- Focus는 배경별 Contrast를 검증하고 Dual Ring을 허용한다.
- Art Render의 모든 픽셀을 Token 색상으로 제한한다는 의미는 아니다.
- Coral/Violet은 Accent이며 Section별 Theme Color로 남발하지 않는다.

---

## 05. Shape / Material / Lighting

### Shape Language

- Environment → Organic / Rounded / Soft
- Game Object → Chunky / Clear silhouette
- UI → Simple / Rounded / Controlled
- FX → Light / Soft / Purposeful

### Material

**Portfolio World**
- Stylized Matte
- Simplified texture
- Soft highlight
- Low-to-medium specular
- Excessive glossy plastic 금지

**Real World**
- Physical Wood / Metal / Glass / Fabric / Skin
- Realistic surface variation
- Controlled cinematic contrast

### Lighting

**Portfolio World**
- Key Light: Top Left
- Fill: Soft Sky
- Shadow: Bottom Right
- Contact Shadow 필수
- 서로 다른 AI Asset도 동일 방향 유지

**Real World**
- Key: Warm Desk Light
- Fill: Cool Monitor Light
- Environment: Dark / Low saturation

**Portal**
- Cyan/Violet Dynamic Light Source
- 주변 벽/책상/캐릭터에 실제 반사광 연출

### Surface Rules

- Information UI는 과도한 Glassmorphism을 사용하지 않는다.
- World와 UI의 Shadow 언어를 분리한다.
- World Object는 Border보다 Material/Shadow/Light로 형태를 구분한다.
- Player 발 아래 Contact Shadow는 World에 붙어 있다는 인상을 유지해야 한다.

---

## 06. Grid & Responsive

### Primary Reference
**1440 × 810 / 16:9**

### Breakpoints

| Mode | Width | Columns | Gutter | Margin |
|---|---:|---:|---:|---:|
| Wide | ≥1920 | 12 | 32 | 64 |
| Desktop | 1440–1919 | 12 | 24 | 48 |
| Small Desktop | 1280–1439 | 12 | 20 | 40 |
| Tablet L | 1024–1279 | 8 | 20 | 32 |
| Tablet P | 768–1023 | 8 | 16 | 24 |
| Mobile | 390–767 | 4 | 16 | 20 |
| Small Mobile | 320–389 | 4 | 12 | 16 |

### Safe Area

1440×810 기준 Primary Safe Area 약 **1280×690**.

Safe Area:
- Player
- Destination
- Required UI
- Important Labels

Bleed:
- Cloud
- Far Island
- Foreground foliage
- Decorative particles

### Height Rules

- Short `<800`
- Normal `800–1079`
- Tall `≥1080`

Short viewport:
- Camera zoom-out
- HUD vertical density 감소
- Oversized title 축소
- Foreground crop 허용
- Critical path / interaction 유지

### Responsive Strategy

- Breakpoint → UI
- Aspect Ratio → Camera Framing
- Height → Scene Density
- Player / Terrain relation → World Coordinate
- Collision size는 viewport로 직접 scale하지 않는다.
- Moving Island/Platform은 Visual과 Collision Geometry가 함께 움직인다.
- Information Scene은 Game Scene과 별도 Responsive 전략을 사용한다.

### Test Viewports

필수 실기 테스트:
- 1920×1080
- 1440×810
- 1366×768
- 1180×820
- 1024×768
- 768×1024
- 430×932
- 402×874
- 390×844
- 360×800

### Ultrawide

21:9에서는 Main World를 늘리지 않고 Far Environment를 더 보여준다.

> **Stretch ❌ / Reframe ✓**

---

## 07. Foundation Tokens

### Spacing
`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96`

Semantic:
- Icon Gap 8
- Inline Gap 8
- Control Gap 12
- Card Gap 16
- Card Padding 16 / 20 / 24
- Dialog Padding 32
- Section Gap 32 / 48 / 64 / 96
- HUD Safe Margin 32 / 24 / 16

### Radius
- XS 8
- S 12
- M 16
- L 20
- XL 24
- 2XL 32
- Pill 999

임의 `10/14/18/22/26/30` 사용 금지.

### Border
- Thin 1px
- Default 2px
- Strong 3px
- Game 4px

### Elevation
- E0 none
- E1 `0 2px 8px rgba(16,36,62,.08)`
- E2 `0 6px 18px rgba(16,36,62,.12)`
- E3 `0 12px 32px rgba(16,36,62,.16)`
- E4 `0 20px 48px rgba(16,36,62,.20)`

### Interaction Size
- Minimum touch/click target: **44×44px**
- Primary Button minimum height: **44px**
- Small HUD icon visible size는 작아도 hit area는 44×44 유지

### Icon Size
- XS 16
- S 20
- M 24
- L 32
- XL 40

---

## 08. Layer / Depth / Z-index

### World Layers

1. SKY
2. FAR BACKGROUND
3. BACK WORLD
4. MAIN WORLD
5. GAMEPLAY
6. PLAYER
7. FOREGROUND
8. FX
9. UI

### Z-index Tokens
- Sky 0
- Far 10
- Back 20
- World 30
- Gameplay 40
- Player 50
- Foreground 60
- FX 70
- HUD 100
- Popover 200
- Dialog 300
- Adventure 400
- Transition 500
- Modal 600

### Rules

- `z-index: 9999` 금지.
- HUD는 World Transform Root와 분리한다.
- Modal / Transition은 독립 Stacking Context를 사용한다.
- Visual Depth와 CSS z-index를 동일 개념으로 취급하지 않는다.
- Depth는 Scale / Position / Parallax / Blur / Shadow / Occlusion으로 표현한다.
- Decorative Layer는 불필요한 Pointer Event를 받지 않는다.
- Foreground가 Player Interaction을 가려도 실제 Hit Area까지 막지 않도록 한다.

---

## 09. Player System

### Player Identity
Portal Transformation 이후 동일 Character Identity를 전체 Journey에서 유지한다.

### Motion Library

**Base**
Idle / Blink / Look / Fidget / Stretch

**Movement**
Walk / Run / Turn / Stop / Brake / Skid

**Platform**
Jump / Fall / Land / Edge / Balance

**Interaction**
Reach / Touch / Hit / Push / Pickup / Open / Enter

**Emotion**
Surprised / Curious / Happy / Scared / Celebrate

**Special**
Power Up / Portal Resist / Portal Pull / Falling / Arrival / Sit / Wave

### Direction
Front / 3⁄4 Front / Side / 3⁄4 Back / Back.

모든 Motion을 모든 방향으로 제작하지 않는다.

### Asset Priority

Tier A:
Idle / Walk / Run / Jump / Fall / Land / Interact / Pickup / Celebrate

Tier B:
Look / Hit / Open / Power Up / Sit / Surprised

Tier C:
Portal Resist / Portal Pull / Transformation / Arrival / Ending

### Player Scale Goal
- World Map: viewport height 약 9–12%
- Power Up: 13–16%
- Character: 30–42%
- Mission: 10–14%

이 값은 **visual composition goal**이며 Collision scale 규칙이 아니다.

### Gameplay Motion Rules
- Gameplay Motion은 즉시 중단/전환 가능해야 한다.
- Cinematic Motion은 Player Control을 잠그고 종료 후 명확히 반환한다.
- Walk/Run animation의 발 위치와 Character scale은 동일 기준을 유지한다.
- Idle Loop 하나만 반복하지 않고 Base Idle + Random Idle Variation 구조를 사용한다.

### Movement Feel
- Walk = 기본 탐색
- Run = 빠른 목적지 이동
- Jump = Power Up / Gameplay 구간 중심
- World Map에서 과도한 Platform Action을 강제하지 않는다.

---

## 10. World Interaction Geometry

모든 플레이 Scene은 Visual Design과 동시에 Geometry를 설계한다.

### Required Geometry
- WALKABLE AREA
- COLLISION AREA
- INTERACTION AREA
- CAMERA BOUNDARY
- SPAWN POINT
- EXIT / PORTAL POINT
- AUTO-PATH NODE / CONNECTION

### Rules

- Player가 물/절벽/장식 Object를 통과하지 않도록 Collision을 정의한다.
- 보이지 않는 벽을 남발하지 않는다.
- 이동할 수 없는 경계는 Visual Design으로 이해할 수 있어야 한다.
- 목적지 자동 이동은 자유 좌표 이동보다 **Path Graph**를 우선한다.
- Walkable path는 Player 실루엣 기준 충분한 여유 폭을 확보한다.
- Interaction Area는 Player가 Object에 닿기 전에 Prompt를 인지할 수 있는 여유를 둔다.
- Camera Boundary 밖으로 중요 Objective가 잘리지 않도록 한다.
- Moving Platform / Floating Island는 Visual과 Interaction Geometry가 같은 Transform을 공유한다.

### Geometry Validation
- Player clipping 없음
- Ground contact 안정
- Auto Path가 Collision을 관통하지 않음
- Interaction Prompt가 너무 늦거나 너무 멀리 나오지 않음
- Resize 후에도 Geometry와 Visual이 일치

---

## 11. Living World / Motion

> **No major game scene should feel frozen by default.**

### Continuous Motion
Cloud / Water / Waterfall / Flag / Grass / Character Idle

### Ambient Motion
Bird / Leaf / Cloud Shadow / Balloon / Sparkle / Character Look

### Wind States

**Calm**
- 기본 상태
- Grass/Flower minimal sway
- Flag soft motion

**Breeze**
- 기본 Ambient Variation
- Cloud slightly faster
- Vegetation movement 증가

**Gust**
- 짧은 Event
- Flag / Leaf / Player Hair / Grass 반응 증가
- 중요한 Gameplay Event 중에는 발생 억제

### Duration Tokens
- instant 100ms
- fast 180ms
- normal 300ms
- slow 500ms
- cinematic 800ms+

### Easing
- UI `cubic-bezier(.2,.8,.2,1)`
- Enter `cubic-bezier(.16,1,.3,1)`
- Exit `cubic-bezier(.7,0,.84,0)`
- Bounce `cubic-bezier(.34,1.56,.64,1)`
- World `cubic-bezier(.45,0,.55,1)`

### Motion Levels
M0 Static · M1 Micro UI · M2 Ambient · M3 Interaction · M4 Gameplay · M5 Cinematic

### Ambient Ranges
- Breathing 2.5–4s
- Flower 2–4s
- Grass 2–5s
- Sign 3–6s
- Island 5–9s
- Near Cloud 18–35s
- Far Cloud 35–70s
- Light 4–8s
- Coin 1.8–3s
- Star 1.5–3s

Duration / Delay / Direction은 동일하게 반복하지 않는다.

### Motion Stop Rule
사용자가 Motion Pause / Reduced Motion을 선택하면
장식성 Motion은 정지 또는 최소화하지만 핵심 Player Feedback과 Navigation은 유지한다.

---

## 12. Motion Budget / Experience Density

### Motion Budget

한 순간의 강한 Motion은 기본적으로:

- **1 Primary**
- 최대 **2 Secondary**
- 나머지는 Background / Ambient

### Priority

1. PLAYER
2. CURRENT OBJECTIVE
3. WORLD
4. AMBIENT

Power Up / Stage Clear / Portal 등 M5 Event 중에는 P3/P4를 약화하거나 일시 정지한다.

### Experience Density

| Density | Scene | Principle |
|---|---|---|
| HIGH / WOW | Portal, Power Up, World Enter, Stage Clear | 짧고 강하게 |
| MEDIUM / PLAY | Character, World Map, Q&A | 직접 조작 중심 |
| LOW / READ | Case Study, Resume, Contact, Adventure Book | 콘텐츠 중심 |

### Hard Rules

- M5 Event 2개를 동시에 실행하지 않는다.
- LOW / READ 영역에서 지속 Camera Motion 금지.
- 중요한 Text Reading 중 Background Motion은 M2 이하.
- Ambient Event는 동일 화면에서 과도하게 중첩하지 않는다.
- Scene이 “살아있음”과 “산만함” 사이에서 충돌할 경우 **읽기/조작 명확성 우선**.

---

## 13. Camera / Interaction

### Camera by Scene

| Scene | Camera |
|---|---|
| Real World | Slow Cinematic |
| Portal | Push-in / Distortion |
| Tool Universe | Falling / Forward |
| Arrival | Fall → Land → Reveal |
| Character | Player-oriented |
| Power Up | Side Platform |
| World Map | 2.5D Exploration |
| Enter World | Follow → Push → Zoom |
| Mission | Scroll / Player Follow |
| Stage Clear | Short Cinematic Framing |
| Q&A | Calm Exploration |
| Contact | Stable / Calm |
| Ending | Slow Cinematic |

### Camera Rules

- Camera는 정보 전달을 방해하지 않는다.
- Case Study Reading 중 Camera Shake / continuous pan 금지.
- User Input 직후 과도한 Delay 없이 Camera가 반응한다.
- Camera Follow는 Player를 완전히 중앙 고정하지 않고 이동 방향 앞쪽에 Look-ahead 공간을 둔다.
- Portal/Stage Clear 외 Camera Shake는 최소화한다.
- Reduced Motion에서는 FOV-like zoom, distortion, shake를 크게 축소하거나 제거한다.
- Cinematic 종료 후 Camera State를 명확히 Gameplay State로 반환한다.

### Global UI States

Default / Hover / Pressed / Focus / Selected / Disabled

### Primary Button

| State | Background | Text | Motion | Shadow |
|---|---|---|---|---|
| Default | `#183153` | White | none | E1 |
| Hover | `#10243E` | White | translateY(-2px), 180ms | E2 |
| Pressed | `#10243E` | White | scale(.97), translateY(1px), 100ms | E0–E1 |
| Focus | Default 유지 | Default 유지 | no scale | Dual ring |
| Disabled | `#D9E8EF` | `#718896` | none | none |

### Secondary Button
- Default: White / Navy 2px Border / Navy Text
- Hover: Neutral 50 / translateY(-2px) / E1
- Pressed: scale(.97) / translateY(1px)
- Disabled: Neutral 200 / Neutral 500 / no motion

### Game CTA
- Default: E2 + Contact Shadow
- Hover: 최대 scale(1.04), translateY(-3px), E3, 180ms
- Pressed: scale(.96), translateY(2px), E1, 100ms
- Scale/Glow는 주요 CTA에만 제한

### World Object State
Locked / Discovered / Available / Interacting / Acquired / In Progress / Completed / Cleared / Restored

### Proximity
Far → Near → Interaction Range

### Interaction Rules
- Hover에서 World Object 전체 확대보다 **Player Look / Entrance Light / Sign Reaction / Label Reveal**을 우선한다.
- Hover에만 필수 정보를 숨기지 않는다.
- Decorative Environment는 기본적으로 Click/Hover 대상이 아니다.
- Touch에서는 Hover 전제를 사용하지 않는다.
- Focus에서도 Hover와 동일한 핵심 정보에 접근 가능해야 한다.
- UI Interaction과 Player Interaction이 겹치면 **UI 입력을 우선**한다.


## 14. Control / HUD / Information

Desktop: WASD/방향키 이동, Space Jump, Mouse Point & Click, 목적지 클릭
시 Path 자동 이동. Touch는 Tap/Contextual/필요 시 Virtual Control.

HUD는 Adventure Book/Progress/Sound 중심으로 최소화. Contextual Prompt만
필요 시 표시.

**World = Playful / Content = Professional.** Case Study는 Pretendard
기반으로 읽기 쉽게 구성하고 게임 조작이 열람을 막지 않는다.

## 15. Quick View / Progress / Revisit

### Skill Representation
- `FIGMA Lv.5`, `Photoshop Lv.4` 등 **숙련도 Level 표기 금지**.
- Skill은 `ACQUIRED / USED / RELATED PROJECTS`처럼 실제 사용 경험과 연결한다.
- 자가평가 수치 대신 무엇을 할 수 있고 어느 Project에서 사용했는지를 보여준다.


첫 화면에 **ENTER WORLD**와 **Quick View** 제공. Adventure Book은
위치/Progress를 제공한다.

세션 동안 Skills, Visited/Cleared Projects, Secrets, Intro Watched,
Sound Preference를 유지한다. 첫 방문은 Full Cinematic, 재방문은 Short
Transition. 주요 Cinematic에는 SKIP 제공.

## 16. FX / Sound

Glow=Interactable · Sparkle=Discovery · Star=Achievement · Dust=Movement
· Particle Burst=Acquisition · Light Beam=Destination · Portal
Distortion=World Transition · Confetti=Major Completion.

Sound는 Ambient/Player/Interaction/Reward/Cinematic으로 분류하고
Toggle을 제공한다. 소리 없이도 모든 피드백을 이해할 수 있어야 한다.

## 17. Motion Profiles / Accessibility

FULL: Player/Ambient/Parallax/Particle/Camera/Cinematic 전체.\
REDUCED: 의미 있는 Player/Feedback 유지, Parallax/Floating/Particle
감소, Camera Shake 제거.

Keyboard Navigation, Visible Focus, Alt Text, Contrast, Sound Toggle,
`prefers-reduced-motion`, Skip Intro/Animation, Adventure Book Direct
Navigation을 지원한다.


### Motion Control
- 기본 경험은 Living World를 유지하지만 사용자가 원하면 장식성 Motion을 줄이거나 멈출 수 있어야 한다.
- `prefers-reduced-motion`에서는 Parallax, Floating, Camera Shake, 반복 Particle을 축소/제거한다.
- 5초 이상 지속되는 비필수 자동 Motion은 Pause/Stop 가능한 구조를 우선한다.
- Motion 정지 상태에서도 정보와 핵심 기능은 동일하게 사용 가능해야 한다.

## 18. Failure / Cancel / Fallback Rules

### Input / Transition Recovery
- Auto Move 중 WASD/방향키 입력 → Auto Move 즉시 취소, 사용자 입력 우선.
- 목적지 연속 클릭 → 명령 Queue를 쌓지 않고 마지막 유효 목적지로 갱신.
- Dialog / Adventure Book / Information Panel 활성 중 → Player 입력 잠금, Web UI 우선.
- Jump / Pickup / Landing 중 → 비필수 Hover / Look 반응 억제.
- Cinematic Skip → Player Lock/Camera Lock 해제 후 정의된 안전 상태로 이동.
- Browser Back / Direct Link / Quick View / Reduced Motion → 긴 이동 Animation을 강제하지 않는다.
- Route 전환 취소 또는 오류 → 이전 안정 Route 또는 World Map으로 복귀할 수 있어야 한다.

### Asset Failure Fallback
- Video 재생 실패 → Poster/Static Layer + 동일 CTA 제공.
- Transparent Motion Asset 실패 → Static Player/Prop fallback을 사용하고 Navigation은 유지.
- Ambient Asset 실패 → 해당 Ambient만 생략하며 Scene 진행은 유지.
- Audio 실패 → 무음으로 계속 진행하며 Interaction의 시각적 Feedback은 유지.
- 이미지 Load 실패 → Layout을 무너뜨리지 않는 Fallback Surface/Alt를 제공.

### Loading Failure
- 필수 Asset이 일정 시간 내 준비되지 않아도 사용자가 Quick View 또는 Skip으로 핵심 콘텐츠에 접근 가능해야 한다.
- Loading UI는 무한 대기 상태를 만들지 않는다.
- 실제 진행률을 계산하지 못할 경우 가짜 `%`를 표시하지 않는다.

### State Recovery
- 새로고침 후 현재 Route가 유효해야 한다.
- Progress 저장이 실패해도 콘텐츠는 잠기지 않는다.
- Stage Clear는 방문/확인 상태를 나타내며 실제 Project 성과를 의미하지 않는다.

## 19. Performance

WebP/AVIF 우선, 필요한 영상은 WebM. 불필요한 4K PNG 금지. Scene/Route
단위 Lazy Load와 단계별 Preload를 사용한다. Offscreen Animation/Video는
Pause, Particle 수 제한, animation cleanup, Mobile Quality Reduction을
적용한다.


### Performance Targets
- LCP: **2.5s 이하 목표**
- INP: **200ms 이하 목표**
- CLS: **0.1 이하 목표**
- Gameplay Interaction은 입력 지연이 체감되지 않도록 별도 검증한다.
- 초기 진입 시 모든 Scene Asset을 한 번에 로드하지 않는다.

### Validation Gate — Player Prototype First
대규모 Asset 제작 전에 아래 최소 Prototype을 먼저 통과한다.

1. Idle
2. Walk / Run
3. Jump / Fall / Land
4. Collision
5. Skill Block 1개
6. Item Pop / Pickup
7. Living Cloud / Grass
8. Route/Scene 전환 1회

이 Prototype에서 캐릭터 비율, 바닥 접지, Animation 전환, Collision, 입력 반응, Loop 자연스러움을 검증한 후 본 제작으로 확장한다.

## 20. Asset Consistency Checklist

모든 Higgsfield/AI/수작업 에셋은 아래를 확인한다.

-   동일 Color System
-   동일 Lighting Direction
-   동일 Material
-   동일 Camera/Perspective
-   동일 Character Proportion
-   동일 Shadow Softness
-   동일 World Scale
-   Layer 분리 가능성
-   자연스러운 Loop
-   기존 World와 합쳤을 때 이질감 없음


## Removed Scope / Do Not Reintroduce

다음 기능은 현재 포트폴리오 범위에서 **삭제 확정**이며 임의로 다시 추가하지 않는다.

- 숨겨진 섬 / Secret Area
- Companion / 동료 캐릭터 시스템
- Player Badge 장착 / 캐릭터 외형에 Progress Badge를 누적하는 시스템

Progress는 `Skills`, `Projects`, `Cleared`, `Acquired`처럼 실제 포트폴리오 정보와 연결된 상태로만 표현한다.

## 21. Content Evidence Rules

- Project의 게임 연출은 실제 Case Study를 대체하지 않는다.
- 각 Project는 최소한 `Problem / Role / Decision / Implementation / Result or Limitation`을 명확히 전달한다.
- Stage Clear는 “방문자가 콘텐츠를 확인했다”는 UX Feedback이며 실제 프로젝트 성과를 의미하지 않는다.
- 사용자 테스트/성과 지표가 없는 경우 효과를 수치로 임의 생성하지 않는다.
- Skill은 Level이 아니라 **실제 작업과 Project Evidence**로 증명한다.
- Project Entry / Checkpoint / Stage Clear는 Game, 본문 Case Study는 Portfolio Reading Experience로 분리한다.

## 22. Visual Do / Don't

### DO

Living Environment · Separated Depth Layers · Player-centered
Interaction · Clear Silhouette · Bright/Clean Color · Controlled Ambient
Motion · Immediate Feedback · Professional Information UI · Spacious
Composition.

### DON'T

Flat single-background Scene · Scene 전체를 영상 하나로 대체 · 모든 요소
동일 속도 · 과도한 Glow/Particle · Nintendo Asset 직접 복제 · 모든
텍스트 Pixel Font · Card 도배 · Player 장식화 · 즉시 Route Change만으로
Navigation 처리 · 게임 때문에 콘텐츠 가독성 저하 · AI 이미지 한 장을
완성 Scene으로 간주.

------------------------------------------------------------------------

## 23. Product Validation Criteria

| 검증 영역 | 반드시 확인할 질문 |
|---|---|
| 첫인상 | 처음 본 사람이 이름·직무·핵심 강점을 설명할 수 있는가? |
| 탐색 | 게임을 하지 않고도 프로젝트 4개와 Contact/Resume을 찾을 수 있는가? |
| 콘텐츠 | 프로젝트 하나를 본 뒤 역할·문제·주요 결정·구현 내용을 설명할 수 있는가? |
| 조작 | 설명을 길게 읽지 않아도 이동·점프·아이템 획득·진입을 이해하는가? |
| 복구 | Auto Move 취소·Skip·뒤로가기·새로고침 뒤에도 정상 상태인가? |
| 반응형 | 짧은 노트북·Tablet·Mobile·확대 화면에서 핵심 UI가 유지되는가? |
| 에셋 실패 | 영상/FX가 실패해도 콘텐츠·Navigation·다음 행동이 남아 있는가? |
| 접근성 | Keyboard·Reduced Motion·Motion Pause에서도 동일한 정보와 기능에 접근 가능한가? |

기능이나 연출을 추가할 때 위 기준 중 무엇을 개선하는지 설명할 수 없다면 우선순위를 낮춘다.


## Non-Negotiable Summary

1.  **CHARACTER IS THE PLAYER, NOT DECORATION.**
2.  **THE WORLD MUST ALWAYS FEEL ALIVE.**
3.  **CREATE DEPTH WITH SEPARATED LAYERS, NOT A FLAT IMAGE.**
4.  **NAVIGATION SHOULD FEEL LIKE A JOURNEY, NOT PAGE SWITCHING.**
5.  **GAME VISUALS MUST NEVER COMPROMISE PORTFOLIO READABILITY.**
