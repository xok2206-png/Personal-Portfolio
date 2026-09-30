const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const { chromium } = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const root = 'http://127.0.0.1:5174', output = 'output/integrated-pages-qa'
const sizes = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,1080],[1280,600],[844,390],[720,405]]
;(async () => {
 await fs.mkdir(output,{recursive:true})
 const browser = await chromium.launch({channel:'msedge',headless:true})
 const report = {pages:[],checks:[],errors:[],failedRequests:[]}
 try {
  const page = await browser.newPage({viewport:{width:1440,height:810},reducedMotion:'reduce'})
  page.on('pageerror', error=>report.errors.push(error.message))
  page.on('response', response=>{if(response.status()>=400)report.failedRequests.push([response.status(),response.url()])})
  for(const [route,selector] of [['world-map','.flight-world'],['about','.about-studio'],['skills','.skills-core'],['projects','.projects-world'],['contact','.connect-world']]){
   await page.goto(root+'/'+route)
   if(route==='skills') await page.locator('.sc-core').waitFor(); else await page.locator(selector).waitFor()
   for(const [width,height] of sizes){
    await page.setViewportSize({width,height});await page.waitForTimeout(90)
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${route}: overflow ${width}x${height}`)
    assert.ok(await page.locator('.page-realworld').isVisible())
    if(width===1440||width===430)await page.screenshot({path:`${output}/${route}-${width}.png`})
   }
   report.pages.push({route,viewports:sizes.length})
  }
  await page.setViewportSize({width:1440,height:810})
  await page.goto(root+'/about');assert.equal(await page.locator('.studio-object').count(),5)
  await page.locator('.studio-object').first().click();await page.locator('dialog[open]').waitFor();await page.keyboard.press('Escape')
  await page.locator('.page-primary-nav a[href="/skills"]').click();await page.waitForURL('**/skills')
  await page.locator('.sc-core').click()
  await page.getByRole('tab',{name:'Development',exact:true}).click();await page.keyboard.press('Escape')
  await page.locator('.page-primary-nav a[href="/projects"]').click();await page.waitForURL('**/projects')
  await page.locator('.page-primary-nav a[href="/projects"]').click();await page.locator('.pw-picker[open]').waitFor()
  assert.equal(await page.locator('.pw-picker nav a').count(),5)
  await page.locator('.pw-picker a[href="/projects/aquarium"]').click();await page.waitForURL('**/projects/aquarium')
  assert.equal(await page.locator('.destination-frame').count(),0)
  await page.goBack();await page.waitForURL('**/projects');await page.reload();await page.locator('.projects-world').waitFor()
  for(const id of ['aquarium','animal24','sulwhasoo','jaduya','masillo']){
   await page.goto(root+'/projects/'+id);assert.ok((await page.locator('main h1').textContent()).length>0)
  }
  await page.goto(root+'/contact');await page.locator('.choice-email').click()
  await page.locator('.connect-hud[open]').waitFor();await page.keyboard.press('Escape')
  for(const route of ['/contact#qa','/quick-view','/resume','/']){
   await page.goto(root+route);await page.locator('main').waitFor()
  }
  await page.setViewportSize({width:430,height:932});await page.goto(root+'/contact')
  await page.getByRole('button',{name:'메뉴',exact:true}).click()
  await page.locator('.page-mobile-nav a[href="/skills"]').click();await page.waitForURL('**/skills');await page.locator('.sc-core').waitFor()
  report.checks.push('Five latest page implementations, 22 viewports each, shared desktop/mobile navigation, About dialog, Skills panel, Projects current-nav picker and 5 details, Contact dialog, Back/Reload, Q&A/Resume/QuickView/RealWorld')
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedRequests,[])
  console.log(JSON.stringify(report,null,2))
 } finally { await fs.writeFile(output+'/report.json',JSON.stringify(report,null,2));await browser.close() }
})().catch(error=>{console.error(error);process.exit(1)})
