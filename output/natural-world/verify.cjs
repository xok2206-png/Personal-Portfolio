/* global process, console, document, innerWidth, getComputedStyle, URL, localStorage */
const fs = require('fs');
const assert = require('node:assert/strict');
const { chromium } = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.QA_BASE || 'http://127.0.0.1:5174';
const out = 'output/natural-world';
const report = {base, started:new Date().toISOString(), viewport:[], behavior:[], errors:[]};
const sizes = [[2560,1440],[1920,1080],[1440,810],[1366,768],[1180,820],[1024,768],[768,1024],[430,932],[402,874],[390,844],[360,800],[767,900],[768,900],[1023,820],[1024,820],[1279,810],[1280,810],[1919,1080],[1920,1080]];
const routes = ['world-map','about','skills','projects','contact'];
async function check(name, fn) {try {await fn();report.behavior.push({name,passed:true});console.log('PASS',name);}catch(e){report.behavior.push({name,passed:false,error:e.message});console.log('FAIL',name,e.message);}}
(async()=>{
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:810}});
 page.on('pageerror',e=>report.errors.push(e.message));
 // Test actual responsive routes and their visible headings at each required size.
 for(const [width,height] of sizes) {
  await page.setViewportSize({width,height});
  for(const route of routes) {
   await page.goto(base+'/'+route); await page.locator('#main h1').first().waitFor(); await page.waitForTimeout(100);
   const data=await page.evaluate(()=>{
    const h=document.querySelector('#main h1'), header=document.querySelector('.page-header'), r=h.getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth+1,headingVisible:r.left>=-1&&r.right<=innerWidth+1&&r.top>=header.getBoundingClientRect().bottom-1,heading:{x:r.x,y:r.y,w:r.width,h:r.height},font:getComputedStyle(h).fontFamily,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&!i.hidden).map(i=>i.src)};
   });
   report.viewport.push({width,height,route,...data});
   if((width===1440&&height===810)||(width===430&&height===932))await page.screenshot({path:out+'/final-'+width+'-'+route+'.png'});
  }
  console.log('VIEWPORT',width,height);
 }
 await page.setViewportSize({width:1440,height:810});
 await check('Centered navigation and live fonts',async()=>{
  await page.goto(base+'/about');await page.evaluate(()=>document.fonts.ready);
  const data=await page.evaluate(()=>{const r=document.querySelector('.page-primary-nav').getBoundingClientRect();return {delta:Math.abs(r.x+r.width/2-innerWidth/2),suit:document.fonts.check('16px SUIT'),heading:getComputedStyle(document.querySelector('h1')).fontFamily};});
  assert(data.delta<1);assert(data.suit);assert(data.heading.includes('SUIT'));
 });
 await check('Hover previews and last destination wins',async()=>{
  await page.goto(base+'/world-map');const nav=page.getByRole('navigation',{name:'주요 메뉴',exact:true});
  await nav.getByRole('link',{name:'Skills',exact:true}).hover();assert.equal(await page.locator('.natural-world').getAttribute('data-focus'),'skills');
  await nav.getByRole('link',{name:'About',exact:true}).click();await nav.getByRole('link',{name:'Contact',exact:true}).click();
  await page.waitForTimeout(1150);assert(new URL(page.url()).pathname==='/contact');assert.equal(await page.locator('.voyage-transition').count(),0);
  await nav.getByRole('link',{name:'Projects',exact:true}).hover();await page.locator('.page-destination-preview').waitFor({state:'visible'});
 });
 await check('Escape finishes travel without duplicate history',async()=>{
  await page.goto(base+'/about');await page.getByRole('navigation',{name:'주요 메뉴',exact:true}).getByRole('link',{name:'Skills',exact:true}).click();
  await page.waitForTimeout(330);await page.keyboard.press('Escape');await page.goBack();assert.equal(new URL(page.url()).pathname,'/about');
 });
 await check('About tabs support keyboard and all content',async()=>{
  await page.goto(base+'/about');await page.getByRole('button',{name:'프로필 살펴보기 ↗',exact:true}).click();await page.getByRole('tab',{name:'프로필',exact:true}).focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab',{name:'여정',exact:true}).getAttribute('aria-selected'),'true');
  await page.getByRole('tab',{name:'관심사',exact:true}).click();assert(await page.getByText('Interactive Web',{exact:true}).isVisible());
 });
 await check('Skills explanation, proof links and focus recovery',async()=>{
  await page.goto(base+'/skills');await page.getByRole('button',{name:'React · Frontend',exact:true}).click();
  await page.getByRole('button',{name:'사용 프로젝트',exact:true}).click();
  assert(await page.locator('.skill-related a[href="/projects/jaduya"]').isVisible());
  await page.locator('#skill-detail-title').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.locator('.skill-detail').count(),1);
  await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await page.locator('.skill-detail').count(),0);assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'React · Frontend');
 });
 await check('Bounded movement still responds on World, Skills, Projects',async()=>{
  for(const [route,selector] of [['world-map','.lw-explorer'],['skills','.skill-walker'],['projects','.gallery-walker']]){
   await page.goto(base+'/'+route);await page.waitForTimeout(250);await page.locator('#main').first().focus();
   const before=await page.locator(selector).getAttribute('data-x');await page.keyboard.down('d');await page.waitForTimeout(250);await page.keyboard.up('d');
   const after=await page.locator(selector).getAttribute('data-x');assert.notEqual(after,before,route);
  }
 });
 await check('Project cases and direct reload preserve facts',async()=>{
  for(const id of ['jaduya','masillo','animal24','sulwhasoo']){
   await page.goto(base+'/projects/'+id);assert(await page.getByRole('heading',{name:'Limitation',exact:true}).isVisible());
   await page.reload();assert.equal(await page.locator('.project_detail h1').count(),1);
  }
 });
 await check('Atlas, Q&A and Email dialogs open and recover focus',async()=>{
  await page.goto(base+'/contact');await page.getByRole('button',{name:'탐험 지도 열기',exact:true}).click();
  assert.equal(await page.locator('.atlas-chart a').count(),4);await page.keyboard.press('Escape');assert.equal(await page.locator('.world-atlas').count(),0);
  await page.locator('.contact-choices a[href="/contact#qa"]').click();await page.locator('.contact-dialog').waitFor({state:'visible'});assert.equal(await page.locator('.contact-dialog details').count(),6);await page.keyboard.press('Escape');assert.equal(new URL(page.url()).hash,'');
  await page.locator('.contact-choices a[href="/contact#email"]').click();await page.locator('.contact-email').waitFor({state:'visible'});assert.equal(await page.locator('.contact-email input[required]').count(),3);await page.keyboard.press('Escape');
 });
 await check('Ambient layers move in every main page and pause persists',async()=>{
  for(const [route,sel] of [['world-map','.lw-cloud-far'],['about','.living-cloud-one'],['skills','.living-cloud-one'],['projects','.gallery-window-clouds img'],['contact','.sunset-cloud']]){
   await page.goto(base+'/'+route);await page.waitForTimeout(250);
   const a=await page.locator(sel).first().evaluate(el=>el.getAnimations()[0]?.currentTime);await page.waitForTimeout(250);const b=await page.locator(sel).first().evaluate(el=>el.getAnimations()[0]?.currentTime);assert(b>a+100,route);
  }
  await page.getByRole('button',{name:'설정',exact:true}).click();await page.getByRole('button',{name:/배경 움직임/}).click();await page.getByRole('button',{name:'닫기',exact:true}).click();
  await page.reload();assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');
  const running=await page.locator('.sunset-cloud').first().evaluate(el=>el.getAnimations().some(a=>a.playState==='running'));assert.equal(running,false);
  await page.evaluate(()=>localStorage.removeItem('world-motion-paused'));await page.reload();
 });
 await check('System reduced motion allows immediate navigation',async()=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/world-map');await page.getByRole('navigation',{name:'주요 메뉴',exact:true}).getByRole('link',{name:'About',exact:true}).click();
  await page.waitForURL('**/about');assert.equal(await page.locator('.voyage-transition').count(),0);assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');await page.emulateMedia({reducedMotion:'no-preference'});
 });
 await check('Missing artwork never blocks navigation or case study',async()=>{
  await page.route('**/assets/production/images/**',route=>route.abort());await page.goto(base+'/world-map');await page.getByRole('navigation',{name:'주요 메뉴',exact:true}).getByRole('link',{name:'Projects',exact:true}).click();await page.waitForURL('**/projects');await page.waitForTimeout(1050);await page.locator('.exhibit-direct').first().click();await page.waitForURL('**/projects/jaduya');assert(await page.getByRole('heading',{name:'Limitation',exact:true}).isVisible());await page.unroute('**/assets/production/images/**');
 });
 const mobile=await browser.newPage({viewport:{width:430,height:932},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>report.errors.push(e.message));
 await check('Touch menu, island pager, project content parity',async()=>{
  await mobile.goto(base+'/world-map');await mobile.getByRole('button',{name:'다음 섬 보기',exact:true}).tap();await mobile.waitForTimeout(500);assert((await mobile.locator('.world-mobile-pager').innerText()).includes('02'));
  await mobile.getByRole('button',{name:'메뉴',exact:true}).tap();await mobile.getByRole('navigation',{name:'모바일 주요 메뉴',exact:true}).getByRole('link',{name:'Projects',exact:true}).tap();await mobile.waitForURL('**/projects');await mobile.locator('.gallery-project-index a').first().waitFor();assert.equal(await mobile.locator('.gallery-project-index a').count(),4);await mobile.locator('.gallery-project-index a').last().tap();await mobile.waitForURL('**/projects/sulwhasoo');
 });
 await check('200% equivalent CSS viewport reflow (native browser zoom not tested)',async()=>{
  await page.setViewportSize({width:1440,height:810});await page.goto(base+'/about');await page.getByRole('button',{name:'프로필 살펴보기 ↗',exact:true}).click();await page.evaluate(()=>{document.documentElement.style.zoom='2'});await page.waitForTimeout(150);
  const dims=await page.evaluate(()=>({w:document.documentElement.scrollWidth,viewport:innerWidth,content:document.querySelector('.archive-panel').getBoundingClientRect().right}));report.zoom=dims;
  // CSS zoom is not a real browser zoom: also test the equivalent CSS viewport independently.
  await page.evaluate(()=>{document.documentElement.style.zoom='1'});await page.setViewportSize({width:720,height:405});await page.goto(base+'/about');assert(await page.getByRole('button',{name:'메뉴',exact:true}).isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:out+'/zoom-equivalent-about.png'});
 });
 await browser.close();report.finished=new Date().toISOString();report.summary={samples:report.viewport.length,overflow:report.viewport.filter(x=>x.overflow).length,headingFailures:report.viewport.filter(x=>!x.headingVisible),broken:report.viewport.filter(x=>x.broken.length),behaviorFailed:report.behavior.filter(x=>!x.passed)};fs.writeFileSync(out+'/qa-report.json',JSON.stringify(report,null,2));console.log('SUMMARY',JSON.stringify(report.summary));if(report.errors.length||report.summary.overflow||report.summary.headingFailures.length||report.summary.behaviorFailed.length)process.exitCode=1;
})().catch(e=>{report.errors.push(e.stack);fs.writeFileSync(out+'/qa-report.json',JSON.stringify(report,null,2));console.error(e);process.exitCode=1;});
