import { createServer } from 'http'
import app from './server'

const server = createServer(app)
let currentApp = app
const PORT = 3000

server.listen(PORT, () => {
  // console.log(`Listening on PORT ${PORT}`)
})

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
