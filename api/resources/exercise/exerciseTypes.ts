const exerciseTypes = `
type Exercise {
  id: ID!
  name: String!
  muscle: String!
  users: [User]!
  createdAt: String!
  updatedAt: String!
}

input CreateExercise {
  name: String!
  muscle: String!
}

input UpdateExercise {
  name: String!
}

extend type Query {
  getExercise(id: ID!): Exercise!
  getAllExercises: [Exercise]!
}

extend type Mutation {
  createExercise(input: CreateExercise!): Exercise!
  updateExercise(input: UpdateExercise!): Exercise!
  removeExercise(id: ID!): Exercise!
}`

export default exerciseTypes
