const fs=require('node:fs/promises')
const assert=require('node:assert/strict')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true}),p=await b.newPage(),report={viewports:[]}
 try{
  await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-explorer').waitFor();await p.locator('.lw-scene img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await p.waitForTimeout(3100)
  for(const [w,h] of [[2560,1440],[1440,810],[1180,820],[1024,768],[768,1024],[430,932],[390,844],[360,800],[1280,600]]){
   await p.setViewportSize({width:w,height:h})
   const result={w,h,panels:[]}
   for(const name of ['compass','system']){
    await p.locator(`.lw-${name} summary`).click()
    const safe=await p.locator(`.lw-${name} [data-hud-panel]`).evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1})
    result.panels.push({name,safe});assert.ok(safe,`${w} ${name} panel must stay inside viewport`)
    await p.locator(`.lw-${name} summary`).focus();await p.keyboard.press('Escape')
   }
   result.player=await p.locator('.lw-explorer').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight})
   assert.ok(result.player,'player safe');report.viewports.push(result)
   if(w===1440||w===390)await p.screenshot({path:`docs/layered-world/world-hud-${w===1440?'desktop':'mobile'}.png`})
  }
  const fallback=await b.newPage({viewport:{width:430,height:932}})
  await fallback.route('**/assets/production/images/**',r=>r.abort())
  await fallback.goto('http://127.0.0.1:5174/world-map');await fallback.locator('.lw-compass summary').click();await fallback.locator('.lw-compass a[href="/contact"]').click();await fallback.waitForURL('**/contact');report.assetFailureDirectAccess=true
 }finally{await fs.writeFile('docs/layered-world/world-hud-layout-report.json',JSON.stringify(report,null,2));console.log(report);await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1})

