import { request, response } from 'express'

import Message from '../models/messagesModel.js'
import logger from '../utils/logger.js'

export const getMessagesUser = async (req = request, res = response) => {
  try {
    const { email } = req.params
    console.log(email)
    const userMessages = await Message.find({ email })
    if (!userMessages) {
      return res.status(401).json({ msg: 'No hay ningún mensaje de este usuario' })
    }

    res.status(200).json({ userMessages })
  } catch (error) {
    logger.info('error', error)
    res.status(500).json({ msg: error })
  }
}
