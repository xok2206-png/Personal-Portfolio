# Personal Portfolio AGENTS.md

## 작업 전 확인

-   PRD.md와 디자인 자료를 먼저 읽습니다.
-   package.json, package-lock.json, Vite 설정, ESLint 설정, 기존 폴더
    구조를 확인합니다.
-   기존 공통 스타일, CSS 변수, 컴포넌트, 이미지, 아이콘, 폰트를
    확인합니다.
-   확인된 사실과 추정을 구분합니다.
-   기존 설치 패키지와 실제 사용 여부를 확인한 후 작업합니다.

## 변경 원칙

-   사용자가 요청한 범위만 수정합니다.
-   기존 코드와 디자인 규칙을 최대한 유지합니다.
-   관련 없는 리팩터링, 파일명 변경, 기능 재작성을 하지 않습니다.
-   기존에 있는 기능과 공통 코드를 먼저 재사용합니다.
-   존재하지 않는 API, 파일, 경로, 에셋을 만들지 않습니다.
-   요청 없이 라이브러리를 설치하지 않습니다.
-   기존 라이브러리와 기능으로 해결할 수 있는 경우 새로운 라이브러리를
    추가하지 않습니다.
-   작업 중 기존 기능을 임의로 삭제하거나 변경하지 않습니다.
-   Scene 구조, Route 구조, World Map 구조를 임의로 변경하지 않습니다.
-   같은 콘텐츠를 보여주는 Page를 중복 생성하지 않습니다.

## 기술 스택

기본 기술 스택은 다음과 같으며, React + Vite 기반 프로젝트입니다.

-   React
-   Vite
-   JavaScript
-   JSX
-   CSS
-   ESLint
-   React Router DOM
-   Framer Motion
-   GSAP / ScrollTrigger
-   Lenis
-   Swiper
-   Git / GitHub

### 라이브러리 사용 원칙

-   실제 프로젝트의 package.json에 설치되어 있는 라이브러리를 우선
    사용합니다.
-   설치되어 있지 않은 라이브러리는 사용자가 요청하거나 PRD에서
    명시적으로 필요한 경우에만 추가합니다.
-   Vue, TypeScript, Tailwind는 사용하지 않으며 사용자가 요청하지 않는 한
    추가하지 않습니다.
-   React Router DOM은 URL 단위의 페이지 이동에 사용합니다. Route 구조는
    아래 "Router 구조"를 따릅니다.
-   Framer Motion은 UI 등장, hover, 상태 전환 등 컴포넌트 수준의 모션에
    사용합니다.
-   GSAP은 복잡한 타임라인 기반 Scene 연출이 필요한 경우에만 사용합니다.
-   ScrollTrigger는 스크롤 위치와 연결된 모션에만 사용합니다.
-   Lenis는 부드러운 스크롤이 실제 디자인 요구사항인 경우에만
    사용합니다.
-   Swiper는 실제 슬라이더 또는 갤러리가 필요한 경우에만 사용합니다.
-   동일한 기능을 여러 라이브러리로 중복 구현하지 않습니다.

## React / JSX

-   화면은 React 컴포넌트 단위로 구성합니다.
-   바닐라 HTML/CSS/JavaScript 방식으로 전체 화면을 구현하지 않습니다.
-   컴포넌트는 하나의 명확한 역할을 갖도록 구성합니다.
-   기존 컴포넌트가 있으면 우선 재사용합니다.
-   동일한 UI가 반복되면 공통 컴포넌트화를 고려합니다.
-   컴포넌트 간 데이터 전달은 명확한 props 구조를 사용합니다.
-   불필요하게 전역 상태를 추가하지 않습니다.
-   React의 현재 프로젝트 구조와 기존 렌더링 방식을 우선 유지합니다.
-   JSX에서는 시맨틱 HTML 구조를 사용합니다.

## HTML / JSX

-   의미에 맞는 header, nav, main, section, article, footer를
    사용합니다.
-   동작은 button, 페이지 이동은 a 또는 프로젝트의 라우팅 방식에 맞는
    요소를 사용합니다.
-   모든 입력은 label 또는 접근 가능한 이름과 연결합니다.
-   아이콘 대신 이모지를 사용하지 않습니다.
-   장식용 요소와 의미 있는 콘텐츠를 구분합니다.
-   의미 있는 이미지는 적절한 alt를 제공합니다.
-   div를 의미 있는 시맨틱 요소 대신 불필요하게 사용하지 않습니다.

