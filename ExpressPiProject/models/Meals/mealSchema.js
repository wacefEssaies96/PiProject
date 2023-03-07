const mongoose =require('mongoose');

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
    calories_oz    : String ,
    userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
)

module.exports = mealSchema;