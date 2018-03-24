import { User } from './model'
import { mergeDeep } from 'immutable'

const getUser = async (_: any, { id }: any) => {
  const user = await User.findById(id).exec()

  if (!user) {
    throw new Error(`No user id ${id} found`)
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
  const { id } = user
  return User.findByIdAndUpdate(id, input, { new: true })
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
