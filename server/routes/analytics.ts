import express from 'express'

const analyticsRouter = express.Router()

analyticsRouter.get('/', (req, res) => {
  res.json({ analyticsRouter: true })
})

export default analyticsRouter
