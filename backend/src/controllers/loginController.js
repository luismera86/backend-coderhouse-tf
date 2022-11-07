import { request, response } from 'express'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateJwt } from '../utils/jwt.js'
import logger from '../utils/logger.js'

export const failLoginRender = (req = request, res = response) => {
  try {
    res.sendStatus(401).json({ login: false })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

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

    res.json({ user, token }).redirect('/products')
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
