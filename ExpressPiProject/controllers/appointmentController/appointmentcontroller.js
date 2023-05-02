const app = require('../../app');
const User = require('../../models/Users/user');
const appointmentdb= require('../../models/appointment/appointment')
const moment = require('moment');



exports.create = async (req, res) => {
  // Valider la requête
  if (!req.body) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    return;
  }


  var u = []
  // Créer un nouvel objet rendez-vous
  if(req.body.user!=null)
  {
    u= await User.findById(req.body.user)
  }
  const appointment = new appointmentdb({
    Date: req.body.Date,
    Hour: req.body.Hour,
    Duration: req.body.Duration,
    user: u,
    reserved: false
  })
  // Enregistrer le rendez-vous dans la base de données
  appointment.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Une erreur s'est produite lors de l'ajout d'un nouveau rendez-vous" });
    });
}
exports.find=(req,res)=>{
    appointmentdb.find()
    .then(appointment=>{
    res.send(appointment)})
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while trying to retieve data"})
    })
}

// exports.update=(req,res)=>{
//     // if(!req.body){
//     //     return res
//     //     .status(400)
//     //     .send({message:"Data to update cannot be empty !"})
//     // }
//     const id=req.params.id;
//     const updatedAppointment = {
//         Date: moment(req.body.Date + " " + req.body.Hour, "DD/MM/YY HH:mm").toDate(),
//         Hour: req.body.Hour,
//         Duration: req.body.Duration,
//       };
//     appointmentdb.findByIdAndUpdate(id,updatedAppointment,{ new: true })
//     .then(data=>{
//         if(!data){
//             res.status(404).send({message:`Cannot Update appointment with ${id}.May be the appointment is not found `})
//         }else{
//             res.send(data)
//         }
//     })
//     .catch(err=>{res.status(500).send({message:"Error while updating the appointment"})})

//  }


exports.update = (req, res) => {
    const id = req.params.id;
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty !"})
    }
  
    const updatedAppointment = {
      Date: moment(req.body.Date, "DD/MM/YY ").toDate(),
      Hour: req.body.Hour,
      Duration: req.body.Duration,
    };
  
    appointmentdb
      .findByIdAndUpdate(id,updatedAppointment,{ new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Impossible de mettre à jour le rendez-vous avec l'identifiant ${id}. Peut-être que le rendez-vous n'a pas été trouvé.`,
          });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        console.log(err); // Ajout d'un console.log pour afficher l'erreur dans la console du serveur
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la mise à jour du rendez-vous.",
        });
      });
  };
  exports.delete=(req,res)=>{
    const id=req.params.id;
   appointmentdb.findByIdAndRemove(id)
    .then(data=>{if(!data){
           res.status(404).send({message:`Cannot delete using ${id}.May be the id is wrong !`})
    } else{
       res.send({message: "Appointment was deleted successfully !"}) 
    }
   

    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete appointment with id=" + id
        });
    });
}

exports.findAppointmentById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const appointment = await appointmentdb.findById(id);
  
      if (!appointment) {
        return res.status(404).send({ message: "appointment not found" });
      }
  
      res.send(appointment);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };
  
  exports.deleteAll = (req, res) => {
    appointmentdb.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} appointments were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while removing all appointments."
        });
      });
  };

  exports.findDoctor = async (req, res) => {
    const id = req.params.id;
  
    try {
      const appointment = await appointmentdb.findOne({'user':id});
  
      if (!appointment) {
        return res.status(404).send({ message: "appointment not found" });
      }
  
      res.send(appointment);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };

  exports.finda = async (req, res) => {
    const id = req.params.id;
  
    try {
      const appointment = await appointmentdb.findOne({'reserved':false});
  
      if (!appointment) {
        return res.status(404).send({ message: "appointment not found" });
      }
  
      res.send(appointment);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };
