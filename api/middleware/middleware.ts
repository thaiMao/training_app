import bodyParser from 'body-parser'

function setupMiddleware(app: any) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}

export default setupMiddleware
