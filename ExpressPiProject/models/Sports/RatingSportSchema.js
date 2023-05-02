var mongoose = require('mongoose');
const userSchema = require('../Users/userSchema');
const SubTypeSportSchema = require('./SubTypeSportSchema');

var RatinSportSchema = new mongoose.Schema({
    sportSubType: {
        type: SubTypeSportSchema
    },
    user: {
        type: userSchema
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true,
})
module.exports = RatinSportSchema;