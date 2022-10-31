import { request, response } from 'express'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import logger from '../utils/logger.js'

export const userRegister = async (req = request, res = response) => {
  try {
    const { firstName, lastName, email, phone, address, avatar, password, role, age } = req.body
    console.log(req.body.user)

    const user = new User({ firstName, lastName, email, phone, address, avatar, password, role, age })
    const checkMail = await User.findOne({ email })
    if (checkMail) {
      return res.status(400).json({ msg: 'El correo ya se encuentra registrado' })
    }
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    await user.save()
    res.status(200).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    logger.log('error', error)
    res.status(403).json({ message: 'Error adding user' })
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
