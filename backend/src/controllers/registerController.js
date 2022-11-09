/* eslint-disable no-unused-vars */

import { request, response } from 'express'

import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import { createTransport } from 'nodemailer'
import logger from '../utils/logger.js'

const { MAIL, MAIL_PASSWORD } = config

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
})

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
    const info = await transporter.sendMail({
      to: user.email,
      from: 'info@tiendatuya.com',
      subject: 'Registro exitoso',
      html: `<h2>Bienvenido ${firstName} a TiendaTuya</h2>`,
    })
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
