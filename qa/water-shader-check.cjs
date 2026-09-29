const fs = require('node:fs/promises')
const { chromium } = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async () => {
 const browser = await chromium.launch({ channel: 'msedge', headless: true })
 try {
  const page = await browser.newPage(), errors = [], results = []
  page.on('pageerror', e => errors.push(e.message))
  // Water must remain usable even when WebGL is unavailable.
  await page.addInitScript(() => {
   const get = HTMLCanvasElement.prototype.getContext
   HTMLCanvasElement.prototype.getContext = function(type, ...args) {
    return type.startsWith('webgl') ? null : get.call(this, type, ...args)
   }
  })
  for (const [width, height] of [[1440,810],[1024,768],[430,932],[390,844],[360,800]]) {
   await page.setViewportSize({ width, height })
   await page.goto('http://127.0.0.1:5174/world-map')
   await page.locator('.lw-water-streams').first().waitFor()
   await page.waitForTimeout(500)
   const result = await page.evaluate(() => ({
    streams: document.querySelectorAll('.lw-water-streams').length,
    masks: [...document.querySelectorAll('.lw-water-streams g[mask]')].every(e => !!document.querySelector(e.getAttribute('mask').slice(4,-1))),
    overflow: document.documentElement.scrollWidth > innerWidth,
    legacyCanvas: document.querySelectorAll('.lw-water-canvas').length,
   }))
   results.push({width,height,...result})
   if(result.streams !== 4 || !result.masks || result.overflow || result.legacyCanvas) throw Error('Water layout regression')
   if(width===1440 || width===390) await page.screenshot({path:`docs/layered-world/water-fixed-${width}.png`})
  }
  const flow=page.locator('.lw-water-flow').first()
  const offset=()=>flow.evaluate(e=>getComputedStyle(e).strokeDashoffset)
  const a=await offset();await page.waitForTimeout(200);if(a===await offset())throw Error('Water does not flow')
  await page.locator('.lw-system summary').click()
  await page.getByRole('button',{name:'세계 움직임 일시정지'}).click()
  await page.waitForTimeout(100)
  const paused=await offset();await page.waitForTimeout(200);if(paused!==await offset())throw Error('Pause failed')
  await page.emulateMedia({reducedMotion:'reduce'})
  if(await flow.evaluate(e=>getComputedStyle(e).animationName)!=='none')throw Error('Reduced motion failed')
  await page.goto('http://127.0.0.1:5174/contact');await page.goBack();await page.locator('.lw-water-streams').first().waitFor()
  await page.reload();await page.locator('.lw-water-streams').first().waitFor()
  if(errors.length)throw Error(errors.join('\n'))
  await fs.writeFile('docs/layered-world/water-svg-report.json',JSON.stringify({results,errors,motion:'flow/pause/reduced passed',navigation:'direct/back/reload passed',webgl:'disabled throughout'},null,2))
  console.log('Water regression passed: five sizes, WebGL unavailable, motion, pause, reduced motion, direct/back/reload')
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1})
