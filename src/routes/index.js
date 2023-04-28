const { Router } = require('express')

const postAppointment = require('../controllers/postAppointment')

const apiRouter = new Router()

apiRouter.post('/appointment', postAppointment)

module.exports = apiRouter
