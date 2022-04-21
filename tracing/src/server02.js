import {
  PassThrough,
} from 'stream'

import http from 'http'

const API_01 = 'http://localhost:6000'
const API_02 = 'http://localhost:7000'


function get(url, target) {
  http.get(url, res => res.pipe(target))
}


http.createServer((req, response) => {
  const stream = PassThrough()
  get(API_01, stream)
  get(API_02, stream)

  stream.pipe(response)

}).listen(8000, () => console.log('server02 running at 8000'))