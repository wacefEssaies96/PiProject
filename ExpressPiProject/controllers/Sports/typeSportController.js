const SportType = require("../../models/Sports/typeSportModel");

// Create and Save a new SportType

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SportType
    const newSportType = new SportType({
        title : req.body.title,
        slug: req.body.slug,
    });

    // Save SportType in the database
    newSportType
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SportType."
            });
        });
};

//get all SportType 
exports.findAll = (req, res) => {
    SportType.find()
    .then(types => res.json(types))
    .catch(err => res.status(400).json('Error: '+ err));
}

//get SportType by id
exports.findSportTypeById = (req, res) => {
    SportType.findById(req.params.id)
    .then(sportType => res.json(sportType))
    .catch(err => res.status(400).json('Error: '+ err));
}

//delete a SportType by id
exports.deleteSportType = (req, res) => {
    SportType.findByIdAndDelete(req.params.id)
    .then(() => res.json('sport type deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}

//update a SportType 
exports.updateSportType = (req, res) => {
    SportType.findById(req.params.id)
    .then(sportType => {
        sportType.title = req.body.title;
        sportType.slug = req.body.slug;

        sportType.save()
        .then(() => res.json('sport type updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
}