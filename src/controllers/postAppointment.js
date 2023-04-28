const User = require('../models/User')
const Doctor = require('../models/Doctor')
const Appointment = require('../models/Appointment')
const scheduler = require('../config/scheduler')

const AppointmentInfo = require('../utils/AppointmentInfo')
const { ErrorResponseJSON, SuccessResponseJSON } = require('../utils/ResponseJSON')

module.exports = async (req, res, next) => {
    const { user_id, doctor_id, slot } = req.body

    let user = null
    let doctor = null

    try {
        user = await User
            .findById(user_id)
            .populate('appointments')
    } catch (err) {
        return next(err)
    }

    if (!user) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'User doesn\'t exist'))
    }

    try {
        doctor = await Doctor.findById(doctor_id)
    } catch (err) {
        return next(err)
    }

    if (!doctor) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'Doctor doesn\'t exist'))
    }

    const desiredDate = new Date(+slot).valueOf()

    for (const appointment of user.appointments) {
        if (appointment.date.valueOf() === desiredDate) {
            return res
                .status(400)
                .json(new ErrorResponseJSON(400, 'User is already busy at this time'))
        }
    }

    for (const slot of doctor.slots) {
        if (slot.valueOf() === desiredDate) {
            try {
                const appointment = await Appointment.create({
                    user_id: user._id,
                    doctor_id: doctor._id,
                    date: desiredDate
                })

                await Doctor.findByIdAndUpdate(doctor._id, {
                    $pull: { slots: new Date(desiredDate) }
                })

                user.appointments.push(appointment._id)
                await user.save()

                doctor.appointments.push(appointment._id)
                await doctor.save()

                const appointmentInfo = new AppointmentInfo(user, doctor, appointment)

                const twoHours = 1000 * 60 * 60 * 2
                const oneDay = 1000 * 60 * 60 * 24
                scheduler.schedule(new Date(desiredDate - twoHours), 'notifyTwoHoursBeforeAppointment', appointmentInfo)
                scheduler.schedule(new Date(desiredDate - oneDay), 'notifyOneDayBeforeAppointment', appointmentInfo)

                return res
                    .status(200)
                    .json(new SuccessResponseJSON(appointment))
            } catch (err) {
                return next(err)
            }
        }
    }

    return res
        .status(400)
        .json(new ErrorResponseJSON(400, 'Doctor has no free slots at this time'))
}
