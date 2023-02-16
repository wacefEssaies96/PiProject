var mongoose = require('mongoose')
var TypeSportSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    slug: {
    type: String,
    required: false,
    },
}, {
    timestamps: true,
})
module.exports = TypeSportSchema;