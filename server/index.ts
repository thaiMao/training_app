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

Loadable.preloadAll().then(() => {
  https.createServer(options, app).listen(8443)
})
