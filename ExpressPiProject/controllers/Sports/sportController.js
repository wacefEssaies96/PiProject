const Sport = require("../../models/Sports/sport");

// Create and Save a new Sport

exports.create = (req, res) => {
    // Validate request
    if (!req.body.sportType) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Sport
    const newSport = new Sport({
        sportType: req.body.sportType,
        demoVideo: req.body.demoVideo,
        advantages: req.body.advantages,
        limits: req.body.limits,
        slug: req.body.slug,
    });

    // Save Sport in the database
    newSport
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

//get all sports 
exports.findAll = (req, res) => {
    Sport.find()
    .then(sports => res.json(sports))
    .catch(err => res.status(400).json('Error: '+ err));
}

//get sport by id
exports.findSportById = (req, res) => {
    Sport.findById(req.params.id)
    .then(sport => res.json(sport))
    .catch(err => res.status(400).json('Error: '+ err));
}

//delete a sport by id
exports.deleteSport = (req, res) => {
    Sport.findByIdAndDelete(req.params.id)
    .then(() => res.json('sport deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}

//update a sport 
exports.updateSports = (req, res) => {
    Sport.findById(req.params.id)
    .then(sport => {
        sport.sportType = req.body.sportType;
        sport.demoVideo = req.body.demoVideo;
        sport.advantages = req.body.advantages;
        sport.limits = req.body.limits;
        sport.slug = req.body.slug;

        sport.save()
        .then(() => res.json('sport updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
}