## CSS

-   기존 CSS 변수와 디자인 토큰을 먼저 사용합니다.
-   기존 스타일 시스템이 있다면 새로운 스타일 시스템을 임의로 추가하지
    않습니다.
-   CSS class와 HTML id는 snake_case를 사용합니다.
-   상태 class는 is_active, is_open, is_selected 형식으로 작성합니다.
-   오류 class는 has_error 형식으로 작성합니다.
-   불필요한 !important를 사용하지 않습니다.
-   중복되는 스타일은 가능한 한 공통화합니다.
-   반응형은 모바일부터 작성하고 360px, 768px, 1280px을 확인합니다.
-   전체 페이지에 불필요한 가로 스크롤이 발생하지 않도록 합니다.
-   디자인 원본의 색상, 간격, 크기, radius, shadow를 임의로 변경하지
    않습니다.

## JavaScript

-   변수와 함수는 camelCase를 사용합니다.
-   불리언은 is, has, can, should로 시작합니다.
-   이벤트 함수는 handleXxx 형식으로 작성합니다.
-   전역 고정 상수만 UPPER_SNAKE_CASE를 사용합니다.
-   중복 로직은 목적이 분명한 함수로 분리합니다.
-   사용자 입력과 localStorage 데이터는 사용 전에 확인합니다.
-   임시 console.log는 완료 전에 제거합니다.
-   존재하지 않는 데이터나 API 응답을 임의로 가정하지 않습니다.

## 디자인 구현

-   디자인 원본을 시각 기준으로 사용합니다.
-   화면 구조, 간격, 정렬, 색상, 폰트, 상태를 임의로 재해석하지
    않습니다.
-   실제 에셋을 우선 사용하고 placeholder URL을 만들지 않습니다.
-   디자인에 없는 기능이나 장식 모션을 추가하지 않습니다.
-   새 에셋을 만들기 전에 기존 assets 폴더와 디자인 원본을 확인합니다.
-   기존 에셋으로 구현할 수 있는 경우 새로운 에셋을 임의로 생성하지
    않습니다.
-   2.5D Game World라는 전체 콘셉트를 유지합니다.
-   게임 요소는 콘텐츠와 정보 전달을 방해하지 않는 범위에서 사용합니다.
-   프로젝트의 실제 작업 결과물과 콘텐츠를 임의로 만들어내지 않습니다.

## Figma MCP

-   구조, 스크린샷, 변수, 디자인 컨텍스트를 순서대로 확인합니다.
-   생성된 코드를 그대로 붙이지 않고 현재 React + Vite 기술 스택에 맞게
    해석합니다.
-   실제 에셋은 제공된 다운로드 기능으로 가져옵니다.
-   구현 후 브라우저 화면을 Figma 스크린샷과 비교합니다.
-   디자인 시안과 구현 결과의 차이를 확인한 후 수정합니다.
-   디자인 원본에 없는 내용을 임의로 추측하지 않습니다.

## 접근성과 상태

-   키보드 focus-visible을 확인합니다.
-   로딩, 빈 상태, 오류, 비활성 상태를 필요한 화면에 구현합니다.
-   색상만으로 상태를 전달하지 않습니다.
-   의미 있는 이미지에는 alt를 제공합니다.
-   키보드로 주요 인터랙션에 접근할 수 있어야 합니다.
-   prefers-reduced-motion을 반영합니다.
-   hover에만 의존하는 핵심 기능을 만들지 않습니다.
-   모바일 터치 환경에서도 주요 기능이 동작해야 합니다.

## 인터랙션과 모션

-   기본 hover와 간단한 transition은 CSS를 우선 사용합니다.
-   Framer Motion은 컴포넌트 수준의 등장, 퇴장, hover, 상태 전환에
    사용합니다.
-   GSAP은 복잡한 Scene 연출이나 타임라인 기반 모션에만 사용합니다.
-   ScrollTrigger는 스크롤과 연결된 고급 모션에만 사용합니다.
-   Lenis는 실제 제품 경험에 필요한 경우에만 사용합니다.
-   Swiper는 실제 슬라이더 또는 갤러리에만 사용합니다.
-   장식적인 모션을 무분별하게 추가하지 않습니다.
-   모션이 콘텐츠 읽기나 탐색을 방해하지 않도록 합니다.
-   prefers-reduced-motion 환경에서는 장식적인 모션을 줄이거나
    제거합니다.
