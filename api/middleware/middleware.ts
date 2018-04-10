import bodyParser from 'body-parser'
import cors from 'cors'
import utils from 'utils'

const origin = utils.getUrl(utils.isProd())
const corsOptions = utils.getCorsOptions(origin)

function setupMiddleware(app: any) {
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}

export default setupMiddleware
