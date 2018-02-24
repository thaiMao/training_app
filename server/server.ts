import express from 'express'
import * as routes from './routes'

const app = express()

app.use('/admin', routes.admin)
app.use('/analytics', routes.analytics)
app.use('/user', routes.user)

app.get('/', (req, res) => {
  res.json({ ok: true })
})

export default app
