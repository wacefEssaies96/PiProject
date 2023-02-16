var mongoose = require('mongoose')
var TypeSportSchema = require('./typeSportSchema')

const SportType = mongoose.model(
    "sportType", TypeSportSchema
);
module.exports = SportType;