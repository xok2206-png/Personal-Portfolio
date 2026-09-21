# Personal Portfolio 현재 상태

마지막 업데이트: 2026-09-21

## 기술 스택

-   React 19, Vite 8, JavaScript, JSX, CSS
-   React Router DOM 7.18.4 (설치 및 사용 중)
-   ESLint
-   사용하지 않음: Vue, TypeScript, Tailwind

## 현재 프로젝트 구조

```text
.agents/skills/design-to-react/SKILL.md
public/assets/
├─ fonts/     LilitaOne-Regular.ttf, OFL.txt, Lilita_One.zip
└─ images/  characters/  backgrounds/  icons/   (비어 있음, .gitkeep만 존재)
src/
├─ main.jsx        BrowserRouter, index.css import
├─ index.css       body { margin: 0 } 만 존재
├─ App.jsx         Routes (9개)
├─ scenes/         Scene01Start ~ Scene10StaffRoll (각 폴더에 동일 이름의 .jsx)
└─ pages/          About/  Skills/  Projects/  QA/  Contact/
```

## 구현 완료

### Router 구조 (`src/App.jsx`)

| URL | 화면 |
| --- | --- |
| `/` | Scene01Start |
| `/character` | Scene02Character |
| `/power-up` | Scene03PowerUp |
| `/world-map` | Scene04WorldMap |
| `/about` | pages/About |
| `/skills` | pages/Skills |
| `/projects` | pages/Projects |
| `/qa` | pages/QA |
| `/contact` | pages/Contact |

### Scene 구조 (`src/scenes/`)

-   Scene01~Scene10 컴포넌트 10개가 존재하며, 제목만 있는 골격입니다.
-   Route에 연결된 Scene: 01~04
-   Route에 연결되지 않은 Scene: 05~10
    -   Scene09QA는 `pages/QA`, Scene10StaffRoll은 `pages/Contact`
        컴포넌트를 import해서 렌더링합니다.

### Page 구조 (`src/pages/`)

-   About, Skills, Projects, QA, Contact: 제목만 있는 골격
-   `pages/QA`, `pages/Contact`가 각 콘텐츠의 유일한 컴포넌트입니다.

### 이동 연결

-   `Scene01Start`의 START GAME → `/character`, `Scene02` → `/power-up` →
    `/world-map` 순서로 `Link`가 연결되어 있습니다. (`Scene02`~`04`는 스타일
    없는 임시 텍스트 링크)
-   `Scene01Start` 상단 메뉴: ABOUT `/about`, PROJECT `/projects`, Q&A `/qa`,
    CONTACT `/contact`
-   `Scene04WorldMap`에서 ABOUT `/about`, SKILLS `/skills`, PROJECTS
    `/projects`, Q&A `/qa`, CONTACT `/contact`로 `Link` 이동합니다.

### 문서

-   PRD(`Personal-Portfolio_PRD_v2.md`), AGENTS.md, CLAUDE.md,
    `.agents/skills/design-to-react/SKILL.md`가 위 Route / Scene 구조를
    기준으로 정리되어 있습니다.

## 구현 중

-   `Scene01Start` 화면 구현 완료(100vh 풀페이지, 스크롤 없음): 배경
    `main.png`, 로고 `main title.png`, 헤더, 메뉴, START GAME 버튼.
    `Scene01Start.css`, `index.css`의 Lilita One `@font-face` 추가.
-   그 외 Scene과 Page는 제목과 임시 링크만 있는 골격입니다.

## 확정된 UX 정책

-   2.5D Game World 콘셉트로 구성합니다.
-   Scene은 게임형 진행/연출 단위, Page는 실제 콘텐츠 단위이며 1:1로
    대응하지 않습니다.
-   WORLD MAP은 콘텐츠 선택 허브입니다. 5개 World(ABOUT, SKILLS,
    PROJECTS, Q&A, CONTACT)를 선택하면 `/about`, `/skills`, `/projects`,
    `/qa`, `/contact`로 이동합니다.
-   Q&A는 `/qa` 하나만, Contact는 `/contact` 하나만 사용합니다.
    SCENE 09 / 10은 같은 컴포넌트를 재사용합니다.
-   Scene 번호는 URL에 사용하지 않습니다. `/world/*` 중복 Route도 없습니다.
-   SCENE 05~08은 별도 URL 없이 콘텐츠 페이지 내부 연출로 다룹니다.
-   PROJECTS는 `/projects` 하나의 페이지에서 4개 Stage(STAGE 01 ~ 04)를
    한 화면에 보여줍니다.

## 사용 중인 라이브러리

`package.json` 기준입니다.

-   사용 중: React, React DOM, Vite, React Router DOM
-   설치됨, 코드에서 미사용: Framer Motion, GSAP(ScrollTrigger 포함),
    Lenis, three
-   설치되어 있지 않음: Swiper

## 저장 데이터

-   localStorage, 외부 API, 저장 데이터: 없음

## 알려진 문제

-   Scene01 디자인 시안의 픽셀체 폰트 파일이 없어 Lilita One으로
    대체했습니다. 시안의 배경 위 문구("A MORE CREATIVE TOMORROW", 표지판
    "GOOD DESIGN BRIGHTER TOMORROW")는 `main.png`에 포함되어 있지 않아
    구현하지 않았습니다.
-   Scene 05~10은 Route에 연결되지 않았고, 콘텐츠 페이지 내부에서 쓰이는
    흐름이 정해지지 않았습니다.
-   콘텐츠 페이지에서 WORLD MAP으로 돌아가는 이동이 없습니다.
-   404 Route가 없어 정의되지 않은 URL은 빈 화면입니다.
-   디자인 토큰(CSS 변수)과 `@font-face`가 정의되지 않았습니다.
-   `public/assets/fonts/Lilita_One.zip`이 빌드 결과에 포함됩니다.
-   `index.html`에 favicon `<link>`가 없습니다.
-   `README.md`는 Vite 템플릿 안내문 그대로입니다.
-   정적 호스팅(GitHub Pages) 배포 시 직접 URL 접근용 fallback 설정이
    필요할 수 있습니다.

## 다음 작업

1.  Scene 02~04 화면 디자인 구현
2.  World별 콘텐츠 페이지 구현 (`/about`, `/skills`, `/projects`, `/qa`,
    `/contact`)
3.  PROJECTS 4개 Stage 구현
4.  Scene 05~08 연출 구현
5.  Scene 09 / 10 구현
6.  반응형, 모션 구현
7.  전체 브라우저 검증 및 GitHub Pages 배포

## 마지막 검증 결과

-   `npm run lint` → 통과
-   `npm run build` → 통과
-   서버 측 렌더링(StaticRouter)으로 9개 URL 확인 → 각 URL이 해당 제목을
    출력함. 직전 Route 작업에서 확인한 결과이며 이번 문서 작업에서는
    코드를 변경하지 않았습니다.
-   확인하지 못한 부분:
    -   브라우저 화면, Console 오류, 실제 클릭 이동, 새로고침
    -   360px / 768px / 1280px 반응형
    -   키보드 접근성, prefers-reduced-motion
