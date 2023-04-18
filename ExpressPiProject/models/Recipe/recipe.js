const mongoose =require('mongoose');
const recipeSchema =require('./recipeSchema');

const Recipe = mongoose.model(
  "Recipe", recipeSchema
);

module.exports = Recipe;
  