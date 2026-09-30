import { useEffect, useRef, useState } from 'react'
import { studioRoom } from './aboutStudio.js'

const cloud = '/assets/production/images/natural-world/painted-cloud-v1.webp'
const vertexSource = `attribute vec2 position; varying vec2 uv;
void main(){uv=(position+1.0)*0.5;gl_Position=vec4(position,0.0,1.0);}`
const fragmentSource = `precision mediump float;
uniform sampler2D picture;uniform float time;varying vec2 uv;
float area(vec2 p,vec2 center,vec2 radius){return 1.0-smoothstep(0.45,1.0,length((p-center)/radius));}
void main(){
  vec2 p=vec2(uv.x,1.0-uv.y);
  vec4 base=texture2D(picture,uv);
  float green=smoothstep(-0.015,0.045,base.g-base.r*0.96)*smoothstep(0.025,0.10,base.g-base.b);
  float plants=max(area(p,vec2(0.26,0.09),vec2(0.30,0.22)),area(p,vec2(0.40,0.33),vec2(0.10,0.20)));
  plants=max(plants,area(p,vec2(0.27,0.48),vec2(0.12,0.10)));
  plants=max(plants,area(p,vec2(0.72,0.30),vec2(0.12,0.21)));
  plants=max(plants,area(p,vec2(0.73,0.71),vec2(0.10,0.15)));
  plants=max(plants,area(p,vec2(0.87,0.49),vec2(0.09,0.10)));
  plants=max(plants,area(p,vec2(0.25,0.79),vec2(0.12,0.16)));
  float wind=sin(time*1.35+p.y*19.0)+0.35*sin(time*2.1+p.x*27.0);
  vec2 offset=vec2(wind*0.0035,sin(time*1.2+p.x*20.0)*0.0012)*plants*green;
  gl_FragColor=texture2D(picture,clamp(uv+offset,0.001,0.999));
}`

// Only green foliage is displaced. Architecture, objects and HTML hit areas stay fixed.
// The original <img> underneath is always available if WebGL cannot render.
function FoliageWind({ running }) {
  const canvas = useRef(null), controls = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const node = canvas.current
    const gl = node.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' })
    if (!gl) return
    let disposed = false, frame = 0, last = 0, elapsed = 0, loaded = false
    const shaders = [], program = gl.createProgram(), buffer = gl.createBuffer(), texture = gl.createTexture()
    const makeShader = (type, source) => {
      const shader = gl.createShader(type)
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Foliage shader unavailable')
      gl.attachShader(program, shader)
    }
    let timer
    const draw = () => { if (disposed || !loaded || gl.isContextLost()) return; gl.uniform1f(timer, elapsed); gl.drawArrays(gl.TRIANGLES, 0, 6) }
    const resize = () => {
      if (disposed || gl.isContextLost()) return
      const width = Math.min(1800, Math.round(node.clientWidth * Math.min(devicePixelRatio, 1.25)))
      node.width = Math.max(1, width); node.height = Math.max(1, Math.round(width * 941 / 1672))
      gl.viewport(0, 0, node.width, node.height); draw()
    }
    const tick = now => {
      if (!last) last = now
      if (now - last >= 32) { elapsed += Math.min((now - last) / 1000, .08); last = now; draw() }
      frame = requestAnimationFrame(tick)
    }
    const stop = () => { cancelAnimationFrame(frame); frame = 0; last = 0 }
    const lost = event => { event.preventDefault(); stop(); setReady(false) }
    const observer = new ResizeObserver(resize)
    const source = new Image()
    try {
      makeShader(gl.VERTEX_SHADER, vertexSource); makeShader(gl.FRAGMENT_SHADER, fragmentSource)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Foliage renderer unavailable')
      gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      timer = gl.getUniformLocation(program, 'time')
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      source.onload = () => {
        if (disposed || gl.isContextLost()) return
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
        loaded = true; resize(); setReady(true)
      }
      source.src = studioRoom
      controls.current = { setRunning(value) { stop(); if (value && loaded && !gl.isContextLost()) frame = requestAnimationFrame(tick) } }
      node.addEventListener('webglcontextlost', lost)
      observer.observe(node)
    } catch { setReady(false) }
    return () => {
      disposed = true; stop(); observer.disconnect(); source.onload = null; controls.current = null
      node.removeEventListener('webglcontextlost', lost)
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader))
    }
  }, [])
  useEffect(() => { controls.current?.setRunning(running && ready) }, [running, ready])
  return <canvas ref={canvas} className="studio-foliage-wind" data-ready={ready} aria-hidden="true" />
}

export default function StudioAtmosphere({ running }) {
  return <div className="studio-atmosphere" data-running={running} aria-hidden="true">
    <FoliageWind running={running} />
    <div className="studio-cloud-window">
      <img className="studio-cloud studio-cloud-front" src={cloud} alt="" />
      <img className="studio-cloud studio-cloud-back" src={cloud} alt="" />
    </div>
    <div className="studio-sunlight"><div className="studio-cloud-shadow" /><div className="studio-light-shaft" /></div>
    <svg className="studio-cup-steam" viewBox="0 0 60 110" focusable="false">
      <path className="studio-steam-one" d="M27 104C9 83 48 71 29 52S16 23 29 3" />
      <path className="studio-steam-two" d="M40 108C54 90 20 76 37 54S45 25 37 11" />
    </svg>
  </div>
}
