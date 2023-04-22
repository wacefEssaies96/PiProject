const sportSubTypes = require("../../controllers/Sports/SubTypeSportController");
var express = require('express');
var router = express.Router();
const multer = require("multer")
const upload = multer({ dest: 'uploads/SportSubTypesDemVideos' })
// const storage = multer.diskStorage({
//     destination : (res, file, cb) => {
//         //define where to storege those videos
//         cb(null, '../../uploads/SportSubTypesDemVideos')
//     },

//     filename : (req, file, cb) => {
//         const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`
//         cb(null, fileName)
//     },
// })

// multer middleware
// const upload = multer({storage : storage}).single('demoVideo')

//upload.single('Name of the input')
// Create a new SubSportType
router.post("/uploads", upload.single('demoVideo'), (req, res) => {
    const { file } = req
    console.log(req.file)
    res.send({
        file: file.originalname,
        path: file.path,
        image: req.file.path,
    })
});

// WebScraping 
router.get("/sportSubTypesTitle", sportSubTypes.webScrapingSportSubTypesTitle);

// WebScraping Yutube videos
router.get("/demoVideo", sportSubTypes.youtubeVideos);

//Create
router.post("/addSportSubType", upload.single('demoVideo'), sportSubTypes.create);

// Retrieve all SubSportTypes
router.get("/getAllSportSubTypes", sportSubTypes.findAll);

// Retrieve a single SubSportType with id
router.get("/:id", sportSubTypes.findSportSubTypeById);

// Delete a SubSportType with id
router.delete("/:id", sportSubTypes.deleteSportSubType);

// Update a SubSportType with id
router.put("/:id", upload.single('demoVideo'), sportSubTypes.updateSportSubType);

// Retrieve a single SubSportType with title
router.get("/titleSubType/:title", sportSubTypes.findSportSubTypeByTitle);

// Get your sport type
router.get("/sport-type/:id/:shouldersWidth/:hipsWidth", sportSubTypes.getYourSportTypes);

module.exports = router;