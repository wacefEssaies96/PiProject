var express = require('express');
var router = express.Router();
const controller = require('../../controllers/article/article');

// Retrieve a single categorie with id
router.get("/find/:userid", controller.findAllNotifications);


module.exports = router;