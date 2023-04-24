var mongoose = require('mongoose')
var SportVideosScrapedSchema = new mongoose.Schema({
    listVideos : {
        type: [Object]
    }
}, {
    timestamps: true,
})
module.exports = SportVideosScrapedSchema;