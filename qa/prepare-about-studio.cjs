const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('C:/Users/wnsdu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')

;(async () => {
  const input = 'C:/Users/wnsdu/.codex/generated_images/01a0f29f-0af9-7b82-8222-42f97ca8e04c/exec-d96dd282-55f7-4ef3-80b3-7999828929e9.png'
  const source = 'public/assets/source/about-studio/morning-workroom-v1.png'
  const output = 'public/assets/production/images/about-studio/morning-workroom-v1.webp'
  await fs.mkdir(path.dirname(source), { recursive: true })
  await fs.mkdir(path.dirname(output), { recursive: true })
  await fs.copyFile(input, source)
  await sharp(input).webp({ quality: 88 }).toFile(output)
  console.log(JSON.stringify({ source, output, metadata: await sharp(output).metadata(), bytes: (await fs.stat(output)).size }))
})().catch(error => { console.error(error); process.exitCode = 1 })
