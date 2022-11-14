import { request, response } from 'express'

import User from '../models/userModel.js'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import logger from '../services/logger.js'

const { SECRET_KEY } = config

export const validateJwt = async (req = request, res = response, next) => {
  const token = req.header('set-token')
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' })
  }
  try {
    const { uid } = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ _id: uid })
    if (!user) {
      return res.status(401).json({ msg: 'Usuario no existe' })
    }
    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ error })
    logger.info('error', error)
  }
}
