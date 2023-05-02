var express = require('express');
var router = express.Router();
const appointments= require("../../controllers/appointmentController/appointmentcontroller")

//create a new appointment

router.post("/addapp", appointments.create);

router.get("/findapp", appointments.find);

router.put("/upapp/:id", appointments.update);

router.delete("/delapp/:id", appointments.delete);

router.get("/getapp/:id", appointments.findAppointmentById);

router.get("/docapp/:id", appointments.findDoctor);
router.get("/fi", appointments.finda);


router.delete("/del", appointments.deleteAll)
module.exports= router;