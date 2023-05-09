var express = require('express');
var router = express.Router();
const appointments= require("../../controllers/appointmentController/appointmentcontroller")

//create a new appointment

router.post("/sendMailAppointment", appointments.sendMailAppointment)

router.post("/addapp", appointments.create);

router.get("/findapp", appointments.find);
router.get("/NotReserfindapp", appointments.NotReserfind);

router.put("/upapp/:id", appointments.update);

router.delete("/delapp/:id", appointments.delete);

router.get("/getapp/:id", appointments.findAppointmentById);

router.get("/resapp/:idapp/:idu", appointments.upreserved);
router.get("/fi/:id", appointments.finda);


router.delete("/del", appointments.deleteAll);
router.get("/getname/:id", appointments.findns);

module.exports= router;