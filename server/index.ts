/* eslint no-console:0 */
import https from 'https'
import fs from 'fs'
import path from 'path'
import Loadable from 'react-loadable'
import app from './server'

const options = {
  cert: fs.readFileSync(path.resolve(__dirname, 'private/cert.pem')),
  key: fs.readFileSync(path.resolve(__dirname, 'private/key.pem'))
}

const PORT = 8080

let httpsServer: any
let currentApp = app

Loadable.preloadAll().then(() => {
  httpsServer = https.createServer(options, app).listen(8443)
})

if (module.hot) {
  module.hot.accept([path.resolve(__dirname, 'server')], () => {
    httpsServer.removeListener('request', currentApp)
    httpsServer.on('request', app)
    currentApp = app
  })
}
