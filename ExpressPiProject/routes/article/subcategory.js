var express = require('express');
var router = express.Router();
const controller = require('../../controllers/article/subcategory');

// Create a new categorie
router.post("/create", controller.create);

// Update a categorie with id
router.put("/update/:id", controller.update);

// Delete a categorie with id
router.delete("/delete/:id", controller.delete);

// Delete all categories
router.delete("/delete-all", controller.deleteAll);

// Retrieve all categories
router.get("/find-all", controller.findAll);

// Retrieve a single categorie with id
router.get("/find/:id", controller.findOne);


module.exports = router;