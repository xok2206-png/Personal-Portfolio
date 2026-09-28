const fs = require('node:fs/promises')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5174'
const viewports = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900]]
const report = { date: new Date().toISOString(), viewports: [], checks: [], errors: [] }
function assert(condition, message) { if (!condition) throw new Error(message) }
async function check(name, fn) { try { await fn(); report.checks.push({ name, passed: true }); console.log('PASS',name) } catch (error) { report.checks.push({ name, passed: false, error: error.message }); console.log('FAIL',name,error.message.slice(0,150)) } }
async function run() {
  await fs.mkdir('docs/qa/world', { recursive: true })
  const browser = await chromium.launch({ headless: true, channel: 'msedge' })
  const context = await browser.newContext({ viewport: { width:1440,height:810 } })
  const page = await context.newPage()
  page.on('pageerror', error => report.errors.push(error.message))
  await page.goto(origin + '/world-map')
  await page.locator('.pw-island-art').first().waitFor()
  for (const [width,height] of viewports) {
    await page.setViewportSize({ width,height })
    await page.waitForTimeout(100)
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      links: [...document.querySelectorAll('.pw-island-label')].map(label => {
        const r = label.getBoundingClientRect()
        return { name: label.querySelector('strong').textContent, left:r.left, right:r.right, width:r.width, height:r.height }
      }),
      images: [...document.querySelectorAll('.pw-island-art')].every(img => img.complete && img.naturalWidth > 0),
    }))
    const obscured = []
    for (const label of await page.locator('.pw-island-label').all()) {
      await label.scrollIntoViewIfNeeded()
      const hit = await label.evaluate(el=>{const r=el.getBoundingClientRect();return {name:el.querySelector('strong').textContent,ok:el.closest('a').contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}})
      if (!hit.ok) obscured.push(hit.name)
    }
    const passed = !layout.overflow && !obscured.length && layout.links.length === 5 && layout.links.every(r => r.left >= 0 && r.right <= width && r.height >= 44) && layout.images
    report.viewports.push({width,height,passed,obscured,...layout})
    await page.evaluate(()=>scrollTo(0,0))
    if (width === 1440 || width === 430 || width === 768 || width === 360) await page.screenshot({ path:`docs/qa/world/${width}x${height}.png`, fullPage:true })
  }
  await page.setViewportSize({width:1440,height:810})
  await check('All five island labels are unobstructed and enter their routes', async () => {
    for (const id of ['about','skills','projects','qa','contact']) {
      await page.goto(origin + '/world-map')
      const label = page.locator(`[data-island="${id}"] .pw-island-label`)
      await label.scrollIntoViewIfNeeded()
      await label.click({timeout:3000})
      await page.waitForURL(origin + '/' + id,{timeout:3000})
      assert(await page.locator('main').count() === 1, id + ': main missing or duplicated')
      await page.reload()
      assert((await page.locator('h1').innerText()).length > 0, id + ': reload empty')
      await page.goBack()
    }
  })
  await check('Keyboard focus selects islands, Enter navigates, Back restores selection', async () => {
    await page.goto(origin + '/world-map')
    await page.locator('[data-island="about"]').focus()
    await page.keyboard.press('Tab')
    assert(await page.locator('[data-island="skills"]').evaluate(el=>el===document.activeElement),'Tab did not select Skills')
    await page.keyboard.press('Enter')
    await page.waitForURL(origin+'/skills')
    await page.goBack()
    assert(await page.locator('[data-island="skills"]').getAttribute('class').then(x=>x.includes('is-selected')),'selection lost')
  })
  await check('Global navigation cancels an in-flight camera route', async () => {
    await page.goto(origin+'/world-map')
    await page.locator('[data-island="projects"] .pw-island-label').click()
    await page.locator('.desktop-nav a[href="/about"]').click()
    await page.waitForTimeout(2200)
    assert(page.url() === origin+'/about','stale route timer fired')
  })
  await check('Motion pause stops ambient animation', async () => {
    await page.goto(origin+'/world-map')
    await page.getByRole('button',{name:'움직임 일시정지',exact:true}).click()
    assert(await page.locator('.portfolio-world').getAttribute('data-paused') === 'true','pause state missing')
    assert(await page.locator('.pw-island-float').first().evaluate(el=>getComputedStyle(el).animationPlayState)==='paused','float still running')
    await page.getByRole('button',{name:'움직임 재생',exact:true}).click()
  })
  await check('Touch tap opens a destination at 430×932', async () => {
    const touch = await browser.newContext({viewport:{width:430,height:932},hasTouch:true,isMobile:true})
    const p = await touch.newPage(); await p.goto(origin+'/world-map')
    await p.locator('[data-island="contact"] .pw-island-label').tap()
    await p.waitForURL(origin+'/contact',{timeout:4000}); await touch.close()
  })
  await check('Reduced motion skips the cinematic and camera', async () => {
    const rm = await browser.newContext({reducedMotion:'reduce'})
    const p = await rm.newPage(); await p.goto(origin+'/')
    await p.getByRole('button',{name:'ENTER WORLD',exact:true}).click()
    await p.waitForURL(origin+'/world-map',{timeout:1500})
    assert(await p.locator('.portal-cinematic').count() === 0,'cinematic mounted')
    assert(await p.locator('.pw-island-float').first().evaluate(el=>getComputedStyle(el).animationName)==='none','animation active')
    await p.locator('[data-island="projects"] .pw-island-label').click()
    await p.waitForURL(origin+'/projects',{timeout:1000}); await rm.close()
  })
  await check('Image failure keeps all destinations usable', async () => {
    const p = await context.newPage(); await p.route('**/portfolio-world/*.webp',route=>route.abort())
    await p.goto(origin+'/world-map'); await p.locator('.pw-art-fallback').first().waitFor()
    assert(await p.locator('.pw-art-fallback').count() === 5,'missing fallback labels')
    await p.locator('[data-island="projects"] .pw-island-label').click(); await p.waitForURL(origin+'/projects'); await p.close()
  })
  await check('Video failure recovers without blocking navigation', async () => {
    const c = await browser.newContext(); const p = await c.newPage()
    await p.route('**/production/video/**',route=>route.abort())
    await p.goto(origin+'/'); await p.getByRole('button',{name:'ENTER WORLD',exact:true}).click()
    await p.waitForURL(origin+'/world-map',{timeout:4000}); await c.close()
  })
  await check('Cinematic plays, arrives within 12s, revisit goes directly to World', async () => {
    const c = await browser.newContext(); const p = await c.newPage(); await p.goto(origin+'/')
    const start=Date.now(); await p.getByRole('button',{name:'ENTER WORLD',exact:true}).click()
    await p.locator('.portal-cinematic video').waitFor()
    await p.waitForFunction(()=>document.querySelector('.portal-cinematic video')?.currentTime > 1,null,{timeout:4000})
    await p.waitForURL(origin+'/world-map',{timeout:13000}); report.cinematicElapsedMs=Date.now()-start
    assert(report.cinematicElapsedMs<13000,'cinematic deadline exceeded')
    await p.goto(origin+'/'); await p.getByRole('button',{name:'ENTER WORLD',exact:true}).click()
    await p.waitForURL(origin+'/world-map',{timeout:1500}); await c.close()
  })
  await check('Escape skips the cinematic', async () => {
    const c=await browser.newContext();const p=await c.newPage();await p.goto(origin+'/')
    await p.getByRole('button',{name:'ENTER WORLD',exact:true}).click();await p.keyboard.press('Escape')
    await p.waitForURL(origin+'/world-map',{timeout:2000});await c.close()
  })
  await check('Storage denial leaves navigation operational', async () => {
    const c=await browser.newContext();await c.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('storage denied')};Storage.prototype.setItem=()=>{throw new Error('storage denied')}})
    const p=await c.newPage();await p.goto(origin+'/world-map');await p.locator('[data-island="about"] .pw-island-label').click();await p.waitForURL(origin+'/about');await c.close()
  })
  await check('200% CSS zoom retains all destinations and no horizontal overflow', async () => {
    await page.goto(origin+'/world-map');await page.locator('.pw-island').first().waitFor();await page.evaluate(()=>{document.documentElement.style.zoom='2'})
    assert(await page.locator('.pw-island').count()===5,'content missing')
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow')
    await page.screenshot({path:'docs/qa/world/css-zoom-200.png',fullPage:true})
    await page.evaluate(()=>{document.documentElement.style.zoom=''})
  })
  await check('Direct access exposes all four real projects', async()=>{
    await page.goto(origin+'/quick-view');assert(await page.locator('a[href^="/projects/"]').count()===4,'projects missing')
    for(const route of ['/projects/jaduya','/projects/masillo','/projects/animal24','/projects/sulwhasoo','/resume']){await page.goto(origin+route);assert(await page.locator('main').count()===1,'main missing: '+route)}
  })
  await browser.close()
  await fs.writeFile('docs/qa/world/report.json',JSON.stringify(report,null,2))
  console.log(JSON.stringify({viewports:report.viewports.map(({width,height,passed})=>({width,height,passed})),checks:report.checks,errors:report.errors,cinematicElapsedMs:report.cinematicElapsedMs},null,2))
  if(report.viewports.some(x=>!x.passed)||report.checks.some(x=>!x.passed)||report.errors.length)process.exitCode=1
}
run().catch(async error=>{console.error(error);await fs.writeFile('docs/qa/world/report.json',JSON.stringify({...report,fatal:error.message},null,2));process.exitCode=1})
