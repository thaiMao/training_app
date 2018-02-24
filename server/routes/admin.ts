import express from 'express'

const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
  res.json({ adminRouter: true })
})

export default adminRouter
