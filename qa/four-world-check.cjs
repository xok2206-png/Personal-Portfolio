const assert=require('node:assert/strict')
const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sizes=[[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900],[1280,600],[2560,1080]]
;(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}),report={sizes:[],checks:[],errors:[]}
 try{
 const p=await browser.newPage({viewport:{width:1440,height:810}});p.on('pageerror',e=>report.errors.push(e.message))
 const hoverLabel=async(id)=>{const r=await p.locator('.lw-'+id+' .lw-label').boundingBox();await p.mouse.move(r.x+r.width/2,r.y+r.height/2)};
 const load=async()=>{await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-island-art').first().evaluate(e=>e.decode());await p.evaluate(()=>document.fonts.ready)}
 await load();assert.equal(await p.locator('.lw-island').count(),4);assert.equal(await p.locator('.lw-top-nav a').allTextContents().then(a=>a.join(',')),'WORLD,ABOUT,SKILLS,PROJECTS,CONTACT');assert.equal(await p.locator('.lw-compass').count(),0)
 console.log('initial',await p.locator('.layered-world').evaluate(e=>({focus:e.dataset.focus,recommended:e.querySelector('[data-recommended="true"]')?.dataset.island,waypoint:e.querySelector('.lw-waypoint')&&getComputedStyle(e.querySelector('.lw-waypoint')).opacity})))
 assert.equal(await p.locator('[data-recommended="true"]').getAttribute('data-island'),'about')
 assert.equal(await p.locator('.lw-about small').evaluate(e=>getComputedStyle(e).opacity),'0')
 report.checks.push('four islands / top navigation / no compass / initial About recommendation')
 await p.mouse.move(0,0);await hoverLabel('contact');await p.waitForTimeout(120);assert.equal(await p.locator('.lw-explorer').getAttribute('data-look'),'neutral');await p.waitForTimeout(250);assert.equal(await p.locator('.lw-explorer').getAttribute('data-look'),'stable');assert.equal(await p.locator('.lw-explorer').getAttribute('data-pose'),'back');assert.equal(await p.locator('.lw-island.is-selected').count(),0);assert.equal(await p.locator('.lw-contact.is-hovered').count(),1)
 assert.equal(await p.locator('.lw-about .lw-float').evaluate(e=>e.getAnimations()[0].playbackRate),.6)
 await p.mouse.move(0,0);await p.waitForTimeout(450);assert.equal(await p.locator('.lw-explorer').getAttribute('data-look'),'neutral')
 await hoverLabel('about');await p.waitForTimeout(40);await hoverLabel('contact');await p.waitForTimeout(40);await p.mouse.move(0,0);await p.waitForTimeout(280);assert.equal(await p.locator('.lw-explorer').getAttribute('data-look'),'neutral')
 report.checks.push('stable-hover delay / no body flip / latest hover only / neutral return / inactive motion at 60%')
 const x=()=>p.locator('.lw-explorer').getAttribute('data-x').then(Number)
 let before=await x();await p.keyboard.down('d');await p.waitForTimeout(200);await p.keyboard.up('d');assert.ok(await x()>before)
 await p.locator('.lw-system summary').click();before=await x();await p.keyboard.down('d');await p.waitForTimeout(200);await p.keyboard.up('d');assert.equal(await x(),before);await p.keyboard.press('Escape');assert.equal(await p.locator('.lw-system').getAttribute('open'),null)
 report.checks.push('bounded keyboard movement / System input lock / Escape')
 await p.locator('.lw-top-nav a[href="/projects"]').click();await p.waitForTimeout(150);assert.equal(await p.locator('.lw-explorer').getAttribute('data-committed'),'true');assert.equal(await p.locator('.layered-world').getAttribute('data-selected'),'projects');let scale=await p.locator('.lw-scene').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a);assert.ok(Math.abs(scale-1)<.01,'camera waits for alignment')
 await p.locator('.lw-top-nav a[href="/contact"]').hover();assert.equal(await p.locator('.layered-world').getAttribute('data-selected'),'projects');await p.keyboard.press('Escape');await p.waitForTimeout(1600);assert.match(p.url(),/world-map$/)
 await p.locator('.lw-top-nav a[href="/about"]').click();await p.waitForTimeout(120);await p.locator('.lw-top-nav a[href="/contact"]').click();await p.waitForURL('**/contact');await p.locator('#qa details').first().waitFor();assert.equal(await p.locator('#qa details').count(),6);await p.goBack();await p.locator('.lw-scene').waitFor()
 report.checks.push('450ms character alignment before travel / hover cannot override selection / cancel timer / latest destination wins / Contact includes 6 original FAQs')
 await p.mouse.move(0,0);await p.evaluate(()=>document.fonts.ready);
 for(const [width,height] of sizes){
  await p.setViewportSize({width,height});await p.waitForTimeout(350)
  const r=await p.evaluate(()=>{
   const inside=e=>{const r=e.getBoundingClientRect();return r.x>=-1&&r.y>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1&&r.width>=44&&r.height>=44}
   const portrait=matchMedia('(max-aspect-ratio: 1/1)').matches
   return{noScroll:document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1,nav:[...document.querySelectorAll('.lw-top-nav a,.lw-system summary')].every(inside),labels:portrait?true:[...document.querySelectorAll('.lw-label')].every(inside),portrait}
  });if(r.portrait){
   await p.emulateMedia({reducedMotion:'reduce'})
   await p.locator('.lw-islands').evaluate(e=>e.scrollTo({left:0,behavior:'instant'}));await p.waitForTimeout(80)
   for(let i=0;i<4;i++){
    if(i){await p.getByRole('button',{name:'다음 섬 보기'}).click();await p.waitForTimeout(100)}
    const visible=await p.locator('.lw-label').nth(i).evaluate(e=>{const r=e.getBoundingClientRect();return r.x>=0&&r.right<=innerWidth&&r.y>=0&&r.bottom<=innerHeight&&e.closest('a').contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))})
    assert.ok(visible,`Portrait destination ${i} at ${width}x${height}`)
   }
   await p.emulateMedia({reducedMotion:'no-preference'})
  }
  report.sizes.push({width,height,...r});assert.ok(r.noScroll&&r.nav&&r.labels,JSON.stringify(report.sizes.at(-1)))
 }
 report.checks.push('21 viewport / breakpoint / short / ultrawide bounds')
 await p.setViewportSize({width:1440,height:810});await p.emulateMedia({reducedMotion:'reduce'});await p.evaluate(()=>document.documentElement.style.zoom='2');await p.locator('.lw-top-nav a[href="/skills"]').click();await p.waitForURL('**/skills');await p.evaluate(()=>document.documentElement.style.zoom='1')
 await p.goto('http://127.0.0.1:5174/qa');await p.waitForURL('**/contact#qa');await p.waitForTimeout(350);assert.equal(await p.evaluate(()=>document.activeElement.id),'qa-heading');await p.reload();await p.waitForTimeout(350);assert.equal(await p.locator('#qa details').count(),6)
 report.checks.push('200% zoom top navigation / legacy QA redirect + hash focus + reload')
 const touch=await browser.newPage({viewport:{width:430,height:932},hasTouch:true,isMobile:true,reducedMotion:'reduce'})
 await touch.goto('http://127.0.0.1:5174/world-map');await touch.locator('.lw-about .lw-label').tap();assert.match(touch.url(),/world-map$/);assert.equal(await touch.locator('.lw-about small').evaluate(e=>getComputedStyle(e).opacity),'1');await touch.locator('.lw-about .lw-label').tap();await touch.waitForURL('**/about');await touch.goBack();await touch.locator('.lw-scene').waitFor()
 for(let i=0;i<3;i++){await touch.getByRole('button',{name:'다음 섬 보기'}).click();await touch.waitForTimeout(150)}
 const visible=await touch.locator('.lw-contact .lw-label').evaluate(e=>{const r=e.getBoundingClientRect();return r.x>=0&&r.right<=innerWidth});assert.ok(visible)
 await touch.locator('.lw-top-nav a[href="/projects"]').click();await touch.waitForURL('**/projects');await touch.goBack();await touch.locator('.lw-scene').waitFor()
 report.checks.push('mobile large island rail / paging all 4 / touch reveal then enter / top navigation direct reduced route')
 await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-top-nav a[href="/skills"]').focus();await p.keyboard.press('Enter');await p.waitForURL('**/skills');await p.goBack();await p.goForward();await p.waitForURL('**/skills')
 report.checks.push('keyboard focus + Enter / Back + Forward')
 const fallback=await browser.newPage({reducedMotion:'reduce'});await fallback.route('**/world-layers/*',r=>r.abort());await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'?null:original.call(this,type,...args)}});await fallback.goto('http://127.0.0.1:5174/world-map');await fallback.locator('.lw-top-nav a[href="/contact"]').click();await fallback.waitForURL('**/contact');report.checks.push('image + WebGL failure retains navigation')
 assert.equal(report.errors.length,0)
 }finally{await fs.writeFile('docs/layered-world/four-world-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1})



