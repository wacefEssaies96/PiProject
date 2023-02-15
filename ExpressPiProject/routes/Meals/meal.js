var express = require('express');
var router = express.Router();
const meal = require("../../controllers/Meals/mealController.js");

  

// Create a new Meal
router.post("/", meal.create);

// Retrieve all Meals
router.get("/", meal.findAll);

// Retrieve a single Meal with id
router.get("/:id", meal.findOne);

// Update a Meal with id
router.put("/:id", meal.update);

// Delete a Meal with id
router.delete("/:id", meal.delete);

// Delete all Meals
router.delete("/", meal.deleteAll);



module.exports = router;
