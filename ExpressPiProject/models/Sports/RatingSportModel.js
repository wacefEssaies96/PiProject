var mongoose = require('mongoose')
var RatingSportSchema = require('./RatingSportSchema')

const RatingSport = mongoose.model(
    "RatingSport", RatingSportSchema
);
module.exports = RatingSport;