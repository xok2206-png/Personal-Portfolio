# Personal Portfolio --- PROJECT_CONTEXT CURRENT

## 2026-10-01 통합 개발 주소 5173

- 사용자 요청으로 최신 통합 작업 폴더 `1573/Personal-Portfolio`의 기본 Vite 포트를 5173으로 변경했다.
- 기존 5173 원본 서버와 5174 통합 서버, 5178 Projects 미리보기 서버를 종료하고 통합본을 127.0.0.1:5173에서 실행했다.
- 페이지별 원본 폴더와 자동 동기화 구조는 유지했다. 통합 폴더의 별도 수정 파일은 동기화로 덮어쓰지 않았다.
- 실제 브라우저 /skills 진입, 설명 한 줄·코어 선택·공통 조작 안내 표시를 확인했다. 페이지 소스 변경 없이 서버 주소만 전환했다.


## 2026-10-01 공통 헤더 — 첨부 이미지 레퍼런스 적용

사용자가 후속 이미지 레퍼런스를 지정해 긴 푸른 반투명 바, 은색 이중 테두리,
메뉴 구분선과 선택된 메뉴 아래의 푸른 빛/마름모 표식을 요청했다.
이 헤더 범위에서는 이전의 배경 없는 메뉴와 장식/이중 테두리 금지보다 최신 요청을 우선한다.
SUIT 16px와 기존 5개 메뉴/Route/모바일 Dialog/설정/로고를 유지한다.
Header 내부에 한정한 nav-glass #263E61, nav-signal #65C8F4는 레퍼런스의
푸른 유리 및 선택 빛을 재현하기 위한 색이며 다른 페이지 콘텐츠 팔레트에 확장하지 않는다.
텍스트 그림자는 사용하지 않으며 선택 표식은 항상 하나다. 배경 흐림 미지원 및
투명도 감소 환경에는 기존 불투명 SurfaceDark를 사용한다. 모바일은 기존 메뉴 Dialog로 접근한다.
앞선 3개 내비게이션 후보는 비교 기록이며 이번 첨부 이미지가 현재 적용 기준이다.
검증: 23개 필수/경계/가로 화면 크기에서 헤더 요소 겹침과 화면 밖 잘림 없음,
모든 표시된 메뉴/버튼 44px 이상. World/About/Contact에서 밝고 어두운 배경을
직접 확인했다. 메뉴 클릭 및 Enter 이동, 모바일 메뉴 열기/Escape 닫기와
원래 버튼으로 포커스 복귀, 설정 열기 확인. 런타임 오류 없음.
Lint/build 통과. 기존 Three.js 550KB 청크 경고 유지.
실기기 Safari 및 200% 브라우저 확대, 투명도 감소 미디어 환경은 이번에 확인하지 않았다.


## 2026-10-01 월드맵 화면 정리 / 공통 내비게이션 후보

- 사용자 요청으로 월드맵의 조작 안내 팝오버와 처음 위치로 버튼을 제거했다.
  기존 하단 공통 키보드 안내, Escape 복귀, 설정의 복귀 이벤트, 비행 취소와 입장은 유지한다.
- 제목은 Desktop 왼쪽 아래 하늘 여백에 배치한다. Marcellus Display L
  38–56px / 1.1, 보조 문구는 SUIT Body S 14px를 사용한다.
  직접 접근/모바일 모드에서는 상단 104px에 두고 섬 목록 시작을 216px로 분리했다.
- 모바일 전환 시 이전 WebGL 화면이 목록 위에 잠시 남지 않도록 직접 접근 모드에서
  canvas를 즉시 숨긴다. 섬 데이터·선택·이동·콘텐츠와 기존 공통 헤더는 보존했다.
- 공통 내비게이션은 짙은 공통 바 / 아이보리 메뉴판 / 지도 책갈피 3개 비교 시안만
  제작했다. 각 시안의 메뉴로 5개 페이지 배경과 활성 상태를 비교할 수 있다.
  아직 선택되거나 실제 공통 헤더에 적용된 안은 없다. WORKING/LOCKED 변경 없음.

- 검증: 23개 Desktop/Mobile/경계/가로 화면 크기에서 제목과 섬 영역의 겹침,
  가로 넘침 없음. 1111×930 및 390×844 직접 시각 확인. 키보드 Enter 비행과
  Escape 취소/복귀 확인. 내비게이션 시안 3개 × 5개 배경 전환 및
  1024/736/430/360px 브라우저 폭에서 44px 이상 메뉴와 가로 넘침 없음 확인.
- npm run lint / npm run build 통과. 기존 Three.js 550KB 청크 경고 유지.
  실제 모바일 기기와 Safari, 200% 브라우저 확대는 이번에 확인하지 않았다.


### 후속 사용자 요청 — 상단 지명 / 호버 대비 / 선택 / 배치

- 네 섬 모두 실제 이미지 alpha 실루엣 상단에서 12px 간격을 두고 지명을 배치한다.
  Skills 측면 배치는 상단 중앙으로 변경했다. 카메라가 이동해도 Three.js 투영 좌표를 따른다.
  Desktop/Mobile 모두 H4: SUIT 20px, 600, 1.4; 보조 설명은 Body S 14px다.
- Hover/Focus: 이름에 얇은 밑줄과 Interaction Dark, 해당 섬은 소폭 명암/채도 강조,
  나머지 섬은 약하게 낮춘다. 선택 시 점/밑줄과 강조를 비행 중·도착 상태까지 유지한다.
  파티클·글로우·프레임은 추가하지 않았다. Reduced Motion에서 이동 효과를 생략한다.
- About는 좌측 위, Skills는 좌측 아래에서 중앙 쪽, Projects는 위쪽 중앙, Contact는
  우측으로 배치했다. 섬별 거리와 크기를 조정해 비행선 주변에 이동 여백을 확보했다.
  좌표: About(-19,4,-8)/15.5, Skills(-9.5,-1.2,11)/12,
  Projects(7,5,-19)/21, Contact(22,-.5,5)/13.7. 단위는 기존 Three.js 공간이다.
- 최종 배치로 22개 필수/경계/가로 화면에서 지명 경계·44px·가로 넘침 재검증.
  키보드 포커스의 동일 대비 효과, 선택 후 비행 상태, 런타임 오류 없음 확인.
  기존 직접 접근/비행/물 흐름/캐릭터 크기 보정과 About 링크 제거를 유지했다.


## 2026-10-01 월드맵 지명·물 흐름 / About 링크 / 캐릭터 크기

- 현재 사용자 미리보기 5174를 제공하는 1573 작업 폴더에 적용했다. 4786의 이전
  월드맵으로 덮어쓰지 않았다. 기존 미커밋 변경/Route/콘텐츠/비행 및 보행 기능은 보존했다.
- FlightWorld.jsx/css: 선택한 하늘 지도 지명 시안 적용. 흰 상자/화살표 제거,
  네 섬 위 이름과 Skills의 측면 간격, 모바일 이미지와 이름 분리, 선택 점/포커스 유지.
- flightScene.js: 폭포 조각의 fract 반복을 없애고 연속 sin 굴절/반사광으로 대체.
  물 영역의 경계 feather와 원본 alpha 유지. 낮은 Desktop 높이에서 시야각을 보정해
  Projects 지명과 Header 간격을 확보했다. Three.js가 환경 모션의 단일 소유자다.
- NextDestination.jsx: About의 다음 이야기 Skills 링크만 제거했다.
- SkillsCore.css / ProjectsWorld.css / useProjectExploration.js: About 크기에 맞춤.
  실제 alpha 높이와 Projects 기본 카메라 fit 보정. 발 위치/보행 프레임/충돌/확대/원근 유지.
- 브라우저 확인: 월드맵 22 필수/경계/가로 화면 크기에서 가로 넘침 없음,
  최소 44px 이름표 확인. 1280×600의 상단 간격 문제를 수정 후 재확인했다.
  Desktop/Mobile 화면과 물줄기, About 다음 링크 0개를 직접 확인했다.
- 캐릭터 실측: 1440×810에서 About/Skills 125.87px, Projects 125.89px.
  1111×930, 1920×1080, 1024×768에서도 시작 상태의 실제 인물 높이 차이 <0.03px.
  숫자는 alpha 영역을 반영한 화면 높이이며 프레임의 투명 여백은 제외했다.
- 모바일 Projects는 기존 직접 콘텐츠 구조(캐릭터 숨김)를 유지한다.
  실기기 Safari/영상 프레임 시간 계측/새 성능 지표는 이번 작업에서 검증하지 않았다.
  다른 페이지의 공간 디자인/이동 방식에 대한 WORKING/LOCKED 변경은 없다.


**Updated:** 2026-09-30\
**Purpose:** 현재 실제 구현 상태와 최신 확정 문서 기준을 연결한다.\
**Important:** 아래 `ARCHIVED IMPLEMENTATION HISTORY`는 삭제하지 않는다.
과거 구현/QA 기록이며, 현재 요구사항과 충돌하면 현재 Source of Truth가
우선한다.

## 2026-10-01 Projects 보행·충돌 후속 수정

- 앞/뒤 보행에서 몸 전체를 좌우 반전하던 처리를 제거하고 스프라이트의 4개 프레임을 사용한다. 실제 이동 거리에 보폭을 맞추고 방향 전환에 히스테리시스를 적용했다.
- 발 너비를 포함한 충돌 검사, 중앙 사이프러스와 수족관 옆 나무 밑동, 이동 구간 검사를 추가했다. 자동 이동 그래프도 같은 충돌 검사를 사용하며 중앙 나무 앞을 우회한다.
- 기존 WASD/달리기/클릭 이동/프로젝트 입장/모바일 직접 링크를 유지한다. 새로운 이동 방식이나 디자인 확정은 아니다.
- 브라우저 1440×810에서 4개 보행 프레임·방향·키 해제/창 이탈 정지 및 런타임 오류 없음 확인. 1366×768 모션 감소 시 이동 유지/보행 애니메이션 정지, 430×932에서 5개 직접 링크를 확인했다.
- lint/build 통과. 기존 Three.js 청크 크기 경고 유지. 회귀 검사: `qa/project-movement-check.mjs` 통과(입구 간 30개 경로, 7개 장애물 지점, 모든 길 노드에서 16방향 달리기 이동 구간). 길 검색의 임시 객체 생성과 제곱근 계산도 줄였다.

## 2026-10-01 페이지별 최신 작업 통합

- Projects 후속 충돌/UI 수정: 발 주변 검사와 별개로 모든 장애물 변까지의
  몸 너비 여유를 검사한다. 새 여유에 맞춰 마을 앞/옆과 북쪽 도로의 경유점 4개를
  조정했다. 30개 경로/도로 노드별 16방향 달리기 검사 통과. 1111×930 실제 화면에서
  자두야 자동 이동 후 W를 4.5초 유지해 벽 앞 정지 확인. 다른 건물의 브라우저
  수동 이동은 이번에 전부 반복하지 않았으며 전체 경로 검사는 코드 기반이다.
  제목 박스를 제거하고 목록/목적지 안내를 하단 목적지 선택 Dialog로 통합했다.
  길 안내와 상세 보기를 제공하며 모바일은 상세 보기를 유지한다. 배경 채도 .82,
  노을 혼합 최대 .38로 조정했다. 원본 그림/캐릭터/5개 프로젝트는 보존한다.
  1111×930,430×932,844×390,768×1024 UI 확인, lint/build 통과.

- Projects 충돌 보정: 아쿠아리움 오른쪽 벽/앞 모서리와 시계탑 단상 경계를
  `projectRoads.js`에 맞췄다. 기존 30개 입구 경로 및 도로 노드별 16방향 달리기
  검증, 기존 장애물과 추가 모서리 3점 회귀 검증 통과. 1440×810 브라우저에서
  해당 건물 클릭 3건 무시/도로 W 이동 유지 확인. lint/build 통과.

- Projects는 사용자 요청으로 `chapter-light.css`의 페이지 한정 규칙을 통해
  100dvh 원페이지로 고정했다. 모바일 하단 목록 대신 기존 프로젝트 목록 Dialog로
  전체 작업에 접근한다. 상세 페이지 스크롤은 유지한다. 1440×810, 1366×768,
  1024×768, 768×1024, 430×932, 360×800, 844×390에서 문서 높이=화면 높이,
  휠 입력 후 scrollY=0과 현재 5개 프로젝트 목록 진입을 확인했다.

### 공통 헤더 후속 수정

- 2026-10-01 사용자 선택: 비교 시안 01 열린 탐험의 중앙 내비게이션과 우측
  귀환/설정 아이콘만 적용했다. 배경 없는 텍스트 메뉴, 활성 위치 표식/밑줄,
  배경 없는 우측 아이콘이다. 왼쪽 로고/이름/면과 페이지 콘텐츠는 보존했다.
  5개 Route × 22 Viewport, 설정/키보드/모바일/귀환 QA 오류 0, lint/build 통과.
  아래 금속 탭 설명은 이전 구현 기록이다. 기존 Three.js chunk 크기 경고는 유지된다.

- 후속 피드백으로 녹색/Ivory 안내판 시안은 폐기했다. 현재는 Ink 기반 금속 면의
  개별 메뉴 탭 + 목적지 아이콘 + 활성 항목의 Warm Accent 표시다.
  귀환/설정/모바일 메뉴와 Dialog도 같은 어두운 재질로 수정했다.
  PageHeader 범위의 색상 파생값만 추가했으며 전역 배경/팔레트/본문은 유지한다.
  아래 Green/Ivory 설명은 이전 구현 기록이다. 최신 코드와 스크린샷이 우선한다.
  수정 후 Header 전용 5 Route × 22 Viewport/키보드/모바일/귀환 QA와
  lint/build가 다시 통과했다. `output/header-qa/`는 최신 시안으로 갱신했다.

- 사용자 요청으로 Header를 Deep Green/ Ivory 안내판 형태로 수정했다.
  Real World/설정/모바일 메뉴는 Radix Exit/Gear/Menu 아이콘과 aria-label로 표시한다.
  Hover/Focus 툴팁, 44–48px 버튼, 모바일 설정 직접 진입을 제공한다.
  공통 메뉴/라우트/방문 기록/Projects 빠른 목록 동작은 유지했다.
- 변경은 PageHeader.jsx/CSS에 한정하며 `@radix-ui/react-icons`를 추가했다.
  필요한 네 아이콘만 import한다. 기존 WorldMark와 색/폰트 토큰은 유지한다.
  이전 누적 Header CSS를 해당 컴포넌트 범위에서 정리했다.
  아래 과거 Header의 텍스트 복귀·설정 버튼 기록보다 이 후속 구현이 우선한다.
- Header QA: `qa/header-check.cjs`에서 5개 Route × 22개 화면 크기,
  44px 이상 아이콘 영역/메뉴 겹침 없음, 툴팁, 키보드 Enter/Escape와
  포커스 복귀, 모바일 메뉴/설정 직접 진입, 리얼월드 귀환을 확인했다. 오류 0.
  결과와 Desktop/Mobile 캡처는 `output/header-qa/`. Lint/build/diff 검사 통과.
  기존 통합 QA의 Skills/Contact 조작 이름은 다른 채팅의 후속 변경으로 오래돼
  선택자를 갱신했다. 이번 헤더 검증 완료는 위 전용 QA 기준이다.
  Safari/실기기/네이티브 200% Zoom 미검증, 기존 Three.js chunk 크기 경고 유지.

- 사용자가 다른 채팅에서 진행 중인 전체 페이지를 최신 버전으로 통일하도록 요청했다.
  통합 미리보기는 이 작업 폴더의 `http://127.0.0.1:5174`이다.
- World/공통 Header/Welcome/Voyage는 이 폴더의 비행 탐험 버전을 유지한다.
  About는 원본 main 작업 폴더의 다섯 오브젝트 아침 작업실/StudioAtmosphere,
  Skills는 052a의 단일 Core/측면 기술 패널, Projects는 22a0의 다섯 Landmark와
  상세 페이지, Contact는 4786의 CONNECT 전망대/메뉴/망원경 버전을 통합했다.
  아래 비행 추천안 기록의 기존 Projects 갤러리/Contact 배경 적용은 이 최신 통합으로 대체됐다.
- 공통 충돌은 수동 병합했다: 최신 Header 디자인 + 현재 Projects 선택 시 목록 열기,
  기존 Loading/Route + 새 프로젝트 상세의 독립 레이아웃,
  2초 Voyage + Contact 망원경용 방문 기록. 기존 프로젝트 사실 데이터는 유지한다.
  아쿠아리움은 해당 페이지 작업의 최신 사용자 요청으로 추가됐으며 자료 미제공 상태다.
- `scripts/page-worktree-sync.mjs`는 개발 서버에서 지정된 페이지 소유 폴더만
  1.2초 간격으로 확인하여 통합 폴더에 반영한다. 작성 중인 파일은 잠시 기다린다.
  다른 원본 폴더에는 쓰지 않으며 삭제도 전파하지 않는다. 양쪽에서 같은 파일을
  수정하면 통합 폴더의 변경을 보존하고 콘솔에 병합 필요를 표시한다.
  첫 덮어쓰기 전 복구본은 git 제외 `.page-sync/backups/`에 보관한다.
- 로컬 폴더 연결은 git 제외 `.page-worktrees.local.json`에 있다. 외부 폴더 연결이
  없는 환경도 통합된 코드/에셋으로 실행·빌드 가능하다. 공유 App/Router/Header/문서는
  자동 덮어쓰기하지 않는다. 향후 해당 공통 파일의 추가 변경은 별도 병합 대상이다.
- 이 폴더의 Vite는 5174/strictPort로 고정했다. 포트 충돌 시 다른 번호로 몰래
  이동하지 않는다. 다른 채팅의 작성/QA 서버는 중단하지 않았다.
  원본 main/GitHub/Vercel 배포는 이번 로컬 통합에서 변경하지 않았다.
- 페이지별 디자인과 인터랙션은 Working이며, 이번 통합이 최종 디자인 확정을 뜻하지 않는다.
- 통합 QA: `qa/integrated-pages-check.cjs`로 다섯 주요 Route × 22개 Viewport의
  가로 넘침/공통 메뉴 접근, About 정보창, Skills 분야 패널, Projects 메뉴 목록과
  다섯 상세 URL, Contact 연결 메뉴, Back/Reload, Q&A/Resume/QuickView/RealWorld를
  확인했다. 런타임 오류/실패 응답 0. 결과는 `output/integrated-pages-qa/report.json`.
  1440×810/430×932 캡처를 검토했다. 실제 Safari/모바일 기기/네이티브 Zoom은 미확인.
- 기존 비행 회귀 `qa/flight-extended-check.cjs`도 통과했다: 수동 조작/자동항로 취소,
  모션 설정, 이미지 실패, WebGL 손실, 로딩 지연 시 HTML fallback. 오류 0.
  `qa/page-sync-check.mjs`는 복사/변경 감지/충돌 보존/백업/삭제 미전파를 검증한다.
  실제 개발 서버 로그에서도 후속 Contact/Projects 파일이 자동 복사되고 HMR 되는 것을 확인했다.
- 통합 후 lint/build 및 diff whitespace 검사 통과. Three.js 약 550KB chunk 경고는 유지한다.
  다른 채팅에서 작성 중인 변경은 계속 들어오므로 QA는 실행 시점의 통합 상태를 의미한다.

## 비행 탐험 추천안 적용 — 현재 Working v1

### 구현

- 사용자가 추천안 적용을 요청했다. `/world-map`의 PortfolioWorld export를
  FlightWorld로 연결했다. 기존 LayeredWorld/useWorldWalk와 관련 에셋은 보존하며,
  Skills/Projects의 별도 캐릭터 조작과 모든 실제 포트폴리오 콘텐츠/Route는 유지했다.
- Desktop은 Three.js의 절제된 천/목재 비행선 모델, 원근 카메라, 구름 깊이,
  작은 새 무리, 프로펠러와 선회 기울기를 사용한다. W/S 전진·감속,
  A/D 선회 및 방향키 대체, 섬 클릭 곡선 자동 항로, 가까운 섬에서 E/입장 링크.
  섬 사이를 이동해도 자동 입장하지 않는다. 수동 입력은 자동 항로를 취소한다.
  Escape/처음 위치로 복귀 가능. 조작 안내는 첫 동작에 접히고 다시 열 수 있다.
- 섬은 기존 사계절 WebP를 3D 공간에 배치한 2.5D plane이다. 옆면/뒷면을
  갖춘 섬 모델 또는 실제 지형 Collision은 구현하지 않았다. 비행 범위는 제한된다.
  기존 waterfall 좌표를 사용해 물 픽셀만 shader에서 흐르게 한다.
- 1024px 미만/세로 화면은 네 섬 HTML 직접 선택. Reduced Motion, Motion OFF,
  WebGL 생성/컨텍스트/섬 이미지 실패 시에도 직접 Navigation이 작동한다.
  Three.js는 해당 Desktop 경로에서 동적으로 로드한다. 숨긴 탭은 렌더링 정지,
  언마운트는 listener/RAF/texture/material/geometry/renderer를 정리한다.
- 월드 전용 `*-island-flight-v1.webp` 768px 파생본을 생성했다. 네 장 합계
  825,534 bytes이며 원본 2,072,598 bytes는 그대로 보존한다. 생성 스크립트는
  `qa/prepare-flight-images.cjs`. Loading 화면의 이전 대형 배경과 장식 별을
  제거하고 기존 Sky/Cloud 토큰과 직접 접근 링크를 사용한다.
- 비행 준비 전후 지도 nav의 전체 영역을 고정해 레이아웃 이동을 줄였다.
  투영된 이름표의 연속 위치는 transform으로 갱신하고 크기는 resize 때만 계산한다.
  최초 3D 프레임이 준비된 후 비행 지도를 노출한다. 8초 이상 준비가 지연되면
  HTML 직접 선택으로 복구한다. 준비 중에도 Header 직접 이동을 사용할 수 있다.
- 정상 영상 종료 후 Welcome dialog: 3.8초 후 600ms fade 또는 버튼/Enter/Escape.
  숨긴 탭은 대기 시간을 정지한다. 영상 Skip/직접 진입/Reduced Motion은 생략하며
  완료 후 history state를 지워 Reload에서 반복하지 않는다. Real World 영상 순서는 유지했다.
- 공통 Header는 독립된 Cloud 표면과 밑줄 Hover/Focus. 열린 문+준영 SVG 로고,
  같은 심벌의 파비콘, 눈에 띄는 리얼월드 복귀 버튼. 모바일은 메뉴 Dialog.
  Resume는 설정/모바일 메뉴/Contact에서 접근한다. 이전 목적지 미리보기 카드는 숨겼다.
- Voyage는 2초, Route는 350ms에 변경. 시각적 문구/버튼 제거,
  스크린리더 상태 안내와 Escape 즉시 완료는 유지한다.
- About 아침빛과 Skills 한낮은 기존 배경을 보정했다. Contact는 기존 구도를 보존한
  `contact-dusk-v2.webp`로 초저녁 조명을 실제 에셋에 반영했고, 캐릭터 명암도 맞췄다.
  배경은 내장 image_gen으로 제작했으며 원본 PNG는 source/natural-world에 보존한다.
  Projects도 `projects-evening-v2.webp`로 기존 아치/네 전시대/바닥 구도를 보존한
  낮은 저녁빛을 반영했다. 내장 image_gen 제작, PNG 원본 보존.
  전체 프롬프트와 파일 경로는 `docs/natural-world/contact-dusk-v2.json` 및
  `docs/natural-world/projects-evening-v2.json`에 기록했다.
- 새 Font/Color Token, 허위 프로젝트 사실, 추가 세계/펫/게임 진행 규칙 없음.
  사용자가 추천 방향 적용을 승인한 상태이며 비행 물성·카메라·모델 완성도는 Working이다.

### 검증과 남은 범위

- `npm run lint`, `npm run build`, `git diff --check` 통과.
  Three.js를 포함한 지연 로딩 chunk 약 556KB(압축 약 140KB)의 크기 경고는 남아 있다.
- Headless Edge 22개 Viewport: 필수 11개 + 경계 8개 + 1280×600,
  844×390 landscape, 720×405(200% 상당 레이아웃). 수평 넘침 없고
  이름표와 Header bounds를 확인했다. 실제 브라우저 200% Zoom/실기기 Safari는 미확인.
- 네 섬으로의 비행/섬 간 비행/명시적 E 입장, 수동 조작·자동항로 취소,
  Back/Reload, Mobile tap/menu/리얼월드 복귀, Motion OFF/ON, Reduced Motion,
  WebGL 부재/실행 중 컨텍스트 손실/모든 섬 이미지 실패의 fallback 통과.
- 실제 영상의 ended handler를 브라우저에서 발생시켜 Welcome 진입/클릭 종료/
  자동 종료/Skip 생략을 검증했다. 영상 전체를 실제 재생해 마지막 프레임 연결까지
  육안 검토한 검증은 이번에 수행하지 않았다.
- 1440×810과 390×844의 네 내부 페이지 화면 및 Desktop 비행/430×932·360×800
  직접 선택 화면을 캡처했다. 검증 코드: `qa/flight-world-check.cjs`,
  `qa/flight-extended-check.cjs`. 결과/화면: `output/flight-world-qa/`.
  현재 두 보고서의 runtime error는 0건이다.
