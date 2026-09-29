const assert=require('node:assert/strict')
const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
;(async()=>{const b=await chromium.launch({channel:'msedge',headless:true}),report=[];try{
 const {data,info}=await sharp('public/assets/production/images/world-layers/lookout-golden-v11.webp').ensureAlpha().raw().toBuffer({resolveWithObject:true})
 const p=await b.newPage({viewport:{width:1440,height:810},reducedMotion:'reduce'});await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-explorer').waitFor()
 const foot=()=>p.evaluate(()=>{const scene=document.querySelector('.lw-scene'),art=document.querySelector('.lw-lookout'),person=document.querySelector('.lw-explorer');const x=Number(person.dataset.x)*scene.clientWidth/100,y=Number(person.dataset.y)*scene.clientHeight/100;return{x,y,u:(x-art.offsetLeft)/art.offsetWidth,v:(y-art.offsetTop)/art.offsetHeight,moving:person.dataset.moving}})
 for(const [w,h] of [[1440,810],[2560,1440],[1024,768],[430,932],[360,800],[2560,1080]]){
  await p.setViewportSize({width:w,height:h});await p.waitForTimeout(80)
  for(const key of ['ArrowUp','ArrowRight','ArrowDown','ArrowLeft']){
   for(let i=0;i<30;i++)await p.keyboard.press(key)
   const a=await foot();const alpha=data[(Math.floor(a.v*info.height)*info.width+Math.floor(a.u*info.width))*4+3];assert.ok(alpha>240,`foot over transparent sky: ${w} ${key} ${alpha}`)
   const before=await foot();await p.keyboard.press(key);const after=await foot();assert.ok(Math.abs(before.x-after.x)<.1&&Math.abs(before.y-after.y)<.1,'outward input stops at boundary')
   report.push({w,h,key,u:a.u,v:a.v,alpha})
   if(key==='ArrowRight'&&[1440,430].includes(w))await p.screenshot({path:`docs/layered-world/stair-boundary-${w}.png`})
  }
 }
 await p.setViewportSize({width:1440,height:810});await p.emulateMedia({reducedMotion:'no-preference'});await p.keyboard.down('ArrowRight');await p.waitForTimeout(2300);await p.keyboard.up('ArrowRight');assert.equal((await foot()).moving,'false')
 await p.locator('.lw-system summary').click();const start=await foot();await p.keyboard.press('ArrowLeft');assert.equal((await foot()).x,start.x);await p.keyboard.press('Escape');await p.emulateMedia({reducedMotion:'reduce'});await p.locator('.lw-top-nav a[href="/projects"]').click();await p.waitForURL('**/projects')
 console.log('PASS 24 boundary contacts on opaque stairs, resize, normal/reduced movement, System lock, direct route')
}finally{await fs.writeFile('docs/layered-world/stair-boundary-report.json',JSON.stringify(report,null,2));await b.close()}})().catch(e=>{console.error(e);process.exitCode=1})
