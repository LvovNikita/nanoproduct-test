const startServer = require('./src/config/startServer.js')
const { httpApp } = require('./src/app.js')
const scheduler = require('./src/config/scheduler')

const dbDriver = require('mongoose')

startServer(httpApp, dbDriver, scheduler)
