const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
;(async()=>{for(const name of ['about','skills','projects','qa','contact','lookout','foreground-tree']){
const input=`public/assets/source/world-layers/${name}-reference-v6.png`
const meta=await sharp(input).metadata();if(!meta.hasAlpha)throw new Error(`Missing alpha: ${name}`)
await sharp(input).resize({width:name==='foreground-tree'?1344:name==='lookout'?1800:1600,withoutEnlargement:true}).webp({quality:96,alphaQuality:100}).toFile(`public/assets/production/images/world-layers/${name}-reference-v6.webp`)
console.log(name,meta.width,meta.height)
}})().catch(e=>{console.error(e);process.exitCode=1})
