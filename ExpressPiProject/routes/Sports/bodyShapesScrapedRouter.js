const bodyShapeController = require("../../controllers/Sports/bodyShapesScrapedController");
var express = require('express');
var router = express.Router()

// Route to handle store body shape descriptions
router.post('/storeBodyShape', bodyShapeController.storeData)

//get all
router.get('/allBodyShapesScared', bodyShapeController.findAll)

// Route to handle store body shape images urls
router.post('/storeImageUrl', bodyShapeController.storeImagesUrls)

module.exports = router;