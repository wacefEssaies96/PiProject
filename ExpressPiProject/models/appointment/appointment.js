var Mongoose= require('mongoose');
const appointmentSchema= require('./appointmentSchema');
const rendezvous= Mongoose.model(
    "rendezvous",  appointmentSchema
);
module.exports=rendezvous;