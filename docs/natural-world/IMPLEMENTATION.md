# Natural World — 구현 기록

2026-09-30. 사용자의 진행 요청에 따라 적용한 첫 화면 버전이다. 페이지별 최종 디자인을 일괄 LOCKED로 바꾸는 문서가 아니다.

## 적용 기준

- `Personal-Portfolio_PRD_V4_FINAL.md`, `DESIGN_SYSTEM.md`, `PROJECT_CONTEXT.md`, `AGENTS.md`의 현재 기준을 읽고 기존 Route·Component·Asset·Data를 확인했다.
- 리얼월드 이후 영역에 젤다의 전설 BOTW/TOTK에서 참고한 자연 색감, 회화적 색면, 무광 돌·목재, 절제된 디테일을 적용했다. 게임 원본 에셋은 사용하지 않았다.
- 기존 Sky / Cloud / Stone / Grass 색상 토큰을 공유한다. 밝은 하늘과 차분한 초록, 따뜻한 석재를 기본으로 사용하고 금장·보라색 우주·Glow·텍스트 그림자를 줄였다.
- 최신 문서의 SUIT + Marcellus를 적용했다. SUIT는 한글·본문·메뉴·기술/프로젝트명, Marcellus 400은 짧은 영문 Display에 사용한다. 과거 문서의 Pretendard/Instrument 기준을 새 화면에 적용하지 않았다.

## 변경 파일과 실제 동작

| 영역 | 주요 파일 | 적용 내용 |
| --- | --- | --- |
| 공통 | `src/styles/portfolio-theme.css`, `src/App.jsx` | 포트폴리오 전용 색상·서체·간격, 이동 상태와 포커스 복구, 읽기 화면의 공통 배경 |
| 헤더 | `src/components/PageHeader.jsx`, `.css` | 왼쪽 JY., 중앙 5개 메뉴, 오른쪽 Resume/설정. 작은 화면에서는 위치 표시와 메뉴 Dialog |
| 전환 | `src/components/VoyageTransition.jsx`, `.css` | 목적지 섬과 구름이 이동하는 1초 연출. Route는 240ms 뒤 변경. 연속 선택은 마지막 목적지 우선, Escape는 즉시 도착, 뒤로 가기는 연출 취소 |
| 환경 | `src/components/LivingEnvironment.jsx`, `.css` | 페이지별 구름·그림자·잎 레이어. 건축물과 지형은 안정적으로 유지 |
| World | `src/scenes/PortfolioWorld/LayeredWorld.jsx`, `NaturalWorld.css`, `layers.config.js` | 서로 다른 실루엣의 네 섬, HTML 목적지 라벨, 구름·새·잎·폭포. 모바일 섬 전환과 기존 제한 이동 유지 |
| 지도 | `WorldAtlas.jsx`, `.css`, `src/components/ExplorationMap.jsx` | 네 목적지로 즉시 접근할 수 있는 단순한 지도 Dialog |
| About | `src/pages/About/About.jsx`, `.css` | 작업실과 캐릭터 아트 교체. 대기 상태에서는 프로필 패널을 숨기고 작업 노트/살펴보기로 열기. 탭·닫기·Escape·포커스 복구 |
| Skills | `src/pages/Skills/Skills.jsx`, `SkillsNatural.css`, `SkillIcon.jsx`, `skillData.js` | 열린 유적, 읽을 수 있는 기술 라벨·상세·적용 프로젝트. 수집 크리스털 제거. 기존 이동을 보존한 시안이며 Orbit/Toolkit 최종 확정 아님 |
| Projects | `src/pages/Projects/Projects.jsx`, `ProjectsNatural.css`, `ProjectPedestal.jsx`, `GalleryHUD.jsx` | 무광 갤러리와 네 개의 컨셉 전시물. 실제 콘텐츠/Case Study 유지. 모바일에서는 네 프로젝트 정보 목록으로 접근 |
| Contact | `src/pages/Contact/Contact.jsx`, `ContactNatural.css`, `ContactAtmosphere.jsx` | 같은 팔레트의 전망대와 움직이는 구름·바람·새. Email/GitHub/Resume/Q&A 유지 |
| 읽기 화면 | `src/components/DestinationFrame.jsx`, 공통 테마 | Case Study·Resume·Quick View의 내용은 밝은 읽기 표면 위에 유지 |

전체 Router, 실제 프로젝트 데이터, 네 Case Study, Q&A, Resume 및 기존 제한 이동 Hook을 유지했다. 새 라이브러리는 설치하지 않았다. Real World 및 Portal 파일에서 발견한 별도 작업 변경은 덮어쓰지 않았다.

## 에셋

