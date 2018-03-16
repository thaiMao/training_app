import { Exercise } from './model'
import { DocumentQuery } from 'mongoose'

const getExercise = async (_: any, { id }: { id: number }, context: any) => {
  const exercise = await Exercise.findById(id).exec()

  if (!exercise) {
    throw new Error('No exercise id found')
  } else {
    return exercise
  }
}

const getAllExercises = () => {
  return Exercise.find({}).exec()
}

const createExercise = (_: any, { input }: any, context: any) => {
  return Exercise.create(input)
}

const updateExercise = (_: any, { input }: any, context: any) => {
  const { id, ...update } = input
  return Exercise.findByIdAndUpdate(id, update, { new: true }).exec()
}

const removeExercise = (_: any, { id }: any, context: any) => {
  return Exercise.findByIdAndRemove(id).exec()
}

const exerciseResolvers = {
  Query: {
    getExercise,
    getAllExercises
  },
  Mutation: {
    createExercise,
    updateExercise,
    removeExercise
  },
  Exercise: {
    async users(exercise: any) {
      const populated = await exercise.populate('users').execPopulate()
      return populated.users
    }
  }
}

export default exerciseResolvers
