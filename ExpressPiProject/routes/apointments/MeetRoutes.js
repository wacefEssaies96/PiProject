const meetCpntroller = require("../../controllers/appointmentController/MeetController");
var express = require('express');
var router = express.Router();

router.post("/addMeet/:id", meetCpntroller.create);

router.get("/getAllMeets", meetCpntroller.findAll);

router.delete("/delete/:id", meetCpntroller.deleteMeet);

router.get("/findDoctorMeets/:id", meetCpntroller.findAllByUser);

module.exports = router;