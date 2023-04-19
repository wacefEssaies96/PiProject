const appuserdb= require("../../models/appointment/Userappointment");
exports.find=(req,res)=>{
    appuserdb.find()
    .then(appointment=>{
    res.send(appointment)})
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while trying to retieve data"})
    })
}