-   동일한 애니메이션을 여러 라이브러리로 중복 구현하지 않습니다.

## Scene 구조

전체 포트폴리오의 기본 Scene 구조를 유지합니다.

1.  SCENE 01 --- START
2.  SCENE 02 --- CHARACTER
3.  SCENE 03 --- POWER UP
4.  SCENE 04 --- WORLD MAP
5.  SCENE 05 --- ENTER WORLD
6.  SCENE 06 --- MISSION
7.  SCENE 07 --- STAGE CLEAR
8.  SCENE 08 --- NEXT WORLD
9.  SCENE 09 --- Q&A
10. SCENE 10 --- STAFF ROLL + CONTACT

-   Scene의 순서와 역할을 임의로 변경하지 않습니다.
-   World 내부 콘텐츠와 전체 Scene 흐름을 구분합니다.
-   Scene 전환은 사용자가 현재 위치와 다음 위치를 이해할 수 있도록
    합니다.
-   SCENE 10은 STAFF ROLL + CONTACT로 포트폴리오를 최종 마무리합니다.
-   Scene 컴포넌트는 `src/scenes/SceneXXName/SceneXXName.jsx`에서 관리합니다.

## Router 구조

Scene과 Page를 구분합니다.

-   Scene: 게임형 포트폴리오의 진행 및 연출 단위 (`src/scenes/`)
-   Page: 실제 포트폴리오 콘텐츠를 보여주는 단위 (`src/pages/`)
-   Scene과 Route를 1:1로 대응시키지 않습니다.

최종 Route:

| URL | 화면 |
| --- | --- |
| `/` | START (SCENE 01) |
| `/character` | CHARACTER (SCENE 02) |
| `/power-up` | POWER UP (SCENE 03) |
| `/world-map` | WORLD MAP (SCENE 04) |
| `/about` | ABOUT |
| `/skills` | SKILLS |
| `/projects` | PROJECTS |
| `/qa` | Q&A |
| `/contact` | CONTACT |

-   URL에 Scene 번호를 넣지 않습니다. (`/scene/01-start` 등 금지)
-   World를 위한 중복 URL(`/world/about`, `/world/qa` 등)을 만들지 않습니다.
-   SCENE 05~08은 별도 URL 없이 콘텐츠 페이지 내부의 연출/전환 단계로 다룹니다.
-   Q&A와 CONTACT 콘텐츠는 `src/pages/QA`, `src/pages/Contact` 하나만 두고
    SCENE 09 / SCENE 10에서 재사용합니다. 복제하지 않습니다.
-   페이지 이동은 `Link` 또는 `useNavigate`를 사용하며 `window.location.href`,
    `location.href`는 사용하지 않습니다.
-   Route를 추가하거나 변경해야 하면 먼저 이유와 영향을 설명합니다.

## World 구조

WORLD MAP의 주요 World는 다음 구조를 기준으로 합니다.

-   ABOUT

-   SKILLS

-   PROJECTS

-   Q&A

-   CONTACT

-   WORLD MAP은 콘텐츠 선택 허브이며 실제 콘텐츠 페이지가 아닙니다.
    World 선택 시 `/about`, `/skills`, `/projects`, `/qa`, `/contact`로
    이동합니다.

-   WORLD MAP에서는 전체 구조를 한눈에 이해할 수 있어야 합니다.

-   사용자가 선택한 World로 자연스럽게 이동할 수 있어야 합니다.

-   World별 콘텐츠를 임의로 추가하거나 삭제하지 않습니다.

## Projects World

PROJECTS World는 4개의 프로젝트 스테이지가 한 화면에서 보이는 구조를
기본으로 합니다.

-   STAGE 01 --- PROJECT 01
-   STAGE 02 --- PROJECT 02
-   STAGE 03 --- PROJECT 03
-   STAGE 04 --- PROJECT 04

PROJECTS의 실제 콘텐츠 페이지는 `/projects` 하나이며, Stage별 Route를
기본으로 만들지 않습니다.

각 프로젝트는 필요한 경우 상세 화면으로 이동할 수 있습니다. 상세 화면에
URL이 필요하면 구조를 먼저 확인하고 결정합니다.

