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
    required: true
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
     
  },],
  reserved: Boolean
});



module.exports= appointmentSchema;