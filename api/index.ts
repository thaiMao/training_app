import config from 'config'
import { createServer } from 'http'
import app from './server'

const server = createServer(app)
let currentApp = app

server.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`)
})

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
