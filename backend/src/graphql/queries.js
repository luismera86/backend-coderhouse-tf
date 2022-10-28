import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql'

import User from '../models/userModel.js'

export const users = {
  type: new GraphQLList(User),
  description: 'Retrieves a list of users',
  resolve: () => User.find(),
}

export const user = {
  type: User,
  description: 'retrieves a single user',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => User.findById(id),
}
