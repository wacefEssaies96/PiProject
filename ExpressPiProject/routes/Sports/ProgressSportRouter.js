const ProgressController = require("../../controllers/Sports/ProgressSportController");
var express = require('express');
var router = express.Router();

//Create
router.post("/addProgress", ProgressController.insertAndUpdateProgress);

// Retrieve all progresses
router.get("/getAllProgresses", ProgressController.findAll);

// update progress
router.put("/update", ProgressController.updateProgress);

module.exports = router;