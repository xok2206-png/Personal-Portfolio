const fs=require('node:fs/promises')
const assert=require('node:assert/strict')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}),report={checks:[],errors:[]}
 const p=await browser.newPage({viewport:{width:1440,height:810}})
 p.on('pageerror',e=>report.errors.push(e.message))
 const check=(name,value)=>{assert.ok(value,name);report.checks.push(name)}
 const open=async()=>{await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-explorer').waitFor();await p.waitForTimeout(180)}
 const position=()=>p.locator('.lw-explorer').evaluate(e=>({x:+e.dataset.x,y:+e.dataset.y,heading:+e.dataset.heading,moving:e.dataset.moving}))
 const bodyFocus=()=>p.locator('h1').focus()
 try{
  await open();check('first visit guide visible',await p.locator('.lw-movement-guide').count()===1)
  await bodyFocus();const start=await position();await p.keyboard.down('d');await p.waitForTimeout(500);await p.keyboard.up('d');let now=await position()
  check('WASD moves character and compass',now.x>start.x+1&&now.heading===90)
  check('first input hides guide',await p.locator('.lw-movement-guide').count()===0)
  const compass=await p.locator('.compass-ring').evaluate(e=>getComputedStyle(e).transform);check('compass rotates with heading',compass!=='none'&&compass!=='matrix(1, 0, 0, 1, 0, 0)')
  await p.keyboard.down('ArrowRight');await p.waitForTimeout(1900);await p.keyboard.up('ArrowRight');await p.keyboard.down('ArrowUp');await p.waitForTimeout(950);await p.keyboard.up('ArrowUp');now=await position()
  check('movement bounded to lookout',now.x<=34&&now.y>=87.5&&now.moving==='false')
  check('entrance context action available',await p.locator('.lw-context-action.is-near').count()===1)
  await p.keyboard.press('e');await p.waitForTimeout(250);check('E starts entrance travel',await p.locator('.is-entering').count()===1)
  await p.keyboard.press('ArrowLeft');await p.waitForTimeout(1700);check('manual input cancels travel and deadline',p.url().endsWith('/world-map')&&await p.locator('.is-entering').count()===0)
  await p.locator('.lw-top-nav a[href="/about"]').click();await p.waitForTimeout(150);await p.locator('.lw-top-nav a[href="/skills"]').click();await p.waitForURL('**/skills');check('latest destination replaces travel',p.url().endsWith('/skills'))
  await p.goBack();await p.locator('.lw-explorer').waitFor();await p.waitForTimeout(200);check('guide stays dismissed on revisit',await p.locator('.lw-movement-guide').count()===0)
  await p.locator('.lw-compass summary').click();check('small compass map opens',await p.locator('.lw-mini-map').isVisible());await p.locator('.map-contact').click();await p.waitForURL('**/contact');check('compass map enters destination',p.url().endsWith('/contact'))
  await open();await p.locator('.lw-system summary').click();await p.getByRole('button',{name:'세계 움직임 일시정지'}).click();check('system motion pauses world',await p.locator('.layered-world').getAttribute('data-paused')==='true');await p.getByRole('button',{name:'소리 켜기'}).click();check('sound setting enabled',await p.getByRole('button',{name:'소리 끄기'}).getAttribute('aria-pressed')==='true')
  await p.reload();await p.locator('.lw-system summary').click();check('system settings persist',await p.getByRole('button',{name:'소리 끄기'}).count()===1&&await p.locator('.layered-world').getAttribute('data-paused')==='true')
  await p.locator('.lw-system summary').focus();await p.keyboard.press('Escape');check('system Escape returns focus',await p.locator('.lw-system').evaluate(e=>!e.open&&document.activeElement===e.querySelector('summary')))
  await bodyFocus();const beforeReduced=await position();await p.keyboard.press('ArrowLeft');check('paused movement is discrete and available',(await position()).x<beforeReduced.x)
  await p.emulateMedia({reducedMotion:'reduce'});await p.locator('.lw-system summary').click();check('OS reduced motion cannot be overridden',await p.getByRole('button',{name:'세계 움직임 재생'}).isDisabled());await p.locator('.lw-system summary').click();await p.locator('[data-island="projects"]').focus();check('keyboard focus reveals destination',await p.locator('[data-island="projects"]').getAttribute('class').then(c=>c.includes('is-selected')));await p.keyboard.press('Enter');await p.waitForURL('**/projects');check('reduced motion immediate route',p.url().endsWith('/projects'))
  const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true})
  const tapIsland=async()=>{const box=await touch.locator('[data-island="projects"] .lw-label').boundingBox();await touch.touchscreen.tap(box.x+box.width/2,box.y+box.height/2)}
  touch.on('pageerror',e=>report.errors.push(e.message));await touch.goto('http://127.0.0.1:5174/world-map');await touch.locator('[data-island="projects"] .lw-label').waitFor();await tapIsland();await touch.waitForTimeout(250)
  check('first touch selects without travel',touch.url().endsWith('/world-map')&&await touch.locator('.is-entering').count()===0&&await touch.locator('.lw-context-action').isVisible())
  await tapIsland();await touch.waitForURL('**/projects');check('second touch enters',touch.url().endsWith('/projects'))
  await touch.goBack();await touch.locator('.lw-compass summary').waitFor();await touch.waitForTimeout(180);check('Back clears in-flight scene state',await touch.locator('.is-entering').count()===0);await touch.locator('.lw-compass summary').tap();await touch.locator('.lw-compass summary').tap();check('compass toggles closed',await touch.locator('.lw-compass').evaluate(e=>!e.open))
  await touch.locator('.lw-compass summary').tap();await touch.locator('.lw-compass a[href="/resume"]').tap();await touch.waitForURL('**/resume');check('mobile compass direct resume',true)
  await p.emulateMedia({reducedMotion:'no-preference'});await p.evaluate(()=>localStorage.clear());await open();await p.waitForTimeout(3100);await p.screenshot({path:'docs/layered-world/world-hud-desktop.png'})
  await touch.goto('http://127.0.0.1:5174/world-map');await touch.locator('.lw-explorer').waitFor();await touch.locator('.lw-scene img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await touch.screenshot({path:'docs/layered-world/world-hud-mobile.png'})
  check('no runtime errors',report.errors.length===0)
 }finally{await fs.writeFile('docs/layered-world/world-hud-report.json',JSON.stringify(report,null,2));console.log(report);await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1})

