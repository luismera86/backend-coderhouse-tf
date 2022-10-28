import config from '../config/config.js'
import { createTransport } from 'nodemailer'
import logger from '../utils/logger.js'

const { MAIL, MAIL_PASSWORD } = config

export const sendEmailNewUser = async user => {
  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: MAIL,
      pass: MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'Servidor',
    to: MAIL,
    subject: 'Nuevo Registro',
    text: `Se ha registrado un nuevo usuario: ${user.firstName} con el email: ${user.email}`,
  }
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch (error) {
    console.log(error)
    logger.info('error', error)
  }
}
