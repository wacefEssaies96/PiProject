const EventController = require("../../controllers/Sports/EventCalendarSportController");
var express = require('express');
var router = express.Router();

//Create
router.post("/addEvent/:userId", EventController.create);

// Retrieve all Events
router.get("/getAllEvents", EventController.findAll);

// Retrieve a single Event with id
router.get("/:id", EventController.findEventById);

// Delete a Event with id
router.delete("/:id", EventController.deleteEvent);

// Update a Event with id
router.put("/:id", EventController.updateEvent);

module.exports = router;