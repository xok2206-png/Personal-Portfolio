const {chromium}=require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const assert=require('node:assert/strict'),fs=require('node:fs/promises')
;(async()=>{
const b=await chromium.launch({channel:'msedge',headless:true});const errors=[],checks=[]
await fs.mkdir('output/header-qa',{recursive:true})
try{
 const p=await b.newPage({viewport:{width:1440,height:810},reducedMotion:'reduce'})
 p.on('pageerror',e=>errors.push(e.message))
 for(const route of ['world-map','about','skills','projects','contact']){
  await p.goto('http://127.0.0.1:5174/'+route)
  for(const [width,height] of [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,900],[1024,900],[1279,900],[1280,900],[1919,1080],[1920,1080],[1280,600],[844,390],[720,405]]){
   await p.setViewportSize({width,height})
   for(const selector of ['.page-realworld','.page-settings',...(width<1024?['.page-menu-toggle']:[])]){
    const c=p.locator(selector),r=await c.boundingBox();assert.ok(r&&r.width>=44&&r.height>=44&&r.x>=0&&r.x+r.width<=width,route+selector+width)
    assert.equal((await c.textContent()).trim(),'');assert.ok(await c.getAttribute('aria-label'))
   }
   if(width>=1024){const n=await p.locator('.page-primary-nav').boundingBox(),l=await p.locator('.page-brand').boundingBox(),r=await p.locator('.page-header-tools').boundingBox();assert.ok(l.x+l.width<=n.x&&n.x+n.width<=r.x,'header overlap '+width)}
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false)
   if(width===1440||width===430)await p.screenshot({path:`output/header-qa/${route}-${width}.png`})
  }
 }
 await p.setViewportSize({width:1440,height:810})
 await p.getByRole('button',{name:'설정',exact:true}).focus()
 assert.equal(await p.locator('.page-settings').evaluate(el=>getComputedStyle(el,'::after').visibility),'visible')
 await p.keyboard.press('Enter');await p.getByRole('dialog',{name:'환경 설정'}).waitFor()
 await p.screenshot({path:'output/header-qa/settings.png'})
 await p.keyboard.press('Escape');await p.waitForFunction(()=>document.activeElement?.classList.contains('page-settings'))
 await p.setViewportSize({width:360,height:800});await p.getByRole('button',{name:'메뉴',exact:true}).click()
 await p.locator('.page-mobile-nav a[href="/about"]').click();await p.waitForURL('**/about')
 await p.getByRole('button',{name:'설정',exact:true}).click();await p.getByRole('dialog',{name:'환경 설정'}).waitFor()
 await p.getByRole('button',{name:'닫기',exact:true}).click()
 await p.getByRole('link',{name:'리얼월드로 돌아가기',exact:true}).click();await p.waitForURL('http://127.0.0.1:5174/')
 checks.push('5 pages × 22 viewports; 44px icon targets; desktop no overlap; focus tooltip; keyboard settings/Escape focus return; mobile settings/menu navigation; real-world return')
 assert.deepEqual(errors,[])
 await fs.writeFile('output/header-qa/report.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}))
}finally{await b.close()}
})().catch(e=>{console.error(e);process.exit(1)})

