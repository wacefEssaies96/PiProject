const mongoose =require('mongoose');
    
const userSchema =new mongoose.Schema(
  {
    fullname : String,
    email : String,
    password : String,
    role : String,
    height : Number,
    weight : Number
  },
  { timestamps: true }
)
const user = mongoose.model(
  "user",
  userSchema
  
);
module.exports = user;
