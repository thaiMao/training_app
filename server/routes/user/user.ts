import express from 'express'
import controllers from './user.controller'

const usersRouter = express.Router()

usersRouter.param('id', controllers.findByParam)

usersRouter
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne)

usersRouter
  .route('/:id')
  .get(controllers.getOne)
  .delete(controllers.createOne)

export default usersRouter
