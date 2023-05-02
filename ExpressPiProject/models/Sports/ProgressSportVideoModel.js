var mongoose = require('mongoose')
var ProgressSportVideoSchema = require('./ProgressSportVideoSchema')

const ProgressSportVideo = mongoose.model(
    "ProgressSportVideo", ProgressSportVideoSchema
);
module.exports = ProgressSportVideo;