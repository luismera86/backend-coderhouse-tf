import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/coderbackend',
  SECRET_KEY: process.env.SECRET_KEY || 'somethingsecret',
  MAIL: process.env.MAIL || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
}
