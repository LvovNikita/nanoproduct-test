require('dotenv').config()

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOST || '127.0.0.1'
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1/test'

const startServer = async (httpApp, dbDriver, scheduler) => {
    dbDriver
        .connect(DB_URI, {})
        .then(async () => {
            console.log(`Connected to DB: ${DB_URI}`)
            httpApp.listen(PORT, HOSTNAME, () => {
                console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
            })
            await scheduler.start()
        })
        .catch(err => {
            console.log(err)
        })

    process.on('uncaughtException', async (err) => {
        console.log(err)
        dbDriver.disconnect()
        await scheduler.stop()
        process.exit(1)
    })
}

module.exports = startServer
