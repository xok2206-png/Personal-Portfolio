const fs = require('node:fs/promises')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE)
const sharp = require(process.env.SHARP_MODULE)
async function run(){
 const report={viewports:[],checks:[],errors:[]}
 const src='public/assets/production/images/portfolio-world/reference-world'
 const original=await sharp(src+'.png').ensureAlpha().raw().toBuffer()
 const optimized=await sharp(src+'.webp').ensureAlpha().raw().toBuffer()
 report.losslessPixelsIdentical=original.equals(optimized)
 const browser=await chromium.launch({headless:true,channel:'msedge'})
 const context=await browser.newContext()
 const page=await context.newPage()
 page.on('pageerror',e=>report.errors.push(e.message))
 const base='http://127.0.0.1:5174'
 await page.goto(base+'/world-map')
 await page.locator('.rw-art').evaluate(img=>img.decode())
 for(const [width,height] of [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900]]){
  await page.setViewportSize({width,height})
  const data=await page.evaluate(()=>{
   const img=document.querySelector('.rw-art'),r=img.getBoundingClientRect()
   return {overflow:document.documentElement.scrollWidth>innerWidth+1,ratioError:Math.abs(r.width/r.height-4351/2449),links:[...document.querySelectorAll('.rw-island')].every(el=>{const b=el.getBoundingClientRect();return b.width>=44&&b.height>=44&&el.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2))})}
  })
  report.viewports.push({width,height,...data,passed:!data.overflow&&data.ratioError<.01&&data.links})
  if([1440,430,768].includes(width))await page.screenshot({path:`docs/reference-revision/${width}x${height}.png`,fullPage:true})
 }
 async function check(name,fn){try{await fn();report.checks.push({name,passed:true})}catch(e){report.checks.push({name,passed:false,error:e.message})}}
 function assert(x,m){if(!x)throw Error(m)}
 await page.setViewportSize({width:1440,height:810})
 await check('Five island entries, reload and Back',async()=>{for(const id of ['about','skills','projects','qa','contact']){await page.goto(base+'/world-map');await page.locator(`[data-island="${id}"]`).click();await page.waitForURL(base+'/'+id);await page.reload();assert(await page.locator('h1').count()>0,'heading');await page.goBack()}})
 await check('Keyboard navigation',async()=>{await page.goto(base+'/world-map');await page.locator('[data-island="about"]').focus();await page.keyboard.press('Tab');assert(await page.locator('[data-island="skills"]').evaluate(el=>el===document.activeElement),'focus');await page.keyboard.press('Enter');await page.waitForURL(base+'/skills')})
 await check('Direct navigation cancels camera on unmount',async()=>{await page.goto(base+'/world-map');await page.locator('[data-island="projects"]').click();await page.locator('.rw-access a[href="/contact"]').click();await page.waitForTimeout(1500);assert(page.url()===base+'/contact','stale navigation')})
 await check('Mobile overview, expansion and direct content',async()=>{await page.setViewportSize({width:430,height:932});await page.goto(base+'/world-map');await page.getByRole('button',{name:'풍경 확대해서 보기'}).click();assert(await page.locator('.rw-viewport').evaluate(el=>el.scrollWidth>el.clientWidth),'no expansion');await page.getByRole('button',{name:'전체 풍경 보기'}).click();await page.locator('.rw-access a[href="/projects"]').click();await page.waitForURL(base+'/projects')})
 await check('Image failure preserves five readable routes',async()=>{const p=await context.newPage();await p.route('**/reference-world.webp',r=>r.abort());await p.goto(base+'/world-map');await p.locator('.has-error').waitFor();assert(await p.locator('.rw-access nav a').count()===5,'missing links');await p.locator('.rw-access a[href="/contact"]').click();await p.waitForURL(base+'/contact');await p.close()})
 await check('Reduced motion goes directly to content',async()=>{const c=await browser.newContext({reducedMotion:'reduce'});const p=await c.newPage();await p.goto(base+'/world-map');await p.locator('[data-island="projects"]').click();await p.waitForURL(base+'/projects',{timeout:700});await c.close()})
 await check('200% CSS zoom retains direct access',async()=>{await page.setViewportSize({width:1440,height:810});await page.goto(base+'/world-map');await page.locator('.rw-scene').waitFor();await page.evaluate(()=>document.documentElement.style.zoom='2');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow');await page.locator('.rw-access a[href="/contact"]').click();await page.waitForURL(base+'/contact')})
 await browser.close()
 await fs.writeFile('docs/reference-revision/report.json',JSON.stringify(report,null,2))
 console.log(JSON.stringify(report,null,2))
 if(!report.losslessPixelsIdentical||report.errors.length||report.viewports.some(x=>!x.passed)||report.checks.some(x=>!x.passed))process.exitCode=1
}
run().catch(e=>{console.error(e);process.exitCode=1})


