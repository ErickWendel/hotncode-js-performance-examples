import fs from 'fs/promises'
import mpdParser from 'mpd-parser'

const dataOutput = './data.json'

async function prepare() {
  const manifests = './../test/manifests'

  const dir = await fs.readdir(manifests)

  const data = new Map()
  for (const file of dir) {
    if (!file.includes('.mpd')) continue;

    data.set(file, await fs.readFile(`${manifests}/${file}`, 'utf-8'))
  }

  return fs.writeFile(dataOutput, JSON.stringify(Array.from(data)))
}

const manifests = new Map(JSON.parse(await fs.readFile(dataOutput, 'utf-8')))
async function run() {
  const maxIterations = 100
  console.log(`running ${maxIterations * manifests.size} iterations`)
  for (let i = 0; i < maxIterations; i++) {
    for (const [fileName, content] of manifests) {
      mpdParser.parse(content, {
        manifestUri: fileName
      })
      // console.log(JSON.stringify(result, null, 2))
    }
  }
}


// await prepare()
await run()
