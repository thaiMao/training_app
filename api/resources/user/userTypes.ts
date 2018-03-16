const userTypes = `
type User {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
}

input UpdatedUser {
  name: String!
}

input CreateUser {
  name: String!
}

type Query {
  getUser(id: ID!): User!
  getAllUsers: [User]!
}

type Mutation {
  createUser(input: CreateUser!): User!
  updateUser(input: UpdatedUser!): User!
  removeUser(id: ID!): User!
}
`

export default userTypes
