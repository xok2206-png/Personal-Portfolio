const fs=require('node:fs/promises')
const {chromium}=require(process.env.PLAYWRIGHT_MODULE)
async function run(){
 const b=await chromium.launch({headless:true,channel:'msedge'}), c=await b.newContext({viewport:{width:1440,height:810}}),p=await c.newPage()
 const r={checks:[],errors:[],motionSamples:[]};p.on('pageerror',e=>r.errors.push(e.message))
 const base='http://127.0.0.1:5174'
 const assert=(x,m)=>{if(!x)throw Error(m)}
 const check=async(name,fn)=>{try{await fn();r.checks.push({name,passed:true})}catch(e){r.checks.push({name,passed:false,error:e.message})}}
 await p.goto(base+'/world-map');await p.locator('.rw-ambient.is-ready').waitFor()
 await check('Real decoded video frames advance',async()=>{
  const a=await p.locator('video').evaluate(v=>v.currentTime);await p.waitForTimeout(1100);const z=await p.locator('video').evaluate(v=>v.currentTime);assert(z>a+.7,'time did not advance')
  const capture=()=>p.locator('video').evaluate(v=>{const c=document.createElement('canvas');c.width=192;c.height=108;const x=c.getContext('2d');x.drawImage(v,0,0,192,108);return Array.from(x.getImageData(0,0,192,108).data)})
  const one=await capture();await p.waitForTimeout(1700);const two=await capture()
  for(const [name,x,y,w,h] of [['waterfall',91,41,10,25],['left-airship',2,40,33,15],['cloud-sea',104,69,35,20]]){let total=0;for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)for(let ch=0;ch<3;ch++){const i=(yy*192+xx)*4+ch;total+=Math.abs(one[i]-two[i])}const mean=total/(w*h*3);r.motionSamples.push({name,meanPixelChange:mean});assert(mean>1,name+' looks static')}
  await p.screenshot({path:'docs/living-world/desktop-playing.png'});
 })
 await check('Pause and resume',async()=>{await p.getByRole('button',{name:'세계 움직임 일시정지'}).click();const t=await p.locator('video').evaluate(v=>v.currentTime);await p.waitForTimeout(600);assert(Math.abs(await p.locator('video').evaluate(v=>v.currentTime)-t)<.1,'not paused');await p.getByRole('button',{name:'세계 움직임 재생'}).click();await p.waitForTimeout(500);assert(await p.locator('video').evaluate(v=>v.currentTime)>t+.2,'not resumed')})
 await check('Loop wraps without ending playback',async()=>{await p.locator('video').evaluate(v=>v.currentTime=v.duration-.35);await p.waitForTimeout(850);assert(await p.locator('video').evaluate(v=>v.currentTime<2&&!v.paused),'no loop')})
 await check('Offscreen playback pauses and resumes',async()=>{await p.setViewportSize({width:430,height:600});await p.locator('.rw-extra').scrollIntoViewIfNeeded();await p.waitForTimeout(300);assert(await p.locator('video').evaluate(v=>v.paused),'playing offscreen');await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);assert(await p.locator('video').evaluate(v=>!v.paused),'not resumed');await p.screenshot({path:'docs/living-world/mobile-playing.png',fullPage:true})})
 await check('Reduced motion shows original without fetching video',async()=>{const cc=await b.newContext({reducedMotion:'reduce'}),q=await cc.newPage();let req=0;q.on('request',x=>{if(x.url().includes('world-living.mp4'))req++});await q.goto(base+'/world-map');await q.locator('.rw-ambient').waitFor();assert(await q.locator('video').evaluate(v=>v.paused&&!v.getAttribute('src')),'unexpected media');assert(req===0,'video fetched');await q.locator('[data-island="projects"]').click();await q.waitForURL(base+'/projects');await cc.close()})
 await check('Video failure preserves original and navigation',async()=>{const q=await c.newPage();await q.route('**/world-living.mp4',route=>route.abort());await q.goto(base+'/world-map');await q.getByText('움직임을 불러오지 못해 원본 풍경을 표시합니다.').waitFor();assert(await q.locator('.rw-art').isVisible(),'no original');await q.locator('[data-island="contact"]').click();await q.waitForURL(base+'/contact');await q.close()})
 await check('Animated scene still has five unobstructed island links',async()=>{await p.setViewportSize({width:1440,height:810});await p.goto(base+'/world-map');await p.locator('.rw-ambient.is-ready').waitFor();for(const el of await p.locator('.rw-island').all())assert(await el.evaluate(a=>{const t=a.getBoundingClientRect();return a.contains(document.elementFromPoint(t.x+t.width/2,t.y+t.height/2))}),'hit target blocked')})
 await b.close();await fs.writeFile('docs/living-world/report.json',JSON.stringify(r,null,2));console.log(JSON.stringify(r,null,2));if(r.checks.some(x=>!x.passed)||r.errors.length)process.exitCode=1
}
run().catch(e=>{console.error(e);process.exitCode=1})
