const { chromium } = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async () => {
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5174/output/header-directions/index.html');
 await page.evaluate(()=>document.fonts.ready);
 for(const id of ['a','b','c','d']) {
   await page.locator(`#${id} .stage`).screenshot({path:path.resolve(`output/header-directions/${id}-desktop.png`)});
   await page.locator(`#${id} [data-name="Skills"]`).click();
   if(await page.locator(`#${id} h3`).textContent()!=='Skills') throw Error('Selection failed');
   await page.locator(`#${id} [data-name="Contact"]`).click();
 }
 await page.locator('#background').click();
 await page.locator('#c .stage').screenshot({path:path.resolve('output/header-directions/c-day.png')});
 await page.locator('#background').click();
 await page.setViewportSize({width:430,height:932});
 for(const id of ['a','b','c','d']) await page.locator(`#${id} .stage`).screenshot({path:path.resolve(`output/header-directions/${id}-mobile.png`)});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 await page.locator('[data-view="c"]').click();
 await page.keyboard.press('Escape');
 if(await page.locator('body').evaluate(el=>el.classList.contains('focus'))) throw Error('Close failed');
 console.log(JSON.stringify({errors,overflow,selection:'4/4',viewports:['1440×1000','430×932'],fullscreen:'passed'}));
 await browser.close();
})();
