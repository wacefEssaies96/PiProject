var mongoose = require('mongoose')
var MeetSchema = require('./MeetSchema')

const MeetModel = mongoose.model(
    "MeetModel", MeetSchema
);
module.exports = MeetModel;