const fs = require('node:fs/promises')
const {chromium} = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true})
 try{
 const p=await b.newPage({viewport:{width:1440,height:810}})
 await p.addInitScript(()=>sessionStorage.setItem('world-guide-seen','true'))
 await p.goto('http://127.0.0.1:5174/world-map')
 await p.waitForSelector('.seasonal-world')
 await p.locator('.lw-island-art').evaluateAll(es=>Promise.all(es.map(e=>e.decode())))
 await p.evaluate(()=>document.fonts.ready)
 await p.waitForTimeout(500)
 await p.screenshot({path:'output/seasonal-world-qa/desktop-placement.png'})
 console.log(await p.locator('.lw-scene,.lw-island,.lw-label').evaluateAll(es=>es.map(e=>({c:e.className,rect:e.getBoundingClientRect().toJSON()}))))
 await p.setViewportSize({width:430,height:932})
 await p.waitForTimeout(700)
 await p.screenshot({path:'output/seasonal-world-qa/mobile-placement.png'})
 await p.getByRole('button',{name:'다음 섬 보기'}).click()
 await p.waitForTimeout(650)
 await p.screenshot({path:'output/seasonal-world-qa/mobile-skills.png'})
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1})

