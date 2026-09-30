# PERSONAL PORTFOLIO --- DESIGN SYSTEM v3 FINAL

**Status:** FINAL\
**Updated:** 2026-10-01\
**Core:** Natural Fantasy Adventure × Minimal Portfolio UI\
**Primary:** 1440×810 Desktop / 430×932 Mobile\
**Principle:** Portfolio First

> 이 v3가 아래 Archived v2/history와 충돌하면 v3가 우선한다. 기존 기록은
> 삭제하지 않고 보존한다.

Priority: **Content → Navigation → Hierarchy → Usability → Responsive →
Accessibility → Performance → Motion → Decoration**

## 01. Visual Direction --- LOCKED

**Fantasy = Environment. UI = Minimal / Functional.**

밝고 자연적인 판타지 어드벤처를 기본으로 한다. 하늘·구름·자연·따뜻한
석재·고대 유적·대기 원근·자연광으로 세계관을 만들고, UI는 현대적이고
절제되게 유지한다. 특정 게임의 UI/Asset/HEX/구도를 복제하지 않는다.

페이지별 문법: - **World:** Wide Landscape / Exploration / 4 destination
islands - **About:** Interior / 3/4 Composition / Personal Space /
Object Interaction - **Skills:** Ancient Ruin / Negative Space / Skill
Orbit - **Projects:** Architectural Gallery / Project Archive / 4 real
Project Stages - **Contact:** Quiet Ending / Destination / Contact
Action 중심

금지: 모든 페이지 중앙 후면 캐릭터 반복, 모든 페이지 공중섬 반복,
Projects를 두 번째 World Map으로 만드는 것. Character 비중은
`World > About > Skills > Projects > Contact`.

## 01.1 Portfolio World 공통 아트 제작 기준 — 2026-09-30

사용자 승인 범위는 **에셋 간 그림체·색감·재질·명암의 일관성**이다.
World / About / Skills / Projects / Contact를 같은 세계의 서로 다른
장소로 표현한다. 목표는 형태가 명확한 **회화적 2.5D 게임 배경**이다.
새 기준을 문서에 반영한 상태이며, 기존 에셋의 교체나 화면 적용을
완료했다는 의미는 아니다.

이 기준은 페이지별 공간·동선·카메라·이동 방식을 새로 확정하지 않는다.
기존 문서 간 우선순위는 해당 페이지 작업 시 실제 구현과 사용자 의도를
확인해 결정한다. 특히 Skills의 Ancient Ruin / Skill Orbit은 작업 시
검토할 방향이며, 기존 LOCKED 표기만으로 최우선 확정안으로 적용하지 않는다.
이 결정 범위 설명은 아래 페이지별 문법 및 보관 기록에도 적용한다.

Real World는 **서울 야경의 Photorealistic / Cinematic 작업실** 기준을
유지한다. Portal 전후의 빛과 색은 연결할 수 있지만 실사 작업실까지
회화적 그림체로 자동 변경하지 않는다.

### 회화적 색면과 형태

-   지형·건축·나무는 큰 실루엣과 단순한 명암 덩어리부터 설계한다.
    나무는 잎 하나하나보다 수관의 덩어리, 바위는 작은 균열보다 큰 면과
    지층, 건물은 장식보다 입구·지붕·바닥 구조가 먼저 읽혀야 한다.
-   주요 대상의 경계는 명확하게, 원경의 경계는 부드럽게 표현한다.
    붓 질감은 필요한 부분에만 사용하며 전체 화면을 Blur/필터로 흐리게
    만드는 방식으로 회화적 표현을 대신하지 않는다.
-   섬마다 지형과 건물의 용도를 반영한 실루엣을 만든다. 같은 뾰족한
    바위·성·첨탑·폭포를 반복 배치해 차이를 장식에만 의존하지 않는다.

### 무광 재질과 제한적인 반사

| 재질 | 공통 표현 기준 |
| --- | --- |
| 돌 | 큰 면의 명암과 제한적인 모서리 마모, 절제된 표면 질감 |
| 목재 | 결 방향과 따뜻한 색 변화, 넓고 부드러운 빛 |
| 천 | 큰 주름과 부드러운 그림자, 강한 광택 억제 |
| 금속 | 필요한 모서리와 작은 영역에만 반사 강조 |
| 물 | 큰 반사면과 흐름을 보여주는 명암, 잔물결의 과밀 묘사 억제 |

돌·목재·천은 무광 중심으로 통일한다. 모든 표면이 코팅된 것처럼
반짝이는 표현, 과도한 Bloom, 금장·보석·대리석의 동시 강조를 피한다.
발광은 선택 상태나 기능이 있는 장치 등 의미가 있는 대상에 제한한다.

### 디테일 밀도와 공통 색감

| 영역 | 묘사 기준 |
| --- | --- |
| 주요 대상 | 입구·선택 오브젝트·전시물의 기능과 특징이 명확하게 보이도록 |
| 주변 환경 | 바닥·벽·가구·식물이 공간을 설명하는 수준으로 |
| 원경 | 큰 실루엣·색면·대기 원근 중심으로 단순화 |

모든 영역에 같은 선명도와 미세 질감을 넣지 않는다. 축소해서 보았을 때도
목적지와 주요 대상이 구분되어야 한다. Projects에서는 실제 프로젝트
화면과 정보의 가독성이 배경의 무늬·광택·장식보다 우선한다. 실제 UI
스크린샷을 배경 그림체에 맞추기 위해 다시 그리거나 왜곡하지 않는다.

03장의 Sky / Cloud / Stone / Grass 팔레트와 제한적인 강조색을 공유한다.
페이지마다 다른 색 체계를 만들거나 같은 색 필터를 일괄 적용하지 않는다.
같은 재질·명암 표현 안에서 시간대와 실내외 조명으로 장소 차이를 만든다.
새 HEX나 비율 수치를 임의로 추가하지 않는다.

### 캐릭터·배경·오브젝트의 명암 일치

-   같은 장면 안에서는 광원 방향, 빛과 그림자의 색, 그림자 강도와
    부드러움을 맞춘다. 페이지 간 시간대가 달라도 재질 표현은 유지한다.
-   캐릭터의 피부·머리카락·옷과 배경의 세부 묘사 수준, 채도, 경계
    선명도를 함께 검토한다. 캐릭터만 따로 완성한 뒤 배경 위에 얹지 않는다.
-   기존 캐릭터의 정체성과 복장은 별도 요청 없이 바꾸지 않는다.
    배경에 맞춘 광택·명암·디테일 조정부터 검토한다.
-   캐릭터의 키, 발 위치, 원근, 바닥 접촉 그림자, 가구 앞뒤 가림을
    배경과 합성한 상태에서 확인한다.

### 이동과 콘텐츠를 고려한 배경 설계

배경 제작 전에 이동 가능한 바닥, 캐릭터 크기 기준, 상호작용 대상,
가림 레이어, 제목·설명·패널·Navigation의 Safe Area를 표시한다.
걷는 영역과 대상은 명확하게 읽혀야 하며 문·계단·통로는 공간 구조상
납득할 수 있어야 한다. 이 설계가 자유 이동·Jump·Collision Engine의
도입을 의미하지는 않는다. 구체적인 조작과 이동 범위는 페이지 작업 시 결정한다.

움직이거나 선택 상태가 바뀌는 대상은 필요한 만큼 배경과 분리한다.
주요 건축과 지형은 안정적으로 두고, 구름·식생·물·캐릭터 등은 기존
Motion Ownership과 예산 안에서 움직인다. 중요한 Text/UI는 HTML로 유지한다.
Mobile에서도 대상·바닥·콘텐츠 영역이 무리하게 잘리지 않는 구도를 확인한다.

### 제작 순서와 검수

1.  **대표 외부 장면:** 지형·건물 하나·하늘·식생·캐릭터를 함께 배치해
    공통 기준 이미지를 만든다. 승인된 기준 이미지의 실제 경로와 버전을 기록한다.
2.  **대표 실내 장면:** 따뜻한 실내에서도 동일한 그림체와 재질이
    유지되는지 확인한다. 특정 페이지의 공간 디자인을 이 단계에서 자동 확정하지 않는다.
3.  **합성·이동 검토:** 캐릭터와 상호작용 오브젝트의 크기·광원·발 위치·
    가림 관계를 배경 위에서 확인하고, 실제 이동 연결은 브라우저에서 검증한다.
