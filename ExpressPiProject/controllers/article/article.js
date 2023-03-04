const Article = require('../../models/article/article');
const Category = require('../../models/article/category');
const cheerio = require('cheerio');
const axios = require('axios');
const slug = require('slug');

// Create and Save a new Article
exports.create = async (req, res) => {

    const cat = JSON.parse(req.body.category)
    const subcat = JSON.parse(req.body.subcategory)

    // Validate request
    if (!req.body.title || !req.body.content || !req.body.category || !req.body.subcategory || !req.body.description || !req.body.thumbnail) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let response = await Category.findOne({ title: cat.title });
    if (response === null) {
        res.status(404).send({ message: "Category not found." });
        return;
    }
    else {
        if (!await response.subcategory.find(element => element.title == subcat.title)) {
            res.status(404).send({ message: "SubCategory not found." });
            return;
        } else {
            // Create a article
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                description: req.body.description,
                thumbnail: req.file.path,
                status: 'draft',
                slug: slug(req.body.title),
                category: cat,
                subcategory: subcat
            });
            // Save article in the database
            newArticle.save()
                .then(data => {
                    res.send({ message: "Article was created successfully.", data });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the article."
                    });
                });
        }
    }
}

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    Article.find()
        .then(
            data => {
                res.send(data);
                return;
            })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching data."
            });
        })
}

// Find a single article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Article with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Article with id=" + id });
        });
};

// Update a article by the id in the request
exports.update = async (req, res) => {
    const cat = JSON.parse(req.body.category);
    const subcat = JSON.parse(req.body.subcategory);
    req.body.category = cat;
    req.body.subcategory = subcat;

    if (!req.body.title || !req.body.content || !req.body.category || !req.body.subcategory || !req.body.description || !req.body.thumbnail) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    if (req.file)
        req.body.thumbnail = req.file.path

    let response = await Category.findOne({ title: cat.title });
    if (response === null) {
        res.status(404).send({ message: "Category not found." });
        return;
    }
    else {
        if (!await response.subcategory.find(element => element.title == subcat.title)) {
            res.status(404).send({ message: "SubCategory not found." });
            return;
        } else {
            const id = req.params.id;
            Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                            message: `Cannot update Article with id=${id}. Maybe Article was not found!`
                        });
                    } else res.send({ message: "Article was updated successfully." });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Article with id=" + id
                    });
                });
        }
    }
};

// Delete a article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            } else {
                res.send({
                    message: "Article was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" + id
            });
        });
};

// Delete all articles from the database.
exports.deleteAll = (req, res) => {
    Article.deleteMany()
        .then(data => {
            res.send({
                message: `${data.deletedCount} Article(s) were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Articles."
            });
        });
};

// Find all published articles
exports.findAllPublished = (req, res) => {
    Article.find({ status: 'published' })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Articles."
            });
        });
};

//  Scrap data from wikipedia
exports.scrapWikipedia = (req, res) => {
    axios.get("https://en.wikipedia.org/wiki/National_Basketball_Association")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            let title = $("#firstHeading").text();
            let teams = [];
            for (let i = 0; i < 30; i++) {
                teams.push($('td > b > a', html)[i].attribs.title);
            }
            console.log(title);
            console.log(teams);
            res.send(teams);
        })
}
//  Scrap articles from wired.com
exports.scrapFromWired = async (req, res) => {
    //  Search articles by subcategory sorted by score
    const url = `https://www.wired.com/search/?q=${req.params.subcategory}&sort=score+desc`;
    const articles = [];
    const response = await axios.get(url)
    let $ = cheerio.load(response.data);
    $('.klkoMz.klkoMz.summary-item--has-border').each((i, el) => {
        const title = $(el).find('h3').text();
        const excerpt = $(el).find('p').text();
        const link = $(el).find('a').attr('href');
        articles.push({
            title: title,
            excerpt: excerpt,
            link: link
        });
    });
    //  Extract texts from the most rated article and send it to next js
    const a = await axios.get('https://www.wired.com' + articles[0].link)
    $ = cheerio.load(a.data)
    let texts = ''
    $('.paywall').each((i, el) => {
        const text = $(el).text();
        if (text.length > 200)
            texts = texts + ' ' + text
    });
    res.send({ text: texts })
}