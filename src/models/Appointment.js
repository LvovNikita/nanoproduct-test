const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = model('Appointment', appointmentSchema)
