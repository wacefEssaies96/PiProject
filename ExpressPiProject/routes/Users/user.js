var express = require('express');
var router = express.Router();
const user = require("../../controllers/Users/userController.js");

  

// Create a new User
router.post("/", user.create);

// Retrieve all Users
router.get("/", user.findAll);

// Retrieve a single User with id
router.get("/:id", user.findOne);

// Update a User with id
router.put("/:id", user.update);

// Delete a User with id
router.delete("/:id", user.delete);

module.exports = router;
