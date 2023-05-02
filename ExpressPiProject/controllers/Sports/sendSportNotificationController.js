const EventModel = require("../../models/Sports/EventCalendarSportModel")

exports.getPushRequests = (req, res) => {
    let events = []
    EventModel.find()
        .then(event => events = event)
        .catch(err => res.status(400).json('Error: ' + err));
        
}