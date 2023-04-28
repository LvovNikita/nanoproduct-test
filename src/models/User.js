const { Schema, model } = require('mongoose')

const PHONE_NUMBER_REGEXP = /^\+?\d{11}$/

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: value => PHONE_NUMBER_REGEXP.test(value)
        }
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
})

module.exports = model('User', userSchema)