- 생산 에셋: `public/assets/production/images/natural-world/`의 WebP 16개, 합계 4,302,028 bytes. 모든 파일을 첫 페이지에서 일괄 다운로드하는 구조는 아니다.
- 원본: `public/assets/source/natural-world/`의 PNG 16개.
- 생성 프롬프트: [asset-prompts.json](asset-prompts.json).
- 구성: 목적지 섬 4개, 페이지 배경 4개, World 하늘/전망대 2개, 구름 1개, About 캐릭터 1개, 프로젝트 컨셉 전시물 4개.
- `projects-island-v1`을 공통 스타일 레퍼런스로 사용했다. 기존 배경의 바닥·카메라 구도를 참고해 상호작용 영역을 보존했다.
- 생성 이미지와 실제 브라우저 합성을 확인했다. 기존 에셋은 삭제하지 않았다.
- 프로젝트 전시물은 프로젝트를 상징하는 장식이다. 실제 프로젝트 UI 스크린샷·성과 증거로 사용하지 않는다.

## 움직임과 접근성

일반 상태에서는 별도 조작 없이 환경 애니메이션이 시작된다. 메뉴 Hover/Focus는 목적지를 미리 보여주고 선택은 섬 이동 연출과 연결한다. 구름을 흐르게 하는 CSS, 캐릭터 이동 Hook, Route 전환 상태의 역할을 분리했다.

사용자 일시정지·시스템 Reduced Motion은 강한 이동을 생략한다. 문서가 숨겨지거나 대상이 화면 밖에 있으면 환경 재생을 멈춘다. 이는 사용자가 요청한 움직이는 배경의 접근성·성능 예외다. 이미지 실패나 전환 실패가 HTML 메뉴·실제 콘텐츠 접근을 막지 않는다.

## 검증 결과

- `npm run lint`: 통과.
- `npm run build`: 통과.
- Microsoft Edge Chromium의 Playwright 자동화로 주요 5개 Route × 19개 화면 크기 = 95개 조합을 확인했다. 가로 넘침, 제목 잘림/헤더 침범, 깨진 표시 이미지 0건.
- 크기: 2560×1440, 1920×1080, 1440×810, 1366×768, 1180×820, 1024×768, 768×1024, 430×932, 402×874, 390×844, 360×800. 경계 767/768, 1023/1024, 1279/1280, 1919/1920도 확인했다.
- 13개 동작 검증 통과: 헤더 중앙 정렬/서체, Hover 미리보기/연속 이동, Escape/History, About 키보드 탭, Skills 상세/근거 링크/포커스, World·Skills·Projects 이동, 네 Case Study URL/Reload, 지도·Q&A·Email 열기, 페이지별 배경 재생/일시정지 저장, Reduced Motion, 이미지 실패 대응, 모바일 탐색/프로젝트 콘텐츠, 200%에 해당하는 CSS viewport 재배치.
- 추가로 1440×810 / 430×932 / 720×405에서 About의 대기→열기→닫기→포커스 복귀를 확인했다. Projects의 미선택 HUD가 콘텐츠를 가리는 문제를 제거하고 선택 시 미리보기를 확인했다.
- 발견·수정: Route 변경 후 전환 화면이 남던 타이머 정리 문제, Skills 상세 닫기와 Route 자동 포커스의 충돌, 모바일 제목 위치, 기본 HUD의 겹침.
- 실행 기록: `output/natural-world/qa-report.json`, `final-interaction-qa.json`. 스크립트: `output/natural-world/verify.cjs`. 주요 Desktop/Mobile 스크린샷과 About 열린 패널 캡처를 직접 검토했다.

## 남은 범위와 한계

- 이 버전은 공통 시각 방향을 실제 화면에 적용한 검토본이다. Skills Orbit/Toolkit, 페이지별 추가 이동/카메라/Ending은 WORKING으로 남는다.
- 걷기 및 Contact 동작 Sprite는 기존 에셋이다. About 정지 캐릭터를 제외한 전체 Sprite 재도색은 수행하지 않았다.
- 실제 프로젝트 UI 스크린샷 원본은 현재 저장소에서 확인하지 못했다. 컨셉 조형물로 대체 증명하거나 임의 성과를 만들지 않았다.
- 실제 OS/브라우저의 200% Zoom 조작, 실기기 Safari/iOS, 실제 사용자 테스트, LCP/INP/CLS 측정은 수행하지 않았다. CSS zoom 및 동등한 작은 viewport 확인을 실제 브라우저 확대 완료로 기록하지 않는다.
- Email 입력 Dialog의 동작을 확인했으며 메시지는 전송하지 않았다. 실제 수신 주소·콘텐츠의 미제공 상태는 기존 데이터를 유지한다.
- 배포·Commit·Push는 수행하지 않았다.
