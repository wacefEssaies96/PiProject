const Mongoose = require('mongoose');
const SubCategorySchema = require('../../models/article/subcategoryschema');

const categorySchema = Mongoose.Schema({
    title: String,
    slug: String,
    subcategory: [SubCategorySchema]
}, { timestamps: true })

module.exports = categorySchema;