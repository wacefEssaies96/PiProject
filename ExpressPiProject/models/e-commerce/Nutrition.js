const mongoose = require('mongoose');



const nutritionSchema = new mongoose.Schema({
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fat: { type: Number, required: true },
  });
  
  module.exports = nutritionSchema;