const sharp = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs = require('node:fs/promises')
;(async()=>{
 const report=[]
 for(const [input,name] of [['background-clean','background-native'],['background','distant-basin-native']]){
  const source=`public/assets/source/world-layers/${input}.png`,output=`public/assets/production/images/world-layers/${name}.webp`
  await sharp(source).webp({lossless:true,effort:6}).toFile(output)
  const a=await sharp(source).ensureAlpha().raw().toBuffer(),b=await sharp(output).ensureAlpha().raw().toBuffer(),m=await sharp(output).metadata()
  report.push({source,output,width:m.width,height:m.height,bytes:(await fs.stat(output)).size,pixelsIdentical:a.equals(b)})
 }
 await fs.writeFile('docs/layered-world/background-quality.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report))
 if(report.some(r=>!r.pixelsIdentical))process.exitCode=1
})().catch(e=>{console.error(e);process.exitCode=1})
