const Mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const articleSchema = require('../article/articleschema');


articleSchema.plugin(mongoosePaginate);

const Article = Mongoose.model(
    "article", articleSchema
);

module.exports = Article;