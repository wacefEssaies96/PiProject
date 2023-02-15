var mongoose = require('mongoose')

var SportSchema = new mongoose.Schema({
    sportType: String,
    demoVideo: String,
    advantages: String,
    limits: String,
    slug: String
})
const Sport = mongoose.model(
    "sport", SportSchema
);
module.exports = Sport;