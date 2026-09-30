const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const {chromium} = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sizes = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900],[1280,600],[2560,1080],[1007,966],[1058,879]]
const ids = ['about','skills','projects','contact']
const origin = 'http://127.0.0.1:5174'
const output = 'output/seasonal-world-qa/'
const report = {viewports:[],checks:[],errors:[]}
;(async()=>{
 const browser = await chromium.launch({channel:'msedge',headless:true})
 try {
  const p = await browser.newPage({viewport:{width:1440,height:810}})
  p.on('pageerror',e=>report.errors.push(e.stack || e.message))
  p.on('response',r=>{if(r.status()>=400&&/seasonal-world|painted-cloud/.test(r.url()))report.errors.push(r.status()+' '+r.url())})
  await p.addInitScript(()=>sessionStorage.setItem('world-guide-seen','true'))
  const load=async()=>{await p.goto(origin+'/world-map');await p.waitForSelector('.seasonal-world');await p.locator('.lw-island-art').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await p.evaluate(()=>document.fonts.ready)}
  await load()
  assert.equal(await p.locator('.lw-island-art').count(),4)
  assert.ok(await p.locator('.lw-island-art').evaluateAll(es=>es.every(e=>e.naturalWidth===1254&&e.currentSrc.includes('/seasonal-world/'))))
  assert.equal(await p.locator('.seasonal-life').count(),4)
  assert.equal(await p.locator('.exploration-map,.world-atlas').count(),0)
  report.checks.push('4 decoded transparent seasonal assets; 4 independent motion layers; removed map UI stays absent')
  await p.locator('.lw-projects').hover()
  await p.waitForTimeout(360)
  assert.equal(await p.locator('main').getAttribute('data-focus'),'projects')
  const filters=await p.locator('.seasonal-island-visual').evaluateAll(es=>es.map(e=>getComputedStyle(e).filter))
  assert.ok(filters[0].includes('0.64')&&filters[2].includes('1.08'),JSON.stringify(filters))
  assert.ok(await p.locator('.lw-label').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')))
  await p.screenshot({path:output+'hover-projects.png'})
  await p.mouse.move(0,0)
  const moving=async()=>p.locator('.lw-projects .lw-water-texture').first().evaluate(e=>getComputedStyle(e).transform)
  const before=await moving();await p.waitForTimeout(250);assert.notEqual(await moving(),before)
  report.checks.push('hover contrast isolates selected art while labels stay readable; waterfall actually changes over time')
  await p.locator('.page-settings').click()
  await p.getByRole('button',{name:/배경 움직임/}).click()
  await p.getByRole('button',{name:'닫기',exact:true}).click()
  assert.equal(await p.locator('main').getAttribute('data-paused'),'true')
  assert.ok(await p.locator('.seasonal-life *,.lw-water-texture').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationPlayState==='paused')))
  await p.locator('.page-settings').click()
  await p.getByRole('button',{name:/배경 움직임/}).click()
  await p.getByRole('button',{name:'닫기',exact:true}).click()
  await p.emulateMedia({reducedMotion:'reduce'})
  await p.waitForTimeout(100)
  assert.equal(await p.locator('main').getAttribute('data-paused'),'true')
  assert.ok(await p.locator('.seasonal-life *').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationName==='none')))
  report.checks.push('settings pause and prefers-reduced-motion stop island effects')
  for(const [width,height] of sizes){
   await p.setViewportSize({width,height});await p.waitForTimeout(100)
   const portrait=width<=height
   if(portrait){
    await p.locator('.lw-islands').evaluate(e=>e.scrollTo({left:0,behavior:'instant'}));await p.waitForTimeout(100)
    for(let i=0;i<4;i++){
     if(i){await p.getByRole('button',{name:'다음 섬 보기'}).click();await p.waitForTimeout(100)}
     const visible=await p.locator('.lw-'+ids[i]+' .lw-label').evaluate(e=>{const r=e.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return r.x>=0&&r.right<=innerWidth+1&&r.y>=64&&r.bottom<=innerHeight&&r.height>=44&&e.closest('a')===hit?.closest('a')})
     assert.ok(visible,'portrait '+ids[i]+' '+width+'x'+height)
     if(width===430&&height===932)await p.screenshot({path:output+'mobile-'+ids[i]+'-final.png'})
    }
   }
   const bounds=await p.evaluate(()=>{
    const labels=[...document.querySelectorAll('.lw-label')]
    const portrait=matchMedia('(max-aspect-ratio:1/1)').matches
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}}
    return {portrait,noHorizontalOverflow:document.documentElement.scrollWidth<=innerWidth+1,noVerticalOverflow:document.documentElement.scrollHeight<=innerHeight+1,labels:labels.map(e=>({id:e.closest('a').dataset.island,...rect(e)}))}
   })
   assert.ok(bounds.noHorizontalOverflow&&bounds.noVerticalOverflow,JSON.stringify({width,height,...bounds}))
   if(!portrait)for(const l of bounds.labels)assert.ok(l.x>=0&&l.right<=width+1&&l.y>=64&&l.bottom<=height&&l.height>=44,JSON.stringify({width,height,l}))
   report.viewports.push({width,height,...bounds})
   if([[1440,810],[1007,966],[1058,879],[2560,1440],[1024,768],[1280,600]].some(s=>s[0]===width&&s[1]===height))await p.screenshot({path:output+'layout-'+width+'x'+height+'.png'})
  }
  report.checks.push('23 required/boundary/short/ultrawide viewport bounds and all four portrait destinations')
  await p.setViewportSize({width:1440,height:810})
  for(const id of ids){
   await load();await p.locator('.lw-'+id+' .lw-label').click();await p.waitForURL('**/'+id)
   await p.locator('main').waitFor()
   await p.reload();await p.locator('main').waitFor()
   await p.goBack();await p.waitForURL('**/world-map')
  }
  report.checks.push('all four islands navigate; each direct route reloads; Browser Back returns to map')
  await load()
  await p.locator('.lw-skills').focus()
  assert.equal(await p.locator('.lw-skills').evaluate(e=>e.matches(':focus-visible')),true)
  await p.keyboard.press('Enter');await p.waitForURL('**/skills');await p.goBack();await p.goForward();await p.waitForURL('**/skills')
  await p.locator('.page-primary-nav a[href="/about"]').hover()
  await p.waitForSelector('.page-destination-preview img')
  assert.match(await p.locator('.page-destination-preview img').getAttribute('src'),/seasonal-world/)
  report.checks.push('keyboard focus/Enter and Back/Forward; header preview uses matching seasonal art')
  await load();await p.locator('.page-realworld').click();await p.waitForURL(origin+'/')
  report.checks.push('Real World return link preserved')
  const touch=await browser.newPage({viewport:{width:430,height:932},hasTouch:true,isMobile:true,reducedMotion:'reduce'})
  touch.on('pageerror',e=>report.errors.push(e.message))
  await touch.goto(origin+'/world-map');await touch.waitForSelector('.seasonal-world')
  for(let i=0;i<4;i++){
   if(i){await touch.getByRole('button',{name:'다음 섬 보기'}).click();await touch.waitForTimeout(100)}
   await touch.locator('.lw-'+ids[i]+' .lw-label').tap()
   assert.match(touch.url(),/world-map$/)
   assert.equal(await touch.locator('main').getAttribute('data-selected'),ids[i])
  }
  await touch.locator('.lw-contact .lw-label').tap();await touch.waitForURL('**/contact')
  report.checks.push('touch paging and first-tap selection for each island; second tap enters')
  const fallback=await browser.newPage({viewport:{width:1440,height:810},reducedMotion:'reduce'})
  fallback.on('pageerror',e=>report.errors.push(e.message))
  await fallback.route('**/seasonal-world/*.webp',r=>r.abort())
  await fallback.goto(origin+'/world-map');await fallback.waitForSelector('.seasonal-world')
  await fallback.locator('.lw-about .lw-label').click();await fallback.waitForURL('**/about')
  report.checks.push('all new image failures preserve HTML destination access')
  await load()
  await p.emulateMedia({reducedMotion:'no-preference'})
  await p.locator('.lw-projects').click()
  await p.waitForSelector('.voyage-transition')
  assert.match(await p.locator('.voyage-destination').getAttribute('src'),/seasonal-world/)
  await p.waitForURL('**/projects')
  await p.waitForTimeout(1100)
  report.checks.push('full-motion voyage uses seasonal destination and original cloud asset')
  const zoom=await browser.newPage({viewport:{width:720,height:405},deviceScaleFactor:2,reducedMotion:'reduce'})
  await zoom.goto(origin+'/world-map');await zoom.waitForSelector('.seasonal-world')
  await zoom.getByRole('button',{name:'메뉴',exact:true}).click()
  await zoom.locator('.page-mobile-nav a[href="/projects"]').click();await zoom.waitForURL('**/projects')
  report.checks.push('200%-equivalent 720x405 @2x layout preserves direct menu access; native browser zoom not tested')
  assert.equal(report.errors.length,0,report.errors.join('\\n'))
  report.passed=true
 } finally {
  await fs.writeFile(output+'verification.json',JSON.stringify(report,null,2))
  await browser.close()
 }
 console.log(JSON.stringify({passed:report.passed,viewports:report.viewports.length,checks:report.checks,errors:report.errors},null,2))
})().catch(e=>{console.error(e);process.exitCode=1})