4.  **페이지 확장:** 검증한 기준 이미지를 공유하고 공간·구도·시간대만
    페이지 목적에 맞게 조절한다. 독립 생성 결과를 공통 검수 없이 채택하지 않는다.

제작 Brief에는 공통 기준 이미지, 장면의 목적, Primary Focal Point,
카메라와 광원 방향, 재질, 디테일 배분, 이동/가림 영역, Text Safe Area,
분리할 레이어, Desktop/Mobile 구도를 기록한다. 아직 없는 이미지 경로는
만들어 적지 않고 미제작으로 표시한다.

검수 시에는 작은 썸네일에서의 실루엣, 흑백에서의 명암 위계, 원래
크기에서의 재질과 가독성, 캐릭터 합성, Desktop/Mobile 재구도를 확인한다.
브라우저에서는 Keyboard/Touch/Direct Access, Reduced Motion과 Asset
Failure도 검증한다. 기준 이미지·새 에셋·QA의 완료 여부는 실제 결과만 기록한다.

## 01.2 자연 판타지 화면 적용 — 2026-09-30

사용자의 최신 진행 지시에 따라 **젤다의 전설을 참고한 자연 색감**을
Portfolio World 공통 시각 기준의 첫 항목으로 적용한다. Sky / Cloud /
Stone / Grass 기존 토큰을 사용하며, 특정 게임의 에셋·UI를 복제하지 않는다.

- **공통 Header:** 왼쪽 JY. 및 `← 리얼월드` / 화면 중앙 World·About·Skills·Projects·Contact /
  오른쪽 Resume·설정. 높이 64px, SUIT 14px/600. 1024px 미만은
  현재 위치와 메뉴 Dialog로 전환한다. 로고·양측 도구의 폭과 무관하게
  Desktop navigation의 중심을 viewport 중심에 맞춘다.
  `← 리얼월드`는 모든 폭에서 노출하며 `/`로 바로 이동한다. 모바일 메뉴에도
  같은 링크를 제공한다. JY. 로고의 `/world-map` 연결은 유지한다.
- **읽기:** 한글·Hero 소개·메뉴·기술/프로젝트명·본문은 SUIT, 짧은 영문
  페이지 Display에만 Marcellus. 현재 파일은 Marcellus Regular 400이며
  500을 합성하지 않는다. 해당 Display token을 실제 400에 맞춘다.
- **환경:** 모든 주요 Portfolio 페이지에서 첫 화면부터 구름·물·바람·
  그림자의 움직임이 보인다. 전체 배경 그림과 본문을 함께 확대/흔드는
  방식은 사용하지 않는다. 건축과 주요 지형은 안정적으로 유지한다.
- **월드맵 기본 움직임 추가 — 2026-09-30:** 사용자 요청으로 네 섬은 서로 다른
  주기/위상의 부유를 사용한다. 섬 내부는 계절과 기능에 맞는 꽃잎·기어·전시 조명·
  등대 빛·눈발로 구분하고, 폭포의 물 표면과 수면은 첫 화면부터 흐른다.
  선택 시 해당 섬의 소폭 상승·명암 대비·입장 텍스트로 반응을 명확히 한다.
  이름표는 카드 없이 HTML 텍스트로 유지하며 물줄기를 가리지 않도록 배치한다.
  클릭 영역은 고정하고, 모션 끄기·Reduced Motion·화면 밖 정지를 유지한다.
  이 부유는 월드맵에만 적용하며 다른 페이지나 카메라 전체를 흔들지 않는다.
- **공통 이동:** Header·섬·다음 페이지 링크는 같은 전환을 사용한다.
  출발/도착 섬의 상대 방향을 따라 구름과 섬의 깊이가 변한다.
  현재 v1은 Route 240ms / 연출 1000ms이며 이미지·animationend를 기다리지 않는다.
  연속 선택은 마지막 목적지, Escape/바로 보기는 즉시 완료,
  Back은 진행 중 전환 취소, Reduced Motion은 즉시 이동한다.
- **Hover/Focus:** 월드에서는 해당 섬과 설명을 강조하고,
  내부 페이지에서는 목적지 섬 미리보기를 보여준다. 핵심 설명은
  Hover에만 숨기지 않는다. Touch는 메뉴/명시적 입장으로 접근한다.
  사용자 요청으로 하단 `지도` 버튼과 펼쳐지는 지도 Dialog를 제거한다.
  `/world-map` 허브와 Header의 목적지 이동은 유지한다.
- **사용자 제어:** 설정에서 배경 움직임을 멈출 수 있고 기기의
  Reduced Motion을 존중한다. 숨겨진 탭·화면 밖 환경은 정지한다.
- **About:** Idle은 자기소개와 작업실, 프로필은 작업 노트 또는
  보조 Overview 버튼으로 연다. 상세 탭의 정보는 기존 사실을 유지한다.
- **Mobile Projects:** 짧은 전시 공간 다음에 실제 프로젝트 4개를
  읽는 목록을 배치한다. 각 Case Study에 캐릭터 조작 없이 접근한다.

에셋은 `public/assets/production/images/natural-world/`,
원본은 `public/assets/source/natural-world/`에 버전으로 보존한다.
생성 프롬프트는 [asset-prompts.json](docs/natural-world/asset-prompts.json)에 기록한다.
기준으로 사용한 외부 장면은 `projects-island-v1.png`이다.
이번 화면과 구체적인 공간 배치·전환 수치는 **검토 가능한 v1 구현**이며,
Skills 최종 Orbit/Toolkit/이동 방식 또는 모든 페이지 공간을 LOCKED로 승격하지 않는다.
실제 적용·QA·남은 범위는 [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)에 기록한다.

## 01.3 Real World — 풀스크린 시네마틱 크레딧 — 2026-09-30

사용자가 선택한 **3안**을 Real World의 현재 UI 배치로 적용한다.
서울 야경 작업실의 실사 풀스크린 영상, 따뜻한 조명과 차가운 도시 빛을 유지한다.

- **Desktop:** 상단 왼쪽 JY., 오른쪽 Quick View·환경 설정. 왼쪽 하단은
  소개·이름·직무, 오른쪽 하단은 64px 원형 화살표와 ENTER WORLD.
  주요 인물과 모니터가 있는 중앙에는 UI를 배치하지 않는다.
- **Mobile/Portrait:** 풀스크린을 유지하면서 소개 아래에 입장 버튼을
  왼쪽 정렬로 배치한다. 아래의 직접 입장 링크까지 화면 안에서 접근한다.
  짧은 화면에서는 세로 간격을 조정한다.
- **Typography:** Real World 전체 SUIT. 소개는 30–40px, 첫 줄 400 /
  강조 문장 600. 이름·직무와 CTA는 14px, Quick View는 12px.
- **Color/Surface:** Cloud·Stone·Ink 및 기존 야간 배경색을 사용한다.
  글자는 하단 명암 오버레이로 읽히게 하고, 노란 마커·금색 이중 테두리·
  버튼 스캔 장식·Text Shadow/Glow를 사용하지 않는다.
- **Interaction:** Hover/Focus에서 화살표가 4px 이동한다. Quick View는
  실제 /quick-view 링크이며 설정의 Motion·Sound, 키보드 포커스,
  Reduced Motion을 유지한다. ENTER WORLD는 방문 기록과 관계없이 매번 영상을
  시작하며, 아래 12px 텍스트 링크 ‘영상 없이 바로 입장’은 /world-map으로
  즉시 이동한다. 링크의 터치 영역은 최소 44px이다. Motion OFF/Reduced Motion에서는
  ENTER WORLD도 영상 없이 진입한다.
- **범위:** 3안의 풀스크린 UI 배치를 유지한다. 이후 대기 영상과 진입 연속성은
  아래 01.4를 따른다. Portfolio World의 WORKING 결정은 변경하지 않는다.

## 01.4 Real World — 지정 영상 순서와 같은 화면 전환 — 2026-09-30

사용자가 명시한 실제 파일 순서를 따른다. 앞서 시도했던 포털 영상의
시작 구간을 대기 배경으로 사용하는 방식은 채택하지 않는다.

1. 대기 배경: /assets/start-ambient.mp4 전체 반복 재생.
2. ENTER WORLD 선택: /assets/production/video/premium-to-portal-preview.mp4를
   처음부터 재생.
3. 포털 영상 종료 후:
   /assets/production/video/hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4.
4. 마지막 영상 완료 또는 건너뛰기: /world-map.

