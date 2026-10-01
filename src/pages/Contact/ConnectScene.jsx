import SeasonalAtmosphere from '../../components/SeasonalAtmosphere.jsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useGalleryWalk from '../Projects/useGalleryWalk.js'

const root = '/assets/production/images/'
const stars = Array.from({ length:36 }, (_, i) => ({ x:5+(i*37)%90, y:3+(i*19)%46, size:i%6===0?4:2, duration:3.6+(i%7)*.7 }))
// A seven-star ladle silhouette; decorative sky, never a hidden control.
const constellation = [[18,82],[60,58],[105,55],[145,72],[216,58],[206,114],[154,122]]
// Stylized silhouettes for the scene, rather than a geographically accurate star chart.
const skyFigures = [
  { id:'cassiopeia', stars:[[22,36],[62,104],[112,52],[163,99],[216,24]], lines:'M22 36L62 104L112 52L163 99L216 24' },
  { id:'orion', stars:[[66,18],[161,29],[96,69],[118,76],[140,83],[55,133],[177,135]], lines:'M66 18L96 69L55 133L177 135L140 83L161 29L66 18M96 69L118 76L140 83' },
  { id:'cygnus', stars:[[126,16],[119,57],[109,98],[99,137],[30,45],[69,52],[173,71],[218,94]], lines:'M126 16L119 57L109 98L99 137M30 45L69 52L119 57L173 71L218 94' },
]
const seaGlints = Array.from({ length:42 }, (_, i) => {
  const row = i % 10
  return { x:767+row*18+Math.sin(i*7.1)*(14+row*9), y:728+row*12+(i%3)*3, width:2+row*.45+(i%3), delay:-i*.67 }
})
const constrain = point => ({ x: Math.max(19, Math.min(42, point.x)), y: Math.max(82.8, Math.min(86, point.y)) })

