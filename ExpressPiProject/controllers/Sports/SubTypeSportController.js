const SportSubType = require("../../models/Sports/SubTypeSportModel")
const SportType = require("../../models/Sports/SportType")
const slug = require('slug')
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch');

const url = "https://www.leadershipandsport.com/types-of-sports/";

exports.webScrapingSportSubTypesTitle = async (req, res) => {
    try {
        await axios.get(url)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const listItems = $(".nv-content-wrap ul li");
                const sportSubTypes1 = [];
                const sportSubTypes2 = [];
                const sportSubTypes3 = [];
                const sportSubTypes4 = [];
                listItems.each((idx, el) => {
                    const sportType = $(el).text();
                    if (idx > 7 && idx < 57) {
                        sportSubTypes1.push(sportType);
                    }
                    if (idx > 56 && idx < 65) {
                        sportSubTypes2.push(sportType);
                    }
                    if (idx > 64 && idx < 94) {
                        sportSubTypes3.push(sportType);
                    }
                    if (idx > 93 && idx < 121) {
                        sportSubTypes4.push(sportType);
                    }
                });
                res.send({
                    sportSubTypes1,
                    sportSubTypes2,
                    sportSubTypes3,
                    sportSubTypes4
                });
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

//scraping youtube videos
exports.youtubeVideos = async (req, res) => {

    // Get the search query from the request query parameters
    const query = req.query.query;

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
        res.json(videoData);
    } catch (error) {
        // Handle error
        res.status(500).json({ error: error.message });
    }
}

// Create and Save a new SportSubType
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SportSubType

    const sportSubTypesList = await SportSubType.find({ title: req.body.title })
    const { file } = req
    if (sportSubTypesList.length == 0) {
        var newSportSubType = new SportSubType({
            title: req.body.title,
            demoVideo: (file && file.path) || null,
            definitionHistory: req.body.definitionHistory,
            slug: slug(req.body.title),
        })
        newSportSubType.save()
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the SubSportType!"
                });
            });
    }
    else {
        res.status(500).json('Error: This sport sub type title is already existing !')
    }
};

//get all SportSubTypes 
exports.findAll = (req, res) => {
    SportSubType.find()
        .then(subtypes => res.json(subtypes))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get SportSubType by id
exports.findSportSubTypeById = (req, res) => {
    SportSubType.findById(req.params.id)
        .then(sportSubType => res.json(sportSubType))
        .catch(err => res.status(400).json('Error: ' + err));
}

//delete a SportSubType by id
exports.deleteSportSubType = async (req, res) => {
    SportSubType.findByIdAndDelete(req.params.id)
        .then(async () => {
            res.json('sport sub type deleted!')
            await SportType.updateMany({}, { $pull: { sportSubType: { _id: req.params.id } } })
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

//update a SportSubType 
exports.updateSportSubType = (req, res) => {
    const { file } = req
    SportSubType.findById(req.params.id)
        .then(async (sub) => {
            sub.title = req.body.title;
            sub.demoVideo = (file && file.path) || null;
            sub.definitionHistory = req.body.definitionHistory;
            sub.slug = slug(req.body.title);

            sub.save()
                .then(() => res.json('sport sub type updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

            await SportType.updateMany({}, { $set: { sportSubType: sub } })
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

//get SportSubType by title
exports.findSportSubTypeByTitle = (req, res) => {
    SportSubType.findOne({ title: req.params.title })
        .then(sportSubType => res.json(sportSubType))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get your sport type accourding to your morphology
exports.getYourSportTypes = async (req, res) => {

    const id = req.params.id;
    const shouldersWidth = req.params.shouldersWidth;
    const hipsWidth = req.params.hipsWidth;

    fetch(`http://localhost:3030/api/get-your-morphology/bodyShapeType/${id}/${shouldersWidth}/${hipsWidth}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error making HTTP request: ' + response.statusText);
            }
        })
        .then(data => {
            // Process the response data
            console.log(data);

            let gender = data.updatedUser.gender
            bodyShapeType = data.morphology
            let recommendedSports = "";

            if (gender.toLowerCase() === 'male') {
                switch (bodyShapeType.toLowerCase()) {
                    case "ectomorph":
                        recommendedSports = "Sports that focus on building muscle and increasing overall strength, such as weightlifting, bodybuilding, or powerlifting.";
                        break;
                    case "mesomorph":
                        recommendedSports = "Sports that involve a combination of strength training and cardiovascular exercise, such as basketball, football, or swimming.";
                        break;
                    case "endomorph":
                        recommendedSports = "Sports that emphasize cardiovascular exercise and calorie burning, such as running, cycling, or high-intensity interval training (HIIT).";
                        break;
                    case "rectangle":
                        recommendedSports = "Sports that involve a mix of cardiovascular exercise and resistance training, such as circuit training, calisthenics, or crossfit.";
                        break;
                    case "triangle":
                        recommendedSports = "Sports that focus on lower body strength and power, such as squats, lunges, or cycling.";
                        break;
                    case "inverted triangle":
                        recommendedSports = "Sports that require upper body strength and power, such as boxing, swimming, or tennis.";
                        break;
                    case "oval":
                        recommendedSports = "Sports that provide low-impact cardiovascular exercise and incorporate resistance training and core exercises, such as swimming, Pilates, or yoga.";
                        break;
                    case "diamond":
                        recommendedSports = "Sports that emphasize core strength and stability, such as Pilates, yoga, or tai chi, and require cardiovascular endurance and total body strength, such as rowing, hiking, or circuit training.";
                        break;
                    default:
                        recommendedSports = "Invalid body shape type. Please input a valid body shape type.";
                        break;
                }
            } else if (gender.toLowerCase() === 'female') {
                switch (bodyShapeType.toLowerCase()) {
                    case "pear":
                        recommendedSports = "Sports that involve lower body strength and power, such as squats, lunges, or dancing.";
                        break;
                    case "inverted triangle":
                        recommendedSports = "Sports that require upper body strength and power, such as boxing, swimming, or tennis.";
                        break;
                    case "oval":
                        recommendedSports = "Sports that provide low-impact cardiovascular exercise and incorporate resistance training and core exercises, such as Swimming, Pilates, Cycling or Yoga.";
                        break;
                    case "hourglass":
                        recommendedSports = "Sports that involve a mix of cardiovascular exercise and resistance training, such as circuit training, weightlifting, or dancing.";
                        break;
                    case "rhomboid":
                        recommendedSports = "Sports that emphasize core strength and stability, such as Pilates, yoga, or tai chi, and require cardiovascular endurance and total body strength, such as rowing, hiking, or circuit training.";
                        break;
                    default:
                        recommendedSports = "Invalid body shape type. Please input a valid body shape type.";
                        break;
                }
            }
            res.send({ recommendedSports });
        })
        .catch(error => {
            // Handle the error
            console.error(error);
        });
}