const mongoose = require('mongoose');
const ServiceSchema= require('./servicesSchema');
const Schema = mongoose.Schema;

const clinicSchema= new mongoose.Schema({
    Name:{
        type:String, 
        required: true,
    },
    phone_number:{
        type: Number,
        required: true,
    },
    services:{
        type: [ServiceSchema],
        required: true,
    },
    address:{
        type: String,
        required: true,
    }

})

module.exports= clinicSchema;