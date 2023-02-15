
    const sports = require("../../controllers/Sports/sportController");
  
    var express = require('express');
    var router = express.Router();
  
    // Create a new Sport
    router.post("/addSport", sports.create);
  
    // Retrieve all Sports
    router.get("/getAllSports", sports.findAll);
  
    // Retrieve a single sport with id
    router.get("/:id", sports.findSportById);
  
    // Delete a Sport with id
    router.delete("/:id", sports.deleteSport);

    // Update a Sport with id
    router.put("/:id", sports.updateSports);

    module.exports=router;