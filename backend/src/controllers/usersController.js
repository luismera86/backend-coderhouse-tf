import User from '../models/userModel.js'
import logger from '../utils/logger.js'

export const getUser = async (req, res) => {
  try {
    const user = req.user
    res.json({ user })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.render('users', { users })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
