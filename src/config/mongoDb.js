import config from './config.js'
import logger from '../utils/logger.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = config

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    logger.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
