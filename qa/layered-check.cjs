const fs = require('node:fs/promises')
const { chromium } = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sharp = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
async function run(){
 const report={viewports:[],checks:[],errors:[]},base='http://127.0.0.1:5174'
 const browser=await chromium.launch({headless:true,channel:'msedge'})
 const context=await browser.newContext(),page=await context.newPage()
 page.on('pageerror',e=>report.errors.push(e.message))
 async function world(p=page){await p.goto(base+'/world-map');await p.locator('.lw-backdrop').evaluate(i=>i.decode());await p.locator('.lw-island-art').evaluateAll(is=>Promise.all(is.map(i=>i.decode())))}
 function assert(v,msg){if(!v)throw Error(msg)}
 async function check(name,fn){try{await fn();report.checks.push({name,passed:true})}catch(e){report.checks.push({name,passed:false,error:e.message})}}
 async function clickIsland(id){const el=page.locator(`[data-island="${id}"] .lw-label`),r=await el.boundingBox();assert(await el.evaluate(e=>{const b=e.getBoundingClientRect();return e.closest('a').contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2))}),'island blocked');await page.mouse.click(r.x+r.width/2,r.y+r.height/2)}
 await world()
 for(const [width,height] of [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(80)
  const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,images:[...document.querySelectorAll('.lw-scene img')].every(i=>i.complete&&i.naturalWidth>0),labels:[...document.querySelectorAll('.lw-label')].map(el=>{const r=el.getBoundingClientRect();return {height:r.height,width:r.width,hit:el.closest('a').contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}})}))
  report.viewports.push({width,height,...data,passed:!data.overflow&&data.images&&data.labels.every(l=>l.height>=44&&l.width>=44&&l.hit)})
  if([1440,430,768].includes(width))await page.screenshot({path:`docs/layered-world/${width}x${height}.png`,fullPage:true})
 }
 await page.setViewportSize({width:1440,height:810})
 await check('Five island entries, reload and Back',async()=>{for(const id of ['about','skills','projects','qa','contact']){await world();await clickIsland(id);await page.waitForURL(base+'/'+id);await page.reload();assert(await page.locator('h1').count()>0,'heading');await page.goBack();await page.locator('.lw-scene').waitFor()}})
 await check('Keyboard Tab and Enter',async()=>{await world();await page.locator('[data-island="about"]').focus();await page.keyboard.press('Tab');assert(await page.locator('[data-island="skills"]').evaluate(el=>el===document.activeElement),'focus');await page.keyboard.press('Enter');await page.waitForURL(base+'/skills')})
 await check('Direct navigation cancels camera on unmount',async()=>{await world();await clickIsland('projects');await page.locator('.lw-access a[href="/contact"]').click();await page.waitForTimeout(1600);assert(page.url()===base+'/contact','stale navigation')})
 await check('Independent motion and flowing water pixels',async()=>{
  await world();assert(await page.locator('video').count()===0,'whole-scene video mounted')
  const before=await page.locator('.lw-float').evaluateAll(els=>els.map(e=>({transform:getComputedStyle(e).transform,duration:getComputedStyle(e).animationDuration})))
  await page.waitForTimeout(1000)
  const after=await page.locator('.lw-float').evaluateAll(els=>els.map(e=>getComputedStyle(e).transform))
  assert(new Set(before.map(e=>e.duration)).size===5,'shared timings');assert(before.every((e,i)=>e.transform!==after[i]),'static island')
  await page.addStyleTag({content:'.lw-float,.lw-cloud,.lw-ship,.lw-explorer img{animation-play-state:paused!important}'})
  const water=page.locator('[data-island="projects"] .lw-water')
  await water.evaluate(e=>e.setCurrentTime(0.5));const a=await water.screenshot({animations:'allow'})
  await water.evaluate(e=>e.setCurrentTime(1.5));const b=await water.screenshot({animations:'allow'})
  assert(!(await sharp(a).raw().toBuffer()).equals(await sharp(b).raw().toBuffer()),'unchanged waterfall pixels')
 })
 await check('Pause and resume freeze CSS and SVG clocks',async()=>{
  await world();await page.getByRole('button',{name:'세계 움직임 일시정지'}).click()
  const read=()=>page.locator('.lw-water').evaluateAll(els=>els.map(e=>e.getCurrentTime()))
  const a=await read();await page.waitForTimeout(350);const b=await read()
  assert(a.every((t,i)=>Math.abs(t-b[i])<.03),'SVG still moving');assert(await page.locator('.lw-float').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationPlayState==='paused')),'CSS still moving')
  await page.getByRole('button',{name:'세계 움직임 재생'}).click();await page.waitForTimeout(200);const c=await read();assert(c.every((t,i)=>t>b[i]+.1),'SVG not resumed')
 })
 await check('Offscreen pauses ambient layers',async()=>{
  await world();await page.addStyleTag({content:'.lw-access{min-height:1200px}'});await page.evaluate(()=>scrollTo(0,1100));await page.waitForTimeout(200)
  assert(await page.locator('.layered-world').getAttribute('data-paused')==='true','not paused offscreen');await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);assert(await page.locator('.layered-world').getAttribute('data-paused')==='false','not resumed')
 })
 await check('Mobile touch and expansion',async()=>{
  const c=await browser.newContext({viewport:{width:430,height:932},hasTouch:true,isMobile:true}),p=await c.newPage();await world(p)
  await p.getByRole('button',{name:'풍경 확대해서 보기'}).tap();assert(await p.locator('.lw-viewport').evaluate(e=>e.scrollWidth>e.clientWidth),'not expanded')
  await p.getByRole('button',{name:'전체 풍경 보기'}).tap();await p.locator('.lw-access a[href="/projects"]').tap();await p.waitForURL(base+'/projects');await c.close()
 })
 await check('Image failure preserves readable destinations',async()=>{
  const p=await context.newPage();await p.route('**/world-layers/*.webp',r=>r.abort());await p.goto(base+'/world-map');await p.locator('.lw-backdrop-fallback').waitFor();assert(await p.locator('.lw-label-fallback').count()===5,'missing labels');await p.locator('.lw-access a[href="/contact"]').click();await p.waitForURL(base+'/contact');await p.close()
 })
 await check('Reduced motion pauses water and enters immediately',async()=>{
  const c=await browser.newContext({reducedMotion:'reduce'}),p=await c.newPage();await world(p)
  assert(await p.locator('.lw-float').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationName==='none')),'CSS motion');assert(await p.locator('.lw-water').evaluateAll(es=>es.every(e=>e.animationsPaused())),'SVG motion')
  await p.locator('[data-island="projects"] .lw-label').click();await p.waitForURL(base+'/projects',{timeout:700});await c.close()
 })
 await check('200% CSS zoom retains navigation',async()=>{await world();await page.evaluate(()=>document.documentElement.style.zoom='2');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow');await page.locator('.lw-access a[href="/contact"]').click();await page.waitForURL(base+'/contact')})
 await browser.close();await fs.writeFile('docs/layered-world/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))
 if(report.errors.length||report.viewports.some(x=>!x.passed)||report.checks.some(x=>!x.passed))process.exitCode=1
}
run().catch(e=>{console.error(e);process.exitCode=1})

