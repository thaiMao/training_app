import express from 'express'
// import setupMiddleware from './middleware'
// import { restRouter } from './api'
// import { connect } from './db'
// import { signin, protect } from './api/modules/auth'

const app = express()

app.get('/', (req, res) => {
  res.json({ ok: true })
})

export default app
