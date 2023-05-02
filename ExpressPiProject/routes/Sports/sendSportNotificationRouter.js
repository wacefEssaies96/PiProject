const NotificationController = require("../../controllers/Sports/sendSportNotificationController");
var express = require('express');
var router = express.Router();

//Create
// router.post("/addProgress", ProgressController.insertAndUpdateProgress);

// Retrieve all getPushRequests
router.get("/getPushRequests", NotificationController.getPushRequests);

// Retrieve all progresses by userId
// router.get("/getAllUserProgresses/:userId", ProgressController.findAllByUser);

// // update progress
// router.put("/update", ProgressController.updateProgress);

// // delete progress
// router.delete("/delete/:id", ProgressController.deleteProgress);

module.exports = router;