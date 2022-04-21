import http from 'http'
import {
    Readable
} from 'stream'

const handler = (apiName) => async function (request, response) {
    let count = 0;
    const readable = Readable({
        read() {
            this.push(JSON.stringify({
                id: Date.now() + count,
                name: `Erick-${count}`,
                apiName
            }) + "\n")

            console.log('clean up hapened', new Date().toISOString())
            this.push(null)
        }
    })


    readable.pipe(response)
}

http.createServer(handler('api01')).listen(6000, () => console.log('server running at 6000'))
http.createServer(handler('api02')).listen(7000, () => console.log('server running at 7000'))

setTimeout(() => process.exit(1), 6000);