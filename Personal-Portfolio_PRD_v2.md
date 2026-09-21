# Personal Portfolio PRD v2

## 1. 제품 개요

개인 채용을 준비하는 웹 퍼블리셔·프론트엔드 디자이너를 위해, 일반적인
포트폴리오 페이지를 넘어 **게임을 플레이하듯 자신의 역량과 프로젝트를
탐험하는 2.5D 인터랙티브 퍼스널 포트폴리오**를 제작합니다.

-   프로젝트명: Personal Portfolio
-   플랫폼: Responsive Web
-   개발 환경: React + Vite
-   핵심 콘셉트: Portfolio as a Game
-   핵심 경험: START → CHARACTER → POWER UP → WORLD MAP → ENTER WORLD →
    MISSION → STAGE CLEAR → NEXT WORLD → Q&A → STAFF ROLL + CONTACT

------------------------------------------------------------------------

## 2. 문제 정의

-   일반적인 포트폴리오는 위아래 스크롤과 카드 나열 중심이라 개인의
    개성과 기억에 남는 경험을 전달하기 어렵습니다.
-   프로젝트 결과물만 보여주면 지원자의 사고 과정, 역할, 기술 역량을
    충분히 전달하기 어렵습니다.
-   디자인과 개발 역량을 동시에 보여줄 수 있는 인터랙티브한 포트폴리오
    경험이 필요합니다.
-   따라서 포트폴리오 자체를 하나의 게임처럼 구성해 사용자가 자연스럽게
    콘텐츠를 탐험하도록 합니다.

------------------------------------------------------------------------

## 3. 목표 사용자

-   주요 사용자: 채용 담당자, 실무 디자이너·개발자, 포트폴리오를
    확인하는 기업 관계자
-   사용 환경: 데스크톱 중심, 태블릿 및 모바일 대응
-   사용자 목표:
    -   짧은 시간 안에 지원자의 정체성과 전문 분야를 파악
    -   주요 프로젝트와 작업 과정을 빠르게 확인
    -   디자인 및 프론트엔드 구현 역량을 경험
    -   연락 수단까지 자연스럽게 도달

------------------------------------------------------------------------

## 4. 제품 목표

-   포트폴리오 전체를 하나의 게임 플레이 흐름으로 구성합니다.
-   첫 화면부터 마지막 연락 화면까지 명확한 Scene progression을
    제공합니다.
-   WORLD MAP에서 주요 콘텐츠 영역을 게임 월드처럼 탐험할 수 있도록
    합니다.
-   각 World에서 콘텐츠를 확인하고 Mission을 수행한 뒤 Stage Clear로
    다음 World로 이어지는 구조를 제공합니다.
-   PROJECTS World에서는 **4개의 프로젝트 스테이지를 한 화면에서
    확인**할 수 있도록 합니다.
-   인터랙션과 모션은 시각적 장식보다 탐색과 정보 전달을 돕는 방향으로
    사용합니다.
-   React 컴포넌트 기반의 유지보수 가능한 구조로 구현합니다.

------------------------------------------------------------------------

# 5. 전체 Scene 구조

전체 포트폴리오는 다음 순서의 게임형 Scene Flow를 기본 구조로
사용합니다.

``` text
SCENE 01 — START
        ↓
SCENE 02 — CHARACTER
        ↓
SCENE 03 — POWER UP
        ↓
SCENE 04 — WORLD MAP
        ↓
SCENE 05 — ENTER WORLD
        ↓
SCENE 06 — MISSION
        ↓
SCENE 07 — STAGE CLEAR
        ↓
SCENE 08 — NEXT WORLD
        ↓
SCENE 09 — Q&A
        ↓
SCENE 10 — STAFF ROLL + CONTACT
```

### SCENE 01 --- START

-   목적: 사용자를 게임 세계로 진입시킵니다.
-   핵심 내용: 포트폴리오 타이틀, 시작 버튼, 초기 비주얼
-   주요 행동: START / ENTER
-   상태: 첫 진입 화면

### SCENE 02 --- CHARACTER

-   목적: 플레이어 캐릭터이자 포트폴리오의 주인공을 소개합니다.
-   핵심 내용: 이름, 직무, 캐릭터 비주얼, 간단한 자기소개
-   주요 행동: 캐릭터 확인, 다음 Scene 이동