- 첫 화면의 포스터도 기존 /assets/start-poster.webp를 사용한다.
  영상 파일을 생성·편집하거나 대기 영상을 다른 파일로 대체하지 않는다.
- 세 영상은 같은 RealWorld 영역에서 같은 크기와 반응형 crop으로 재생한다.
  body의 별도 fixed 플레이어, 화면 축소, 새 타이틀 카드/소개 패널은 사용하지 않는다.
- 다음 영상의 디코딩된 첫 프레임이 준비되면 600ms opacity 전환으로 겹친다.
  첫 전환이 끝날 때까지 start-ambient를 계속 재생하고, 두 번째 전환에서는
  종료된 premium 영상 요소의 마지막 프레임을 보존한다.
- 준비되지 않은 영상은 투명하게 유지한다. 타이머만으로 빈 영상 레이어를 드러내지 않는다.
  원본 두 작업실 영상의 구도 차이는 재제작하지 않으며, 겹침 전환으로 완화한다.
- 3안의 풀스크린 UI·SUIT·색상·소개·CTA를 유지한다. 재방문도 같은 순서로 재생한다.
  직접 입장·건너뛰기, Reduced Motion/Motion OFF, 비활성 탭 정지,
  영상 오류/8초 재생 대기 시 콘텐츠 접근 복구를 제공한다.

## 01.5 About — 아침 작업실과 공통 Object HUD — 2026-10-01

2026-09-30 사용자 About 제작 요청에 따라 이 페이지의 기존 Warm Afternoon을
**Morning Natural Lighting**으로 조정한다. 최신 About 작업에 한정한 결정이며,
다른 페이지의 공간·팔레트·이동 방식은 변경하지 않는다.

- **환경:** 2026-10-01 최신 첨부 이미지와 “너무 크다”는 사용자 정정에 따라
  가까운 실내 책상 구도를 **뒤로 물러난 시점의 열린 작업실 테라스**로 교체한다.
  왼쪽의 작은 작업 책상, 뒤쪽 보드·책장·건물, 오른쪽 보관 상자와 하늘,
  중앙의 열린 이동 바닥이 함께 보이는 구도다. 기존 Morning Blue, Ivory 햇빛,
  Warm Brown 목재, Muted Green 및 무광·회화적 2.5D 재질을 유지한다.
  캐릭터도 공간에 맞게 줄인다. 레퍼런스의 글자·UI·캐릭터는 배경에 넣지 않는다.
  원본/운영 이미지와 제작 프롬프트는 `docs/about-studio/wide-atelier-prompt.md`에 기록한다.
- **About UI 색상 (2026-10-01 최신 요청):** Navy 중심 정보창을 기존 Ink 97% 표면과
  Ivory/Cloud/Stone 텍스트로 변경한다. 새 색상 토큰은 추가하지 않는다.
  기존 Navy는 환경 그림자에만 남긴다. UI의 Yellow 강조는 Ivory로 통일한다.
- **Typography:** About Display만 Marcellus 400. 나머지는 모두 SUIT.
  한 줄 Prompt의 물건 이름 14px/600, 동작·Key Cap 12px. 본문 16px,
  패널 구분 제목 14px, 내용 제목 24px. 기존 spacing/radius family를 사용한다.
- **Object:** 노트북=Profile, 책장=Journey, 노트=Process, 보드=Values,
  상자=Archive. 2026-10-01 최신 사용자 요청은 **상시 색상·번호 카드를 없애고
  물건 자체의 빛으로 발견성을 표현**하는 것이다. 기존 Ivory/Cloud로 실제 물건의
  윤곽과 모서리에만 국소 조명을 얹는다. 최신 명시 요청에 따라 **다섯 선택 대상은
  기본 상태에도 기존 Hover 수준의 빛을 유지**한다. 장식 사물에는 적용하지 않는다.
  각 아이템 아래 24px E 키를 상시 표시하고 Hover/Focus/근접 시 물건 이름과
  살펴보기 문구를 작게 추가한다. 터치에서는 E 대신 열기를 표시한다.
  최신 요청에 따라 기본 조명은 4.8초 주기로 은은하게 밝아졌다 돌아오며 꺼지지 않는다.
  2026-10-01 추가 요청: 모서리 Glint는 3.8초 주기로 크기·밝기가 반짝이며 대상별 시작 시점을 엇갈리게 한다.
  선택 시 표식과 빛을 숨기고 Reduced Motion에서는 고정 조명으로 유지한다.
  최소 44px 클릭 영역과 키보드 Focus 표시를 유지하며 본문은 선택해야 열린다.
- **공통 HUD:** 다섯 항목의 Header/Grid/Padding/닫기/Footer를 공유한다.
  2026-10-01 사용자 승인: 젤다 아이템 설명창의 형태를 참고해 정보 패널만 Ink 94% 표면,
  Ivory 본문, Stone400 왼쪽 4px 세로선과 12px 모서리 절삭을 적용한다.
  둘레 테두리·둥근 모서리·헤더 장식 구분선은 없애고 하단 조작 영역은 유지한다.
  기존 토큰을 사용하며 청록 발광·게임 고유 문양은 도입하지 않는다.
  2026-10-01 사용자 정정에 따라 **모든 화면에서 한 화면의 작업실 + 오른쪽 소형
  패널**을 유지한다. About은 `100dvh`, 하단 콘텐츠 섹션과 페이지 스크롤은 없다.
  Desktop 패널 폭은 최대 360px, 높이는 최대 560px이며 작은 화면은
  오른쪽 16px/위 80px 여백 안에 맞춘다. 본문만 스크롤하고 닫기는 고정한다.
  하단 시트 전환, 배경 Blur/Glass/전체 Glow/중앙 흰색 Modal은 사용하지 않는다.
  선택 시 6% 카메라 확대와 300ms 패널 진입, Reduced Motion/Motion OFF에서는 생략한다.
- **환경 움직임:** 열린 하늘의 구름, 바람에 반응하는 식물, 바닥의 햇빛·구름 그림자,
  컵의 김을 독립적으로 움직인다. 배경 전체의 확대·이동 반복은 사용하지 않는다.
  식물은 기존 이미지의 녹색 식생 영역에 한정한 WebGL 변위, 나머지는 CSS가
  소유한다. 본문 열기/설정 Pause/Reduced Motion/비활성 탭/작업실 화면 밖에서
  정지한다. WebGL 실패 시 원본 이미지를 유지하며 콘텐츠 접근에는 영향이 없다.
- **접근:** 기존 공통 Header와 Route를 유지한다. 사용자 표시 요청에 따라 화면 내 World Map,
  About 제목, 하단 Skills 링크는 제거한다. 접근성용 h1은 유지한다.
  좌측 하단 `이야기 목록`은 Ivory 종이 표면, Ink 책 아이콘, Stone 테두리로 구성하며
  기본적으로 접혀 있고 열면 다섯 항목에 직접 접근한다. 숫자는 실제 열어본 개수이다.
  잠금·보상·순서 강제 없음.
  Desktop은 기존 gallery 이동 Hook과 방향별 캐릭터를 재사용하여 테라스 중앙 바닥에만
  WASD/방향키·바닥 클릭 이동 및 E 열기를 제공한다. 바닥은 가구 앞에서 넓어지고
  앞쪽 화단 사이에서 좁아진다. Mobile/Touch는 탭 중심이다.
  세로 Mobile은 배경을 크롭하며 실제 물건과 클릭 영역의 정렬을 유지한다.
  화면 밖으로 잘린 물건의 클릭 영역은 inert로 처리하고 접힌 목록으로 접근한다.
  물건과 떨어진 가짜 위치에 표식을 배치하지 않는다. 작업실 아래로 목록을 쌓는
  3:2 반응형 전환은 폐기한다. 모든 Text/UI는 HTML이다.
