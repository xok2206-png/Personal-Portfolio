import { useEffect, useRef } from 'react'
import { layerRoot } from './layers.config.js'

const vertex = `attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`
const fragment = `precision highp float;
varying vec2 uv; uniform float time; uniform float body; uniform vec4 falls[4]; uniform int count; uniform sampler2D islandArt;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
void main(){
 vec2 p=vec2(uv.x,1.-uv.y);
 // Regrade only cyan pool pixels on the terraces; leave limestone, foliage and white reflections intact.
 vec4 plate=texture2D(islandArt,p);
 float pool=smoothstep(.08,.22,min(plate.g,plate.b)-plate.r);
 pool*=1.-smoothstep(.12,.30,plate.b-plate.g);
 pool*=smoothstep(.30,.38,p.y)*(1.-smoothstep(.64,.72,p.y))*plate.a;
 vec3 poolBlue=mix(plate.rgb,vec3(plate.r+.09,plate.g*.95,min(1.,plate.b+.20)),.85);
 float alpha=pool;vec3 color=poolBlue*alpha;
 for(int i=0;i<4;i++){if(i>=count)break;vec4 r=falls[i];vec2 q=(p-r.xy)/r.zw;
  if(q.y<0.||q.y>1.)continue;
  float t=time*(.52+float(i)*.04);
  float spread=1.+q.y*q.y*.12;
  float x=(q.x-.5)/spread+.5;
  float bend=sin(q.y*4.-t+float(i))*.004*q.y;
  x+=bend;
  float fringe=(noise(vec2(x*19.,q.y*8.-t*4.))-.5)*.045*q.y;
  float edge=smoothstep(fringe,.22+fringe,x)*(1.-smoothstep(.74+fringe,1.+fringe,x));
  float fade=smoothstep(0.,.045,q.y)*(1.-smoothstep(.48,1.,q.y));
  float broad=noise(vec2(x*7.,q.y*2.-t));
  float fine=noise(vec2(x*63.,q.y*9.-t*7.));
  float ribbon=noise(vec2(x*24.,q.y*1.8-t*2.));
  float foam=smoothstep(.3,.8,fine*.6+ribbon*.4);
  // Staggered foam packets accelerate down the fall; their wrap is hidden at the source/tail.
  float lane=floor(x*15.);
  float travel=fract(sqrt(q.y+.015)*2.5-time*.92+hash(vec2(lane,float(i))));
  float packet=smoothstep(.08,.23,travel)*(1.-smoothstep(.23,.48,travel));
  packet*=smoothstep(.12,.45,fract(x*15.))*(1.-smoothstep(.6,.94,fract(x*15.)));
  // Low-contrast silver-white water lets the original rock/water texture show through.
  vec3 water=mix(vec3(.48,.73,.94),vec3(.94,.98,1.),.25+broad*.25+foam*.5);
  water=mix(water,vec3(.99,1.,1.),packet*.6);
  float a=edge*fade*(body+ribbon*.24+foam*.23+packet*.25);
  color=mix(color,water,a);alpha=alpha+a*(1.-alpha);
 }
 gl_FragColor=vec4(alpha>0.?color/alpha:color,alpha);
}`

// One clock owns each complete water curtain; noise advects downward without a loop reset.
export default function FlowingWater({ island, running }) {
 const canvas=useRef(null),renderer=useRef(null),elapsed=useRef(0)
 useEffect(()=>{
  const element=canvas.current,gl=element.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false})
  if(!gl)return
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null}return s}
  const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment)
  if(!vs||!fs){if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);return}
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return}
  gl.useProgram(program)
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
  const location=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0)
  const regions=new Float32Array(16);island.water.slice(0,4).forEach((r,i)=>regions.set(r.map(v=>v/100),i*4))
  gl.uniform4fv(gl.getUniformLocation(program,'falls[0]'),regions);gl.uniform1i(gl.getUniformLocation(program,'count'),Math.min(island.water.length,4))
  gl.uniform1f(gl.getUniformLocation(program,'body'),.46)
  const clock=gl.getUniformLocation(program,'time')
  const draw=t=>{gl.uniform1f(clock,t);gl.drawArrays(gl.TRIANGLES,0,6)}
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4))
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  const plate=new Image();let disposed=false
  plate.onload=()=>{if(disposed)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,plate);draw(elapsed.current)}
  plate.src=`${layerRoot}${island.art}`
  renderer.current=draw
  const resize=()=>{const size=Math.min(640,Math.max(160,Math.round(element.clientWidth*Math.min(devicePixelRatio,1.5))));element.width=size;element.height=size;gl.viewport(0,0,size,size);draw(elapsed.current)}
  const observer=new ResizeObserver(resize);observer.observe(element);resize()
  const lost=e=>{e.preventDefault();renderer.current=null}
  element.addEventListener('webglcontextlost',lost)
  return()=>{disposed=true;plate.onload=null;observer.disconnect();element.removeEventListener('webglcontextlost',lost);renderer.current=null;gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)}
 },[island])
 useEffect(()=>{
  if(!running)return
  let frame,last=performance.now(),drawn=last
  const tick=now=>{elapsed.current+=Math.min((now-last)/1000,.1);last=now;if(now-drawn>=32){renderer.current?.(elapsed.current);drawn=now}frame=requestAnimationFrame(tick)}
  frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)
 },[running])
 return <div className="lw-water" aria-hidden="true" data-running={running}>
  {island.water.map(([x,y,w,h],i)=><span className="lw-water-fallback" key={i} style={{left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`}}/>)}
  <canvas ref={canvas} className="lw-water-canvas"/>
 </div>
}
