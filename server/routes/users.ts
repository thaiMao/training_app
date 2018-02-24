import express from 'express'

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.json({ usersRouter: true })
})

export default usersRouter
