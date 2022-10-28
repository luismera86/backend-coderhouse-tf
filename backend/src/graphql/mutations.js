import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const registerUser = {
  type: GraphQLString,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLInt) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args) => {
    try {
      const newUser = new User(args)
      await newUser.save()
      return 'Usuario creado correctamente'
    } catch (error) {
      return error
    }
  },
}

export const login = {
  type: GraphQLString,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email }).select('+password')

    if (!user) throw new Error('Invalid Username')

    const validPassword = await bcrypt.comparePassword(password, user.password)

    if (!validPassword) throw new Error('Invalid Password')
  },
}
