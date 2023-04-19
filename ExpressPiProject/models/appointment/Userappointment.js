var Mongoose= require('mongoose');
const userappSchema= require('./UserAppointmentSchema');
const userapp= Mongoose.model(
    "userapp", userappSchema
);
module.exports=userapp;