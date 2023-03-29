const TypeSport = require("../../models/Sports/SportType")
const SubTypeSport = require("../../models/Sports/SubTypeSportModel")
const slug = require('slug')
const axios = require("axios");
const cheerio = require("cheerio");

//sport types titles
const url = "https://www.leadershipandsport.com/types-of-sports/";

exports.webScrapingSportTypesTitle = async (req, res) => {
    try {
        await axios.get(url)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const listItems = $(".nv-content-wrap ul li");
                const sportTypes = [];
                listItems.each((idx, el) => {
                    const sportType = $(el).text();
                    if (idx < 4) {
                        sportTypes.push(sportType);
                    }
                });
                res.send(sportTypes);
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

//each sport type advantages
const url1 = "https://onenationjiujitsu.com/advantages-participating-individual-sport/";

exports.advIndiv = async (req, res) => {
    try {
        await axios.get(url1)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const advTitle = $(".post-content h4");
                const advParag = $(".post-content p");
                const tArr = [];
                const pArr = [];
                advTitle.each((idx, el) => {
                    const t = $(el).text();
                    tArr.push(t);
                });
                advParag.each((idx, el) => {
                    const p = $(el).text();
                    if (idx > 1 && idx < 6) {
                        pArr.push(p);
                    }
                });
                res.send({ titles: tArr, paragraphes: pArr });
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

const url2 = "https://fitpeople.com/fitness/the-best-benefits-of-doing-sports-with-a-partner/";

exports.advPartner = async (req, res) => {
    try {
        await axios.get(url2)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const advTitle = $("h2.c--main-700");
                const advParag = $("p.c--grey-neutral-800");
                const tArr = [];
                const pArr = [];
                advTitle.each((idx, el) => {
                    const t = $(el).text();
                    tArr.push(t);
                });
                advParag.each((idx, el) => {
                    const p = $(el).text();
                    if (idx > 0 && idx < 18) {
                        pArr.push(p);
                    }
                });
                res.send({ titles: tArr, paragraphes: pArr });
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

const url3 = "https://sisd.ae/what-are-the-benefits-of-team-sports/";

exports.advTeam = async (req, res) => {
    try {
        await axios.get(url3)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const advTitle = $(".elementor-widget-container h2");
                const advParag = $(".elementor-widget-container p");
                const tArr = [];
                const pArr = [];
                advTitle.each((idx, el) => {
                    const t = $(el).text();
                    if (idx > 0 && idx < 7) {
                        tArr.push(t);
                    }
                });
                advParag.each((idx, el) => {
                    const p = $(el).text();
                    if (idx > 6 && idx < 16) {
                        pArr.push(p);
                    }
                });
                res.send({ titles: tArr, paragraphes: pArr });
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

const url4 = "https://limitlesspursuits.com/extreme-sports/4-compelling-reasons-why-you-should-take-up-an-extreme-sport/"

exports.advExtreme = async (req, res) => {
    try {
        await axios.get(url4)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const advTitle = $(".article-content h2");
                const advParag = $(".article-content p");
                const tArr = [];
                const pArr = [];
                advTitle.each((idx, el) => {
                    const t = $(el).text();
                        tArr.push(t);
                });
                advParag.each((idx, el) => {
                    const p = $(el).text();
                    const i = [0,1,3,4,6,7,9,10,12,13]
                    if (!i.includes(idx)) {
                        pArr.push(p);
                    }
                });
                res.send({ titles: tArr, paragraphes: pArr });
            })
            .catch(e => console.log(e))
    } catch (err) {
        console.error(err);
    }
}

// Create and Save a new SportType

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.sportSubType || !req.body.advantages) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    for (let i = 0; i < req.body.sportSubType.length; i++) {
        let response = await SubTypeSport.find({ title: req.body.sportSubType[i].title });
        if (response.length === 0) {
            res.status(404).send({ message: "TypeSubSport not found!" });
        }
    }

    const sportTypesList = await TypeSport.find({ title: req.body.title })

    const sportSubTypesList = []

    if (sportTypesList.length == 0) {

        for (let i = 0; i < req.body.sportSubType.length; i++) {
            let response = await SubTypeSport.findOne({ title: req.body.sportSubType[i].title });
            sportSubTypesList.push(response)
        }

        var newSportType = new TypeSport({
            title: req.body.title,
            advantages: req.body.advantages,
            sportSubType: sportSubTypesList,
            slug: slug(req.body.title),
        })

        newSportType.save()
            .then(data => res.send(data))
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Sport type!"
                });
            });
    }
    else {
        res.status(500).json('Error: This sport type title is already existing !')
    }
}

exports.findAll = async (req, res) => {
    try {
        const r = await TypeSport.find()
        res.status(200).send(r);
    } catch (error) {
        res.status(500).send("couldn't get sportTypes");
    }
}


//get SportType by id
exports.findSportTypeById = (req, res) => {
    TypeSport.findById(req.params.id)
        .then(sportType => res.json(sportType))
        .catch(err => res.status(400).json('Error: ' + err));
}

//delete a SportType by id
exports.deleteSportType = (req, res) => {
    TypeSport.findByIdAndDelete(req.params.id)
        .then(() => res.json('sport type deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

//update a SportType 
exports.updateSportType = async (req, res) => {
    const sportSubTypesList = []
    for (let i = 0; i < req.body.sportSubType.length; i++) {
        let response = await SubTypeSport.findOne({ title: req.body.sportSubType[i].title });
        sportSubTypesList.push(response)
    }
    TypeSport.findById(req.params.id)
        .then(sportType => {
            sportType.title = req.body.title;
            sportType.advantages = req.body.advantages;
            sportType.sportSubType = sportSubTypesList;
            sportType.slug = slug(req.body.title);

            sportType.save()
                .then(() => res.json('sport type updated!'))
                .catch(err => res.status(400).json('Error1: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

//get sport type by title
exports.findSportTypeByTitle = (req, res) => {
    TypeSport.findOne({ title: req.params.title })
        .then(sportType => res.json(sportType))
        .catch(err => res.status(400).json('Error: ' + err));
}