const { createServer } = require('node:http')

const express = require('express')

const logger = require('./config/logger')
const apiRouter = require('./routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(logger)
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', apiRouter)
app.use(errorHandler)

exports.httpApp = createServer(app)
