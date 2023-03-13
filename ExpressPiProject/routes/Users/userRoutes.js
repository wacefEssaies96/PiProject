var express = require('express');
var router = express.Router();
const user = require("../../controllers/Users/userController.js");

// Retrieve all Users
router.get("/", user.findAllUsers);
// Retrieve a single User with email
router.get("/email/:email", user.findUserByEmail);
// Retrieve a single User with id
router.get("/:id", user.findUserById);

// Create a new User
router.post("/", user.createUser);
// Update a User with id
router.put("/:id", user.updateUser);
// Delete a User with id
router.delete("/:id", user.deleteUser);

module.exports = router; 