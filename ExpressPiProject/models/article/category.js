const Mongoose = require('mongoose');
const CategorySchema = require('../../models/article/categoryschema');

const category = Mongoose.model(
    "category", CategorySchema
);
module.exports = category;