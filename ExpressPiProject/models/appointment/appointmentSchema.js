const moment = require('moment');
const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const appointmentSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
    
  },
  Hour: {
    type: String,
    required: true
  },
  Duration: {
    type: String,
    required: true,
    //default:"30min",
    unique: false
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
     
  }],
  reserved: Boolean,
  fullname: {
    type: String,
    ref: 'User',
    //equired: true,
     
  },
  speciality: {
    type: String,
     ref: 'User',
    //required: true,
     
  },



  
});



module.exports= appointmentSchema;