### SCENE 03 --- POWER UP

-   목적: 지원자의 능력과 기술을 게임의 능력치처럼 소개합니다.
-   핵심 내용: Skills, Tools, Strength, 주요 역량
-   주요 행동: 능력치 확인, 다음 Scene 이동
-   표현 방식: 게이지, 아이콘, 스탯, 장비 등 게임 UI를 활용할 수 있음

### SCENE 04 --- WORLD MAP

-   목적: 전체 포트폴리오의 탐험 지도를 제공합니다.
-   주요 World:
    -   ABOUT
    -   SKILLS
    -   PROJECTS
    -   Q&A
    -   CONTACT
-   주요 행동: World 선택, 이동
-   원칙: 한 화면에서 전체 월드 구조를 이해할 수 있어야 합니다.

### SCENE 05 --- ENTER WORLD

-   목적: 사용자가 선택한 World에 진입하는 순간을 연출합니다.
-   핵심 내용: World title, intro, 대표 비주얼
-   주요 행동: ENTER / START MISSION
-   모션: 카메라 이동, 확대, 페이드, 오브젝트 등장 등을 필요에 따라 사용

### SCENE 06 --- MISSION

-   목적: 해당 World의 핵심 콘텐츠를 실제로 탐험하도록 합니다.
-   World별 Mission은 콘텐츠 성격에 맞게 달라질 수 있습니다.
-   주요 행동: 클릭, 선택, 스크롤, 프로젝트 탐색, 정보 확인
-   완료 조건: 해당 World의 핵심 콘텐츠를 확인하면 Mission 완료 상태로
    전환

### SCENE 07 --- STAGE CLEAR

-   목적: 하나의 World 탐색 완료를 게임의 Stage Clear처럼 피드백합니다.
-   핵심 내용: 완료 메시지, 확인한 콘텐츠, 다음 행동
-   주요 행동: NEXT WORLD / BACK TO MAP
-   주의: 과도한 게임 연출로 콘텐츠보다 화면이 앞서지 않도록 합니다.

### SCENE 08 --- NEXT WORLD

-   목적: 다음 World로 자연스럽게 이동시킵니다.
-   핵심 내용: 다음 World Preview
-   주요 행동: NEXT WORLD / WORLD MAP
-   모션: 다음 World로 이동하는 전환 연출

### SCENE 09 --- Q&A

-   목적: 포트폴리오와 지원자에 대해 예상되는 질문에 답합니다.
-   핵심 내용: FAQ / Interview Q&A
-   주요 행동: 질문 선택, 답변 열기
-   Q&A는 별도의 최종 정보 탐색 영역으로 사용합니다.

### SCENE 10 --- STAFF ROLL + CONTACT

-   목적: 전체 포트폴리오를 마무리하고 연락 행동으로 연결합니다.
-   핵심 내용:
    -   Staff Roll
    -   Credits
    -   Contact
    -   Email
    -   GitHub 또는 필요한 외부 링크
-   주요 행동: 이메일 보내기, 외부 링크 이동
-   최종 메시지: 포트폴리오를 완료한 사용자가 자연스럽게 연락 단계로
    이동하도록 합니다.

### Scene과 Page / Route

-   Scene: 게임형 포트폴리오의 진행 및 연출 단위
-   Page: 실제 포트폴리오 콘텐츠를 보여주는 단위
-   Scene과 URL은 1:1로 대응하지 않습니다. URL에는 Scene 번호를 넣지
    않습니다.

최종 Route:

| URL | 화면 | 구분 |
| --- | --- | --- |
| `/` | START (SCENE 01) | Scene |
| `/character` | CHARACTER (SCENE 02) | Scene |
| `/power-up` | POWER UP (SCENE 03) | Scene |
| `/world-map` | WORLD MAP (SCENE 04) | Scene |
| `/about` | ABOUT | Page |
| `/skills` | SKILLS | Page |
| `/projects` | PROJECTS | Page |
| `/qa` | Q&A | Page |
| `/contact` | CONTACT | Page |

-   SCENE 05 ENTER WORLD, SCENE 06 MISSION, SCENE 07 STAGE CLEAR,
    SCENE 08 NEXT WORLD는 World 진입 및 진행 연출이므로 별도 URL을 만들지
    않고 콘텐츠 페이지 내부에서 처리할 수 있습니다. 구체적인 방식은 확정된
    디자인을 기준으로 결정합니다.
