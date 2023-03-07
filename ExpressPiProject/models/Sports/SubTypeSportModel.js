var mongoose = require('mongoose')
var SubTypeSportSchema = require('./SubTypeSportSchema')

const SportSubType = mongoose.model(
    "sportSubType", SubTypeSportSchema
);
module.exports = SportSubType;