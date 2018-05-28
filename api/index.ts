import config from './config'
import ApiServer from './server'

async function setupApiServer(apiServer: any) {
  await apiServer.start()
  debugger
  apiServer.listen()
}

const apiServer = new ApiServer()

setupApiServer(apiServer)
const app = apiServer.app
let currentApp = app

if (module.hot) {
  module.hot.accept(['./server'], () => {
    apiServer.httpsServer.removeListener('request', currentApp)
    apiServer.httpsServer.on('request', app)
    currentApp = app
  })
}
