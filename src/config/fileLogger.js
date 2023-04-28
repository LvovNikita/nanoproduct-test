const winston = require('winston')

const fileLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'appointments.log'
        })
    ]
})

module.exports = fileLogger