- 로컬 production preview의 Lighthouse Desktop 최종 측정: Performance 88,
  Accessibility 100, LCP 1.8s, CLS 0, TBT 160ms. 보고서는
  `output/flight-world-qa/lighthouse-desktop.json`. 실제 배포/모바일 네트워크의
  실사용 측정은 아니며 INP는 별도 측정하지 않았다. 최초 검사에서 발견한
  지도 로딩 재배치와 불필요한 Loading 배경 요청을 수정했다.


## 2026-09-30 월드맵 기본 움직임과 Hover 강화

- 사용자 요청에 따라 네 섬의 부유를 복원했다. 기존 NaturalWorld의 정지 규칙보다
  우선하는 SeasonalWorld 범위에서 About 7.4초/±12px, Skills 6.6초/±14px,
  Projects 9.6초/±9px, Contact 8.3초/±10px의 독립 주기와 시작 위상을 사용한다.
  건물의 형태를 변형하거나 전체 배경/카메라를 흔들지 않는다.
- FlowingWater는 기존 에셋의 물 부분을 SVG pattern으로 재사용해 폭포 안에서
  아래로 연속 이동시킨다. 부드러운 마스크, 포말, 수면 흐름, 빨라진 물안개를
  더했다. 단계 폭포를 포함한 8개 물줄기의 좌표를 실제 에셋에 맞췄다.
- SeasonalIslandLife의 기본 동작: About 꽃잎/기록관 조명, Skills 기어 회전/
  바람과 천의 명암, Projects 낙엽/전시 패널 순차 조명, Contact 눈발/
  등대 빛 회전. 바람 날개 자체의 입체 회전은 구현하지 않았다.
- Hover/키보드 Focus/Touch 선택은 해당 섬의 9px 상승, 명암 대비, 밑줄과
  `입장하기 →` 텍스트로 구분한다. 클릭 영역은 부유와 분리해 고정했다.
  기존 Hover 카드 테두리를 제거하고 이름표를 물줄기와 덜 겹치는 위치로 조정했다.
- 모션 소유자는 CSS 하나다. 설정의 Motion OFF, OS Reduced Motion, 숨긴 탭/
  장면 상태를 유지하며, 세로 화면에서는 보이지 않는 섬의 애니메이션을 정지한다.
  기존 섬 이미지, HTML 링크/본문, Direct URL, Real World, 제한 이동은 유지했다.
  페이지별 공간/이동의 WORKING·LOCKED 변경 없음.
- 관련 구현: `SeasonalWorld.css`, `SeasonalIslandLife.jsx`, `FlowingWater.jsx`,
  `WorldAtmosphere.jsx`, `layers.config.js`, `LayeredWorld.jsx`, `IslandRibbon.jsx`.
  확인 자료는 `output/world-motion-qa/`, 회귀 검증은 `qa/world-motion-check.cjs`와
  `qa/seasonal-world-check.cjs`에 보관한다.

- 검증: npm run lint/build, git diff --check 통과. Headless Edge 23개 화면 크기
  (현재 사용자 화면 1058×879 포함), 4개 목적지 이동/Reload/Back,
  Keyboard/Touch, 에셋 실패, 모션 정지/재개와 Reduced Motion을 확인했다.
  다른 움직임을 고정한 상태에서도 8개 폭포 영역의 실제 화면 픽셀이 바뀌는지 검증했다.
  현재 열린 in-app browser 2개 탭에서도 Motion full / 부유 running 상태를 확인했다.
  콘솔 런타임 오류 0. Safari/모바일 실기기, 네이티브 200% Zoom과 Web Vitals는 미확인이다.
  200%에 해당하는 720×405 @2x 레이아웃의 메뉴 접근만 별도 확인했다.

## 2026-09-30 승인한 사계절 섬 월드맵 배치

- 사용자 승인 기준: `output/material-world-v10/02-material-shadow-preview.png`.
  About 1안 거목 기록관(봄), Skills 3안 바람 제작소(여름), Projects 3안 접힌 지붕
  전시관(가을), Contact 등대 항구(겨울)를 실제 월드맵에 배치했다.
- 내장 image_gen으로 섬별 투명 PNG를 분리하고 1254×1254 WebP 4개로
  인코딩했다. 브라우저용 합계 약 2.07MB. 원본/프롬프트는
  `public/assets/source/seasonal-world/`, 사용 에셋은
  `public/assets/production/images/seasonal-world/`에 보관한다.
  기존 natural-world 에셋과 승인 시안은 보존했다.
- LayeredWorld/layers.config에 개별 섬 이미지를 연결하고 SeasonalWorld.css로
  Projects 중심의 크기, 이름표와 전경의 겹침, 세로 화면의 섬 넘김을 조정했다.
  확대 필터 없이 원본 색을 기준으로 분리 과정에서 강해진 채도만 섬별 보정했다.
- 섬 그림과 HTML 이름표를 분리해 Hover/Focus/Touch 선택 시 대상의 대비가
  또렷하고 다른 섬은 조금 어두워지도록 했다. 이름표는 계속 읽히며 각 Route에
  직접 연결된다. 섬별 폭포의 시작 위치를 맞추고 물 흐름/물안개,
  꽃잎·낙엽, 제작 장치의 작은 기어 표시, 등대 빛/항구 물결을 CSS/SVG로 연결했다.
  건물·절벽은 안정적으로 유지한다. 바람 날개 전체의 입체 회전은 구현하지 않았다.
- 기존 Header 미리보기, VoyageTransition, DestinationFrame의 목적지 이미지도
  같은 사계절 에셋으로 연결했다. 이동 구름은 기존 painted-cloud를 사용한다.
  Real World 영상, 프로젝트 사실/본문, 각 페이지 내부 공간과 캐릭터의 제한 이동,
  지도 UI 제거는 유지했다. 페이지 내부 구조/이동의 WORKING·LOCKED 변경 없음.
- 빠른 페이지 전환 검증에서 발견한 Projects ResizeObserver의 null ref 접근을
  방어했다. 개발 서버의 원본 이미지 파일 감시 EBUSY 종료를 방지하도록
  vite.config의 watch에서 source 이미지와 output만 제외했다.
- 검증: npm run lint/build 통과. Headless Edge에서 필수 11개, 경계 8개,
  짧은 화면 1280×600, 초광폭 2560×1080, 현재 사용자 화면 1007×966을 포함한
  22개 Viewport의 넘침/이름표 경계와 세로 화면 4개 목적지 넘김 통과.
  4개 Route 이동·새로고침·뒤로/앞으로, 리얼월드 복귀, Keyboard Enter,
  터치 선택 후 입장, Hover 대비, 실제 물 흐름 변화, Motion OFF/Reduced Motion,
  전체 새 이미지 실패 시 HTML 링크, 전체 이동 연출의 에셋 로딩 통과. 런타임 오류 0건.
- 직접 이미지 확인: 1440×810, 1024×768, 1007×966, 1280×600,
  430×932 About/Skills/Projects. 720×405 @2x의 200% 상당 레이아웃에서
  직접 메뉴 접근을 확인했다. 실제 브라우저 200% Zoom·실기기 Safari·성능 지표는
  이번 검증에서 측정하지 않았다.
- 결과: `output/seasonal-world-qa/verification.json`, `assets.json` 및 화면 PNG.
  코드 QA: `qa/seasonal-world-check.cjs`, 에셋 인코딩:
  `qa/prepare-seasonal-islands.cjs`.


## 2026-09-30 하단 지도 UI 제거

- 사용자 요청으로 전체 페이지의 하단 지도 버튼과 지도 Dialog를 제거했다.
  App 및 WorldHUD의 연결, LayeredWorld의 지도 전용 panel 상태,
  portfolio-theme.css의 지도 전용 규칙을 정리했다.
- 참조 확인 후 ExplorationMap.jsx/CSS 및 WorldAtlas.jsx/CSS를 삭제했다.
  DESIGN_SYSTEM.md 01.2의 이동 수단도 현재 상태와 맞췄다.
- 월드맵 Route, 네 목적지 섬, 캐릭터 이동, 모바일 섬 넘김, Header·리얼월드 복귀,
  기존 콘텐츠·영상·페이지 구조는 유지한다. WORKING/LOCKED 변경 없음.
- 검증: lint/build 통과. Headless Edge에서 World/About/Skills/Projects/Contact를
  1440×810, 1007×966, 430×932로 확인해 지도 UI 제거 15개 조건 통과.
  Desktop/Mobile Header 이동, 모바일 섬 넘김, Browser Back, 리얼월드 복귀 통과.
  런타임 오류 0건. Projects 1007×966 및 430×932 스크린샷을 직접 확인했다.
- 결과: output/map-removal/qa.json. 이번 변경에서 발견한 남은 오류 없음.
  실기기 Safari·200% Zoom·전체 필수/경계 Viewport QA는 수행하지 않았다.

## 2026-09-30 공통 Header 리얼월드 복귀 경로 추가

- PageHeader 왼쪽 로고 옆에 항상 보이는 `← 리얼월드` 링크를 추가했다.
  모바일 메뉴에도 같은 복귀 경로를 제공한다. React Router로 `/`에 즉시 이동하며
  Real World의 대기 화면과 기존 영상 순서를 유지한다. 로고는 계속 월드맵으로 연결된다.
- 변경: PageHeader.jsx/CSS, DESIGN_SYSTEM.md 01.2. 헤더 재디자인 3안은 제안 단계이며
  실제 헤더 디자인·페이지 구조·WORKING/LOCKED 결정을 변경하지 않았다.
- 검증: lint/build 통과. Headless Edge에서 320~2560px 총 18개 화면 조건의
  헤더 요소 겹침·가로 넘침·복귀 링크 44px 높이 확인. 클릭·모바일 메뉴·키보드 Enter
  복귀, Browser Back, 메뉴 Escape 닫힘 통과. 런타임 오류 0건.
- 이미지 확인: 1007×966, 360×800. 결과: output/world-header/qa.json.
  실제 200% Zoom·실기기 Safari 검증은 수행하지 않았다.

## 2026-09-30 사용자 지정 영상 3개 순서 복원 — 현재 기준

- 첫 화면을 start-ambient.mp4 전체 반복 및 start-poster.webp로 복원했다.
  ENTER WORLD → premium-to-portal-preview.mp4 전체 재생 →
  hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4 전체 재생 → World.
- 앞선 포털 첫 구간을 대기 배경으로 공유한 구현은 사용자의 파일 지정과 달라
  교체했다. 아래 연속성 수정 기록은 당시 시도와 검증 기록이다.
- 동일 RealWorld 안에 세 영상 요소를 두고, 다음 디코딩된 프레임 준비 후
  600ms 겹침 전환한다. 포털이 화면을 덮을 때까지 Ambient를 재생한다.
  도착 영상 준비 중에는 포털의 실제 마지막 프레임을 보존한다.
- 영상 원본은 변경하지 않았다. 첫 두 영상의 실제 구도 차이는 존재하며
  재제작 없이 dissolve로 완화한다. 앞서 추출한 real-world-portal-poster.webp는
  파일만 보존하며 현재 화면에서 참조하지 않는다.
- 변경: PortalCinematic.jsx/CSS, RealWorld.css, qa/real-world-continuity.cjs,
  DESIGN_SYSTEM.md 01.4, Personal-Portfolio_PRD_V4_FINAL.md, PROJECT_CONTEXT.md.
  3안 UI·다른 페이지·Route·실제 콘텐츠·WORKING 결정은 유지한다.
- 검증: lint/build 통과. Headless Edge에서 정확한 source/순서, 실제 전체 완주와 월드 도착,
  재방문, 키보드/터치, 느린 첫·둘째 전환, 비디오 오류, Motion/Reduced Motion,
  직접 입장/건너뛰기 관련 검사 25개 통과. 필수 11개 + 경계 8개 + 짧은 화면
  2개의 대기/진입 총 42개 화면 조건 통과, 런타임 오류 0건.
- 결과: output/real-world-video-order/regression-qa.json.
  실제 이미지 확인: 1440×810 대기/전환, 430×932 전환.
  실기기 iOS/Safari·실제 200% Zoom·성능 지표는 이번 검증 범위 밖이다.

## 2026-09-30 Real World 영상 진입 연속성 수정

- 사용자 요청으로 클릭 시 배경 정지/0.88배 축소 → body의 별도 fixed 영상
  레이어로 전환하던 방식을 제거했다. 원본 start-ambient와 포털 첫 장면도
  서로 다른 작업실 구도였음을 프레임을 추출해 확인했다.
- 대기와 진입이 premium-to-portal-preview.mp4의 **동일 video 요소**를
  사용한다. 대기는 잔잔한 0–1.5초 반복, 클릭은 현재 위치부터 계속 재생한다.
  대기 배경도 해당 영상의 작업실 구도로 맞췄다. 소스 영상은 편집하지 않았다.
- 배경 크기·반응형 crop·URL을 유지하고 UI와 scrim만 fade한다.
  새 안내 패널/장식 SVG는 제거하고 기존 여백에 Skip/Projects 텍스트 동작을 배치했다.
- PortalCinematic이 대기·진입·도착 영상 재생을 소유하며 RealWorld는 진입 상태와
  Route를 관리한다. 다음 영상의 디코딩된 첫 프레임을 확인한 뒤 420ms로
  연결한다. 마지막 프레임을 보존해 로딩 중 검은 화면/첫 프레임 재시작을 피한다.
- 첫 영상의 0.001초 프레임에서 1920×1080 WebP poster(341,670 bytes)를
  추출했다. 경로: public/assets/production/images/real-world-portal-poster.webp.
  기존 start-ambient.mp4/start-poster.webp 및 다른 원본 영상은 삭제하지 않았다.
- 변경 파일: RealWorld.jsx/CSS, RealWorldCredits.css, PortalCinematic.jsx/CSS,
  새 poster, qa/real-world-continuity.cjs, DESIGN_SYSTEM.md,
  Personal-Portfolio_PRD_V4_FINAL.md, PROJECT_CONTEXT.md. 다른 페이지·콘텐츠·Route·
  패키지·WORKING 결정에는 영향이 없다.
- 검증: lint/build 통과. Headless Edge에서 같은 DOM/source/currentTime 유지,
  배경 bounds, URL 유지, 첫 방문/재방문, 실제 두 영상 완주와 월드 도착,
  Mobile Touch, Keyboard, 느린 도착 영상, 오류 복구, Motion/Reduced Motion을 확인했다.
  필수 11개 + 경계 8개 + 720×405/844×390의 대기/진입 42개 화면 조건 통과.
  최종 회귀 검사 18개 통과, 런타임 오류 0건.
- 재현: PLAYWRIGHT_MODULE로 사용 가능한 Playwright 경로를 설정한 뒤
  node qa/real-world-continuity.cjs. 결과는 output/real-world-continuity/regression-qa.json.
  전후 프레임과 추가 16개 연속성 검사도 같은 폴더에 저장했다.
- 실제 이미지 확인: Desktop 1440×810, Mobile 430×932의 대기·클릭 직후 및 도착.
  실기기 iOS/Safari, 실제 200% Zoom, LCP/INP/CLS는 이번 검증 범위 밖이다.
  원본 영상의 미술/AI 에셋 품질이나 내용은 이번 연결 수정으로 재제작하지 않았다.
- 아래의 재방문/3안 기록은 당시의 검증 기록이며, 대기 영상 경로와 진입 방식은
  이 항목이 최신 상태다. Commit/Push/배포는 수행하지 않았다.

## 2026-09-30 ENTER WORLD 재방문 영상 재생

- 사용자 요청으로 ENTER WORLD의 재방문 자동 건너뛰기 조건을 제거했다.
  방문 기록이 있어도 누를 때마다 기존 포털 영상을 처음부터 재생한다.
- 버튼 아래 ‘영상 없이 바로 입장’ 텍스트 링크를 항상 제공한다.
  기존 /world-map Route로 즉시 이동하며, 키보드·터치 영역 44px을 확보했다.
- Motion OFF/Reduced Motion에서는 기존 직접 진입을 유지한다.
  포털 재생 순서·영상 에셋·풀스크린 3안 배치 및 다른 페이지 결정은 유지했다.
  RealWorld가 닫힐 때 남은 전환 타이머를 해제한다.
- 변경 파일: RealWorld.jsx, RealWorldCredits.css, DESIGN_SYSTEM.md,
  Personal-Portfolio_PRD_V4_FINAL.md, PROJECT_CONTEXT.md.
- 검증: lint/build 통과. Desktop·Mobile 첫 진입/재방문 실제 영상 재생,
  건너뛰기·Back, 키보드·터치 직접 접근, Reduced Motion을 확인했다.
  필수 11개 + 경계 8개 + 720×405/844×390의 21개 배치 조건에서
  제목·버튼·텍스트 링크의 겹침/잘림/가로 넘침 0건.
- QA 근거: output/real-world-replay/qa.json. 스크린샷은 같은 폴더의
  desktop.png(1440×810), mobile.png(430×932).
  실기기 iOS·실제 200% Zoom·전체 영상 완주 품질은 이번 확인 범위에 포함하지 않았다.

## 2026-09-30 Real World 3안 적용 및 검증

- 사용자가 선택한 풀스크린 시네마틱 크레딧 구성을 적용했다.
  왼쪽 하단 소개·김준영·직무, 오른쪽 하단 원형 화살표·ENTER WORLD,
  상단 JY.·Quick View·설정으로 구성한다. Mobile/Portrait에서는 소개와 CTA를 세로로 배치한다.
- 변경 파일: src/scenes/RealWorld/RealWorld.jsx,
  src/scenes/RealWorld/RealWorldCredits.css, DESIGN_SYSTEM.md, PROJECT_CONTEXT.md.
  새 스타일은 cinematic-credits 범위로 한정했다.
- 기존 RealWorld.css, PortalCinematic.jsx/CSS는 작업 시작 시 파일 해시와 동일하다.
  RealWorld의 기존 상태·이벤트·타이머·영상 재생 로직은 보존했다.
  새 에셋·패키지·Route는 추가하지 않았다.
- 풀스크린 영상과 기존 영상/포스터 경로를 유지하며, 노란 마커·금색 이중 테두리·
  스캔 장식을 제거하고 SUIT 및 기존 Cloud/Stone/Ink 색상으로 정리했다.
- 검증: lint/build 통과. 필수 11개 Viewport와 경계 8개,
  추가 720×405 / 844×390의 첫 방문·재방문 상태 총 42개 조합에서
  가로 넘침, 소개·버튼 겹침, 화면 밖 CTA 0건. 짧은 화면 재방문 배치를 보정했다.
- Headless Edge에서 20개 동작 확인 통과: 영상 재생, Hover/Focus,
  키보드 설정·포커스 복구, Motion/Sound, Quick View·Back,
  포털 진입·건너뛰기·다시 보기, Touch/Reduced Motion 직접 진입,
  배경 영상 실패 시 직접 접근 및 런타임 오류 확인.
- 화면 이미지 검토: 1440×810, 1024×768, 430×932, 360×800, 720×405.
  QA 근거는 output/real-world-credits/responsive-qa.json 및 interaction-qa.json.
- 실제 브라우저 200% Zoom, 실기기 Safari/iOS, 성능 지표 및 포털 전체 영상의
  완주 품질은 이번 UI 작업에서 검증하지 않았다. 720×405는 Zoom 검증으로 기록하지 않는다.
- 승인된 범위는 Real World 디자인 3안이다. 다른 페이지의 WORKING/LOCKED
  결정에는 영향이 없다. Commit/Push/배포는 수행하지 않았다.

## 2026-09-30 자연 판타지 화면 적용 및 검증

이 기록은 아래의 같은 날짜 문서 전용 작업 이후 실제 화면에 적용한 상태다.

- 사용자 요청에 따라 리얼월드 이후 World / About / Skills / Projects / Contact의 공통 색감·레이아웃·폰트·환경 움직임을 적용했다. 최신 Design System의 SUIT + Marcellus 및 Sky / Cloud / Stone / Grass 토큰을 사용한다.
- 왼쪽 로고 / 중앙 Navigation / 오른쪽 Resume·설정 Header, 목적지 Hover/Focus 미리보기, 구름과 섬이 이동하는 공통 전환을 구현했다. Route는 240ms 뒤 변경하며 1초 연출 완료를 콘텐츠 접근의 필수 조건으로 만들지 않았다.
- 네 섬·페이지 배경·구름·About 캐릭터·프로젝트 장식 등 WebP 16개를 실제 제작·적용했다. 원본 PNG와 프롬프트도 보관했다. 정적인 지형 위에 구름·폭포·그림자·새·잎을 독립적으로 재생한다. 일시정지 / Reduced Motion / 비활성 화면에서는 움직임을 줄이거나 멈춘다.
- About은 작업 노트 또는 프로필 살펴보기 선택 후 패널을 연다. Projects는 모바일에서 네 프로젝트 내용을 목록으로 제공한다. World / Skills / Projects의 기존 제한 이동, Route, 실제 프로젝트 데이터, Q&A, Resume를 유지한다.
- Skills 최종 Orbit/Toolkit 및 추가 이동·카메라 디자인은 WORKING이다. 아래 과거의 LOCKED 표기를 이번 시안의 최종 확정으로 해석하지 않는다.
- 검증: lint/build 통과. 필수 11개 Viewport와 8개 경계 조건 × 주요 5개 페이지의 95개 조합에서 가로 넘침/제목 잘림/깨진 표시 이미지 0건. 13개 동작 검증 통과. About 열기/닫기/포커스 복구는 Desktop·Mobile·짧은 화면에서 추가 확인했다.
- 연속 이동 타이머, Skills 닫기 후 포커스, 모바일 제목 위치, Projects 기본 HUD 겹침을 수정했다.
- 남은 한계: 기존 걷기/Contact Sprite의 전체 재도색, 실제 프로젝트 UI 원본 확보, 실제 브라우저 200% Zoom, 실기기 Safari/iOS, LCP/INP/CLS 측정은 완료하지 않았다. 720×405의 동등 CSS viewport 확인을 실제 200% Zoom 검사로 대체 기록하지 않는다.
- 변경 파일 목록·에셋·QA·남은 범위: [구현 기록](docs/natural-world/IMPLEMENTATION.md). 생성 프롬프트: [asset-prompts.json](docs/natural-world/asset-prompts.json). 실행 결과는 output/natural-world/qa-report.json 및 final-interaction-qa.json에 보관했다.
- Real World/Portal의 별도 작업 변경과 선행 문서 변경은 보존했다. 배포·Commit·Push는 수행하지 않았다.

## 2026-09-30 공통 아트 제작 기준 문서 반영

-   사용자 요청으로 DESIGN_SYSTEM.md의 01.1에 공통 아트 제작 기준을
    추가했다. World / About / Skills / Projects / Contact가 적용 대상이다.
-   회화적 색면, 무광 중심 재질, 주요 대상/주변/원경의 디테일 배분,
    캐릭터·배경·오브젝트의 명암/광원/원근 일치를 정의했다.
-   이동 바닥·가림 레이어·콘텐츠 Safe Area를 고려하고 대표 외부 장면 →
    대표 실내 장면 → 캐릭터/오브젝트 합성 검토 → 페이지 확장의 제작 순서를 기록했다.
-   Real World의 실사 작업실 방향과 실제 Portfolio Content는 유지한다.
-   문서 간 우선순위와 페이지별 공간·이동·카메라는 해당 작업 시 결정한다.
    특히 아래 Skills의 Ancient Ruin / Skill Orbit 및 LOCKED 표기는
    자동 적용할 최우선 확정안이 아니며 실제 구현·시안과 함께 검토한다.
-   이번 변경은 문서에만 적용했다. 기준 이미지·새 에셋 제작, 기존 에셋
    교체, 캐릭터 리터칭, Font/Color 코드 적용, 브라우저 QA는 수행하지 않았다.
    기존 구현과 과거 QA 기록을 새 아트 기준의 완료 근거로 사용하지 않는다.
-   검증: 변경 문서 7개의 현재 기준 영역에서 Markdown 링크와 문서 참조
    경로를 확인했다. Design System / PRD 진입점 / Context의 보관 이력은
    변경 전과 내용이 동일하다. `git diff --check`, `npm run lint`,
    `npm run build` 통과. 이번 작업에서 확인한 Browser Viewport는 없다.

## 00. Current Source of Truth

  --------------------------------------------------------------------------
  Document                               Responsibility
  -------------------------------------- -----------------------------------
  `Personal-Portfolio_PRD_V4_FINAL.md`   제품 목적, IA, 콘텐츠, 기능
                                         요구사항, 완료 조건

  `DESIGN_SYSTEM.md`                     Layout, Hierarchy, Typography,
                                         Color, Grid, Responsive,
                                         Components, Motion

  `AGENTS.md`                            AI Coding Agent 공통 규칙

  `CLAUDE.md`                            Claude Code 실행 규칙

  `PROJECT_CONTEXT.md`                   현재 실제 코드/Route/Asset/검증
                                         상태
  --------------------------------------------------------------------------

코드의 실제 상태를 묻는 문제는 Repository를 직접 Audit한다. 이 Context의
과거 기록만 보고 현재 구현을 추측하지 않는다.

## 01. Latest Locked Product / Visual Decisions

-   Portfolio First.
-   Real World → Portal → Tool Universe / Transformation → Portfolio
    World 흐름 유지.
-   Portfolio World top-level destination은 **About / Skills / Projects
    / Contact 4개**.
