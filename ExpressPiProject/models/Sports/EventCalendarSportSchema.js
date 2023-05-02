var mongoose = require('mongoose');

var EventCalendarSportSchema = new mongoose.Schema({
    summary: {
        type: String,
    },
    description: {
        type: String,
    },
    start: {
        type: Object,
    },
    end: {
        type: Object,
    }
}, {
    timestamps: true,
})
module.exports = EventCalendarSportSchema;