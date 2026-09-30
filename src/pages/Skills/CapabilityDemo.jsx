import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const photos = [
  { src: '/assets/production/images/skills-world/courtyard-v3.webp', name: '낮의 유적' },
  { src: '/assets/production/images/natural-world/projects-room-v1.webp', name: '전시 공간' },
]
const safeImage = event => { event.currentTarget.hidden = true }

export default function CapabilityDemo({ type, still }) {
  const [choice, setChoice] = useState(0)
  const host = useRef(null), animation = useRef(null)
  useEffect(() => () => animation.current?.revert(), [])
  useEffect(() => { if (still) animation.current?.revert() }, [still])
  function play(animated) {
    animation.current?.revert()
    setChoice(animated ? 1 : 0)
    if (animated && !still) animation.current = gsap.context(() => {
      gsap.from('.sc-demo-piece', { opacity: 0, y: 16, stagger: .18, duration: .5, ease: 'power2.out' })
    }, host)
  }
  return <div className="sc-cap-demo" ref={host}>
    <p className="sc-demo-note">원리를 보여주는 예시입니다. 실제 프로젝트 화면과는 다릅니다.</p>
    {type === 'design' && <>
      <div className="sc-example-design" data-designed={choice === 1}>
        <strong>마음에 드는 장소 찾기</strong><span>어디로 가고 싶나요?</span>
        <div><span>공원</span><span>도서관</span></div><span className="sc-example-button">장소 찾아보기</span>
      </div>
      <div className="sc-demo-options" role="group" aria-label="디자인 비교">{['화면 구조', '디자인 적용'].map((label, i) => <button key={label} aria-pressed={choice === i} onClick={() => setChoice(i)}>{label}</button>)}</div>
      <p role="status">{choice ? '색과 간격으로 제목과 버튼을 구분했습니다.' : '먼저 내용의 순서와 버튼 위치를 정합니다.'}</p>
    </>}
    {type === 'responsive' && <>
      <div className="sc-responsive-demo" data-mobile={choice === 1}>
        <strong>오늘 가볼 곳</strong><div><span>가까운 공원</span><span>동네 도서관</span></div>
      </div>
      <div className="sc-demo-options" role="group" aria-label="화면 크기 비교">{['컴퓨터 화면', '휴대폰 화면'].map((label, i) => <button key={label} aria-pressed={choice === i} onClick={() => setChoice(i)}>{label}</button>)}</div>
      <p role="status">{choice ? '좁은 화면에서는 내용을 위아래로 배치합니다.' : '넓은 화면에서는 내용을 나란히 배치합니다.'}</p>
    </>}
    {type === 'gallery' && <>
      <img className="sc-demo-photo" src={photos[choice].src} alt={photos[choice].name} onError={safeImage} />
      <div className="sc-demo-options" role="group" aria-label="사진 선택">{photos.map((photo, i) => <button key={photo.name} aria-pressed={choice === i} onClick={() => setChoice(i)}><img src={photo.src} alt="" onError={safeImage} />{photo.name}</button>)}</div>
      <p role="status">선택한 사진: {photos[choice].name}. 작은 사진을 누르면 큰 사진이 바뀝니다.</p>
    </>}
    {type === 'motion' && <>
      <div className="sc-motion-demo"><img className="sc-demo-photo sc-demo-piece" src={photos[0].src} alt="낮의 유적" onError={safeImage} /><strong className="sc-demo-piece">사진을 먼저 보고</strong><span className="sc-demo-piece">이어서 설명을 읽습니다.</span></div>
      <div className="sc-demo-options" role="group" aria-label="움직임 비교"><button onClick={() => play(false)}>바로 표시</button><button onClick={() => play(true)}>움직임 재생</button></div>
      <p role="status">{still ? '동작 줄이기 설정에 따라 내용을 바로 표시합니다.' : choice ? '사진, 제목, 설명 순서로 나타납니다.' : '사진과 설명을 한 번에 표시합니다.'}</p>
    </>}
  </div>
}
