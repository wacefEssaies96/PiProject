var Mongoose= require('mongoose');
const clinicSchema= require('./clinicSchema');
const service= Mongoose.model(
    "service", clinicSchema
);
module.exports=service;