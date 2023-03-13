const mongoose = require('mongoose');
const NutritionSchema = require('../../models/e-commerce/Nutrition')
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  images: [{ type: String }],
  category: { type: String },
  marque: { type: String },
  nutrition: [NutritionSchema]
},
{ timestamps: true });


const Product = mongoose.model('product', productSchema);

module.exports = Product;
