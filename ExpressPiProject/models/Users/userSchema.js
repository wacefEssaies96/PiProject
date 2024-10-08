const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const articleSchema = require('../article/articleschema');
const SubTypeSportSchema = require('../Sports/SubTypeSportSchema');
const EventCalendarSportSchema = require('../Sports/EventCalendarSportSchema');

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: String,
    role: String,
    gender: String,
    phone: Number,
    address: String,
    height: Number,
    weight: Number,
    dateOfBirth: Date,
    disease: String,
    image: String,
    account_Verified: Boolean,
    speciality: String,
    code: Number,
    two_factor: Boolean,
    articles:[articleSchema],
    morphology: String,
    subTypeSport: {
      type: SubTypeSportSchema
    },
    SportEvents: [EventCalendarSportSchema]
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

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.password) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(update.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        update.password = hash;
        next();
      });
    });
  } else {
    next();
  }
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