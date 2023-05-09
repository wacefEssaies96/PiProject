const mongoose =require('mongoose');
// const userSchema = require('../Users/userSchema');

const mealSchema =new mongoose.Schema(
  {
    FoodCategory : String,
    FoodItem : {
        type: String,
        unique: true,
    },
    serving_size_100g : String,
    calories_100g  : String,
    serving_size_portion : String, 
    calories_portion  : String,
    serving_size_oz  : String,
    calories_oz    : String,
    validated : Boolean,
    imgMeal  : String,
    rate  : [ 
      {
        userRate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        rate :Number
      }
    ]
  },
  { timestamps: true }
)

module.exports = mealSchema;