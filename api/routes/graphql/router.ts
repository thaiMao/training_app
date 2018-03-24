import {
  advertiserTypes,
  advertiserResolvers,
  exerciseTypes,
  exerciseResolvers,
  userTypes,
  userResolvers
} from 'resources'
import { graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { mergeDeep } from 'immutable'

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userTypes, exerciseTypes, advertiserTypes],
  resolvers: mergeDeep(userResolvers, exerciseResolvers, advertiserResolvers)
})

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}))
