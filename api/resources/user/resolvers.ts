import { User } from './model'
import { mergeDeep } from 'immutable'

const getUser = async (_: any, __: any, { user }: any) => {
  if (!user) {
    throw new Error(`Cannot found user with id`)
  } else {
    return user
  }
}

const getAllUsers = () => {
  return User.find({}).exec()
}

const createUser = (_: any, { input }: any) => {
  return User.create(input)
}

const updateUser = (_: any, { input }: any, { user }: any) => {
  const updatedUser = mergeDeep(user, input)
  return updatedUser.save()
}

const removeUser = (_: any, { id }: any) => {
  return User.findByIdAndRemove(id).exec()
}

const userResolvers = {
  Query: {
    getUser,
    getAllUsers
  },
  Mutation: {
    createUser,
    updateUser,
    removeUser
  }
}

export default userResolvers
