const sportTypes = require("../../controllers/Sports/sportTypeController");
  
var express = require('express');
var router = express.Router();

// WebScraping 
router.get("/sportTypesTitle", sportTypes.webScrapingSportTypesTitle);

// WebScraping adv Individual sports
router.get("/sportTypesAdvIndiv", sportTypes.advIndiv);

// WebScraping adv Partner sports
router.get("/sportTypesAdvPartner", sportTypes.advPartner);

// WebScraping adv Team sports
router.get("/sportTypesAdvTeam", sportTypes.advTeam);

// WebScraping adv Extreme sports
router.get("/sportTypesAdvExtreme", sportTypes.advExtreme);

// Create a new SportType
router.post("/addSportType", sportTypes.create);

// Retrieve all SportTypes
router.get("/getAllSportTypes", sportTypes.findAll);

// Retrieve a single SportType with id
router.get("/:id", sportTypes.findSportTypeById);

// Delete a SportType with id
router.delete("/:id", sportTypes.deleteSportType);

// Update a SportType with id
router.put("/:id", sportTypes.updateSportType);

// Retrieve a single SportType by title
router.get("/searchTypeByTitle/:title", sportTypes.findSportTypeByTitle);

module.exports=router;