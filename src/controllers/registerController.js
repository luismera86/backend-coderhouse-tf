/* eslint-disable no-unused-vars */

import { request, response } from 'express'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import logger from '../services/logger.js'
import { sendEmailNewUser } from '../services/nodeMailer.js'

export const userRegister = async (req = request, res = response) => {
  try {
    const { firstName, lastName, email, phone, address, avatar, password, password2, role, age } = req.body

    const checkMail = await User.findOne({ email })
    if (checkMail) {
      return res.status(400).json({ msg: 'El correo ya se encuentra registrado' })
    }
    if (password !== password2) {
      return res.status(401).json({ msg: 'Los password no coinciden' })
    }
    const user = new User({ firstName, lastName, email, phone, address, avatar, password, role, age })
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    await user.save()

    sendEmailNewUser(user)

    res.status(200).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    logger.log('error', error)
    res.status(403).json({ message: 'Error adding user' })
  }
}
