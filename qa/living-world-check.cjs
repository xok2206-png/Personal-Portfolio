const fs=require('node:fs/promises')
const {chromium}=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
;(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
const p=await b.newPage({viewport:{width:1440,height:810}});await p.goto('http://127.0.0.1:5174/world-map');await p.locator('.lw-flock').first().waitFor()
const selectors=['.lw-cloud-mid','.haze-a','.lw-flock','.lw-leaf-flight','.lw-tree-canopy']
const snapshot=()=>p.evaluate(selectors=>selectors.map(s=>getComputedStyle(document.querySelector(s)).transform),selectors)
const first=await snapshot();await p.waitForTimeout(1600);const second=await snapshot()
const moved=first.map((v,i)=>({selector:selectors[i],moved:v!==second[i]}))
const visible=await p.locator('.lw-leaf-flight,.lw-bird').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.right>0&&r.x<innerWidth&&r.bottom>0&&r.y<innerHeight&&parseFloat(getComputedStyle(e).opacity)>.1}).length)
await p.getByRole('button',{name:'세계 움직임 일시정지'}).click();const paused=await p.locator('.lw-cloud,.lw-flock,.bird-wing,.lw-leaf-flight,.lw-tree-canopy,.lw-haze-ribbon').evaluateAll(es=>es.every(e=>getComputedStyle(e).animationPlayState==='paused'))
await p.emulateMedia({reducedMotion:'reduce'});const reduced=await p.locator('.lw-birdlife').evaluate(e=>getComputedStyle(e).display==='none')
const report={moved,visible,paused,reduced};console.log(report);await fs.writeFile('docs/layered-world/living-world-report.json',JSON.stringify(report,null,2))
if(moved.some(r=>!r.moved)||visible<2||!paused||!reduced)throw new Error('Ambient regression')
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1})
