const Mongoose = require('mongoose');
const SubCategorySchema = require('../../models/article/subcategoryschema');

const subcategory = Mongoose.model(
    "subcategory", SubCategorySchema
);

module.exports = subcategory;