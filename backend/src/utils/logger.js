import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
})

export default logger