- **레퍼런스 적용:** [Palworld 공식](https://www.pocketpair.jp/en/games-en/palworld-en/)과
  [Zelda 공식](https://www.nintendo.com/us/store/products/the-legend-of-zelda-breath-of-the-wild-switch/)
  자료의 환경 중심 화면을 참고했다. 현재의 물건 조명·간결한 조작 안내는 이 포트폴리오에
  맞춘 해석이며 게임의 에셋, 폰트, 색상 체계나 개별 HUD를 복제하지 않는다.
- **결정 범위:** 요청한 About 방향의 검토 가능한 구현이다. 다른 페이지의
  WORKING 항목을 LOCKED로 승격하거나 전역 자유 이동을 도입하지 않는다.

## 02. Typography --- LOCKED

Portfolio World는 **Marcellus + SUIT 두 개만** 사용한다.

### Marcellus

Fantasy Display 전용: World/Chapter/Page Display Title, 짧은 세계관
타이틀.\
Navigation, 긴 Hero Copy, 한글, Body, Button, Label, Metadata에는
사용하지 않는다.

### SUIT

한글 전체, 큰 영문 Hero Copy, Navigation, Button, Label, Skill/Project
Name, Body, Description, Number, Metadata, Control Guide, Panel, Form,
Case Study.

  Token          Size     Weight         LH Font        Use
  ------------ ------ ---------- ---------- ----------- -------------------------
  Display XL       64        400       1.08 Marcellus   rare world/chapter hero
  Display L        56        400       1.10 Marcellus   page display title
  Display M        48        600       1.15 SUIT        large English hero copy
  H1               40        700       1.20 SUIT        primary content heading
  H2               32        700       1.25 SUIT        section heading
  H3               24        600       1.33 SUIT        panel/project heading
  H4               20        600       1.40 SUIT        subheading
  Body L           18        400       1.65 SUIT        lead
  Body M           16        400       1.60 SUIT        body
  Body S           14        400       1.55 SUIT        secondary
  Label L          14        600   1.0--1.4 SUIT        nav/button/control
  Label M          12        600   1.0--1.5 SUIT        metadata
  Caption          12   400--500       1.50 SUIT        helper

Tracking: Marcellus `0~.02em`, SUIT Heading `-.02em~0`, Body `0`, Label
`0~.02em`. 과도한 자간 금지.\
Text width: Hero 18--24ch / Lead 40--50ch / Body 60--68ch / Article max
68ch.\
한글: `word-break:keep-all; overflow-wrap:break-word;`

한 viewport 정보 위계는 원칙적으로 **Primary / Secondary / Utility
3단계**. `Title→Subtitle→Quote→Description→Keywords→Decorative Copy`처럼
계층을 계속 늘리지 않는다.

Responsive type: Display XL `clamp(44px,4.4vw,64px)`, Display L
`clamp(38px,3.8vw,56px)`, Display M `clamp(34px,3.3vw,48px)`, H1
`clamp(30px,2.8vw,40px)`, H2 `clamp(26px,2.2vw,32px)`, H3
`clamp(21px,1.7vw,24px)`. Body M은 기본 16px, 검증된 경우에만 mobile
15px까지.

금지: 제3 Font 임의 추가, Handwriting/Pixel/Decorative font,
Pretendard/Instrument Serif/Gowun
Batang/Fredoka/Silkscreen/RetroMario/SuperMario 자동 복원,
`text-shadow`, Text Glow.

## 03. Color --- Natural Fantasy

  Token                 HEX         Role
  --------------------- ----------- -------------------------
  Sky100                `#DDEEF5`   pale atmosphere
  Sky300                `#A9D4E5`   haze
  Sky500                `#78B6D0`   clear sky
  Cloud                 `#F6F3EA`   cloud/warm light
  Ivory                 `#F2EBDD`   light UI neutral
  Stone200              `#D8D0BE`   pale stone
  Stone400              `#B9AE96`   mid stone
  Grass300              `#A7BD7A`   light vegetation
  Grass500              `#78965F`   vegetation
  DeepGreen             `#405A45`   depth
  Ink                   `#26343A`   primary text
  InkSoft               `#53636A`   secondary text
  SurfaceDark           `#26383D`   dark functional surface
  InteractionBlue       `#4E8FA8`   focus/selected
  InteractionBlueDark   `#376E83`   pressed
  WarmAccent            `#C29A5B`   restrained accent
  Error                 `#C94A4A`   error
  Success               `#4F875C`   success

환경은 Sky/Cloud/Stone/Grass 중심. InteractionBlue는 상태 전달용,
WarmAccent는 소량. Brand color는 실제 Logo/Thumbnail/Selected content에
제한. 임의 HEX 추가 금지.

시간대: World=Clear Morning / About=Warm Afternoon / Skills=Clear Day /
Projects=Late Afternoon / Contact=Golden Hour.

일반 텍스트 대비 4.5:1, 큰 텍스트 3:1 이상. 이미지 위 글자가 안 읽히면
crop/text-safe area/scrim을 먼저 수정하고 text shadow를 사용하지 않는다.

## 04. Layout / Grid / Hierarchy --- LOCKED

Grid: Desktop 12 / Tablet 8 / Mobile 4. 강제 16:9 금지.\
Container padding: Wide/Desktop 32--48 / Compact 24--32 / Tablet 24 /
Mobile 16--20.\
Spacing: `4/8/12/16/20/24/32/48/64/80/96`.\
관계: **Internal Gap \< Container Padding \< Group Gap \< Section Gap**.

각 화면은 **Primary focal point 1개**를 먼저 정한다. Secondary content는
제한하고 Utility/Nav는 더 조용하게 한다. Environment, Character, Title,
Panel, CTA를 모두 같은 강도로 강조하지 않는다.

첫 화면에서 사용자는 ① 어디인지 ② 무엇을 봐야 하는지 ③ 어떻게
이동/접근하는지 즉시 이해해야 한다. 탐험이 유일한 정보 접근 경로가
되어서는 안 된다.

## 05. Surface / Border / Shadow

Radius: XS6/S10/M14/L20/XL24/2XL32/Full. 기존
`Surface Radius = Internal Padding` family rule 유지. Inner Radius \<
Outer Radius.

Border는 구조적 목적의 **single 1px** 기본, Focus 2px. Double border,
frame-inside-frame, 의미 없는 두 줄/장식선, corner ornament 반복 금지.

Shadow는 UI elevation에만 사용. **Text shadow는 항상 금지.** Strong
shadow + glass + glow + strong border 동시 사용 금지.

## 06. Navigation --- LOCKED

Desktop: `JY. | World | About | Skills | Projects | Contact`

SUIT 사용. 모든 Portfolio World 페이지에서 위치/높이/간격/Active 규칙
동일. Active는 weight/color + 얇은 underline 등 최소 표현. Glow/RPG
frame/particle/gradient text 금지. 실제 HTML navigation이며 3D 없이도
접근 가능.

Mobile은 동일 IA를 유지하되 compact menu로 변환 가능. Touch target
≥44×44, safe-area 반영. Q&A/Resume 콘텐츠는 top-level island가 아니라는
이유로 삭제하지 않는다.

## 07. Components / Interaction

Button S min-H36, M44, L52. Input min-H44. Icon button/interaction
target ≥44×44.\
States:
`Default / Hover / Focus-visible / Pressed / Selected / Transitioning / Disabled / Loading / Error`.

Object grammar: **Idle → Near/Focus → Selected → Exit**. Idle은 불필요한
UI/Glow 없음. Near/Focus는 관련 대상만 반응. Selected는 필요한 정보만.
Exit는 clean state 복귀. Glow는 상태 신호이며 모든 오브젝트 상시 Glow
금지.

## 08. Page Rules

### World

4 islands: About/Skills/Projects/Contact. Wide establishing composition.
섬 silhouette은 구분. Label/UI는 HTML. Direct navigation 유지. IA 수정
없이 5번째 섬 추가 금지.

### About

Warm interior + 3/4 composition. 의미 있는 Object 소수만 사용. Idle에서
Profile/Journey/Values/Interests floating card 금지. Object 자체가
interaction target. 빠르게 보는 Overview는 보조 접근 경로로 허용.
소품으로 빈 공간을 채우지 않는다.

### Skills

Ancient ruin + Negative Space + **Skill Orbit**. 하나의 중심 시스템과
절제된 orbit. Skill object는 하나의 조형 언어. 화려한 보석 안에 네모
Logo를 억지로 넣지 않는다. 실제 SVG/logo는 독립 asset. Idle=slow orbit /
Near=slow+emphasis / Selected=orbit pause or de-emphasis + focus /
Exit=return. XP/Level/Power Up 금지.

### Projects

**Architectural Gallery / Project Archive / 4 real Project Stages.**
World Map의 섬 문법 반복 금지. 실제 프로젝트
Name/Thumbnail/Identity/Category/Role/Summary/Case Study가 주인공. AI
fantasy scenery가 실제 Project visual을 대체하면 안 된다.

### Contact

Quiet ending. Contact action이 Primary. Character는 secondary/minimal.
또 하나의 World landscape 감상 화면으로 끝내지 않는다. Contact UI는 즉시
접근 가능한 HTML.

## 09. AI Visual Cleanup --- LOCKED

금지: - 의미 없는 가로선/두 줄 장식선 - Double Border - 반복 Corner
Ornament / `◆◇✦✧` - Text Shadow / Text Glow - 빈 공간 채우기용 감성 영어
카피 - `EXPLORE/CREATE/GROW`류 장식 문구 남발 - 같은 의미 한글/영문
중복 - 과도한 Glassmorphism - 모든 Hover에 Scale+Glow+Particle - 모든
Object 상시 Glow - 모든 페이지 중앙 후면 Character - 모든 페이지
Floating Island - 빈 공간을 책/식물/랜턴/배너/크리스탈로 채우기 - AI
Environment 이미지에 실제 UI/Text/Navigation/Button/Skill/Project Name
bake-in - Brand Logo를 AI object 안에 억지로 합성 - AI 결과에 맞춰
Layout/Typography/Hierarchy를 역으로 변경

**AI/Astra/Higgsfield = Asset Artist. Design System + Code =
Layout/Typography/UI/Interaction Owner.**

## 10. Responsive --- LOCKED

Breakpoints: Wide≥1920 / Desktop1280--1919 / Compact1024--1279 /
Tablet768--1023 / Mobile\<768.

QA: 2560×1440, 1920×1080, 1440×810, 1366×768, 1180×820, 1024×768,
768×1024, 430×932, 402×874, 390×844, 360×800. Boundary: 767/768,
1023/1024, 1279/1280, 1919/1920.

-   Desktop 단순 축소로 Mobile 해결 금지
-   **Content Parity + Interaction Parity \> Visual Parity**
-   Object/Character/CTA/Nav safe area 유지
-   viewport별 background focal point/crop 검증
-   Wide는 world 확장, Compact는 camera reframe+UI 재배치, Tablet은
    의도적 vertical/compact composition
-   Mobile은 장식 asset을 우선순위에 따라 제거/단순화 가능
-   Desktop WASD interaction은 Mobile에서 Tap/Direct Selection/Bottom
    Sheet 등으로 변환
-   Panel은 Drawer/Bottom Sheet/Fullscreen Sheet 전환 가능
-   Touch ≥44×44
-   `env(safe-area-inset-*)` 반영
-   `100vh`만 고집하지 않고 `100dvh/100svh` 고려
-   orientation/landscape mobile/tablet QA
-   200% zoom에서 Nav/Core Content 보존
-   Hover는 Keyboard/Touch 대체
-   Reduced Motion에서도 Direct Access 유지
-   핵심 콘텐츠를 breakpoint에서 삭제하지 않음

## 11. Motion / Accessibility / Performance

Static=major architecture/platform. Living=selected
water/cloud/grass/tree/character idle. Ambient=restrained
mist/light/distant movement. 모든 오브젝트를 움직이지 않는다.

Motion: Micro100--200ms / Component160--240 / Panel240--400 / World
Camera600--1000. Distance↑→Duration↑. One Motion=One Owner. Living
Motion Budget: Primary max1 / Secondary max2 / 나머지 weak ambient.

Semantic HTML. `<a>`=navigation, `<button>`=action.
Keyboard/Focus-visible/Touch/Reduced Motion/200% Zoom/Direct Content
Access 지원. 중요 Text는 이미지/3D texture에 굽지 않는다.

Fallback: Video→Poster / WebGL→Static World+HTML Nav / Character→Static
/ Transition→Immediate Route / Image→Fallback+Alt. Asset 실패가
Project/Contact/Nav 접근을 막으면 안 된다.

Performance: WebP/AVIF, WebM, GLB, route lazy load, 필요한 asset만
preload, offscreen motion/video pause, particle 제한, mobile quality
reduction, CLS 최소화. 목표 LCP≤2.5s / INP≤200ms / CLS≤0.1.

## 12. Final Composition Rules

1.  Primary focal point는 한 화면에 1개.
2.  정보 위계는 원칙적으로 Primary/Secondary/Utility 3단계.
3.  Typography owns type; parent owns spacing.
4.  Internal Gap \< Container Padding \< Group Gap \< Section Gap.
5.  Body는 100% line-height 금지.
6.  Hover 핵심 정보는 Focus/Touch에서도 접근.
7.  Visual Size ≠ Hit Area.
8.  Asset focal point ↔ responsive crop 검증.
9.  Motion distance ↑ → duration ↑.
10. Content parity는 필수, visual parity는 필수가 아님.
11. Fantasy는 Environment가 담당하고 UI는 Minimal.
12. 실제 Portfolio Content가 장식보다 항상 우선.

------------------------------------------------------------------------

# ARCHIVED --- DESIGN SYSTEM v2 / IMPLEMENTATION HISTORY

> 아래 내용은 삭제하지 않고 보존한다. v3와 충돌하는
> Font/Color/Visual/Layout 지시는 더 이상 현재 Source of Truth가 아니다.
> 과거 구현 기록, QA 결과, provenance 확인용으로만 사용한다.

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

# PERSONAL PORTFOLIO --- DESIGN SYSTEM v2 FINAL

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

## 2026-09-29 Latest compass and World HUD correction

Restore a restrained decorative compass: fine gold ring/ticks,
ivory/navy directional star, small cardinal letters at bottom-right. It
is non-interactive and does not reopen a destination map. Remove World
Quick View and the dotted character-to-recommendation path. Preserve
island label recommendation diamonds and primary top navigation. This
supersedes previous compass removal/Quick View restoration instructions
below.

## 2026-09-29 Latest four-island focus and hierarchy

Explicit final brief: primary 2560×1440; four islands, relative widths
Projects 100%, Skills 75%, About 70%, Contact 68%. About upper-left,
Skills lower-center-left, Projects central-upper, Contact right-center.
Keep current golden art; reduce backdrop/airship saturation and contrast
with pale-blue distance haze, never a black overlay. Labels use tiny
gold 01--04 and title only; short secondary/CTA reveal on hover, focus
and touch preview. Recommendation gold diamond is weaker than hover and
cyan/gold selection. Top nav WORLD/ABOUT/SKILLS/PROJECTS/CONTACT; no
compass map; Quick View + System retained. Character hover dwell 240ms,
subtle upper-body response, commit pose blend 450ms before 1.55s total
travel. Portrait uses large native scroll-snap island browsing with top
navigation. These user-approved layout/interaction revisions supersede
older five-island and compass instructions below; interiors remain
undecided.

## 2026-09-29 Latest World exterior reference

The supplied golden fantasy references now govern the World exterior:
warm sunset left, rich blue sky/crescent planet right, luminous cloud
ocean, deep faceted floating cliffs, ivory architecture with gold and
royal blue detail. Five distinct independent islands remain: cottage,
crystal workshop, central monumental castle, celestial observatory and
lighthouse. This supersedes the terrace-only exterior direction below;
existing HUD, typography, navigation and interior decision states
remain.

## Latest System and introduction treatment

System is now a small icon-only gear at top right, aligned with the
header and retaining a 44px target. Use existing blue glass/ivory-gold
detailing with a restrained static glow; open settings downward. Intro
copy sits over translucent backdrop-blurred glass rather than an opaque
white wash. Compass stays at bottom right. This supersedes the
bottom-left System and ivory intro backing below.

## Latest explicit HUD simplification

Remove World HUD Quick View and Menu controls. Keep the thin blue
cardinal compass freestanding at bottom right, and place compact
pale-glass System at bottom left within safe areas. Preserve direct
navigation through the top capsule and compass map, including Resume.
Portrait layouts retain visible top destination links. Improve the
approved left introduction with a soft-edged ivory backing, navy text
and stronger body weight; retain the scenery and copy. This supersedes
older Quick View/Menu/System placement instructions below.

## HUD reference-detail correction

Latest screenshot revision: horizontal white JY monogram/name lockup;
blue-glass top navigation and utility capsules with delicate double
ivory/gold outlines, separators and star/diamond accents. Quick
View/System share this shell with small vector icons. Island names
remain navy on pale ivory/blue plaques, now with shaped gold frames and
destination icons. Compass uses thin blue cardinal lines and a faint
local legibility wash, without a filled circular button or heavy border;
it sits above System. Existing navigation/movement behavior and approved
Korean copy remain unchanged. No reference coordinates or decorative
project claims are copied.

## Latest World HUD refinement --- explicit user brief

World \> Character \> Destination \> HUD \> Typography. Retain the
current scenery and use a low pale-glass capsule nav, subtle active
diamond, ivory/pale-blue island labels with thin gold ornaments and navy
text. Scene-local HUD palette uses existing navy/blue with warm ivory
`#f7f5ee` and restrained gold `#b79a61` for the requested treatment. No
dark label rectangles, large hover scale or duplicated top Sound/Motion.
Supplied Korean copy replaces prior handwritten/English marketing copy.
Projects remains dominant; surrounding landmarks use 60--70% of its
desktop width.

Bottom Quick View, functional compass with small map, contextual
selected-destination action and System stay inside safe areas.
Tablet/portrait reframe the scene; mobile touch selects then confirms.
World lookout arrow/WASD movement is now explicitly requested and
overrides previous exclusions below, within a bounded foreground region
only. Reduced motion preserves user movement as discrete steps and
immediate route access. Existing typography, scene assets and blue-white
water direction remain.

## Latest water palette correction

The latest user reference supersedes the earlier turquoise water
direction: sky-blue/clear blue pool surfaces and pale blue waterfall
shadows with predominantly white foam/highlights. Avoid a green/teal
cast. Preserve warm ivory architecture and foliage; apply water-specific
grading rather than a global scene hue shift.

## 2026-09-28 Vivid grand world reference revision

Latest user direction applies the grand limestone architecture, warm
ivory sunlight, blue sky and turquoise water palette across all five
islands. Projects remains dominant; each other landmark stays distinct.
Lower city buildings/bridges and left cloud forms must remain legible:
use depth through spacing and selective atmospheric layers instead of
globally washing out the background. Independent island/water/cloud
motion remains required. This supersedes the earlier globally reduced
backdrop saturation/contrast instruction.

## 2026-09-28 Projects interior reference and movement

User requested a grand circular glass exhibition hall with spatial depth
and character movement. Stage larger near-side exhibits and smaller rear
exhibits around an open central entrance; retain warm stone reflections,
cool sky and a central hanging banner. Use independently interactive
exhibit and character layers. Bounded movement is authorized for this
gallery only; other interior designs and World-map movement remain
undecided. Mobile follows character position within the panoramic scene
and retains persistent HTML destination controls. Reduced motion uses
immediate positioning; case studies never require arrival.

## 2026-09-28 Latest terrace reference refinement

Latest supplied reference uses bright ivory Mediterranean/classical
architecture: stepped villas, circular glass workshop, monumental
terraced gallery palace, open celestial colonnade and lighthouse
terraces. Keep Projects largest, sparse cypresses/natural trees,
readable limestone cliffs and turquoise flowing water. Foreground uses
worn stone steps, curved parapets and ruined columns with restrained
planting. Preserve independent island/character/environment layers. This
supersedes earlier gothic castle silhouettes for the world exterior
only; no companion or broader interaction changes are implied.

## 2026-09-28 Reference material clarification

User-approved visual correction: wide walkable island tops and
asymmetric stepped cliffs; large readable rock planes with localized
vegetation; naturally grouped tree canopies with visible branches;
varied grass and flowers between exposed foreground stones. Avoid
repeated narrow cones, pebble/scale-like stone patterns and uniform
dense moss. Foreground should establish human scale; distant scenery
should recede through lower contrast/saturation while preserving source
resolution. Keep independently interactive layers and living motion;
matching these references does not mean replacing the scene with a
single image. This does not lock interior destination designs or
character movement.

## 최신 사용자 수정 --- 레퍼런스 질감과 독립 레이어 유지

추가 사용자 요청: World를 브라우저 전체 화면에 연속적으로 채운다. 상단
풍경과 하단 카드 영역을 분리하지 않는다. 콘텐츠 직접 접근은 풍경 위의
펼침 메뉴로 제공하고 세로 화면에서는 섬 배치를 조정한다.

사용자의 최종 설명은 "이전처럼 섬 단위로 분리하되 레퍼런스의 섬
형태·질감·배경 형태·질감"을 구현하는 것이다. 정지 이미지 한 장이나 전체
화면 영상으로 대체하지 않는다. `인트로/01.png`, `02.png`의 밝은 청색
하늘, 따뜻한 식생, 깊은 절벽, 청록색 물, 풍부한 구름과 식별 가능한 배경
섬·비행선을 기준으로 독립 레이어를 구성한다. 섬별 부유, 물 흐름, 구름과
비행선 이동을 개별 제어한다. 이미지 재구성 결과를 원본 픽셀과 완전히
동일하다고 표현하지 않는다.

전체 풍경과 콘텐츠 직접 접근을 함께 제공하며 모바일 확대 탐색은 선택
사항이다. 기존 정지 원본 방향은 사용자 의도에 대한 잘못된 해석으로
폐기한다. 콘텐츠 내부 공간과 자유 이동은 계속 미확정이며 이번 수정으로
LOCKED로 바꾸지 않는다.

## 2026-09-28 사용자 Master Build 우선 적용

아래의 과거 방향과 충돌할 때 이번 사용자 지시를 우선한다. Portfolio
World 외관은 About의 개인 스튜디오/큰 나무, Skills의 Creative Tech
Workshop, Projects의 웅장한 현대 갤러리, Q&A의 천문대, Contact의 등대로
구분한다. Projects가 가장 큰 시각적 중심이다. 낮의 밝은 2.5D 세계에 독립
부유, 물/구름/안개/선택적 식생 움직임을 적용한다.

Hover/Focus는 환경과 캐릭터의 미세 반응, Click/Touch는 구름을 통과하는
카메라 진입으로 연결한다. Reduced Motion과 직접 콘텐츠 접근은 유지한다.
Power Up, Companion, WASD, Jump, Collision은 적용하지 않는다. 아래 과거
문구에 있는 Game Item/Toolkit 및 Point-based Character Movement를 이번
구현의 확정 요구사항으로 취급하지 않는다. 각 콘텐츠 내부 공간의 최종
디자인과 자유 이동은 여전히 미확정이다. Typography는 Pretendard
Variable + Instrument Serif를 유지한다.

**Status:** FINAL\
**Core:** Cinematic 2.5D Portfolio World × Editorial Web UI\
**Primary Reference:** 1440×810\
**Principle:** Portfolio First

## 00. Governance

**LOCKED:** IA, Portfolio First, World=Navigation, Dual Navigation,
Information Hierarchy, Cinematic→Explore→Read, gameplay 없이 콘텐츠
접근, First Visit/Revisit, Progressive Enhancement,
Accessibility/Fallback.

**SYSTEM:** Typography, Color, Spacing, Radius, Components, States,
Grid, Responsive, Navigation, World Interaction, Composition Rules,
Transition Grammar.

**WORKING:** Camera, Lighting, Material, Fog, Environment color 미세값,
Glass/Blur/Shadow, Water/Waterfall, Cloud speed, World/Cinematic motion,
Particle/FX, Scene composition.

> WORKING 값 변경만으로 문서 전체를 반복 수정하지 않는다.

## 01. Experience

REAL WORLD → PORTAL → TOOL UNIVERSE → PORTFOLIO WORLD → READ MODE

-   Real World: Photorealistic / Personal / Cinematic
-   Portal: Digital / Cyan / Unstable / Energetic
-   Tool Universe: Abstract / Transformative
-   Portfolio World: Bright / Airy / Soft Stylized 3D / Editorial
-   Read Mode: Quiet / Information First

정보 우선순위: **Identity → Projects → Navigation → World →
Decoration**. PROJECTS는 Primary Landmark다.

  Mode        Content   Motion
  ----------- --------- --------
  Cinematic   Low       High
  Explore     Medium    Medium
  Read        High      Low

READ MODE: Camera Locked, Parallax Off/Minimal, Living Motion 0--1, FX
최소.

## 02. Typography

Primary: **Pretendard Variable**. Editorial Accent: **Instrument
Serif**. Serif는 Hero/짧은 Statement/Scene Opening에만 사용하고 한
viewport 주요 표현은 원칙적으로 1개.

  Style          Size   Single LH   Multi LH     Weight   Tracking
  ------------ ------ ----------- ---------- ---------- ----------
  Display XL     64px        100%       112%        700        -2%
  Display L      56px        100%       114%        700        -2%
  Display M      48px        100%       117%        700      -1.5%
  H1             40px      100%\*       120%        700      -1.5%
  H2             32px      100%\*       125%        700        -1%
  H3             24px      100%\*       133%        600        -1%
  H4             20px      100%\*       140%        600      -0.5%
  Body L         18px         ---       165%        400          0
  Body M         16px         ---       160%        400          0
  Body S         14px         ---       155%        400          0
  Label L        14px        100%     140%\*        600        +1%
  Label M        12px        100%     150%\*        600        +3%
  Caption        12px      100%\*       150%   400--500        +1%

`*` 구조적으로 한 줄이 보장될 때만 100%.
Navigation/Button/Tag/Meta/World Label은 기본 `line-height:1`. Body에는
100% 금지.

Instrument Serif: XL 48--72/105%, L 40--56/108%, M 40/115%, S 28/120%.
한 줄 전용이면 100% 가능.

**Figma → CSS:** font px→rem/clamp, line-height %→unitless, tracking
%→em, text width→ch.\
한글: `word-break:keep-all; overflow-wrap:break-word;`\
Hero 18--24ch / Lead 40--50ch / Body 60--68ch / Article max 68ch.

**Typography owns typography; Layout owns spacing.** Heading/paragraph
기본 margin은 0.

## 03. Color

Neutral:
`#FFFFFF #F8FAFC #F1F5F9 #E2E8F0 #CBD5E1 #94A3B8 #64748B #475569 #334155 #1E293B #0F172A #080D18`.

Focus Blue:
`50 #EFF6FF / 100 #DBEAFE / 200 #BFDBFE / 300 #93C5FD / 400 #60A5FA / 500 #3B82F6 / 600 #2563EB / 700 #1D4ED8 / 800 #1E40AF / 900 #1E3A8A`.
Primary Interactive=`#2563EB`.

Portal Cyan:
`50 #ECFEFF / 100 #CFFAFE / 200 #A5F3FC / 300 #67E8F9 / 400 #22D3EE / 500 #06B6D4 / 600 #0891B2 / 700 #0E7490 / 800 #155E75 / 900 #164E63`.
Portal/Tool Universe/Transformation/Energy 전용.

Semantic: Text Primary `#0F172A`, Secondary `#475569`, Muted `#64748B`,
Inverse `#FFFFFF`; Surface Base `#FFFFFF`, Subtle `#F8FAFC`; Border
Default `#E2E8F0`, Strong `#CBD5E1`; Success `#16A34A`, Warning
`#D97706`, Error `#DC2626`, Info `#2563EB`.

On Media: Primary `#FFFFFF`, Secondary `#E2E8F0`, Muted `#94A3B8`, Scrim
Strong `#080D18`, Soft `#0F172A`. Scrim opacity는 WORKING.

Environment Reference: Sky `#DCEFFF/#A8D8F0/#73B6D8`; Cloud `#F8FCFF`;
Water `#A7E4F2/#64C6DF/#3697B8`; Grass `#BBD98B/#83B96A/#527D4D`; Stone
`#D8D6CE/#AAA9A3/#737672`; Sunlight `#FFE7A8`; Architecture
`#D88968/#AFC7D5`.

Environment HEX는 literal material output이 아니다.
Material+Lighting+Fog+Tone Mapping 결과로 판단. 일반 텍스트 대비 4.5:1,
큰 텍스트 3:1 이상.

## 04. Spacing / Radius / Composition

Spacing: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 80 / 96`.\
Semantic: 2XS4, XS8, S12, M16, ML20, L24, XL32, 2XL48, 3XL64, 4XL80,
5XL96.

Radius: XS6, S10, M14, L20, XL24, 2XL32, Full Pill/Circle.

### Surface Rule

**Surface/Card 계열: Corner Radius = Internal Padding 값.**

  Surface            Radius   Padding   Internal Gap
  ---------------- -------- --------- --------------
  Compact                10        10              8
  Small                  14        14          8--12
  Standard               20        20         12--16
  Large/Floating         24        24         16--20
  Modal/Major            32        32         20--24

Button/Input/Tag/Pill/Circle은 예외. `R50%→P50%` 규칙 없음.\
Nested: **Inner Radius \< Outer Radius**.\
Spacing relation: **Internal Gap \< Container Padding \< Group Gap \<
Section Gap**.

Border: Default `1px #E2E8F0`, Strong `1px #CBD5E1`, Focus
`2px #3B82F6`.\
Shadow: 0 none; 1 `0 2px 8px rgba(15,23,42,.08)`; 2
`0 8px 24px rgba(15,23,42,.10)`; 3 `0 16px 40px rgba(15,23,42,.14)`.\
Surface: Base / Raised / Floating / Glass. Border+Strong
Shadow+Glass+Glow 동시 남용 금지.

## 05. Components / Interaction

고정 height보다 `min-height`.

-   Button S: min-H36 / X14 / gap6
-   Button M: min-H44 / X18 / gap8
-   Button L: min-H52 / X24 / gap10
-   Input: min-H44 / padding 12×16
-   Textarea: min-H120 / resize vertical
-   Icon Button: min44×44
-   Interaction target: 최소 44×44
-   Icons: 16/20/24/32; 44px control→20px icon, 52px→24px icon

States: Default / Hover / Focus-visible / Pressed / Selected /
Transitioning / Disabled / Loading / Error.

Primary: Default `#2563EB`, Hover `#1D4ED8`, Pressed `#1E40AF`, Disabled
`#E2E8F0/#94A3B8`. Pressed scale(.98)은 optional.

Focus: `outline:2px solid #3B82F6; outline-offset:2px`. Hover-only 정보
금지. World Hotspot Hover는 Blue Button State가 아니라
Lighting+Label/Preview.

Navigation: ABOUT / SKILLS / PROJECTS / Q&A / CONTACT. World 조작 없이도
Global HTML Navigation 사용 가능.

Project Preview 필수: Number, Name, Category, My Role, One-line Summary,
Thumbnail, View Project. 선택: Year/Tech/Team.

## 06. Responsive

Grid: Desktop12 / Tablet8 / Mobile4. Primary Composition
Reference=1440×810, 강제 16:9 아님.

Breakpoints: Wide≥1920 / Desktop1280--1919 / Compact1024--1279 /
Tablet768--1023 / Mobile\<768.

최종 경험은 **Width + Viewport Shape + Capability** 3축으로 결정.
Breakpoint ≠ Quality Tier.

QA: 2560×1440, 1920×1080, **1440×810 PRIMARY**, **1366×768 HIGH**,
1180×820, 1024×768, 768×1024, **430×932 PRIMARY MOBILE**, 402×874,
390×844, **360×800 WORST CASE**. Boundary: 767/768, 1023/1024,
1279/1280, 1919/1920.

Wide는 중앙을 단순 확대하지 않고 주변 World 확장. Compact는 camera
reframe+UI 재배치. Tablet은 vertical composition. Mobile은 Reduced/2.5D
기본, capability 충분 시 enhanced 가능.

Container padding: Wide/Desktop32--48, Compact24--32, Tablet24,
Mobile16--20.\
Fullscreen: `min-height:100vh; min-height:100dvh;`. `width:100%` 우선,
safe-area env() 고려.

## 07. World / Motion / Transition

Static: Island/Bridge/Cliff/Architecture/Platform/Major Tree. Living:
Waterfall/Water/Cloud/Grass/Flower/Tree/Character Idle. Ambient:
Bird/Leaf/Mist/Light Shift/Distant Motion. 모든 오브젝트를 움직이지
않는다.

Material: Soft Stylized 3D. Heavy metallic/chrome/gritty PBR/plastic toy
look 지양.

Lighting: Real World=Warm Desk+City Blue; Portal=Cyan Core+Electric
Blue+Violet; Portfolio World=Warm Sun+Sky Fill+Cloud/Water Bounce.

Player Height=1U reference. World Scale+Camera FOV+Camera Distance를
함께 검증.

Player: Idle/Look/Turn/React/Landing/Recovery/Scene Enter/Exit. 선택
Short Walk/Approach. World Map 기본에서 Free Run/Platform Jump/Combat
제외.

Motion reference: Micro100--200ms / Component160--240 / Panel240--400 /
World Camera600--1000. 이동 거리가 커질수록 duration 증가. UI는
transform/opacity 우선. Cinematic은 WORKING.

Living Motion Budget: Primary 최대1, Secondary 최대2, 나머지는 약한
Ambient.

Transition: World→Focus/Push/Atmosphere/New Scene; Information→short
fade/slide; Cinematic→full-screen. Cinematic은 navigation을 잠그지
않는다.

First Visit: Real World→Portal→Tool Universe→Arrival→World. Return:
Direct World. Direct URL: Direct Content. Back: Previous state. Intro
강제 재생 금지.

Sound: Visual autoplay / Audio opt-in.

## 08. Accessibility / Web / Performance

Semantic HTML 사용. 이동은 `<a>`, action은 `<button>`.
Keyboard/Focus/Touch/Reduced Motion/200% Zoom 지원. Color만으로 상태
표현 금지. 핵심 콘텐츠를 breakpoint에서 제거하지 않는다.

HTML/React owns: 이름, 직무, Navigation, Button, Project 정보, Tooltip,
Forms, Contact, Resume, Accessibility.\
Three.js/World owns: Island, Bridge, Waterfall, Architecture,
Environment, Lighting, Character, Camera, FX. 중요 텍스트를 이미지/3D
texture에 굽지 않는다.

Motion Ownership: 한 움직임에는 하나의 Owner만 둔다. Curtain/Portal
Suction→Higgsfield, World Camera→Three.js, Navigation/UI→CSS/GSAP,
Waterfall→선택한 단일 방식.

Priority: **Content \> UI \> World \> Living Motion \> Decorative FX**.\
Loading: Semantic HTML/Core Content → Critical CSS/Fonts → Hero Poster →
Navigation → World Base → Three.js → Living Motion → FX.

Fallback: Video fail→Poster; Three.js fail→Static World; WebGL fail→HTML
Portfolio; Waterfall fail→Static Waterfall; Character fail→Idle Image;
Transition fail→Immediate Route; Sound fail→Silent.

QA: Keyboard only / 200% zoom / Reduced Motion / Touch only / No WebGL /
Video failure / Image failure / Back / Refresh.

## 09. Final Composition Rules

1.  Surface Radius = Surface Padding.
2.  Inner Radius \< Outer Radius.
3.  Internal Gap \< Container Padding.
4.  Group Gap \> Internal Gap.
5.  Single-line UI = 100% line-height.
6.  Multi-line Heading uses dedicated multi-line LH.
7.  Body never uses 100% LH.
8.  Icon+Label uses Flex/Grid center.
9.  Visual Size ≠ Hit Area.
10. Typography owns type; parent owns spacing.
11. Hover information = Focus/Touch accessible.
12. Motion distance ↑ → Duration ↑.
13. World Scale ↔ Camera 검증.
14. Material ↔ Lighting 검증.
15. Asset focal point ↔ Responsive crop 검증.
16. Loading ↔ Layout Stability 검증.
17. Desktop/Mobile visual parity는 불필요하지만 **Content parity는
    필수**.
18. 같은 Component Family에서 임의의 중간 Radius/Padding/Gap 값을 만들지
    않는다.

## 10. Visual Do / Don't

### DO

Portfolio first; Editorial hierarchy; PROJECTS prominence; controlled
whitespace; living environment; subtle interaction; consistent
transitions; accessible navigation; progressive enhancement.

### DON'T

Game HUD everywhere; forced gameplay; XP/Level/Badge; rainbow UI;
excessive glass/glow/radius; every object moving; long fly-through; too
many fonts; image-baked UI text; generic AI floating cards; arbitrary
spacing/radius values.

------------------------------------------------------------------------

**FINAL RULE:** 콘텐츠·IA·접근성·시스템 규칙은 고정한다.
디자인·카메라·모션·FX의 세부값은 실제 구현 결과를 보며 WORKING 범위에서
조정한다.

# FINAL EXPERIENCE UPDATE --- 2026-09-23

## Real World

-   첫 화면은 Seoul Night Workspace 기반의 Photorealistic Cinematic
    Scene.
-   Warm desk light × cool city blue.
-   iMac, designer/developer workspace, black-and-tan Maltipom, white
    chiffon curtains 유지.
-   왼쪽은 HTML Hero Copy용 안전 영역.
-   `Hello,`만 Instrument Serif, 나머지 UI는 Pretendard.
-   Portal Cyan은 Default 화면에서 사용하지 않고 `ENTER WORLD` 이후
    이상현상부터 등장.
-   흐름: UI Fade → Ambient Slow → Monitor Focus → DOF 증가 →
    캐릭터/강아지 반응 → Cyan Pixel → Distortion → Portal Awakening →
    Portal Open → Suction → Camera Follow → Tool Universe.
-   Reduced Motion: Dim → Monitor Cyan Glow → Short Fade → Tool
    Universe.

## Portfolio World

-   Floating Nature World.
-   자유 이동은 기본 제공하지 않는다.
-   캐릭터는 Idle / Look / React / Scene Transition 중심.
-   섬 Hover/Focus/Click으로 탐색하며 Global HTML Navigation을 항상
    병행한다.

## Projects / Project Archive

-   Portfolio World의 공중섬 구조를 반복하지 않는다.
-   PROJECTS 진입 후 공간은 **Architectural Gallery / Exhibition
    Archive**.
-   4개 프로젝트를 한 화면에 동시에 보여주는 B 방식 유지.
-   Hover/Focus → 전시물 반응 + Preview.
-   Click → 캐릭터가 HOME + 프로젝트 4개 고정 포인트 중 해당 위치로 짧게
    자동 이동(Point-based Movement) → Preview 확장 → View Case Study.
-   자유 이동, Collision, Pathfinding은 기본 구현에서 제외.
-   Case Study 진입 후 READ MODE.

## Skills

-   기존 `POWER UP` 개념 삭제.
-   XP / Level / 성장 / 획득 시스템 사용 금지.
-   Portfolio World와 같은 섬 구조, Project Archive와 같은 전시관 구조를
    반복하지 않는다.
-   방향은 **Game Item / Toolkit UI**.
-   Skill은 실제 작업 도구를 게임 아이템처럼 재해석하되 정보는 실제 역량
    중심.
-   예: Figma / Photoshop / Illustrator / HTML / CSS / JavaScript /
    React / Git / GitHub / GSAP / Three.js / AI Tools.
-   정보 구조: Item Name → Category → What I Can Do → Used In Projects.
-   Hover/Focus/Touch 모두 동일 핵심 정보에 접근 가능.
-   복잡한 자유 이동은 사용하지 않는다.

## Cross-Scene Interaction Grammar

-   Portfolio World = Map / Select.
-   Skills = Toolkit / Item Select.
-   Projects = Gallery / Exhibit Select + Point-based Character
    Movement.
-   Case Study = Document / Read.
-   화면마다 같은 공간 문법과 인터랙션을 반복하지 않는다.

## Locked Composition Rules

-   Surface/Card: Radius = Internal Padding.
-   Inner Radius \< Outer Radius.
-   Internal Gap \< Container Padding.
-   Group Gap \> Internal Gap.
-   구조적으로 한 줄인 UI는 Line Height 100%.
-   여러 줄 Heading은 Multi-line LH Token 사용.
-   Body에는 100% Line Height 금지.
-   Typography owns type; Parent owns spacing.
-   Visual Size ≠ Hit Area.
-   Hover 핵심 정보는 Focus/Touch에서도 접근 가능.

## 2026-10-01 Real World — 사용자 제공 타이포그래피 레퍼런스 적용

이 항목은 01.3의 소개 위치·폰트·마커 제한에 대한 최신 사용자 요청을 반영한다.
- Real World 소개 제목만 **Griun DUJUNDUJUN 400**을 사용한다. Portfolio World의 Marcellus + SUIT 원칙과 나머지 UI의 SUIT는 유지한다.
- Desktop 제목은 왼쪽 9vw / 위 23svh 창가 영역, 40–72px. `아이디어`에 기존 Yellow `#FFC928` 마커를 사용한다. Text Shadow/Glow는 추가하지 않는다.
- 이름·직무는 오른쪽 아래 ENTER WORLD 아래로 이동한다. 원형 화살표는 버튼 문구 오른쪽에 둔다.
- Mobile은 제목 32–48px, 좌우 24px, 입장 UI는 하단 왼쪽으로 재배치한다. 짧은 가로 화면은 별도 배치한다.
- 배경·영상·포털 진입은 기존 구현을 유지한다. 레퍼런스의 임시 서브 문구는 콘텐츠로 추가하지 않는다.
- 공식 배포 원본 WOFF2를 수정 없이 로컬 제공한다: https://www.griun.co.kr/fonts/dujundujun
