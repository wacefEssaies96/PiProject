const TypeSport = require("../../models/Sports/SportType")
const SubTypeSport = require("../../models/Sports/SubTypeSportModel")
const slug = require('slug')

// Create and Save a new SportType

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.sportSubType) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    for(let i=0; i<req.body.sportSubType.length; i++){
        let response = await SubTypeSport.find({ title: req.body.sportSubType[i].title });
        if (response.length===0) {
            res.status(404).send({ message: "TypeSubSport not found!" });
        }
    }

    const sportTypesList = await TypeSport.find({title : req.body.title})

    const sportSubTypesList=[]

    if(sportTypesList.length==0){

        for(let i=0; i<req.body.sportSubType.length; i++){
            let response = await SubTypeSport.findOne({ title: req.body.sportSubType[i].title });
            sportSubTypesList.push(response)
        }
        console.log(sportSubTypesList)

        var newSportType = new TypeSport({
            title: req.body.title,
            sportSubType : sportSubTypesList,
            slug: slug(req.body.title),
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
}

exports.findAll = async (req, res) => {
    try {
      const r= await TypeSport.find()
      res.status(200).send(r);
    } catch (error) {
      res.status(500).send("couldn't get sportTypes");
    }
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
exports.updateSportType = async (req, res) => {
    const sportSubTypesList=[]
    for(let i=0; i<req.body.sportSubType.length; i++){
        let response = await SubTypeSport.findOne({ title: req.body.sportSubType[i].title });
        sportSubTypesList.push(response)
    }
    TypeSport.findById(req.params.id)
    .then(sportType => {
        sportType.title = req.body.title;
        sportType.sportSubType = sportSubTypesList;
        sportType.slug = req.body.slug;

        sportType.save()
        .then(() => res.json('sport type updated!'))
        .catch(err => res.status(400).json('Error1: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
}

//get sport type by title
exports.findSportTypeByTitle = (req, res) => {
    TypeSport.findOne({title : req.params.title})
    .then(sportType => res.json(sportType))
    .catch(err => res.status(400).json('Error: '+ err));
}