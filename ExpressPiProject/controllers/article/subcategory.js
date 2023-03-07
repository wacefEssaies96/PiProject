const SubCategory = require('../../models/article/subcategory');

// Create and Save a new SubCategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SubCategory
    const newSubCategory = new SubCategory({
        title: req.body.title,
        slug: req.body.slug
    });

    // Save SubCategory in the database
    newSubCategory.save()
        .then(data => {
            res.send({ message: "SubCategory was created successfully.", data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SubCategory."
            });
        });
}

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    SubCategory.find()
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

// Find a single SubCategory with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    SubCategory.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found SubCategory with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving SubCategory with id=" + id });
        });
};

// Update a SubCategory by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    SubCategory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update SubCategory with id=${id}. Maybe SubCategory was not found!`
                });
            } else res.send({ message: "SubCategory was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating SubCategory with id=" + id
            });
        });
};

// Delete a SubCategory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    SubCategory.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete SubCategory with id=${id}. Maybe SubCategory was not found!`
                });
            } else {
                res.send({
                    message: "SubCategory was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete SubCategory with id=" + id
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    SubCategory.deleteMany()
        .then(data => {
            res.send({
                message: `${data.deletedCount} SubCategory(s) were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Categories."
            });
        });
};