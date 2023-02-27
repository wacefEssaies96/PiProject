const sportTypes = require("../../controllers/Sports/sportTypeController");
  
var express = require('express');
var router = express.Router();

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

module.exports=router;