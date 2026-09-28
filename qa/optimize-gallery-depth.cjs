const sharp=require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
;(async()=>{for(const name of ['hall-depth','walk']){const p='public/assets/production/images/project-gallery/';console.log(name,await sharp(p+name+'-source.png').metadata());await sharp(p+name+'-source.png').webp({quality:95,alphaQuality:100}).toFile(p+name+'.webp')}})()
