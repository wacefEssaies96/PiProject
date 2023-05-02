var mongoose = require('mongoose');
const userSchema = require('../Users/userSchema');

var ProgressSportVideoSchema = new mongoose.Schema({
    user: {
        type: userSchema
    },
    video: {
        type: String
    },
    progress: {
        type: Number
    },
    totalDuration: {
        type: Number
    },
}, {
    timestamps: true,
})
module.exports = ProgressSportVideoSchema;