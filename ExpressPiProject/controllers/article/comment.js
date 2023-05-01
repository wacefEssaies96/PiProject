const Comment = require('../../models/article/comment');
const User = require('../../models/Users/user');
const Article = require('../../models/article/article');


// Create and Save a new comment
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const userId = req.body.userId;
    const articleId = req.body.articleId

    const article = await Article.findById(articleId);
    const user = await User.findById(userId);

    // Create a new comment
    const newComment = new Comment({
        user: user,
        article: article,
        content: req.body.content
    });

    // Save comment in the database
    newComment.save()
        .then(data => {
            res.send({ message: "Comment was created successfully.", data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the comment."
            });
        });

}

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {

    const articleId = req.params.articleid
    // { 'article._id': articleId }
    Comment.find({ article: articleId })
    .populate('user')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching data."
            });
        })
}


// Update a Category by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found!`
                });
            } else res.send({ message: "Category was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Comment.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete comment with id=${id}. Maybe comment was not found!`
                });
            } else {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete comment with id=" + id
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany()
        .then(data => {
            res.send({
                message: `${data.deletedCount} Category(s) were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Categories."
            });
        });
};