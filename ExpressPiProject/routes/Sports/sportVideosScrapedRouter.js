const sportVideos = require("../../controllers/Sports/SportYoutubeVideosScrapedController");
var express = require('express');
var router = express.Router();

// WebScraping Youtube videos
router.get("/all-youtube-videos", sportVideos.findAll);

// saving and updating sportsub type
router.put("/save-youtube-videos/:id", sportVideos.youtubeVideos);

// get videos by user id 
router.get("/userVideos/:id", sportVideos.findVideosByUser);

module.exports = router;