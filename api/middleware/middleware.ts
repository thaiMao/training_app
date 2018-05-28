import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import utils from 'utils'

const origin = utils.getUrl(utils.isProd())
const corsOptions = utils.getCorsOptions(origin)

function setupMiddleware(app: any) {
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  return app
}

export default setupMiddleware
