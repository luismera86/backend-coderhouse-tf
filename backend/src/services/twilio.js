import config from '../config/config.js'
import logger from '../utils/logger.js'
import twilio from 'twilio'

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, PHONE_ADMIN, TWILIO_WHATSAPP_NUMBER } = config

const accountSid = TWILIO_ACCOUNT_SID
const authToken = TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export const sendNewOrder = async (order, user) => {
  try {
    const option = {
      to: PHONE_ADMIN,
      from: TWILIO_PHONE_NUMBER,
      body: `Se ha realizado un nuevo pedido por el usuario ${user.firstName} ${user.lastName} con el email: ${user.email} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
    }

    const message = await client.messages.create(option)
  } catch (error) {
    console.log(error)
    logger.info('error', error)
  }
}

export const sendWhatsApp = async (order, user) => {
  try {
    const option = {
      to: `wahtsapp:${PHONE_ADMIN}`,
      from: TWILIO_WHATSAPP_NUMBER,
      body: `Se ha realizado un nuevo pedido por el usuario ${user.firstName} ${user.lastName} con el email: ${user.email} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
    }

    const message = await client.messages.create(option)
  } catch (error) {
    console.log(error)
    logger.info('error', error)
  }
}
