const clinics= require("../../controllers/appointmentController/cliniccontroller");
var express = require('express');
var router = express.Router();

// Create a new clinic
router.post("/addclinic", clinics.create);
// getall clinics
router.get("/getAllClinics", clinics.findAll);
// retrieve a single clinic with id

router.get("/:id", clinics.findClinicsById);
router.delete("/:id", clinics.deleteClinicsById);


module.exports= router;