var mongoose = require('mongoose')
var SubTypeSportSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    demoVideo: {
    type: String,
    // required: true,
    },
    advantages: {
    type: String,
    // required: true,
    },
    limits: {
    type: String,
    // required: true,
    },
    slug: {
    type: String,
    // required: false,
    },
}, {
    timestamps: true,
})
module.exports = SubTypeSportSchema;