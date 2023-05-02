const EventController = require("../../controllers/Sports/EventCalendarSportController");
var express = require('express');
var router = express.Router();

//Create
router.post("/addEvent/:userId", EventController.create);

// Retrieve all Events
router.get("/getAllEvents", EventController.findAll);

// Retrieve Events between 2 dates
router.get("/events2dates", EventController.findEventsBetweenTwoDates);

// Retrieve Events calendar
router.get("/events", EventController.getEventsCalendar);

// Retrieve all user's Event with user id
router.get("/userEvents/:id", EventController.getEventsUser);

// Retrieve a single Event with id
router.get("/:id", EventController.findEventById);

// Delete a Event with id
router.delete("/:id", EventController.deleteEvent);

// Update a Event with id
router.put("/:id", EventController.updateEvent);

module.exports = router;