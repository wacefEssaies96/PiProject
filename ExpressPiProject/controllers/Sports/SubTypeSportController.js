const SportSubType = require("../../models/Sports/SubTypeSportModel")
const SportType = require("../../models/Sports/SportType")
const slug = require('slug')
const axios = require("axios");
const cheerio = require("cheerio");
const usetube = require('usetube')

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
//AIzaSyCwEg_MwpL14oSFRdJJG3X5KQ7z5C8ZETs
//scraping youtube videos
exports.youtubeVideos = async (req, res)=> {
    // const data = await usetube.searchVideo('Coding Shiksha')
    // console.log(data)
    await axios.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&key=AIzaSyCwEg_MwpL14oSFRdJJG3X5KQ7z5C8ZETs")
    .then((result)=>{
        return result;
    })
    .then((data)=>{
        console.log(data);
        const videos = data.items
        console.log(videos)
        data.items.forEach(video => console.log(video.snippet.title))
    })
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