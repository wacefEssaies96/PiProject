var express = require('express');
var router = express.Router();
const Img = require("../../controllers/Img/ImgController.js");

// Verif img exist in folser of back end
router.get("/Verif", Img.Verif);

module.exports = router;