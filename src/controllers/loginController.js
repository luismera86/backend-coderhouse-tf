import { request, response } from 'express'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateJwt } from '../services/jwt.js'
import logger from '../services/logger.js'

export const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'El e-mail no existe' })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ msg: 'El password no es válido' })
    }

    const token = await generateJwt(user.id)

    res.json({ user, token })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
