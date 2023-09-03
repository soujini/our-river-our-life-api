const { format, createLogger, transports } = require('winston')

const { combine, timestamp, printf } = format

// Using the printf format.
const customFormat = printf(({ level, message, timestamp }) => {
  return `{"timestamp": "${timestamp}" "logLevel": "${level}" "message": "${message}"}`
})

const logger = createLogger({
  level: 'info',
  format: combine(timestamp({
    format: 'MMM-DD-YYYY HH:mm:ss'
  }), customFormat),
  transports: [
    new transports.File({
      filename: 'logs/combined.log'
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log'
    }),
    new transports.Console()
  ]
})

export default logger
