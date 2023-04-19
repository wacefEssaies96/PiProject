const mongoose = require('mongoose');

const appointmentSchema = require('./appointmentSchema');
const userSchema = require('../Users/userSchema');

const newSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  Duration: {
    type: String,
    required: true
  },
  Hour: {
    type: String,
    required: true
  },
  FullName: {
    type: String,
    required: true
  },
  speciality:{
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true
  },
  ...appointmentSchema.obj,
  ...userSchema.obj,
});

// Only include appointments where the role is Doctor
newSchema.methods.getAppointmentsForDoctor = function() {
  return this.appointments.filter(appointment => appointment.role === 'Doctor');
}

module.exports = newSchema;