-   Q&A와 Resume 콘텐츠는 삭제하지 않는다. Q&A는 Contact/호환 Route 등
    최신 IA를 통해 접근 가능하게 유지한다.
-   실제 Project는 4개.
-   Portfolio World Visual Direction은 **Natural Fantasy Adventure ×
    Minimal UI**.
-   Typography는 **Marcellus + SUIT**.
-   World / About / Skills / Projects / Contact는 서로 다른
    Composition/Camera grammar를 사용한다.
-   World = Wide Landscape / Exploration.
-   About = Interior / 3/4 Composition / Object Interaction.
-   Skills = Ancient Ruin / Negative Space / Skill Orbit.
-   Projects = Architectural Gallery / Project Archive / 4 real Project
    Stages.
-   Contact = Quiet Ending / Contact Action 중심.
-   Projects를 World Map처럼 Floating Island 4개로 반복하지 않는다.
-   AI 특유의 Text Shadow, Text Glow, Double Border, 두 줄 장식, 의미
    없는 감성 카피, 과도한 Ornament를 새 디자인에서 사용하지 않는다.
-   Environment AI Asset 안에 실제
    UI/Text/Navigation/Button/Skill/Project Name을 bake-in하지 않는다.
-   Portfolio World에 Pet/Companion/NPC를 임의 추가하지 않는다. Real
    World의 기존 강아지 연출은 Real World 범위에서만 별도 취급한다.

## 02. Current Implementation Evidence From This Context

이 파일의 최신 기록상 다음 구현은 실제 작업/QA 기록이 있다. 단,
Repository가 이후 변경되었을 수 있으므로 수정 전 반드시 실제 코드를
확인한다.

### World

-   4개 destination World 구현 기록이 있다.
-   About / Skills / Projects / Contact 구조와 Q&A의 Contact 통합 기록이
    있다.
-   bounded foreground movement, island interaction, independent
    environment layers, responsive portrait behavior 기록이 있다.
-   여러 차례 HUD/Compass/Atlas 실험이 존재하므로 **현재 렌더링 중인
    HUD가 무엇인지는 코드 Audit 필수**.

### Skills

-   8개 factual tool 데이터, bounded character exploration, orbit
    interaction, proximity E/Enter, direct click/keyboard, mobile bottom
    sheet 구현 기록이 있다.
-   최근 구현은 crystal/orbit/Nexus 계열 여러 Working iteration이
    누적되어 있다.
-   최신 Design System에 따라 과도한 crystal/glow/frame/logo treatment는
    재검토 대상이다.
-   Skill Orbit이라는 interaction concept는 유지하되 Visual treatment는
    v3 Design System이 우선한다.

### Projects

-   `/projects` gallery, 4개 project, bounded movement, direct
    case-study access 구현/QA 기록이 있다.
-   Gallery 구조 자체는 최신 방향과 호환된다.
-   conceptual fantasy sculpture가 실제 Project UI를 대신하고 있다면
    최신 기준에 따라 실제 Project identity/thumbnail/content 우선으로
    재검토한다.

### About

-   standalone About scene, 3/4/interior 계열 reference implementation과
    responsive QA 기록이 있다.
-   과거 cyan/gold double frame, decorative edge, archive panel 등
    Working treatment는 최신 AI Visual Cleanup 규칙과 충돌할 수 있으므로
    그대로 복원하지 않는다.

### Contact

-   Contact는 여러 상반된 Working iteration이 누적되어 있다: static
    reference, centered content, ornate panels, auto journey, email
    dialog, character jump 등.
-   현재 최종 Contact UI/scene은 코드 Audit으로 확인한다.
-   최신 제품 방향은 Contact Action이 Primary이며 Character/Scenery는
    Secondary다.

## 03. Known Documentation Conflicts --- Resolve by Current Sources

다음 과거 기록은 현재 기준이 아니다.

-   Instrument Serif / Gowun Batang / Pretendard / Fredoka 중심
    typography → **Marcellus + SUIT로 superseded**.
-   5-island World / Q&A island → **4-island World로 superseded**.
-   모든 페이지의 ornate navy/gold/cyan HUD → 최신 Minimal UI 원칙과
    충돌.
-   Double SVG frame / decorative corner rails / text glow/shadow → 최신
    Visual Cleanup과 충돌.
-   Projects floating-island presentation → 금지. Gallery/Archive 유지.
-   Skills Game Item / Power Up / XP/Level 계열 → 사용하지 않는다.
-   Portfolio World Companion/Pet → 사용하지 않는다.
-   과거 문서의 "movement entirely undecided"와 최신 bounded movement
    구현 기록이 충돌할 경우, 실제 코드와 최신 PRD/Design System을
    확인한다. Movement는 콘텐츠 접근을 막지 않는 bounded interaction으로
    취급한다.

과거 QA 성공 기록은 해당 시점 구현에 대한 기록일 뿐 현재 코드가
통과한다는 의미가 아니다.

## 04. Responsive Baseline --- Current

Breakpoints: - Wide ≥1920 - Desktop 1280--1919 - Compact Desktop
1024--1279 - Tablet 768--1023 - Mobile \<768

Primary: - Desktop 1440×810 - Mobile 430×932

Required QA: 2560×1440 / 1920×1080 / 1440×810 / 1366×768 / 1180×820 /
1024×768 / 768×1024 / 430×932 / 402×874 / 390×844 / 360×800.

Boundary: 767/768 / 1023/1024 / 1279/1280 / 1919/1920.

Current rule: - Desktop 단순 축소 금지. - Content Parity + Interaction
Parity 우선. - Viewport별 focal point/crop 검증. - Mobile에서 WASD를
강제하지 않고 Tap/Direct Selection/Bottom Sheet 등으로 변환. - Safe
Area, `dvh/svh`, landscape/orientation, 200% Zoom 검증. - 핵심
Navigation/Project/Contact는 모든 breakpoint에서 직접 접근 가능.

## 05. Current Font Migration Requirement

과거 Context에는 Instrument Serif, Gowun Batang, Pretendard, Fredoka
등의 실제 적용 기록이 다수 존재한다. 이는 역사적 구현 상태로 보존한다.

새 기준: - Marcellus = Fantasy Display only. - SUIT = Korean + English
Hero Copy + Navigation + UI + Body + Project/Skill information. - 기존
font asset은 **사용 여부 Audit 전 삭제하지 않는다**. - 코드 변경 시
computed font / fallback / glyph coverage / loading을 실제 Browser에서
검증한다. - 임의로 font 파일을 삭제하거나 다운로드하지 않는다.

## 06. Asset / AI Requirement

-   기존 source/production asset과 provenance는 삭제하지 않는다.
-   사용하지 않는 것으로 보이는 asset도 import/reference Audit 전
    삭제하지 않는다.
-   AI Environment는 text-free가 기본.
-   Interactive object는 가능하면 background와 분리한다.
-   Layout/Safe Area/Focal Point가 Asset보다 우선한다.
-   Negative Space를 의도적으로 유지한다.
-   AI 결과를 그대로 완성 UI로 취급하지 않는다.

## 07. Before Next Implementation

반드시 실제 Repository에서 확인: 1. `git status` 2.
`git branch --show-current` 3. `package.json` 4. `src/app/router.jsx` 5.
`src/App.jsx` 6. `src/index.css` 7. World/About/Skills/Projects/Contact
실제 component/CSS 8. 현재 font-face / CSS variables 9. 실제 asset
imports 10. 현재 Browser 결과

그 후 최신 PRD + DESIGN_SYSTEM v3와 차이를 Audit하고 **필요한 범위만
수정**한다.

## 08. Verification Rule

과거 lint/build/browser 결과를 현재 결과로 재사용하지 않는다.

변경 후 가능한 범위에서: - `npm run lint` - `npm run build` - Direct URL
/ Refresh / Back - Keyboard / Touch-equivalent - Reduced Motion -
Responsive matrix - Short viewport - 200% Zoom - Image/Video/WebGL
failure path

실행하지 않은 검증은 통과했다고 기록하지 않는다.

------------------------------------------------------------------------

# ARCHIVED IMPLEMENTATION HISTORY

> 아래는 사용자가 제공한 기존 PROJECT_CONTEXT의 전체 기록이다. 삭제하지
> 않고 보존한다. 최신 Source of Truth와 충돌하는 디자인/폰트/IA 지시는
> historical implementation record로만 사용한다.

## 2026-09-29 --- Small tree lookout foreground

Replaced the large stair/wall foreground with a smaller ivory/gold
gothic terrace and a partly visible mature tree on the far left. Kept
existing back-facing character assets, reduced character size to 8.5%
landscape / 17% portrait, and updated the constrained floor band. Mobile
tree upper edge fades; movement guide moved to the right to avoid
covering the character. Islands, labels and navigation retained.

Asset generated using built-in image_gen:
public/assets/production/images/world-layers/lookout-tree-v14.webp;
original public/assets/source/world-layers/lookout-tree-v14.png. Prompt:
transparent square foreground cutout, small ivory limestone lookout
terrace in bottom 30%, walkable floor x25-55 y80-91, low gothic
gold-trimmed balustrade and sapphire details, massive tree partly
cropped on far left with foliage only top-left, central vista
transparent, one bronze lantern, lavender edges, warm upper-left
daylight, no character/dog/background/text.

Updated LayeredWorld.jsx, IslandOrbit.css, lookoutWalkArea.js.
Lint/build passed. Edge 1440x810 and 430x932 screenshots reviewed; back
pose and no horizontal overflow verified. Mobile overlay adjustment
followed review. Movement remains confined to foreground; no new scene
decision locked. Physical devices/other browsers not checked.

## 2026-09-29 --- Landmark interactions and varied waterfalls

Hover, keyboard focus and touch selection now reveal distinct landmark
effects: About warm library windows, Skills rotating cyan energy ring,
Projects portal pulse and spire shaft, Contact stronger beacon with
sweeping beam. CSS owns these effects and pauses them with scene
pause/reduced motion. Existing links/navigation remain unchanged.

