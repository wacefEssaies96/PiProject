var Mongoose= require('mongoose');
const servicesSchema= require('./servicesSchema');
const service= Mongoose.model(
    "service", servicesSchema
);
module.exports=service;