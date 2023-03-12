const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password : String,
    role : String,
    gender   : String,
    phone : Number,
    address : String,
    height : Number,
    weight : Number,
    disease : String,
    image: String,
    account_Verified:Boolean,
    speciality:String,

    meals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal'
    }],
  },
  { timestamps: true }
)

// encrypt password before saving a model
userSchema.pre('save', function (next) {
  const user = this;
  // generating hashed password
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;

      // proceed to saving the model
      next();
    });
  });
});

// comparing saved hashed password and provided password during signing in
userSchema.methods.comparePasswords = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
module.exports = userSchema;
