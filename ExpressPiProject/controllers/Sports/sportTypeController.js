const TypeSport = require("../../models/Sports/SportType");
const SubTypeSport = require("../../models/Sports/SubTypeSportModel")

// Create and Save a new SportType

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.SubTypeSport) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let response = await SubTypeSport.find({ title: req.body.sportSubType.title });
    if (response === null) {
        res.status(404).send({ message: "TypeSubSport not found!" });
    }

    const sportTypesList = await TypeSport.find({title : req.body.title})

    if(sportTypesList.length==0){
        var newSportType = new TypeSport({
            title: req.body.title,
            sportSubType : req.body.sportSubType,
            slug: req.body.slug,
        })
        newSportType.save()
        .then(data=>res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sport type!"
            });
        });
    } 
    else {
        res.status(500).json('Error: This sport type title is already existing !')
    }
};

//get all SportTypes 
exports.findAll = (req, res) => {
    TypeSport.find()
    .then(sportTypes => res.json(sportTypes))
    .catch(err => res.status(400).json('Error: '+ err));
}

//get SportType by id
exports.findSportTypeById = (req, res) => {
    TypeSport.findById(req.params.id)
    .then(sportType => res.json(sportType))
    .catch(err => res.status(400).json('Error: '+ err));
}

//delete a SportType by id
exports.deleteSportType = (req, res) => {
    TypeSport.findByIdAndDelete(req.params.id)
    .then(() => res.json('sport type deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}

//update a SportType 
exports.updateSportType = (req, res) => {
    TypeSport.findById(req.params.id)
    .then(sportType => {
        sportType.title = req.body.title;
        sportType.sportSubType = req.body.sportSubType;
        sportType.slug = req.body.slug;

        sportType.save()
        .then(() => res.json('sport type updated!'))
        .catch(err => res.status(400).json('Error1: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
}