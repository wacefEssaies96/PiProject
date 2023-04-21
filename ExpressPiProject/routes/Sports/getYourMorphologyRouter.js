const morphology = require("../../controllers/Sports/getYourMorphologyController");
var express = require('express');
var router = express.Router();
const multer = require("multer")

// Set up multer middleware to handle multipart form data
const upload = multer({ dest: 'uploads/UserMorphology' })

// Route to handle file upload
router.post('/getYourMorphologyType', upload.single('userImage'), morphology.uploadUserImage)

// get your body shape type
router.get('/bodyShapeType/:id/:shouldersWidth/:hipsWidth', morphology.morphologyType)

module.exports = router;