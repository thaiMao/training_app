import * as express from 'express'

const signinRouter = express.Router()

signinRouter.get('/', (req, res) => {
  res.json({ signinRouter: true })
})

export default signinRouter
