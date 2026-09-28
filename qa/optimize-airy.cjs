const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
;(async()=>{for(const name of ['about','foreground-tree','meadow']){
const input=`public/assets/source/world-layers/${name}-airy-v4.png`
const m=await sharp(input).metadata();if(!m.hasAlpha)throw new Error('No alpha '+name)
await sharp(input).resize({width:name==='about'?1600:name==='meadow'?1000:1344,withoutEnlargement:true}).webp({quality:96,alphaQuality:100}).toFile(`public/assets/production/images/world-layers/${name}-airy-v4.webp`)
console.log(name,m.width,m.height)
}})().catch(e=>{console.error(e);process.exitCode=1})
