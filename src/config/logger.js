const morgan = require('morgan')

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

module.exports = morgan(':method :url :status :body')
