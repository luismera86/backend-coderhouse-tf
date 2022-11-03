import { request, response } from 'express'

import logger from '../utils/logger.js'

export const isAdminRole = (req = request, res = response, next) => {
  try {
    if (!req.user) {
      return res.status(500).json({ msg: 'Se quiere validar el role sin validar el token primero' })
    }
    const { role } = req.user
    if (role !== 'admin') {
      return res.status(401).json({ msg: 'No tiene permiso de Administrador' })
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
    logger.info('error', error)
  }
}
