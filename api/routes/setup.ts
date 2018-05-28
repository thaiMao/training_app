import { protect } from 'modules'
import { graphQLRouter } from 'routes/graphql'
import { graphiqlExpress } from 'apollo-server-express'
import * as routes from 'routes'
import createPushSubscriptionRoute from 'routes/push-subscription/controller'

export function setupRouters(app: any) {
  app.use('/signin', routes.signin)
  app.use('/admin', protect, routes.admin)
  app.use('/analytics', protect, routes.analytics)
  app.use('/user', routes.user)
  app.use('/graphql', graphQLRouter)
  app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))
  return app
}

export function setupRoutes(api: any) {
  api.app.get('/', (req: any, res: any) => {
    res.json({ ok: true })
  })

  api.app.post('/', function(req: any, res: any) {
    res.send('POST request to the homepage')
  })

  api.app.post('/push-subscription', createPushSubscriptionRoute(api))
  api.app.get('/push-subscription', (req: any, res: any) => {
    res.json({ isWorking: true })
  })
  api.app.post('/push-msg', (req: any, res: any): void => {
    api.notifications.push(req.body)
    res.json({ isWorking: true })
  })
  return api
}
