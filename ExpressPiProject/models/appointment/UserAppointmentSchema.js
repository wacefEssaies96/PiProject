// const mongoose = require('mongoose');

// const appointmentSchema = require('./appointmentSchema');
// const userSchema = require('../Users/userSchema');

// const newSchema = new mongoose.Schema({
//   Date: {
//     type: Date,
//     required: true,
//   },
//   Duration: {
//     type: String,
//     required: true
//   },
//   Hour: {
//     type: String,
//     required: true
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   ...appointmentSchema.obj,
//   ...userSchema.obj,
// });

// // Only include appointments where the role is Doctor
// newSchema.methods.getAppointmentsForDoctor = function() {
//   return this.appointments.filter(appointment => appointment.role === 'Doctor');
// }



// module.exports = newSchema;
