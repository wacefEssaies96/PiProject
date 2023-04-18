var express = require('express');
var router = express.Router();
const controller = require('../../controllers/article/article');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// Create a new Article
router.post("/create", upload.single('thumbnail'), controller.create);

// Update a Article with id
router.put("/update/:id", upload.single('thumbnail'), controller.update);

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

// Scrap data from wired.com
router.get("/scrap/wired/:subcategory", controller.scrapFromWired);

// Scrap data from wired.com one article
router.post("/scrap/wired/one", controller.scrapOneFromWired);

// OpenAi ChatGPT
router.post('/get-prompt-result', controller.openai);

module.exports = router;