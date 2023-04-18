const clinics= require("../../controllers/appointmentController/cliniccontroller");
var express = require('express');
var router = express.Router();

// // Create a new clinic
 router.post("/addclinic", clinics.create);
// getall clinics
router.get("/getAllClinics", clinics.find);
router.get("/getClinicsWithwebScraping", clinics.scrapeAndSaveData);
// //update a clinic by id
router.put("/updateclinics/:id", clinics.update);

// // delete a clinic  with id

router.delete("/delete/:id", clinics.delete);
router.get("/findOne/:id", clinics.findClinicById);

module.exports= router;