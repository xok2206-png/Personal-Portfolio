const fs = require('node:fs/promises')
const assert = require('node:assert/strict')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5174'
const viewports = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,820],[1024,820],[1279,810],[1280,810],[1919,1080],[1920,1080],[720,405],[844,390]]
const report = { checks: [], layouts: [], errors: [] }
const ok = (name, condition = true) => { assert(condition, name); report.checks.push(name) }
async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const page = async options => {
    const p = await browser.newPage(options)
    p.on('pageerror', e => report.errors.push(e.message))
    return p
  }
  try {
    const p = await page({ viewport: { width:1440, height:810 } })
    await p.goto(origin)
    await p.waitForFunction(() => document.querySelector('.start-video')?.readyState >= 2)
    await p.evaluate(() => document.fonts.ready)
    ok('Idle source is start-ambient.mp4, looping with the original poster', await p.locator('.start-video').evaluate(v=>v.currentSrc.endsWith('/assets/start-ambient.mp4') && v.loop && v.poster.endsWith('/assets/start-poster.webp')))
    await p.screenshot({path:'output/real-world-video-order/idle-desktop.png'})
    for (const active of [false, true]) {
      if (active) {
        await p.locator('.enter-world-button').click()
        await p.locator('.portal-cinematic').waitFor()
      }
      for (const [width,height] of viewports) {
        await p.setViewportSize({ width,height })
        const faults = await p.evaluate(active => {
          const faults = []
          const selectors = active ? ['.portal-actions a','.portal-actions button'] : ['.real-credit-copy','.enter-world-button','.journey-direct','.real-header']
          const rects = selectors.map(s => ({ s, ...document.querySelector(s).getBoundingClientRect().toJSON() }))
          for (const r of rects) if (r.x < 0 || r.y < 0 || r.right > innerWidth + 1 || r.bottom > innerHeight + 1) faults.push(r.s + ' clipped')
          for (let a=0;a<rects.length;a++) for (let b=a+1;b<rects.length;b++) {
            const x=rects[a], y=rects[b]
            if (x.x < y.right && x.right > y.x && x.y < y.bottom && x.bottom > y.y) faults.push('UI overlap')
          }
          const v = document.querySelector('.start-video').getBoundingClientRect()
          if (v.x !== 0 || v.y !== 0 || v.width !== innerWidth || v.height !== innerHeight) faults.push('video lost fullscreen bounds')
          if (document.documentElement.scrollWidth > innerWidth) faults.push('horizontal overflow')
          return faults
        }, active)
        report.layouts.push({ width,height,active,faults })
      }
    }
    ok('21 viewports, idle and active, retain fullscreen and visible controls', report.layouts.every(r => !r.faults.length))
    await p.keyboard.press('Escape')
    await p.locator('.natural-world').waitFor()
    await p.goBack()
    await p.locator('.enter-world-button').waitFor()
    await p.setViewportSize({ width:1440,height:810 })
    await p.waitForFunction(() => { const v=document.querySelector('.start-video'); return v.currentTime > .2 && v.currentTime < .8 })
    await p.evaluate(() => { window.continuityVideo=document.querySelector('.start-video') })
    await p.locator('.enter-world-button').click()
    await p.locator('.portal-entry.is-visible').waitFor()
    ok('ENTER WORLD starts premium-to-portal-preview.mp4 from its opening',await p.locator('.portal-entry').evaluate(v=>v.currentSrc.endsWith('/premium-to-portal-preview.mp4') && v.currentTime<1 && !v.paused))
    ok('Ambient remains beneath the dissolve on the same page',await p.locator('.start-video').evaluate(v=>v===window.continuityVideo && v.currentSrc.endsWith('/start-ambient.mp4') && location.pathname==='/'))
    await p.screenshot({path:'output/real-world-video-order/entry-desktop.png'})
    await p.waitForTimeout(800)
    ok('Ambient pauses once the portal covers it',await p.locator('.start-video').evaluate(v=>v.paused))
    ok('Arrival does not play before the portal ends',await p.locator('.portal-arrival').evaluate(v=>v.paused && v.currentTime===0))
    await p.locator('.portal-arrival.is-visible').waitFor({ timeout:18000 })
    ok('Next decoded frame covers the actual outgoing final frame', await p.locator('.portal-entry').evaluate(v=>v.ended && v.currentTime>10) && await p.locator('.portal-arrival').evaluate(v=>v.readyState>=2 && !v.paused && v.currentSrc.endsWith('/hf_20260928_083251_631630ef-35fe-4781-9b95-1031ef031b16.mp4')))
    await p.screenshot({path:'output/real-world-video-order/arrival-desktop.png'})
    await p.locator('.natural-world').waitFor({ timeout:18000 })
    ok('Full cinematic reaches world')
    await p.goBack()
    await p.locator('.enter-world-button').waitFor()
    await p.locator('.enter-world-button').focus()
    await p.keyboard.press('Tab')
    ok('Keyboard reaches direct entry', await p.locator('.journey-direct').evaluate(e=>e===document.activeElement))
    await p.keyboard.press('Enter')
    await p.locator('.natural-world').waitFor()
    ok('Direct entry bypasses playback', await p.locator('.portal-cinematic').count()===0)

    const slow = await page({ viewport:{width:430,height:932},hasTouch:true,isMobile:true })
    await slow.route('**/hf_20260928_083251_*.mp4',async route=>{await new Promise(r=>setTimeout(r,1800));await route.continue().catch(()=>{})})
    await slow.goto(origin)
    await slow.locator('.enter-world-button').tap()
    await slow.waitForFunction(()=>document.querySelector('.portal-entry')?.duration>0)
    await slow.locator('.portal-entry').evaluate(v=>{v.currentTime=v.duration-.1})
    await slow.waitForFunction(()=>document.querySelector('.portal-entry').ended)
    ok('Slow arrival keeps last room frame instead of a black overlay', await slow.locator('.portal-arrival').evaluate(v=>getComputedStyle(v).opacity==='0') && await slow.locator('.portal-entry').evaluate(v=>v.readyState>=2))
    await slow.locator('.portal-arrival.is-visible').waitFor()
    ok('Slow arrival becomes visible only when playable',await slow.locator('.portal-arrival').evaluate(v=>v.readyState>=2))
    await slow.getByRole('button',{name:'연출 건너뛰기'}).tap()
    await slow.locator('.natural-world').waitFor()
    ok('Touch skip works during arrival')


    const slowEntry = await page({ viewport:{width:430,height:932},hasTouch:true,isMobile:true })
    await slowEntry.route('**/premium-to-portal-preview.mp4',async route=>{await new Promise(r=>setTimeout(r,1600));await route.continue().catch(()=>{})})
    await slowEntry.goto(origin)
    await slowEntry.waitForFunction(()=>document.querySelector('.start-video')?.readyState>=2)
    await slowEntry.screenshot({path:'output/real-world-video-order/idle-mobile.png'})
    await slowEntry.locator('.enter-world-button').tap()
    await slowEntry.waitForTimeout(450)
    ok('Slow portal loading keeps original ambient playing full screen',await slowEntry.locator('.start-video').evaluate(v=>!v.paused && v.currentSrc.endsWith('/start-ambient.mp4') && v.getBoundingClientRect().width===innerWidth))
    ok('Unready portal stays transparent',await slowEntry.locator('.portal-entry').evaluate(v=>getComputedStyle(v).opacity==='0'))
    await slowEntry.locator('.portal-entry.is-visible').waitFor()
    await slowEntry.waitForTimeout(750)
    await slowEntry.screenshot({path:'output/real-world-video-order/entry-mobile.png'})
    ok('Original ambient is paused after the slow portal crossfade',await slowEntry.locator('.start-video').evaluate(v=>v.paused))
    await slowEntry.getByRole('button',{name:'연출 건너뛰기'}).tap()
    await slowEntry.locator('.natural-world').waitFor()

    const reduced = await page({ reducedMotion:'reduce' })
    await reduced.goto(origin)
    await reduced.locator('.enter-world-button').waitFor()
    ok('Reduced motion pauses media',await reduced.locator('.start-video').evaluate(v=>v.paused))
    await reduced.locator('.enter-world-button').click()
    await reduced.locator('.natural-world').waitFor()
    ok('Reduced motion bypasses cinematic')

    const failed = await page()
    await failed.route('**/production/video/**',route=>route.abort())
    await failed.goto(origin)
    await failed.locator('.enter-world-button').waitFor()
    ok('Video failure keeps matching poster and direct access',await failed.locator('.room-photo').evaluate(e=>getComputedStyle(e).backgroundImage.includes('start-poster.webp')) && await failed.locator('.journey-direct').isVisible())
    await failed.locator('.enter-world-button').click()
    await failed.locator('.natural-world').waitFor({ timeout:10000 })
    ok('Video failure recovers to content')

    const motion = await page()
    await motion.goto(origin)
    await motion.locator('.real-settings summary').click()
    await motion.getByRole('button',{name:'Motion ON'}).click()
    ok('Motion OFF pauses idle',await motion.locator('.start-video').evaluate(v=>v.paused))
    await motion.getByRole('button',{name:'Motion OFF'}).click()
    await motion.waitForFunction(()=>!document.querySelector('.start-video').paused)
    ok('Motion ON resumes idle')
    await motion.keyboard.press('Escape')
    await motion.locator('.enter-world-button').click()
    ok('Hidden intro controls become inert',await motion.locator('.start-copy').evaluate(e=>e.inert))
    await motion.emulateMedia({reducedMotion:'reduce'})
    await motion.locator('.natural-world').waitFor()
    ok('Enabling reduced motion during playback recovers immediately')
    ok('No runtime errors',report.errors.length===0)
  } finally {
    await fs.mkdir('output/real-world-video-order',{recursive:true})
    await fs.writeFile('output/real-world-video-order/regression-qa.json',JSON.stringify(report,null,2))
    await browser.close()
  }
  console.log(JSON.stringify({ passed:report.checks.length, layouts:report.layouts.length, errors:report.errors }))
}
run().catch(e=>{console.error(e);process.exitCode=1})
