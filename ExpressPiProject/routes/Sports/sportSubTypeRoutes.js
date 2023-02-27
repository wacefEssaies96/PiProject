const sportSubTypes = require("../../controllers/Sports/SubTypeSportController");
  
var express = require('express');
var router = express.Router();

// Create a new SubSportType
router.post("/addSportSubType", sportSubTypes.create);

// Retrieve all SubSportTypes
router.get("/getAllSportSubTypes", sportSubTypes.findAll);

// Retrieve a single SubSportType with id
router.get("/:id", sportSubTypes.findSportSubTypeById);

// Delete a SubSportType with id
router.delete("/:id", sportSubTypes.deleteSportSubType);

// Update a SubSportType with id
router.put("/:id", sportSubTypes.updateSportSubType);

module.exports=router;