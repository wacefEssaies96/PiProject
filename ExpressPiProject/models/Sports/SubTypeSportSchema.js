var mongoose = require('mongoose');
const SportVideosScrapedSchema = require('./SportYoutubeVideosScrapedSchema');
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
    SportYoutubeVideosScraped: {
        type: SportVideosScrapedSchema
    },
    averageRating: {
        type: Number
    }
}, {
    timestamps: true,
})
module.exports = SubTypeSportSchema;