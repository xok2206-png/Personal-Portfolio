const fs = require('node:fs/promises')
const { chromium } = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async () => {
  await fs.mkdir('output/about-studio-qa', { recursive: true })
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
    await page.goto('http://127.0.0.1:5175/about')
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'output/about-studio-qa/' + (process.argv[2] || 'preview') + '.png' })
    if (process.argv[2] === 'final') {
      await page.locator('.studio-object-profile').click()
      await page.waitForTimeout(800)
      await page.screenshot({ path: 'output/about-studio-qa/final-profile.png' })
      console.log(JSON.stringify(await page.evaluate(() => ({
        backdrop: getComputedStyle(document.querySelector('.studio-hud'), '::backdrop').backdropFilter,
        heading: document.querySelector('.studio-heading') === null,
        itemLight: getComputedStyle(document.querySelector('.studio-item-lights')).visibility,
        bodyFontSize: getComputedStyle(document.querySelector('.studio-hud-body > p:not(.studio-lead)')).fontSize,
      }))))
    }
    console.log(await page.locator('main').innerText())
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
