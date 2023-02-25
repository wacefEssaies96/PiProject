var express = require('express');
var router = express.Router();
const controller = require('../../controllers/article/article');

// Create a new Article
router.post("/create", controller.create);

// Update a Article with id
router.put("/update/:id", controller.update);

// Delete a Article with id
router.delete("/delete/:id", controller.delete);

// Delete all Articles
router.delete("/delete-all", controller.deleteAll);

// Retrieve all Articles
router.get("/find-all", controller.findAll);

// Retrieve all published Articles
router.get("/find-published", controller.findAllPublished);

// Retrieve a single Article with id
router.get("/find/:id", controller.findOne);

// Scrap data from medium
router.get("/scrap/wired/:subcategory", controller.scrapFromWired);

module.exports = router;