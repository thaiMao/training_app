import config from 'config'
import { connect } from 'db'
import express from 'express'
import { graphQLRouter } from 'routes/graphql'
import { graphiqlExpress } from 'apollo-server-express'
import { setupMiddleware } from './middleware'
import { protect, errorHandler } from './modules'
import * as routes from './routes'

const app = express()

setupMiddleware(app)
connect(config)
app.use('/signin', routes.signin)
app.use('/admin', protect, routes.admin)
app.use('/analytics', protect, routes.analytics)
app.use('/user', routes.user)
app.use('/graphql', graphQLRouter)
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.json({ ok: true })
})

export default app
