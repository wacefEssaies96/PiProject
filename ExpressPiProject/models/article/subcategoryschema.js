const Mongoose = require('mongoose');

const subcategorySchema = Mongoose.Schema({
    title: String,
    slug: String,
}, { timestamps: true })

module.exports = subcategorySchema;