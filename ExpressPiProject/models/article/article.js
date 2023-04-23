const Mongoose = require('mongoose');
const CategorySchema = require('../../models/article/categoryschema');
const SubCategorySchema = require('../../models/article/subcategoryschema');
const mongoosePaginate = require('mongoose-paginate-v2');

const articleSchema = new Mongoose.Schema({
    title: String,
    content: String,
    status: String,
    slug: String,
    description: String,
    thumbnail: String,
    category: {
        type: CategorySchema,
        required: true
    },
    subcategory: SubCategorySchema
}, { timestamps: true })

articleSchema.plugin(mongoosePaginate);

const Article = Mongoose.model(
    "article", articleSchema
);

module.exports = Article;