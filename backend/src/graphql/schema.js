import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { login, registerUser } from './mutations.js'
import { user, users } from './queries.js'

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'This is the root query type',
  fields: {
    user,
    users,
  },
})

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'This is the root mutation type',
  fields: {
    login,
    registerUser,
  },
})

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
