const Article = require('../../models/article/article');
const Category = require('../../models/article/category');

// Create and Save a new Article
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let response = await Category.findOne({ title: req.body.category.title });
    if (response === null) {
        res.status(404).send({ message: "Category not found." });
    }
    else {
        if (!await response.subcategory.find(element => element.title == req.body.subcategory.title)) {
            res.status(404).send({ message: "SubCategory not found." });
        } else {
            // Create a article
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                slug: req.body.slug,
                category: req.body.category,
                subcategory: req.body.subcategory
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
            })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching data."
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
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

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
                message:
                    err.message || "Some error occurred while removing all Articles."
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
                message:
                    err.message || "Some error occurred while retrieving Articles."
            });
        });
};