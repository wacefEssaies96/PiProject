const ratingController = require("../../controllers/Sports/RatingSportController");
var express = require('express');
var router = express.Router();

//Create
router.post("/addRating/:userId/:sportSutTypeTitle", ratingController.create);

// Retrieve all Rates
router.get("/getAllRatings", ratingController.findAll);

// Retrieve a single Rate with id
router.get("/:id", ratingController.findRateById);

// Delete a Rate with id
router.delete("/:id", ratingController.deleteRate);

// Update a Rate with id
router.put("/:id/:userId/:sportSutTypeTitle", ratingController.updateRate);

module.exports = router;