프로젝트 상세에는 디자인 원본과 실제 프로젝트 자료에 존재하는 정보만
사용합니다.

## 명명 규칙

-   React Component: PascalCase
-   React Component 파일명: PascalCase
-   CSS class: snake_case
-   HTML id: snake_case
-   상태 class: is_active, is_open, is_selected
-   오류 class: has_error
-   JavaScript 변수와 함수: camelCase
-   Boolean: is, has, can, should
-   이벤트 함수: handleXxx

## 반응형

-   Mobile: 360px
-   Tablet: 768px
-   Desktop: 1280px
-   모바일부터 확인합니다.
-   모든 기준에서 페이지 전체 가로 스크롤이 없어야 합니다.
-   콘텐츠가 화면 밖으로 잘리지 않아야 합니다.
-   이미지 비율이 깨지지 않아야 합니다.
-   터치 환경에서는 hover에 의존하지 않습니다.
-   2.5D 월드의 핵심 경험을 유지하되 모바일에서는 정보 밀도를
    조정합니다.

## 검증

실제 package.json의 scripts를 먼저 확인합니다.

### Lint

package.json의 실제 lint 명령을 확인한 후 실행합니다.

예:

``` bash
npm run lint
```

### Build

Vite 프로젝트의 실제 build 명령을 확인한 후 실행합니다.

예:

``` bash
npm run build
```

### Development

개발 서버 실행:

``` bash
npm run dev
```

### Preview

빌드 결과를 로컬에서 확인해야 하는 경우:

``` bash
npm run preview
```

### 검증 원칙

-   실행하지 않은 검증은 통과했다고 말하지 않습니다.
-   lint 결과를 실제로 확인합니다.
-   build 결과를 실제로 확인합니다.
-   브라우저 콘솔 오류를 확인합니다.
-   360px, 768px, 1280px에서 화면을 확인합니다.
-   START부터 STAFF ROLL + CONTACT까지 주요 Scene 흐름을 실제로
    조작합니다.
-   WORLD MAP의 모든 주요 World 이동을 확인합니다.
-   PROJECTS World의 4개 프로젝트 진입 및 복귀를 확인합니다.
-   주요 버튼, 링크, 메뉴, 인터랙션을 실제로 조작합니다.
-   키보드 Tab 순서와 focus-visible을 확인합니다.
-   prefers-reduced-motion을 확인합니다.
-   이미지, 폰트, CSS, JavaScript 경로를 확인합니다.
-   임시 console.log와 디버깅 코드를 제거합니다.
-   사용하지 않는 import와 불필요한 코드를 확인합니다.

## Git

-   작업 전 현재 branch와 변경 사항을 확인합니다.
-   기존 작업 내용을 임의로 삭제하지 않습니다.
-   사용자가 요청하지 않은 force push를 하지 않습니다.
-   관련 없는 파일을 커밋하지 않습니다.
-   의미 있는 단위로 커밋합니다.
-   커밋 전 변경 파일을 확인합니다.

## 프로젝트 문서

-   PRD: 제품 요구사항 / UX / 구조
-   AGENTS.md: 프로젝트 전체 개발 규칙
-   CLAUDE.md: Claude Code 전용 작업 규칙
-   `.agents/skills/design-to-react/SKILL.md`: 디자인 구현 작업 절차
-   PROJECT_CONTEXT.md: 현재 프로젝트 상태. 작업 완료 후 실제 상태에 맞게
    갱신하며 작업 방법이나 장기 규칙을 누적하지 않습니다.

## 결과 보고

작업 완료 후 다음 항목을 구분하여 보고합니다.

### 변경 파일

실제로 수정하거나 생성한 파일을 나열합니다.

### 구현 내용

실제로 구현한 기능과 화면을 요약합니다.

### 주요 판단

디자인이나 기술적으로 판단한 주요 내용을 설명합니다.

### 검증 결과

실제로 실행한 명령과 결과를 작성합니다.

예:

``` text
npm run lint → 통과
npm run build → 통과
360px → 확인
768px → 확인
1280px → 확인
```

### 확인하지 못한 부분

실제로 확인하지 못한 기능이나 환경이 있다면 명확하게 작성합니다.

실행하지 않은 검증을 통과했다고 표현하지 않습니다.
