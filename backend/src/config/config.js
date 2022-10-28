import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/coderbackend',
  SECRET_KEY: process.env.SECRET_KEY || 'somethingsecret',
  MAIL: process.env.MAIL || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
  PHONE_ADMIN: process.env.PHONE_ADMIN || '',
  TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER || '',
}
