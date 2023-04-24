const SportYoutubeVideosModel = require("../../models/Sports/SportVideosScrapedModel")
const axios = require("axios");
const User = require("../../models/Users/user");
const SportSubType = require("../../models/Sports/SubTypeSportModel");

//scraping youtube videos
exports.youtubeVideos = async (req, res) => {

    // Get the search query from the request query parameters
    const query = req.query.query;
    let sport = null;
    const id = req.params.id;
    let user = null;

    // search for sport sub type that will be updated by title accourding to the query
    SportSubType.findOne({ title: query })
        .then(sportSubType => sport = sportSubType)
        .catch(err => res.status(400).json('Error: ' + err));

    //find user by id
    try {
        user = await User.findById(id);
        if (!user) {
            console.log("User not found");
        }

    } catch (err) {
        console.log("Internal server error");
    }

    // scrape sport youtube videos and save it
    try {
        // Make an API request to YouTube Data API to search for videos
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: query,
                part: 'id,snippet',
                type: 'video',
                maxResults: 10, // Specify the number of results to retrieve
                key: 'AIzaSyC8zRRDe5qseKnGUrfLI2b3lAafbllMFNg', // Replace with your actual API key
            }
        });

        // Extract video data from the API response
        const videoData = response.data.items.map(item => {
            return {
                videoId: item.id.videoId,
                videoTitle: item.snippet.title,
                videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            };
        });

        // Send the video data as JSON in the response
        console.log(videoData);

        // Create a SportSubType
        var newSportsVideos = new SportYoutubeVideosModel({
            listVideos: videoData
        })
        newSportsVideos.save()
            .then(data => console.log(data))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while saving newSportsVideos!"
                });
            });

        const newSportSubType = sport;
        // update sport sub type
        try {
            newSportSubType.SportYoutubeVideosScraped = newSportsVideos

            // Update the SportSubType in the database
            const result = await SportSubType.findByIdAndUpdate(sport._id, newSportSubType, { new: true });

            console.log({ "newSportsVideos": newSportsVideos, "updatedSportSubType": result }); // return the updated SportSubType object
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update SportSubType' });
        }

        // update sport sub type
        try {
            const newUser = user;
            newUser.subTypeSport = newSportSubType

            // Update the User in the database
            const result = await User.findByIdAndUpdate(id, newUser, { new: true });

            res.json({ "newSportSubType": newSportSubType, "updatedUser": result }); // return the updated User object
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update User' });
        }

    } catch (error) {
        // Handle error
        console.log({ error: error.message });
    }
}

//get all SportSubTypes 
exports.findAll = (req, res) => {
    SportYoutubeVideosModel.find()
        .then(videos => res.json(videos))
        .catch(err => res.status(400).json('Error: ' + err));
}