export default function ConnectScene({ blocked, still, hidden, signal }) {
  const scene = useRef(null), plane = useRef(null), callbacks = useRef(null)
  const [idle, setIdle] = useState('look')
  const [failed, setFailed] = useState(false)
  const [sittingReady, setSittingReady] = useState(false)
  const [walkReady, setWalkReady] = useState({})
  const idleTimers = useRef([])
  const walk = useGalleryWalk({ reduced: still, paused: blocked, hidden, initialPosition: { x: 33, y: 84 }, constrain, speed: 8 })
  callbacks.current = { walk, blocked }

  useLayoutEffect(() => {
    const measure = () => {
      const { width, height } = scene.current.getBoundingClientRect()
      const artWidth = Math.max(width, height * 1672 / 941), artHeight = artWidth * 941 / 1672
      // Match cover crop exactly so the character remains on the painted ledge.
      Object.assign(plane.current.style, { width: artWidth + 'px', height: artHeight + 'px', left: (width - artWidth) * (width < 768 ? .28 : .5) + 'px', top: (height - artHeight) * .5 + 'px' })
    }
    measure()
    const observer = new ResizeObserver(measure); observer.observe(scene.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const reset = () => {
      idleTimers.current.forEach(clearTimeout); setIdle('look')
      if (!still && !blocked) idleTimers.current = [setTimeout(() => setIdle('shift'), 14000), setTimeout(() => setIdle('sit'), 30000)]
    }
    reset(); window.addEventListener('keydown', reset); window.addEventListener('pointerdown', reset)
    return () => { idleTimers.current.forEach(clearTimeout); window.removeEventListener('keydown', reset); window.removeEventListener('pointerdown', reset) }
  }, [still, blocked])
  useEffect(() => {
    const down = event => {
      const current = callbacks.current
      if (current.blocked || event.altKey || event.ctrlKey || event.metaKey || document.querySelector('dialog[open]')) return
      if (event.target.closest?.('a,button,input,textarea,select,[contenteditable="true"]')) return
      current.walk.keyDown(event)
    }
    const up = event => callbacks.current.walk.keyUp(event)
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])
  useEffect(() => { if (blocked) walk.stop() }, [blocked])
  const walkTo = event => {
    if (blocked || event.pointerType === 'touch') return
    const rect = plane.current.getBoundingClientRect()
    const point = { x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 }
    if (point.x < 19 || point.x > 42 || point.y < 81 || point.y > 87) return
    walk.go(point); document.getElementById('main')?.focus({ preventScroll: true })
  }
  const pose = walk.player.view
  return <div className="connect-night-scene" ref={scene} data-failed={failed} aria-hidden="true" onPointerDown={walkTo}>
    <div className="connect-environment-layers" data-blocked={blocked}>
    <picture className="connect-night-art"><source media="(max-width:767px)" srcSet={root + 'contact/connect-winter-mobile-v1.webp'}/><img src={root + 'contact/connect-winter-v1.webp'} alt="" fetchPriority="high" onError={() => setFailed(true)}/></picture>
    <SeasonalAtmosphere season="winter" still={still || hidden || blocked} />
    <div className="connect-night-stars">{stars.map(({x,y,size,duration}, i) => <i key={i} style={{ left:x+'%', top:y+'%', width:size, height:size, animationDelay:-i*1.3+'s', animationDuration:duration+'s' }}/>)}</div>
    <div className="connect-meteors">{[0, 1, 2].map(i => <i key={i} className={'connect-meteor meteor-' + i}/>)}</div>
    <svg className="connect-constellation" viewBox="0 0 240 150" fill="none">
      <path className="connect-constellation-thread" pathLength="1" d="M18 82L60 58L105 55L145 72L216 58L206 114L154 122L145 72"/>
      {constellation.map(([x,y], i) => <g className="connect-constellation-star" key={i} style={{ animationDelay:-i*.55+'s' }}>
        <circle className="connect-star-halo" cx={x} cy={y} r="10"/>
        <path className="connect-star-rays" d={`M${x-6} ${y}h12M${x} ${y-6}v12`}/>
        <circle className="connect-star-core" cx={x} cy={y} r={i===4?2.8:2.1}/>
      </g>)}
    </svg>
    {skyFigures.map(({id, stars:points, lines}, figure) => <svg key={id} className={'connect-constellation connect-sky-figure sky-' + id} viewBox="0 0 240 150" fill="none">
      <path className="connect-constellation-thread" pathLength="1" d={lines} style={{animationDelay:-(figure*4+2)+'s'}}/>
      {points.map(([x,y], i) => <g className="connect-constellation-star" key={i} style={{animationDelay:-(figure*2+i*.8)+'s'}}>
        <circle className="connect-star-halo" cx={x} cy={y} r="10"/>
        <path className="connect-star-rays" d={`M${x-6} ${y}h12M${x} ${y-6}v12`}/>
        <circle className="connect-star-core" cx={x} cy={y} r={i===1?2.8:2.1}/>
      </g>)}
    </svg>)}
    <div className="connect-airship-flight"><img src={root+'contact/connect-airship.webp'} alt="" onError={event => { event.currentTarget.hidden=true }}/></div>
    <div className="connect-night-clouds"><img src={root + 'contact/connect-cloud.webp'} alt="" onError={e => { e.currentTarget.hidden = true }}/><img src={root + 'contact/connect-cloud.webp'} alt="" onError={e => { e.currentTarget.hidden = true }}/></div>
    <div className="connect-walk-plane" ref={plane}>
      {!failed && <div className="connect-sunset-light"><i/><i/><i/></div>}
      {!failed && <picture className="connect-water-texture"><source media="(max-width:767px)" srcSet={root + 'contact/connect-winter-mobile-v1.webp'}/><img src={root + 'contact/connect-winter-v1.webp'} alt="" onError={event => { event.currentTarget.hidden = true }}/></picture>}
      {!failed && <svg className="connect-water-light" viewBox="0 0 1672 941" fill="none">
        <defs><clipPath id="connect-open-water"><path clipRule="evenodd" d="M737 717L805 718L867 751L1030 780L1018 841L952 853L921 831L901 837L871 820L836 829L805 813L796 789L771 759Z M809 803L824 777L845 763L868 774L883 793L905 808L864 819L824 817Z"/></clipPath></defs>
        <g clipPath="url(#connect-open-water)">
          {[0,1,2].map(group => <g className="connect-water-ripples" key={group} style={{ animationDelay:-group*1.7+'s' }}>{Array.from({length:12}, (_, i) => <path key={i} d={`M${752+i*15+Math.sin(i*2.3+group)*28} ${726+i*10+group*3}q${3+i*.3} -1 ${7+(i%4)*3} 0`} />)}</g>)}
          {seaGlints.map(({x,y,width,delay},i) => <path className="connect-sea-glint" key={i} d={`M${x} ${y}h${width}`} style={{ animationDelay:delay+'s', animationDuration:3.2+(i%6)*.6+'s' }}/>) }
        </g>
      </svg>}
      {!failed && <div className="connect-character" data-moving={walk.player.moving && !still && !blocked} data-idle={idle} data-x={walk.player.x.toFixed(2)} data-y={walk.player.y.toFixed(2)} style={{ left: walk.player.x + '%', top: walk.player.y + '%', '--facing': pose === 'side' ? walk.player.facing : 1 }}>
        <span className="connect-character-shadow"/>
        <img className="connect-standing" data-sitting={idle === 'sit' && sittingReady} src={root + 'project-gallery/character/' + pose + '-idle.webp'} alt="" onError={e => { e.currentTarget.hidden = true }}/>
        {['front', 'back', 'side'].map(view => <span className="connect-stride" key={view} data-active={view === pose && walkReady[view]}><img src={root + 'project-gallery/character/' + view + '-walk.webp'} alt="" onLoad={() => setWalkReady(previous => ({ ...previous, [view]: true }))} onError={() => setWalkReady(previous => ({ ...previous, [view]: false }))}/></span>)}
        <img className="connect-sitting" data-visible={idle === 'sit' && sittingReady} src={root + 'contact/connect-sitting-v1.webp'} alt="" onLoad={() => setSittingReady(true)} onError={() => setSittingReady(false)}/>
      </div>}
    </div>
    {signal > 0 && <div key={signal} className="connect-signal connect-direct-signal"><i/><b/></div>}
    </div>
    <div className="connect-night-vignette"/>
  </div>
}
