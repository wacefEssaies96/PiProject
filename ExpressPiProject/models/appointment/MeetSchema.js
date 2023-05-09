const mongoose = require('mongoose');
const userSchema = require('../Users/userSchema');

const MeetSchema= new mongoose.Schema({
    code:{
        type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
}, {
    timestamps: true,
});
module.exports= MeetSchema;