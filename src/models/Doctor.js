const { Schema, model } = require('mongoose')

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    },
    slots: [{
        type: Date
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
})

module.exports = model('Doctor', doctorSchema)
