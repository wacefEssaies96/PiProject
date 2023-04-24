var mongoose = require('mongoose')
var EventCalendarSportSchema = require('./EventCalendarSportSchema')

const EventCalendarSport = mongoose.model(
    "EventCalendarSport", EventCalendarSportSchema
);
module.exports = EventCalendarSport;