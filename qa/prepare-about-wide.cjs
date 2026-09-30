const fs = require('node:fs/promises')
const sharp = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')

;(async () => {
  const input = 'C:/Users/wnsdu/.codex/generated_images/01a0f29f-0af9-7b82-8222-42f97ca8e04c/exec-07807db3-73e1-4386-8f7f-e99545e4e26f.png'
  const source = 'public/assets/source/about-studio/terrace-workroom-v2.png'
  const output = 'public/assets/production/images/about-studio/terrace-workroom-v2.webp'
  await fs.copyFile(input, source)
  await sharp(input).webp({ quality: 88 }).toFile(output)
  console.log(JSON.stringify({ source, output, metadata: await sharp(output).metadata(), bytes: (await fs.stat(output)).size }))
})().catch(error => { console.error(error); process.exitCode = 1 })
