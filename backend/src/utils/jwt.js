/* eslint-disable prefer-promise-reject-errors */

import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import logger from './logger.js'

const { SECRET_KEY } = config

export const generateJwt = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          logger.info('error', err)
          reject('No se pudo generar el token')
        } else {
          resolve(token)
        }
      }
    )
  })
}
