const SportSubType = require("../../models/Sports/SubTypeSportModel");

// Create and Save a new SportSubType

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a SportSubType

    const sportSubTypesList = await SportSubType.find({title : req.body.title})

    if(sportSubTypesList.length==0){
        var newSportSubType = new SportSubType({
            title : req.body.title,
            demoVideo: req.body.demoVideo,
            advantages: req.body.advantages,
            limits: req.body.limits,
            slug: req.body.slug,
        })
        newSportSubType.save()
        .then(data=>res.send(data))
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
    .catch(err => res.status(400).json('Error: '+ err));
}

//get SportSubType by id
exports.findSportSubTypeById = (req, res) => {
    SportSubType.findById(req.params.id)
    .then(sportSubType => res.json(sportSubType))
    .catch(err => res.status(400).json('Error: '+ err));
}

//delete a SportSubType by id
exports.deleteSportSubType = (req, res) => {
    SportSubType.findByIdAndDelete(req.params.id)
    .then(() => res.json('sport sub type deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}

//update a SportSubType 
exports.updateSportSubType = (req, res) => {
    SportSubType.findById(req.params.id)
    .then(sportType => {
        sportType.title = req.body.title;
        sportType.demoVideo = req.body.demoVideo;
        sportType.advantages = req.body.advantages;
        sportType.limits = req.body.limits;
        sportType.slug = req.body.slug;

        sportType.save()
        .then(() => res.json('sport sub type updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
}