-   WORLD MAP은 콘텐츠 선택 허브이며 실제 콘텐츠 페이지가 아닙니다.
    ABOUT / SKILLS / PROJECTS / Q&A / CONTACT를 선택하면 각각 `/about`,
    `/skills`, `/projects`, `/qa`, `/contact`로 이동합니다.
-   `/world/about`, `/world/qa`처럼 World를 위한 중복 URL을 만들지
    않습니다.
-   Q&A와 CONTACT 콘텐츠 페이지는 각각 하나만 사용합니다. SCENE 09가 Q&A
    콘텐츠를, SCENE 10이 CONTACT 콘텐츠를 보여줄 때는 `/qa`, `/contact`와
    같은 콘텐츠를 재사용하고 복제하지 않습니다.
-   PROJECTS는 `/projects` 하나의 페이지에서 4개 Stage를 보여줍니다.
    Stage별 Route를 기본으로 만들지 않습니다.

------------------------------------------------------------------------

## 6. WORLD 구성

WORLD MAP은 전체 Scene Flow와 별개로 포트폴리오의 주요 콘텐츠를 탐색하는
핵심 공간입니다.

### ABOUT WORLD

-   자기소개
-   경력 및 작업 배경
-   디자인/개발 방향
-   작업 철학

### SKILLS WORLD

-   HTML
-   CSS
-   JavaScript
-   React
-   UI/UX
-   Figma
-   Photoshop
-   Illustrator
-   기타 실제 사용 기술

### PROJECTS WORLD

-   핵심 프로젝트 4개
-   프로젝트별 대표 이미지
-   프로젝트명
-   프로젝트 유형
-   핵심 역할
-   상세 프로젝트 진입

### Q&A WORLD

-   예상 질문
-   지원자 관련 질문
-   작업 방식
-   문제 해결 방식
-   프로젝트 관련 질문

### CONTACT WORLD

-   Email
-   GitHub
-   필요한 외부 링크
-   최종 연락 행동

------------------------------------------------------------------------

## 7. PROJECTS World 구조

PROJECTS World는 **4개의 프로젝트 스테이지가 한 화면에서 보이는 B
방식**을 기본 구조로 합니다.

``` text
PROJECT WORLD

┌────────────┐  ┌────────────┐
│ STAGE 01   │  │ STAGE 02   │
│ PROJECT 01 │  │ PROJECT 02 │
└────────────┘  └────────────┘

┌────────────┐  ┌────────────┐
│ STAGE 03   │  │ STAGE 04   │
│ PROJECT 03 │  │ PROJECT 04 │
└────────────┘  └────────────┘
```

각 Stage에는 최소한 다음 정보를 제공합니다.

-   Project Name
-   Category
-   Role
-   Thumbnail / Key Visual
-   Short Description
-   Enter / View Detail

### Project Detail

프로젝트 상세 화면에는 프로젝트 성격에 따라 다음 정보를 사용합니다.

-   Overview
-   Problem
-   Goal
-   Role
-   Process
-   UX/UI
-   Development
-   Result
-   Key Screens
-   Retrospective

디자인 시안에 없는 내용을 임의로 추가하지 않습니다.

------------------------------------------------------------------------

## 8. 사용자 흐름

1.  사용자가 START 화면에 진입합니다.
2.  START를 선택합니다.
3.  CHARACTER에서 포트폴리오의 주인공을 확인합니다.
4.  POWER UP에서 Skills와 Strength를 확인합니다.
5.  WORLD MAP에서 원하는 World를 선택합니다.
6.  ENTER WORLD 연출을 통해 선택한 World로 이동합니다.
7.  MISSION을 수행하며 핵심 콘텐츠를 탐색합니다.
8.  완료 후 STAGE CLEAR를 확인합니다.
9.  NEXT WORLD에서 다음 World를 선택하거나 WORLD MAP으로 돌아갑니다.
10. Q&A에서 지원자에 대한 주요 질문과 답변을 확인합니다.
11. STAFF ROLL + CONTACT에서 포트폴리오를 마무리하고 연락 수단을
    확인합니다.

------------------------------------------------------------------------

## 9. 화면 상태

