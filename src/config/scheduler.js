const Agenda = require('agenda')

const fileLogger = require('./fileLogger')

const scheduler = new Agenda({
    db: {
        address: process.env.DB_URI || 'mongodb://127.0.0.1/test'
    }
})

scheduler.define('notifyTwoHoursBeforeAppointment', async (job) => {
    const { user, doctor, slot } = job.attrs.data
    const currentDate = new Date().toLocaleString('ru-RU')
    const message = `${currentDate} | Привет, ${user.name}! Вам через 2 часа к ${doctor.spec} в ${slot.time}!`
    fileLogger.log({ level: 'info', message })
})

scheduler.define('notifyOneDayBeforeAppointment', async (job) => {
    const { user, doctor, slot } = job.attrs.data
    const currentDate = new Date().toLocaleString('ru-RU')
    const message = `${currentDate} | Привет, ${user.name}! Напоминаем что вы записаны к ${doctor.spec} завтра в ${slot.time}!`
    fileLogger.log({ level: 'info', message })
})

module.exports = scheduler
