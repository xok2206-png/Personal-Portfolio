const fs = require('node:fs/promises')
const assert = require('node:assert/strict')
const { chromium } = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sharp = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const output = 'output/about-studio-qa/'
const report = { checks: [], viewports: [], errors: [] }
const sizes = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,900],[844,390],[1280,600],[2560,1080],[720,405]]
;(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  try {
    const p = await browser.newPage({ viewport: { width: 1440, height: 810 } })
    p.on('pageerror', e => report.errors.push(e.message))
    await p.addInitScript(() => {
      window.studioDrawCalls = 0
      const draw = WebGLRenderingContext.prototype.drawArrays
      WebGLRenderingContext.prototype.drawArrays = function (...args) { window.studioDrawCalls++; return draw.apply(this, args) }
    })
    await p.goto('http://127.0.0.1:5175/about')
    await p.locator('.studio-foliage-wind[data-ready="true"]').waitFor()
    await p.evaluate(() => document.fonts.ready)
    const transforms = () => p.locator('.studio-cloud-front,.studio-cloud-shadow,.studio-light-shaft,.studio-steam-one').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).transform))
    const first = await transforms(), calls = await p.evaluate(() => window.studioDrawCalls)
    const a = await p.screenshot({ path: output + 'motion-a.png' })
    await p.waitForTimeout(1500)
    const b = await p.screenshot({ path: output + 'motion-b.png' })
    const second = await transforms()
    assert.ok(second.every((value, i) => value !== first[i]))
    assert.ok(await p.evaluate(() => window.studioDrawCalls) > calls + 10)
    // The foreground terrace planter: verify rendered pixels, not just an animation name.
    const crop = { left: 1010, top: 520, width: 100, height: 100 }
    const aa = await sharp(a).extract(crop).removeAlpha().raw().toBuffer()
    const bb = await sharp(b).extract(crop).removeAlpha().raw().toBuffer()
    let changed = 0
    for (let i = 0; i < aa.length; i += 3) if (Math.abs(aa[i] - bb[i]) + Math.abs(aa[i+1] - bb[i+1]) + Math.abs(aa[i+2] - bb[i+2]) > 12) changed++
    report.foliageChangedPixels = changed
    assert.ok(changed > 50, 'foliage must actually move')
    report.checks.push('Cloud, sunlight, shadow and steam transforms change; foliage pixels move; canvas renders while active')
    assert.equal(await p.locator('.studio-beacon').count(),0)
    assert.equal(await p.locator('.studio-index').evaluate(n=>n.open),false)
    assert.equal(await p.locator('.studio-hud').count(),0)
    assert.equal(await p.locator('.studio-item-light').count(),5)
    assert.ok((await p.locator('.studio-item-aura').evaluateAll(nodes=>nodes.map(n=>Number(getComputedStyle(n).opacity)))).every(v=>v>=.45))
    assert.ok((await p.locator('.studio-prompt kbd').evaluateAll(nodes=>nodes.map(n=>{const s=getComputedStyle(n);return s.display!=='none' && s.visibility==='visible'}))).every(Boolean))
    const lightLevel = () => p.locator('.studio-item-aura').evaluateAll(nodes=>nodes.map(n=>Number(getComputedStyle(n).opacity)))
    const glowBefore = await lightLevel()
    await p.waitForTimeout(700)
    const glowAfter = await lightLevel()
    assert.ok(glowAfter.every((v,i)=>Math.abs(v-glowBefore[i])>.001), 'all idle object lights should breathe')
    assert.ok(glowAfter.every(v=>v>=.45), 'lights never disappear')
    const rimBefore = await p.locator('.studio-item-light').first().locator('.studio-item-rim').evaluate(n=>getComputedStyle(n).strokeOpacity)
    await p.locator('.studio-object-profile').hover(); await p.waitForTimeout(220)
    assert.ok(Number(await p.locator('.studio-item-light').first().locator('.studio-item-rim').evaluate(n=>getComputedStyle(n).strokeOpacity))>Number(rimBefore))
    assert.equal(await p.locator('.studio-item-light[data-active="true"]').count(),1)
    assert.equal(await p.locator('.studio-hud').count(),0)
    const prompt = await p.locator('.studio-object-profile .studio-prompt').boundingBox()
    assert.ok(prompt.height<=44 && prompt.width<=200)
    await p.screenshot({path:output+'item-hover.png'})
    await p.mouse.move(0,0)
    report.checks.push('Idle has no numbered cards, open list or content panel; all five idle contours and E hints are visible; hover strengthens only one object and shows a compact verb')
    for (const [width, height] of sizes) {
      await p.setViewportSize({ width, height }); await p.waitForTimeout(120)
      const markers = await p.locator('.studio-object').evaluateAll(nodes => nodes.map(n => { const r=n.getBoundingClientRect(); return { x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height,inert:n.inert } }))
      assert.ok(markers.every(m => m.width >= 44 && m.height >= 44), JSON.stringify({ width,height,markers }))
      for (const marker of markers) {
        const visibleArea = Math.max(0,Math.min(width,marker.right)-Math.max(0,marker.x)) * Math.max(0,Math.min(height,marker.bottom)-Math.max(64,marker.y))
        assert.equal(marker.inert,visibleArea/(marker.width*marker.height)<.4,'cropped target inert state '+width+'x'+height)
      }
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false)
      assert.equal(await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1), false, 'vertical overflow '+width+'x'+height)
      if ([1440,1024,430,360,768].includes(width)) await p.screenshot({path:output+'items-'+width+'x'+height+'.png'})
      await p.locator('.studio-index summary').click()
      const entries=await p.locator('.studio-index button').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,height:r.height}}))
      assert.ok(entries.every(r=>r.x>=0 && r.y>=64 && r.right<=width && r.bottom<=height && r.height>=44))
      await p.keyboard.press('Escape')
      assert.equal(await p.locator('.studio-index').evaluate(n=>n.open),false)
      report.viewports.push({width,height,markers})
    }
    report.checks.push('23 responsive sizes: fixed page, 44px object targets and all five entries in the compact disclosure; cropped items are inert')
    await p.setViewportSize({width:1440,height:810}); await p.evaluate(() => window.scrollTo(0,0))
    for(let i=0;i<5;i++) {
      await p.locator('.studio-object').nth(i).click()
      await p.locator('.studio-hud:modal').waitFor()
      assert.equal(await p.locator('.studio-atmosphere').getAttribute('data-running'),'false')
      assert.equal(await p.locator('.studio-item-lights').getAttribute('data-selected'),'true')
      const count = await p.evaluate(() => window.studioDrawCalls)
      await p.waitForTimeout(150)
      assert.equal(await p.evaluate(() => window.studioDrawCalls),count)
      await p.keyboard.press('Escape')
    }
    report.checks.push('Only selection opens content; all five objects work; lights disappear and environment stops during reading')
    await p.mouse.move(0,0)
    await p.locator('.page-settings').click(); await p.getByRole('button',{name:/배경 움직임/}).click(); await p.getByRole('button',{name:'닫기',exact:true}).click()
    const paused = await transforms(), count = await p.evaluate(() => window.studioDrawCalls)
    await p.waitForTimeout(250)
    assert.deepEqual(await transforms(),paused); assert.equal(await p.evaluate(() => window.studioDrawCalls),count)
    await p.locator('.page-settings').click(); await p.getByRole('button',{name:/배경 움직임/}).click(); await p.getByRole('button',{name:'닫기',exact:true}).click()
    await p.emulateMedia({reducedMotion:'reduce'}); await p.waitForTimeout(100)
    assert.equal(await p.locator('.studio-atmosphere').getAttribute('data-running'),'false')
    report.checks.push('Settings pause freezes CSS and WebGL; reduced motion uses static scene')
    const mobile = await browser.newPage({viewport:{width:360,height:800},isMobile:true,hasTouch:true})
    await mobile.goto('http://127.0.0.1:5175/about')
    for(let i=0;i<5;i++){await mobile.locator('.studio-index summary').tap();await mobile.locator('.studio-index button').nth(i).tap();await mobile.locator('.studio-hud:modal').waitFor();await mobile.getByRole('button',{name:'정보창 닫기'}).tap()}
    await mobile.locator('.studio-object-values').tap();await mobile.locator('.studio-hud:modal').waitFor();await mobile.getByRole('button',{name:'정보창 닫기'}).tap()
    await mobile.evaluate(() => window.scrollTo(0,document.body.scrollHeight)); await mobile.waitForTimeout(200)
    assert.equal(await mobile.evaluate(() => scrollY),0)
    report.checks.push('360px touch: visible board and all five disclosure entries open; page stays fixed')
    const fallback = await browser.newPage({viewport:{width:1440,height:810}})
    await fallback.addInitScript(() => { const get = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (type,...args) { return type==='webgl' ? null : get.call(this,type,...args) } })
    await fallback.goto('http://127.0.0.1:5175/about')
    await fallback.locator('.studio-room').evaluate(n => n.decode())
    assert.equal(await fallback.locator('.studio-foliage-wind').getAttribute('data-ready'),'false')
    await fallback.locator('.studio-object').first().click();await fallback.locator('.studio-hud:modal').waitFor()
    report.checks.push('WebGL unavailable: original image and interactive HUD remain usable')
    assert.deepEqual(report.errors,[]);report.passed=true
  } finally { await fs.writeFile(output+'motion-verification.json',JSON.stringify(report,null,2));await browser.close() }
  console.log(JSON.stringify({passed:report.passed,checks:report.checks,viewports:report.viewports.length,foliageChangedPixels:report.foliageChangedPixels,errors:report.errors},null,2))
})().catch(e=>{console.error(e);process.exitCode=1})
