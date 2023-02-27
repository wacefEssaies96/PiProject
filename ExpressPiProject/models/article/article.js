const Mongoose = require('mongoose');
const CategorySchema = require('../../models/article/categoryschema');
const SubCategorySchema = require('../../models/article/subcategoryschema');

const Article = Mongoose.model(
    "article", Mongoose.Schema({
        title: String,
        content: String,
        status: String,
        slug: String,
        description: String,
        category: {
            type: CategorySchema,
            required: true
        },
        subcategory: SubCategorySchema
    },{ timestamps: true })
);
module.exports = Article;