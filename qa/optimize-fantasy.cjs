const sharp = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const names = ['about','skills','projects','qa','contact','foreground-tree','fern-groundcover']
;(async()=>{for(const name of names){
 const source=`public/assets/source/world-layers/${name}-fantasy-v3.png`
 const metadata=await sharp(source).metadata()
 if(!metadata.hasAlpha)throw new Error(`${name}: missing transparency`)
 await sharp(source).resize({width:name==='foreground-tree'?1344:name==='fern-groundcover'?1000:1600,withoutEnlargement:true}).webp({quality:96,alphaQuality:100}).toFile(`public/assets/production/images/world-layers/${name}-fantasy-v3.webp`)
 console.log(name,metadata.width,metadata.height,'alpha',metadata.hasAlpha)
}})().catch(e=>{console.error(e);process.exitCode=1})
