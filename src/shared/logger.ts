import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // - for console the log
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // - Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'combined.log' }), // - Write all logs with importance level of `info` or less to `combined.log`
  ],
})

export default logger
