const mongoose =require('mongoose');
const mealSchema = require('../Meals/mealSchema');

const recipeSchema =new mongoose.Schema(
  {
    name :  {
        type: String,
        unique: true,
    },
    validated : Boolean,
    description  : String,
    quantity : [Number], 
    totalCalorie : String,
    imgRecipe  : String,
    meals    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = recipeSchema;