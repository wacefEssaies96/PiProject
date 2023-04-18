const mongoose = require('mongoose');
// const ServiceSchema= require('./servicesSchema');
const Schema = mongoose.Schema;

const clinicSchema= new mongoose.Schema({
    Name:{
        type:String, 
        unique: true,
        
    },
    Adress:{
        type: String,
       unique:true,
 
    },
    phone_number:{
        type: String,
       unique: true,
       

       
    },
});
module.exports= clinicSchema;