-   Default: 기본 콘텐츠가 표시된 상태
-   Hover: 데스크톱에서 선택 가능한 요소의 시각적 피드백
-   Focus: 키보드 접근 시 focus-visible 표시
-   Active: 현재 선택된 World / Stage / Project
-   Locked: 아직 접근할 수 없는 콘텐츠가 존재하는 경우 사용
-   Entering: World 진입 중
-   Mission: 콘텐츠 탐색 중
-   Clear: Mission 완료 상태
-   Loading: 필요한 에셋 또는 콘텐츠 로딩 상태
-   Empty: 표시할 콘텐츠가 없는 상태
-   Error: 외부 링크나 리소스 오류 상태
-   Reduced Motion: 사용자의 reduced-motion 설정을 존중하고 장식적
    애니메이션 최소화

------------------------------------------------------------------------

## 10. 제외 범위

-   회원가입 / 로그인
-   결제
-   실제 게임 엔진
-   실제 게임 데이터 서버
-   CMS
-   관리자 페이지
-   실제 API
-   사용자 계정 데이터 저장
-   요청되지 않은 외부 서비스 연동
-   디자인 시안에 없는 기능
-   과도한 3D/WebGL 구현
-   의미 없는 장식용 애니메이션

------------------------------------------------------------------------

## 11. 디자인 기준

-   제공된 Figma 또는 디자인 원본을 최우선 시각 기준으로 사용합니다.
-   2.5D Game World 콘셉트를 유지합니다.
-   게임 UI 요소는 실제 콘텐츠의 계층을 방해하지 않는 범위에서
    사용합니다.
-   디자인에 없는 화면, 기능, 이미지, 아이콘을 임의로 추가하지 않습니다.
-   새 에셋 제작 전에 기존 assets와 디자인 원본을 확인합니다.
-   기존 색상, 폰트, spacing, radius, shadow를 우선 사용합니다.
-   프로젝트 이미지와 실제 작업 결과물이 가장 중요한 시각 정보가 되도록
    합니다.
-   게임 장식보다 정보 전달과 가독성을 우선합니다.

------------------------------------------------------------------------

## 12. 개발 조건

-   React + Vite로 처음부터 구현합니다.
-   바닐라 HTML/CSS/JavaScript 방식으로 전체 페이지를 구현하지 않습니다.
-   React 컴포넌트 단위로 화면을 구성합니다.
-   JavaScript를 기본 언어로 사용합니다.
-   TypeScript는 별도 요구가 없는 한 도입하지 않습니다.
-   Tailwind CSS는 별도 요구가 없는 한 사용하지 않습니다.
-   CSS는 컴포넌트와 화면 역할에 맞게 관리합니다.
-   기존 assets를 우선 사용합니다.
-   요청 없이 패키지나 외부 라이브러리를 추가하지 않습니다.
-   Vue는 사용하지 않습니다.

### 라이브러리 사용 기준

-   React Router DOM: URL 단위의 페이지 이동에 사용 (Route 구조는 5장의
    "Scene과 Page / Route" 참고)
-   Framer Motion: 일반적인 UI 모션, 등장, hover, 전환
-   GSAP: 복잡한 타임라인 기반 Scene 연출
-   ScrollTrigger: 스크롤과 연결된 고급 모션
-   Lenis: 제품 경험상 부드러운 스크롤이 필요할 때
-   Swiper: 실제 슬라이더 또는 갤러리가 필요한 경우

------------------------------------------------------------------------

## 13. 인터랙션 원칙

-   모든 모션은 목적이 있어야 합니다.
-   Scene 전환은 사용자가 현재 위치와 다음 위치를 이해할 수 있도록
    합니다.
-   모션이 콘텐츠 읽기를 방해하지 않아야 합니다.
-   버튼과 선택 요소는 즉각적인 피드백을 제공합니다.
-   Hover만으로 핵심 기능을 숨기지 않습니다.
-   모바일에서는 터치 환경을 고려합니다.
-   동일한 효과를 여러 라이브러리로 중복 구현하지 않습니다.
-   `prefers-reduced-motion`을 지원합니다.

------------------------------------------------------------------------

## 14. 명명 규칙

-   React Component: PascalCase
-   CSS class: snake_case
-   HTML id: snake_case
-   상태 class: `is_active`, `is_open`, `is_selected`
-   오류 class: `has_error`
-   JavaScript 변수/함수: camelCase
-   Boolean: `is`, `has`, `can`, `should`
-   이벤트 함수: `handleXxx`

