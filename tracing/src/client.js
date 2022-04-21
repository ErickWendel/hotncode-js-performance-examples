import {
  PassThrough,
  Writable
} from 'stream'
import {
  setTimeout
} from 'timers/promises'
import http from 'http'

const API_01 = 'http://localhost:8000'

function get(url, target) {
  http.get(url, res => res.pipe(target))
}

for (let i = 0; i < 100; i++) {
  const stream = PassThrough()
  get(API_01, stream)

  stream
    .pipe(
      Writable({
        write(chunk, enc, cb) {
          console.log(chunk.toString())
          cb()
        }
      })
    )

  await setTimeout(1000)
}