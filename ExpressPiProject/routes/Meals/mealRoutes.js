var express = require('express');
var router = express.Router();
const meal = require("../../controllers/Meals/mealController.js");

// Retrieve all Meals
router.get("/findAll", meal.findAllMeals);
// Retrieve all Validated Meals
router.get("/findAllValidated", meal.findValidatedMeals);
// Retrieve a single Meal with id
router.get("/findOne/:id", meal.findOneMeal);
// Retrieve Meals with Category
router.get("/Category/:cat", meal.findMealsOfCategory);
// Retrieve a single Meal with Name
router.get("/Details/:food", meal.findMealByName);

// Create a new Meal
router.post("/Create", meal.createMeal);
// Update a Meal with id
router.put("/Update/:id", meal.updateMeal);
// Delete a Meal with id
router.delete("/:id", meal.deleteMeal);
// Scrap Category Meals
router.get("/scrapeCatMeals", meal.scrapCategoryMeals);
// Scrap Meals
router.get("/scrape", meal.scrapMeals);

module.exports = router;