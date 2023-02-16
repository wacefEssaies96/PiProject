var mongoose = require('mongoose')
var TypeSportSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    slug: {
    type: String,
    required: true,
    },
}, {
    timestamps: true,
})
module.exports = TypeSportSchema;