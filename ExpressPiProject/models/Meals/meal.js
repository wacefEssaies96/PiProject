const mongoose =require('mongoose');
const mealSchema =require('./mealSchema');

const Meal = mongoose.model(
  "Meal", mealSchema
);

module.exports = Meal;
  