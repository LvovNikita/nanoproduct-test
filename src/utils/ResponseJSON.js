class SuccessResponseJSON {
    constructor (data) {
        this.data = data
    }
}

class ErrorResponseJSON {
    constructor (errorCode, errorMessage) {
        this.error = {}
        this.error.code = errorCode
        this.error.message = errorMessage
    }
}

module.exports = {
    SuccessResponseJSON,
    ErrorResponseJSON
}
