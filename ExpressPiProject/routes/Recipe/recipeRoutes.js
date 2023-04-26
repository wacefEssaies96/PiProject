var express = require('express');
var router = express.Router();
const recipe = require("../../controllers/Recipes/recipeController.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// Retrieve all Recipes
router.get("/findAll", recipe.findAllRecipes);
// Retrieve Validated Recipes
router.get("/Validated", recipe.findValidatedRecipes);
// Retrieve Validated Recipes and My Recipes
router.get("/Validated/:userId", recipe.findValidated_MyRecipes);
// Retrieve a single Recipe with id
router.get("/findOne/:id", recipe.findOneRecipe);
// Retrieve a single recipe with name
router.get("/Details/:name", recipe.findRecipeByName);
// Retrieve a single recipe of user
router.get("/MyRecipe/:userId", recipe.findMyRecipe);

// Create a new Recipe
router.post("/Create",upload.single('imgRecipe'), recipe.createRecipe);
// Update a Recipe with id
router.put("/Update/:id",upload.single('imgRecipe'), recipe.updateRecipe);
// Delete a Recipe with id
router.delete("/:id", recipe.deleteRecipe);

module.exports = router;