class AppointmentInfo {
    constructor (user, doctor, appointment) {
        this.user = {
            name: user.name
        }
        this.doctor = {
            spec: doctor.spec
        }
        this.slot = {
            time: new Date(appointment.date)
                .toLocaleTimeString('ru-RU', {
                    timeStyle: 'short'
                })
        }
    }
}

module.exports = AppointmentInfo
