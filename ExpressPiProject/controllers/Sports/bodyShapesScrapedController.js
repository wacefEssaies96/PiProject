const cheerio = require("cheerio")
const axios = require("axios")
const BodyShapesScraped = require("../../models/Sports/BodyShapesScrapedModel")

const url = "https://www.medicalnewstoday.com/articles/body-types#male-shapes";

exports.storeData = async (req, res) => {
    try {
        await axios.get(url)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const listItems = $(".css-0 ul li strong");
                const bodyType = [];
                listItems.each((idx, el) => {
                    const bodyShape = $(el).text();
                    bodyType.push(bodyShape)
                });

                const listItems2 = $(".css-0 ul li");
                const bodyTypeDesc = [];
                listItems2.each((idx, el) => {
                    const bodyShape = $(el).text();
                    console.log(bodyShape);
                    bodyTypeDesc.push(bodyShape)
                });

                let bodyTypeDescSlice = bodyTypeDesc.slice(0, 8)

                let i = 0
                let table = []
                while (i < bodyType.length) {
                    table.push({ [bodyType[i]]: bodyTypeDescSlice[i] })
                    i++
                }

                var newBodyShapeScraped = new BodyShapesScraped({
                    description: table
                })

                newBodyShapeScraped.save()
                    .then(data => res.send(data))
            })
            .catch(e => res.send(e))
    } catch (err) {
        res.send(err);
    }
}

//get all BodyShapesScraped
exports.findAll = (req, res) => {
    BodyShapesScraped.find()
        .then(bodyShape => res.json(bodyShape))
        .catch(err => res.status(400).json('Error: ' + err));
}

let url1 = "https://theconceptwardrobe.com/build-a-wardrobe/determine-your-body-shapes"

exports.storeImagesUrls = async (req, res) => {
    try {
        await axios.get(url1)
            .then(urlRes => {
                const $ = cheerio.load(urlRes.data);
                const imageUrls = [];
                $('.image-52').each((index, element) => {
                    const imageUrl = $(element).attr('src');
                    imageUrls.push(imageUrl);
                });

                const listItems = $(".article-body-wrapper h3");
                const titles = [];
                listItems.each((idx, el) => {
                    const t = $(el).text();
                    titles.push(t)
                });
                let titlesSlice = titles.slice(4,9)

                let i = 0
                let table = []
                while (i < titlesSlice.length) {
                    table.push({ [titlesSlice[i]]: imageUrls[i] })
                    i++
                }

                var newBodyShapeScraped = new BodyShapesScraped({
                    image: table
                })

                newBodyShapeScraped.save()
                    .then(data => res.send(data))
            })
            .catch(e => res.send(e))
    } catch (err) {
        res.send(err);
    }
}