/* eslint-disable no-unused-vars */

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
export const sendEmailNewUser = async user => {
  const mailOptions = {
    from: 'Servidor',
    to: MAIL,
    subject: 'Nuevo Registro',
    text: `Se ha registrado un nuevo usuario: ${user.firstName} con el email: ${user.email}`,
  }
  try {
    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.info('error', error)
  }
}

export const sendMailNewOrder = async (order, idUser) => {
  const mailOptions = {
    from: 'Servidor',
    to: MAIL,
    subject: 'Nueva orden de compra',
    html: `Se genero una orden de pedido con el id ${order._id} del usuario con el id ${idUser}`,
  }
  try {
    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.info('error', error)
  }
}
