var express = require('express');
var router = express.Router();
const meal = require("../../controllers/Meals/mealController.js");

// Retrieve all Meals
router.get("/findAll", meal.findAllMeals);
// Retrieve a single Meal with id
router.get("/findOne/:id", meal.findOneMeal);
// Retrieve a single Meal with id
router.get("/Category/:cat", meal.findMealsOfCategory);
// Retrieve a single Meal with id
router.get("/Details/:food", meal.findMealByName);

// Create a new Meal
router.post("/Create", meal.createMeal);
// Update a Meal with id
router.put("/Update/:id", meal.updateMeal);
// Delete a Meal with id
router.delete("/:id", meal.deleteMeal);

module.exports = router;