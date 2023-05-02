const app = require('../../app');
const User = require('../../models/Users/user');
const appointmentdb= require('../../models/appointment/appointment')
const moment = require('moment');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail')
// API_KEY = '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'
// sgMail.setApiKey(API_KEY)



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
    reserved: false,
    fullname : u.fullname,
    speciality : u.speciality,
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
    Date: moment(req.body.Date, 'YYYY-MM-DD').toDate(),
    Hour: req.body.Hour,
    Duration: req.body.Duration,
  };

  appointmentdb
    .findByIdAndUpdate(id, updatedAppointment, {new: true})
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

  // exports.findDoctor = async (req, res) => {
  //   const id = req.params.id;
  
  //   try {
  //     const appointment = await appointmentdb.findOne({'user':id});
  
  //     if (!appointment) {
  //       return res.status(404).send({ message: "appointment not found" });
  //     }
  
  //     res.send(appointment);
  //   } catch (err) {
  //     res.status(500).send({ message: "Internal server error" });
  //   }
  // };


  exports.sendMailAppointment = async (req, res) => {
    try {
      const { email,message } = req.body;
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(404).send({ error: 'User email not found !' })
      }
      sgMail.setApiKey(API_KEY)
      const msg = {
      to: email,
      from: 'haifa.arouri@esprit.tn',
      subject: 'Appointment Booked',
      html: message,
      };
      try {


      await sgMail.send(msg);
      return res.status(200).send({ message: 'Send successfully ' });

      } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'error '+error });

      }
  }catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'error '+error });

    }
  }
  exports.NotReserfind = async (req, res) => {
  
    try {
      const appointment = await appointmentdb.find({'reserved': false });
  
      if (!appointment || appointment.length === 0) {
        return res.status(404).send({ message: "appointment not found" });
      }
  
      res.send(appointment);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };

  exports.finda = async (req, res) => {
    const id= req.params.id;
  
    try {
      const appointment = await appointmentdb.find({'user': id });
  
      if (!appointment || appointment.length === 0) {
        return res.status(404).send({ message: "appointment not found" });
      }
  
      res.send(appointment);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  };

  // exports.displayappointmentslist= async(req, res) => {

  // }

  exports.findns = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id).select({ fullname: 1, speciality: 1, _id: 0 });
  
      const appointments = await appointmentdb.find({'user': id});
  
      for (const appointment of appointments) {
        const fullName = user.fullname;
        const speciality = user.speciality;
  
        await appointmentdb.updateOne({ _id: appointment._id }, { $set: { fullname: fullName, speciality: speciality } });
      }
  
      res.status(200).json({ message: "Les rendez-vous ont été mis à jour avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour des rendez-vous." });
    }
  };
  // exports.upreserved=async(req, res) =>{
  //   const id=req.params.id;
  //   try{
  //      const appointment =await appointmentdb.findOne({'user' : id});
  //      await appointmentdb.updateOne({ _id: appointment._id },{reserved: true})
  //       res.send(appointment)
  // }catch(error){
  //   res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour des rendez-vous." });
  // }
  //   };
  exports.upreserved = async (req, res) => {
    const id = req.params.id;
    try {
      
      await appointmentdb.updateOne({ _id: id }, { $set: { reserved: true} });
      
      res.send({ message: " appointment mise à jour ." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de la mise à jour des rendez-vous." });
    }
  };
 


// Route pour récupérer l'email de l'utilisateur à partir de son ID
exports.gete= async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}



// exports.gete = async (req, res) => {
//   try {
//     const userId = mongoose.Types.ObjectId(req.params.id); // convertit la valeur en ObjectId
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ email: user.email });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// }

// const sgMail = require('@sendgrid/mail')
// API_KEY = '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'

// exports.send= async (res,req,email,message) => {
//   sgMail.setApiKey(API_KEY)
//   const msg = {
//     to: email,
//     from: 'haifa.arouri@esprit.tn',
//     subject: 'Appointment Booked',
//     html: message,
//   };
//   try {
    

//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);
//   }
// }