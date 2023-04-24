const sportVideos = require("../../controllers/Sports/SportYoutubeVideosScrapedController");
var express = require('express');
var router = express.Router();

// WebScraping Yutube videos
router.get("/all-youtube-videos", sportVideos.findAll);

// saving and updating sportsub type
router.put("/save-youtube-videos/:id", sportVideos.youtubeVideos);

module.exports = router;