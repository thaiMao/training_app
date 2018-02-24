import express from 'express'
import { getAll, getOne, createOne, findByParam } from './user.controller'

const usersRouter = express.Router()

usersRouter.param('id', findByParam)

usersRouter
  .route('/')
  .get(getAll)
  .post(createOne)

usersRouter
  .route('/:id')
  .get(getOne)
  .delete(createOne)

export default usersRouter