------------------------------------------------------------------------

## 15. 반응형 기준

-   Mobile: 360px
-   Tablet: 768px
-   Desktop: 1280px
-   주요 디자인 기준: Desktop
-   모든 화면에서 전체 가로 스크롤 금지
-   콘텐츠 잘림 금지
-   모바일에서는 게임 월드의 핵심 정보와 탐색 경험을 유지하면서
    레이아웃을 단순화
-   터치 환경에서 hover에 의존하지 않음

------------------------------------------------------------------------

## 16. 접근성

-   클릭: `button`
-   페이지/외부 이동: `a`
-   입력: label 또는 accessible name 제공
-   키보드 focus-visible 제공
-   색상만으로 상태 구분 금지
-   의미 있는 이미지에 alt 제공
-   장식용 이미지는 적절히 처리
-   키보드로 모든 핵심 기능 접근 가능
-   `prefers-reduced-motion` 지원
-   텍스트 대비와 가독성 유지

------------------------------------------------------------------------

## 17. 데이터와 저장

-   초기 버전: 정적 콘텐츠 및 프로젝트 데이터
-   데이터 출처: React 내부 데이터 또는 JSON
-   실제 API: 사용하지 않음
-   로그인 데이터: 없음
-   개인정보 저장: 없음
-   localStorage: 기능상 필요하지 않으면 사용하지 않음

------------------------------------------------------------------------

## 18. 검증 방법

### 디자인

-   Figma와 실제 브라우저를 나란히 비교
-   spacing, typography, color, image ratio, radius 확인

### 반응형

-   360px
-   768px
-   1280px

각 환경에서 다음을 확인합니다.

-   잘림
-   겹침
-   가로 스크롤
-   텍스트 overflow
-   이미지 비율
-   터치 영역

### 기능

-   START
-   CHARACTER
-   POWER UP
-   WORLD MAP
-   ENTER WORLD
-   MISSION
-   STAGE CLEAR
-   NEXT WORLD
-   Q&A
-   STAFF ROLL
-   CONTACT

전체 흐름을 실제로 조작합니다.

### 접근성

-   Tab 순서
-   focus-visible
-   keyboard interaction
-   alt
-   reduced-motion

### 코드

-   브라우저 Console 오류 확인
-   불필요한 console.log 제거
-   사용하지 않는 import 제거
-   빌드 오류 확인

### 배포

-   GitHub Pages에서 정상 로드
-   이미지 / 폰트 / CSS / JS 경로 확인
-   직접 URL 접근 확인
-   새로고침 확인

------------------------------------------------------------------------

## 19. 완료 조건

-   전체 Scene Flow가 정상적으로 연결됩니다.
-   START부터 STAFF ROLL + CONTACT까지 자연스럽게 진행됩니다.
-   WORLD MAP에서 주요 World를 탐색할 수 있습니다.
-   PROJECTS World에서 4개 프로젝트가 한 화면에 표시됩니다.
-   프로젝트 상세 화면으로 이동할 수 있습니다.
-   Scene 전환 및 주요 인터랙션이 정상 작동합니다.
-   반응형 기준에서 가로 스크롤이 없습니다.
-   접근성 기준을 통과합니다.
-   reduced-motion을 지원합니다.
-   콘솔에 치명적인 오류가 없습니다.
-   실제 에셋이 누락되지 않습니다.
-   GitHub Pages 배포 환경에서 모든 리소스가 정상적으로 로드됩니다.

### 최종 보고 항목

구현 완료 후 다음을 보고합니다.

1.  변경 파일
2.  구현 내용
3.  사용한 라이브러리
4.  구현된 Scene 목록
5.  검증 결과
6.  확인하지 못한 부분
7.  추가 작업이 필요한 부분

------------------------------------------------------------------------

## 20. 기술 스택

-   Framework: React
-   Build Tool: Vite
-   Language: JavaScript
-   Linter: ESLint
-   Routing: React Router DOM
-   UI Motion: Framer Motion
-   Advanced Motion: GSAP / ScrollTrigger (필요 시)
-   Smooth Scroll: Lenis (필요 시)
-   Slider: Swiper (필요 시)
-   Styling: CSS
-   Version Control: Git / GitHub
-   Deployment: GitHub Pages
