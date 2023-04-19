var express = require('express');
var router = express.Router();
const appointments= require("../../controllers/appointmentController/userBookappointment")

router.get("/getappointments", appointments.find);

module.exports= router;