# Personal Portfolio

> 2.5D Game World를 탐험하며 나를 알아가는 Interactive Personal Portfolio

React + Vite로 제작하는 인터랙티브 개인 포트폴리오입니다.

일반적인 스크롤형 포트폴리오 대신, 하나의 게임을 플레이하듯
**START → CHARACTER → POWER UP → WORLD MAP**을 거쳐
ABOUT, SKILLS, PROJECTS, Q&A, CONTACT를 탐험하는 경험을 목표로 합니다.

---

## Overview

이 포트폴리오는 개인의 디자인 및 프론트엔드 역량을 하나의 게임 월드 안에서 자연스럽게 탐색할 수 있도록 설계했습니다.

단순히 프로젝트를 나열하는 방식이 아니라 캐릭터, 월드, 미션, 스테이지, 클리어, 다음 월드 등의 게임적 요소를 활용해 포트폴리오 탐색 자체를 하나의 경험으로 구성합니다.

### Core Concept

```text
START
  ↓
CHARACTER
  ↓
POWER UP
  ↓
WORLD MAP
  ↓
ABOUT / SKILLS / PROJECTS / Q&A / CONTACT
```

---

## Scene Structure

전체 포트폴리오는 10개의 Scene으로 구성됩니다.

| Scene | Name | Purpose |
|---|---|---|
| 01 | START | 포트폴리오 시작 |
| 02 | CHARACTER | 캐릭터 및 사용자 경험 소개 |
| 03 | POWER UP | 역량 및 기술 소개 |
| 04 | WORLD MAP | 포트폴리오 콘텐츠 선택 |
| 05 | ENTER WORLD | 선택한 World 진입 |
| 06 | MISSION | 콘텐츠 탐색 및 프로젝트 경험 |
| 07 | STAGE CLEAR | 콘텐츠 완료 |
| 08 | NEXT WORLD | 다음 콘텐츠로 이동 |
| 09 | Q&A | Q&A |
| 10 | STAFF ROLL + CONTACT | 마무리 및 Contact |

---

## World Map

WORLD MAP은 포트폴리오의 주요 콘텐츠를 선택하는 중심 화면입니다.

```text
WORLD MAP
│
├── ABOUT
├── SKILLS
├── PROJECTS
├── Q&A
└── CONTACT
```

### Routes

| Page | Route |
|---|---|
| START | `/` |
| CHARACTER | `/character` |
| POWER UP | `/power-up` |
| WORLD MAP | `/world-map` |
| ABOUT | `/about` |
| SKILLS | `/skills` |
| PROJECTS | `/projects` |
| Q&A | `/qa` |
| CONTACT | `/contact` |

Scene 번호는 실제 URL에 사용하지 않습니다.

예:
`/character`

사용하지 않음:
`/scene/02-character`

---

## Projects World

PROJECTS는 포트폴리오의 핵심 World입니다.

하나의 페이지에서 4개의 Project Stage를 탐색할 수 있도록 구성합니다.

```text
STAGE 01 — PROJECT 01
STAGE 02 — PROJECT 02
STAGE 03 — PROJECT 03
STAGE 04 — PROJECT 04
```

프로젝트의 실제 콘텐츠와 상세 정보는 제공된 프로젝트 자료를 기준으로 구현합니다.

---

## Tech Stack

### Frontend
- React
- Vite
- JSX
- JavaScript
- CSS

### Routing
- React Router DOM

### Development
- VS Code
- Git
- GitHub

### Design
- Figma

---

## Project Structure

현재 프로젝트는 React + Vite 구조를 기반으로 관리합니다.

```text
src/
├── scenes/
│   ├── Scene01Start/
│   ├── Scene02Character/
│   ├── Scene03PowerUp/
│   ├── Scene04WorldMap/
│   ├── Scene05EnterWorld/
│   ├── Scene06Mission/
│   ├── Scene07StageClear/
│   ├── Scene08NextWorld/
│   ├── Scene09QA/
│   └── Scene10StaffRoll/
│
├── pages/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── QA/
│   └── Contact/
│
├── components/
├── assets/
├── App.jsx
└── main.jsx
```

실제 프로젝트 구조가 변경될 경우 README의 구조도 현재 상태에 맞게 업데이트합니다.

---

## Design Direction

전체 디자인은 **2.5D Game World + Interactive Portfolio**를 기반으로 합니다.

### Visual Keywords

- 2.5D
- Game World
- Adventure
- Exploration
- Character Driven
- Interactive
- Playful
- Cinematic
- Modern Web
- Portfolio

게임적인 요소를 사용하지만, 실제 채용용 포트폴리오로서 콘텐츠와 정보 전달이 우선되도록 설계합니다.

---

## Interaction

### START
포트폴리오의 시작점입니다.

### CHARACTER
포트폴리오의 주인공과 개인 정보를 소개합니다.

### POWER UP
디자인 및 프론트엔드 역량을 보여줍니다.

### WORLD MAP
주요 포트폴리오 콘텐츠를 선택합니다.

### ENTER WORLD
선택한 콘텐츠에 진입하는 연출입니다.

### MISSION
선택한 콘텐츠를 탐색합니다.

### STAGE CLEAR
콘텐츠 탐색 완료를 표현합니다.

### NEXT WORLD
다음 콘텐츠로 이동합니다.

### STAFF ROLL + CONTACT
전체 포트폴리오 경험을 마무리하고 연락 정보를 제공합니다.

---

## Development Principles

- React + Vite 구조 유지
- 기존 컴포넌트 우선 재사용
- Scene 구조 유지
- World Map 구조 유지
- 실제 에셋 우선 사용
- 디자인 시안을 기준으로 구현
- 요청 없는 라이브러리 추가 금지
- 관련 없는 리팩터링 금지
- 동일한 페이지 중복 생성 금지
- Scene과 Route를 불필요하게 1:1로 만들지 않음
- 디자인에 없는 기능이나 장식 요소를 임의로 추가하지 않음

---

## Responsive

```text
Mobile   : 360px
Tablet   : 768px
Desktop  : 1280px
```

모든 화면에서 페이지 전체 가로 스크롤이 발생하지 않도록 합니다.

World Map과 게임형 UI는 단순한 축소가 아니라 각 화면 크기에 맞는 공간 구성과 정보 우선순위를 유지합니다.

---

## Accessibility

- 의미에 맞는 HTML 요소 사용
- 버튼은 `button`
- 페이지 이동은 React Router의 `Link`
- 키보드 접근 지원
- `focus-visible` 상태 제공
- 의미 있는 이미지에 `alt` 제공
- 색상만으로 상태를 전달하지 않음
- `prefers-reduced-motion` 지원

---

## Development

### Install

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

실제 `package.json`에 존재하는 scripts를 기준으로 실행합니다.

---

## Project Status

현재 프로젝트는 React + Vite 기반으로 Interactive Personal Portfolio를 구축하는 단계입니다.

- [x] React + Vite 프로젝트 구성
- [x] Git / GitHub 연결
- [x] Scene 구조 정의
- [x] World Map 구조 정의
- [x] Route 구조 정의
- [x] 프로젝트 폴더 구조 정리
- [ ] Scene별 디자인 구현
- [ ] World Map 구현
- [ ] Projects World 구현
- [ ] Interactive Motion 구현
- [ ] Responsive 최적화
- [ ] Accessibility 검증
- [ ] 최종 배포

---

## Repository

GitHub Repository: `https://github.com/xok2206-png/Personal-Portfolio`

---

## License

This project is a personal portfolio project.
