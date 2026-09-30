const assert=require('node:assert/strict')
const fs=require('node:fs/promises')
const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const output='output/world-motion-qa/'
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true})
 const report={checks:[],errors:[]}
 try {
  const p=await b.newPage({viewport:{width:1440,height:810}})
  p.on('pageerror',e=>report.errors.push(e.message))
  await p.addInitScript(()=>sessionStorage.setItem('world-guide-seen','true'))
  await p.goto('http://127.0.0.1:5174/world-map')
  await p.waitForSelector('.seasonal-world')
  await p.locator('.lw-island-art').evaluateAll(es=>Promise.all(es.map(e=>e.decode())))
  const sample=()=>p.evaluate(()=>{
   const matrix=e=>getComputedStyle(e).transform
   return {
    float:[...document.querySelectorAll('.lw-float')].map(matrix),
    texture:[...document.querySelectorAll('.lw-water-texture')].map(matrix),
    gear:matrix(document.querySelector('.seasonal-gear')),
    beacon:matrix(document.querySelector('.seasonal-beacon')),
    petals:[...document.querySelectorAll('.seasonal-petal')].map(matrix),
    windows:[...document.querySelectorAll('.gallery-window')].map(e=>getComputedStyle(e).opacity),
   }
  })
  const a=await sample();await p.waitForTimeout(1300);const c=await sample()
  for(const key of Object.keys(a))assert.notDeepEqual(a[key],c[key],key+' must visibly animate')
  const travel=a.float.map((m,i)=>Math.abs(Number(m.split(',').at(-1).replace(')',''))-Number(c.float[i].split(',').at(-1).replace(')',''))))
  assert.ok(travel.filter(n=>n>3).length>=3,JSON.stringify(travel))
  report.floatTravelOver1300ms=travel
  report.checks.push('four independent floats, eight water textures, gear, beacon, petals and gallery lights advance without hover')
  await p.locator('.lw-projects').hover()
  for(let i=0;i<6;i++){await p.waitForTimeout(300);assert.equal(await p.locator('main').getAttribute('data-focus'),'projects')}
  const focus=await p.locator('.lw-projects').evaluate(e=>({
   lift:getComputedStyle(e.querySelector('.lw-response')).transform,
   cue:getComputedStyle(e.querySelector('.seasonal-enter-cue')).opacity,
   card:getComputedStyle(e.querySelector('.lw-label')).boxShadow
  }))
  assert.ok(focus.lift.includes('-9'));assert.equal(focus.cue,'1');assert.equal(focus.card,'none')
  await p.screenshot({path:output+'hover-final.png'})
  report.checks.push('stationary hit silhouette retains hover while floating; 9px lift, entry cue and no card frame')
  await p.mouse.move(5,70)
  await p.locator('.page-settings').click()
  await p.getByRole('button',{name:/배경 움직임/}).click()
  await p.getByRole('button',{name:'닫기',exact:true}).click()
  await p.waitForTimeout(100)
  const stopped=await sample();await p.waitForTimeout(500);assert.deepEqual(await sample(),stopped)
  assert.equal(await p.locator('main').getAttribute('data-paused'),'true')
  await p.locator('.page-settings').click()
  await p.getByRole('button',{name:/배경 움직임/}).click()
  await p.getByRole('button',{name:'닫기',exact:true}).click()
  const resumed=await sample();await p.waitForTimeout(300);assert.notDeepEqual(await sample(),resumed)
  report.checks.push('motion OFF freezes all moving owners; ON resumes')
  await p.emulateMedia({reducedMotion:'reduce'})
  assert.equal(await p.locator('.lw-float').first().evaluate(e=>getComputedStyle(e).animationName),'none')
  await p.locator('.lw-about').focus()
  await p.keyboard.press('Tab')
  assert.equal(await p.locator('.lw-skills').evaluate(e=>e.matches(':focus-visible')),true)
  await p.keyboard.press('Enter');await p.waitForURL('**/skills')
  report.checks.push('reduced motion stops floats and retains keyboard entry')
  await p.goto('http://127.0.0.1:5174/world-map');await p.waitForSelector('.seasonal-world')
  await p.emulateMedia({reducedMotion:'no-preference'})
  await p.setViewportSize({width:430,height:932})
  await p.waitForTimeout(250)
  assert.ok(await p.locator('.lw-island[data-in-view="false"] .lw-float').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationPlayState==='paused')))
  await p.getByRole('button',{name:'다음 섬 보기'}).click();await p.waitForTimeout(700)
  assert.equal(await p.locator('.lw-skills').getAttribute('data-in-view'),'true')
  assert.equal(await p.locator('.lw-skills .lw-float').evaluate(e=>getComputedStyle(e).animationPlayState),'running')
  await p.screenshot({path:output+'mobile-final.png'})
  report.checks.push('portrait rail pauses offscreen effects and resumes the next visible island')
  // Isolate the water texture so pixel differences cannot be caused by camera,
  // floating, particles, lettering, or a changing synthetic counter.
  await p.setViewportSize({width:1440,height:810})
  await p.mouse.move(5,70)
  await p.addStyleTag({content:'.seasonal-world *{animation-play-state:paused!important;transition:none!important}.seasonal-world .lw-island .lw-float{animation:none!important}.seasonal-world .lw-water-texture{animation-play-state:running!important}'})
  await p.waitForTimeout(100)
  const regions=await p.locator('.lw-water-texture').evaluateAll(es=>es.map(e=>{
   const r=e.closest('svg').getBoundingClientRect()
   const mask=e.closest('g[mask]').getAttribute('mask')
   const rect=document.querySelector(mask.slice(4,-1)+' rect')
   return {x:Math.floor(r.x+Number(rect.getAttribute('x'))*r.width/100),y:Math.floor(r.y+Number(rect.getAttribute('y'))*r.height/100),width:Math.max(1,Math.floor(Number(rect.getAttribute('width'))*r.width/100)),height:Math.max(1,Math.floor(Number(rect.getAttribute('height'))*r.height/100))}
  }))
  const first=await p.screenshot()
  await p.waitForTimeout(370)
  const second=await p.screenshot()
  report.waterPixelChanges=[]
  for(const region of regions){
   const crop={left:region.x,top:region.y,width:region.width,height:region.height}
   const one=await sharp(first).extract(crop).removeAlpha().raw().toBuffer()
   const two=await sharp(second).extract(crop).removeAlpha().raw().toBuffer()
   let changed=0,total=0
   for(let i=0;i<one.length;i+=3){const diff=(Math.abs(one[i]-two[i])+Math.abs(one[i+1]-two[i+1])+Math.abs(one[i+2]-two[i+2]))/3;total+=diff;if(diff>8)changed++}
   const result={...region,changedRatio:changed/(one.length/3),meanDifference:total/(one.length/3)}
   report.waterPixelChanges.push(result)
   assert.ok(result.changedRatio>.08,JSON.stringify(result))
  }
  await fs.writeFile(output+'water-isolated-a.png',first)
  await fs.writeFile(output+'water-isolated-b.png',second)
  report.checks.push('all eight waterfall regions change actual pixels with every other motion frozen')
  assert.equal(report.errors.length,0)
  report.passed=true
 } finally {
  await fs.writeFile(output+'motion-verification.json',JSON.stringify(report,null,2))
  await b.close()
 }
 console.log(JSON.stringify(report,null,2))
})().catch(e=>{console.error(e);process.exitCode=1})
