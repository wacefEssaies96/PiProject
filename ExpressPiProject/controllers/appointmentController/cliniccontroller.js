const clinics= require("../../models/appointment/clinics");
//const disease= require("../../models/appointment/diseasejs");
const services=require('../../models/appointment/servicesjs');
// create and save  a naw clinic 

exports.create= async(req,res)=>{
    if(!req.body.Name || !req.body.service){
        res.status(400).send({message: "Content cannot be empty !"});
        return; 
    }

let response= await services.find({category: req.body.service.category});
if(response== null){
    res.status(404).send({message: "Services not found!"});
}
/*let responsee= await disease.find({name: req.body.disease.name});
if(responsee== null){
    res.status(404).send({message:"disease is not found !"});

}*/

const cliniclist= await clinics.find({Name: req.body.Name})
if(cliniclist.length==0){
    var newclinicList= new clinics({
        Name: req.body.Name,
        services: req.body.services,
        phone_number: req.body.phone_number,
        address: req.body.address

    })

    newclinicList.save()
    .then(data=> res.send(data))
    .catch(err => {
        res.status(500).send({message: err.message  || 'some errors occured while creating the clinic list'});
    });
}
else{
    res.status(500).json('Error: This clinc is already existing !')
}
}; 

//get all clinics

exports.findAll =(req,res) => {
    clinics.find()
    .then(clinics=>res.json(clinics))
    .catch(err=> res.status(400).json('Error: ' + err));

}

// get clinics by id 
exports.findClinicsById =(req, res)=>{
     clinics.findById(req.params.id)
     .then(clinics => res.json(clinics))
     .catch(err=> res.status(400).json('Error :' +err));
}
exports.deleteClinicsById =(req, res)=>{
    clinics.findByIdAndDelete(req.params.id)
    .then(clinics => res.json(clinics))
    .catch(err=> res.status(400).json('Error :' +err));
}