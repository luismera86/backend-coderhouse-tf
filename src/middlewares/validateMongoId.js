import { isValidObjectId } from 'mongoose'
import logger from '../services/logger.js'

export const validateMongoId = (req, res, nex) => {
  try {
    const { id } = req.params
    const isMongoId = isValidObjectId(id)
    if (!isMongoId) {
      return res.status(400).json({ msg: 'No es un id válido' })
    }

    nex()
  } catch (error) {
    logger.info('error', error)
    res.status(500).json({ msg: error })
  }
}
