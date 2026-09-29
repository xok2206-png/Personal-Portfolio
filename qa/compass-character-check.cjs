const assert=require('node:assert/strict')
const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true}),report={checks:[],samples:[],errors:[]}
 try{
 const p=await b.newPage({viewport:{width:1440,height:810}});p.on('pageerror',e=>report.errors.push(e.message));await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-explorer').waitFor();await p.waitForFunction(()=>[...document.querySelectorAll('.world-character-pose')].every(e=>e.dataset.walkReady==='true'))
 assert.equal(await p.locator('.world-quick-view,.world-recommend-path').count(),0);assert.equal(await p.locator('.world-compass-ornament').getAttribute('aria-hidden'),'true');assert.equal(await p.locator('.world-compass-ornament :is(a,button,summary,[tabindex])').count(),0);assert.equal(await p.locator('.world-compass-ornament').evaluate(e=>getComputedStyle(e).pointerEvents),'none')
 report.checks.push('decorative compass only; Quick View control and character dotted path absent')
 const sample=async()=>p.locator('.world-character-pose').evaluateAll(es=>es.map(e=>({active:e.dataset.active==='true',alpha:Number(getComputedStyle(e).opacity),still:Number(getComputedStyle(e.querySelector('.world-character-still')).opacity),walk:Number(getComputedStyle(e.querySelector('.world-character-walk')).opacity),blend:getComputedStyle(e).mixBlendMode})))
 for(const key of ['d','w','a','s']){
  await p.keyboard.down(key)
  for(let i=0;i<7;i++){await p.waitForTimeout(25);const values=await sample();const total=values.reduce((sum,s)=>sum+s.alpha,0);assert.ok(total>.98&&total<1.02,`pose opacity ${total}`);assert.ok(values.every(v=>v.walk+v.still===1),'idle/walk remains fully opaque');assert.ok(values.every(v=>v.blend==='plus-lighter'));report.samples.push({key,total})}
  await p.keyboard.up(key);await p.waitForTimeout(200)
 }
 report.checks.push('all four movement directions: complementary pose alpha and no compounded idle/walk fades')
 await p.keyboard.down('d');await p.waitForTimeout(220)
 const img=p.locator('.world-character-pose[data-active="true"] .world-character-walk img')
 const frames=await img.evaluate(e=>{const animation=e.getAnimations()[0];animation.pause();const values=[];for(const t of [0,159.99,160,319.99,320,479.99,480,639.99,640,1280]){animation.currentTime=t;const x=new DOMMatrix(getComputedStyle(e).transform).m41/e.getBoundingClientRect().width;values.push({t,x})}return values})
 assert.ok(frames.every(f=>f.x>=-.751&&f.x<=0));report.frames=frames;await p.keyboard.up('d')
 report.checks.push('sprite loop/endpoints stay inside four valid cells; no empty fifth frame')
 for(const [width,height] of [[2560,1440],[1440,810],[1024,768],[430,932],[390,844],[360,800]]){await p.setViewportSize({width,height});const inside=await p.locator('.world-compass-ornament').evaluate(e=>{const r=e.getBoundingClientRect();return r.x>=0&&r.y>=0&&r.right<=innerWidth&&r.bottom<=innerHeight});assert.ok(inside);if([1440,430].includes(width)){await p.waitForTimeout(300);await p.screenshot({path:`docs/layered-world/compass-fix-${width}.png`})}}
 report.checks.push('compass safe areas at six desktop/mobile viewports')
 await p.setViewportSize({width:1440,height:810});await p.emulateMedia({reducedMotion:'reduce'});await p.keyboard.press('a');assert.equal(await p.locator('.lw-explorer').getAttribute('data-moving'),'false');await p.locator('.lw-top-nav a[href="/contact"]').click();await p.waitForURL('**/contact');report.checks.push('reduced motion movement + direct navigation')
 const cold=await b.newPage({viewport:{width:1440,height:810}});let release;const held=new Promise(r=>release=r);await cold.route('**/character/*-walk.webp',async route=>{await held;await route.continue()});await cold.goto('http://127.0.0.1:5174/world-map',{waitUntil:'domcontentloaded'});await cold.locator('.lw-explorer').waitFor();await cold.keyboard.down('d');await cold.waitForTimeout(260);const ready=await cold.locator('.world-character-pose[data-active="true"]').evaluate(e=>({ready:e.dataset.walkReady,still:getComputedStyle(e.querySelector('.world-character-still')).opacity,walk:getComputedStyle(e.querySelector('.world-character-walk')).opacity}));assert.deepEqual(ready,{ready:'false',still:'1',walk:'0'});release();await cold.waitForFunction(()=>document.querySelector('.world-character-pose[data-active="true"]').dataset.walkReady==='true');await cold.keyboard.up('d');report.checks.push('cold-load movement keeps static character until walk atlas decodes')
 const fail=await b.newPage();await fail.route('**/character/*-walk.webp',r=>r.abort());await fail.goto('http://127.0.0.1:5174/world-map');await fail.locator('.lw-explorer').waitFor();await fail.keyboard.down('d');await fail.waitForTimeout(250);assert.equal(await fail.locator('.world-character-pose[data-active="true"] .world-character-still').evaluate(e=>getComputedStyle(e).opacity),'1');await fail.keyboard.up('d');report.checks.push('failed walk atlas retains visible static character')
 assert.equal(report.errors.length,0)
 }finally{await fs.writeFile('docs/layered-world/compass-character-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1})