Edited the four v12 raster plates with built-in image_gen preserving
architecture/trees: About one left fall; Skills three fine right
trickles; Projects broad right curtain plus tiny left trickle; Contact
one thin right fall. Originals:
public/assets/source/world-layers/*-water-v13.png. Optimized alpha WebP:
public/assets/production/images/world-layers/*-water-v13.webp. Water
shader canvas extends to 150% island height; UV and render buffer
adjusted to avoid stretching the source art. Each fall has its own
source rectangle and length, with mist following its endpoint.

Generation prompt: Edit this exact floating island cutout. Preserve
architecture, tree colors, landmark, camera, lighting, object scale and
position exactly. Preserve square canvas and transparent surroundings.
Change ONLY the waterfalls and cliff immediately behind removed water.
About: remove right waterfall, replace with matching rock/vines/shrubs;
keep one slender left stream x28 y49. Skills: remove both old falls; add
three narrow silver-blue trickles at x65/69/73 y57 on right, differing
lengths. Projects: replace left fall with rock and gardens, broaden
right x65 y55 into powerful curtain plus small secondary x38 y55.
Contact: remove left fall; keep graceful thin right x62 y58. Streams
finish near island bottom; no extra islands, labels or text; preserve
roof/landmark silhouette.

Validation: lint/build passed. Edge desktop 1440x810 hover checked on
all four islands; opacity and per-landmark animations verified. Reduced
motion disables animation. At 430x932 no horizontal overflow. Desktop
screenshot visually reviewed. Actual devices and other browsers
unverified. No Working/Locked scene decisions changed.

## 2026-09-29 --- Central Projects and distinct satellite islands

User-approved direction implemented: Projects is the largest
ivory/royal-blue citadel; About is a warm domed library with autumn
trees, Skills an indigo crystal observatory with silver/lavender trees,
Contact a pink garden beacon. Satellite widths are 23--25% vs Projects
42% in landscape. Static elliptical composition plus existing floating
motion, no continuous revolution. Portrait keeps accessible swipe
destinations. New transparent image assets use \*-orbit-v12.webp in
public/assets/production/images/world-layers, originals in
public/assets/source/world-layers. Built-in image_gen used; complete
prompts in docs/layered-world/orbit-v12-prompts.json. Old assets
retained.

Updated layers.config.js, LayeredWorld.jsx, IslandOrbit.css. Water
sources and light pools aligned; old detail traces and dangling bridges
hidden. Labels, routes, selection, navigation and movement logic
retained. No Working scene promoted to Locked.

Validation: lint/build passed; Headless Edge
1440x810,1128x963,2560x1440,430x932: four asset loads passed, no
horizontal overflow. Desktop/compact screenshots visually reviewed.
Keyboard Enter routes passed for all four islands. Other browsers,
physical devices and 200% zoom unverified.

## 2026-09-29 --- Ornate island labels

Restored four island names with a generated antique-gold / deep-teal
frame and live HTML text. Hover descriptions remain removed. See
docs/layered-world/ornate-island-labels.md for assets, prompt and QA.

## 2026-09-29 --- Sitewide font consistency follow-up

Following the user's Contact correction and request to align all pages,
Korean body/UI now also uses Gowun Batang, matching Korean headings.
English remains Instrument Serif; Pretendard Variable is fallback only.
Both shared tokens resolve to the same stack in src/index.css. This
supersedes the previous body/UI Pretendard rule. Layout, content,
interactions and Working/Locked scene decisions are unchanged.

Validation: lint/build passed. qa/global-font-audit.cjs checked 15 route
states (including four case studies and Contact Q&A) at 1440x810,
1128x963, 430x963 and 360x963: no horizontal overflow, wrong Korean
computed font stack or page errors. Desktop platform-font samples show
no system-font fallback. About and project-detail screenshots visually
reviewed. Actual mobile hardware, Safari and 200% zoom remain
unverified. Report: docs/layered-world/global-font-report.json.

## 2026-09-29 --- Approved Korean typography update

User approved Instrument Serif for Latin, Gowun Batang for Korean
headings/emotional copy, and Pretendard Variable for Korean body/UI.
Shared --font-primary and --font-heading tokens now implement this
across routes. Contact lead uses the heading family; controls and
descriptions retain the body family. This supersedes prior typography
instructions where conflicting. Existing content, routing, layout and
movement decisions are unchanged.

The previous static Pretendard Bold file caused the Skills heading
character '넘' to fall back to Malgun Gothic. Browser platform-font
inspection now confirms Gowun Batang Bold for all Korean glyphs in that
heading, Gowun Batang Regular for Contact lead, and Pretendard Variable
for Contact description. Gowun Batang 400/700 is self-hosted as official
Google Fonts WOFF2 unicode-range subsets (190 files, 3.07 MB total; only
needed subsets load); original TTFs and OFL license are retained.

Validation: npm run lint and npm run build passed. Headless Edge checked
10 routes at 1440x810, 430x932 and 360x932: no horizontal overflow or
page errors. Screenshots inspected for Skills and Contact desktop.
Physical devices, Safari and 200% zoom not checked. Files:
src/index.css, src/gowun-batang.css, heading overrides in
Contact/Skills/Projects/RealWorld/PortfolioWorld styles, font assets,
qa/typography-check.cjs. No Working scene decision promoted to Locked.

## 2026-09-29 Shared Contact-style navigation

User requested every page except World use the Contact header. Added
components/PageHeader.jsx and PageHeader.css; App renders it once on
non-World routes. Removed duplicate Contact/Skills navigation, replaced
Projects GalleryNav with its retained secondary exhibit/settings menu,
and kept RealWorld utilities below the new shared header. Contact
layout, JY/PORTFOLIO, five links, gold active marker and Back to Map are
shared; readable content pages use dark ink. Projects detail inherits
Projects active state. World HUD unchanged. Global sound/motion/menu
controls on reading routes remain separate utilities. Lint/build passed;
nine routes at 1440, 430 and 360 widths verified for one shared header
(none on World), no duplicate scene header and no horizontal overflow;
Projects child active state and Back to Map navigation verified. Desktop
Projects and mobile Contact screenshots saved under
docs/layered-world/shared-header-\*.png.

## 2026-09-29 Transparent page headers

User requested removing white top bars to match Contact. App now omits
the shared header on scenes with their own navigation, including the
lazy-loaded World route, preventing the pre-load header flash. Other
routes keep accessible shared navigation as a transparent absolute
overlay. Destination arrival art extends behind it; reading pages
reserve content padding to avoid overlap. App.jsx/index.css changed;
routes and content preserved. Lint/build passed; eight routes at 1440
and 430 widths checked for transparent/absent shared header, heading
clearance and horizontal overflow.

## 2026-09-29 Skills logo and orbit consistency

User requested matching logos and consistent objects/spacing. Replaced
abstract tool symbols with local SVG logos; GSAP/Higgsfield from
official site header marks, React/JS/Git/Three/OpenAI from Simple Icons
v13, existing multicolor Figma retained. Sources:
public/assets/production/icons/skills/SOURCES.md. One shared orbit phase
now keeps slots evenly spaced by physical ellipse arc length; hover
pauses the common orbit to keep targets stable. Uniform crystal
geometry, logo safe areas, reduced core size and wider six-slot mobile
orbit. Existing selection/movement/data remain. Lint/build and 11-size
chamber regression passed; all logo images decoded and fit their crystal
bounds at 1440, 430 and 360 widths. This supersedes the previous
differing-speed orbit implementation.

## 2026-09-29 Skills Power Core implementation

Latest explicit user brief authorizes bounded character exploration and
slow orbit on /skills. Skills is now a standalone 2.5D chamber using
separate environment, transparent core, orbiting interactive crystal
buttons and the existing master character. Existing Projects walk hook
accepts an optional initialPosition; its default behavior is preserved.
WASD/arrows, floor click, near E/Enter, direct orb click, keyboard
buttons and a direct skill selector remain available. Selection eases
the chosen crystal to a front focus position, slows other orbits, opens
a dismissible right panel (mobile bottom sheet), and triggers a brief
skill-specific CSS effect. Escape returns focus to the selected orb.
Reduced motion/paused/hidden state stops ambient motion. No score,
animal, completion gate or independent Q&A nav added.

Eight tools: Figma, React, Three.js (explicitly exploration; no verified
implementation claim), GSAP, JavaScript, Git/GitHub, ChatGPT and
Higgsfield. Actual existing project data reused; no speculative
Claude/VS Code project associations. Prior global Instrument Serif
typography retained with Korean fallback. Scene is layered raster +
HTML/SVG/CSS/JS, not a full 3D model; background
architecture/waterfalls/banners are raster art, while crystal motion,
mist, character and UI are independent.

Lint/build passed. qa/skills-chamber-check.cjs verifies 11 specified
sizes, orbit, pointer focus/close, WASD, proximity E, reduced motion,
mobile panel and image failure. Additional eight breakpoint widths
767/768, 1023/1024, 1279/1280, 1919/1920, short 720×405 viewport and
unchanged Projects movement passed. Desktop/mobile screenshots inspected
under docs/layered-world/skills-\*.png. Physical devices, Safari and
true browser 200% zoom remain unverified. Asset prompts and provenance:
docs/layered-world/skills-power-core.md. This scopes movement to Skills;
other WORKING decisions remain unchanged.

## 2026-09-29 Contact illuminated reference panels

User requested reference-matched fantasy frames, a light traveling
around cards at rest, hover effects, and central placement. Contact copy
now centers horizontally/vertically in the scene; short and portrait
layouts reserve space for the existing front-facing character. Replaced
rectangular card borders with decorative double SVG outlines and warm
translucent fill. CSS stroke-dashoffset owns the seven-second perimeter
light; staggered cards, hover/focus lift and lighting, static
reduced-motion equivalent. Existing content, background asset, links and
Q&A retained. No global decision changes. Lint/build passed. Edge
checks: centered positions/no horizontal overflow at 1440×810, 1214×963,
430×932, 360×800; character separation additionally verified at 1366×768
and 1024×768 after short-layout refinement. Verified moving dash, hover
lift, visible focus, Q&A open/Escape and reduced-motion animation
disabled. Inspected desktop/mobile screenshots contact-ornate-1214.png
and contact-ornate-430.png. Physical devices/Safari/200% zoom not
checked.

## 2026-09-29 Shared Contact typography

User explicitly requested the selected Contact navigation typeface
across every page. Global --font-primary now uses the existing
Instrument Serif asset, followed by Pretendard for Korean. Body,
page/scene-specific families and --display reference this shared token;
font sizes, content, routing and interaction remain unchanged. This
supersedes earlier sans-first Latin typography. Updated index.css and
existing font declarations in Contact, Projects, DestinationFrame,
RealWorld/PortalCinematic and PortfolioWorld styles. Lint/build passed.
Headless Edge verified font loading, computed main font family and no
horizontal overflow on ten routes at 1440×810 and 430×932. Physical
devices, Safari and 200% zoom not checked in this revision.

## 2026-09-29 Contact open terrace revision

User requested a smaller left foreground, existing front-facing
character, and fantasy-styled centered content. Contact.jsx/Contact.css
now use contact-background-v5.webp (1672×941), a centered static
front-idle.webp avatar aligned to the terrace, serif title, gold
ornaments and slimmer double-border action plaques. Existing routes,
profile data, four actions and Q&A dialogue remain; no walking or
broader LOCKED decision added. Built-in imagegen edited v4: remove
oversized left wall/sign/blurred plants, reduce terrace to bottom 18%,
open central violet sky and golden cloud ocean, keep distant right
lighthouse and winding gold light, no people/animals/UI/text. Source:
public/assets/source/contact/contact-background-v5.png; production:
public/assets/production/images/contact/contact-background-v5.webp.

Lint/build passed. Headless Edge checked centered content, no horizontal
overflow, avatar/content separation and front sprite at 2560×1440,
1920×1080, 1440×810, 1366×768, 1180×820, 1024×768, 768×1024, 430×932,
402×874, 390×844, 360×800. Q&A open/Escape passed. Screenshots inspected
at 1440×810 and 430×932: docs/layered-world/contact-refined-1440.png and
contact-refined-430.png. Portrait intentionally crops scenery sides.
Physical devices, Safari, 200% zoom and breakpoint-boundary checks not
performed in this revision. Email still awaits a real address.

# Personal Portfolio --- PROJECT_CONTEXT FINAL

## 2026-09-29 Centered Contact lookout

Latest request uses the new sunset/beacon reference, a still existing
character looking outward, and centered content. Contact.jsx/Contact.css
now center title/copy/actions and place the existing
project-gallery/character/back-idle.webp on the stone foreground, with
ResizeObserver alignment against the responsive background image. No dog
or walking. Contact actions/FAQ content retained. Built-in imagegen
produced contact-background-v4.webp from the supplied reference:
preserve sunset, floating islands, lighthouse and winding gold path;
remove all UI/text/credits plus boy/dog, reserve clear upper-center sky
and foreground path for separately rendered content/character. Source
public/assets/source/contact/contact-background-v4.png; production
public/assets/production/images/contact/contact-background-v4.webp. Six
viewport alignment/overflow tests, stationary-avatar check and
Q&A/Escape passed; 1440×810 and 430×932 inspected. This is a generated
approximation, not pixel-identical. Physical devices/Safari unverified.

## 2026-09-29 Contact background only

User asks to change only the environment first and use the existing
project character separately, without a dog. Replaced the
baked-character/pet image with clean contact-background-v3.webp; no
character layer added in this background-only pass. UI/actions/static
behavior unchanged. Existing back-idle character asset verified and
preserved. Built-in imagegen edited the supplied second reference:
remove only boy/backpack and white animal, reconstruct
walkway/rail/plants/clouds, preserve
sunset/lighthouse/islands/airship/sign/lantern/framing; no new
people/pets/UI. Source:
public/assets/source/contact/contact-background-v3.png. Production:
public/assets/production/images/contact/contact-background-v3.webp.
Lint/build passed and browser decoded the new background at 1440×810.
Generated plate visually inspected.

## 2026-09-29 Contact static reference revision

Latest user instruction supersedes the auto-walk and no-card directions:
match the supplied sunset composition, show four icon plaques, and do
not walk. Contact.jsx/Contact.css now use a static reference-edited
background with real HTML navigation, title, four SVG-icon actions and
existing Q&A modal. Auto-walk, layered character, moving environment and
delayed credits removed from this page; world/project movement
unchanged. Email still awaits an actual address. Asset was edited using
built-in imagegen, not pixel-identical to the source. Production:
public/assets/production/images/contact/contact-reference-v2.webp;
source: public/assets/source/contact/contact-reference-v2.png. Prompt:
preserve the exact supplied
scene/composition/characters/pet/lighthouse/path; remove UI
logo/navigation/headings/Korean text/four cards/handwriting/footer
overlays and reconstruct sky; preserve the physical wooden sign. No new
UI baked into the image. Lint/build passed; static-character absence,
four icons, nine viewport widths, six FAQs, Escape and Resume navigation
verified. Desktop screenshot inspected. Physical devices/Safari
unverified.

## 2026-09-29 Contact Final Chapter

Latest explicit Contact brief authorizes an optional automatic 2.5D
journey toward a sunset beacon, with Contact actions primary and a small
delayed epilogue. Standalone Contact route replaces its old
DestinationFrame wrapper; existing FAQ content is now a hash-addressable
native dialogue. New generated environment asset plus separate
sprite/cloud/airship/light layers; existing WorldCharacter, shared
Motion and real profile data reused. Email remains unavailable until the
user provides an address; Resume links to the existing factual summary.
No other movement/page direction is locked. Lint/build and 19-size
Contact regression checks passed; desktop/mobile visuals inspected.
Files, prompt, asset provenance, exact QA and limitations:
docs/layered-world/contact-final-chapter.md.

## 2026-09-29 Readable functional World HUD

Latest explicit request restores the functional compass: direction
needle plus camera/portrait-rail reset on click or keyboard, with
visible Korean caption. Navigation keeps its existing sizing but adopts
the Projects gallery navy/gold capsule and ivory text. Settings uses a
new slider icon with text, matching dark panel and Korean control
labels. Portrait panel sits below navigation. Changed WorldHUD.jsx,
LayeredWorld.jsx, HudDetails.jsx and WorldRefinement.css; artwork,
routes, stair controller and content unchanged. This supersedes the
decorative-only compass direction, without locking broader movement
decisions. Lint/build and 21-viewport suite passed; compass
bearing/cancel/reset/Space, settings Motion/Escape and mobile reset
verified. Inspected 1440×810 and 430×932. Physical devices/Safari
unverified.

## 2026-09-29 Clear island hover and selection

Explicit request increases hover clarity: gold silhouette light,
stronger ivory/gold nameplate and reduced saturation/brightness of other
islands, with ambient motion preserved. Committed entry uses a navy
plaque and checkmarked Korean selected/entering text; touch preview says
tap again. Changed LayeredWorld.jsx and WorldRefinement.css, retained
routes/art/stair controls and motion timing. No locked decision changed.
Lint/build passed; 21-size four-world suite and explicit
selected-text/Escape check passed. 1440×810 selected screenshot
inspected. QA now moves the pointer away and waits for viewport style
transitions before measuring bounds. Physical devices/Safari unverified.

## 2026-09-29 Real World hero text legibility fix (Option 3)

-   User reported the left-side hero text was hard to read against the
    workspace photo. Root cause: a later-in-source CSS block (added
    externally, "Latest reference: fullscreen workspace...") had
    weakened `.room-shade`'s left gradient to \~50% opacity at its
    darkest, which isn't enough against the bright window/city-lights
    and desk-lamp areas of the photo behind near-white text.
-   Presented 3 options and got explicit approval for Option 3 before
    touching anything: moderate the gradient back up (now \~75% at the
    edge, fading to transparent by \~58%, was \~50%→65%) **and** add a
    subtle `text-shadow` to the eyebrow/h1/description as a second,
    independent legibility safety net (so contrast doesn't rely on the
    gradient alone in any one spot of the photo).
-   Scope: only the desktop `.room-shade`/text-shadow rules in the
    `RealWorld.css` override block (`.start-scene .room-shade`,
    `.eyebrow`, `.start-copy h1`, `.start-description`). Mobile's
    `room-shade` override (already a stronger \~92% gradient) and
    everything else were not touched.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment) --- please confirm it's
    actually readable now.

## 2026-09-29 Latest ASTRA World refinement brief

The newly supplied brief supersedes the functional compass request:
compass is subtle decorative HUD again. Four islands and existing
artwork/routes/content remain. About shifts inward/down; Contact grows
about 12%; avatar grows 10% while retaining the image-space stair
boundary. Initial head/shoulder attention faces About, then hover/manual
input takes ownership. Labels now use ivory rectangular plaques, gold
inset/corner detail and number medallions; subtitle, supporting line and
Explore reveal on hover/focus/touch selection. Open top navigation
replaces the glass capsule. Background contrast/saturation/clarity
reduced. Numbered waypoints guide without restoring the deleted
character dotted path. Revisited destinations enter immediately; first
visits retain character alignment then camera travel. Movement remains a
prototype, not a new locked architecture.

Changed layers.config.js, LayeredWorld.jsx, WorldHUD.jsx, WorldCharacter
inputs, WorldControls.jsx and WorldRefinement.css. Existing
water/environment/fallback/content structure retained. Lint/build
passed. Stair boundary checks passed 24 contacts over six sizes. Browser
validation and limits recorded in
docs/layered-world/astra-refinement.md.

## 2026-09-29 Functional compass

Latest user request makes the existing compass interactive. Its needle
follows the character/look bearing; click, Enter or Space uses the
existing World reset to cancel pending travel, restore the default
camera and return the portrait rail to the first island. Gold/ivory
design, bounded stairs, routes and content retained; no new movement
decision locked. Changed WorldHUD.jsx, LayeredWorld.jsx and
WorldRefinement.css. Lint/build passed; Edge checks at 1440×810 and
430×932 passed direction updates, travel cancellation without delayed
navigation, keyboard activation, reduced-motion mobile reset and
touch-target bounds. Physical devices/Safari unverified.

## 2026-09-29 Character confined to foreground stairs

-   Explicit user request limits the existing character controller to
    the lower-left stairs. Foot coordinates now follow a sloped band in
    lookout-image space; ResizeObserver remaps the same position when
    the responsive foreground changes. No movement into the sky or
    continued walk animation against a boundary.

-   Changed LayeredWorld.jsx, useWorldWalk.js and new
    lookoutWalkArea.js; existing keyboard controls, art, routes and
    content retained. This refines the requested prototype behavior
    without locking the broader Portfolio World movement design.

-   Lint/build passed. Automated checks covered 24 boundary contacts
    across 1440×810, 2560×1440, 1024×768, 430×932, 360×800 and
    2560×1080; resize, normal/reduced movement, System lock and direct
    navigation passed. Desktop 1440×810 and mobile 430×932 visually
    inspected. Physical devices/Safari remain unverified. Evidence:
    docs/layered-world/stair-boundary-report.json and
    qa/stair-boundary-check.cjs. \## 2026-09-29 Decorative compass / no
    Quick View / stable movement

-   Latest request restores a small non-interactive gold/ivory/navy
    compass at bottom-right, removes World Quick View and the character
    dotted guide path. Top navigation, island recommendation diamonds,
    routes and four-island art retained. No map/dropdown on compass.
    Existing /quick-view content route remains compatible elsewhere.

-   Movement flicker came from compounding direction/idle opacity fades
    and hiding idle before a walk image was ready. WorldCharacter now
    waits for atlas decode, keeps still fallback on delay/error, and
    uses one isolated additive pose cross-fade. Ready idle/walk
    switching is opaque; a dedicated four-cell animation cannot sample
    an empty fifth frame. No new assets/dependencies or movement rules.

-   Lint/build passed. Four-direction transition coverage, atlas loop
    boundaries, delayed/failed loads, reduced motion and six compass
    viewport bounds passed. 1440×810/430×932 inspected. Physical
    devices/Safari unverified. Details:
    docs/layered-world/compass-character-fix.md.

## 2026-09-29 Four-destination World refinement completed

-   Latest user brief implemented: About/Skills/Projects/Contact; Q&A
    component reused inside Contact with original six FAQ answers.
    Legacy /qa redirects to /contact#qa with focus/reload support.
    Removed Q&A destination entries from World/global/gallery/Quick View
    navigation; assets preserved.
-   Top nav and island entry share selected → 450ms pose blend → camera
    travel (\~1.55s) → route logic. Compass/map removed, Quick View
    restored. Separate weak recommendation, hover/focus, touch preview
    and committed selection. Selected target wins over hover; latest
    click cancels previous timeline/timer. Escape/Cancel/direct links
    preserve recovery. System locks movement.
-   Existing golden art, four-way character assets, independent
    island/water/cloud motion and route/content architecture retained.
    New WorldCharacter uses cancellable 240ms hover dwell, subtle
    upper-segment look and fixed-facing sprite cross-fades instead of
    abrupt src/scaleX switches. This is 2.5D blending, not a rigged
    character. Background is softened with blue atmospheric depth;
    inactive ambient runs at 60%, not stopped.
-   Desktop four-island reframe; portrait large-island native swipe/snap
    with paging buttons and next peek. Short guide and compact numbered
    ivory labels. No new dependencies, companion, progression gate or
    interior design changes.
-   Lint/build passed (69 modules); four-world-check passed 21
    viewport/boundary/short/ultrawide checks, all four portrait label
    hit-tests, state/priority/movement/modal lock, latest-target/cancel
    recovery, keyboard/Back/Forward, QA redirect/reload, touch and 200%
    zoom direct navigation. Native touch swipe and animated mobile
    reframe passed; water pause/resume/reduced and image/WebGL fallback
    passed. Visuals inspected at 2560×1440, 1440×810, 430×932. Physical
    devices/Safari/Core Web Vitals unverified. Full audit, file list and
    limits: docs/layered-world/four-world-refinement.md.

## 2026-09-29 Golden cloud-sea reference exterior

-   User requested all five island exteriors and background match newly
    supplied fantasy references. Added independent golden-v11 assets:
    cottage/garden, crystal workshop, blue-and-gold central castle,
    celestial castle observatory, lighthouse, sunset cloud-sea
    background and stone/lantern foreground. Built-in image generation;
    original PNGs and alpha-preserving WebP copies saved. Older assets
    retained.
-   Updated LayeredWorld, layers.config and IslandLife to consume the
    assets and align waterfall/light overlays. Previous distant basin
    overlay is no longer rendered because its content/coordinates do not
    fit this sky. Existing HUD, routes, portfolio facts, character
    controller and independent floating/water/cloud behavior retained.
    This request changes exterior direction only; no companion, new
    gameplay or interior decision is locked.
-   Lint/build passed. 19 required/boundary viewport bounds checks,
    direct route/back, reduced-motion and 200% zoom navigation passed.
    1440×810 and 430×932 visually inspected. Water animation,
    pause/resume, reduced-motion stillness and WebGL-disabled direct
    navigation passed. See docs/layered-world/golden-world-v11.md for
    asset provenance, prompt brief and limitations. Physical
    devices/Safari/Core Web Vitals unverified.

## 2026-09-28 Real World reference UI

-   Latest explicit reference replaces root-route global navigation with
    a local JUNYOUNG wordmark and Quick View/settings corner controls.
    Fullscreen workspace, left Korean headline with cyan phrase,
    illuminated capsule ENTER WORLD, and fine lower-corner captions
    match the supplied layout direction. Existing ambient video/poster
    and portal journey retained; background motion means this is not a
    pixel-identical still reproduction. Cyan CTA is explicitly requested
    by this latest reference.
-   Changed App.jsx, RealWorld.jsx/.css. Existing shared Motion/Sound
    state reused; settings support Escape/focus and OS reduced motion.
    No other route's header removed. Lint/build passed; desktop
    1672×941/mobile 360×800 visually inspected; CTA bounds checked at
    1440×810, 1024×768, 390×844 and 360×800. Settings and reduced-motion
    World entry passed. Physical devices/Safari remain unverified.

## 2026-09-28 First-entry and persistent control guide

-   WorldControls.jsx/.css replaces the disappearing guide with a
    compact ivory/blue-glass intro at bottom center (300ms entry, fade
    at 2.7s, removed at 3s), followed by a persistent bottom-left
    focusable control HUD. Existing sessionStorage world-guide-seen
    state is reused; returning to World skips intro. Existing movement
    callback, island hover/focus/click and header clicks dismiss early.
    Movement and selected island subtly highlight controls.
-   Desktop instructions describe supported WASD/arrows and mouse
    selection. Portrait/coarse-touch instructions describe actual
    two-tap island entry, with no unsupported drag claim. Reduced motion
    uses immediate still states. No scene composition, character
    controller, routes or dependencies changed.
-   Lint/build passed. qa/world-controls-check.cjs passed timer/session
    revisit, WASD feedback, hover/navigation dismissal, keyboard focus,
    five viewport bounds, touch two-tap entry, reduced motion and
    browser Back. Desktop intro and mobile compact screenshots
    inspected. Physical-device/Safari rendering remains unverified.

## 2026-09-28 Wider World island composition

-   Spread desktop islands into the space freed by the introduction:
    About left, Skills lower-left with label above foreground foliage,
    Projects shifted toward center, Q&A upper-right and Contact
    lower-right. Adjusted connecting bridge positions and ultrawide
    Projects alignment. Portrait island layout, artwork, independent
    effects and routes retained.
-   All 19 viewport label/fullscreen/navigation checks passed, including
    zoom. Desktop 1440×810 screenshot inspected and Skills raised after
    visual inspection found foliage obscuring its label.

## 2026-09-28 Real World: reverted to full navigation + reference copy

-   User showed the same reference screenshot again and asked for closer
    fidelity, explicitly including the navigation. Two decisions
    confirmed directly: (1) replace the previous turn's confirmed hero
    copy with the reference's own text, (2) remove the Real-World-only
    minimal header and restore the same full header
    (ABOUT/SKILLS/PROJECTS/Q&A/CONTACT nav + WORLD MAP link +
    Pause/Sound/Menu icons) used on every other route.
-   `App.jsx`: removed the `realWorld` conditional branch added last
    turn; header markup is unconditional again (only `dark`/`worldMode`
    theming remain, as before that change). Direct/Quick Access is still
    reachable everywhere via the header's menu icon → its existing
    "DIRECT ACCESS ↗" link --- nothing was lost.
-   `index.css`: removed the now-orphaned `.site-header-minimal` /
    `.header-quick-view` / `.system-panel` rules (that header variant no
    longer exists).
-   `RealWorld.jsx` / `.css`: hero copy replaced with the reference's
    own text --- eyebrow "MY PORTFOLIO WORLD" (short line marker instead
    of a dot), headline "작은 아이디어가 / 더 나은 경험이 되는 곳"
    (bumped from clamp(34,3.6vw,56) to clamp(40,4.6vw,68) to match the
    reference's larger proportions), body "사용자와 브랜드를 연결하는 웹
    경험을 만들고, / 보기 좋은 화면을 실제 동작하는 인터페이스로
    구현합니다.", caption "버튼을 누르면 월드로 진입합니다.". Removed
    the hero's own inline `QUICK VIEW` link (redundant now that the
    restored header's menu already exposes Direct Access). Bottom-left
    metadata restructured to "--- SEOUL, KOREA" + "A FRONTEND
    DEVELOPER'S REAL WORLD" subline, bottom-right simplified to "SCROLL
    ↓", matching the reference.
-   The `ENTER WORLD` gateway-button treatment, hover
    micro-interactions, status line (`● REAL WORLD` → ...),
    launch/disable-on-click state and the Portal cinematic hookup from
    the last two rounds were **not** changed --- only nav + copy were in
    scope this round.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment).

## 2026-09-28 Remove World introduction overlay

-   Explicit user request removes the left introduction copy and its
    blur panel from WorldHUD.jsx. Brand, navigation, System, compass and
    island effects remain. Earlier introduction styling notes are
    historical.

## 2026-09-28 Stronger landmark-specific selection effects

-   IslandLife.jsx/.css now align stronger effects with current terrace
    artwork: About amber arched windows, Skills crystal
    edges/screens/circuit ring, Projects gateway/spire flow and crown
    ring, Q&A intersecting celestial light tracks, Contact lantern flare
    and repeating beam sweep from the actual lighthouse top. Existing
    hover/focus/touch selection and routes retained; no new dependencies
    or product decisions.
-   Lint/build passed. Browser pointer checks activated all five effects
    at 1440×810; screenshots inspected alongside keyboard-focused
    390×844. OS reduced motion reported zero running landmark
    animations. Paused scene selection uses still highlights. Physical
    devices/Safari unverified.

## 2026-09-28 Real World redesigned: workspace-first, minimal gateway UI

-   User provided a reference screenshot + detailed spec: Real World
    must read as "a real workspace, about to enter Portfolio World"
    rather than a game start screen, with the workspace video as the
    subject and UI kept minimal. Implemented (not cloned) per that spec.
-   `App.jsx`: header is now route-conditional. On `/` only, it shows a
    compact brand mark (`JY` / "JUNYOUNG KIM" / "PORTFOLIO") + a
    `QUICK VIEW` link + a single system icon opening a native `popover`
    panel (Motion on/off, Sound on/off, "인트로 건너뛰기" →
    `/world-map`), reusing the existing `paused`/`sound`/`tone` state
    from `PortfolioUIContext`. All other routes keep the full header
    (ABOUT/SKILLS/PROJECTS/Q&A/CONTACT nav, WORLD MAP link, separate
    Pause/Sound/Menu icons) unchanged.
-   `RealWorld.jsx`: hero copy replaced with the confirmed Korean copy
    (eyebrow / 3-line headline / 2-line body), much smaller type scale
    (headline `clamp(34px,3.6vw,56px)`, was up to 84-95px).
    `ENTER WORLD` is now a bordered "gateway" button (diamond mark +
    hover sweep/arrow-shift/monitor-brightness cue via `:has()`,
    degrades safely without it) instead of a solid white pill;
    `DIRECT ACCESS` was renamed `QUICK VIEW` and restyled as a ghost
    link. Added a tiny system-style status line under the button
    (`● REAL WORLD` → `◌ SIGNAL DETECTED` on hover →
    `PORTAL LINK ESTABLISHING...` → `ENTERING PORTFOLIO WORLD`) and a
    `launching` state that disables the button and fades the hero copy
    out (420ms) before mounting `PortalCinematic` --- prevents
    double-activation. The `visited`/reduced-motion
    skip-straight-to-World path is unchanged.
-   `RealWorld.css`: `.room-shade` narrowed to a left-side legibility
    gradient (was full-width dark wash) so the workspace stays visible
    past roughly 60% of the frame; typography and spacing re-scaled to
    match.
-   **Not touched, as required**: `PortalCinematic.jsx`/`.css` (the
    two-clip portal sequence, skip/Escape/error-recovery, and the
    `document.body` portal-sizing fix) --- Real World only calls into it
    the same way it already did.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment).

## 2026-09-28 Icon System and translucent introduction

-   Latest user refinement moves System to a 44px icon-only gear at top
    right, with a restrained static blue glow and accessible name/title.
    Settings open downward; compass remains bottom right. Replaced the
    introduction's opaque ivory wash with a translucent blurred glass
    panel, retaining copy and navy text.
-   Updated WorldHUD.jsx/.css only for UI behavior/style. Lint/build and
    nine-size HUD panel/character safe-area checks passed, including
    image-failure navigation. Desktop 1440×810 and mobile 390×844
    visually inspected. Physical devices/Safari remain unverified;
    routes, scene assets and product decision states unchanged.

## 2026-09-28 Quiet HUD corners and readable introduction

-   Latest explicit user request removes World HUD Quick View and Menu
    controls. Their routes/content remain intact; top destination
    navigation and compass mini-map retain direct access, including
    Resume in the map.
-   Standalone thin-line compass sits at bottom right; compact
    pale-glass System sits at bottom left. Left introduction retains
    approved copy with a soft ivory backing and stronger text
    contrast/weight. Portrait layouts expose top navigation without a
    Menu disclosure.
-   Lint/build passed. All 19 fullscreen/navigation sizes and nine
    compass/System overlay sizes passed, including zoom and
    image-failure direct access. Desktop 1440×810 and mobile 390×844
    screenshots inspected. Physical devices and Safari remain
    unverified. This supersedes earlier Quick View/Menu placement notes
    below.

## 2026-09-28 HUD reference-detail correction

-   Refined WorldHUD/WorldHUD.css and added reusable HudDetails.jsx SVG
    icons/plaque frame: horizontal JY lockup, double gold/ivory
    blue-glass nav and Quick View/Menu/System capsules, ornamental
    island frames with destination icons, and an unboxed line compass
    above System. Existing functional handlers, character/world assets,
    approved copy and routes retained.
-   Follow-up regression caught Back before React committed the
    destination (location key could remain unchanged); a cleaned-up
    native popstate listener now also cancels pending travel
    immediately.
-   Lint/build passed. All 19 fullscreen label/navigation checks and
    nine HUD overlay/character safe-area sizes passed;
    desktop1440×810/mobile390×844 visually inspected.
    Physical-device/Safari rendering remains unverified.

## 2026-09-28 Explicit World HUD and bounded movement request

-   Latest pasted user brief explicitly authorizes arrow/WASD movement
    inside the World Entrance Lookout. Implemented scoped movement with
    existing directional gallery sprites, key-release/blur cleanup and
    reduced-motion discrete steps. No physics/jumping/island walking.
    This supersedes older World-map movement exclusions for this bounded
    feature only.
-   Added WorldHUD (exact Korean copy, capsule top navigation/Menu,
    ivory-gold labels, Quick View, working compass/mini-map, contextual
    entrance action and bottom System). Shared App motion/sound
    preferences exposed through PortfolioUIContext; System persists
    choices, honors OS reduced motion and uses the existing selection
    sound.
-   Kept existing scene assets, live blue-white water, atmospheric
    motion, router, gallery and project data. Reframed five islands for
    copy/label readability. Camera entry 1.45 s / repeat 0.6 s; movement
    cancels auto travel, new destination replaces the previous one,
    touch uses selection then confirmation.
-   Audit, file ownership, exact behavior, validation and limits:
    `docs/layered-world/world-hud-audit.md`. Lint/build and 19-viewport
    checks passed; HUD movement/touch/keyboard/settings/compass checks
    and nine-size overlay safe-area checks passed, plus existing
    water/ambient checks. Desktop1440×810/mobile390×844 inspected. No
    physical-device/Safari/Core Web Vitals certification; character is
    four-frame 2.5D, not a rigged model.

## 2026-09-28 Reference blue-white water correction

-   FlowingWater now uses pale sky-blue shadows and silver-white foam
    instead of teal. Its existing WebGL pass samples island artwork to
    selectively grade cyan terrace/pool pixels toward blue, retaining
    source detail and white reflections. Texture resources are disposed
    on unmount. BasinWater grading and CSS waterfall fallback now match
    the blue-white direction. Existing movement and scene architecture
    retained.
-   Desktop 1440×810 visually inspected; lint/build passed,
    waterfall/basin motion, pause/resume, reduced-motion and
    WebGL-failure navigation checks passed. WebGL-unavailable terrace
    pools retain their original image colour; animated and fallback
    waterfall colours are updated. No physical-device colour calibration
    performed.

## 2026-09-28 Latest reference: five ivory terrace islands and stone lookout

-   Replaced five island plates with independent `*-terrace-v10.webp`
    assets: About stepped villas, Skills circular glass workshop,
    Projects monumental terraced palace/gallery, Q&A open colonnade and
    armillary globe, Contact lighthouse/villas. Projects retains the
    largest 37% desktop width. Waterfall regions realigned to the new
    terraces; existing live water, clouds, city and navigation retained.
-   Foreground is now an independent limestone stair/curved-parapet
    lookout with ruined columns and restrained planting. Existing
    character remains separately rendered and positioned on paving.
    Removed the old framing-tree markup; a clipped foliage layer
    provides subtle breeze. Mobile foreground fades into the scene
    without blocking island controls. No companion added.
-   Six image_gen reference-based assets, source originals and
    transparent WebP outputs retained. Prompts/provenance:
    `docs/layered-world/world-terrace-v10.json`; extraction:
    `qa/prepare-world-v10.cjs`. These are generated reference
    interpretations, not identical source pixels. Routes, project facts,
    gallery and dependencies unchanged; no other working product
    decisions locked.
-   Lint and final build passed. Fullscreen/label/navigation checks
    passed at all 19 desktop, portrait and boundary sizes in
    `qa/fullscreen-check.cjs`, plus keyboard/menu, direct route and 200%
    zoom checks. Final 1440×810 and 430×932 screenshots visually
    inspected. Live-water motion/pause/reduced-motion/WebGL-failure and
    ambient-motion checks passed. Physical devices, Safari and
    performance targets remain unmeasured.

## 2026-09-28 Five grand reference islands and clearer turquoise city

-   User requested all five islands match the latest vivid monumental
    reference, with clearer left clouds and lower city. Replaced all
    five island images with independent `*-grand-v9.webp` assets: origin
    studio, creative glass atelier, largest ivory castle, bronze
    observatory and horizon lighthouse. Shared warm
    limestone/olive/cypress art direction; distinct landmarks retained.
    Desktop Projects is 37% scene width versus 21--23% others.
    Repositioned waterfall regions per new pools. Existing world
    navigation, gallery, character and facts unchanged.
-   Restored backdrop/city contrast and saturation, expanded lower-city
    visibility mask, moved dense cloud banks/haze to the sides and
    strengthened the left cloud silhouette. FlowingWater uses turquoise
    body/white foam; BasinWater applies a water-only turquoise grade
    matching the sharper city texture. Independent motion, pause and
    reduced-motion/failure fallbacks remain.
-   Built-in image_gen used supplied reference; original magenta source
    plates retained under `public/assets/source/world-layers/`, alpha
    extracted/optimized with Sharp. Prompt record:
    `docs/layered-world/world-grand-v9.json`; optimizer:
    `qa/prepare-world-v9.cjs`. Generated interpretations, not exact
    reference pixels. No dependency or route changes.
-   Lint/build passed; all 19 fullscreen/boundary viewport checks and
    direct navigation/zoom checks passed. Desktop1440×810/mobile430×932
    screenshots inspected. Waterfall and basin
    motion/pause/resume/reduced-motion/WebGL failure checks passed;
    ambient clouds, birds, leaves and canopy motion passed.
    Physical-device/Safari and performance targets remain unmeasured.

## 2026-09-28 Monumental Projects castle exterior

-   Latest user request applied to Projects island only: generated
    `projects-castle-v8.webp` with an ivory limestone castle, central
    arched gateway, varied towers, sparse olive/cypress planting and
    three white arched bridge stubs. Source PNG retained under
    `public/assets/source/world-layers/`. Built-in image_gen reference
    generation, magenta extraction and WebP optimization; prompt
    recorded in `docs/layered-world/projects-castle-v8.json`.
-   Desktop width increased from 31% to 36% (about 1.57×
    Skills/Contact), stable floating motion retained. Three independent
    live waterfall regions aligned with front spillways. No baked
    falling-water image. Other islands, gallery interior, project facts
    and navigation unchanged. Explicit exterior direction recorded in
    PRD; no broader product decisions changed.
-   Lint/build passed, 19 viewport/boundary checks passed including
    labels, direct access and zoom. Desktop scene visually inspected.
    Physical-device and Safari performance remain unverified.

## 2026-09-28 Fullscreen gallery without bottom content

-   User requested removal of bottom content. Removed the
    guide/selection panel and its reserved mobile region in
    `Projects.jsx/.css`. Gallery now fills 100dvh at every breakpoint,
    including short viewports; panoramic character following remains.
    Compact top disclosure contains exhibit selection, Contact, Quick
    View and motion pause. Existing exhibit case-study links and
    movement remain; project content and routes unchanged.
-   Lint/build passed. Full-height scene, absence of bottom panel and
    menu-to-exhibit case-study navigation checked at 1440×810, 1180×820,
    430×932 and 360×640. Mobile screenshot inspected. Older gallery QA
    scripts targeting the removed bottom panel need selector updates
    before reuse; their earlier results describe the prior layout.

## 2026-09-28 User character reference applied to gallery

-   Replaced the gallery's single rear-view sprite with
    reference-conditioned front/side/back idle and four-frame walk
    strips. `useGalleryWalk.js` selects direction from travel vector,
    retains it when stopping, and mirrors only the side view for
    rightward movement. Existing click/touch/arrow controls and routes
    remain unchanged; World-map movement was not expanded.
-   Assets:
    `public/assets/production/images/project-gallery/character/`; prompt
    and tool provenance: `docs/layered-world/character-assets.json`.
    Built-in image_gen produced the poses. Two transparent exports
    contained baked checkerboards, so a generated green-screen revision
    was chroma-keyed and converted to WebP with Sharp. Alpha was checked
    against a solid contrasting background. Sources retained. This is a
    four-frame stylized cycle, not a rigged 3D character; poses are
    generated interpretations of the reference.
-   Existing gallery input and 19 viewport checks passed after
    replacement, including reduced motion, sprite animation, Escape,
    zoom and fallback navigation. Desktop and mobile screenshots
    reviewed; physical devices/Safari remain unverified.

## 2026-09-28 Projects spatial gallery and bounded character movement

-   Supersedes the earlier gallery entry below: user explicitly
    requested gallery movement and closer spatial reference fidelity.
    `Projects.jsx/.css` now stage large near-left/right and smaller rear
    exhibits in a circular glass hall with a central banner and floor
    reflections. `useGalleryWalk.js` owns bounded 2.5D movement through
    floor click/touch or focused arrow keys; Escape/blur stops movement.
    A four-frame sprite, depth-dependent scale/occlusion and portrait
    camera following reinforce movement. This is not a collision-aware
    3D interior or an exact reference reproduction.

-   Routes, project facts, case-study pages, World, Contact and Quick
    View access retained. No companion, physics or World-map movement
    added. All four case studies remain immediately accessible. Reduced
    motion uses instant positioning; pause/hidden state stops animation;
    failed gallery artwork does not block links. Existing sculptures are
    conceptual exhibits, not actual project UI or official product
    assets.

-   New `hall-depth.webp` and `walk.webp` generated with built-in
    image_gen from the supplied gallery reference and existing
    character. Sources retained alongside production files; prompt
    record in `docs/layered-world/gallery-depth-assets.json`. No new
    dependencies. Other concurrent Real World and water changes
    preserved.

-   Lint passed. Browser automation passed 19 viewport/boundary sizes,
    keyboard walking, exhibit approach, direct case-study/Back/reload,
    pause, reduced motion (including toggling during movement), floor
    click, sprite frame changes, Escape, 200% zoom and failed-image
    navigation. Desktop 1440×810 and mobile 430×932 screenshots visually
    inspected. Checks: `qa/gallery-depth-check.cjs`,
    `qa/gallery-input-check.cjs`. Physical touch devices, Safari and
    performance targets remain unverified.

-   Production build also passed after the movement fixes
    (`npm run build`).

## 2026-09-28 Fixed: none of the three premium videos actually played

-   Root cause found by parsing the MP4 `stsd` box directly
    (`moov/trak/mdia/minf/stbl/stsd`): all three recently-added clips
    (`portal-journey-premium.mp4`,
    `hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4`,
    `start-ambient-premium.mp4`) were HEVC (`hvc1`, Main10 10-bit). The
    previously-working `portal-journey.mp4` is H.264 (`avc1`). Most
    desktop browsers (Chrome/Firefox on Windows without an OS HEVC
    add-on) can't decode HEVC in `<video>`, so all three silently failed
    and the app's existing error/failure handling (`onError`) skipped
    straight past them --- this is why the cinematic appeared to do
    nothing.
-   Installed `@ffmpeg-installer/ffmpeg` into an isolated scratch
    directory (not this project's `package.json`/lockfile) and
    transcoded all three to H.264 (`libx264`, CRF 20, `yuv420p`,
    `+faststart`, no audio track --- none of the sources had one).
    Verified via the same `stsd` parse that all three are now `avc1`.
    Replaced the files in place at their existing `production/video/`
    paths, so no source path changes were needed in `RealWorld.jsx` /
    `PortalCinematic.jsx`. Transcoding also shrank them substantially
    (32.7→8.7MB, 59.4→14.4MB, 6.5→1.2MB).
-   Original HEVC masters kept at
    `public/assets/source/original/*-hevc.mp4` (source/production
    split), not deleted.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment) --- please confirm
    playback now works.

## 2026-09-28 Projects exhibition gallery

-   User requested the exhibition-hall reference after entering
    Projects. `/projects` now directly renders `Projects.jsx/.css`, with
    exact-route gallery chrome in App; project-detail routes retain
    DestinationFrame and existing content. Four independent illustrated
    exhibits, real project names/roles/descriptions and semantic
    case-study links share a glass/limestone hall. Existing decorative
    character, Back to World, Contact and Quick View remain. No
    companion or character controls added.
-   Desktop shows four exhibits together, tablet two columns, mobile one
    column with a fixed hall backdrop. Hover/focus, subtle light, pause,
    reduced-motion and hidden-tab pause implemented. Other destination
    interiors remain undecided; no project facts changed.
-   Actual project screen assets were not found; asked user for their
    folder. Current sculptures explicitly illustrate project themes, not
    actual interfaces or official products. Hall and three sculptures
    generated with built-in image_gen; beauty sculpture via Higgsfield.
    Four Higgsfield requests were rejected for insufficient credits,
    then replaced through built-in generation without buying credits.
    PNG sources/WebP assets:
    `public/assets/production/images/project-gallery/`; prompts:
    `docs/layered-world/gallery-assets.json`.
-   Lint/build passed. World-to-gallery entry, four keyboard-opened case
    studies, Back/refresh, pause/reduced motion, 200% zoom and 19
    viewport layout checks passed (`qa/gallery-check.cjs`). Desktop
    1440x810 and mobile 430x932 screenshots inspected. Physical
    devices/Safari and measured performance remain unverified.
    Concurrent PortalCinematic edits preserved.

## 2026-09-28 Portal cinematic now plays two clips back to back, then arrives at World

-   User asked for a second clip
    (`hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4`,
    already in `public/assets/production/video/`, 10s/1920×1080/24fps
    HEVC) to follow the first cinematic clip, with automatic arrival at
    `/world-map` once it finishes --- reversing the prior "loop forever
    until skipped" behavior back to a sequenced, auto-advancing pair.
-   `PortalCinematic.jsx` now holds a `stage` index over a `CLIPS` array
    (`portal-journey-premium.mp4` then the new clip). `loop` was removed
    from the `<video>`; `onEnded` now calls `advance()`, which moves to
    the next clip on stage 0 and calls `finish()` (→ `onArrive` →
    navigate to `/world-map`) on the last stage. `onError` also calls
    `advance()` so a broken clip skips forward instead of getting stuck.
    The `<video>` is keyed by `stage` so the element fully remounts on
    the source swap. The phase-based decorative overlay (`data-phase`,
    monitor-noise/design-space SVG) still tracks the first clip's
    timing; the second clip is treated as a flat "arrival" phase with
    the white-flash `portal-arriving` cue added in its last \~1.5s to
    cue the cut to World.
-   Manual "연출 건너뛰기" (skip), the "프로젝트 바로 보기" link,
    Escape, and `prefers-reduced-motion` still end the sequence
    immediately at any point, same as before.
-   `npm run lint` / `npm run build` passed; confirmed the second clip
    is included in `dist/assets/production/video/`. Not verified in an
    actual browser (none available in this environment) --- the second
    clip's actual content/pacing was not viewed, so the "arrival" phase
    timing on it is a reasonable guess, not a shot-matched sync.

## 2026-09-28 Distinct UX/UI destination silhouettes v7

-   User approved distinct studio, creative workshop, contemporary
    gallery, observatory and horizon beacon exteriors. Five
    `*-identity-v7.webp` assets replace v6 island art, retaining the
    existing material reference and independent layer architecture.
    About has one large oak/cottage; Skills an angular brass/glass
    workshop; Projects a broad modern atrium/gallery; Q&A a round
    telescope dome; Contact a tall asymmetric lighthouse/terrace.
    Original generations and prompts/jobs retained in
    `public/assets/source/world-layers/` and
    `docs/layered-world/identity-v7.json`. Generated through Higgsfield
    GPT Image 2.5, optimized to 1600px WebP; alpha inspected.
-   `LayeredWorld.jsx`, `layers.config.js`: swapped five art sources,
    aligned live waterfall outlets to new pools, clarified destination
    subtitles around design story, design/build, case studies and
    thinking. `IslandLife.jsx/.css`: small per-landmark window, glass,
    atrium, instrument and beacon light motions. Existing global
    pause/reduced motion owns their playback. Routes, portfolio facts,
    foreground, lower water and cloud layers retained. Interior page
    designs remain WORKING. Actual project screenshots are not currently
    available in this repository, so no generated UI has been
    represented as real work; gallery panels remain architectural
    decoration and Projects links to the existing four case studies.
-   Lint/build and 19 viewport checks passed, including keyboard/menu,
    direct route and 200% zoom navigation. Desktop 1440x810 and mobile
    430x932 screenshots visually reviewed. Physical-device/Safari
    performance not measured.

## 2026-09-28 Lower basin water and fuller cloud movement

-   Added `BasinWater.jsx`, mounted by `LayeredWorld.jsx`: transparent
    WebGL water-only displacement and moving highlights sampled from the
    existing native basin texture. The lower-water mask preserves
    architecture and cloud details; this is a subtle surface ripple
    effect, not fluid simulation. Existing still image remains the
    fallback. Motion follows the existing pause, reduced-motion,
    visibility and scene lifecycle owner.
-   `WorldAtmosphere.jsx` / `.css`: five additional cloud banks behind
    interactive islands, with different drift durations, phases and
    gentle density changes. Mobile renders three banks. Existing
    island/navigation structure and product decisions remain unchanged;
    no dependencies or source artwork replaced.
-   Lint and production build passed. Basin pixel comparison confirmed
    animation and resume, with zero change while paused or under reduced
    motion; WebGL failure retained direct Contact navigation.
    Cloud/ambient transform and pause checks passed. All 19 viewport
    checks plus keyboard, direct route and 200% zoom checks passed.
    Desktop 1440x810 and mobile 430x932 screenshots inspected; physical
    devices and Safari performance remain unmeasured. Reports and checks
    are in `docs/layered-world/` and `qa/`.

## 2026-09-28 Unified reference-material revision v6

-   User approved addressing the three supplied references as an overall
    composition/material problem. Replaced five islands, foreground
    lookout and framing tree with seven reference-conditioned
    transparent assets (`*-reference-v6.webp`). Wider walkable terraces,
    several stepped cliff buttresses, larger readable rock faces,
    naturally grouped tree canopies and grass/flowers around stone edges
    replace prior narrow pointed islands and dense repeating foliage.
    Sources/previous versions retained; prompts/jobs in
    `docs/layered-world/reference-v6.json`. Generations use the
    previously uploaded image matching the third supplied reference;
    these are interpretations, not exact extracted reference layers.
-   `LayeredWorld.jsx`, `layers.config.js`, `LayeredWorld.css`,
    `WorldAtmosphere.css`, `FlowingWater.jsx`: new art sources, adjusted
    water outlets/labels, slightly shifted Skills, enlarged desktop
    explorer, replaced/positioned lookout, reduced background
    saturation/contrast/opacity for depth without downsampling or blur.
    All five source artworks omit falling water; existing procedural
    water now supplies each waterfall. Native background pixels
    retained. Independent floating/navigation, birds/leaves/clouds/mist
    and accessibility remain.
-   Lint/build passed. All 19 viewport checks plus
    keyboard/direct-route/200% zoom checks passed. Water pixel motion,
    pause/resume, reduced-motion and missing-WebGL navigation passed;
    ambient transform/pause checks passed. Desktop 1440x810 and portrait
    430x932 screenshots inspected. Physical-device/Safari performance
    not measured. No route/content/dependency or LOCKED product changes;
    other concurrent Real World edits preserved.

## 2026-09-28 Portal cinematic sizing fix --- matches the pre-click screen now

-   User reported the ENTER WORLD cinematic rendering visibly smaller
    than the start screen it replaces. Two likely causes fixed:
    1.  `PortalCinematic.css` switched the video to
        `object-fit: contain` under 767px, letterboxing it (unlike the
        always-`cover` ambient video) --- removed that override so it
        stays `cover` at every width, same as the start screen.
    2.  `PortalCinematic`'s `position: fixed` section was rendered
        inside `RealWorld`'s own `.start-scene` box, which has
        `overflow: hidden` + `isolation: isolate` --- a combination that
        can make browsers constrain a `position: fixed` descendant to
        that ancestor's (smaller, header-offset) box instead of the true
        viewport. `PortalCinematic.jsx` now renders via
        `createPortal(..., document.body)`, so it always sizes to the
        real viewport regardless of the RealWorld scene's own box.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment) --- please confirm the
    cinematic now visually matches the start screen's size.

## 2026-09-28 First-screen ambient video swapped to the premium loop

-   User added a new 5s/1920×1080/24fps HEVC clip to `public/assets/`
    (`Create-a-seamless-cinematic-ambient-loop.mp4`) for the Real World
    start screen (not the portal cinematic). Moved it to
    `public/assets/production/video/start-ambient-premium.mp4` and
    pointed `RealWorld.jsx`'s ambient `<source>` at it, replacing
    `start-ambient.mp4` (still on disk at `public/assets/`,
    unreferenced, not deleted). The `<video>` element already had
    `loop`, so no JS changes were needed --- it loops automatically like
    the previous clip.
-   `start-poster.webp` (used as this video's `poster` fallback frame)
    was not regenerated --- it's still the old ambient clip's first
    frame, so it may not exactly match the new clip's opening frame.
    Could not extract a new poster frame (no ffmpeg/browser available in
    this environment).
-   Codec caveat: same as the portal clip --- HEVC in MP4. Browsers
    without HEVC decode simply won't show motion; `poster` + the static
    `.room-photo` layer underneath still render, so the screen doesn't
    break, it just stays static for those visitors.
-   `npm run lint` / `npm run build` passed; confirmed the new file is
    included in `dist/assets/production/video/`.

## 2026-09-28 Visible ambient life and airy old oak

-   User requested clearer falling water, an old foreground tree,
    swaying foliage, visible birds/leaves/mist and moving clouds. Added
    staggered accelerating foam packets to the continuous water shader
    without restoring saturated cyan coloration. These are procedural
    visual motion, not simulated fluid.
-   Left tree now uses `foreground-oak-v5.webp`: aged bark and branches
    with open foliage. Two complementary canopy masks sway at different
    timings; individual leaves within the image are not rigged.
    Preserved bright sky visibility and existing island art/layout.
-   Added three small SVG bird flocks with wingbeats/gliding, increased
    leaf size and on-screen time, increased depth-cloud travel and made
    three mist ribbons and waterfall spray more visible. Desktop has 15
    birds, mobile reduces to six; reduced motion hides birds and loose
    leaves. Global pause/visibility still controls ambient CSS and water
    clock.
-   Lint/build, 19 responsive viewport/navigation checks, water
    motion/pause/reduced/WebGL-fallback checks passed.
    `qa/living-world-check.cjs` verifies actual transform changes for
    clouds/mist/birds/leaves/canopy and pause/reduced behavior. Desktop
    1440x810 inspected; physical-device/Safari performance unverified.
    No route, content or LOCKED product changes. Asset provenance:
    `docs/layered-world/foreground-oak-v5.json`.

## 2026-09-28 Water visual integration refinement

-   User flagged the new wave effect as incompatible with the scene.
    Reduced cyan saturation, contrast, opacity, lateral bending and flow
    speed in `FlowingWater.jsx`; changed to fine silver-white descending
    streams and earlier mist fade. Softened the underlying CSS fallback
    gradient in `WorldAtmosphere.css`. Higher shader precision avoids
    coarse mediump noise artifacts. No scene/layout/content changes.
-   Lint/build and waterfall pixel-motion, pause/resume, reduced-motion
    and unavailable-WebGL navigation checks passed. Desktop 1440x810
    screenshot inspected. This remains procedural water; no claim of
    physically simulated or photorealistic fluid.

## 2026-09-28 Airy sky-island correction and flowing water

-   User rejected the overgrown ancient-tree direction and specified
    open, bright Final Fantasy/Zelda/Ghibli-like sky islands. Replaced
    left tree with sparse light foliage and clean branches; replaced
    fern foreground with sparse meadow grasses. About now uses
    `about-airy-v4.webp` with exposed light rock, low meadow and a
    light-barked tree. Other four islands use the less-overgrown
    `natural-v2` versions again. New direction is applied first to
    About, not claimed as a completed all-island art redesign.
    Provenance: `docs/layered-world/airy-v4.json`.
-   `FlowingWater.jsx` replaces the old low-opacity SVG streak overlay
    on all five islands. A continuously advancing WebGL noise field
    renders full cyan/white water curtains at capped resolution/30fps,
    with broad flow, fine foam and irregular edges; there is no video or
    periodic playback reset. About's baked waterfalls were removed in
    its new art, and spring positions are aligned to two dynamic falls.
    Other four islands still contain baked water beneath the new
    rendering. This is a procedural visual effect, not fluid simulation.
-   Existing mist, floating parents, navigation and
    pause/reduced-motion/visibility handling remain. CSS water fallback
    renders if WebGL is unavailable; navigation does not depend on it.
    No dependencies/routes/content changes or new LOCKED decisions.
-   Lint/build, 19 viewport checks, direct navigation and 200% zoom
    passed. `qa/water-shader-check.cjs` verifies changing waterfall
    pixels, pause/resume, reduced motion and WebGL-unavailable
    navigation; supersedes the old SVG period test via
    `qa/ambient-continuity.cjs`. Desktop 1440x810 inspected. Physical
    device performance and Safari remain unverified.

## 2026-09-28 Grand fantasy vegetation revision

-   User approved replacing rounded vegetation with grand ancient-tree,
    fern, grass and trailing-vine forms. Five independently navigable
    island artworks and the left framing tree now use versioned
    `*-fantasy-v3.webp` assets. Added a transparent
    fern/grass/wildflower cluster at three foreground positions (two on
    mobile); old assets remain available. Generation provenance:
    `docs/layered-world/fantasy-vegetation-v3.json`.
-   Foreground canopy and fern clusters share a 24-second gust rhythm
    with staggered response. Seven sparse drifting seed highlights
    (three on mobile) supplement existing leaf, cloud, mist, ship and
    waterfall animation. Existing pause, visibility and reduced-motion
    ownership applies. Vegetation inside island artwork remains baked
    imagery; this is layered ambient motion, not individually simulated
    branches or fluid.
-   Changed `LayeredWorld.jsx`, `WorldAtmosphere.jsx/.css`, and
    production/source artwork. No route/content/layout or LOCKED product
    changes. No additional dependency. Native-resolution background
    preserved.
-   Lint/build, 19 viewport layout/touch-target checks,
    direct-route/keyboard/200% zoom navigation and ambient
    continuity/pause/reduced-motion checks passed. Desktop 1440x810 and
    mobile 430x932 screenshots inspected. Actual-device/Safari
    performance remains unverified.

## 2026-09-28 Natural foliage/material revision

-   User flagged round, artificial foliage/grass and similar island
    masses. Inspected source art: repeated rounded vegetation, stylized
    rock scales and a broad light alpha fringe on About, plus simple
    vector leaves/grass contributed to the mismatch.
-   Five island textures and foreground tree now reference
    `*-natural-v2.webp`, generated as reference-conditioned material
    edits with finer pointed foliage and rougher fractured rock. Islands
    export at 1600²; tree at 1344×1800. Previous versions remain on
    disk. Some generated details differ; this does not imply pixel-exact
    preservation or completely eliminated rounding. Source alpha
    verified; provenance/prompts:
    `docs/layered-world/natural-materials-v2.json`.
-   Updated native vector leaf contours to three irregular tapered
    variants, smaller size; grass blades are thinner and vary by tuft.
    Adjusted water/spray masks for revised assets. Existing layout,
    destinations, character, background and ambient ownership remain.
-   Lint/build and 19 viewport checks passed. Ambient
    continuity/pause/reduced-motion checks also passed after final mask
    alignment. Actual-device/Safari frame pacing remains unverified. No
    product content or LOCKED decisions changed.

## 2026-09-28 Left foreground framing tree

-   Added a transparent foreground oak: trunk along the left edge with
    an overhanging canopy across the upper-left. New asset
    `foreground-tree.webp` (1344×1800, 793 KB) is derived from the
    retained RGBA PNG. Generation prompt/job provenance is in
    `docs/layered-world/tree-asset.json`.
-   `LayeredWorld.jsx` mounts decorative trunk/canopy layers;
    `WorldAtmosphere.css` softly masks their join and gives the canopy a
    small nine-second breeze. Existing pause/reduced-motion rules apply.
    Failed tree loads remove only this decoration. Character, islands,
    navigation and world movement remain unchanged.
-   Logo is light over the dark canopy; the decorative intro copy moves
    into the clear space below the branches. Portrait sizing keeps
    destinations and character visible. No new dependencies or
    content/LOCKED changes.
-   Lint/build and 19 viewport/navigation checks passed. Desktop
    1440×810 and portrait 430×932 screenshots were inspected.
    Real-device/Safari verification remains outstanding.

## 2026-09-28 Continuous water and ambient detail

-   Replaced the waterfall's three-second `feOffset` turbulence reset
    with a periodic 120-unit tile translated exactly one period. Subtle
    light/dark flow streaks are feather-masked to existing water
    regions; the original island artwork stays static underneath. This
    is an overlay flow effect, not fluid simulation or a new waterfall
    render.
-   `WorldAtmosphere.jsx/.css` adds eight localized waterfall mist
    plumes, two low-opacity haze ribbons, twelve staggered leaf flights
    (six on small screens) and eighteen foreground grass blades (nine on
    small screens). Existing three cloud layers now have longer separate
    depth drift; two airships cross the screen on 181/237-second paths
    with offscreen wrapping and subtle vertical motion.
    Background/source trees remain baked into the art.
-   Existing global ambient pause, document visibility, reduced motion
    and cleanup behavior remain in control. No new packages/assets,
    route changes, content changes or free character movement. The new
    local MP4 seen in git status was not modified or used.
-   `qa/ambient-continuity.cjs` tests loop-boundary pixel difference
    versus ordinary motion, actual changing water pixels, pause/resume,
    CSS pause and reduced-motion behavior. Passed; see
    `docs/layered-world/ambient-report.json`. Native source imagery was
    fully decoded before comparison. Mean channel difference at the
    Projects loop boundary was 0.00254/255 vs 0.00192/255 for an
    ordinary equal time step; exact-cycle difference 0.000306/255
    (raster rounding).
-   Fullscreen QA again passed all 19 viewport sizes plus menu/route
    checks. Lint/build passed. Real device frame pacing and Safari
    rendering remain unverified. Earlier texture-displacement
    descriptions are superseded by this periodic-overlay approach.

## 2026-09-28 Portal cinematic now loops instead of playing once

-   User asked for the ENTER WORLD clip to keep playing on a loop rather
    than a single pass. `PortalCinematic.jsx`'s `<video>` now has
    `loop`; removed `onEnded={finish}` (moot once looping --- `ended`
    never fires on a looping element) and removed the unconditional 10s
    `deadline` timer that used to force-navigate to `/world-map` after a
    fixed time regardless of playback state. The 2.5s `startup` check
    (real failure: video never actually starts) is kept as the only
    automatic recovery path.
-   Net effect: the cinematic now plays indefinitely until the visitor
    explicitly leaves via the "연출 건너뛰기" skip button, the "프로젝트
    바로 보기" link, Escape, a failed video load, or
    `prefers-reduced-motion`. It no longer auto-advances to World on its
    own.
-   `npm run lint` / `npm run build` passed. Not verified in an actual
    browser (none available in this environment).

## 2026-09-28 Portal cinematic swapped to the premium single-take clip

-   User added a new 8s/1920×1080/24fps HEVC clip to `public/assets/`
    (`Create-one-continuous-premium-cinematic.mp4`) and asked for it to
    play when ENTER WORLD is pressed. Moved it to
    `public/assets/production/video/portal-journey-premium.mp4` and
    pointed `PortalCinematic.jsx`'s `<source>` at it, replacing the
    prior 10s/720p `portal-journey.mp4`/`.webm` pair (still on disk,
    unreferenced, not deleted).
-   Rescaled the `onTimeUpdate` phase thresholds
    (`normal`/`monitor`/`reality`/`transit`/`arrival`) and the recovery
    deadline proportionally from the old \~10s timing to the new clip's
    8s length (0.3/1.3/2.8/6.1/7.4s, 10s deadline), since the new clip's
    actual content/pacing was not viewed frame-by-frame --- these are an
    estimate, not a verified shot-matched sync.
-   Codec caveat: the source is HEVC in an MP4 container. Browsers/OSes
    without HEVC decode support will fail to play it; the existing
    `onError={finish}` handler already skips straight to `/world-map` in
    that case (matches the project's video-failure fallback principle),
    so playback failure does not block navigation, it just means some
    visitors won't see the cinematic. Not verified in an actual browser
    (no browser available in this environment).
-   `npm run lint` / `npm run build` passed; confirmed the new file is
    included in `dist/assets/production/video/`.

## 2026-09-28 Background image quality

-   Investigated the reported soft background: the browser used
    2400×1357 lossy derivatives of 2688×1520 PNG sources, with no CSS
    blur. At the inspected 1221×720 / DPR 1.5 viewport, the source
    already exceeded the needed physical resolution; enlargement was not
    established as the cause. Source haze and the basin's existing blend
    also contribute to a soft appearance.
-   The two background layers now use native-resolution lossless WebP
    (`background-native.webp`, `distant-basin-native.webp`). Decoded
    RGBA exactly matches each PNG source, verified in
    `docs/layered-world/background-quality.json`. No sharpening,
    generative repainting, layout or colour changes. This removes
    conversion loss but cannot restore detail absent in the source.
-   Quality tradeoff: combined background transfer increases from about
    1.87 MB to 9.43 MB. Production loading metrics remain unmeasured.
    Original compressed versions remain available on disk.

## 2026-09-28 Full-viewport World layout --- latest adjustment

-   User requested one continuous full-screen World without separate
    upper/lower sections. `LayeredWorld` now fills the browser viewport
    with no lower content cards or letterboxing. Existing island motion
    and assets remain intact.
-   Direct content links, Quick View and Resume are in an accessible
    disclosure menu over the landscape. Escape closes it and restores
    summary focus. Portrait view rearranges all five islands, foreground
    and airships; decorative bridges are hidden there to avoid
    disconnected spans.
-   `qa/fullscreen-check.cjs`: all 19 viewport sizes fill the viewport
    without document scrolling and preserve visible 44px island targets.
    Disclosure keyboard behavior, Contact navigation, reduced-motion
    entry and 200% CSS-zoom navigation passed. ESLint and Vite build
    passed. Current screenshots/report:
    `docs/layered-world/fullscreen-*`. Older overview/expansion tests
    describe the superseded layout. Real-device/Safari/performance
    limitations remain.

## 2026-09-28 Independent reference layers --- latest state

The user clarified that the previous independent-island architecture
must be retained, with reference-like forms, colour and texture. This
supersedes the static reference and whole-scene video experiments.

-   `/world-map` exports `LayeredWorld.jsx`. Five transparent
    reference-conditioned island reconstructions, a cleaned background,
    masked distant basin, three bridges, cloud layers, two airships,
    lookout and character form the scene. Production WebP assets live
    under `public/assets/production/images/world-layers/`; source PNGs
    and generation provenance are retained.
-   Each island has a distinct CSS floating duration/phase/amplitude.
    Masked SVG displacement animates its own waterfall pixels. Clouds,
    ships and character idle have separate CSS ownership. No whole-scene
    video is mounted. Background islands remain image details;
    vegetation is not yet independently animated.
-   Hover/focus highlights the selected destination; existing GSAP
    camera approach is bounded to 1.1 seconds with a 1.5-second recovery
    deadline. Existing routes, content facts, direct links and portal
    cinematic remain intact. Character reaction is a small whole-layer
    tilt, not an articulated rig.
-   Local pause, OS reduced motion, page visibility and offscreen
    detection pause ambient CSS/SVG. Mobile offers an overview, readable
    direct links and optional horizontally scrollable enlargement.
    Failed island images retain labels; failed backdrop has a gradient
    fallback.
-   These are reference-conditioned reconstructions, not exact cutouts:
    some architectural details and silhouettes differ from the source.
    Water uses local texture displacement rather than a physically
    simulated fluid; cloud wisps/vegetation are not fully separated.
    Final art fidelity and real-device performance remain to be refined.
-   Current QA and screenshots: `docs/layered-world/`; reproducible
    browser checks: `qa/layered-check.cjs`. Earlier report folders
    describe superseded implementations. No npm package, gameplay,
    character controller or portfolio fact was added in this revision.

## 2026-09-28 Reference fidelity revision --- historical, superseded

This historical implementation interpreted exact fidelity as priority
over independent animation. The user rejected that interpretation. The
bullets below describe the superseded static experiment, not the current
World.

-   World now displays that source artwork at its original aspect ratio
    with no colour filters, repainted water, replacement islands or
    synthetic clouds/airships. Lossless WebP conversion is verified
    against decoded source pixels. Source is 4351×2449; runtime asset is
    approximately 10.1 MB, a deliberate fidelity-first tradeoff, not a
    production performance claim.
-   HTML links align with the five pictured islands and printed top
    menu. Hover/focus reveals a small action label. Click applies a
    brief whole-artwork camera approach; reduced motion enters directly.
    Existing content, route paths and portal video remain intact.
-   Desktop preserves the complete artwork with letterboxing where
    necessary. Mobile provides the full composition, an optional
    horizontally scrollable enlarged view, and separate readable
    destination links. Direct links also recover from image failure.
-   Waterfalls, clouds, ships and character are currently STATIC parts
    of the source. Independent living animation is deliberately deferred
    until it can preserve source fidelity; do not report the earlier
    animated build as the current World.
-   Previous World JSX/CSS snapshots and current screenshots/results are
    in `docs/reference-revision/`. The earlier
    `docs/qa/world/report.json` applies to the previous build; current
    checks use `qa/reference-check.cjs`.

## 2026-09-28 Master Build --- current implementation

This update takes precedence over older implementation-status statements
below.

-   `/world-map` now renders separate transparent island assets,
    sky/cloud depth layers, flowing-water overlays, mist, selective
    vegetation motion, occasional birds/leaves, a lookout and a reactive
    character. Islands float independently; Projects is the main visual
    anchor.
-   Hover/focus selects a destination. Click/touch triggers a bounded
    GSAP camera approach with cloud occlusion before the existing
    content route. Direct navigation and reduced-motion access remain
    available. Existing project data is preserved.
-   Real World entry plays an approximately 10-second generated
    portal/transformation/arrival clip, with skip, Escape, media-error
    recovery and a 12-second deadline. Same-session revisits go directly
    to World; replay is available. This is a first integrated cinematic
    asset, not final shot-by-shot approval.
-   Five destination pages use an editorial arrival frame around
    existing content. Quick View exposes the existing four projects;
    Contact has a closing message and World return. No game progression,
    free character movement or companion system was added.
-   Runtime assets are WebP (640/1200px island variants) and silent 720p
    WebM/MP4. Sources and provenance are retained. No npm dependency was
    added.
-   QA covers required sizes and breakpoint cases, navigation,
    keyboard/touch, reduced motion, pause, media failure, storage denial
    and cinematic timing. Latest results: `docs/qa/world/report.json`.
    200% testing is CSS zoom; native zoom, real devices, Safari and
    production performance metrics remain unmeasured.
-   Details and limitations: `docs/portfolio-world-master-build.md`.
    Provenance: `docs/world-asset-manifest.json`. Existing missing
    resume/contact details were not invented.

> **Purpose:** 현재 실제 프로젝트 상태, 구조, Route, Asset, 문서 기준,
> 검증 상태를 기록한다.\
> **Rule:** 계획된 기능을 구현 완료로 기록하지 않는다.\
> **Product requirements:** `Personal-Portfolio_PRD_FINAL.md`\
> **Visual/UI requirements:** `DESIGN_SYSTEM.md`\
> **Last baseline update:** 2026-09-23

## 01. Project Overview

-   Project: Personal Portfolio
-   Purpose: 취업용 Interactive Personal Portfolio
-   Platform: Responsive Web
-   Framework: React
-   Build Tool: Vite
-   Language: JavaScript / JSX
-   Styling: CSS
-   Routing: React Router
-   Version Control: Git / GitHub
-   Current concept: **Cinematic Interactive Personal Portfolio**
-   Primary desktop reference: **1440×810**
-   Primary mobile reference: **430×932**

핵심 목표는 디자인 의도를 이해하고 인터랙션·반응형·접근성·프론트엔드
구현을 실제 웹 경험으로 연결할 수 있는 역량을 포트폴리오 자체로 증명하는
것이다.

------------------------------------------------------------------------

## 02. Source of Truth

  ---------------------------------------------------------------------------
  Document                                    Responsibility
  ------------------------------------------- -------------------------------
  `Personal-Portfolio_PRD_FINAL.md`           제품 목적, 콘텐츠, 사용자 경험,
                                              기능 요구사항, 완료 조건

  `DESIGN_SYSTEM.md`                          Typography, Color, Spacing,
                                              Radius, Grid, Responsive,
                                              Component, Motion 원칙

  `PROJECT_CONTEXT.md`                        현재 실제 코드/Route/Asset/검증
                                              상태

  `AGENTS.md`                                 AI Coding Agent 공통 규칙

  `CLAUDE.md`                                 Claude Code 추가 규칙

  `.agents/skills/design-to-react/SKILL.md`   반복 구현 Workflow

  `README.md`                                 외부 공개용 프로젝트 설명
  ---------------------------------------------------------------------------

충돌 시 실제 구현 상태가 필요한 문제는 코드를 먼저 확인한다. 무엇을
만들지는 PRD, 어떻게 보여줄지는 Design System, 구현 절차는
AGENTS/CLAUDE/SKILL을 따른다.

------------------------------------------------------------------------

## 03. Decision Status

### LOCKED

-   Portfolio First
-   Real World의 현재 방향
-   Real World → Portal → Tool Universe → Arrival → Portfolio World의 큰
    진입 흐름
-   Portfolio Core Content: About / Skills / Projects×4 / Q&A / Contact
    / Resume
-   게임/3D 없이 핵심 콘텐츠 접근 가능
-   Responsive / Accessibility / Fallback
-   React + Vite / React Router
-   Case Study는 정보 전달과 읽기가 우선

### WORKING / NOT LOCKED

Real World 이후 콘텐츠의 **세부 디자인과 이동 방식은 아직 확정하지
않는다.**

확정 구현으로 간주하지 않을 항목: - Portfolio World Character 실제 이동
여부 - About 공간 구성 - Skills 최종 디자인 및 Toolkit/Game Item 표현 -
Projects 최종 공간 디자인 - Project Archive/Gallery 채택 여부 - Project
선택 시 Character 이동 여부 - Point-based Movement - Q&A / Contact 공간
연출 - 각 콘텐츠 Camera / Transition - Ending 세부 연출

AI Agent는 WORKING 항목을 임의로 LOCKED로 승격하지 않는다.

------------------------------------------------------------------------

## 04. Real World --- Direction Locked / Implementation Pending

현재 가장 먼저 완성할 Scene.

확정 방향: - Seoul night workspace - Photorealistic / Cinematic - Warm
desk light × cool city/monitor light - iMac / 작업 공간 - Character -
black-and-tan Maltipom - white chiffon curtain - Hero copy 안전 영역 -
`ENTER WORLD` - Portal Cyan은 Default UI가 아니라 Portal 이상현상 이후
등장

큰 흐름:
`REAL WORLD → Portal Awakening → Portal Open → Suction → Tool Universe → Transformation → Fall/Arrival → Portfolio World`.

세부 Motion timing, Higgsfield clip 분할, Camera 수치는 Working이다. 위
내용은 기획 확정 상태이며 전체 Cinematic이 코드 구현 완료되었다는 의미가
아니다.

**2026-09-28 구조 정리 5차 --- RealWorld(`/`) 구현 교체:** 사용자
요청으로 기존 "WELCOME TO / main-title.png / START GAME" Mario 스타일
구현 (Fredoka 폰트, `main.png` 배경)을 삭제하고, 4차에서 보존해둔 신버전
Start 영상 자산(`/assets/start-ambient.mp4`,
`/assets/start-poster.webp`)과 신버전 Hero 카피("Every great journey
starts with a spark." 등)를 사용한 새 구현으로 교체했다.
`WorldUI.jsx`/`styles.css`는 이미 삭제된 상태라 의존하지 않고
`RealWorld.jsx`/`RealWorld.css` 안에 자체 마크업·CSS로 재구현했다(공유
컴포넌트 신규 생성 없음). `prefers-reduced-motion`에서는 영상 대신
`start-poster.webp`를 배경으로 표시.

**동작 변화:** `ENTER WORLD` 버튼이 이제 `/character`를 거치지 않고
`/world-map`으로 직접 이동한다(신버전 Start.jsx와 동일 동작). 기존
헤더의 ABOUT/PROJECT/Q&A/CONTACT 인라인 nav도 신버전 구조에 맞춰
제거했다 --- 신버전은 전역 헤더 nav를 가정하지만 이 프로젝트엔 아직 전역
헤더가 없어서, 직접 접근 경로는 `DIRECT ACCESS` 버튼 → `/quick-view`
하나만 남는다 (QuickView는 여전히 빈 Placeholder). `/character`는 이제
`RealWorld`에서 링크가 끊겨 `Ending`/`QuickView`와 같은 "참조 없음, KEEP
상태"가 됐다.

**새로 미사용이 된 것(삭제하지 않고 보고만):**
`public/assets/production/ images/real-world/{main.png,main-title.png}`,
`public/assets/production/ fonts/fredoka-variable.ttf` + `index.css`의
`@font-face 'Fredoka'` 선언 --- 전부 이 교체 이전엔 RealWorld가 유일한
사용처였다.

**2026-09-28 구조 정리 5차-1 --- CSS 정정:** 5차에서 작성한
`RealWorld.css`는 실제 신버전 `styles.css`를 읽지 않고(4차에서 그 파일을
내용 확인 없이 삭제했었음) 새 JSX 구조에 맞춰 **임의로 새로 만든
CSS**였다. 사용자가 실제 결과물이 신버전과 다르다고 지적해 원본 프로젝트
폴더
(`C:\Users\EZEN\Downloads\Personal-Portfolio-2026-09-28\Personal-Portfolio`)를
받아 실제 `src/styles.css`의 `.start-scene` 관련 규칙(base + 모든 반응형
breakpoint: 1700/950/600/370px, 두 short-viewport 조합,
reduced-motion)을 그대로 확인한 뒤 `RealWorld.css`를 값 그대로 다시
작성했다. 전역 `.button`/ `.eyebrow` 등 범용 클래스명과의 충돌을 피하기
위해 전부 `.start-scene` 조상 선택자로 스코프했다. 원본이 쓰는
Pretendard 정적 서브셋 2개 (`pretendard-400.woff2`,
`pretendard-700.woff2`)도 원본 폴더에서 그대로 복사해
`production/fonts/`에 추가하고 `index.css`에 `@font-face`를 등록했다.

**2026-09-28 구조 정리 5차-2 --- 전역 Site Header 추가:** 사용자가 실제
배포된 신버전 스크린샷(로고 "MY PORTFOLIO WORLD", ABOUT/SKILLS/PROJECTS/
Q&A/CONTACT nav, WORLD MAP 버튼, 일시정지/음소거/메뉴 아이콘이 모든
페이지 상단에 있는 전역 헤더)을 보여주며 현재 버전엔 이게 없다고
지적했다. 원본에서 이 헤더는 `App.jsx`가 `<Routes>`를 감싸는 형태로 전역
렌더링하는 구조라, 이번에 다음을 새로 추가했다: - [App.jsx](src/App.jsx)
--- `AppRouter`를 감싸는 전역 `<header className="site-header">`
(brand/로고, `desktop-nav`, WORLD MAP 링크, 일시정지·음소거·메뉴
아이콘버튼), `location.pathname==='/'` 기준 dark/light 테마 클래스,
`world-motion-paused`/`world-sound` localStorage 상태, Web Audio
`tone()` 효과음, 라우트 변경 시 포커스를 `<h1>`으로 이동시키는 접근성
처리, "PORTFOLIO NAVIGATION" Direct Access 모달(`<dialog>`)을 원본
그대로 이식했다. Modal/Icon은 별도 공유 파일로 부활시키지 않고 `App.jsx`
내부 로컬 함수로 구현했다. -
[PortfolioUIContext.jsx](src/app/PortfolioUIContext.jsx) --- 신규 추가.
`router.jsx`를 거치는 개별 Scene/Page까지 `reduced`(모션 축소 여부)와
`tone()`을 prop-drilling 없이 전달하기 위한 최소 Context. `RealWorld`가
이 Context로 영상 재생/정지와 ENTER WORLD 효과음을 처리하도록
갱신했다. - [index.css](src/index.css) --- `:root` 변수(`--header`,
`--display`), 전역 reset,
`.site-header`/`.brand`/`.desktop-nav`/`.header-controls`/
`.map-link`/`.icon-button`/`.dark` 변형/`.skip-link`/`dialog`/
`.adventure-body`/`.book-bottom`, 반응형(1180/950/600/370px),
`html[data-   motion=reduced]` 규칙을 원본 값 그대로 추가했다.
`RealWorld.css`의 `--header:0px` 국소 고정은 제거하고 이제 전역
`--header` 값을 그대로 쓰도록 되돌렸다.

**알려진 한계:** Skip Link(`href="#main"`)는
`RealWorld`(`id="main"`)에서만 동작한다.
About/Skills/Projects/QA/Contact 등 나머지 old 페이지는 각자 다른
id(`about_world` 등)를 쓰고 있어 아직 연결되지 않는다 --- 페이지별
콘텐츠/디자인은 이번 범위(전역 헤더 추가) 밖이라 손대지 않았다.

------------------------------------------------------------------------

## 05. Current Repository Structure

최근 제공된 Context 기준:

``` text
Personal-Portfolio/
├─ .agents/skills/design-to-react/SKILL.md
├─ AGENTS.md
├─ CLAUDE.md
├─ PROJECT_CONTEXT.md
├─ Personal-Portfolio_PRD.md        (⚠ 문서가 참조하는 _FINAL.md 아님, 15번 참고)
├─ DESIGN_SYSTEM.md
├─ README.md
├─ package.json
├─ vite.config.js
├─ public/assets/
│  ├─ backgrounds/         (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  ├─ characters/          (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  ├─ icons/                (.gitkeep만 존재, 실제 Asset 없음 — 생성 보류)
│  └─ production/          (2026-09-23 3차 정리에서 신설 — 실제 Asset이 있는 Category만 생성)
│     ├─ images/real-world/
│     │  ├─ main.png           (2026-09-28 5차 이후 미사용 — RealWorld가 더 이상 참조하지 않음)
│     │  └─ main-title.png     (2026-09-28 5차 이후 미사용)
│     └─ fonts/
│        ├─ pretendard-400.woff2        (2026-09-28 5차-1 추가, RealWorld.css에서 실제 사용 중)
│        ├─ pretendard-700.woff2        (2026-09-28 5차-1 추가, RealWorld.css에서 실제 사용 중)
│        ├─ pretendard-variable.woff2   (파일 존재, @font-face 미선언 — 여전히 미연결. 실제로는 위 정적 서브셋 2개를 사용)
│        ├─ fredoka-variable.ttf        (RealWorld.css `--display` var로 실제 사용 중)
│        ├─ silkscreen-regular.ttf      (미사용)
│        ├─ silkscreen-bold.ttf         (미사용)
│        ├─ retromario-regular.otf      (미사용)
│        └─ supermario256.ttf           (미사용)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ app/router.jsx
   ├─ scenes/
   │  ├─ RealWorld/        (route "/")
   │  ├─ Character/        (route "/character" — RealWorld의 START GAME 버튼에서 연결, 내부 Link는 /world-map으로 직접 연결)
   │  ├─ PortfolioWorld/   (route "/world-map" — 2026-09-23 WorldMap에서 rename, Character에서 연결, About/Skills/Projects/QA/Contact로 가는 실제 Nav Hub)
   │  └─ Ending/           (route "/ending" — router에는 등록되어 있으나 앱 내 어디서도 Link 없음, Direct URL만 가능, 사용자 결정으로 KEEP)
   └─ pages/
      ├─ About/
      ├─ Skills/
      ├─ Projects/
      ├─ ProjectDetail/
      ├─ QA/
      ├─ Contact/
      └─ QuickView/         (route "/quick-view" — router 등록, Link 없음. SKILL.md의 LOCKED "Quick View"와의 연관 모호, 사용자 결정으로 KEEP)
```

**2026-09-23 구조 정리 1차 (Audit 결과 실행):** `scenes/Mission`,
`scenes/StageClear`, `scenes/QAWorld`, `scenes/ProjectEntry`는
`router.jsx`에도 등록되어 있지 않고 어떤 Link/Import에서도 참조되지 않는
완전한 고아 Placeholder였음을 확인하고 제거했다 (git 이력으로 복구
가능).

**2026-09-23 구조 정리 2차:** - `scenes/PowerUp/`은 사용자가 세션 중
`PowerUp.jsx`를 직접 삭제한 상태였고, Import/Route/Link 참조를 전수
확인한 뒤(참조: `router.jsx`의 import+Route, `Character.jsx`의
`Link to="/power-up"` 두 곳뿐, CSS/Asset 없음) 나머지 참조를 정리해
완전히 제거했다. `router.jsx`에서 `/power-up` Route와 import를 삭제하고,
`Character.jsx`의 Link를 `/world-map`으로 직접 연결해 Navigation 체인이
끊기지 않도록 했다 (`RealWorld → Character → PortfolioWorld`). -
`scenes/WorldMap/` → `scenes/PortfolioWorld/`로 폴더/파일/컴포넌트명을
rename했다 (`WorldMap.jsx` → `PortfolioWorld.jsx`, 함수명 `WorldMap` →
`PortfolioWorld`). PRD 권장대로 **Route URL `/world-map`은 그대로
유지**했다 (Route URL과 Component 이름은 동일할 필요 없음). - `Ending`,
`QuickView`는 참조가 0건으로 확인되었으나(Ending: Removed Scope와 내용
겹침, QuickView: SKILL.md LOCKED 문구와의 연관 모호) 사용자에게 직접
확인한 결과 **둘 다 KEEP FOR NOW**로 결정되어 삭제하지 않았다.

**2026-09-23 구조 정리 3차:** - `public/assets/images/`,
`public/assets/fonts/`(flat)를 목표 구조
`public/assets/production/images/<scene>/`, `production/fonts/`로
이동했다 (사용자 승인). 실제 Asset이 있는 Category(이미지
2개→`real-world/`, 폰트 6개)만 생성했고, `source/`나 아직 파일이 없는
`production/video`, `production/models`, `production/icons`,
`production/audio`는 생성하지 않았다. 참조 3곳(`RealWorld.css`
background, `RealWorld.jsx` img src, `index.css` Fredoka `@font-face`)을
함께 갱신하고 `npm run build`로 `dist` 결과물에 새 경로가 정상 반영됨을
확인했다. 기존 flat `images/`, `fonts/` 폴더(placeholder `.gitkeep`
포함)는 내용이 모두 이동해 제거했다. - **Contact + Final Experience 확정
사항 기록:** 사용자가 이번 라운드에서 Contact의 역할을 "단순 연락처"에서
"CONTACT + FINAL EXPERIENCE + CREDITS"로 확정했다고 전달했다. IA:
Intro/Contact Message → Contact Links(Email/ GitHub/Resume/Optional) →
Final Message → Credits/Staff Roll Concept → Back to Portfolio World.
`/contact`는 항상 Direct Access 가능해야 하며 Project 완료나 Game
Clear로 잠그지 않는다. **이번 라운드에서는 이 IA를 기록만 했고 실제
Contact 구현/디자인은 변경하지 않았다** (`pages/Contact/`는 여전히 최소
Placeholder). `scenes/Ending/`은 위 IA와 개념이 겹치지만 실제로 재사용
가능한 고유 Content/Data는 없음을 확인했다(`Ending.jsx`는
`pages/   Contact`를 그대로 import해 감싸고 "GAME CLEAR / STAFF ROLL"
헤딩만 추가하는 구조). Ending은 사용자 결정대로 KEEP FOR NOW 유지.

`scenes/`는 Cinematic/World/Character/Transition 중심, `pages/`는 실제
Portfolio Information 중심으로 사용한다. Scene과 Page를 무조건 1:1로
만들지 않는다.

**2026-09-28 구조 정리 4차 --- 외부에서 추가된 병렬 구현 정리:**

세션 밖에서 완전히 별도의(추정: OpenAI Sites 계열) 구현체 한 벌이 이
Repository에 통째로 추가됐다. `src/App.jsx`/`src/main.jsx`가
`./app/router.jsx` 대신 자체 `<Routes>`를 직접 정의하도록 덮어써져
있었고, `src/scenes/{Start, Character,PowerUp,WorldMap}.jsx`(flat),
`src/pages/{Content,Projects}.jsx` (flat), `src/components/WorldUI.jsx`,
`src/styles.css`, `src/data/content.js`, `server/higgsfield/`, `qa/`,
`scripts/postbuild.mjs`, `docs/`,
`AGENTS_FINAL.md`/`PROJECT_CONTEXT_FINAL.md`/`Personal-Portfolio_PRD_FINAL.md`
/`SKILL_FINAL.md`, `package.json`(이름 `junyoung-portfolio-world`로
변경, `gsap`/`three`/`framer-motion`/`lenis` 제거 + `@fontsource/*`
추가), 신규 media
asset(`public/assets/{room,portal,start-poster,world-sprites}.webp`,
`start-ambient.mp4`)이 함께 딸려 왔다. `AGENTS.md`/`CLAUDE.md`/
`DESIGN_SYSTEM.md`/`PROJECT_CONTEXT.md`/`README.md`/`SKILL.md`도 이
구현체의 문서(각각 `*_FINAL.md`를 가리키는 얇은 pointer)로 덮어써져
있었다.

**확인 결과:** `package.json`이 바뀌었지만 이 로컬 환경에서
`npm install`이 실행된 적이 없어 `node_modules`와 불일치했고, 실제로
`npm run build`가 `@fontsource/fredoka` 미설치로 실패하는 상태였다(그쪽
산출물의 "build 통과" 기록은 이 저장소 기준이 아니었음).

**사용자 결정 (2026-09-28):** 라우팅 구조는 기존 `router.jsx` + 폴더형
`scenes/`·`pages/`를 그대로 사용하고, 새로 온 구현체의 실제 텍스트
콘텐츠(`src/data/content.js`의
profile/projects/skills/faqs/destinations)만 가져와서 채운다. 시각
컴포넌트(`WorldUI.jsx`)·전용 CSS(`styles.css`)는 가져오지 않는다(기존
구조 디자인은 이번에 변경하지 않음).

**실행한 작업:** - `src/App.jsx`, `src/main.jsx`, `package.json`,
`package-lock.json`을 드롭 이전 커밋(`97343c5`) 기준으로 복원 ---
`AppRouter` 경유 구조와 `gsap`/`three`/`framer-motion`/`lenis` 의존성
복구. - `AGENTS.md`, `CLAUDE.md`, `DESIGN_SYSTEM.md`,
`PROJECT_CONTEXT.md`, `README.md`,
`.agents/skills/design-to-react/SKILL.md`도 같은 커밋 기준으로 복원한
뒤, 이 섹션에 오늘 실제 변경사항을 반영. - `src/data/content.js`는
그대로 유지하고, `pages/About`, `pages/Skills`, `pages/Projects`,
`pages/ProjectDetail`, `pages/QA`, `pages/Contact`,
`scenes/PortfolioWorld`가 이 데이터를 import해서 실제 콘텐츠(이름/직무/
소개, 프로젝트 4개 각각의 Problem/Decision/Implementation/Result/
Limitation, Skill 3분류, FAQ 6개, World Map 목적지 sub-label)를
렌더링하도록 채웠다. 기존에는 전부 `<h1>ABOUT</h1>` 같은 빈
Placeholder였다. - **`pages/Resume/Resume.jsx` 신규 추가 +
`router.jsx`에 `/resume` Route 추가.**
About/Skills/Projects×4/Q&A/Contact/**Resume**는 AGENTS.md· CLAUDE.md의
LOCKED 목록에 이미 포함돼 있었지만 기존 Router에는 Route가 없었던
항목이라 이번에 데이터 재사용으로 채워 넣었다. - 완전히 미참조로 확인된
신버전 전용 파일을 삭제:
`src/scenes/{Character,   PowerUp,Start,WorldMap}.jsx`(flat),
`src/pages/{Content,Projects}.jsx` (flat), `src/components/`,
`src/styles.css`, `scripts/`, `qa/`, `docs/audit/`, `docs/baseline/`,
`AGENTS_FINAL.md`, `PROJECT_CONTEXT_FINAL.md`,
`Personal-Portfolio_PRD_FINAL.md`, `SKILL_FINAL.md`, `.openai/`,
`public/assets/fonts/pretendard-{400,700}.woff2`(이미
`production/fonts/   pretendard-variable.woff2`와 중복). - **의도적으로
보존한 것(현재 미연동, 향후 판단용):**
`public/assets/{room,portal,start-poster,world-sprites}.webp`,
`start-ambient.mp4`(실사용자 제공 영상의 웹 변환본으로 추정, Real World
구현 시 재사용 가치 있음) / `server/higgsfield/`,
`docs/higgsfield-api.md`, `.env.example`(로컬 전용 에셋 생성 API, 현재
`package.json`에 구동 script·의존성이 연결돼 있지 않아 지금은 비활성
상태) / `docs/font-licenses/` (참고용 라이선스 텍스트). 이 항목들은 현재
App에서 import되지 않는다.

------------------------------------------------------------------------

## 06. Current Routes

2026-09-23 구조 정리 2차 후 `src/app/router.jsx` 실제 상태:

``` text
/                     → RealWorld
/character            → Character            (Legacy 이름, 실제 Nav 경로로 사용 중 — KEEP)
/world-map            → PortfolioWorld        (2026-09-23 WorldMap에서 rename, URL은 유지)
/projects             → Projects
/projects/:projectId  → ProjectDetail
/about                → About
/skills               → Skills
/qa                   → QA
/contact               → Contact
/quick-view            → QuickView             (참조 0건이지만 사용자 결정으로 KEEP)
/resume               → Resume                 (2026-09-28 신규 추가 — LOCKED 목록에 있었으나 Route 없던 항목)
/ending               → Ending                 (참조 0건이지만 사용자 결정으로 KEEP)
```

`/power-up`은 2026-09-23 실제 참조(router import+Route,
`Character.jsx`의 Link 1곳)를 모두 확인한 뒤 제거했다. `Character.jsx`의
Link는 `/world-map`으로 직접 연결해 Navigation
체인(`RealWorld → Character → PortfolioWorld → About/Skills/Projects/QA/Contact`)이
끊기지 않도록 했다.

`/character`는 이름은 Legacy Concept과 겹치지만 `RealWorld.jsx`의 실제
Link 대상이라 삭제하지 않았다. `/ending`, `/quick-view`는 참조가 없지만
사용자가 직접 KEEP으로 결정했다.

PRD의 현재 권장 정보 Route: `/`, `/about`, `/skills`, `/world-map`,
`/projects`, `/projects/:projectId`, `/qa`, `/contact`. 실제 Route는 이
권장안에 `/character`, `/ending`, `/quick-view`가 추가로 남아 있는
상태다.

기존 Route를 문서만 보고 즉시 삭제하지 않는다.

------------------------------------------------------------------------

## 07. Fonts

2026-09-23 실제 코드 검색 결과, 2026-09-28 5차-1에서 갱신:

  Font F                      ile 실                                            제 사용 Cla                                 ssification
  --------------------------- ------------------------------------------------- ------------------------------------------- --------------------------------------------------------------------------------------
  Fredoka                     `fredoka-variable.ttf`                            `index.css` @font-face + `RealWorld.css`    의 `--display` var (`h1`) 실사용 KEEP (RealWorld Start 신버전 이식에서 계속 사용)
  Pretendard (정적 서브셋)    `pretendard-400.woff2`, `pretendard-700.woff2`    2026-09-28 5차-1 추가. `index.css` @font    -face + `RealWorld.css`의 기본 `font-family` 실사용 KEEP --- 원본 신버전 그대로 이식
  Pretendard Variable         `pretendard-variable.woff2`                       파일만 존재, `@font-face` 선언 없음, 어디   서도 미적용 미연결 --- Design System Primary(Variable) 적용은 여전히 별도 작업 필요
  Instrument Serif            없음                                              Repository에 Font 파일 자체가 없음          Asset 없음 --- 임의 다운로드하지 않음, 필요 시 별도 확보
  Silkscreen (Regular/Bold)   `silkscreen-regular.ttf`, `silkscreen-bold.ttf`   `@font-face`/`font-family` 참조 전혀 없     음 UNUSED / REMOVE CANDIDATE
  RetroMario                  `retromario-regular.otf`                          참조 없음                                   UNUSED / REMOVE CANDIDATE
  SuperMario256               `supermario256.ttf`                               참조 없음                                   UNUSED / REMOVE CANDIDATE

Fredoka와 Pretendard 정적 서브셋은 둘 다 Design System의 최종 기준
(Pretendard Variable + Instrument Serif)이 아니지만, RealWorld Start
신버전 이식이 실제로 사용 중이라 KEEP. Design System 최종 폰트 적용은
Real World 디자인이 확정된 이후 별도 작업으로 진행한다.

Silkscreen/RetroMario/SuperMario256은 코드 어디에서도 참조가 없어 REMOVE
CANDIDATE로 분류했으나, 이번 구조 정리 작업에서는 실제로 삭제하지 않고
상태만 기록했다(사용자 확인 필요).

------------------------------------------------------------------------

## 08. Asset State & Target Architecture

2026-09-23 3차 구조 정리에서 실제 파일 시스템 기준으로 재확인 및 이동
완료.

현재 실제 구조:

``` text
public/assets/
├─ backgrounds/                 (.gitkeep만, 실제 Asset 없음)
├─ characters/                  (.gitkeep만, 실제 Asset 없음)
├─ icons/                       (.gitkeep만, 실제 Asset 없음)
└─ production/
   ├─ images/real-world/
   │  ├─ main.png                (RealWorld.css 배경으로 사용 중)
   │  └─ main-title.png          (RealWorld.jsx 타이틀 이미지로 사용 중)
   └─ fonts/
      ├─ pretendard-variable.woff2   (미연결)
      ├─ fredoka-variable.ttf        (사용 중)
      ├─ silkscreen-regular.ttf      (미사용)
      ├─ silkscreen-bold.ttf         (미사용)
      ├─ retromario-regular.otf      (미사용)
      └─ supermario256.ttf           (미사용)
```

목표(최종) Asset 구조:

``` text
public/assets/
├─ source/
│  ├─ original/
│  ├─ higgsfield/
│  ├─ astra/
│  └─ blender/
└─ production/
   ├─ images/
   │  ├─ real-world/      ← 구현 완료 (2026-09-23)
   │  ├─ portal/
   │  ├─ portfolio-world/
   │  ├─ skills/
   │  ├─ projects/
   │  ├─ contact/
   │  └─ common/
   ├─ video/
   ├─ models/
   ├─ icons/
   ├─ audio/
   └─ fonts/              ← 구현 완료 (2026-09-23)
```

`source/`와 아직 실제 Asset이 없는 `production/video`,
`production/models`, `production/icons`, `production/audio`, 그리고
`images/`의 나머지 scene별 하위 폴더(portal, portfolio-world, skills,
projects, contact, common)는 실제 Asset이 생기기 전까지 생성하지 않는다.

Naming: lowercase / kebab-case / English / no spaces.\
Image WebP/AVIF, Video WebM(+필요 시 MP4), 3D GLB, Icon SVG, Font WOFF2
우선. 기존 `main.png`/`main-title.png`/폰트 파일들은 아직 PNG/TTF/OTF
원본 형식 그대로이며, 이번 작업에서는 위치만 이동했고 포맷 변환/재압축은
하지 않았다(Real World 디자인이 확정되지 않아 재작업 범위 밖).

------------------------------------------------------------------------

## 09. Implementation Status

### Confirmed Foundation

-   React + Vite 프로젝트
-   Git / GitHub 연결
-   React Router 구조
-   `src/scenes/`, `src/pages/`, `src/app/router.jsx`
-   About / Skills / Projects / QA / Contact Page 골격
-   ProjectDetail Page 골격
-   기존 Font/Image Asset 일부

### Documentation / Planning Confirmed

-   PRD 현재 방향 재정리
-   Design System 최신 방향 정리
-   Responsive Architecture 상세화
-   Real World 방향 확정

### NOT IMPLEMENTATION COMPLETE

Real World 최종 화면, Portal Awakening/Open/Suction, Tool Universe,
Transformation, Arrival, Portfolio World 최종 디자인,
About/Skills/Projects 최종 디자인, Character Movement, Project Archive,
Case Study 최종 콘텐츠, Q&A/Contact 최종 디자인, Responsive 전체 QA,
Reduced Motion, Asset Failure Fallback, Performance Optimization.

기획이 존재한다는 이유로 구현 완료라고 기록하지 않는다.

------------------------------------------------------------------------

## 10. Legacy Concepts --- Do Not Restore Automatically

현재 제거되었거나 더 이상 확정 요구사항이 아닌 항목: - POWER UP
Gameplay - Skill Block / Item Pickup Loop - Skill Acquired Progress -
Skill Level / XP / HP / Life / Score - 의미 없는 Achievement - Secret
Area - Companion System - Player Badge - Portfolio World WASD 자유
이동 - 필수 Jump / Collision - Stage Clear 중심 Journey - Mission
Gameplay - Game Clear 중심 Ending - Adventure Book을 필수 Portfolio OS로
만드는 구조

Legacy Folder/Route/Code가 남아 있어도 자동 복원하지 않는다.

------------------------------------------------------------------------

## 11. Responsive Baseline

``` text
Wide              ≥1920
Desktop           1280–1919
Compact Desktop   1024–1279
Tablet            768–1023
Mobile            <768
```

Primary: Desktop `1440×810`, Mobile `430×932`.

QA: `2560×1440`, `1920×1080`, `1440×810`, `1366×768`, `1180×820`,
`1024×768`, `768×1024`, `430×932`, `402×874`, `390×844`, `360×800`.

Boundary: `767/768`, `1023/1024`, `1279/1280`, `1919/1920`.

이 Matrix는 요구사항이며 실제 전체 검증 완료를 의미하지 않는다. Real
World 외 세부 Responsive Composition은 각 화면 디자인 확정 후
구현/검증한다.

------------------------------------------------------------------------

## 12. Accessibility / Fallback Baseline

요구사항: Semantic HTML, Keyboard Navigation, focus-visible, 약 44×44px
이상 Touch Target, 충분한 Contrast, Color-only State 금지, Alt Text,
Reduced Motion, Skip Cinematic, Direct Content Access, 200% Zoom,
Video/Three.js/Character/Transition fallback.

현재 전체 기능의 실제 구현 여부는 Browser QA 전까지 완료로 기록하지
않는다.

------------------------------------------------------------------------

## 13. Creative / Technical Tool Direction

React/CSS: Portfolio Content, UI, Navigation, Responsive Layout,
Accessibility, State, Simple Interaction.

Three.js 후보: Portfolio World, Camera, 3D Environment, Waterfall/World
Object, Character/Model, Atmospheric FX. 적용 범위는 화면 디자인 확정 후
결정.

Higgsfield 후보: Real World Cinematic, Portal, Complex Character Motion,
Suction, Cinematic Transition, Video FX source.

Astra/Blender: Asset/3D 제작 Workflow에 활용 가능하며 실제 범위는 제작
단계에서 결정.

**Motion Ownership:** 하나의 움직임은 하나의 시스템이 소유한다. 예:
UI→CSS/GSAP, World Camera→Three.js, Complex Cinema→Higgsfield, 3D
Asset→Blender/Astra workflow.

------------------------------------------------------------------------

## 14. Current Development Priority

``` text
1. Documentation baseline
2. Real World
3. Portal transition
4. Tool Universe / Transformation
5. Arrival
6. Portfolio World
7. Remaining content
8. Responsive / Accessibility / Performance QA
```

Immediate Focus는 **Real World 완성**.

권장 순서:
`Real World Desktop Default → Hero/Navigation → Background/Media → Ambient → ENTER WORLD → Focus/DOF → Portal Awakening → Portal Video → Reduced Motion/Skip → Desktop QA → Tablet/Mobile`.

About / Skills / Projects 등의 세부 이동과 디자인은 아직 확정하지
않는다.

------------------------------------------------------------------------

## 15. Known Issues / Audit Required

**2026-09-23 구조 Audit로 해소된 항목:** - `Mission/`, `StageClear/`,
`QAWorld/`, `ProjectEntry/` → 참조 없음 확인 후 제거. - `main title.png`
→ `main-title.png`로 rename, `RealWorld.jsx` 참조 갱신. - `PowerUp/` →
참조(router import+Route, `Character.jsx` Link 1곳) 전수 확인 후 제거.
`Character.jsx` Link를 `/world-map`으로 직접 연결. - `WorldMap/` →
`PortfolioWorld/`로 rename (Route URL `/world-map`은 유지). - `/ending`,
`/quick-view` 유지 여부를 사용자에게 직접 확인 → 둘 다 KEEP. - Font 실제
사용처 확인 (07번 참고). - `git status` / lint / build 확인 완료 (16번
참고).

**여전히 확인/결정이 필요한 항목:** - **문서 불일치:**
`AGENTS.md`/`CLAUDE.md`/`SKILL.md`가 Source of Truth로 지정한
`Personal-Portfolio_PRD_FINAL.md`가 Repository에 존재하지 않는다. 실제
파일은 `Personal-Portfolio_PRD.md`("PRD v3", untracked)다. 파일명을
맞출지 문서 참조를 고칠지는 제품 문서 결정이라 이번 구조 정리에서 임의로
처리하지 않았다. - **RealWorld 실제 구현 vs 문서 방향 불일치:**
`RealWorld.jsx`는 현재 Seoul Night Workspace/ENTER WORLD가 아니라
"WELCOME TO ... START GAME" 형태의 이전 게임 컨셉으로 구현되어 있고,
`Character`→`PortfolioWorld` 체인이 About/Skills/Projects/QA/Contact로
가는 유일한 인앱 Navigation 경로다. 문서상 LOCKED된 Real World 방향과
실제 코드가 다르지만, 이번 작업 범위(구조 정리, 디자인/콘텐츠 변경
금지)상 수정하지 않았다. - **`/character`, `/ending` 라우트:**
`router.jsx`에 등록되어 있으나 앱 내 어디에서도 Link로 연결되지
않는다(Direct URL로만 접근 가능) --- 5차 RealWorld 교체로
`ENTER WORLD`가 `/world-map`으로 직접 이동하면서 `/character`도 이때
링크가 끊겼다. `Ending`의 "GAME CLEAR / STAFF ROLL" 내용은 PRD의 Removed
Scope와 겹친다. 2026-09-28에 사용자에게 다시 확인 → **KEEP FOR NOW로
재확정**. - **`/quick-view` 라우트:** 2026-09-23엔 참조 0건이었으나,
5차-2(전역 헤더 추가)에서 `RealWorld`의 `DIRECT ACCESS` 버튼과 헤더 메뉴
모달의 `DIRECT ACCESS` 링크가 실제로 이 경로를 가리키게 되어 **이제
실사용 중**이다. 다만 `QuickView.jsx` 자체는 여전히 빈 Placeholder라
실제 콘텐츠는 없다. - **Pretendard Variable:** 파일은 존재하지만
`@font-face` 선언이 없어 실제로 로드되지 않는다(실제로는 정적 서브셋
`pretendard-400/700.woff2`가 RealWorld에 연결되어 사용 중, 07번 참고). -
**Instrument Serif:** Font Asset이 Repository에 없다. 임의로 다운로드
하지 않았다. - **Silkscreen/RetroMario/SuperMario256:** 코드 참조
없음(REMOVE CANDIDATE). 2026-09-28에 사용자에게 재확인 → KEEP FOR NOW. -
**RealWorld의 구 Asset 미사용화:** `main.png`, `main-title.png`도 5차
RealWorld 교체 이후 미사용(REMOVE CANDIDATE). 2026-09-28에 사용자 확인 →
KEEP FOR NOW. - **`portal.webp`, `room.webp`, `world-sprites.webp`:**
4차에서 보존한 신버전 Asset 중 실제로 RealWorld 포팅에 쓰인 건
`start-ambient.mp4`/ `start-poster.webp`뿐이고 이 3개는 미사용(REMOVE
CANDIDATE). 2026-09-28 사용자 확인 → KEEP FOR NOW. - **Asset 목표
구조(source/production) 미적용:** 현재 `public/assets/`는
`production/`만 일부 적용되어 있고(images/real-world, fonts) `source/`는
아직 없다. Real World 구현이 본격화될 때 다시 판단한다. - **2026-09-28
Higgsfield 도구 제거:** `server/higgsfield/`, `docs/higgsfield-api.md`,
`.env.example`은 `package.json`에 구동 script·의존성이 연결되지 않아
완전히 죽은 코드 상태였다. 사용자 확인 후
제거했다(`docs/font-licenses/`는 무해한 참고 자료라 유지).

확인 전에는 삭제/완료로 기록하지 않는다.

------------------------------------------------------------------------

## 16. Git / Verification State

과거 Context의 Commit/Clean Working Tree 기록은 현재 상태로 간주하지
않는다.

작업 시작:

``` bash
git status
git branch --show-current
```

검증 후:

``` bash
npm run lint
npm run build
```

실제 실행하지 않았다면 통과했다고 기록하지 않는다.

**2026-09-23 구조 정리 1차 실제 검증 결과:** - `npm run lint` → 에러
없음 (변경 전/후 모두 통과) - `npm run build` → 성공 (`vite build`, 38
modules transformed, 에러 없음)

**2026-09-23 구조 정리 2차(PowerUp 제거 + WorldMap→PortfolioWorld
rename) 실제 검증 결과:** - `npm run lint` → 에러 없음 - `npm run build`
→ 성공 (`vite build`, 37 modules transformed, 에러 없음)

**2026-09-23 구조 정리 3차(Asset production/ 이동) 실제 검증 결과:** -
`npm run lint` → 에러 없음 - `npm run build` → 성공 (`vite build`, 37
modules transformed, 에러 없음) -
`dist/assets/production/images/real-world/`,
`dist/assets/production/fonts/` 경로에 이동된 8개 파일이 정상적으로 빌드
결과물에 포함됨을 `find`로 확인 - 코드 전체에서 구
경로(`/assets/images/`, `/assets/fonts/`) 잔존 참조 0건 확인 (Grep) -
`npm run dev` / Browser 수동 확인(Direct URL, Refresh, Back/Forward,
실제 이미지·폰트 렌더링)은 이번 작업에서 실행하지 않았다 (미검증).

**2026-09-28 구조 정리 4차(외부 병렬 구현 정리 + 콘텐츠 이식) 실제 검증
결과:** - 정리 시작 시점 `npm run build` →
**실패**(`@fontsource/fredoka` 미설치, 새 `package.json`과
`node_modules` 불일치) --- 실제로 확인 후 기록. -
`App.jsx`/`main.jsx`/`package.json`/`package-lock.json` 복원 직후
`npm run lint` → 에러 없음, `npm run build` → 성공(39 modules). - 신버전
전용 파일 삭제 후 `npm run lint` → 에러 없음, `npm run build` → 성공(39
modules, 에러 없음). - `npm run dev` / Browser 수동 확인(Direct URL,
Refresh, Back/Forward, `/resume` 포함 전체 Route, Reduced Motion,
Responsive)은 이번 작업에서 실행하지 않았다 (미검증).

------------------------------------------------------------------------

## 17. Next Work

Documentation: 1. `PROJECT_CONTEXT.md` 갱신 2. `AGENTS.md` 3.
`CLAUDE.md` 4. `SKILL.md` 5. `README.md`

Implementation은 문서 정리 후 Real World부터 진행한다. Legacy
Folder/Route 정리는 실제 코드 Audit 후 별도 작업으로 진행한다.

------------------------------------------------------------------------

## 18. PROJECT_CONTEXT Update Rule

이 파일은 **현재 실제 상태만 기록**한다.

기록: 실제 Repository 구조, Route, 설치 Library, Asset 상태, 완료 기능,
구현 중 기능, 알려진 문제, 중요한 확정 Decision, 실제 검증 결과.

기록하지 않음: 계획만 존재하는 기능을 완료로 표현, WORKING 디자인을
확정으로 표현, 추측, 실행하지 않은 QA, 존재 여부를 확인하지 않은
Asset/Library.

Route, Scene architecture, Asset strategy, 주요 구현 상태, 중요한
Decision, 검증 상태가 바뀔 때 갱신한다. 사소한 CSS/Spacing 수정마다
업데이트하지 않는다.

## Projects Gallery implementation --- 2026-09-28

User-authorized `/projects` gallery enhancement: daylight sky atrium,
independent project sculptures and light plaques,
GalleryHUD/ProjectPedestal components, bounded WASD/arrow and floor tap
movement, proximity/E/Enter selection, pointer preview, project HUD and
case-study CTA. Existing content and routes retained. Shared motion
pause/reduced-motion supported. This is scene-specific user-authorized
movement; it does not lock general Portfolio World movement or other
WORKING designs.

Lint/build pass. Headless Edge validated movement, four selections,
proximity/E under reduced motion, detail route/back and pause. 17
viewport overflow checks passed; visual review 1440×810 and 430×932. See
`docs/projects-gallery-implementation.md` and
`docs/projects-gallery-qa.json` for asset provenance, exact QA and
limitations. Background remains raster architecture with independent
ambient overlays; existing project sculptures remain conceptual assets.

About v3: background reconstructed directly from supplied reference with
text/UI/people removed; larger seated character, closer reference
proportions and right-aligned narrow panel. See about-archive.md.

## 2026-09-29 --- About reference implementation resumed

User authorized continuation after About was reverted. Restored
standalone /about scene, shared header, DOM four-tab archive,
reference-derived text-free atelier-v3 background, and separate seated
existing-identity character v2. Rebuilt About.css with viewport-height
desktop and compact paged-profile mobile layouts. No changes to other
page content or locked decisions. 16 viewport sizes (360 to 2560 wide)
have no page overflow. Initial 1366/1024 x768 content overlaps were
corrected and all four tabs retested. Keyboard arrows and reduced motion
pass; lint/build pass. Real devices/Safari and 200% browser zoom are not
verified. See docs/layered-world/about-final-qa.json.

## 2026-09-29 --- Profile panel reference detail

About panel now uses fragmented multi-line cyan/gold SVG frame, animated
short edge highlights, compass ornaments, subtle celestial linework,
enlarged portrait, stepped gold section dividers and double diamond
icons. Panel-only Pretendard typography matches the supplied UI
reference; page typography retained. Traits remain qualitative (equal
decorative rules, no numeric ratings). Tabs moved to footer; View My
Story activates Journey. Nonblocking Archive Unlocked notice has a real
OK dismissal and can be replayed from the Portfolio header button.
Background/character untouched.

Panel validation: lint and production build passed. All four tabs
checked at 2560x1440, 1920x1080, 1440x810, 1366x768, 1180x820, 1024x768,
768x1024, 430x932, 402x874, 390x844 and 360x800: no document scroll or
content overlap with footer tabs. Replay/OK, View My Story to Journey,
and reduced-motion edge animation checked. Working visual iteration; no
LOCKED decision changed. Exact pixel parity with reference is not
claimed; original character and qualitative traits retained.

## 2026-09-29 --- Water transparency compatibility fix

User reported opaque white rectangular waterfall overlays on
desktop/mobile. Local headless Edge did not reproduce the
driver-specific artifact; replaced the world island WebGL water
compositor with SVG alpha gradients, tapered flow paths and CSS-owned
flow animation to remove this rendering dependency. Existing island art,
waterfall coordinates/lengths, hover speed, motion pause and reduced
motion are retained. Updated FlowingWater.jsx, WorldAtmosphere.css and
qa/water-shader-check.cjs (now exercises SVG water). Lint/build passed.
Five viewports (1440x810, 1024x768, 430x932, 390x844, 360x800), no-WebGL
operation, flow/pause/reduced motion and direct/back/reload passed.
Desktop and mobile screenshots inspected. Physical mobile devices and
the user's exact GPU remain unverified; no Locked decisions changed.

## 2026-09-29 --- Skills object-first HUD revision

User requested a quieter background, real DOM text, game-inspired
controls, a jewel bag selector, removal of Skills top navigation, and
continuous orbit. Preserved the existing text-free temple image and
applied reduced brightness/saturation plus a navy veil; core and crystal
layers remain independent and bright. All titles and descriptions remain
HTML. Skills alone hides shared menu links while retaining brand and an
explicit world-map return. New SkillInventory uses a keyboard-accessible
disclosure with eight logo jewel slots and existing factual detail
content. Controls use keycaps and gold/navy framing; mobile uses touch
guidance. Orbit no longer pauses on incidental hover and updates
compositor transforms rather than left/top; equal-arc spacing and
selected focus remain. No new packages/assets or Locked decision
changes. Files: Skills.jsx, useSkillOrbit.js, SkillInventory.jsx,
SkillHUD.css, App.jsx, PageHeader.jsx. Existing routes, character
movement and project data retained. npm run lint/build passed.
qa/skills-hud-check.cjs verified 12 sizes (360--2560 wide), all
inventory slots visible, selection/Escape/focus restoration, hover orbit
continuity (90 frames; max sampled step 0.15px), motion pause/reduced
motion, WASD, direct/back/reload and world return. Desktop and mobile
screenshots inspected. Actual handheld hardware, Safari and
long-duration full-orbit performance remain unverified. Report:
docs/layered-world/skills-hud-qa.json.

## 2026-09-29 --- Celestial Skills and pouch release

User requested an actual new crystal/orbit background rather than
dimming the old temple, removal of intro/core/orbit labels, physical
leather pouch and sequential entry release. New text-free
observatory-v2.webp replaces temple.webp; no dimming overlay. New
transparent leather-pouch.webp uses supplied brown drawstring reference.
Both generated with imagegen; source files retained in Codex
generated_images (exec-2b5e60c7-eaf2-427e-9f79-34cfca04a3eb.png and
exec-ec290dba-801c-46ff-9995-a58122ccff49.png). Production conversions
in public/assets/production/images/skill-chamber. Background prompt:
serene celestial observatory, uncluttered blue-violet sky, circular
brass-inlaid platform, no text/UI/people/crystals. Pouch prompt:
faithful chestnut drawstring leather silhouette, true alpha, no
lettering/emblems. useSkillOrbit owns both staggered pouch-to-orbit
launch (0.2s stagger, 1.2s flight) and continuous orbit. Eight jewels
remain visible on mobile. Reduced motion or immediate selection bypasses
entry. Accessible names and detail content preserved; only visible scene
labels/intro removed. Controls now show movement and activation only.
Pouch retains real inventory disclosure and asset failure text fallback.
No new dependency or Locked decision changes. Validation:
qa/skills-entry-check.cjs covers staggered launch, orbit continuation,
12 viewports, reduced-motion immediate availability, inventory
selection/Escape focus, removed visible labels and pouch-image-failure
recovery. Desktop/mobile screenshots visually reviewed. Physical
devices/Safari remain unverified.

## 2026-09-29 --- Unfolding pouch and platform boundary

Replaced photographic pouch button with independent navy/gold SVG cloth
flaps, opening sparkle and collection unfold transition. Existing
inventory/select/focus behavior and entry origin retained. New
useSkillFloor projects a safe ellipse through the background's actual
object-fit cover crop into stage coordinates. Skill keyboard, click
targets and reduced-motion steps are constrained by the same ellipse;
character starts on the platform. Shared gallery movement gains optional
constrain callback with identity default, so Projects defaults are
unchanged. Files: SkillInventory.jsx, SkillHUD.css, Skills.jsx,
useSkillFloor.js, useGalleryWalk.js. Lint/build passed.
qa/skills-floor-check.cjs verified 384 directional inputs and inventory
selection at 1440x810, 941x963, 390x844; image-relative feet stayed
within safe ellipse. Desktop screenshot inspected. Physical
devices/Safari not verified. No Locked decisions changed.

## 2026-09-29 --- Core release, resonance and item chest

Entry jewels now originate at the central crystal (50%,40%) instead of
inventory. Central crystal is a keyboard/click button: each activation
restarts a brief expanding ring and eight local jewel vibrations; orbit
transforms keep their existing JS owner. Reduced motion suppresses both
effects. SVG item chest replaces pouch artwork, with lifting lid when
collection opens. SkillInventory, Skills, useSkillOrbit and SkillHUD.css
changed; movement boundary/content/routes unchanged. Desktop 1440x810
and mobile 390x844 click/Enter/repeat activation, eight responses,
inventory selection and reduced motion passed. Lint/build passed;
desktop screenshot reviewed. Physical devices unverified; Working
decisions unchanged. \## 2026-09-29 --- Skill Nexus reference redesign
(Working)

User explicitly authorized the attached Skill Nexus interaction brief.
Skills now uses a text-free celestial castle environment with live HTML
title, skill labels, contextual E prompt and detail UI. Existing eight
factual tools and project associations are preserved; Photoshop/Claude
in the reference were examples, not verified additions. Shared character
controller and route structure retained. Chest is no longer rendered in
the new scene; its component/assets remain available.

Platform projections provide eight reachable skill interaction points,
one core point and a world return portal. Only the nearest target within
range shows E. Mouse and keyboard buttons use the same skill activation.
Core click/E produces a 2.6-second network burst with staggered jewel
pulses; nearby targets illuminate SVG network paths. Mobile retains all
eight tap targets and bottom-sheet details, hiding desktop controls.
Reduced motion keeps immediate access and disables animated effects. The
design remains Working, not Locked.

Files: Skills.jsx, useSkillOrbit.js, useSkillFloor.js, new
SkillNexus.css and nexusLayout.js. Asset:
public/assets/production/images/skill-chamber/nexus-environment-v3.webp.
Background is raster architecture only; all interface text/logos, gems,
character, paths and controls are independent DOM/SVG layers. Built-in
imagegen used with supplied screenshot as reference. Prompt: text-free
16:9 blue-violet galaxy, upper-right moon, ornate castles/waterfalls at
edges, gold gothic framing, blank navy banners and blue lamps;
foreground circular marble platform centered at 50%,80%, brass inlay and
walkway; open central sky; exclude ALL
text/logos/UI/gems/core/orbits/character. Generated source
exec-a1a67f8c-6618-468b-814b-fa98cf9ec69f.png, converted to WebP quality
88.

Validation: lint/build passed. Headless Edge at
2560x1440,1920x1080,1440x810,1366x768,1180x820,1024x768,768x1024,430x932,402x874,390x844,360x800,767x900,1023x900,1279x900,1280x900,1919x1080:
no horizontal overflow and all eight gems visible. Tested each ground
projection + E/detail, Escape, initial W without prior click, core E and
timeout reset, portal E/navigation, mobile direct selection and reduced
motion. Desktop/mobile screenshots visually reviewed. Script
qa/skills-nexus-check.cjs. Actual mobile hardware, Safari and 200% zoom
are unverified.

## 2026-09-29 --- Ground crystals join the orbit on activation (Working)

User explicitly requested replacing small floor projections with the
actual gems. All eight now start on the platform. E near an unlinked
gem, direct click/tap or keyboard button activation adds that gem to the
orbit and opens its existing factual detail. Core activation preserves
resonance and collects remaining gems together. Linked gems leave
proximity candidates; only one selected/hovered/nearby gem receives
emphasis while others fade to 38%. Ground labels have dark backplates.
Mobile uses two separated rows of tappable gems. Collection is local to
the current visit, resets on reload, and does not gate access to content
or introduce scores/achievements. Existing character boundary/controller
and project data retained; remains Working.

Changed Skills.jsx, useSkillOrbit.js, SkillNexus.css, nexusLayout.js.
Removed duplicate floor markers from rendering. Motion now interpolates
from each gem's actual ground position to the current orbit; reduced
motion places immediately. Tests: qa/skills-pickup-check.cjs passed E
pickup, one nearby target, correct detail, all-gem core activation,
reduced motion and no overflow at widths 360/390/430/768/1024/1440/1920
(height900). Additional normal-motion checks at1440x810 and390x844
passed initial ground state, single/all collection and mobile tap;
screenshots inspected. Lint/build passed. Physical devices and Safari
unverified. Previous projection-specific nexus QA script is superseded
by pickup QA for this behavior.

## 2026-09-29 --- Skills detail archive frame (Working)

Reworked the existing skill aside to match the supplied navy/cyan/gold
reference using independent SVG double contours and corner light rails.
Content remains HTML and factual tool/project data is unchanged. New
SkillDetail.css: 32px desktop content inset, 24px mobile inset, 8px
rhythm, 24px section separation, 44px controls. Outer decorative frame
remains fixed while inner content scrolls. Mobile retains bottom sheet.
No new achievement popup or fabricated traits added. Skills.jsx adds
decorative frame and archive heading. Lint/build passed; Edge checked
1440x810,1000x963,390x844 for correct padding, no internal horizontal
overflow and Escape close. Screenshot reviewed at1000x963. Physical
devices/Safari not checked.

## 2026-09-29 --- Compact hologram skill details

User approved the transparent cyan hologram direction and requested
stronger readability. SkillDetail.css now caps panel height at460px
(with viewport limits), uses24px padding and16px gaps, thin cyan glass
frame/corner highlights and a brief logo-ring alignment. Skills.jsx
provides explanation/project view buttons with aria-pressed and
controlled hidden sections; factual content remains unchanged. Body uses
existing Pretendard Variable for readable14px text and bright ivory/cyan
on dark translucent navy. Header/footer remain visible while long
content scrolls. Checked1440x810,1000x963,390x844,360x800: height460, no
horizontal overflow, both views and Escape passed. Screenshot at1000
reviewed. Lint/build passed before removing redundant capabilities
caption to give ordinary descriptions more space. Physical
hardware/Safari unverified. Working status unchanged.

## 2026-09-29 --- Selected gem display and readability

Skills detail now displays the selected gem beside the panel (above its
edge on compact/mobile layouts), with a slow CSS Y-axis rotation of its
existing raster shell and a stable readable logo. Original selected
orbit button is hidden while details are open and restored on close.
This is a 2.5D visual, not a new 3D asset. Added localized background
shading, stronger panel opacity, 15px desktop/14px mobile body, brighter
secondary labels and cyan borders. Buttons/project links share
hover/focus fill, border, subtle glow and 1px lift; reduced motion
disables rotation. Existing content and navigation retained. Lint/build
passed; Edge1440x810,1000x963,390x844 checked display bounds, hover and
Escape removal; compact screenshot inspected and gem moved up to avoid
the core. Physical devices unverified.

## 2026-09-29 --- Continuous gem return and system-window signal treatment

Removed the decorative duplicate gem; the same interactive crystal now
eases between the panel-side anchor and its live orbit through
useSkillOrbit. Closing no longer swaps hidden/original nodes. Frame uses
blue segmented rails, faint static scanlines, and brief localized signal
jitter every7seconds; readable body remains stationary. Existing
tabs/content/padding and460px height retained. Reduced motion suppresses
signal/rotation and uses immediate placement. Lint/build passed.
Edge1000x963 measured no close-time teleport and subsequent return
movement, keyboard reopen and reduced-motion effect suppression.
Automatic pointer locator on continuously moving orbit did not settle;
keyboard route verified instead. Other viewport/device QA not repeated
this revision. Working unchanged.

## 2026-09-29 --- Contact celebration jump (Working)

ContactLookout now swaps full-body idle/jump poses during a 760ms
anticipation, flight, and landing timeline. One arm reaches upward and
both knees bend in the new transparent sprite. Card hover and keyboard
focus trigger it; rapid changes cancel the prior timeline. Reduced
motion/paused state and failed sprite loading keep the idle pose.
Existing card links and Q&A unchanged. Contact.jsx/Contact.css and
character-jump-v1.webp changed. Lint/build passed. Edge automated
at1440x810 and390x844 confirmed flight pose and landing; reduced-motion
suppression passed. Desktop screenshot reviewed. Physical devices/Safari
unverified. Asset generated with built-in imagegen from
project-gallery/character/front-idle.webp; saved
public/assets/production/images/contact/character-jump-v1.webp. Final
prompt: Create a single transparent cutout game character sprite of
EXACTLY the same young male character in the reference: identical face,
tousled dark hair, dark charcoal jacket with brass details, white
undershirt, cargo pants, black backpack, black and white sneakers, same
chibi proportions and high quality rendering. Change ONLY pose to an
energetic airborne celebration jump: one arm fully thrust upward with a
fist, the other arm bent outward for balance, both knees visibly bent
with one lower leg kicked backward. Front facing slightly three quarter.
Full body including raised fist and shoes entirely inside canvas,
centered. NO ground, NO shadow, NO background, NO text. True transparent
alpha background. Maintain character identity and outfit. One character
only.

## 2026-09-29 --- Contact letter form and sunset atmosphere (Working)

User requests implementation only; no delivery service configured. Added
centered hash-addressable Email dialog with live labels/name/reply
email/subject/message, browser validation, pending/error/success states,
timeout and configurable public JSON endpoint. Unconfigured submit
honestly reports no message sent. Setup:
docs/layered-world/contact-email-setup.md. Contact header navigation
removed via existing showNavigation prop; brand link and existing
destinations remain. Reused cloud/airship assets plus warm light,
distant SVG birds and drifting leaves; reduced/shared pause/hidden state
freezes ambient. Character body now animates separately from its ground
shadow, with smaller matched jump sizing and earlier landing pose
transition. Rapid hover switches cannot restart it mid-flight. Existing
content, routes, Q&A and Working status retained. Files:
Contact.jsx/Contact.css, ContactEmail.jsx, ContactAtmosphere.jsx,
App.jsx. Lint/build passed before final hover throttling; final check
follows. Edge1440x810,390x844,360x800 verified modal, absence of top
nav, no-config message, Escape, idle restoration and reduced motion;
screenshots inspected. Mocked500 retained draft then mocked200 success
cleared form; no actual mail sent. Physical devices/Safari, 200% zoom
and all breakpoint sizes not tested this revision.

## 2026-09-29 --- Compass atlas navigation (Working)

Removed persistent world-control-guide markup, preserving movement
controls. Compass now opens a native modal atlas with parchment folds,
existing four island assets, emphasized Projects, cyan animated route
and directional rose. Hover/focus raises one island; links navigate
directly. All text is HTML/SVG, none baked into art. Mobile uses a
scrollable destination grid. Escape/backdrop/close restore focus; shared
reduced/paused state disables atlas animation. New WorldAtlas.jsx/css;
WorldHUD.jsx and WorldControls.jsx updated. Existing scenes/content
retained, no new locked decisions. Lint/build passed. Edge1440x810
and390x844 verified four loaded islands, no horizontal overflow,
open/Escape; About link verified. Desktop screenshot reviewed and Skills
label moved up to clear footer. Physical devices and full breakpoint
matrix unverified.

## 2026-09-29 --- World character pose brightness correction (Working)

Removed additive plus-lighter pose blending and crossfade; exactly one
opaque decoded direction layer is visible. Replaced overlapping
upper/lower idle copies with one full-body sprite to eliminate doubled
brightness at the torso seam. Walk cycle slowed from0.64s to0.8s.
Character dimensions increased about18% across existing aspect-ratio
rules while retaining foot anchor and movement bounds. Files:
WorldCharacter.jsx, WorldRefinement.css, IslandOrbit.css. Existing
navigation, movement and assets retained. Lint/build passed.
Edge1440x810 and390x844 verified all four keyboard directions, active
movement, exactly one visible pose and normal blending; desktop
screenshot inspected. Physical devices/Safari not tested. Existing
four-frame raster animation remains, not a rigged character.

## 2026-09-29 --- Visible waterfall current

FlowingWater.jsx: baseline inspection confirmed running=true and
changing stroke dash offset; the static artwork dominated faint narrow
animated lines. Increased current thickness, lane count and contrast,
added slower blue undercurrents, and shortened falling highlight cycles
to1.6--2.3seconds. Existing alpha masks retain tapered mist ends without
opaque rectangles. Paused/reduced behavior preserved. Five-size Edge
regression passed with WebGL disabled: direct/back/reload, masks,
flow/pause/reduced and horizontal bounds. Desktop screenshot inspected;
highlight opacity then softened to.62. Lint/build passed before that
numeric opacity adjustment. No routes, artwork or locked decisions
changed. Physical devices/Safari unverified.

## 2026-09-29 --- Refined fantasy atlas correction (Working)

User rejected literal pirate styling; superseded with pearl/ivory
vellum, champagne filigree, aquamarine compass and floating-island
cartography. Built-in imagegen produced celestial-chart-v2.webp and
celestial-compass-v2.webp in
public/assets/production/images/world-layers/. No text baked in;
labels/selection/needle/routes/action remain live HTML/SVG. Four
destinations selected separately before the CTA navigates. Horizontal
reveal retained. Existing unused captain assets kept; not rendered.
Projects waterfall broad strokes capped at.23 SVG units with
longer/softer currents, avoiding thick dotted columns;
masks/reduced-motion retained. Edge1440x810,390x844: dialog/four
options/no horizontal overflow and Contact destination passed;
screenshot inspected. Five-size water regression plus lint/build passed.
Physical devices/Safari unverified. No locked decision changes.

Imagegen final prompt --- map: Premium elegant fantasy celestial atlas
background for a floating-island portfolio, landscape 3:2. Full canvas
ivory vellum with delicately engraved fine champagne gold borders, pearl
inlay corner ornaments, soft pale blue atmospheric clouds and thin
celestial navigation arcs. Refined ethereal high fantasy, luminous but
restrained, sophisticated craftsmanship matching ivory castles floating
in daylight clouds. Four small finely painted map landmarks: grand
blue-roof ivory castle upper center, warm classical garden palace upper
left, sapphire astronomical observatory lower left, rose-blossom
lighthouse lower right. Calm generous negative space around landmarks
for live HTML labels. Top20% and bottom15% calm near blank ivory for
heading and controls. NO text letters numbers labels. NO pirate props,
ropes, telescope, wood table, wax seals, burnt edges, heavy brown
stains, distressed paper, skulls. No modern neon. Painterly engraved
fantasy cartography on luminous ivory parchment, finely detailed gold
corners not bulky. Soft daylight. Imagegen final prompt --- compass:
Luxury high fantasy celestial compass housing, front view exactly top
down, single centered object on transparent background. Refined
champagne gold filigree, ivory enamel, tiny aquamarine gemstone inlays
at cardinal points, delicate symmetrical eight-point exterior
silhouette, exquisite elven astronomical instrument. Circular deep
midnight teal face with very fine gold radial graduations. Empty center
reserved for moving needle added in code: absolutely no central needle
or star pointer. No letters numbers words. No wood, rope, pirates, rust,
scratches or dirt. Elegant precious crafted magical artifact matching
bright ivory castles in clouds. Subtle turquoise inner light,
dimensional polished gold rim, quiet pearl and crystal accents. Complete
object visible with narrow padding. Square composition.

## 2026-09-29 --- Atlas reversible scroll interaction

WorldAtlas.jsx/css now use one Web Animations timeline for paper reveal
and paired curved gold/ivory scroll rolls. Opens700ms desktop/480ms
mobile; closes450ms/300ms through close, backdrop or Escape, including
interruption during opening. Closing content inert; focus returns to
compass after unmount. Reduced mode120ms opacity only. Compass housing
glows while expanded. Map content/navigation retained. Lint/build
passed. Edge1440x810 and390x844 close state, early Escape and reduced
dismissal passed; final keyboard focus correction verified. Physical
devices unverified.

### 2026-09-29 --- Shared exploration map

-   Extracted the existing compass and scroll atlas into
    `src/components/ExplorationMap.jsx`. World HUD retains its scene
    blocking and bearing callbacks; other routes render the same fixed
    lower-right component through App.
-   Preserved scroll opening/closing, reduced motion, focus restoration,
    and HTML destination links. Route changes unmount the open map.
    Secondary page utilities moved left to avoid the compass. This is a
    working UI implementation, not a new locked design decision.
-   Validation: lint/build passed; 1440px and 390px checks across home,
    world map, About, Skills, Projects, Contact, Resume, Quick View and
    Ending verified one compass at matching coordinates and
    opening/Escape closing.

### 2026-09-29 --- Guided portfolio journey (working)

-   Desktop world islands now follow a spaced curve: About left, Skills
    rising toward center, Projects upper right, Contact lower right with
    compass clearance. Portrait browsing remains unchanged.
-   Shared NextDestination links connect About → Skills → Projects →
    Contact → World Map; use the shared voyage transition while
    retaining direct link semantics and reduced-motion navigation.
-   Lint/build passed. Browser navigation verified across the full
    sequence at 1440px and 390px; desktop 1440×810 layout inspected. No
    locked decisions changed.

### 2026-09-29 --- Desktop island scale correction

-   Replaced viewport-width-only island sizing with
    width/viewport-height/pixel caps (Projects 620px; About 420px;
    Skills/Contact 370px). Desktop island layer is centered and capped
    at 1800px, retaining the central citadel composition. Portrait
    carousel unchanged.

-   Verified island bounds/screenshots at 1920×1080, 1440×810, 1007×963,
    2560×1440 and 390×844; desktop screenshot visually inspected.
    Lint/build passed. Working visual refinement only.

-   Follow-up: user requested an upper-right Projects landmark wrapped
    by a semicircle of About (left), Skills (lower-left), Contact
    (below). Desktop positions updated; Projects cap is now 660px/55svh.
    Other island caps and portrait carousel preserved. Desktop captures
    at 1440×810, 1920×1080 and 1007×963.

### 2026-10-01 Welcome 화면 시각 수정
- WorldArrival.jsx / FlightWorld.css: 흰색 86% 오버레이를 기존 world-sky-v1.webp의 선명한 구름·하늘 배경으로 변경. 기존 Marcellus/SUIT 및 팔레트 유지.
- Portfolio World 타이틀과 텍스트+원형 화살표 버튼으로 정리. 배경은 5초 동안 4%의 느린 줌만 적용. Reduced Motion은 생략.
- 3.8초 자동 진행, 600ms 종료, Enter/Escape/버튼 및 direct/skip 경로 유지. 최초 포커스는 dialog, Tab 시 버튼 포커스 표시.
- 1440×810,430×932,360×800,844×390 배치·버튼 종료 확인. lint/build 통과(Three.js chunk 500kB 경고 존재). 전체 영상 재생은 재검증하지 않음.
