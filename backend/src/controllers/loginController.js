import { request, response } from 'express'

import User from '../models/userModel.js'
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
    const user = await User.findOne({ email: req.body.username })
    req.session.user = user
    res.status(200).json({ login: true, user })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
