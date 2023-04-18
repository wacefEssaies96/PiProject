const sportSubTypesTitlesScraped = require("../../controllers/Sports/SportSubTypesTitlesScrapedController");
var express = require('express');
var router = express.Router();

// Retrieve all SubSportTypesTitlesScraped
router.get("/getAllSubSportTypesTitlesScraped", sportSubTypesTitlesScraped.findAll);

module.exports=router;