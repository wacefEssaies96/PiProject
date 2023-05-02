var mongoose = require('mongoose')
var SportYoutubeVideosScrapedSchema = require('./SportYoutubeVideosScrapedSchema')

const SportVideosScraped = mongoose.model(
    "SportVideosScraped", SportYoutubeVideosScrapedSchema
);
module.exports = SportVideosScraped;