var express = require('express');
var router = express.Router();
const user = require("../../controllers/Users/userController.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// Retrieve all Users
router.get("/findAll", user.findAllUsers);
// Retrieve a single User with email
router.get("/email/:email", user.findUserByEmail);
// Retrieve a single User with id
router.get("/findOne/:id", user.findUserById);

// Create a new User
router.post("/Create", upload.single('image'), user.createUser);
// Update a User with id
router.put("/Update/:id", upload.single('image'), user.updateUser);
// Delete a User with id
router.delete("/:id", user.deleteUser);

module.exports = router; 