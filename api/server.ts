import express from 'express'
import { setupMiddleware } from './middleware'
import { protect, errorHandler } from './modules'
import * as routes from './routes'

const app = express()

setupMiddleware(app)

app.use('/admin', protect, routes.admin)
app.use('/analytics', protect, routes.analytics)
app.use('/user', routes.user)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.json({ ok: true })
})

export default app
