import { request, response } from 'express'

import logger from '../utils/logger.js'

export const userRegister = async (req = request, res = response) => {
  try {
    res.status(200).redirect('/home')
  } catch (error) {
    logger.log('error', error)
    res.status(500).json({ message: 'Error adding user' })
  }
}

export const registerFail = (req = request, res = response) => {
  try {
    res.status(401).redirect('/register')
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
