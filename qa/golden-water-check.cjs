const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
;(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const p=await b.newPage({viewport:{width:1440,height:810}}),errors=[];p.on('pageerror',e=>errors.push(e.message))
 await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-water-canvas').first().waitFor();await p.locator('.lw-scene img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await p.evaluate(()=>document.fonts.ready)
 await p.addStyleTag({content:'.lw-scene *{animation-play-state:paused!important;transition:none!important}'})
 const water=p.locator('[data-island="about"] .lw-water-canvas')
 const frame=async()=>sharp(await water.screenshot()).removeAlpha().raw().toBuffer()
 const diff=(a,b)=>{let v=0;for(let i=0;i<a.length;i++)v+=Math.abs(a[i]-b[i]);return v/a.length}
 const a=await frame();await p.waitForTimeout(500);const c=await frame();const moving=diff(a,c)
 await p.locator('.lw-system summary').click();await p.getByRole('button',{name:'세계 움직임 일시정지'}).click();await p.waitForTimeout(80);const pausedA=await frame();await p.waitForTimeout(300);const paused=diff(pausedA,await frame())
 await p.getByRole('button',{name:'세계 움직임 재생'}).click();await p.waitForTimeout(400);const resumed=diff(pausedA,await frame())
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(80);const reducedA=await frame();await p.waitForTimeout(300);const reduced=diff(reducedA,await frame())
 const report={moving,paused,resumed,reduced,errors};await fs.writeFile('docs/layered-world/golden-water-report.json',JSON.stringify(report,null,2));console.log(report)
 if(moving<.02||paused>.002||resumed<.02||reduced>.002||errors.length)throw new Error('Water animation regression')
 await p.emulateMedia({reducedMotion:'no-preference'});await p.screenshot({path:'docs/layered-world/golden-world-desktop.png'})
 const fallback=await b.newPage();await fallback.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...rest){return type==='webgl'?null:get.call(this,type,...rest)}})
 await fallback.goto('http://127.0.0.1:5174/world-map');await fallback.locator('.lw-water-fallback').first().waitFor();await fallback.locator('.lw-top-nav a[href="/contact"]').click();await fallback.waitForURL('**/contact');console.log('WebGL failure direct navigation passed')
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1})


