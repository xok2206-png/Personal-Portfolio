import { useEffect, useRef } from 'react'
import { layerRoot } from './layers.config.js'

const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`
const fragment=`precision highp float;
varying vec2 uv;uniform sampler2D basin;uniform vec2 cover;uniform float time;
void main(){
 vec2 source=(uv-.5)*cover+.5;
 vec3 original=texture2D(basin,source).rgb;
 vec2 p=vec2(uv.x,1.-uv.y);
 float area=1.-smoothstep(.6,1.,length((p-vec2(.70,.85))/vec2(.28,.27)));
 float water=smoothstep(.10,.23,original.b-original.r)*smoothstep(.05,.18,original.g-original.r);
 water*=1.-smoothstep(.64,.9,original.r);
 float mask=area*water;
 float wave=sin(source.y*310.-time*1.7+sin(source.x*55.+time*.35)*1.8);
 float crosswave=sin(source.x*185.+source.y*98.-time*1.1);
 vec2 offset=vec2(wave*.0012,crosswave*.0007)*mask;
 vec3 color=texture2D(basin,source+offset).rgb;
 float light=smoothstep(.78,.99,sin(source.y*420.+source.x*65.-time*2.1+crosswave));
 color+=vec3(.075,.085,.10)*light*water;
 // Match the richer city plate; tint only detected water, preserving stone and foam.
 float grey=dot(color,vec3(.2126,.7152,.0722));color=mix(vec3(grey),color,1.22);
 color=(color-.5)*1.08+.5;
 color=mix(color,vec3(color.r+.06,color.g*.96,min(1.,color.b*1.14+.05)),water*.7);
 gl_FragColor=vec4(color,mask);
}`

export default function BasinWater({running}){
 const canvas=useRef(null),draw=useRef(null),time=useRef(0)
 useEffect(()=>{
  const el=canvas.current,gl=el.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false})
  if(!gl)return
  const make=(type,code)=>{const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);return s}
  const vs=make(gl.VERTEX_SHADER,vertex),fs=make(gl.FRAGMENT_SHADER,fragment),program=gl.createProgram()
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return}
  gl.useProgram(program)
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
  const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0)
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  const clock=gl.getUniformLocation(program,'time'),fit=gl.getUniformLocation(program,'cover'),image=new Image()
  let disposed=false,ready=false
  const resize=()=>{if(!ready)return;const rect=el.getBoundingClientRect(),ratio=rect.width/Math.max(rect.height,1),imageRatio=image.naturalWidth/image.naturalHeight;el.width=Math.min(1440,Math.round(rect.width));el.height=Math.max(1,Math.round(el.width/ratio));gl.viewport(0,0,el.width,el.height);gl.uniform2f(fit,ratio<imageRatio?ratio/imageRatio:1,ratio>imageRatio?imageRatio/ratio:1);draw.current?.(time.current)}
  image.onload=()=>{if(disposed)return;gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);ready=true;draw.current=t=>{gl.uniform1f(clock,t);gl.drawArrays(gl.TRIANGLES,0,6)};resize()}
  image.src=`${layerRoot}distant-basin-native.webp`
  const observer=new ResizeObserver(resize);observer.observe(el)
  const lost=()=>{draw.current=null};el.addEventListener('webglcontextlost',lost)
  return()=>{disposed=true;image.onload=null;observer.disconnect();el.removeEventListener('webglcontextlost',lost);draw.current=null;gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)}
 },[])
 useEffect(()=>{if(!running)return;let frame,last=performance.now(),paint=last;const tick=now=>{time.current+=Math.min((now-last)/1000,.1);last=now;if(now-paint>=40){draw.current?.(time.current);paint=now}frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[running])
 return <canvas className="lw-basin-water" ref={canvas} aria-hidden="true"/>
}
