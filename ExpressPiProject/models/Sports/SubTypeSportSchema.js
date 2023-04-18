var mongoose = require('mongoose')
var SubTypeSportSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    demoVideo: {
    type: String,
    },
    definitionHistory: {
    type: String,
    },
    slug: {
    type: String,
    },
}, {
    timestamps: true,
})
module.exports = SubTypeSportSchema;