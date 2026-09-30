const fs = require('node:fs/promises')
const assert = require('node:assert/strict')
const { chromium } = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true})
 try {
 const p=await browser.newPage({viewport:{width:736,height:480}})
 await p.setContent(await fs.readFile('C:/Users/wnsdu/.codex/visualizations/2026/09/30/01a0f29f-0af9-7b82-8222-42f97ca8e04c/about-journal-options.html','utf8'))
 await p.evaluate(()=>document.fonts.ready)
 for(const width of [736,360]){
 await p.setViewportSize({width,height:480})
 for(let i=0;i<3;i++){
 await p.locator('[data-variant]').evaluateAll((nodes,idx)=>nodes.forEach((n,j)=>n.hidden=j!==idx),i)
 const section=p.locator('[data-variant]').nth(i)
 await section.getByRole('button').first().click()
 assert.match(await section.locator('output').textContent(),/프로필/)
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
 await p.screenshot({path:'output/about-studio-qa/journal-'+i+'-'+width+'.png'})
 }
 }
 await p.goto('http://127.0.0.1:5175/about')
 const sparks=p.locator('.studio-item-glint')
 const before=await sparks.evaluateAll(ns=>ns.map(n=>getComputedStyle(n).transform))
 await p.waitForTimeout(700)
 const after=await sparks.evaluateAll(ns=>ns.map(n=>getComputedStyle(n).transform))
 assert.ok(after.every((v,i)=>v!==before[i]))
 await p.emulateMedia({reducedMotion:'reduce'})
 assert.ok((await sparks.evaluateAll(ns=>ns.map(n=>getComputedStyle(n).animationName))).every(v=>v==='none'))
 console.log('PASS: three interactive designs at 736/360px; five idle sparkles animate and stop with reduced motion')
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1})
