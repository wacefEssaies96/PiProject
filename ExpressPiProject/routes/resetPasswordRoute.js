const sendEmail = require("../controllers/resetPassword")

var express = require('express');
var router = express.Router();

router.post("/send-reset-link", sendEmail.sendResetLink)

router.get("/reset_password/:id/:token", sendEmail.resetPassword)

router.post("/reset_password/:id/:token", sendEmail.resetPassword)

module.exports = router;