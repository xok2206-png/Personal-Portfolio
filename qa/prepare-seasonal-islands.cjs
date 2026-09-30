const fs = require('node:fs/promises')
const sharp = require('C:/Users/EZEN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')

// Encode transparent cutouts without recoloring or removing the background.
;(async () => {
 const report = []
 for (const id of ['about', 'skills', 'projects', 'contact']) {
  const source = 'public/assets/source/seasonal-world/' + id + '-island-v1.png'
  const output = 'public/assets/production/images/seasonal-world/' + id + '-island-v1.webp'
  const m = await sharp(source).metadata()
  if (!m.hasAlpha) throw new Error(id + ': alpha missing')
  await sharp(source).webp({quality:90, alphaQuality:100, effort:6}).toFile(output)
  if ((await sharp(output).stats()).isOpaque) throw new Error(id + ': opaque export')
  report.push({id,width:m.width,height:m.height,bytes:(await fs.stat(output)).size,alpha:true})
 }
 await fs.mkdir('output/seasonal-world-qa',{recursive:true})
 await fs.writeFile('output/seasonal-world-qa/assets.json',JSON.stringify(report,null,2))
 console.log(report)
})().catch(e=>{console.error(e);process.exitCode=1})

