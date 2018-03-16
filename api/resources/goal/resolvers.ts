import { Goal } from './model'

function getGoal(_: any, { id }: any) {
  return Goal.findById(id).exec()
}

function createGoal(_: any, { input }: any) {
  return Goal.create(input)
}

const goalResolvers = {
  Query: {
    getGoal
  },
  Mutation: {
    createGoal
  }
}

export default goalResolvers
