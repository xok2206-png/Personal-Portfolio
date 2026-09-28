const assert=require('node:assert/strict')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true})
 try{
  const p=await b.newPage({viewport:{width:1440,height:810}})
  const fresh=async()=>{await p.goto('http://127.0.0.1:5174/world-map');await p.evaluate(()=>sessionStorage.removeItem('world-guide-seen'));await p.reload();await p.locator('.world-intro-guide').waitFor()}
  await fresh();await p.screenshot({path:'docs/layered-world/control-intro-desktop.png'})
  assert.match(await p.locator('.world-intro-guide').innerText(),/W A S D/)
  await p.locator('.world-intro-guide').waitFor({state:'detached',timeout:4000});await p.locator('.world-control-guide').waitFor()
  await p.reload();assert.equal(await p.locator('.world-intro-guide').count(),0);await p.locator('.world-control-guide').waitFor()
  await fresh();await p.keyboard.down('d');await p.locator('.world-control-guide').waitFor();assert.equal(await p.locator('.control-move.is-active').count(),1);await p.keyboard.up('d')
  await fresh();const r=await p.locator('.lw-about .lw-label').boundingBox();await p.mouse.move(r.x+r.width/2,r.y+r.height/2);await p.locator('.world-control-guide').waitFor();assert.equal(await p.locator('.control-select.is-active').count(),1)
  await p.mouse.move(0,0);await fresh();await p.locator('.lw-top-nav a').first().click();await p.locator('.world-control-guide').waitFor()
  await p.locator('.world-control-guide').focus();assert.equal(await p.locator('.world-control-guide').evaluate(e=>document.activeElement===e),true)
  for(const [w,h] of [[1440,810],[1024,768],[1280,600],[390,844],[360,800]]){await p.setViewportSize({width:w,height:h});assert.equal(await p.locator('.world-control-guide').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight}),true)}
  await p.screenshot({path:'docs/layered-world/control-compact-mobile.png'})
  const t=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'})
  await t.goto('http://127.0.0.1:5174/world-map');await t.locator('.world-intro-guide').waitFor();assert.equal(await t.locator('.world-intro-guide .controls-desktop').isVisible(),false)
  assert.equal(await t.locator('.world-intro-guide').evaluate(e=>getComputedStyle(e).animationName),'none')
  await t.locator('.lw-about .lw-label').tap();await t.locator('.world-control-guide').waitFor();assert.match(t.url(),/world-map/)
  await t.locator('.lw-about .lw-label').tap();await t.waitForURL('**/about');await t.goBack();await t.locator('.world-control-guide').waitFor();assert.equal(await t.locator('.world-intro-guide').count(),0)
  console.log('PASS: timer, session revisit, WASD feedback, hover dismissal, navigation dismissal, keyboard focus, five viewport bounds, touch copy/two-tap entry, reduced motion, Back')
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1})
