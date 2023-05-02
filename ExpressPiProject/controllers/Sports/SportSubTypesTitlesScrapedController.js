const cron = require('node-cron')
var express = require('express')
const cheerio = require("cheerio")
const axios = require("axios")
const SportSubTypesScrapedTitles = require("../../models/Sports/SportSubTypesScrappedTitles")
const SportSubType = require("../../models/Sports/SubTypeSportModel")

const url = "https://www.leadershipandsport.com/types-of-sports/";

cron.schedule(" 0 0 * * 0 ", async (req, res) => {
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

                var newSportSubTypeTitles = new SportSubTypesScrapedTitles({
                    titlesScrapped: {
                        sportSubTypes1,
                        sportSubTypes2,
                        sportSubTypes3,
                        sportSubTypes4
                    }
                })
                newSportSubTypeTitles.save()
                    .then(data => console.log("data"))
            })
            .catch(e => console.log("e"))
    } catch (err) {
        console.error("err");
    }
})

//get all SportSubTypesTitlesScraped
exports.findAll = (req, res) => {
    SportSubTypesScrapedTitles.find()
        .then(subtypes => res.json(subtypes))
        .catch(err => res.status(400).json('Error: ' + err));
}

//scrapping dynamically sport subtypes definitions
const url1 = "https://olympics.com/en/sports/surfing/"

cron.schedule("* */23 * * *", async (req, res) => {
    try {
        await axios.get(url1)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const listItems = $(".history-of__body p");
                const history = [];
                listItems.each((idx, el) => {
                    const h = $(el).text();
                    history.push(h);
                });
                var newSportSubTypeTitles = new SportSubTypesScrapedTitles({
                    historyScrapped: {
                        history
                    }
                })
                newSportSubTypeTitles.save()
                    .then(data => console.log("data"))
            })
            .catch(e => console.log("e"))
    } catch (err) {
        console.error("err");
    }
})

exports.getYourMorphologyType = (req, res) => {
    let bodyShape = ""
    if (req.body.gender === "Male") {
        if (req.body.shoulderCircumference >= 37 && req.body.shoulderCircumference <= 42 &&
            req.body.waistCircumference >= 81 && req.body.waistCircumference <= 86 &&
            req.body.hipCircumference >= 91 && req.body.hipCircumference <= 97 &&
            req.body.height >= 175 && req.body.height <= 179 &&
            req.body.weight >= 67 && req.body.weight <= 72 &&
            req.body.age >= 18 && req.body.age <= 25) {
            bodyShape = "Pear"
        } else if (req.body.shoulderCircumference >= 43 && req.body.shoulderCircumference <= 48 &&
            req.body.waistCircumference >= 91 && req.body.waistCircumference <= 96 &&
            req.body.hipCircumference >= 97 && req.body.hipCircumference <= 102 &&
            req.body.height >= 160.02 && req.body.height <= 190.5 &&
            req.body.weight >= 66.25 && req.body.weight <= 96.83 &&
            req.body.age >= 18 && req.body.age <= 65) {
            bodyShape = "Apple"
        } else if (req.body.shoulderCircumference >= 41 && req.body.shoulderCircumference <= 46 &&
            req.body.waistCircumference >= 76 && req.body.waistCircumference <= 81 &&
            req.body.hipCircumference >= 94 && req.body.hipCircumference <= 99 &&
            req.body.height >= 175 && req.body.height <= 179 &&
            req.body.weight >= 68 && req.body.weight <= 85 &&
            req.body.age >= 25 && req.body.age <= 35) {
            bodyShape = "Inverted Triangle"
        } else if (req.body.shoulderCircumference >= 43 && req.body.shoulderCircumference <= 47 &&
            req.body.waistCircumference >= 86 && req.body.waistCircumference <= 91 &&
            req.body.hipCircumference >= 99 && req.body.hipCircumference <= 104 &&
            req.body.height >= 178 && req.body.height <= 186 &&
            req.body.weight >= 70 && req.body.weight <= 90 &&
            req.body.age >= 25 && req.body.age <= 45) {
            bodyShape = "Rectangle"
        } else if (req.body.shoulderCircumference >= 37 && req.body.shoulderCircumference <= 42 &&
            req.body.waistCircumference >= 81 && req.body.waistCircumference <= 86 &&
            req.body.hipCircumference >= 91 && req.body.hipCircumference <= 97 &&
            req.body.height >= 162.56 && req.body.height <= 181.44 &&
            req.body.weight >= 69 && req.body.weight <= 82.56 &&
            req.body.age >= 25 && req.body.age <= 65) {
            bodyShape = "Hourglass"
        } else if (req.body.shoulderCircumference >= 30 && req.body.shoulderCircumference <= 34 &&
            req.body.waistCircumference >= 61 && req.body.waistCircumference <= 66 &&
            req.body.hipCircumference >= 86 && req.body.hipCircumference <= 91 &&
            req.body.height >= 147 && req.body.height <= 157 &&
            req.body.weight >= 40 && req.body.weight <= 47 &&
            req.body.age >= 20 && req.body.age <= 35) {
            bodyShape = "Diamond"
        } else if (req.body.shoulderCircumference >= 31 && req.body.shoulderCircumference <= 35 &&
            req.body.waistCircumference >= 66 && req.body.waistCircumference <= 71 &&
            req.body.hipCircumference >= 91 && req.body.hipCircumference <= 96 &&
            req.body.height >= 149 && req.body.height <= 159 &&
            req.body.weight >= 45 && req.body.weight <= 50 &&
            req.body.age >= 20 && req.body.age <= 40) {
            bodyShape = "Oval"
        } else {
            console.log("Enter correct values please")
        }
    }
    res.send(bodyShape)
} 