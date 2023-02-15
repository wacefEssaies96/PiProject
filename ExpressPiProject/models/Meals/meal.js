    const mongoose =require('mongoose');
    
    const mealSchema =new mongoose.Schema(
      {
          FoodCategory: String,
          FoodItem: String
      },
      { timestamps: true }
    )
    const meal = mongoose.model(
      "meal",
      mealSchema
      
    );
    module.exports = meal;
  