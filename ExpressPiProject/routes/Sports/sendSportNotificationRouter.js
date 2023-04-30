const express = require('express');
const router = express.Router();

const notification = require('../../controllers/Sports/sendSportNotificationController');

module.exports = function(io) {
  // Define routes and pass io object to controller
  router.post('/notification', notification(io));

  return router;
};