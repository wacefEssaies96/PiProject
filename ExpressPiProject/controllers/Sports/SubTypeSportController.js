const SportSubType = require("../../models/Sports/SubTypeSportModel");
const SportType = require("../../models/Sports/SportType")

// Create and Save a new SportSubType

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SportSubType

    const sportSubTypesList = await SportSubType.find({ title: req.body.title })

    if (sportSubTypesList.length == 0) {
        var newSportSubType = new SportSubType({
            title: req.body.title,
            demoVideo: req.body.demoVideo,
            advantages: req.body.advantages,
            limits: req.body.limits,
            slug: req.body.slug,
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
    SportSubType.findById(req.params.id)
        .then(async (sub) => {
            sub.title = req.body.title;
            sub.demoVideo = req.body.demoVideo;
            sub.advantages = req.body.advantages;
            sub.limits = req.body.limits;
            sub.slug = req.body.slug;

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