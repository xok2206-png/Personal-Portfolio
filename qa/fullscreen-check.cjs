const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true}),p=await b.newPage(),report={viewports:[],errors:[]}
 p.on('pageerror',e=>report.errors.push(e.message))
 await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-backdrop').evaluate(e=>e.decode())
 for(const [width,height] of [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900]]){
  await p.setViewportSize({width,height});await p.waitForTimeout(60)
  const result=await p.evaluate(()=>{const s=document.querySelector('.lw-scene').getBoundingClientRect();return {fills:Math.abs(s.width-innerWidth)<1&&Math.abs(s.height-innerHeight)<1,noScroll:document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1,labels:[...document.querySelectorAll('.lw-label')].every(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44&&r.x>=0&&r.right<=innerWidth&&r.y>=0&&r.bottom<=innerHeight&&e.closest('a').contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))})}})
  report.viewports.push({width,height,...result})
  if(width===1440||width===430)await p.screenshot({path:`docs/layered-world/fullscreen-${width}.png`})
 }
 await p.setViewportSize({width:430,height:932})
 await p.locator('.lw-access summary').click();await p.locator('.lw-access a[href="/contact"]').click();await p.waitForURL('**/contact');await p.goBack();await p.locator('.lw-scene').waitFor();await p.waitForTimeout(200);await p.locator('.lw-access summary').focus();await p.keyboard.press('Escape');await p.keyboard.press('Enter');await p.locator('.lw-access-panel').waitFor();await p.keyboard.press('Escape')
 report.menuCloses=await p.locator('.lw-access').evaluate(e=>!e.open&&document.activeElement===e.querySelector('summary'))
 await p.emulateMedia({reducedMotion:'reduce'});await p.locator('[data-island="projects"] .lw-label').click();await p.waitForURL('**/projects');report.route=true
 await p.goBack();await p.locator('.lw-scene').waitFor();await p.setViewportSize({width:1440,height:810});await p.evaluate(()=>document.documentElement.style.zoom='2');await p.locator('.lw-access summary').click();await p.locator('.lw-access a[href="/about"]').click();await p.waitForURL('**/about');report.zoomNavigation=true
 await fs.writeFile('docs/layered-world/fullscreen-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await b.close()
 if(report.errors.length||!report.menuCloses||report.viewports.some(v=>!v.fills||!v.noScroll||!v.labels))process.exitCode=1
})().catch(e=>{console.error(e);process.exitCode=1})


